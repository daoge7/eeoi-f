<template>
  <div class="app-container">
    <div class="filter-container">
      <div style="padding:10px 10px 0;">
        <label class="radio-label" >{{ $t('MRV.shipCompany') }}</label>
        <el-select v-model="listQuery.shipCompany" :placeholder="$t('common.selectRemind')" clearable class="filter-item" size="mini" style="width: 130px">
          <el-option v-for="item in shipCompanyOptions" :key="item.key" :label="item.display_name" :value="item.key" />
        </el-select>
        <label class="radio-label" >{{ $t('MRV.VesselName') }}</label>
        <el-select v-model="listQuery.VesselName" :placeholder="$t('common.selectRemind')" clearable class="filter-item" size="mini" style="width: 130px">
          <el-option v-for="item in VesselNameOptions" :key="item.key" :label="item.display_name" :value="item.key" />
        </el-select>
        <label class="radio-label" > {{ $t('MRV.VesselType') }} </label>
        <el-select v-model="listQuery.VesselType" :placeholder="$t('common.selectRemind')" clearable class="filter-item" size="mini" style="width: 130px">
          <el-option v-for="item in VesselTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
        </el-select>
    </div>
    <div style="padding:0 10px ;">
        <label class="radio-label" >{{ $t('MRV.Year') }}</label>
        <el-select v-model="listQuery.Year" :placeholder="$t('common.selectRemind')" clearable class="filter-item" size="mini" style="width: 130px">
          <el-option v-for="item in yearOptions" :key="item" :label="item" :value="item" />
        </el-select>
        <label class="radio-label">{{ $t('MRV.TonnageScope') }}</label>
        <el-select v-model="listQuery.TonnageScope" :placeholder="$t('common.selectRemind')" clearable class="filter-item" size="mini" style="width: 130px">
          <el-option v-for="item in TonnageScopeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
        </el-select>
        <label class="radio-label">{{ $t('MRV.ScopeofShipAge') }}</label>
        <el-select v-model="listQuery.ScopeofShipAge" :placeholder="$t('common.selectRemind')" clearable class="filter-item" size="mini" style="width: 130px">
          <el-option v-for="item in ScopeofShipAgeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
        </el-select>
      </div>
      <div style="padding:0 10px;">
        <div style="float:left;">
          <label class="radio-label">{{ $t('MRV.TypeofAnalysis') }}</label>
        </div>
        <div style="padding-left:75px;">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" style="margin-right: 10px;line-height:35px;" @change="handleCheckAllChange">{{ $t('MRV.SelectAll') }}</el-checkbox>
          <el-checkbox-group v-model="listQuery.checkedAnalyzeItems" @change="handleCheckedItemsChange">
            <el-checkbox style="margin: 0 15px 10px 0;" v-for="item in analyzeItems" :label="item.key" :key="item">{{item.display_name}}</el-checkbox>
          </el-checkbox-group>
        </div>        
      </div>
      <div style="padding-left:85px;">
        <el-button class="filter-item" icon="el-icon-search" @click="handleFilter">
          {{ $t('common.Statistics') }}
        </el-button>
        <el-button class="filter-item" type="info" icon="el-icon-setting" @click="handleReset">
          {{ $t('common.reset') }}
        </el-button>
      </div>
    
    </div>
    <div>
        <div align="center" v-if="showInitImg">
          <img src="../../images/Analysis.png"/>
          <br />
          <span style="text-align:center">{{ $t('MRV.analysis') }}</span>
        </div>
        <div class="chart-container" v-if="showAnalysis">
          <chart ref="chart" v-if="chartFlag" height="100%" width="100%" v-bind:chartTitle="this.chartTitle" v-bind:xData="this.xData" v-bind:legendData="this.legendData" v-bind:seriesData="this.seriesData" />
        </div>
    </div>
  </div>
</template>

<script>
import { getQueryPage, getYears } from '@/api/requestGet'
import Chart from '@/components/Charts/MultiDataMixChart'

const VesselTypeOptions = [
  { key: '1', display_name: '散货船' },
  { key: '2', display_name: '液货船' },
  { key: '3', display_name: '气体运输船' },
  { key: '4', display_name: '集装箱船' },
  { key: '5', display_name: '滚装货船' },
  { key: '6', display_name: '普通货船' }
]

const TonnageScopeOptions = [
  { key: '2', display_name: '0~2000' },
  { key: '3', display_name: '2000~4000' },
  { key: '4', display_name: '4000~6000' },
  { key: '5', display_name: '6000~8000' },
  { key: '6', display_name: '8000~10000' },
  { key: '7', display_name: '10000~12000' },
  { key: '8', display_name: '12000~14000' },
  { key: '9', display_name: '14000~16000' },
  { key: '10', display_name: '16000~18000' },
  { key: '11', display_name: '18000~20000' },
  { key: '12', display_name: '20000~22000' },
  { key: '13', display_name: '22000~24000' },
  { key: '14', display_name: '26000~28000' },
  { key: '15', display_name: '14000~16000' },
  { key: '16', display_name: '16000~18000' },
  { key: '17', display_name: '18000~20000' },
  { key: '18', display_name: '20000~22000' }
]

