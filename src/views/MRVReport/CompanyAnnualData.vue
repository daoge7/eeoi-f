<template>
  <div class="app-container">
    <div class="filter-container">
      <label class="radio-label" style="padding-left:0px;">{{ $t('Statistics.shipCompany') }}</label>
      <el-select v-model="listQuery.shipCompany" :placeholder="$t('common.selectRemind')" clearable class="filter-item" size="mini" style="width: 130px">
        <el-option v-for="item in shipCompanyOptions" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      <label class="radio-label" style="padding-left:20px;">{{ $t('Statistics.startEndDate') }}</label>
      <el-select v-model="listQuery.startYear" :placeholder="$t('common.selectRemind')"  class="filter-item" size="mini" style="width: 130px">
        <el-option v-for="item in yearOptions" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>~
      <el-select v-model="listQuery.endYear" :placeholder="$t('common.selectRemind')" class="filter-item" size="mini" style="width: 130px">
        <el-option v-for="item in yearOptions" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" style="margin-left:20px" @click="handleFilter">
        {{ $t('common.Statistics') }}
      </el-button>
      <el-button class="filter-item" type="info" icon="el-icon-setting" @click="handleReset">
        {{ $t('common.reset') }}
      </el-button>
      <el-button class="filter-item" type="primary" plain icon="el-icon-download" @click="handleExport">
        {{ $t('common.exportExcel') }}
      </el-button>
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
      <el-table-column :label="$t('Statistics.CompanyAnnualData')" align="center">
        <el-table-column :label="$t('Statistics.num')" width="50px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.num }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Statistics.shipCompany')" width="105px" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.shipCompany | shipCompanyFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Statistics.year')" width="70px" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.year }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Statistics.FreightVolume')" width="65px" align="center" show-overflow-tooltip :render-header="renderheader">
          <template slot-scope="{row}">
            <span>{{ row.FreightVolume }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Statistics.FreightVolume')" align="center">
          <el-table-column :label="$t('Statistics.heavyOil')" width="50px" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              <span>{{ row.heavyOil }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('Statistics.lightOil')" width="50px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.lightOil }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('Statistics.dieselOil')" width="50px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.dieselOil }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('Statistics.propane')" width="50px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.propane }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('Statistics.butane')" width="50px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.butane }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('Statistics.NaturalGas')" width="60px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.NaturalGas }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('Statistics.inportFuelConsumption')" align="center">
          <el-table-column :label="$t('Statistics.heavyOil')" width="50px" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              <span>{{ row.inPortHeavyOil }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('Statistics.lightOil')" width="50px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.inPortLightOil }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('Statistics.dieselOil')" width="50px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.inPortDieselOil }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('Statistics.propane')" width="50px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.inPortPropane }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('Statistics.butane')" width="50px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.inPortButane }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('Statistics.NaturalGas')" width="60px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.inPortNaturalGas }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('Statistics.voyageMileage')" width="70px" align="center" show-overflow-tooltip :render-header="renderheader">
          <template slot-scope="{row}">
            <span>{{ row.voyageMileage }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Statistics.NoLoadMileage')" width="70px" align="center" show-overflow-tooltip :render-header="renderheader">
          <template slot-scope="{row}">
            <span>{{ row.NoLoadMileage }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Statistics.TurnoverVolume')" width="65px" align="center" show-overflow-tooltip :render-header="renderheader">
          <template slot-scope="{row}">
            <span>{{ row.TurnoverVolume }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Statistics.BoxTurnover')" width="70px" align="center" show-overflow-tooltip :render-header="renderheader">
          <template slot-scope="{row}">
            <span>{{ row.BoxTurnover }}</span>
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

const yearOptions = [
  { key: '2017', display_name: '2017' },
  { key: '2018', display_name: '2018' }
]

const shipCompanyOptions = [
  { key: '1', display_name: '公司1' },
  { key: '2', display_name: '公司2' }
]

const shipCompanyKeyValue = shipCompanyOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'CompanyAnnualData',
  components: { Pagination },
  filters: {
    shipCompanyFilter(item) {
      return shipCompanyKeyValue[item]
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
        startYear: undefined,
        endYear: undefined
      },
      yearOptions,
      shipCompanyOptions
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
      var url = '/energyStatistics/CompanyAnnualData'
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
</style>
