<template>
  <div class="app-container">
    <div class="filter-container">
      <div style="display:inline-block;">
        <label class="radio-label" style="padding-left:0px;">{{ $t('Statistics.shipCompany') }}</label>
        <el-select v-model="listQuery.shipCompany" :placeholder="$t('common.selectRemind')" clearable class="filter-item" size="mini" style="width: 130px">
          <el-option v-for="item in shipCompanyOptions" :key="item.key" :label="item.display_name" :value="item.key" />
        </el-select>
        <label class="radio-label" style="padding-left:20px;">{{ $t('Statistics.shipName') }}</label>
        <el-select v-model="listQuery.shipName" :placeholder="$t('common.selectRemind')" clearable class="filter-item" size="mini" style="width: 130px">
          <el-option v-for="item in shipNameOptions" :key="item.key" :label="item.display_name" :value="item.key" />
        </el-select>
        <label class="radio-label" style="padding-left:20px;">{{ $t('Statistics.shipType') }}</label>
        <el-select v-model="listQuery.shipType" :placeholder="$t('common.selectRemind')" clearable class="filter-item" size="mini" style="width: 130px">
          <el-option v-for="item in shipTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
        </el-select>
      </div>
      <div style="display:inline-block;">
        <label class="radio-label" style="padding-left:0;">{{ $t('Statistics.voyageLine') }}</label>
        <el-select v-model="listQuery.voyageLine" :placeholder="$t('common.selectRemind')" clearable class="filter-item" size="mini" style="width: 130px">
          <el-option v-for="item in voyageLineOptions" :key="item.key" :label="item.display_name" :value="item.key" />
        </el-select>
        <label class="radio-label" style="padding-left:20px;">{{ $t('Statistics.startEndDate') }}</label>
        <el-select v-model="listQuery.startYear" :placeholder="$t('common.selectRemind')"  class="filter-item" size="mini" style="width: 130px">
          <el-option v-for="item in yearOptions" :key="item.key" :label="item.display_name" :value="item.key" />
        </el-select>~
        <el-select v-model="listQuery.endYear" :placeholder="$t('common.selectRemind')" class="filter-item" size="mini" style="width: 130px">
          <el-option v-for="item in yearOptions" :key="item.key" :label="item.display_name" :value="item.key" />
        </el-select>
        <el-button class="filter-item" icon="el-icon-search" style="margin-left:20px" @click="handleFilter">
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
      :empty-text="$t('Statistics.noDataAlert')"
    >
      <el-table-column :label="$t('Statistics.AnnualTargetPer')" align="center">
        <el-table-column :label="$t('Statistics.num')" width="50px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.num }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Statistics.shipName')" width="90px" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.shipName | shipNameFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Statistics.year')" width="70px" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.year }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Statistics.averageOfEEOIForT')" width="110px" align="center" show-overflow-tooltip :render-header="renderheader">
          <template slot-scope="{row}">
            <span>{{ row.averageOfEEOIForT }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Statistics.averageOfCargoCarried')" width="80px" align="center" show-overflow-tooltip :render-header="renderheader">
          <template slot-scope="{row}">
            <span>{{ row.averageOfCargoCarried }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Statistics.averageOfSpeed')" width="80px" align="center" :render-header="renderheader">
          <template slot-scope="{row}">
            <span>{{ row.averageOfSpeed }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Statistics.CO2Distance')" width="100px" align="center" :render-header="renderheader">
          <template slot-scope="{row}">
            <span>{{ row.CO2Distance }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Statistics.CO2Transport')" width="100px" align="center" :render-header="renderheader">
          <template slot-scope="{row}">
            <span>{{ row.CO2Transport }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Statistics.FuelTransportForT')" width="95px" align="center" :render-header="renderheader">
          <template slot-scope="{row}">
            <span>{{ row.FuelTransportForT }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Statistics.averageOfEEOIForTEU')" width="125px" align="center" :render-header="renderheader">
          <template slot-scope="{row}">
            <span>{{ row.averageOfEEOIForTEU }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Statistics.averageCO2TEU')" width="100px" align="center" show-overflow-tooltip :render-header="renderheader">
          <template slot-scope="{row}">
            <span>{{ row.averageCO2TEU }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Statistics.FuelTransportForTEU')" width="100px" align="center" :render-header="renderheader">
          <template slot-scope="{row}">
            <span>{{ row.FuelTransportForTEU }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Statistics.averageETUUseRatio')" width="85px" align="center" :render-header="renderheader">
          <template slot-scope="{row}">
            <span>{{ row.averageETUUseRatio }}</span>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList"/>
  </div>
</template>

<script>
// import { postFormData } from '@/api/requestPost'
import { getQueryPage } from '@/api/requestGet'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const shipTypeOptions = [
  { key: '1', display_name: '散货船' },
  { key: '2', display_name: '液货船' },
  { key: '3', display_name: '气体运输船' },
  { key: '4', display_name: '集装箱船' },
  { key: '5', display_name: '滚装货船' },
  { key: '6', display_name: '普通货船' }
]

const voyageLineOptions = [
  { key: '1', display_name: '航线1' },
  { key: '2', display_name: '航线2' }
]

const yearOptions = [
  { key: '2017', display_name: '2017' },
  { key: '2018', display_name: '2018' }
]

const shipCompanyOptions = [
  { key: '1', display_name: '公司1' },
  { key: '2', display_name: '公司2' }
]

const shipNameOptions = [
  { key: '1', display_name: '船舶1' },
  { key: '2', display_name: '船舶2' }
]
const shipNameKeyValue = shipNameOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'AnnualTarget',
  components: { Pagination },
  filters: {
    shipNameFilter(gross) {
      return shipNameKeyValue[gross]
    }
  },
  data() {
    return {
      tableKey: 0,
      tableHeight: window.innerHeight - 240,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        shipCompany: undefined,
        shipName: undefined,
        shipType: undefined,
        voyageLine: undefined,
        startYear: undefined,
        endYear: undefined
      },
      shipTypeOptions,
      voyageLineOptions,
      yearOptions,
      shipCompanyOptions,
      shipNameOptions
    }
  },
  created() {
    // this.getList()
    this.list = null
    this.total = 0
    this.listLoading = false
  },
  methods: {
    getList() {
      this.listLoading = true
      var url = '/energyStatistics/AnnualTarget'
      getQueryPage(url, this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleReset() {
      this.listQuery.page = 1
      this.listQuery.shipCompany = ''
      this.listQuery.shipName = ''
      this.listQuery.shipType = ''
      this.listQuery.voyageLine = ''
      this.listQuery.startYear = ''
      this.listQuery.endYear = ''
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
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
</style>
