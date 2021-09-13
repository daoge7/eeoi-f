<template>
  <el-dialog
    v-el-drag-dialog
    :title="textMap[dialogStatus]"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
    :append-to-body="true"
    width="80%"
    @dragDialog="this.$refs.select.blur()"
  >
    <el-form
      ref="dataForm"
      :rules="rules"
      :model="temp"
      label-position="left"
      label-width="70px"
      style="width: 90%; margin-left:20px;"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item label="资料名称" prop="docTitle" label-width="90px">
            <el-input v-model="temp.docTitle" :readonly="readonly" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="文件编号" prop="docNumber" label-width="90px">
            <el-input v-model="temp.docNumber" :readonly="readonly" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="文件类型" prop="docType" label-width="90px">
            <el-select v-model="temp.docType" class="filter-item" placeholder="请选择" style="width:100%" :disabled="readonly">
              <el-option v-for="item in docTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注" label-width="90px">
            <el-input v-model="temp.content" type="textarea" :readonly="readonly" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="文件上传" prop="fileIds" label-width="90px">
            <el-upload
              class="upload-demo"
              action="/sysUpload/upload"
              :data="currentFile"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              :on-change="handleChange"
              :before-upload="handleBeforeUpload"
              :on-success="handleSuccess"
              multiple
              :limit="10"
              :on-exceed="handleExceed"
              :file-list="fileList"
            >
              <el-button slot="trigger" size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">文件上传不超过10MB</div>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="false">
        <el-col :span="24">
          <el-form-item label="船公司id">
            <el-input v-model="temp.companyIds" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDio()">
        关闭
      </el-button>
      <el-button v-show="btnShow" type="primary" @click="dialogStatus==='create'?createData():updateData()">
        保存
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { userDetail } from '@/api/sysManage'
import { getQueryDic, getQueryInfo, getQueryPage } from '@/api/requestGet'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import adaptive from '@/directive/el-table'
import elDragDialog from '@/directive/el-drag-dialog'
import { postFormData } from '@/api/requestPost'

