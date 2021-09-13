<!-- cmsa报告管理 -->
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
          type="primary"
          icon="el-icon-search"
          style="margin-left:20px"
          @click="handleFilter"
        >{{ $t('common.search') }}</el-button>
        <el-button
          class="filter-item"
          type="primary"
          icon="el-icon-setting"
          @click="handleReset"
        >{{ $t('common.reset') }}</el-button>
      </div>
      <div style="margin-top:10px;">
          <el-button type="primary" icon='el-icon-plus' @click="addClick">{{ $t('common.add') }}</el-button>
          <el-button type="primary">{{ $t('MRV.Statustag') }}</el-button>
      </div>
      <el-table
        v-loading="listLoading"
        :data="voymrvData"
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
          :label="$t('MRV.Nameofvessel')"
          align="center"
          width="auto"
          show-overflow-tooltip
        >
          <template slot-scope="{row}">
            <a>{{ row.shipName }}</a>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('MRV.managementcompany')"
          align="center"
          width="auto"
          show-overflow-tooltip
        >
          <template slot-scope="{row}">
            <span>{{ row.docManager }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('MRV.FlagState')"
          width="auto"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="{row}">
            <span>{{ row.flag }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('MRV.Shiptype')" width="auto" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.shipType }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('MRV.Reportstartdate')"
          width="150px"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="{row}">
            <span>{{ row.rptStartTime | datesformat('YYYY-MM-DD HH:mm') }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('MRV.Reportenddate')"
          width="150px"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="{row}">
            <span>{{ row.rptEndTime | datesformat('YYYY-MM-DD HH:mm') }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('MRV.Reportstatus')"
          width="150px"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="{row}">
            <span v-if="row.rptStatus =='1'">{{ $t('MRV.Registration') }}</span>
            <span v-if="row.rptStatus =='2'">{{ $t('MRV.Lockstate') }}</span>
            <span v-if="row.rptStatus =='3'">{{ $t('MRV.Submitted') }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('common.operate')"
          align="center"
          width="220px"
          class-name="small-padding fixed-width"
          show-overflow-tooltip
        >
          <template slot-scope="{row}">
            <el-button
              v-if="row.status=='lock'"
              size="mini"
              type="success"
              @click="handleModifyStatus(row,'unlock')"
            >{{ $t('voyage.btnUnLock') }}</el-button>
            <el-button
              v-if="row.status=='unlock'"
              size="mini"
              @click="handleModifyStatus(row,'lock')"
            >{{ $t('voyage.btnLock') }}</el-button>
            <el-button
              type="primary"
              size="mini"
              @change="handlEdit(row)"
            >{{ $t('common.edit') }}</el-button>
            <!-- <el-button
              size="mini"
              type="danger"
            >{{ $t('common.Submitted') }}</el-button> -->
            <!-- <el-button
              size="mini"
              type="danger"
            >{{ $t('common.liberia') }}</el-button> -->
            <el-button
              size="mini"
              type="danger"
            >{{ $t('common.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
     <!-- <pagination v-show="total>0" style="margin:0px;padding:0px" :total="total" :page.sync="getImoStdRptsData.currentPage" :limit.sync="getImoStdRptsData.pageSize" @pagination="getList"/> -->
      <CmsadreportManagementAdd :shipComPanyNamevicode="shipComPanyNamevicode" @shipComPanyNameData="shipComPanyNameData" v-if="shipComPanyNamevicode"/>
    </div>
  </div>
</template>

<script>
import CmsadreportManagementAdd from './components/CmsadreportManagement-add'
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import { getCmsaStdRpt } from '@/api/requestPost'
import adaptive from "@/directive/el-table";
export default {
  name: "reportManagement",
  components: {
    Pagination,
    CmsadreportManagementAdd
  },
  directives: { adaptive },
  data() {
    return {
      dataTreeGrid:[],
      shipComPanyNamevicode: false,
      tableHeight: window.innerHeight - 240 - 200,
      total: 0,
      listLoading: false,
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        flag: "",
        keyword: "",
        startTime: "",
        endTime: ""
      },
      listq: {
        currentPage: 1,
        pageSize: 20,
        flag: "",
        keyword: "",
        startTime: "",
        endTime: ""
      },
      voymrvData: []
    };
  },
  created() {
    this.init()
  },
  methods: {
    handlEdit() {
      this.shipComPanyNamevicode = true
    },
    init() {
      getCmsaStdRpt(listQuery).then(res => {
        if(res.data.result) {
          this.voymrvData = res.data.data
      
        }
      })
    },
    addClick() {
      this.shipComPanyNamevicode = true
    },
    shipComPanyNameData() {
      this.shipComPanyNamevicode = false
    },
    handleFilter() {
      this.listQuery.currentPage = 1;
      this.init();
    },
    handleReset() {
      this.listQuery = this.listq
      this.init()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: "操作Success",
        type: "success"
      });
      row.status = status;
    }
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
  width: 60px;
  margin-right: 10px;
    display: flex;
    justify-content: flex-end;
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