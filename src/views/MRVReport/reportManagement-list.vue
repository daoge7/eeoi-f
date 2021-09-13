<!--
  EU MRV报告管理
-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <div style="padding:10px 10px 0;">
        <label class="radio-label">{{ $t('MRV.shipCompany') }}</label>
        <el-input
          v-model="listQuery.keyword"
          :placeholder="$t('common.inputRemind')"
          style="width: 240px;margin-right:10px;"
          class="filter-item"
          @keyup.enter.native="handleFilter"
        />
        <label class="radio-label">{{ $t('MRV.FlagState') }}</label>
        <el-input
          v-model="listQuery.flag"
          :placeholder="$t('common.inputRemind')"
          style="width: 240px;margin-right:10px;"
          class="filter-item"
        />
      </div>
      <div style="padding:5px 10px 0;">
        <label class="radio-label">{{ $t('MRV.Period') }}</label>
        <el-date-picker
          :editable="true"
          v-model="listQuery.startTime"
          type="date"
          align="left"
          style="width:150px"
          :placeholder="$t('common.datePickerRemind')"
        />~
        <el-date-picker
          :editable="true"
          v-model="listQuery.endTime"
          type="date"
          align="left"
          style="width:150px"
          :placeholder="$t('common.datePickerRemind')"
        />
        <el-button
          class="filter-item"
          icon="el-icon-search"
          style="margin-left:20px"
          @click="handleFilter"
        >{{ $t('common.search') }}</el-button>
        <el-button
          class="filter-item"
          type="info"
          icon="el-icon-setting"
          @click="handleRest"
        >{{ $t('common.reset') }}</el-button>
      </div>
      <div style="margin-top:10px;">
          <el-button type="primary" icon="el-icon-plus" @click="addclick">{{ $t('common.add') }}</el-button>
      </div>
      <el-table
        v-loading="listLoading"
        :data="dataTreeGrid"
        border
        fit
        :height="tableHeight"
        style="width: 100%; overflow:auto;margin-top:10px;"
        highlight-current-row
        :row-style="{height:'35px'}"
        :cell-style="{padding:'0'}"
        row-key="id"
        v-adaptive="{bottomOffset: 38}"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column
          label="IMO NO."
          align="center"
          width="auto"
          show-overflow-tooltip
        >
          <template slot-scope="{row}">
            <span>{{ row.imoNu }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('shipBattery.shipName')"
          align="center"
          width="auto"
          show-overflow-tooltip
        >
          <template slot-scope="{row}">
            <span @click="handlEnit(row)">{{ row.shipName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('ship.manager')"
          align="center"
          width="auto"
          show-overflow-tooltip
        >
          <template slot-scope="{row}">
            <span>{{ row.shipName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('ship.shipFlag')"
          width="auto"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="{row}">
            <span>{{ row.flag }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ship.shipType')" width="auto" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.shipType }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('MRV.Reportingyear')"
          width="auto"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="{row}">
            <span>{{ row.euMrvYear }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('MRV.Reportstatus')"
          width="auto"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="{row}">
            <span v-if="row.rptStatus =='1'">{{ $t('MRV.Registration') }}</span>
            <span v-if="row.rptStatus =='2'">{{ $t('MRV.Lockstate') }}</span>
            <span>{{ row.endDate }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('common.operate')"
          align="center"
          class-name="small-padding fixed-width"
          show-overflow-tooltip
          width="250"
        >
          <template slot-scope="{row}">
            <el-button
              v-if="row.rptStatus=='1'"
              size="mini"
              type="warning"
              @click="handleModifyStatus(row)"
            >{{ $t('voyage.btnLock') }}</el-button>
            <el-button
              v-if="row.rptStatus=='2'"
              size="mini"

              @click="handleModifyStatus(row)"
            >{{ $t('voyage.btnUnLock') }}</el-button>
            <el-button
              type="primary"
              size="mini"
              @click="handlEnit(row)"
            >{{ $t('common.edit') }}</el-button>
            <!-- <el-button
              size="mini"
              type="danger"
            >{{ $t('common.liberia') }}</el-button> -->
            <el-button
              size="mini"
              type="danger"
               v-if="row.rptStatus=='1'"
              @click="handlDelete(row)"
            >{{ $t('common.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination  v-show="total>0" style="margin:0px;padding:0px" :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize" @pagination="init"/>
      <reportManagementDalog :shipComPanyNamevicode="shipComPanyNamevicode" v-if="shipComPanyNamevicode" @shipComPanyNameData="shipComPanyNameData"/>
      <reportManagementDetail :list='list' :shipComPanyNamevicodes='shipComPanyNamevicodes' @shipComPanyNameDetail="shipComPanyNameDetail" :flag='flag'  v-if="shipComPanyNamevicodes"/>
    </div>
  </div>
</template>

<script>
import reportManagementDalog from './components/reportManagement-dalog'
import reportManagementDetail from './components/reportManagementDetail-dalog'
import { getEudcs, lockOrUnlockEuDcs, deleteEuDcs, generatorEuDcs } from '@/api/requestPost'
import Pagination from "@/components/Pagination";
import adaptive from "@/directive/el-table";
export default {
  name: "reportManagement",
  components: {
    Pagination,
    reportManagementDalog,
    reportManagementDetail
  },
  directives: { adaptive },
  data() {
    return {
      value: [],
      reportForm: {
        shipId: '',
        startTime:'',
        endTime: '',
        imoRptId: ''
      },
      list: {},
      shipComPanyNamevicodes:false,
      flag: false,
      shipComPanyNamevicode: false,
      tableHeight: window.innerHeight - 240 - 200,
      total: 0,
      listLoading: false,
      listQuery: {
        keyword: "",
        flag: "",
        startTime: "",
        endTime: "",
        currentPage: 1, // 当前页
        pageSize: 20// 显示条数
      },
      dataTreeGrid: []
    };
  },
  created() {
    this.init()
  },
  methods: {
    handTime() {
        this.listQuery.startTime = this.value[0]
        this.listQuery.endTime = this.value[1]
    },
    handleRest() {
      this.value = []
      this.listQuery.keyword = ""
      this.listQuery.flag = ""
      this.listQuery.startTime = ""
      this.listQuery.endTime = ""
      this.listQuery.currentPage = 1
      this.init()
    },
    // 编辑
    handlEnit(row) {
      if(row.rptStatus == '2'){
        this.flag = true
      }else {
        this.flag = false
      }
       this.reportForm.shipId = row.shipId
      this.reportForm.startTime = row.rptStartTime
      this.reportForm.endTime = row.rptEndTime
      this.reportForm.imoRptId = row.id
      this.reportForm.year = row.euMrvYear
      generatorEuDcs(this.reportForm).then(res => {
         if(res.data.result) {
            // debugger
            let needkeys = ['hourIce','hfoTons','lfoTons','dgoTons','euCo2Tons','euInnerCo2Tons','euToCo2Tons','euFrCo2Tons',
              'euBerthCo2Tons','euLadenCons','euCargoheatCons','distOnsea','distIce','hourOnsea','transportWork','fuelConsPerMile','fuelConsPerWork','co2PerMile2',
            'co2PerWork2']
            needkeys.forEach(k=>{
              if(res.data.data.hasOwnProperty(k)){
                res.data.data[k] = this.changeDecimalBuZero(res.data.data[k], 4)
              }
            })
           this.list = res.data.data
          this.shipComPanyNamevicodes = true
          }else {
            this.$notify({
            title: "error",
            message: res.data.data,
            type: "error",
            duration: 2000
          });
          }


      })
    },

    changeDecimalBuZero(number, bitNum) {
      /// <summary>
      /// 小数位不够，用0补足位数
      /// </summary>
      /// <param name="number">要处理的数字</param>
      /// <param name="bitNum">生成的小数位数</param>
      var f_x = parseFloat(number);
      if (isNaN(f_x)) {
        return 0;
      }
      var s_x = number.toString();
      var pos_decimal = s_x.indexOf('.');
      if (pos_decimal < 0) {
        pos_decimal = s_x.length;
        s_x += '.';
      }
      while (s_x.length <= pos_decimal + bitNum) {
        s_x += '0';
      }
      return s_x;
    },

    shipComPanyNameDetail() {
        this.init()
        this.flag = false
        this.shipComPanyNamevicodes = false
    },
    // 列表查询
    init() {
      this.listLoading= true
      getEudcs(this.listQuery).then(res => {
          this.listLoading= false
          this.dataTreeGrid = res.data.data.items
      })
    },
     addclick() {
      this.shipComPanyNamevicode = true
    },
    shipComPanyNameData() {
      this.init()
      this.shipComPanyNamevicode = false
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.init();
    },
    handlDelete(row) {
      deleteEuDcs({id:row.id}).then(res => {
           if (res.data.result) {
            this.init()
            this.$message({
              message: '删除Success',
              type: 'success'
            })
          } else {
            this.$message({
              showClose: true,
              message: '删除error',
              type: 'error'
            })
          }
      })
    },
     // 解锁、锁定
    handleModifyStatus(row) {

        lockOrUnlockEuDcs({ id: row.id }).then(res => {
          if (res.data.result) {
            this.init()
            this.$message({
              message: '操作Success',
              type: 'success'
            })
          } else {
            this.$message({
              showClose: true,
              message: '操作error',
              type: 'error'
            })
          }
        })
    },
  }
};
</script>
<style scoped>
.search_fieldset {
  display: block;
  border: #e1e1e1 solid 1px;
  color: #ababab;
  margin-left: 30px;
  padding-bottom: 0px;
}
.radio-label {
  display: inline-block;
  font-size: 12px;
  color: #606266;
  line-height: 35px;
  padding: 0;
  width: 50px;
}
.el-select {
  margin-right: 20px;
}
.el-checkbox__label {
  padding-left: 5px;
  font-size: 12px;
}
.addBox {
  display: flex;
}
.p {
  height: 3px;
  background: brown;
}
.inputBox {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
