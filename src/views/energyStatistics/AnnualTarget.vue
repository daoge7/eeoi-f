<template>
  <div class="app-container">
    <div class="filter-container">
      <div style="display:inline-block;">
       <el-form :inline="true" :model="listQuery" class="demo-form-inline" style="margin-top:10px;">
      <el-form-item :label="$t('Statistics.shipCompany')">
       <div style="display:flex">
      <el-input v-model="comPanyName" disabled style="margin-right:5px;"/><el-button @click="shipCompany">{{ $t('common.select') }}</el-button>
      </div>
      </el-form-item>
      <el-form-item :label="$t('Statistics.shipName')">
        <div style="display:flex">
          <el-input v-model="shipsName" disabled style="margin-right:5px;"/><el-button @click="shipName">{{ $t('common.select') }}</el-button>
        </div>
      </el-form-item>
      <el-form-item :label="$t('Statistics.shipType')">
         <el-select v-model="listQuery.spTypeCode" :placeholder="$t('common.selectRemind')">
         <el-option
         v-for="item in options"
          :key="item.spcode"
         :label="item.csptype"
         :value="item.spcode">
         </el-option>
  </el-select>
      </el-form-item>
      </el-form>
      </div>
      <div style="display:inline-block;">
        <!-- <label class="radio-label" style="padding-left:0;">{{ $t('Statistics.voyageLine') }}</label>
        <el-select v-model="listQuery.voyageLine" :placeholder="$t('common.selectRemind')" clearable class="filter-item" size="mini" style="width: 130px">
          <el-option v-for="item in voyageLineOptions" :key="item.key" :label="item.display_name" :value="item.key" />
        </el-select> -->
        <label>{{ $t('Statistics.startEndDate') }}</label>
        <el-select v-model="listQuery.startYear" :placeholder="$t('common.selectRemind')" style="width:150px;">
          <el-option v-for="item in ReportingyearArray" :key="item" :label="item" :value="item"></el-option>
        </el-select>~
        <el-select v-model="listQuery.endYear" :placeholder="$t('common.selectRemind')" style="width:150px;">
          <el-option v-for="item in ReportingyearArray" :key="item" :label="item" :value="item"></el-option>
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
      :empty-text = "$t('Statistics.noDataAlert')"
      v-adaptive="{bottomOffset: 38}"
    >
      <el-table-column :label="$t('Statistics.AnnualTargetPer')" align="center">
        <el-table-column :label="$t('Statistics.num')" width="50px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.xh }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Statistics.shipName')" width="auto" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.shipName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Statistics.year')" width="auto" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.year }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Statistics.averageOfEEOIForT')" width="auto" align="center" show-overflow-tooltip :render-header="renderheader">
          <template slot-scope="{row}">
            <span>{{ row.eeoi }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Statistics.averageOfCargoCarried')" width="auto" align="center" show-overflow-tooltip :render-header="renderheader">
          <template slot-scope="{row}">
            <span>{{ row.loadrate*100 }}%</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Statistics.averageOfSpeed')" width="auto" align="center" :render-header="renderheader">
          <template slot-scope="{row}">
            <span>{{ row.dropRatio*100 }}%</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Statistics.CO2Distance')" width="auto" align="center" :render-header="renderheader">
          <template slot-scope="{row}">
            <span>{{ row.co2PerMile }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Statistics.CO2Transport')" width="auto" align="center" :render-header="renderheader">
          <template slot-scope="{row}">
            <span>{{ row.co2PerCargo }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Statistics.FuelTransportForT')" width="auto" align="center" :render-header="renderheader">
          <template slot-scope="{row}">
            <span>{{ row.co2PerCargoTeu }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Statistics.averageETUUseRatio')" width="auto" align="center" :render-header="renderheader">
          <template slot-scope="{row}">
            <span>{{ row.boxRadio*100 }}%</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Statistics.CO2emissionsper')" width="auto" align="center" :render-header="renderheader">
          <template slot-scope="{row}">
            <span>{{ row.co2PerTeu }}</span>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <!-- <pagination v-show="total>0" style="margin:0px;padding:0px" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" /> -->
    <shipComPanyName v-if="shipComPanyNamevicode" :shipComPanyNamevicode="shipComPanyNamevicode" @shipComPanyNameData="shipComPanyNameData"/>
    <shipSwlects v-if="shipComPanyNameviAdd" :add="shipComPanyNameviAdd"  @adds="adds"/>
  </div>
</template>

<script>
// import { postFormData } from '@/api/requestPost'
import shipComPanyName from '@/components/ShipComPanySelect/shipComPanyName-dalog'
import shipSwlects from '@/components/ShipComPanySelect/shipSwlects-delog'
import { singalShipYear,downLoadSigalShip } from '@/api/requestPost'
import { savefindShipTypeList,getYears } from '@/api/requestGet'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import adaptive from '@/directive/el-table'
export default {
  name: 'AnnualTargetPer',
  components: { Pagination,shipComPanyName,shipSwlects },
  directives: { adaptive},
  data() {
    return {
      options: [],
      comPanyName: '', // 船公司名称
      shipsName: '', // 船舶名称
      shipComPanyNamevicode:false, // 船公司
      shipComPanyNameviAdd:false, // 船舶名称
      tableKey: 0,
      tableHeight: window.innerHeight - 200,
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
      ReportingyearArray:[]
    }
  },
  created() {
    // this.getList()
    this.list = []
    this.total = 0
    this.listLoading = false
    this.initType()
    this.initYear()
  },
  methods: {
    initYear() {
      getYears().then(res => {
        this.ReportingyearArray = res.data.data;
      });
    },
     // 打开船舶名称
    shipName() {
      this.shipComPanyNameviAdd = true
    },
    //船舶名称数据
    adds(val) {  
      this.shipComPanyNameviAdd = false
      this.shipsName = val.name
      this.listQuery.shipName = val.id
      this.listQuery.spTypeCode = val.sptype
    },
    // 打开船公司弹框
    shipCompany() {
      this.shipComPanyNamevicode = true
    },
    // 船公司选择数据
    shipComPanyNameData(val) {
      this.shipComPanyNamevicode = false
      console.log(val)
      this.comPanyName = val.name
      this.listQuery.comPany = val.id
    },
    initType() {
      savefindShipTypeList().then(res => {
          this.options = res.data.data.items
      })
    },
    getList() {
      this.listLoading = true
      singalShipYear(this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
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
       if(this.comPanyName || this.shipsName){
        this.getList()
      }else {
         this.$message({
          message: '请选择船公司或者船舶',
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
       obj.dataType = '1'
       if(this.comPanyName || this.shipsName) {
         downLoadSigalShip(obj).then(res => {
        this.download(res.data, '单船年度能效指标.xls')
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
