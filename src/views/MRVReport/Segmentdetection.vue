<template>
  <div class="app-container">
    <div class="filter-container">
      <div style="padding:10px 10px 0; display:flex;align-items: center;">
        <label class="radio-label">{{ $t('MRV.VesselName') }}</label>
        <div class="addBox">
          <el-input v-model="shipName" disabled :placeholder="$t('MRV.boxselect')" />
          <el-button  style="margin-left:5px" @click="addImon">
          {{ $t('common.select') }}
        </el-button>
        </div>
        <label class="radio-label">{{ $t('ship.searchOperator') }}</label>
        <div class="addBox">
          <el-input v-model="shipComPanyName" disabled :placeholder="$t('MRV.boxselect')" />
          <el-button  style="margin-left:5px" @click="addImonName">
          {{ $t('common.select') }}
        </el-button>
        </div>
        <label class="radio-label">{{ $t('MRV.Year') }}</label>
        <el-select v-model="listQuery.year" :placeholder="$t('common.selectRemind')" clearable class="filter-item" size="mini" style="width: 120px">
          <el-option v-for="item in yearOptions" :key="item" :label="item" :value="item" />
        </el-select>
         <label class="radio-label">{{ $t('voyage.voyageLegCode') }}</label>
          <el-input v-model="listQuery.taskNu" placeholder="请输入" style="width:150px;" @keyup.enter.native="handleFilter"/>
      </div>
      <div style="display:flex;align-items: center;">
        <label class="radio-label">{{ $t('MRV.SearchType') }}:</label>
        <div style="width:120px;">
        <el-switch
        v-model="SearchType"
        active-color="#13ce66"
        inactive-color="#DCDFE6">
        </el-switch>
        </div>
         <label class="radio-label">{{ $t('ship.Abnormaldata') }}:</label>
        <div style="width:120px">
        <el-switch
        v-model="listQuery.isAbnormalData"
        active-color="#13ce66"
        inactive-color="#DCDFE6">
        </el-switch>
        </div>
        <el-button class="filter-item" icon="el-icon-search" style="margin-left:20px" @click="handleFilter">
          {{ $t('common.search') }}
        </el-button>
        <el-button class="filter-item" type="info" style="margin-left:20px" @click="handleReset">
          {{ $t('common.reset') }}
        </el-button>
        <el-button class="filter-item" type="primary" style="margin-left:20px" @click="exportClick">
          {{ $t('MRV.Exportexceptiondata') }}
        </el-button>
      </div>
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      :height="tableHeight"
      highlight-current-row
      style="width: 100%; overflow:auto"
      :row-style="{height:'35px'}"
      :cell-style="{padding:'0'}"
      :empty-text="$t('MRV.noDataAlert')"
    >
        <el-table-column
         :label="$t('common.no')"
          type="index"
          width="50"
          align="center"
          >
        </el-table-column>
        <el-table-column :label="$t('MRV.VesselName')" width="150px" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.shipName }}</span>
          </template>
        </el-table-column>
         <el-table-column :label="$t('MRV.Departureport')" width="150px" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.startPort }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('MRV.Segmenttime')" width="300px" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.satrtPortDeptTime | datesformat('YYYY-MM-DD HH:mm:ss') }} ~ {{ row.endPortDeptTime | datesformat('YYYY-MM-DD HH:mm:ss') }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('voyage.voyageLegCode')" width="110px" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.taskNu}}/{{ row.segmentNu}}</span>
          </template>
        </el-table-column>
         <el-table-column :label="$t('MRV.Portofarrival')" width="110px" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.endPort }}</span>
          </template>
        </el-table-column>
         <el-table-column :label="$t('MRV.Voyagemileage')" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
          <div style="display:flex;align-items:center;">
          <span style="width:50px;">{{ row.distance }}</span>
           <el-tooltip class="item" effect="dark" placement="top" >
           <div slot="content">{{ $t('voyage.voyage') }}</div>
           <svg-icon v-if="row.distance  < 0" icon-class="jinggao" style="margin-left:5px;color:red;"></svg-icon>
          </el-tooltip>
          </div>
          </template>
        </el-table-column>
         <el-table-column :label="$t('MRV.Cargopassengercapacity')" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.cargo }}</span>
          </template>
        </el-table-column>
         <el-table-column :label="$t('MRV.Sailingtimehours')" width="110px" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.sailTime }}</span>
          </template>
        </el-table-column>
         <el-table-column :label="$t('MRV.Parkingtimeontheway')" width="150px" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.stopTime }}</span>
          </template>
        </el-table-column>
         <el-table-column :label="$t('MRV.consumption')" width="110px" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.oilHfo }}</span>
          </template>
        </el-table-column>
         <el-table-column :label="$t('MRV.Navigation')" width="110px" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.oilLfo }}</span>
          </template>
        </el-table-column>
         <el-table-column :label="$t('MRV.consumptionofnavigation')" width="140px" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.oilChaiQi }}</span>
          </template>
        </el-table-column>
         <el-table-column :label="$t('MRV.loadinandunloading')" width="140px" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.stopOilHfo }}</span>
          </template>
        </el-table-column>
         <el-table-column :label="$t('MRV.FOconsumption')" width="140px" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.stopOilLfo }}</span>
          </template>
        </el-table-column>
         <el-table-column :label="$t('MRV.GDOMgO')" width="170px" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.stopOilChaiQi }}</span>
          </template>
        </el-table-column>
    </el-table>
    <pagination v-if="total>0" :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize" @pagination="getList"/>
    <shipSwlectsDelog :add="dialogShipCompanyFormVisible" @adds="adds" v-if="dialogShipCompanyFormVisible"/>
    <shipComPanyName :shipComPanyNamevicode="dialogShipCompanyFormVisibles" @shipComPanyNameData="shipComPanyNameData" v-if="dialogShipCompanyFormVisibles"/>
  </div>
