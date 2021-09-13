<template>
  <div class="dashboard-editor-container">
    <!-- <github-corner class="github-corner" /> -->
    <div class="block">
      <!-- <span class="demonstration" style="text-align: center;display:block;">系统公告</span> -->
      <el-carousel height="300px">
        <el-carousel-item v-for="(item, index ) in notices" :key="index">
          <h2> {{ item.txt }}</h2>
          <p>{{ item.txt2 }}</p>
        </el-carousel-item>
      </el-carousel>
    </div>

    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <!-- <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      6666666
      <line-chart :chart-data="lineChartData" />
    </el-row> -->

    <!-- <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row> -->

    <!-- <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <transaction-table />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <todo-list />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <box-card />
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup2'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'
import { getQueryDic } from '@/api/requestGet'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    GithubCorner,
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable,
    TodoList,
    BoxCard
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
      notices: []
    }
  },
  created() {
    this.loadSystemNotices()
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    loadSystemNotices() {
      getQueryDic('/sysDocNotice/findPreviousThreeSystemNotices').then(response => {
        this.notices = response.data.data.items
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .dashboard-editor-container {
    padding: 22px;
    background-color: rgb(240, 242, 245);
    position: relative;
    min-height: 786px;
    .github-corner {
      position: absolute;
      top: 0px;
      border: 0;
      right: 0;
    }

    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }

  .dashboard-editor-container h2 {
    text-align: center;
    font-size: 24px;
    line-height: 200%;
  }

  .dashboard-editor-container p {
    font-size: 18px;
    line-height: 200%;
    margin: 0 15px;
    text-indent: 2em;
  }

  @media (max-width: 1024px) {
    .chart-wrapper {
      padding: 8px;
    }
  }
</style>
<style>
  .el-carousel__item h3 {
    color: #475669;
    /* font-size: 14px; */
    /* opacity: 0.75; */
    /* line-height: 150px; */
    margin: 0;
    word-break: break-all;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
