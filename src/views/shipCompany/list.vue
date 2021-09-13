<template>
  <div class="app-container">
    <div class="filter-container">
      <div style="display:inline-block;">
        <label class="radio-label" style="padding-left:0;">{{ $t('shipCompany.name') }}</label>
        <el-input
          v-model="listQuery.nameCn"
          :placeholder="$t('shipCompany.name')"
          style="width: 200px;"
          class="filter-item"
          @keyup.enter.native="handleFilter(listQuery.nameCn,listQuery.officeAdressCn)"
        />
        <label class="radio-label" style="padding-left:30px;">{{ $t('shipCompany.adress') }}</label>
        <el-input
          v-model="listQuery.officeAdressCn"
          :placeholder="$t('shipCompany.adress')"
          style="width: 300px;"
          class="filter-item"
          @keyup.enter.native="handleFilter(listQuery.nameCn,listQuery.officeAdressCn)"
        />
        <el-button
          v-waves
          icon="el-icon-search"
          @click="handleFilter(listQuery.nameCn,listQuery.officeAdressCn)"
        >
          {{ $t('common.search') }}
        </el-button>
        <el-button
          v-waves
          class="filter-item"
          type="danger"
          icon="el-icon-folder-add"
          @click="handleUpdate({id:''})"
        >
          {{ $t('common.add') }}
        </el-button>
        <el-button
          v-waves
          class="filter-item"
          type="info"
          icon="el-icon-setting"
          @click="handleFilter(listQuery.nameCn,listQuery.officeAdressCn)"
        >
          {{ $t('common.reset') }}
        </el-button>
      </div>
      <div style="margin-top:5px;">
        <!-- <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="handleCreate">
          {{ $t('common.add') }}
        </el-button> -->
        <!--        <el-button class="filter-item" type="primary" icon="el-icon-upload2">-->
        <!--          {{ $t('shipCompany.excelBatchImport') }}-->
        <!--        </el-button>-->
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
    >
      <el-table-column :label="$t('common.no')" type="index" show-overflow-tooltip width="50" align="center" />
      <el-table-column :label="$t('shipCompany.ccsCode')" width="120" align="center" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.ccsCode }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('shipCompany.imoid')" width="100" align="center" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.iacs }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('shipCompany.name')" width="auto" align="center" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.nameCn }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('shipCompany.adress')" width="300" align="center" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.adressCn }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('shipCompany.businessScope')" width="250" align="center" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.business }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('common.operate')"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
        show-overflow-tooltip
      >
        <template slot-scope="{row}">
          <el-button type="primary" @click="handleUpdate(row)">
            {{ $t('common.edit') }}
          </el-button>
          <el-button type="success" show-overflow-tooltip @click="handleModifyStatus(row,'detail')">
            {{ $t('common.detail') }}
          </el-button>
          <!-- <el-button type="danger" show-overflow-tooltip @click="handleModifyStatus(row,'deleted')">
            {{ $t('common.delete') }}
          </el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      style="margin:0px;padding-left:0px"
      :total="total"
      :page.sync="listQuery.pageNum"
      :limit.sync="listQuery.pageSize"
      @pagination="getList"
    />

    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      width="80%"
      :append-to-body="true"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="130px"
        style="width: 100%;"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('shipCompany.ccsCode')">
              <el-input v-model="temp.ccsCode" :readonly="dialogStatus=='detail'?true:false" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('shipCompany.imoid')" prop="imoid">
              <el-input v-model="temp.iacs" :readonly="dialogStatus=='detail'?true:false" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('shipCompany.companyType')" prop="companyType">
              <el-select
                v-model="temp.companyType"
                class="filter-item"
                :placeholder="$t('common.selectRemind')"
                style="width:100%"
              >
                <!-- //:value="item" -->
                <el-option v-for="item in typeOptions" :key="item.id" :label="item.nameCn" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('shipCompany.companyNameCn')" prop="nameCn">
              <el-input v-model="temp.nameCn" :readonly="dialogStatus=='detail'?true:false" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('shipCompany.companyName')" prop="nameEn">
              <el-input v-model="temp.nameEn" :readonly="dialogStatus=='detail'?true:false" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item :label="$t('shipCompany.parentCompany')" prop="parentCompany">
              <el-input v-model="temp.childrenCompanyNames" style="width:95%" type="textarea" autosize readonly />
              <!-- <el-input v-show="false" v-model="temp.childrenCompanyIds" style="width:82%" /> -->
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-button @click="handleCreateRelation">
              {{ $t('shipCompany.Addsubsidiary') }}
            </el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('shipCompany.contactPerson')" prop="contactPerson">
              <el-input v-model="temp.contactPerson" :readonly="dialogStatus=='detail'?true:false" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('shipCompany.contactTel')" prop="contactTel">
              <el-input v-model="temp.contactTel" :readonly="dialogStatus=='detail'?true:false" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('shipCompany.contactEmail')" prop="contactEmail">
              <el-input v-model="temp.contactEmail" :readonly="dialogStatus=='detail'?true:false" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('shipCompany.registerAdressCn')" prop="registerAdressCn">
              <el-input v-model="temp.registerAdressCn" :readonly="dialogStatus=='detail'?true:false" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('shipCompany.registerAdressEn')" prop="registerAdressEn">
              <el-input v-model="temp.registerAdressEn" :readonly="dialogStatus=='detail'?true:false" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('shipCompany.officeAdressCn')" prop="officeAdressCn">
              <el-input v-model="temp.officeAdressCn" :readonly="dialogStatus=='detail'?true:false" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('shipCompany.officeAdressEn')" prop="officeAdressEn">
              <el-input v-model="temp.officeAdressEn" :readonly="dialogStatus=='detail'?true:false" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item :label="$t('shipCompany.businessScope')" prop="businessScope">
          <el-input v-model="temp.businessScope" type="textarea" :readonly="dialogStatus=='detail'?true:false" />
        </el-form-item>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('shipCompany.certificateNo')">
              <el-input v-model="temp.certificateNo" :readonly="dialogStatus=='detail'?true:false" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('shipCompany.certificateDate')">
              <el-date-picker
                v-model="temp.certificateDate"
                :editable="true"
                type="date"
                align="left"
                :placeholder="$t('common.datePickerRemind')"
                style="width:100%"
                :readonly="dialogStatus=='detail'?true:false"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>

          <el-form-item :label="$t('shipCompany.businessLine')" prop="businessLine">
            <el-input v-model="temp.businessLine" type="textarea" :readonly="dialogStatus=='detail'?true:false" />
          </el-form-item>

        </el-row>
        <el-form-item :label="$t('shipCompany.remark')">
          <el-input
            v-model="temp.remark"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            :placeholder="$t('common.inputRemind')"
            :readonly="dialogStatus=='detail'?true:false"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{ $t('common.close') }}
        </el-button>
        <el-button
          v-if="dialogStatus!='detail'"
          type="primary"
          @click="dialogStatus==='create'?createData():updateData()"
        >
          {{ $t('common.save') }}
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" :append-to-body="true" title="Reading statistics" width="80%">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>

    <!-- 船公司列表 -->
    <el-dialog
      v-el-drag-dialog
      :title="$t('shipCompany.CompanySelector')"
      :visible.sync="dialogShipCompanyFormVisible"
      :close-on-click-modal="false"
      width="80%"
      :append-to-body="true"
      @dragDialog="this.$refs.select.blur()"
    >
      <div class="filter-container">
        <div style="display:inline-block;">
          <label class="radio-label" style="padding-left:0;">{{ $t('shipCompany.keyword') }}</label>
          <el-input
            v-model="listShipCompanyQuery.nameCn"
            :placeholder="$t('shipCompany.Pleaseenter')"
            style="width: 200px;"
            class="filter-item"
            @keyup.enter.native="handleShipCompanyFilter"
          />
          <!-- <label class="radio-label" style="padding-left:0;">公司代码</label>
          <el-input
            v-model="listShipCompanyQuery.ccsCode"
            placeholder="请输入关键字"
            style="width: 200px;"
            class="filter-item"
            @keyup.enter.native="handleShipCompanyFilter(listShipCompanyQuery.nameCn,listShipCompanyQuery.ccsCode)"
          /> -->
          <el-button
            v-waves
            class="filter-item"
            type="primary"
            icon="el-icon-search"
            style="margin-left:20px"
            @click="handleShipCompanyFilter"
          >
            {{ $t('MRV.query') }}
          </el-button>
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-setting" @click="handleShipCompanyrest">
            {{ $t('common.reset') }}
          </el-button>
        </div>
      </div>
      <el-table
        :key="tableKey"
        ref="multipleTable"
        v-loading="listLoading"
        v-adaptive="{bottomOffset: 38}"
        :data="shipCompanylist"
        border
        fit
        height="100px"
        highlight-current-row
        style="width:100%;overflow:auto"
        :row-style="{height:'35px'}"
        :cell-style="{padding:'0'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" @selection-change="handleSelectionChange" />
        <el-table-column :label="$t('common.no')" type="index" show-overflow-tooltip width="50" align="center" />
        <el-table-column :label="$t('common.corporatename')" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.nameCn+row.nameEn }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('common.Companycode')" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.ccsCode }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('common.CompanyIACScode')" align="left" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.iacs }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogShipCompanyFormVisible = false">
          {{ $t("common.close") }}
        </el-button>
        <el-button type="primary" @click="saveRelation(tableRelationChecked)">
          {{ $t("common.save") }}
        </el-button>
      </div>
      <pagination
        v-show="total2>0"
        style="margin:0px;padding-left:0px"
        :total="total2"
        :page.sync="listShipCompanyQuery.pageNum"
        :limit.sync="listShipCompanyQuery.pageSize"
        @pagination="getShipCompanyList"
      />
    </el-dialog>
  </div>
