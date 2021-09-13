<template>
  <div class="app-container">
    <div class="filter-container">
      <div style="display:inline-block;">
        <label class="radio-label" style="padding-left:0;">管理机构 </label>
        <el-select v-model="listQuery.clientId" placeholder="请选择" clearable style="width: 280px" class="filter-item">
            <el-option v-for="item in dwOptions" :key="item.key" :label="item.display_name" :value="item.key" />
        </el-select>
        <el-button v-waves class="filter-item" icon="el-icon-search" @click="handleFilter" style="margin-left:20px">
            统计
        </el-button>
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-setting"  @click="reset">
            重置
        </el-button>
      </div>
   </div>
    <div class="chart-container">
      <chart ref="chart" v-if="true" height="100%" width="100%" v-bind:seriesData="this.seriesData"  v-bind:chartTitle="this.chartTitle" v-bind:xName="this.xName" v-bind:yName="this.yName"/>
    </div>
     <div class="chart-container2">
      <PieChart ref="piechart" v-if="true" height="100%" width="100%" v-bind:title="this.chartPieTitle" v-bind:legendData="this.legendPieData" v-bind:seriesData="this.seriesPieData"/>
    </div>
  </div>
</template>

<script>
import { postFormData } from '@/api/requestPost'
import { getQueryPage, getQueryDic} from '@/api/requestGet'
import waves from '@/directive/waves' // waves directive
import { parseTime, deepClone } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import adaptive from '@/directive/el-table'
import elDragDialog from '@/directive/el-drag-dialog'

import Chart from '@/components/Charts/HorizontalChart'
import PieChart from '@/components/Charts/PieChart'

const grossOptions = [
  { key: '1', display_name: '0~500' },
  { key: '2', display_name: '500-1000' },
  { key: '3', display_name: '1000-2000' },  
  { key: '4', display_name: '2000-5000' }
]
const dwOptions = [
  { key: 1, display_name: '长江航运管理局' },
  { key: 2, display_name: '珠江航运管理局' }
]
const dwKeyValue = dwOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})
// const indexw = 1
export default {
  name: 'shipStatistics',
  components: { 
    Pagination,
    Chart,
    PieChart
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
      list: null,
      dw: '',
      listLoading: true,
      shipComPany: '',
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
      rules: {
        shipComPanyName: [{ required: true, message: '必填项', trigger: 'blur' }],
        nameEn: [{ required: true, message: '必填项', trigger: 'blur' }],
        nameCn: [{ required: true, message: '必填项', trigger: 'blur' }],
        userDept: [{ required: true, message: '必填项', trigger: 'change' }],
        dw: [{ required: true, message: '必填项', trigger: 'change' }]
      },
      editRowId: '',
      rowModel: {},
      cmsaEEVisiable: false,
      chartTitle: '',
      xName: '',
      yName: '',
      legendData: [],
      seriesData: [],
      chartFlag: false,
      piechartTitle: '',
      legendPieData: [],
      seriesPieData: []
    }
  },
  created() {
    // this.getList()
    this.showEnergyEfficiencyStatus()
  },
  methods: {
    getList() {
      this.listLoading = true
      var url = '/shipManager/shipList'
      if(this.shipComPany === undefined || this.shipComPany === "")
      {
        this.listQuery.shipComPanyName = ""
      }
      getQueryPage(url, this.listQuery).then(response => {
        this.list = response.data.data.items
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
    showEnergyEfficiency(row) {
    },
    showEnergyEfficiencyStatus(){
      const seriesData = [ [ 'TotalVessel', 'TotalTons'],
            [ 38900, '<500tons'],
            [ 9800, '500-1000tons'],
            [ 4890, '1000-2000tons'],
            [ 3110, '2000-5000tons']]
      this.chartTitle = 'xx公司船队统计柱状图'
      this.xName = 'TotalVessel'
      this.yName = 'TotalTons'
      this.seriesData = seriesData
      this.chartFlag = true

      this.chartPieTitle = 'xx公司船队统计饼状图'      
      const legendPieData = ['<500tons', '500-1000tons', '1000-2000tons', '2000-5000tons']
      const seriesPieData = [
        {value: 38900, name: '<500tons'},
        {value: 9800, name: '500-1000tons'},
        {value: 4890, name: '1000-2000tons'},
        {value: 3110, name: '2000-5000tons'}
      ]
      this.seriesPieData = seriesPieData
      this.legendPieData = legendPieData
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
    getEngineIds(str) {
      var attr = []
      if (str !== '' && str !== null) {
        attr = str.split(',')
      }
      return attr
    },   
    handleClick() {
    }
  }
}
</script>
<style scoped>
  .chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 300px);
  }
  .chart-container2{
  position: relative;
  margin-top: 100px;
  width: 100%;
  height: calc(100vh - 300px);
  }
</style>
