<template>
  <div class="app-container">
    <div class="filter-container">
      <div style="display:inline-block;">
        <label class="radio-label" style="padding-left:0;">{{ $t('shipCompany.Managementorganization') }} </label>
        <el-select v-model="listQuery.clientId" :placeholder="$t('common.selectRemind')" clearable style="width: 280px" class="filter-item">
            <el-option v-for="item in dwOptions" :key="item.key" :label="item.display_name" :value="item.key" />
        </el-select>
        <label class="radio-label" style="padding-left:0;">{{ $t('ship.searchOperator') }}</label>
        <el-input v-model="shipComPany" :placeholder="$t('common.inputRemind')" size="mini"
        style="width: 200px;"
        class="filter-item" @keyup.enter.native="handleFilter"/>
        <el-button plain @click="selectComPany">{{ $t('common.select') }}</el-button>

        <label class="radio-label" style="padding-left:30px;">{{ $t('ship.nameOrimo') }}</label>
        <el-input
          v-model="listQuery.shipKeyWord"
          :placeholder="$t('ship.shipIdxKey')"
          size="mini"
          style="width: 200px;"
          class="filter-item"
          @keyup.enter.native="handleFilter"
         />
      </div>
      <div style="display:inline-block;">
          <label class="radio-label" style="padding-left:0;">{{ $t('ship.shipType') }}</label>
        <el-select
          v-model="listQuery.sptype"
          :placeholder="$t('common.selectRemind')"
          clearable
          class="filter-item"
          size="mini"
          style="width: 130px"
        >
          <el-option v-for="item in shipTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
        </el-select>

        <label class="radio-label" style="padding-left:30px;">{{ $t('ship.searchGross') }}</label>
        <el-select
          v-model="dw"
          :placeholder="$t('common.selectRemind')"
          clearable
          class="filter-item"
          size="mini"
          style="width: 200px"
        >
          <el-option
            v-for="item in grossOptions"
            :key="item.key"
            :label="item.display_name"
            :value="item.display_name"
          />
        </el-select>
        <el-button v-waves class="filter-item" icon="el-icon-search" @click="handleFilter" style="margin-left:20px">
            {{ $t('common.query') }}
        </el-button>
        <el-button v-waves class="filter-item" type="info" icon="el-icon-setting"  @click="reset">
            {{ $t('common.reset') }}
        </el-button>
      </div>
   </div>

   <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      height="100px"
      v-adaptive="{bottomOffset: 38}"
      highlight-current-row
      style="width:100%;overflow:auto"
      :row-style="{height:'35px'}"
      :cell-style="{padding:'0'}"
      @sort-change="sortChange"
    >   

      <el-table-column :label="$t('common.no')" type="index" show-overflow-tooltip width="50" align="center">
      </el-table-column>
      <el-table-column :label="$t('voyage.shipName')" align="center" >
        <template slot-scope="{row}" >
          <span class="link-type"  @click="handleUpdate(row,'detail')">{{ row.spnameCn }}</span>
        </template>
      </el-table-column>
       <el-table-column :label="$t('voyage.Shipinspection')" align="center">
        <template slot-scope="{row}">
          <span >{{ row.registerno }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('voyage.Shipmanagementcompany')" align="center">
        <template slot-scope="{row}">
          <span  >{{ row.CMSA_NAME }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('shipCompany.Managementorganization')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.CMSA_NAME }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('ship.designSpeed')"  align="center">
        <template slot-scope="{row}">
          <span>{{ row.speed }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('voyage.Constructiondate')"  align="center">
        <template slot-scope="{row}">
          <span>{{ row.finish | datesformat('YYYY-MM-DD HH:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('voyage.Constructiondate')"  align="center">
        <template slot-scope="{row}">
          <span>{{ row.gross }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('voyage.DWTofship')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.dw }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('common.operate')" align="left" width="400" class-name="small-padding fixed-width2">
        <template slot-scope="{row}">
          <el-button type="primary" @click="showEnergyEfficiency(row)">
            {{ $t('voyage.Energyefficiencydata') }}
          </el-button>
          <el-button  type="primary" @click="showEnergyEfficiencyStatus(row)">
             {{ $t('voyage.Energyefficiencystatus') }}
          </el-button>
          <el-button  type="primary" @click="handleDeleteUser(row)">
            {{ $t('voyage.Energyefficiencycomparison') }}  
          </el-button>
          <el-button  type="danger" @click="handlApp(row)">
            {{ $t('voyage.Appaccountnumber') }}   
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize" @pagination="getList" />
    <ShipComPanySelect ref="ShipComPanySelect"/>

      <el-dialog
      :append-to-body="true"
      :title="$t('ship.shipEditText')"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="80%"
      custom-class="customwh"
    >
      <el-tabs
        v-model="activeName"
        value="first"
        type="border-card"
        style="overflow-y:auto;"
        @tab-click="handleClick"
      >
        <el-tab-pane :key="'first'" :label="$t('ship.shipInfo')" name="first">
          <shipInfo
            ref="shipInfo"
            :edit-status="dialogStatus"
            :edit-row-id="editRowId"
            :row-model="rowModel"
          />
        </el-tab-pane>
        <el-tab-pane :key="'second'" :label="$t('ship.shipMde')" name="second">
          <shipMde
            ref="shipMde"
            :edit-status="dialogStatus"
            :edit-row-id="editRowId"
            :row-model="rowModel"
          />
        </el-tab-pane>
        <el-tab-pane :key="'third'" :label="$t('ship.shipPM')" name="third">
          <shipPM
            ref="shipPM"
            :edit-status="dialogStatus"
            :edit-row-id="editRowId"
            :row-model="rowModel"
          />
        </el-tab-pane>
        <el-tab-pane :key="'eighth'" :label="$t('ship.shipGenerator')" name="eighth">
          <shipGenerator
            ref="shipGenerator"
            :edit-status="dialogStatus"
            :edit-row-id="editRowId"
            :row-model="rowModel"
          />
        </el-tab-pane>
        <el-tab-pane :key="'eleven'" :label="$t('ship.battery')" name="eleven">
          <battery
            ref="battery"
            :edit-status="dialogStatus"
            :edit-row-id="editRowId"
            :row-model="rowModel"
          />
        </el-tab-pane>
        <el-tab-pane :key="'fourth'" :label="$t('ship.shipBoiler')" name="fourth">
          <shipBoiler
            ref="shipBoiler"
            :edit-status="dialogStatus"
            :edit-row-id="editRowId"
            :row-model="rowModel"
          />
        </el-tab-pane>
        <el-tab-pane :key="'fifth'" :label="$t('ship.shipIncinerator')" name="fifth">
          <shipIncinerator
            ref="shipIncinerator"
            :edit-status="dialogStatus"
            :edit-row-id="editRowId"
            :row-model="rowModel"
          />
        </el-tab-pane>
        <el-tab-pane :key="'sixth'" :label="$t('ship.shipInert')" name="sixth">
          <shipInert
            ref="shipInert"
            :edit-status="dialogStatus"
            :edit-row-id="editRowId"
            :row-model="rowModel"
          />
        </el-tab-pane>
        <el-tab-pane :key="'seventh'" :label="$t('ship.shipGasTurbines')" name="seventh">
          <shipGasTurbines
            ref="shipGasTurbines"
            :edit-status="dialogStatus"
            :edit-row-id="editRowId"
            :row-model="rowModel"
          />
        </el-tab-pane>
        <el-tab-pane :key="'ninth'" :label="$t('ship.shipMainProp')" name="ninth">
          <shipMainProp
            ref="shipMainProp"
            :edit-status="dialogStatus"
            :edit-row-id="editRowId"
            :row-model="rowModel"
          />
        </el-tab-pane>
        <el-tab-pane :key="'tenth'" :label="$t('ship.shipPropeller')" name="tenth">
          <shipPropeller
            ref="shipPropeller"
            :edit-status="dialogStatus"
            :edit-row-id="editRowId"
            :row-model="rowModel"
          />
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{ $t('common.close') }}
        </el-button>
        <el-button v-if="saveButtonIsDisabled" type="primary" @click="createData()">
          {{ $t('common.save') }}
        </el-button>
        <el-button
          v-if="saveButtonIsDisabled && dialogStatus === 'update'"
          class="filter-item"
          style="margin-left: 10px;"
          size="mini"
          type="primary"
          @click="createData('updateAdd')"
        >
          {{ $t('common.add') }}
        </el-button>
        <el-button
          v-if="saveButtonIsDisabled"
          class="filter-item"
          style="margin-left: 10px;"
          size="mini"
          type="primary"
          @click="resetForm"
        >
          {{ $t('common.reset') }}
        </el-button>
        <el-button
          v-if="activeName !== 'first' && saveButtonIsDisabled"
          class="filter-item"
          type="danger"
          size="mini"
          style="margin-left: 10px;"
          @click="deleteEquipment"
        >
          {{ $t('common.delete') }}
        </el-button>
      </div>
    </el-dialog>

    <el-dialog v-el-drag-dialog :append-to-body="true"  :visible.sync="cmsaEEVisiable" :modal-append-to-body="false" :title="textMap[dialogStatus]" :close-on-click-modal="false" custom-class="customwh">
      <cmsaEnergyEfficiency  ref="cmsaEnergyEfficiency" />
    </el-dialog>
    <el-dialog v-el-drag-dialog :append-to-body="true" :title="$t('voyage.Energyefficiencystatus')" width="80%" :visible.sync="eeStatusVisiable" :close-on-click-modal="false" custom-class="customwh">
      <div class="chart-container">
          <chart ref="chart" v-if="chartFlag" height="100%" width="100%" v-bind:chartTitle="this.chartTitle" v-bind:xData="this.xData" v-bind:legendData="this.legendData" v-bind:seriesData="this.seriesData" />
      </div>
    </el-dialog>  
    <shipManagerApp v-if="dialogVisible.dalog" :dialogVisible="dialogVisible" @app="app"/>
  </div>
</template>

<script>
import shipManagerApp  from './components/shipManagerApp-Dalog'
import { postFormData } from '@/api/requestPost'
import { getQueryPage, getQueryDic} from '@/api/requestGet'
import waves from '@/directive/waves' // waves directive
import { parseTime, deepClone } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import adaptive from '@/directive/el-table'
import elDragDialog from '@/directive/el-drag-dialog'
import ShipComPanySelect from  '@/components/ShipComPanySelect'

import SsmisShipInfo from '../ship/components/SsmisShipInfo'
import SsmisShipPM from '../ship/components/SsmisShipPM'
import SsmisShipMde from '../ship/components/SsmisShipMde'
import shipInfo from '../ship/components/shipInfo'
import shipPM from '../ship/components/shipPM'
import shipMde from '../ship/components/shipMde'
import shipBoiler from '../ship/components/shipBoiler'
import shipIncinerator from '../ship/components/shipIncinerator'
import shipInert from '../ship/components/shipInert'
import shipGasTurbines from '../ship/components/shipGasTurbines'
import shipGenerator from '../ship/components/shipGenerator'
import battery from '../ship/components/battery'
import shipMainProp from '../ship/components/shipMainProp'
import shipPropeller from '../ship/components/shipPropeller'
import cmsaEnergyEfficiency from './cmsaEnergyEfficiency'

import Chart from '@/components/Charts/MultiDataMixChart'

const grossOptions = [
  { key: '1', display_name: '0~500' },
  { key: '2', display_name: '500-1000' },
  { key: '3', display_name: '1000-2000' },  
  { key: '4', display_name: '2000-5000' }
]
const shipTypeOptions = [
  { key: '1', display_name: '散货船' },
  { key: '4', display_name: '集装箱船' },
  { key: '5', display_name: '滚装货船' },
  { key: '7', display_name: '客船' }
]
const dwOptions = [
  { key: 1, display_name: '长江航运管理局' },
  { key: 2, display_name: '珠江航运管理局' }
]
const dwKeyValue = dwOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})
const grossKeyValue = grossOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})
const shipTypeKeyValue = shipTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})
// const indexw = 1
export default {
  name: 'shipManager',
  components: { 
    Pagination,
    Chart,
    ShipComPanySelect,
    SsmisShipInfo,
    SsmisShipPM,
    SsmisShipMde,
    shipInfo,
    shipPM,
    shipMde,
    shipBoiler,
    shipIncinerator,
    shipInert,
    shipGasTurbines,
    shipGenerator,
    battery,
    shipMainProp,
    shipPropeller,
    cmsaEnergyEfficiency,
    shipManagerApp
  },
  directives: { waves, adaptive ,elDragDialog },
  filters: {
    dwFilter(status) {
      return dwKeyValue[status]
    },
    userDeptFilter(status) {
      return userDeptKeyValue[status]
    }
  },
  data() {
    return {
      tableKey: 0,
      grossOptions,
      shipTypeOptions,
      list: null,
      total: 0,
      total2: 0,
      dw: '',
      eeStatusVisiable: false,
      listLoading: true,
      shipComPany: '',
      activeName: 'first',
      relationedShipCompanyList: [],
      shipCompanylist: [],
      saveButtonIsDisabled: true,
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        dw: '',
        shipComPanyName: '',
        isCmca: 0,
        sort: 'spname'
      },
      listShipCompanyQuery: {
        pageNum: 1,
        pageSize: 20,
        nameCn: '',
        nameEn: '',
        ccsCode: ''
      },
      dwOptions,
      userRoleOptions: [],
      dialogFormVisible: false,
      shipComPanyNameReadonly: false,
      statusType: false,
      dialogShipCompanyFormVisible: false,
      dialogStatus: '',
      textMap: {
        eeData: '能效数据',
        eeStatus: '能效状态',
        eeCompare: '能效比较'
      },
      rules: {
        shipComPanyName: [{ required: true, message: '必填项', trigger: 'blur' }],
        nameEn: [{ required: true, message: '必填项', trigger: 'blur' }],
        nameCn: [{ required: true, message: '必填项', trigger: 'blur' }],
        userDept: [{ required: true, message: '必填项', trigger: 'change' }],
        dw: [{ required: true, message: '必填项', trigger: 'change' }]
      },
      tableChecked: [],
      tableChecked2: [],
      oiShipInfo: {
        shipMde: [],
        shipPM: [],
        shipGenerator: [],
        shipBoiler: [],
        shipIncinerator: [],
        shipInert: [],
        shipGasTurbines: []
      },
      editRowId: '',
      rowModel: {},
      cmsaEEVisiable: false,
      chartTitle: '',
      xData: [],
      legendData: [],
      seriesData: [],
      chartFlag: false,
      dialogVisible:{
        dalog:false,
        id:""
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handlApp(row) {
      console.log(row)
      this.dialogVisible.dalog = true
      this.dialogVisible.id = row.id
      this.dialogVisible.imono = row.imono
    },
    app() {
      this.dialogVisible.dalog = false
      this.getList()
    },
    selectComPany(){
      this.$refs.ShipComPanySelect.handleCreateRelation()      
    },
    getList() {
      this.listLoading = true
      var dw = '?&dw=' + this.dw.split('~')[0] + '&dw=' + this.dw.split('~')[1]
      var url = '/shipManager/shipList'
      if (this.dw !== '') {
        url = url + dw
      }
      if(this.shipComPany === undefined || this.shipComPany === "")
      {
        this.listQuery.shipComPanyName = ""
      }
      getQueryPage(url, this.listQuery).then(response => {
        this.list = response.data.data.items
        this.total = response.data.data.total
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    getShipCompanyList() {
      this.listLoading = true
      // this.listShipCompanyQuery.pageSize=1
      userShipCompanyList(this.listShipCompanyQuery).then(response => {
        this.shipCompanylist = response.data.data.items
        this.total2 = response.data.data.total
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.currentPage = 1

      this.getList()
    },
    reset(){
      this.listQuery = {
        currentPage: 1,
        pageSize: 20,
        dw: '',
        shipComPanyName: '',
        isCmca: 0,
        sort: 'spname'
      },
      this.getList()
    },
    handleShipCompanyFilter() {
      this.getShipCompanyList()
    },
    handleShipCompanyReset(){
      this.listShipCompanyQuery = {
        pageNum: 1,
        pageSize: 20,
        nameCn: '',
        nameEn: '',
        ccsCode: ''
      }
      this.getShipCompanyList()
    },
    handleDeleteUser(row) {
      var url = '/sysUser/deleteUser'
      postFormData(url , {'id' : row.id}).then(response => {
        for (const v of this.list) {
          if (v.id === row.id) {
            const index = this.list.indexOf(v)
            this.list.splice(index, 1)
            break
          }
        }
        if (response.data.result === true)
        {
          this.dialogFormVisible = false
          this.$notify({
            title: 'Success',
            message: 'Success',
            type: 'success',
            duration: 2000
           })
        } else {
          this.$notify({
            title: 'Failure',
            message: response.data.data,
            type: 'error'
            })
        }
      })
    },
    showEnergyEfficiency(row) {
      this.dialogStatus = 'eeData'
      this.cmsaEEVisiable = true
      this.$nextTick(() => {
        this.$refs.cmsaEnergyEfficiency.listQuery = {
          currentPage: 1,
          pageSize: 20,
          shipComPanyName: '',
          shipNameOrImoOrRegisterNo: row.registerno,
          volageCode: '',
          startTime: null,
          endTime: null        
        }
        this.$refs.cmsaEnergyEfficiency.getList()
        this.$refs.cmsaEnergyEfficiency.eeDataVisiable = false
      })
    },
    showEnergyEfficiencyStatus(){
      const xData = ['054W', '055E', '057E', '057W', '058E']
      const legendData = ['EEOI（g/t·nm）', '每海里油耗(100吨/海里)']
      const seriesData = [
        {
          name: 'EEOI（g/t·nm）',
          type: 'line',
          yAxisIndex: 0,
          data: [19.82, 20.53, 22.59, 12.52, 21.05]
        },
        {
          name: '每海里油耗(100吨/海里)',
          type: 'line',
          yAxisIndex: 0,
          data: [16.23, 10.82, 11.74, 18.39, 11.96]
        }
        // ,
        // {
        //   name: 'EEOI',
        //   type: 'bar',
        //   yAxisIndex: 0,
        //   data: [10.01, 20.23, 30.5, 45.5, 20.8, 25.5, 23.8, 18.8, 35.5, 38.5, 26.2, 30.5]
        // },
        // {
        //   name: 'fuelPerMile',
        //   type: 'bar',
        //   yAxisIndex: 0,
        //   data: [10.01, 20.23, 30.5, 40.5, 20.8, 22.5, 15.8, 2.8, 10.5, 20.5, 31.2, 12.5]
        // }
      ]
      this.chartTitle = 'xx公司/xx船舶 航次分析'
      this.xData = xData
      this.legendData = legendData
      this.seriesData = seriesData
      this.chartFlag = true
      this.eeStatusVisiable = true
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
    handleDeleteRelation(row) {
      if (confirm('确定要删除？') === true) {
         const index = this.relationedShipCompanyList.indexOf(row)
         this.relationedShipCompanyList.splice(index, 1)
        }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    handleCreate() {
      this.resetTemp()
      this.relationedShipCompanyList = []
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.shipComPanyNameReadonly = false
      this.statusType = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleCreateRelation() {
      this.dialogShipCompanyFormVisible=true
      this.getShipCompanyList()
    },
    saveRelation(rows) {
      const companyIds = []
      for(const v of this.relationedShipCompanyList){
          companyIds.push(v.companyId)
      }
      for(const v of rows ) {
        const tempData = Object.assign({}, v)
        const index =companyIds.indexOf(v.id)
        if(index===-1) {
           this.relationedShipCompanyList.push({nameEn:tempData.nameEn,nameCn: tempData.nameCn,companyCode:tempData.ccsCode,iacsCode: tempData.iacs,companyId: tempData.id})
        }
      }
      this.dialogShipCompanyFormVisible = false
    },
    handleUpdate(row,status) {
      // this.userDetail(row.id,status)
      this.oiShipInfo = row // copy obj
      this.dialogStatus = 'update'
      this.editRowId = this.oiShipInfo.id
      this.rowModel = this.oiShipInfo
      this.shipId = row.id
      this.dialogFormVisible = true
      setTimeout(() => {
        this.$refs.shipMde.resetTemp()
        this.$refs.shipPM.resetTemp()
        this.$refs.shipGenerator.resetTemp()
        this.$refs.shipInert.resetTemp()
        this.$refs.shipBoiler.resetTemp()
        this.$refs.shipIncinerator.resetTemp()
        this.$refs.shipGasTurbines.resetTemp()
        this.$refs.battery.resetTemp()
        this.resetXhOptions()
        this.$refs.shipInfo.EditRowData(this.oiShipInfo)
        this.getEqiupmentIdAndXh(this.oiShipInfo.id)
        if (status === 'detail') {
          this.formDisabledIsTrue()
          this.saveButtonIsDisabled = false
        } else {
          this.saveButtonIsDisabled = true
          this.formDisabledIsFalse()
        }
      }, 500)
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
    getEqiupmentIdAndXh(shipId) {
      var url = '/shipManager/getShipEqipment'
      getQueryPage(url, { shipId: shipId }).then(response => {
        if (response.data.data.mainEngineIds.length !== 0) {
          this.$refs.shipMde.oiMainEngineIds = response.data.data.mainEngineIds
          this.$refs.shipMde.oiMainEngine = response.data.data.mainEngineIds[0]
          this.$refs.shipMde.oiMainEngineId = response.data.data.mainEngineIds[0].id
          this.$refs.shipMde.engineIds = this.getEngineIds(response.data.data.mainEngineIds[0].energyId)
          this.$refs.shipMde.oiMainEngine.fuelIds.length = 0
          for (const item of this.$refs.shipMde.oiMainEngine.shipEquipmentFuelMaps) {
            this.$refs.shipMde.oiMainEngine.fuelIds.push(item.fuelId)
          }
        }
        if (response.data.data.shipGeIds.length !== 0) {
          this.$refs.shipPM.oiShipGeIds = response.data.data.shipGeIds
          this.$refs.shipPM.oiShipGe = response.data.data.shipGeIds[0]
          this.$refs.shipPM.oiShipGeId = response.data.data.shipGeIds[0].id
          this.$refs.shipPM.engineIds = this.getEngineIds(response.data.data.shipGeIds[0].energyid)
          this.$refs.shipPM.oiShipGe.fuelIds.length = 0
          for (const item of this.$refs.shipPM.oiShipGe.shipEquipmentFuelMaps) {
            this.$refs.shipPM.oiShipGe.fuelIds.push(item.fuelId)
          }
        }
        if (response.data.data.shipGeneratorIds.length !== 0) {
          this.$refs.shipGenerator.oiShipGeneratorIds = response.data.data.shipGeneratorIds
          this.$refs.shipGenerator.oiShipGenerator = response.data.data.shipGeneratorIds[0]
          this.$refs.shipGenerator.oiShipGeneratorId = response.data.data.shipGeneratorIds[0].id
          this.$refs.shipGenerator.oiShipGenerator.fuelIds.length = 0
          for (const item of this.$refs.shipGenerator.oiShipGenerator.shipEquipmentFuelMaps) {
            this.$refs.shipGenerator.oiShipGenerator.fuelIds.push(item.fuelId)
          }
        }
        if (response.data.data.shipBoilerIds.length !== 0) {
          this.$refs.shipBoiler.oiShipBoilerIds = response.data.data.shipBoilerIds
          this.$refs.shipBoiler.oiShipBoiler = response.data.data.shipBoilerIds[0]
          this.$refs.shipBoiler.oiShipBoilerId = response.data.data.shipBoilerIds[0].id
          this.$refs.shipBoiler.engineIds = this.getEngineIds(response.data.data.shipBoilerIds[0].energyId)
          this.$refs.shipBoiler.oiShipBoiler.fuelIds.length = 0
          for (const item of this.$refs.shipBoiler.oiShipBoiler.shipEquipmentFuelMaps) {
            this.$refs.shipBoiler.oiShipBoiler.fuelIds.push(item.fuelId)
          }
        }
        if (response.data.data.incineratorIds.length !== 0) {
          this.$refs.shipIncinerator.oiShipIncineratorIds = response.data.data.incineratorIds
          this.$refs.shipIncinerator.oiShipIncinerator = response.data.data.incineratorIds[0]
          this.$refs.shipIncinerator.oiShipIncineratorId = response.data.data.incineratorIds[0].id
          this.$refs.shipIncinerator.engineIds = this.getEngineIds(response.data.data.incineratorIds[0].energyId)
          this.$refs.shipIncinerator.oiShipIncinerator.fuelIds.length = 0
          for (const item of this.$refs.shipIncinerator.oiShipIncinerator.shipEquipmentFuelMaps) {
            this.$refs.shipIncinerator.oiShipIncinerator.fuelIds.push(item.fuelId)
          }
        }
        if (response.data.data.shipInert.length !== 0) {
          this.$refs.shipInert.oiShipInertIds = response.data.data.shipInert
          this.$refs.shipInert.oiShipInert = response.data.data.shipInert[0]
          this.$refs.shipInert.oiShipInertId = response.data.data.shipInert[0].id
          this.$refs.shipInert.engineIds = this.getEngineIds(response.data.data.shipInert[0].energyid)
          this.$refs.shipInert.oiShipInert.fuelIds.length = 0
          for (const item of this.$refs.shipInert.oiShipInert.shipEquipmentFuelMaps) {
            this.$refs.shipInert.oiShipInert.fuelIds.push(item.fuelId)
          }
        }
        if (response.data.data.shipTurbine.length !== 0) {
          this.$refs.shipGasTurbines.oiShipTurbineIds = response.data.data.shipTurbine
          this.$refs.shipGasTurbines.oiShipTurbine = response.data.data.shipTurbine[0]
          this.$refs.shipGasTurbines.oiShipTurbineId = response.data.data.shipTurbine[0].id
        }
        if (response.data.data.shipBatteryIds.length !== 0) {
          this.$refs.battery.oiShipBatteryIds = response.data.data.shipBatteryIds
          this.$refs.battery.oiShipBattery = response.data.data.shipBatteryIds[0]
          this.$refs.battery.oiShipBatteryId = response.data.data.shipBatteryIds[0].id
          this.$refs.battery.oiShipBattery.fuelIds.length = 0
          for (const item of this.$refs.battery.oiShipBattery.shipEquipmentFuelMaps) {
            this.$refs.battery.oiShipBattery.fuelIds.push(item.fuelId)
          }
        }
      })
    },
    resetXhOptions() {
      this.$refs.shipMde.oiMainEngineIds = []
      this.$refs.shipMde.oiMainEngineId = ''
      this.$refs.shipPM.oiShipGeIds = []
      this.$refs.shipPM.oiShipGeId = ''
      this.$refs.shipGenerator.oiShipGeneratorIds = []
      this.$refs.shipGenerator.oiShipGeneratorId = ''
      this.$refs.shipBoiler.oiShipBoilerIds = []
      this.$refs.shipBoiler.oiShipBoilerId = ''
      this.$refs.shipIncinerator.oiShipIncineratorIds = []
      this.$refs.shipIncinerator.oiShipIncineratorId = ''
      this.$refs.shipInert.oiShipInertIds = []
      this.$refs.shipInert.oiShipInertId = ''
      this.$refs.shipGasTurbines.oiShipTurbineIds = []
      this.$refs.shipGasTurbines.oiShipTurbineId = ''
      this.$refs.battery.oiShipBatteryIds = []
      this.$refs.battery.oiShipBatteryId = ''
    },
    formDisabledIsFalse() {
      this.$refs.shipInfo.formIsDisabled = false
      this.$refs.shipMde.formIsDisabled = false
      this.$refs.shipPM.formIsDisabled = false
      this.$refs.shipBoiler.formIsDisabled = false
      this.$refs.shipIncinerator.formIsDisabled = false
      this.$refs.shipInert.formIsDisabled = false
      this.$refs.shipGasTurbines.formIsDisabled = false
      this.$refs.shipGenerator.formIsDisabled = false
      this.$refs.battery.formIsDisabled = false
    },
    getEngineIds(str) {
      var attr = []
      if (str !== '' && str !== null) {
        attr = str.split(',')
      }
      return attr
    },
    formDisabledIsTrue() {
      this.$refs.shipInfo.formIsDisabled = true
      this.$refs.shipMde.formIsDisabled = true
      this.$refs.shipPM.formIsDisabled = true
      this.$refs.shipBoiler.formIsDisabled = true
      this.$refs.shipIncinerator.formIsDisabled = true
      this.$refs.shipInert.formIsDisabled = true
      this.$refs.shipGasTurbines.formIsDisabled = true
      this.$refs.shipGenerator.formIsDisabled = true
      this.$refs.battery.formIsDisabled = true
    },    
    handleClick() {
    },
    deleteEquipment() {
      if (confirm('确认是否删除设备') === true) {
        var url = ''
        var oiShipInfo = ''
        var equipmentids = ''
        if (this.activeName === 'second') {
          url = '/shipManager/deleteMainEngine'
          oiShipInfo = { id: this.$refs.shipMde.oiMainEngineId }
          equipmentids = this.$refs.shipMde.oiMainEngineIds
        } else if (this.activeName === 'third') {
          url = '/shipManager/deleteShipAuEngine'
          oiShipInfo = { id: this.$refs.shipPM.oiShipGeId }
          equipmentids = this.$refs.shipPM.oiShipGeIds
        } else if (this.activeName === 'eighth') {
          url = '/shipManager/deleteShipGenerator'
          oiShipInfo = { id: this.$refs.shipGenerator.oiShipGeneratorId }
          equipmentids = this.$refs.shipGenerator.oiShipGeneratorIds
        } else if (this.activeName === 'fourth') {
          url = '/shipManager/deleteShipBoiler'
          oiShipInfo = { id: this.$refs.shipBoiler.oiShipBoilerId }
          equipmentids = this.$refs.shipBoiler.oiShipBoilerIds
        } else if (this.activeName === 'fifth') {
          url = '/shipManager/deleteShipIncinerator'
          oiShipInfo = { id: this.$refs.shipIncinerator.oiShipIncineratorId }
          equipmentids = this.$refs.shipIncinerator.oiShipIncineratorIds
        } else if (this.activeName === 'sixth') {
          url = '/shipManager/deleteShipInert'
          oiShipInfo = { id: this.$refs.shipInert.oiShipInertId }
          equipmentids = this.$refs.shipInert.oiShipInertIds
        } else if (this.activeName === 'seventh') {
          url = '/shipManager/deleteShipTurbine'
          oiShipInfo = { id: this.$refs.shipGasTurbines.oiShipTurbineId }
          equipmentids = this.$refs.shipGasTurbines.oiShipTurbineIds
        } else if (this.activeName === 'eleven') {
          url = '/shipManager/deleteOiShipBattery'
          oiShipInfo = { id: this.$refs.battery.oiShipBatteryId }
          equipmentids = this.$refs.battery.oiShipBatteryIds
        }
        postFormData(url, oiShipInfo).then(response => {
          if (response.data.result) {
            for (const v of equipmentids) {
              if (v.id === oiShipInfo.id) {
                const index = equipmentids.indexOf(v)
                equipmentids.splice(index, 1)
              }
            }
            this.$notify({
              message: response.data.data,
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              message: 'delete failed',
              type: 'error',
              duration: 2000
            })
          }
        })
      } else {
        // wuyong
      }
    },
    
    resetForm() {
      var id = ''
      if (this.activeName === 'first') {
        id = this.$refs.shipInfo.oiShipInfo.id
        this.$refs.shipInfo.resetForm()
        if (this.dialogStatus === 'update') {
          this.$refs.shipInfo.oiShipInfo.id = id
        }
      } else if (this.activeName === 'second') {
        id = this.$refs.shipMde.oiMainEngine.id
        this.$refs.shipMde.resetTemp()
        if (this.dialogStatus === 'update') {
          this.$refs.shipInfo.oiShipInfo.id = id
        }
      } else if (this.activeName === 'third') {
        id = this.$refs.shipPM.oiShipGe.id
        this.$refs.shipPM.resetTemp()
        if (this.dialogStatus === 'update') {
          this.$refs.shipPM.oiShipGe.id = id
        }
      } else if (this.activeName === 'eighth') {
        id = this.$refs.shipGenerator.oiShipGenerator.id
        this.$refs.shipGenerator.resetTemp()
        if (this.dialogStatus === 'update') {
          this.$refs.shipGenerator.oiShipGenerator.id = id
        }
      } else if (this.activeName === 'fourth') {
        id = this.$refs.shipBoiler.oiShipBoiler.id
        this.$refs.shipBoiler.resetTemp()
        if (this.dialogStatus === 'update') {
          this.$refs.shipBoiler.oiShipBoiler.id = id
        }
      } else if (this.activeName === 'fifth') {
        id = this.$refs.shipIncinerator.oiShipIncinerator.id
        this.$refs.shipIncinerator.resetTemp()
        if (this.dialogStatus === 'update') {
          this.$refs.shipIncinerator.oiShipIncinerator.id = id
        }
      } else if (this.activeName === 'sixth') {
        id = this.$refs.shipInert.oiShipInert.id
        this.$refs.shipInert.resetTemp()
        if (this.dialogStatus === 'update') {
          this.$refs.shipInert.oiShipInert.id = id
        }
      } else if (this.activeName === 'seventh') {
        id = this.$refs.shipGasTurbines.oiShipTurbine.id
        this.$refs.shipGasTurbines.resetTemp()
        if (this.dialogStatus === 'update') {
          this.$refs.shipGasTurbines.oiShipTurbine.id = id
        }
      } else if (this.activeName === 'eleven') {
        id = this.$refs.battery.oiShipBatteryId.id
        this.$refs.battery.resetTemp()
        if (this.dialogStatus === 'update') {
          this.$refs.shipGasTurbines.oiShipTurbine.id = id
        }
      }
    },
  }
}
</script>
<style scoped>
  .chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 300px);
  }
</style>
