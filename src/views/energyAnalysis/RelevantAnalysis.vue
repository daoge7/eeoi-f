<template>
  <div class="app-container">
    <div class="filter-container">
      <div style="display:flex;align-items: center;">
        <div style="padding:10px 10px 0; display:flex;align-items: center;">
        <label class="radio-label">{{ $t('Analysis.shipCompany') }}</label>
        <div class="addBox">
          <el-input v-model="shipComPanyName" :readonly="true" :placeholder="$t('MRV.boxselect')" />
          <el-button  style="margin-left:5px" @click="addImonName">
          {{ $t('common.select') }}
        </el-button>
        </div>
        </div>
        <div style="padding:10px 10px 0; display:flex;align-items: center;">
        <label class="radio-label" style="padding-left:30px">{{ $t('Analysis.shipType') }}</label>
         <el-select v-model="listQuery.shipTypeCode" :placeholder="$t('common.selectRemind')" clearable class="filter-item" style="width: 130px">
          <el-option v-for="item in shipTypeOptions" :key="item.id" :label="item.csptype" :value="item.spcode" />
        </el-select>
        </div>
        <div style="padding:10px 10px 0; display:flex;align-items: center;">
        <label class="radio-label">{{ $t('Analysis.shipSubType') }}</label>
        <el-select v-model="listQuery.shipTypeSub" :placeholder="$t('common.selectRemind')" clearable class="filter-item" style="width: 130px">
          <el-option v-for="item in shipSubTypeOptions" :key="item.id" :label="item.subName" :value="item.subCode" />
        </el-select>
        </div>
        <div style="padding:10px 10px 0; display:flex;align-items: center;">
        <label class="radio-label">{{ $t('Analysis.grossScope') }}</label>
        <el-select v-model="listQuery.grossRange" :placeholder="$t('common.selectRemind')" clearable class="filter-item" style="width: 130px">
          <el-option v-for="item in grossOptions" :key="item.id" :label="item.tonSmall +'~'+ item.tonBig  " :value="item.tonSmall +'~'+ item.tonBig" />
        </el-select>
        </div>
         <div style="padding:10px 10px 0; display:flex;align-items: center;">
        <label class="radio-label">{{ $t('Analysis.ageLimit') }}</label>
        <el-select v-model="listQuery.shipAgeRange" :placeholder="$t('common.selectRemind')" clearable class="filter-item" style="width: 130px">
          <el-option v-for="item in ageLimitOptions" :key="item.id" :label="item.ageSmall + '~'+ item.ageBig" :value="item.ageSmall + '~'+ item.ageBig" />
        </el-select>
         </div>
      </div>
      <div style="display:flex;align-items: center;">
        <div style="padding:10px 10px 0; display:flex;align-items: center;">
        <label class="radio-label" style="padding-left:15px">{{ $t('Analysis.shipName') }}</label>
        <div class="addBox">
          <el-input v-model="shipName" :readonly="true" :placeholder="$t('MRV.boxselect')" />
          <el-button style="margin-left:5px" @click="addImon">
          {{ $t('common.select') }}
        </el-button>
        </div>
        </div>
        <div style="padding:10px 10px 0; display:flex;align-items: center;">
        <label class="radio-label">{{ $t('Analysis.startYear') }}</label>
        <el-select v-model="listQuery.startYear" :placeholder="$t('common.selectRemind')" clearable class="filter-item" style="width: 130px">
          <el-option v-for="item in yearOptions" :key="item" :label="item" :value="item" />
        </el-select>
        </div>
        <div style="padding:10px 10px 0; display:flex;align-items: center;">
        <label class="radio-label">{{ $t('Analysis.endYear') }}</label>
        <el-select v-model="listQuery.endYear" :placeholder="$t('common.selectRemind')" clearable class="filter-item" style="width: 130px">
          <el-option v-for="item in yearOptions" :key="item" :label="item" :value="item" />
        </el-select>
        </div>
        <div style="padding:10px 10px 0; display:flex;align-items: center;">
        <label class="radio-label">{{ $t('Analysis.computingUnit') }}</label>
        <el-select v-model="listQuery.rollingCycleUnit" :placeholder="$t('common.selectRemind')" clearable class="filter-item" style="width: 130px">
          <el-option v-for="item in rollingCycleUnitOptions" :key="item.key" :label="item.display_name" :value="item.key" />
        </el-select>
        </div>
      </div>
      <div style="display:inline-block;">
        <el-col :span="1.5">
          <label class="radio-label">{{ $t('Analysis.analyzeItems') }}</label>
        </el-col>
        <el-col :span="22.5">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" style="margin-right: 10px;" @change="handleCheckAllChange">{{ $t('Analysis.checkAll') }}</el-checkbox>
          <el-checkbox-group v-model="listQuery.indexItems" @change="handleCheckedItemsChange">
            <el-checkbox style="margin-right: 10px;" v-for="(item,index) in analyzeItems" :label="item.key" :key="index">{{item.display_name}}</el-checkbox>
          </el-checkbox-group>
        </el-col>
      </div>
      <div style="display:inline-block;">
        <el-button class="filter-item" icon="el-icon-search" @click="handleFilter">
          {{ $t('common.Statistics') }}
        </el-button>
        <el-button class="filter-item" type="info" icon="el-icon-setting" @click="handleReset">
          {{ $t('common.reset') }}
        </el-button>
        <el-button class="filter-item" type="primary" plain icon="el-icon-download" @click="handleExport">
            {{ $t('common.exportExcel') }}
        </el-button>
      </div>
    </div>
    <el-tabs value="first" style="height:100%;overflow-y:auto;overflow-x:hidden;">
      <el-tab-pane :label="$t('Analysis.AnalysisChart')" name="first" :key="'first'">
        <div align="center" v-if="showInitImg">
          <img src="../../images/Analysis.png" />
          <br />
          <span style="text-align:center">{{ $t('MRV.analysis') }}</span>
        </div>
        <div class="chart-container" v-if="showAnalysis">
          <chart ref="chart" v-if="chartFlag" height="100%" width="100%" v-bind:chartTitle="this.chartTitle" v-bind:xData="this.xData" v-bind:legendData="this.legendData" v-bind:seriesData="this.seriesData" />
        </div>
      </el-tab-pane>
      <el-tab-pane :label="$t('Analysis.AnalysisData')" name="second" :key="'second'">
        <el-table
        :data="list"
        border
        fit
        height="100px"
        v-adaptive="{bottomOffset: 38}"
        highlight-current-row
        style="width:100%;overflow:auto"
        :row-style="{height:'35px'}"
        :cell-style="{padding:'0'}"
        >
          <el-table-column :label="titlez" align="center" width="120">
            <template slot-scope="{row}">
              <span>{{ row.time }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('Analysis.EEOI')" width="120" align="center">
            <template slot-scope="{row}">
              <span>{{ row.eeoi }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('Analysis.fuelPerMile')" width="auto" align="center" :render-header="renderheader">
            <template slot-scope="{row}">
              <span>{{ row.fuelPerMile }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('Analysis.fuelPerTransport')" width="auto" align="center" :render-header="renderheader">
            <template slot-scope="{row}">
              <span>{{ row.fuelPerT }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('Analysis.CO2Distance')" width="auto" align="center" :render-header="renderheader">
            <template slot-scope="{row}">
              <span>{{ row.co2PerMile }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('Analysis.CO2Transport')" width="auto" align="center" :render-header="renderheader">
            <template slot-scope="{row}">
              <span>{{ row.co2PerT }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('Analysis.reductionRatio')" width="auto" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              <span>{{ row.dropRadio }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('Analysis.loadUtilization')" width="120" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              <span>{{ row.userRate }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <shipSwlectsDelog :add="dialogShipCompanyFormVisible" @adds="adds" v-if="dialogShipCompanyFormVisible"/>
    <shipComPanyName :shipComPanyNamevicode="dialogShipCompanyFormVisibles" @shipComPanyNameData="shipComPanyNameData" v-if="dialogShipCompanyFormVisibles"/>
  </div>
</template>

<script>

// import { postFormData } from '@/api/requestPost'
import { getYears, savefindShipTypeList, savefindShipSubList, savefindDicGrossTonList,findShipAgeList } from '@/api/requestGet'
import { getEnergyEfficencyTrend,getEnergyEfficencyTrendData, downLoadEnergyEfficencyTrendData } from '@/api/requestPost'
import Chart from '@/components/Charts/MultiDataMixChart'
import Cookies from 'js-cookie'
import adaptive from '@/directive/el-table'
import shipSwlectsDelog from '../../components/ShipComPanySelect/shipSwlects-delog'
import shipComPanyName from '../../components/ShipComPanySelect/shipComPanyName-dalog'

let rollingCycleUnitOptions = [
  { key: '月', display_name: '月',disabled: false },
  { key: '季', display_name: '季',disabled: false },
  { key: '年', display_name: '年',disabled: false }
]
const analyzeItemsOptions = [
  { key: '1', display_name: 'EEOI(g/t∙nm)' },
  { key: '2', display_name: '每海里油耗(kg/nm)' },
  { key: '3', display_name: '每运输单位油耗(kg/kt∙nm)' },
  { key: '4', display_name: '每海里CO2排放(100kg/nm)' },
  { key: '5', display_name: '每运输单位CO2排放(10kg/t)' },
  { key: '6', display_name: '降速比(%)' },
  { key: '7', display_name: '载货量利用率(%)' }
]

export default {
  name: 'TrendAnalysis',
  components: { Chart, shipSwlectsDelog, shipComPanyName },
  directives: { adaptive},
  data() {
    return {
      titlez: '日期',
      shipComPanyName: '', // 船公司
      shipName: '', // 船名
      dialogShipCompanyFormVisible: false,
      dialogShipCompanyFormVisibles: false,
      chartTitle: '',
      xData: [],
      legendData: [],
      seriesData: [],
      list: null,
      listQuery: {
        shipCompanyId: undefined,
        shipTypeCode: undefined,
        shipTypeSub: undefined,
        grossRange: undefined,
        shipAgeRange: undefined,
        startYear: undefined,
        endYear: undefined,
        rollingCycleUnit: '年',
        shipId: undefined,
        indexItems: ['1', '2'],
        type: '1',
      },
      shipTypeOptions: [],
      shipSubTypeOptions:[],
      grossOptions: [],
      yearOptions: [],
      ageLimitOptions: [],
      rollingCycleUnitOptions,
      checkAll: false,
      analyzeItems: analyzeItemsOptions,
      isIndeterminate: true,
      showInitImg: false,
      showAnalysis: false,
      chartFlag: false
    }
  },
  created() {
    this.showAnalysis = false
    this.showInitImg = true
    this.initYear() // 年份
    this.initShiptype() // 船型
    this.initsavefindShipSubList() // 船型细分
    this.initsavefindDicGrossTonList() // 总吨范围
    this.initfindShipAgeList() // 船龄范围
  },
  methods: {
     // 文件导出
    download(data, name) {
      if (!data) {
        return
      }
      const url = window.URL.createObjectURL(new Blob([data]))
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      if (name) {
        link.setAttribute('download', `${name}`)
      } else {
        link.setAttribute('download', 'excel.xlsx')
      }
      document.body.appendChild(link)
      link.click()
    },

     // 列表请求
    initgetEnergyEfficencyTrendData() {
      getEnergyEfficencyTrendData(this.listQuery).then(res => {
          this.titlez = res.data.data.type
          this.list = res.data.data.eneryEfficTrendDataVos
      })
    },
    initfindShipAgeList() {
      findShipAgeList().then(res => {
        this.ageLimitOptions = res.data.data.items
      })
    },
    initsavefindDicGrossTonList() {
      savefindDicGrossTonList().then(res => {
        this.grossOptions = res.data.data.items
      })
    },
    initsavefindShipSubList() {
      savefindShipSubList().then(res => {
          this.shipSubTypeOptions = res.data.data.items
      })
    },
    initShiptype() {
      savefindShipTypeList().then(res =>{
         this.shipTypeOptions = res.data.data.items
      })
    },
    // addImon
    addImon() {
      this.dialogShipCompanyFormVisible = true
    },
    // addImonName
    addImonName() {
      this.dialogShipCompanyFormVisibles = true
    },
     // 弹框数据
    adds(val) {
      this.shipName = val.name
      this.listQuery.shipId = val.id
      this.dialogShipCompanyFormVisible = false
    },
    // 弹框数据
    shipComPanyNameData(val) {
      this.shipComPanyName = val.name
      this.listQuery.shipCompanyId = val.id
      this.dialogShipCompanyFormVisibles = false
    },
    // 年份
     initYear() {
      getYears().then(res => {
        this.yearOptions = res.data.data
      })
    },
    getChartData() {
      getEnergyEfficencyTrend(this.listQuery).then(res => {
          console.log(res.data.data.eneryEfficTrendIndexVos)
          if(res.data.data.shipComPanyName && res.data.data.shipName) {
            this.chartTitle = res.data.data.shipComPanyName+'公司/'+res.data.data.shipName+'船舶 能效趋势分析'
          }
          if(res.data.data.shipComPanyName && !res.data.data.shipName){
            this.chartTitle = res.data.data.shipComPanyName+'公司能效趋势分析'
          }
          if(!res.data.data.shipComPanyName && res.data.data.shipName){
            this.chartTitle = res.data.data.shipName+'船舶能效趋势分析'
          } 
           this.xData = res.data.data.eneryEfficTrendIndexVos[0].xdata
           let list= []
          res.data.data.eneryEfficTrendIndexVos.forEach(ele => {
              this.legendData.push(ele.name)
              let obj = {
                name: ele.name,
                type: ele.type,
                yAxisIndex: ele.yaxisIndex,
                data:ele.ydata
              }
              list.push(obj)
          })
          this.seriesData = list 
          this.chartFlag = true
           
      })
    },
    handleReset() {
      this.shipComPanyName = '', // 船公司
      this.shipName = '',
      this.listQuery.shipCompanyId = undefined
      this.listQuery.shipTypeCode = undefined
      this.listQuery.shipTypeSub = undefined
      this.listQuery.grossRange = undefined
      this.listQuery.shipAgeRange = undefined
      this.listQuery.startYear = undefined
      this.listQuery.endYear = undefined
      this.listQuery.rollingCycleUnit = '年'
      this.listQuery.indexItems = ['1','2']
      this.listQuery.shipId = undefined
      this.seriesData = []
      this.showInitImg = true
      this.chartFlag = false
      this.$refs.chart.initChart()
      this.chartTitle = ''
      this.xData = []
      this.initgetEnergyEfficencyTrendData()
    },
    handleFilter() {
      const shipItem = this.listQuery.shipId
      const shipItemgong = this.listQuery.shipCompanyId 
      if (shipItem !== undefined || shipItemgong !== undefined ) {
        this.showInitImg = false
        this.showAnalysis = true
        this.getChartData()
        this.initgetEnergyEfficencyTrendData()
       
      } else {
         this.$message({
          showClose: true,
          message: '请先选择船舶再进行数据统计',
          type: 'error'
        })
      }
    },
    handleExport() {
      console.log(Cookies.get('language'))
      if(Cookies.get('language') === 'zh'){
        this.listQuery.type = '1'
      }else if(Cookies.get('language') === 'en') {
          this.listQuery.type = '0'
      } else {
        this.listQuery.type = '1'
      }
      downLoadEnergyEfficencyTrendData(this.listQuery).then(res => {
          this.download(res.data, '能效趋势分析.xls')
      })
    },
    // checkbox
    handleCheckAllChange(val) {
      const checkList = []
      if (val) {
        for (const v of this.analyzeItems) {
          checkList.push(v.key)
        }
      }
      this.listQuery.indexItems = checkList
      this.isIndeterminate = false
    },
    handleCheckedItemsChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.analyzeItems.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.analyzeItems.length
    },
    renderheader(h, { column, $index }) {
      return h('span', {}, [
        h('span', {}, column.label.split('|')[0]),
        h('br'),
        h('span', {}, column.label.split('|')[1])
     ])
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
    width: 100px;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0px;
    text-align:right;
  }
  .el-checkbox__label {
    display: inline-block;
    padding-left: 0px;
    line-height: 19px;
    font-size: 14px;
  }

  .chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 300px);
  }
  .addBox{
    display: flex;
  }
</style>
