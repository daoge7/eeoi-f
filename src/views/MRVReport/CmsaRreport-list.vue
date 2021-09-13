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
          icon="el-icon-search"
          style="margin-left:20px"
          @click="handleFilter"
        >{{ $t('common.search') }}</el-button>
        <el-button
          class="filter-item"
          type="info"
          icon="el-icon-setting"
          @click="handleReset"
        >{{ $t('common.reset') }}</el-button>
      </div>
      <div style="margin-top:10px;">
          <el-button type="primary" icon='el-icon-plus' @click="addClick">{{ $t('common.add') }}</el-button>
          <el-button type="primary" @click="handClick">{{ $t('MRV.Statustag') }}</el-button>
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
         @selection-change="handleSelectionChange"
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
              v-if="row.rptStatus=='1'"
              size="mini"
              type="warning"
              @click="handleModifyStatus(row)"
            >{{ $t('voyage.btnLock') }}</el-button>
            <el-button
              v-if="row.rptStatus =='2' || row.rptStatus == '3'"
              size="mini"
              @click="handleModifyStatus(row)"
            >{{ $t('voyage.btnUnLock') }}</el-button>
            <el-button
              type="primary"
              size="mini"
              @click="handlEdit(row)"
            >{{ $t('common.edit') }}</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handlDetele(row)"
            >{{ $t('common.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
     <pagination v-show="total>0" style="margin:0px;padding:0px" :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize" @pagination="init"/>
      <CmsadreportManagementAdd :listData="listData" :shipComPanyNamevicode="shipComPanyNamevicode" @shipComPanyNameData="shipComPanyNameData" v-if="shipComPanyNamevicode"/>
    </div>
  </div>
</template>

<script>
import CmsadreportManagementAdd from './components/CmsadreportManagement-add'
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import { getCmsaStdRpt,deleteCmsaRpt,lockOrUnLockCmsaRpt,cmsaRptStatusTag } from '@/api/requestPost'
import adaptive from "@/directive/el-table";
export default {
  name: "CmsaRreport",
  components: {
    Pagination,
    CmsadreportManagementAdd
  },
  directives: { adaptive },
  data() {
    return {
      ids: [],
      listData: {
        isTurnToFlalg: false ,
            isTurnToDoc: false,
            notUse: false,
            voyageRpt: true,
            yearRpt: false,
            startTime:null,
            endTime:null,
            taskId: '',
            shipId: '',
            id: ''
      },
      shipComPanyNamevidatas:false,
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
    handClick() {
      let obj ={
        cmsaRptIds:this.ids
      }
      if(this.ids.length){
         cmsaRptStatusTag(obj).then(res => {
        if(res.data.result){
          this.init()
        }
      })
      }else {
        this.$message({
        message: "请选择至少一条进行标记",
        type: "warning"
      });
      }
    },
    handlEdit(row) {
      console.log(row)
        if(row.rptStatus !=='2' || row.rptStatus !== '3'){
          this.listData = row
          this.shipComPanyNamevicode = true
      }else {
        this.$message({
        message: "锁定状态下无法进行此操作",
        type: "warning"
      });
      }
    },
    init() {
      this.listLoading = true
      getCmsaStdRpt(this.listQuery).then(res => {
        if(res.data.result) {
          this.listLoading = false
          this.voymrvData = res.data.data.items
          this.total = res.data.data.total
      
        }
      })
    },
    handleSelectionChange(val){
      console.log()
      let obj =[]
      val.forEach(ele => {
         obj.push(ele.id)
      })
      this.ids = obj
    },
    handlDetele(row) {
      if(row.rptStatus !=='2' || row.rptStatus !== '3'){
        deleteCmsaRpt({id:row.id}).then(res => {
        if(res.data.result){
          this.init()
        }
      })
      }else {
        this.$message({
        message: "锁定状态下无法进行此操作",
        type: "warning"
      });
      }
      
    },
    addClick() {
      this.listData = {
        isTurnToFlalg: false ,
            isTurnToDoc: false,
            notUse: false,
            voyageRpt: true,
            yearRpt: false,
            startTime:null,
            endTime:null,
            taskId: '',
            shipId: '',
            id: ''
      },
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
    handleModifyStatus(row) {
      lockOrUnLockCmsaRpt({id:row.id}).then(res => {
          if(res.data.result){
            this.init();
               this.$message({
        message: "操作Success",
        type: "success"
      });
          }
      })
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