const ScopeofShipAgeOptions = [
  { key: '2', display_name: '0~5' },
  { key: '3', display_name: '5~10' },
  { key: '4', display_name: '10~15' },
  { key: '5', display_name: '15~20' },
  { key: '6', display_name: '20~25' },
  { key: '7', display_name: '25~30' }
]
const shipCompanyOptions = [
  { key: '1', display_name: '公司1' },
  { key: '2', display_name: '公司2' }
]
const VesselNameOptions = [
  { key: '1', display_name: '船舶1' },
  { key: '2', display_name: '船舶2' }
]
const analyzeItemsOptions = [
  { key: 'CO2PerDay', display_name: '每航段平均日CO2排放' },
  { key: 'CO2PerTransportWork', display_name: '每航段的CO2排放/周转量' },
  { key: 'Averagespeed', display_name: '每航段的平均航速' },
  { key: 'CO2PerNauticalMile', display_name: '每航段CO2排放/海里' },
  { key: 'FuelDay', display_name: '每航段平均日油耗' },
  { key: 'FuelTransportwork', display_name: '每航段的油耗/周转量' },
  { key: 'FuelNauticalMile', display_name: '每航段油耗/海里' }
]
const VesselNameKeyValue = VesselNameOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'DiagramExhibition',
  components: { Chart },
  data() {
    return {
      chartTitle: '',
      xData: [],
      legendData: [],
      seriesData: [],
      list: null,
      listQuery: {
        shipCompany: undefined,
        VesselName: undefined,
        VesselType: undefined,
        Year: '2020',
        TonnageScope: undefined,
        ScopeofShipAgeOptions: undefined,
        checkedAnalyzeItems: ['CO2PerDay', 'CO2PerTransportWork']
      },
      VesselTypeOptions,
      yearOptions: [],
      shipCompanyOptions,
      VesselNameOptions,
      TonnageScopeOptions,
      ScopeofShipAgeOptions,
      isIndeterminate: true,
      analyzeItems: analyzeItemsOptions,
      showInitImg: false,
      showAnalysis: false,
      chartFlag: false
    }
  },
  created() {
    this.showAnalysis = false
    this.showInitImg = true
    this.initYear()
  },
  methods: {
    initYear() {
      getYears().then(res => {
        this.yearOptions = res.data.data
      })
    },
     getChartData() {       
      var url = '/MRVReport/DiagramExhibition'
      getQueryPage(url, this.listQuery).then(response => {
        this.chartTitle = response.data.chartTitle
        this.xData = response.data.xData
        this.legendData = response.data.legendData
        this.seriesData = response.data.seriesData
        this.list = response.data.listData
        this.chartFlag = true
      })
    },
    handleReset() {
      this.listQuery.shipCompany = ''
      this.listQuery.VesselName = ''
      this.listQuery.VesselType = ''
      this.listQuery.Year = '2020'
    },
    handleFilter() {
      const shipItem = this.listQuery.VesselName
     // if (shipItem === null || shipItem === '' || shipItem === undefined) {
       if(false) {
        this.$message({
          showClose: true,
          message: '请先选择船舶再进行数据统计',
          type: 'error'
        })
      } else {
        this.showInitImg = false
        this.showAnalysis = true
        this.getChartData()
        this.$refs.chart.initChart()
      }
    },
    handleExport() {
      this.$notify({
        title: 'Success',
        message: 'export Successfully',
        type: 'success',
        duration: 2000
      })
    },
    renderheader(h, { column, $index }) {
      return h('span', {}, [
        h('span', {}, column.label.split('|')[0]),
        h('br'),
        h('span', {}, column.label.split('|')[1]),
        h('br'),
        h('span', {}, column.label.split('|')[2])
      ])
    },
    handleCheckAllChange(val) {
      const checkList = []
      if (val) {
        for (const v of this.analyzeItems) {
          checkList.push(v.key)
        }
      }
      this.listQuery.checkedAnalyzeItems = checkList
      this.isIndeterminate = false
    },
    handleCheckedItemsChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.analyzeItems.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.analyzeItems.length
    }
  }
}
</script>
<style>
  .el-table__empty-text {
    display: block;
    width: 500px;
    height: 385px;
    padding-top: 300px;
    background:url('../../images/noData.png') no-repeat;
    color: #909399;
    box-sizing: border-box;
  }
  .chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 300px);
  }

  .radio-label {
    display: inline-block;
    font-size: 12px;
    color: #606266;
    line-height: 35px;
    padding:0;
    width:50px;
  }
  .el-select{
    margin-right:20px;
  }
  .el-checkbox__label{
    padding-left:5px;font-size: 12px;
  }
</style>