</template>

<script>
import { segmentMonitoring, downloadSegmentMonitoring } from '@/api/requestPost'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import shipSwlectsDelog from '../../components/ShipComPanySelect/shipSwlects-delog'
import shipComPanyName from '../../components/ShipComPanySelect/shipComPanyName-dalog'
import {getYears} from '@/api/requestGet'
export default {
  name: 'Segmentdetection',
  components: { Pagination,shipSwlectsDelog, shipComPanyName },
  data() {
    return {
      shipComPanyName: '', // 船公司
      shipName: '', // 船名
      dialogShipCompanyFormVisible: false,
      dialogShipCompanyFormVisibles: false,
      tableKey: 0,
      tableHeight: window.innerHeight - 240,
      list: [],
      total: 0,
      listLoading: true,
      SearchType: false,
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        isEu: 0,
        isAbnormalData: false,
        shipComPanyName: '',
        shipName: '',
        year: '2020',
        taskNu: ''
      },
      yearOptions: []
    }
  },
  watch:{
    SearchType(val){
      if(val) {
        this.listQuery.isEu = 1
      } else {
         this.listQuery.isEu = 0
      }

    }
  },
  created() {
    this.listLoading = false
    this.getList()
    this.initYear()
  },
  methods: {
    // 文件导出
    download(data,name) {
     if (!data) {
       return
     }
     const url = window.URL.createObjectURL(new Blob([data]))
     const link = document.createElement('a')
     link.style.display = 'none'
     link.href = url
     if(name){
       link.setAttribute('download', `${name}`)
     }else{
       link.setAttribute('download', 'excel.xlsx')
     }
     document.body.appendChild(link)
     link.click()
   },
    initYear() {
      getYears().then(res => {
        this.yearOptions = res.data.data
      })
    },
    exportClick() {
      // 导出异常数据
      let url = '/mrv/downloadSegmentMonitoring'
      downloadSegmentMonitoring(url, {segmentMonitoringVos:this.list}).then(res => {
         this.download(res.data, '航段监测数据表.xls')
        // fileDownload(res.data, '异常数据表.xls')
      })
    },
    // 弹框数据
    adds(val) {
      this.shipName = val.name
      this.listQuery.shipName = val.id
      this.dialogShipCompanyFormVisible = false
    },
    // 弹框数据
    shipComPanyNameData(val) {
      this.shipComPanyName = val.name
      this.listQuery.shipComPanyName = val.id
      this.dialogShipCompanyFormVisibles = false
    },
    // addImon
    addImon() {
      this.dialogShipCompanyFormVisible = true
    },
    // addImonName
    addImonName() {
      this.dialogShipCompanyFormVisibles = true
    },
    // 请求数据
    getList() {
      this.listLoading = true
      var url = '/mrv/segmentMonitoring'
      segmentMonitoring(url, this.listQuery).then(response => {
        this.list = response.data.data.items
        this.total = response.data.data.total
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    // 重置
    handleReset() {
      this.listQuery.currentPage = 1
      this.listQuery.pageSize = 20
      this.listQuery.isEu = 0
      this.listQuery.isAbnormalData = false
      this.listQuery.shipComPanyName=''
      this.listQuery.shipName=''
      this.listQuery.year = '2020'
      this.shipComPanyName= ''
      this.shipName= ''
      this.listQuery.taskNu = ''
      this.getList()
    },
    // 搜索
    handleFilter() {
       this.listQuery.currentPage = 1
      this.getList()
    }
  }
}
</script>
<style scoped>
  .el-table__empty-text {
    display: block;
    width: 500px;
    height: 385px;
    padding-top: 300px;
    background:url('../../images/noData.png') no-repeat;
    color: #909399;
    box-sizing: border-box;
  }
  .radio-label {
    font-size: 12px;
    color: #606266;
    padding:0;
    width:70px;
    text-align:right;
    margin-right: 10px;
  }
  .el-select{
    margin-right:20px;
  }
  .el-checkbox__label{
    padding-left:5px;font-size: 12px;
  }
  .addBox{
    display: flex;
  }
</style>
