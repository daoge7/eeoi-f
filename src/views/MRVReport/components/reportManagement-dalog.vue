<!--
新增MRV报告
-->
<template>
    <el-dialog :title="$t('MRV.NewMRVReport')" :append-to-body="true" :visible.sync="shipComPanyNamevicode" :before-close="addDetales" width="80%">
      <el-form
        ref="generateData"
        :model="generateData"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:20px;"
      >
        <el-form-item label-width="150px" :label="$t('shipBattery.shipName')" prop="imono">
          <div class="addBox">
            <el-input v-model="shipNam" disabled :placeholder="$t('MRV.boxselect')" />
            <el-button
              type="primary"
              style="margin-left:20px"
              @click="addImon"
            >{{ $t('common.select') }}</el-button>
          </div>
        </el-form-item>
        <el-form-item label-width="150px" :label="$t('MRV.ShipIMONo')" prop="imono">
          <div class="addBox">
            <el-input v-model="shipMOM" disabled :placeholder="$t('MRV.boxselect')" />
            <el-button
              type="primary"
              style="margin-left:20px"
              @click="addImon"
            >{{ $t('common.select') }}</el-button>
          </div>
        </el-form-item>
        <el-form-item label-width="150px" :label="$t('MRV.particularyear')" prop="imono">
          <div class="addBox">
            <el-select v-model="generateData.year" :placeholder="$t('common.selectRemind')"  style="width:174px;">
              <el-option
                v-for="item in ReportingyearArray"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
      <el-button style="margin-left:20px" @click="addIMOReportInfo()">{{ $t('MRV.generate') }}</el-button>
          </div>
        </el-form-item>
      </el-form>
      <shipSwlectsDelog
      v-if="dialogShipCompanyFormVisible"
      :add="dialogShipCompanyFormVisible"
      @adds="adds"
    />
    <reportManagementDetail :list='list' :shipComPanyNamevicodes='shipComPanyNamevicodes' @shipComPanyNameDetail="shipComPanyNameDetail"  v-if="shipComPanyNamevicodes"/>
    </el-dialog>
</template>

<script>
import shipSwlectsDelog from '@/components/ShipComPanySelect/shipSwlects-delog'
import reportManagementDetail from './reportManagementDetail-dalog'
import { getYears } from '@/api/requestGet'
import {getDcsPeriodTime} from '@/api/requestGet'
import {deleteImoStdRpt, generatorEuDcs} from '@/api/requestPost'
export default {
  name: "reportManagementDalog",
  components: {
      shipSwlectsDelog,
      reportManagementDetail
  },
  props: {
    shipComPanyNamevicode: {
      type: Boolean
    }
  },
  data() {
    return {
      shipComPanyNamevicodes: false,
      IMOReportInfo: false,
      tableHeight: window.innerHeight - 240 - 200,
      tableData: [], // 表格数据
      shipNam: '',
      shipMOM: '',
      list: [],
      generateData: {
        // 自动生成查询数据
        shipId: '',
        year: '2020'
         },
        ReportingyearArray: [ // 年度
      ],

      reportForm: {
        id: '',
        shipId: '',
        startTime:'',
        endTime: '',
        imoRptId: ''
      },
        dialogShipCompanyFormVisible: false,
        listq:{
           // 自动生成查询数据
        shipId: '',
        year: '2020'
        }
    };
  },
  created() {
      this.generateData = this.listq
      this.shipNam= '' // 船名
      this.shipMOM=''
      this.initYear()
  },
  methods: {
    initYear() {
      getYears().then(res => {
        this.ReportingyearArray = res.data.data
      })
    },
    // 查询报表
    queryPostClick() {
      this.getListAdd()
    },
    getListAdd() {
      const url = '/mrv/getDcsPeriodTime'
      getDcsPeriodTime(this.generateData.shipId, this.generateData.year,'1').then(
        res => {
          this.tableData = res.data.data
        }
      )
    },
     addIMOReportInfo() {
      this.reportForm.shipId = this.generateData.shipId
      this.reportForm.year = this.generateData.year
      this.shipComPanyNamevicodes = true
      generatorEuDcs(this.reportForm).then(res => {
        this.list = res.data.data
      })

    },
     // 删除自动表格数据
    deleteArr(row) {
      // console.log(row.imoRptId);
      deleteImoStdRpt({ imoStdId: row.imoRptId }).then(res => {
        this.getListAdd()
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      })
    },
    addDetales() {
        this.$emit('shipComPanyNameData', false)
    },
      // 船名弹框数据
    adds(val) {
      this.shipNam = val.name
      this.shipMOM= val.imo
      this.generateData.shipId = val.id // 自动生成查询数据
      this.dialogShipCompanyFormVisible = false
    },
     // 船名选择
     addImon() {
      this.dialogShipCompanyFormVisible = true
     },
     shipComPanyNameDetail() {
        this.IMOReportInfo = false
        this.$emit('shipComPanyNameData', false)
     }
  }
};
</script>

<style scoped>
.addBox{
    display: flex;
  }
</style>
