<template>
  <div class="app-container">
    <div class="filter-container">
      <div style="display:inline-block;">
        <label class="radio-label" style="padding-left:0;">{{ $t('sysDocNotice.docName') }}</label>
        <el-input
          v-model="listQuery.docTitle"
          :placeholder="$t('common.selectRemind')"
          style="width: 200px;"
          class="filter-item"
          @keyup.enter.native="handleFilter"
        />
        <label class="radio-label" style="padding-left:0;">{{ $t('sysDocNotice.docNo') }}</label>
        <el-input
          v-model="listQuery.docNumber"
          :placeholder="$t('common.selectRemind')"
          style="width: 200px;"
          class="filter-item"
          @keyup.enter.native="handleFilter"
        />
        <label class="radio-label" style="padding-left:0;">{{ $t('sysDocNotice.docType') }} </label>
        <el-select v-model="listQuery.docType" :placeholder="$t('sysDocNotice.docType')" clearable style="width: 100px" class="filter-item">
          <el-option v-for="item in docTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
        </el-select>
        <label class="radio-label" style="padding-left:0;">{{ $t('sysDocNotice.docStates') }} </label>
        <el-select v-model="listQuery.recStatus" :placeholder="$t('sysDocNotice.docStates')" clearable style="width: 100px" class="filter-item">
          <el-option v-for="item in recStatusOptions" :key="item.key" :label="item.display_name" :value="item.key" />
        </el-select>
        <el-button
          v-waves
          class="filter-item"
          icon="el-icon-search"
          style="margin-left:20px"
          @click="handleFilter"
        >
          查询
        </el-button>
        <el-button v-waves class="filter-item" type="info" icon="el-icon-setting" @click="reset">
          重置
        </el-button>
      </div>
      <div style="margin-top:20px;">
        <el-button
          class="filter-item"
          style="margin-left: 10px;"
          type="primary"
          icon="el-icon-plus"
          @click="handleCreate"
        >
          新增
        </el-button>
      </div>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      v-adaptive="{bottomOffset: 38}"
      :data="list"
      border
      fit
      height="100px"
      highlight-current-row
      style="width:100%;overflow:auto"
      :row-style="{height:'35px'}"
      :cell-style="{padding:'0'}"
      @sort-change="sortChange"
    >
      <el-table-column :label="$t('common.no')" type="index" show-overflow-tooltip width="50" align="center" />
      <el-table-column :label="$t('sysDocNotice.docName')" align="center">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.docTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('sysDocNotice.docType')" width="110px" align="center">
        <template slot-scope="{row}">
          <el-tag>{{ row.docType | docTypeFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('sysDocNotice.docNo')" align="center">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.docNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('common.creator')" align="center">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.creator }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('common.createdTime')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.createTm | datesformat('YYYY-MM-DD HH:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('common.operator')" align="center">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.opuser }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('common.operatedTime')" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.opdate | datesformat('YYYY-MM-DD HH:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('common.operate')" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button size="mini" type="success" @click="userDetail(row,'detail')">
            {{ $t('common.detail') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.pageNum"
      :limit.sync="listQuery.pageSize"
      @pagination="getList"
    />

    <el-dialog
      v-el-drag-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="80%"
      @dragDialog="this.$refs.select.blur()"
      :append-to-body="true"
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
            <el-form-item :label=" $t('sysDocNotice.docTitle')" prop="docTitle" label-width="90px">
              <el-input v-model="temp.docTitle" :readonly="readonly" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('sysDocNotice.docNo')" prop="docNumber" label-width="90px">
              <el-input v-model="temp.docNumber" :readonly="readonly" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('sysDocNotice.docType')" prop="docType" label-width="90px">
              <el-select v-model="temp.docType" class="filter-item" :placeholder="$t('common.selectRemind')" style="width:100%" :disabled="readonly">
                <el-option v-for="item in docTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('sysDocNotice.content')" label-width="90px">
              <el-input v-model="temp.content" type="textarea" :autosize="{minRows:10,maxRows:20}" :readonly="readonly" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('sysDocNotice.fileUpload')" prop="fileIds" label-width="90px">
              <el-upload
                :disabled="true"
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
                <!--                <el-button slot="trigger" size="small" type="primary">{{ $t('sysDocNotice.clickToUpload') }}</el-button>-->
                <!--                <div slot="tip" class="el-upload__tip" />{{ $t('sysDocNotice.fileSizeLimitation') }}-->
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDio()">
          {{ $t('common.close') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
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
  props: {
    datascndoc: {
      type: Boolean
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
    userUpdate(row, status) {
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
    userDetail(row, status) {
      this.fileList = []
      this.listLoading = true
      this.temp = Object.assign({}, row)
      this.getFileList(row.id)
      this.dialogFormVisible = true
      this.dialogStatus = 'detail'
      this.readonly = true
      this.btnShow = true
      this.listLoading = false
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
      if (this.dialogStatus !== 'detail') {
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
      } else {
        this.$notify({
          title: 'Fail',
          message: '详情页面无法删除附件',
          type: 'fail',
          duration: 2000
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
      // for (const vv of this.fileList) {
      //   this.temp.fileIds = this.temp.fileIds + vv.uid + ','
      // }
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
      window.open('/sysDocNotice/downloadFile?path=' + file.url + '&fileName=' + file.name)
      // window.open('/api/sysDocNotice/downloadFile?path=' + file.url + '&fileName=' + file.name)
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
      if (!this.readonly) {
        this.$confirm(`确定移除 ${file.name}？`).then(() => {
          var regId = new RegExp(file.uid + ',', 'g')
          var regNewUploadId = new RegExp(file.uid + '_newUploadFile,', 'g')
          this.temp.fileIds = this.temp.fileIds.replace(regId, '')
          this.temp.fileIds = this.temp.fileIds.replace(regNewUploadId, '')
          var regName = new RegExp(file.name + ',', 'g')
          this.temp.fileNames = this.temp.fileNames.replace(regName, '')
        })
      } else {
        this.$notify({
          title: 'Cannot delete',
          message: 'Cannot delete',
          type: 'fail',
          duration: 2000
        })
        return
      }
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
