<template>
  <el-dialog
    v-el-drag-dialog
    :title="textMap[dialogStatus]"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
    @dragDialog="this.$refs.select.blur()"
    width="80%"
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
        <el-col :span="12">
          <el-form-item :label="$t('sysPcappVersion.sysCode')" prop="sysCode" label-width="110px">
            <el-select
              v-model="temp.sysCode"
              class="filter-item"
              :placeholder="$t('common.selectRemind')"
              style="width:100%"
              :disabled="readonly"
            >
              <el-option v-for="item in sysCodeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('sysPcappVersion.upType')" prop="sysCode" label-width="110px">
            <el-select
              v-model="temp.upType"
              class="filter-item"
              :placeholder="$t('common.selectRemind')"
              style="width:100%"
              :disabled="readonly"
            >
              <el-option v-for="item in upTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label=" $t('sysPcappVersion.preVersion')" prop="preVersion" label-width="110px">
            <el-input v-model="temp.preVersion" :readonly="readonly" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('sysPcappVersion.newVersion')" prop="newVersion" label-width="110px">
            <el-input v-model="temp.newVersion" :readonly="readonly" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('sysPcappVersion.recStatus')" prop="recStatus" label-width="110px">
            <el-select
              v-model="temp.recStatus"
              class="filter-item"
              :placeholder="$t('common.selectRemind')"
              style="width:100%"
              :disabled="readonly"
            >
              <el-option v-for="item in recStatusOptions" :key="item.key" :label="item.display_name" :value="item.key" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item :label="$t('sysPcappVersion.upContent')" label-width="110px" prop="upContent">
            <el-input v-model="temp.upContent" type="textarea" :autosize="{minRows:10,maxRows:20}" :readonly="readonly" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item :label="$t('sysDocNotice.fileUpload')" prop="fileIds" label-width="110px">
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
              :limit="1"
              :on-exceed="handleExceed"
              :file-list="fileList"
            >
              <el-button slot="trigger" size="small" type="primary">{{ $t('sysDocNotice.clickToUpload') }}</el-button>
              <div slot="tip" class="el-upload__tip" />
              {{ $t('sysDocNotice.fileSizeLimitation') }}
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDio()">
        {{ $t('common.close') }}
      </el-button>
      <el-button v-show="btnShow" type="primary" @click="dialogStatus==='create'?createData():updateData()">
        {{ $t('common.save') }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { userDetail } from '@/api/sysManage'
import { getQueryInfo, getQueryPage } from '@/api/requestGet'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import adaptive from '@/directive/el-table'
import elDragDialog from '@/directive/el-drag-dialog'
import { postFormData } from '@/api/requestPost'

const recStatusOptions = [
  { key: '0', display_name: '拟稿' },
  { key: '1', display_name: '发布' },
  { key: '2', display_name: '失效' }
]
const sysCodeOptions = [
  { key: '01', display_name: 'PC' },
  { key: '02', display_name: 'APP' }
]
const upTypeOptions = [
  { key: '0', display_name: '全量' },
  { key: '1', display_name: '增量' }
]

export default {
  name: 'PcAppMng',
  // eslint-disable-next-line vue/no-unused-components
  components: { },
  directives: { waves, adaptive, elDragDialog },
  data() {
    return {
      downloadFile: {
        path: '',
        fileName: ''
      },
      recStatusOptions,
      sysCodeOptions,
      upTypeOptions,
      currentFile: { fileId: '' },
      temp: {
        id: '',
        sysCode: '',
        upType: '',
        preVersion: '',
        newVersion: '',
        recStatus: '',
        upContent: '',
        fileIds: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新增',
        detail: '详情'
      },
      rules: {
        sysCode: [{ required: true, message: '必填项', trigger: 'blur' }],
        upType: [{ required: true, message: '必填项', trigger: 'blur' }],
        preVersion: [{ required: true, message: '必填项', trigger: 'blur' }],
        newVersion: [{ required: true, message: '必填项', trigger: 'blur' }],
        recStatus: [{ required: true, message: '必填项', trigger: 'blur' }],
        upContent: [{ required: true, message: '必填项', trigger: 'blur' }]
      },
      tableChecked: [],
      tableChecked2: [],
      fileList: [],
      readonly: false,
      btnShow: true
    }
  },
  created() {
  },
  methods: {
    getFileList(id) {
      this.listLoading = true
      var url = '/sysPcappVersion/findSysFilsListByNoticeId/' + id
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
    handleDelete(row) {
      if (confirm('确定要删除？') === true) {
        getQueryInfo('/sysPcappVersion/deleteSysPcappVersionById/' + row.id).then(response => {
          if (response.data.result) {
            this.$notify({
              title: 'Success',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
            this.$emit('inidData', true)
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
          var url = '/sysPcappVersion/saveOrUpdateSysPcappVersion'
          postFormData(url, this.temp).then((response) => {
            this.$emit('inidData', true)
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
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          var url = '/sysPcappVersion/saveOrUpdateSysPcappVersion'
          postFormData(url, tempData).then(response => {
            this.$emit('inidData', true)
            debugger
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
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    closeDio() {
      this.dialogFormVisible = false
      this.fileList = []
    },
    handlePreview(file) {
      window.open('/sysPcappVersion/downloadFile?path=' + file.url + '&fileName=' + file.name)
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
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
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
      }
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3)
    },
    handleSuccess(response, file, fileList) {
      debugger
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