const docTypeOptions = [
  { key: '1', display_name: '通函通告' },
  { key: '2', display_name: '系统手册' },
  { key: '3', display_name: '其他资料' },
  { key: '4', display_name: '系统公告' }
]
const recStatusOptions = [
  { key: 0, display_name: '拟稿' },
  { key: 1, display_name: '发布' },
  { key: 2, display_name: '失效' }
]
const docTypeKeyValue = docTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})
// eslint-disable-next-line no-unused-vars
const recStatusKeyValue = recStatusOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'DocMng',
  components: { Pagination },
  directives: { waves, adaptive, elDragDialog },
  filters: {
    docTypeFilter(status) {
      return docTypeKeyValue[status]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      total2: 0,
      listLoading: true,
      docTypeOptions,
      recStatusOptions,
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        docTitle: '',
        docType: '',
        docNumber: '',
        fileIds: '',
        fileNames: '',
        recStatus: ''
      },
      downloadFile: {
        path: '',
        fileName: ''
      },
      userRoleOptions: [],
      currentFile: { fileId: '' },
      temp: {
        id: '',
        num: 1,
        docTitle: '',
        docType: '',
        docNumber: '',
        fileIds: '',
        fileNames: '',
        content: ''
      },
      temp2: {
        id: '',
        num: 1,
        docTitle: '',
        docType: '',
        docNumber: '',
        fileIds: '',
        fileNames: '',
        content: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新增',
        detail: '详情'
      },
      rules: {
        docTitle: [{ required: true, message: '必填项', trigger: 'blur' }],
        docType: [{ required: true, message: '必填项', trigger: 'change' }]
      },
      tableChecked: [],
      tableChecked2: [],
      fileList: [],
      readonly: false,
      btnShow: true
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getRoles() {
      var url = '/docMng/docList'
      getQueryDic(url).then(response => {
        this.userRoleOptions = response.data.data
      })
    },
    getList() {
      this.listLoading = true
      var url = '/sysDocNotice/findSysDocNoticeList'
      getQueryPage(url, this.listQuery).then(response => {
        this.list = response.data.data.items
        this.total = response.data.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    getFileList(id) {
      this.listLoading = true
      var url = '/sysDocNotice/findSysFilsListByNoticeId/' + id
      getQueryPage(url).then(response => {
        this.fileList = response.data.data
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    userDetail2(row, status) {
      this.fileList = []
      this.listLoading = true
      this.temp = Object.assign({}, row)
      this.getFileList(row.id)
      this.dialogFormVisible = true
      if (status === 'edit') { // 编辑和详情
        this.dialogStatus = 'update'
        this.readonly = false
        this.btnShow = true
      } else {
        this.readonly = true
        this.dialogStatus = 'detail'
        this.btnShow = false
      }
      this.listLoading = false
    },
    userDetail(id, status) {
      this.listLoading = true
      userDetail(id).then(response => {
        this.temp = Object.assign({}, response.data.data)
        this.dialogFormVisible = true
        if (status === 'edit') { // 编辑和详情
          this.dialogStatus = 'update'
          this.readonly = false
          this.btnShow = true
        } else {
          this.readonly = true
          this.dialogStatus = 'detail'
          this.btnShow = false
        }
        if (this.temp.userRole !== (null || undefined) && this.temp.userRole.length > 0) {
          var s = []
          for (var i = 0; i < this.temp.userRole.length; i++) {
            s.push(this.temp.userRole[i])
          }
          this.temp.userRole = s
        }
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.pageNum = 1
      this.getList()
    },
    reset() {
      this.listQuery = {
        pageNum: 1,
        pageSize: 20,
        docTitle: '',
        docType: '',
        docNumber: '',
        fileIds: '',
        recStatus: ''
      }
      this.getList()
    },
    handleDelete(row) {
      if (confirm('确定要删除？') === true) {
        getQueryInfo('/sysDocNotice/deleteSysDocNoticeById/' + row.id).then(response => {
          if (response.data.result) {
            this.$notify({
              title: 'Success',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
            const index = this.list.indexOf(row)
            this.list.splice(index, 1)
            this.total = this.total - 1
          } else {
            this.$notify({
              title: 'Fail',
              message: '删除失败',
              type: 'fail',
              duration: 2000
            })
          }
        })
      }
    },
    handleSelectionChange(val) {
      this.tableChecked = val
    },
    handleRelationCompanySelectionChange(val) {
      this.tableChecked2 = val
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        num: 1,
        docTitle: '',
        docType: '',
        docNumber: '',
        fileIds: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.fileList = []
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.btnShow = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleCreateRelation() {
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          var url = '/sysDocNotice/saveOrUpdateSysDocNotice'
          postFormData(url, this.temp).then((response) => {
            this.total = this.total + 1
            this.temp.id = response.data.data.id
            this.list.unshift(this.temp)
            this.fileList = []
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    updateData() {
      // for (const vv of this.fileList) {
      //   this.temp.fileIds = this.temp.fileIds + vv.uid + ','
      //   // this.temp.fileNames == null ? this.temp.fileNames = vv.name + ',' : this.temp.fileNames += vv.name + ','
      // }
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          var url = '/sysDocNotice/saveOrUpdateSysDocNotice'
          postFormData(url, tempData).then(response => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, response.data.data)
                break
              }
            }
            this.fileList = []
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}`
        ? 'ascending'
        : sort === `-${key}`
          ? 'descending'
          : ''
    },
    selectTrigger: function(val) {
    // 手动刷新
    // this.$forceUpdate()
    },
    // 上传事件
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    closeDio() {
      this.dialogFormVisible = false
      this.fileList = []
    },
    handlePreview(file) {
      window.open('api/sysDocNotice/downloadFile?path=' + file.url + '&fileName=' + file.name)
      // var url = '/sysDocNotice/downloadFile'
      // this.downloadFile.path = file.url
      // this.downloadFile.fileName = file.name
      // getQueryPage(url, this.downloadFile).then((response) => {
      //   this.$notify({
      //     title: 'Success',
      //     message: 'Download Successfully',
      //     type: 'success',
      //     duration: 2000
      //   })
      // })
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 10 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3)
    },
    handleSuccess(response, file, fileList) {
      if (typeof this.temp.fileIds !== 'undefined') {
        this.temp.fileIds = this.temp.fileIds + file.uid + '_newUploadFile,'
      }
      if (typeof this.temp.fileNames !== 'undefined' && this.temp.fileNames !== null) {
        this.temp.fileNames = this.temp.fileNames + file.name + ','
      } else {
        this.temp.fileNames = file.name + ','
      }
    },
    handleBeforeUpload(file) {
      this.currentFile.fileId = file.uid
    }
  }
}
</script>