</template>

<script>
import { postFormData } from '@/api/requestPost'
import { getQueryInfo, getQueryPage } from '@/api/requestGet'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import adaptive from '@/directive/el-table'
import elDragDialog from '@/directive/el-drag-dialog'

export default {
  name: 'ShipCompany',
  components: { Pagination },
  directives: { waves, adaptive, elDragDialog },
  data() {
    return {
      dynamicValidateForm: {
        domains: [],
        email: ''
      },
      shipCompanylist: [],
      tableKey: 0,
      list: [],
      total: 0,
      total2: 0,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        nameCn: '',
        officeAdressCn: ''
      },
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      parentOptions: ['公司1', '公司2', '公司3', '公司4', '公司5'],
      typeOptions: ['船公司', '主管机构', '验证机构'],
      businessScopeOptions: ['散货船', '车辆运输船', '兼装船', '客滚船', '冷藏货船', '液货船', '气体运输船', '集装箱船', '滚装货船', '普通货船', '客船', '其它'],
      showReviewer: false,
      temp: {
        id: '',
        ccsCode: '',
        iacs: '',
        // companyTypeIds: [],
        companyType: '',
        nameCn: '',
        nameEn: '',
        childrenCompanyIds: [],
        childrenCompanyNames: '',
        registerAdressCn: '',
        registerAdressEn: '',
        officeAdressCn: '',
        officeAdressEn: '',
        contactPerson: '',
        contactTel: '',
        contactEmail: '',
        businessLine: [],
        businessScope: '',
        certificateNo: '',
        certificateDate: '',
        competentAuthority: '',
        remark: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: this.$t('common.edit'),
        create: this.$t('common.add'),
        detail: this.$t('common.detail')
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        nameEn: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
        nameCn: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
        // imoid: [{required: true, message: this.$t('common.inputRequired'), trigger: 'blur'}],
        companyType: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'change' }],
        registerAdressCn: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
        registerAdressEn: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
        officeAdressCn: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
        officeAdressEn: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
        contactPerson: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
        contactTel: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
        contactEmail: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
        businessScope: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
        businessLine: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }]
      },
      downloadLoading: false,
      dialogShipCompanyFormVisible: false,
      listShipCompanyQuery: {
        pageNum: 1,
        pageSize: 20,
        nameCn: '',
        ccsCode: '',
        sort: '+id'
      },
      tableRelationChecked: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1)
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: '',
        key: Date.now()
      })
    },
    getList() {
      this.listLoading = true
      var url = '/gcClient/findGcClientlist'
      // if (arguments[0] != null && arguments[0] != '') {
      //   url = url + '?nameCn =' + this.listQuery.nameCn
      // }
      // if (arguments[1] != null && arguments[1] != '') {
      //   if (arguments[0] == null || arguments[0] == '') {
      //     url = url + '?officeAdressCn =' + this.listQuery.officeAdressCn
      //   } else {
      //     url = url + '&officeAdressCn =' + this.listQuery.officeAdressCn
      //   }
      // }
      getQueryPage(url, this.listQuery).then(response => {
        this.list = response.data.data.items
        this.total = response.data.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.pageNum = 1
      this.listQuery.nameCn = arguments[0]
      this.listQuery.officeAdressCn = arguments[1]
      this.getList(this.listQuery.nameCn, this.listQuery.officeAdressCn)
    },
    handleCompanyType() {
      getQueryInfo('/gcClient/findGcClientCates').then(response => {
        this.typeOptions = response.data.data
      })
    },
    handleDelete(row) {
      getQueryInfo('/gcClient/delete/' + row.id).then(response => {
        if (response.data.result) {
          this.$notify({
            title: 'Success',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
          const index = this.list.indexOf(row)
          this.list.splice(index, 1)
        } else {
          this.$notify({
            title: 'Fail',
            message: '删除失败',
            type: 'fail',
            duration: 2000
          })
        }
      })
    },
    handleModifyStatus(row, status) {
      if (status === 'deleted') {
        if (confirm('确定要删除？') === true) {
          this.handleDelete(row)
        }
      } else {
        var url = '/gcClient/findGcClient/' + row.id
        getQueryPage(url).then(response => {
          this.temp = response.data.data
          // Just to simulate the time of the request
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
        // this.temp = Object.assign({}, row) // copy obj
        // this.temp.certificateDate = new Date(this.temp.certificateDate)
        this.dialogStatus = 'detail'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      }
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        ccsCode: '',
        imoid: '',
        companyType: [],
        nameCn: '',
        nameEn: '',
        childrenCompanyIds: [],
        registerAdressCn: '',
        registerAdressEn: '',
        officeAdressCn: '',
        officeAdressEn: '',
        contactPerson: '',
        contactTel: '',
        contactEmail: '',
        businessScope: [],
        businessLine: '',
        certificateNo: '',
        certificateDate: '',
        remark: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.handleCompanyType()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          // this.temp.author = 'vue-element-admin'
          var url = '/gcClient/createAndUpdateGcClient'
          postFormData(url, this.temp).then(() => {
            this.list.unshift(this.temp)
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
    handleUpdate(row) {
      if (row.id) {
        const url = '/gcClient/findGcClient/' + row.id
        getQueryPage(url).then(response => {
          this.temp = response.data.data
          // Just to simulate the time of the request
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      }
      this.handleCompanyType()
      // this.temp = Object.assign({}, row) // copy obj
      // this.temp.certificateDate = new Date(this.temp.certificateDate)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.certificateDate = +new Date(tempData.certificateDate) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          var url = '/gcClient/createAndUpdateGcClient'
          postFormData(url, tempData).then(response => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, response.data.data)
                break
              }
            }
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
    handleShipCompanyrest() {
      this.listShipCompanyQuery = {
        pageNum: 1,
        pageSize: 20,
        nameCn: '',
        ccsCode: '',
        sort: '+id'
      }
      this.getShipCompanyList()
    },
    handleShipCompanyFilter() {
      this.listShipCompanyQuery.page = 1
      this.getShipCompanyList()
    },
    handleSelectionChange(val) {
      this.tableRelationChecked = val
    },
    saveRelation(rows) {
      const val = rows
      var ids = []
      var names = ''
      if (val) {
        val.forEach(function(item, index) {
          ids.push(item.id)
          index = index + 1
          names = names + index + ':' + item.nameCn + ';' + '\n'
        })
      }
      this.temp.childrenCompanyIds = ids
      this.temp.childrenCompanyNames = names
      this.dialogShipCompanyFormVisible = false
    },
    handleCreateRelation() {
      this.dialogShipCompanyFormVisible = true
      this.listShipCompanyQuery = {
        pageNum: 1,
        pageSize: 20,
        nameCn: '',
        ccsCode: '',
        sort: '+id'
      }
      this.getShipCompanyList()
    },
    getShipCompanyList() {
      this.listLoading = true
      const url = '/gcClient/findGcClientlist'
      // if (arguments[0] != null && arguments[0] != '') {
      //   url = url + '?nameCn =' + this.listShipCompanyQuery.nameCn
      // }
      // if (arguments[1] != null && arguments[1] != '') {
      //   if (arguments[0] == null || arguments[0] == '') {
      //     url = url + '?ccsCode =' + this.listShipCompanyQuery.ccsCode
      //   } else {
      //     url = url + '&ccsCode =' + this.listShipCompanyQuery.ccsCode
      //   }
      // }
      getQueryPage(url, this.listShipCompanyQuery).then(response => {
        if (response.data.result) {
          this.shipCompanylist = response.data.data.items
          const list = []
          console.log(this.temp.childrenCompanyIds)
          if (this.temp.childrenCompanyIds) {
            response.data.data.items.forEach(ele => {
              this.temp.childrenCompanyIds.forEach(el => {
                if (ele.id === el) {
                  list.push(ele)
                }
              })
            })
            this.$nextTick(() => {
              list.forEach(ele => {
                this.$refs.multipleTable.toggleRowSelection(ele, true) // 回显
              })
            })
          }
          this.total2 = response.data.data.total

          // Just to simulate the time of the request
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        }
      })
    }
  }
}
</script>
