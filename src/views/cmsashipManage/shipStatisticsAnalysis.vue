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
      <LinesChart ref="LinesChart" v-if="true" height="100%" width="100%" v-bind:title="this.chartTitle" v-bind:legendData="this.legendLinesData" v-bind:seriesData="this.seriesData" v-bind:xAxisData="this.xAxisData" />
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
import LinesChart from '@/components/Charts/LinesChart'

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
  name: 'shipStatisticsAnalysis',
  components: { 
    Pagination,
    Chart,
    LinesChart
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
      list: null,
      dw: '',
      listLoading: true,
      shipComPany: '',
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        dw: '',
        shipComPanyName: '',
        isCmca: 0,
        sort: 'spname'
      },
      dwOptions,
      dialogStatus: '',
      rules: {
        shipComPanyName: [{ required: true, message: '必填项', trigger: 'blur' }],
        nameEn: [{ required: true, message: '必填项', trigger: 'blur' }],
        nameCn: [{ required: true, message: '必填项', trigger: 'blur' }],
        userDept: [{ required: true, message: '必填项', trigger: 'change' }],
        dw: [{ required: true, message: '必填项', trigger: 'change' }]
      },
      chartTitle: '',
      legendData: [],
      seriesData: [],
      legendLinesData: []
    }
  },
  created() {
    // this.getList()
    this.showEnergyEfficiencyStatus()
  },
  methods: {
    getList() {
      this.listLoading = false
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
    showEnergyEfficiencyStatus(){
      const seriesData = [
        {
            name: '<500tons',
            type: 'line',
            data: [16.96, 14.203, 20.4]
        },
        {
            name: '500-1000tons',
            type: 'line',
            data: [8.74, 7.796, 8.81]
        },
        {
            name: '1000-2000tons',
            type: 'line',
            data: [6.61, 6.219, 6.28]
        },
        {
            name: '2000-5000tons',
            type: 'line',
            data: [5.65, 5.488, 5.56]
        }
    ]
      this.xAxisData = ['EIV', 'EIV', 'EIV']
      this.legendLinesData = ['<500tons', '500-1000tons', '1000-2000tons', '2000-5000tons']
      this.chartTitle = 'xx公司船舶能效统计分析折线图'
      this.seriesData = seriesData      
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
