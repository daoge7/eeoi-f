<template>
  <div class="app-container">
      <div class="filter-container" style="display:flex;align-items: center;">
      <el-form :inline="true" :model="listQuery" class="demo-form-inline" style="margin-top:10px;">
      <el-form-item :label="$t('Statistics.shipCompany')">
       <div style="display:flex">
      <el-input v-model="comPanyName" disabled style="margin-right:5px;"/><el-button @click="shipCompany">{{ $t('common.select') }}</el-button>
      </div>
      </el-form-item>
       <label>{{ $t('Statistics.startEndDate') }}</label>
        <el-select v-model="listQuery.startYear" :placeholder="$t('common.selectRemind')" style="width:150px;">
          <el-option v-for="item in ReportingyearArray" :key="item" :label="item" :value="item"></el-option>
        </el-select>~
        <el-select v-model="listQuery.endYear" :placeholder="$t('common.selectRemind')" style="width:150px;">
          <el-option v-for="item in ReportingyearArray" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form>
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
      :empty-text = "$t('Statistics.noDataAlert')"
      v-adaptive="{bottomOffset: 38}"
    >
     <el-table-column :label="$t('Statistics.AnnualDataPer')" align="center">
        <el-table-column :label="$t('Statistics.num')" width="50px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.xh }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ship.searchOperator')" width="auto" align="center" show-overflow-tooltip :render-header="renderheader">
          <template slot-scope="{row}">
            <span>{{ row.comPanyName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Statistics.year')" width="auto" align="center" show-overflow-tooltip :render-header="renderheader">
          <template slot-scope="{row}">
            <span>{{ row.year }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Statistics.FreightVolume')" width="auto" align="center" show-overflow-tooltip :render-header="renderheader">
          <template slot-scope="{row}">
            <span>{{ row.dwt }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Statistics.FuelConsumption')" align="center">
          <el-table-column :label="$t('Statistics.heavyOil')" width="auto" align="center" show-overflow-tooltip :render-header="renderheader">
            <template slot-scope="{row}">
              <span>{{ row.oiHfo }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('Statistics.lightOil')" width="auto" align="center" :render-header="renderheader">
            <template slot-scope="{row}">
              <span>{{ row.oiLfo }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('Statistics.dieselOil')" width="auto" align="center" :render-header="renderheader">
            <template slot-scope="{row}">
              <span>{{ row.oiChai }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('Statistics.propane')" width="auto" align="center" :render-header="renderheader">
            <template slot-scope="{row}">
              <span>{{ row.oiBing }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('Statistics.butane')" width="auto" align="center" :render-header="renderheader">
            <template slot-scope="{row}">
              <span>{{ row.oiDing }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('Statistics.NaturalGas')" width="auto" align="center" :render-header="renderheader">
            <template slot-scope="{row}">
              <span>{{ row.oiTian }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('Statistics.inportFuelConsumption')" align="center" >
          <el-table-column :label="$t('Statistics.heavyOil')" width="auto" align="center" show-overflow-tooltip :render-header="renderheader">
            <template slot-scope="{row}">
              <span>{{ row.oiHfoStop }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('Statistics.lightOil')" width="auto" align="center" :render-header="renderheader">
            <template slot-scope="{row}">
              <span>{{ row.oiLfoStop }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('Statistics.dieselOil')" width="auto" align="center" :render-header="renderheader">
            <template slot-scope="{row}">
              <span>{{ row.oiChaiStop }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('Statistics.propane')" width="auto" align="center" :render-header="renderheader">
            <template slot-scope="{row}">
              <span>{{ row.oiBingStop }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('Statistics.butane')" width="auto" align="center" :render-header="renderheader">
            <template slot-scope="{row}">
              <span>{{ row.oiDingStop }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('Statistics.NaturalGas')" width="auto" align="center" :render-header="renderheader">
            <template slot-scope="{row}">
              <span>{{ row.oiTianStop }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$t('Statistics.voyageMileage')" width="auto" align="center" show-overflow-tooltip :render-header="renderheader">
          <template slot-scope="{row}">
            <span>{{ row.distance }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Statistics.NoLoadMileage')" width="auto" align="center" show-overflow-tooltip :render-header="renderheader">
          <template slot-scope="{row}">
            <span>{{ row.distanceEmpty }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Statistics.TurnoverVolume')" width="auto" align="center" show-overflow-tooltip :render-header="renderheader">
          <template slot-scope="{row}">
            <span>{{ row.turnOver }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Statistics.BoxTurnover')" width="auto" align="center" show-overflow-tooltip :render-header="renderheader">
          <template slot-scope="{row}">
            <span>{{ row.turnOverBox }}</span>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <!-- <pagination v-show="total>0" style="margin:0px;padding:0px" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" /> -->
       <shipComPanyName v-if="shipComPanyNamevicode" :shipComPanyNamevicode="shipComPanyNamevicode" @shipComPanyNameData="shipComPanyNameData"/>
  </div>
</template>

<script>
import shipComPanyName from '@/components/ShipComPanySelect/shipComPanyName-dalog'
import { shipComPanyYear, downLoadComPanyShip } from '@/api/requestPost'
import { getYears } from '@/api/requestGet'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import adaptive from '@/directive/el-table'
export default {
  name: 'CompanyAnnualData',
  components: { Pagination,shipComPanyName },
  directives: { adaptive},
  data() {
    return {
      comPanyName: '',
      shipComPanyNamevicode:false, // 船公司
      tableKey: 0,
      tableHeight: window.innerHeight - 160,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        comPany: '',
        shipName: '',
        spTypeCode: '',
        // voyageLine: '',
        startYear: '2020',
        endYear: '2020'
      },
      ReportingyearArray: []
    }
  },
  created() {
    this.list = []
    this.listLoading = false
    this.initYear()
  },
  methods: {
    initYear() {
      getYears().then(res => {
        this.ReportingyearArray = res.data.data;
      });
    },
    // 打开船公司弹框
    shipCompany() {
      this.shipComPanyNamevicode = true
    },
    // 船公司选择数据
    shipComPanyNameData(val) {
      this.shipComPanyNamevicode = false
      this.comPanyName = val.name
      this.listQuery.comPany = val.id
    },
    getList() {
      this.listLoading = true
      shipComPanyYear(this.listQuery).then(response => {
        this.list = response.data.data
          this.listLoading = false
      })
    },
    handleReset() {
      this.comPanyName = '' // 船公司名称
      this.shipsName =  '' // 船舶名称
      this.listQuery.comPany = ''
      this.listQuery.shipName = ''
      this.listQuery.spTypeCode = ''
      // this.listQuery.voyageLine = ''
      this.listQuery.startYear = '2020'
      this.listQuery.endYear = '2020'
      this.getList()
    },
    handleFilter() {
      if(this.comPanyName){
        this.getList()
      }else {
         this.$message({
          message: '请选择船公司',
          type: 'warning'
        });
      }
    },
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
    handleExport() {
      let obj ={}
       obj.comPany = this.listQuery.comPany
       obj.shipName = this.listQuery.shipName
       obj.spTypeCode = this.listQuery.spTypeCode
       obj.startYear = this.listQuery.startYear
       obj.endYear = this.listQuery.endYear
       obj.exportType = '1'
       obj.dataType = '0'
       if(this.comPanyName || this.shipsName) {
         downLoadComPanyShip(obj).then(res => {
        this.download(res.data, '公司年年度能效数据.xls')
         this.$notify({
        title: 'Success',
        message: 'export Successfully',
        type: 'success',
        duration: 2000
      })
      })
       }else {
          this.$message({
          message: '请选择船公司或者船舶',
          type: 'warning'
        });
       }
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
