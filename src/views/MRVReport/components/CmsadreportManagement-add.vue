<!--新增cmsa报告管理-->
<template>
    <el-dialog title="新增CMSA报告" width="80%" :append-to-body="true" :visible.sync="shipComPanyNamevicode" :before-close="addDetales">
      <el-form ref="listQuery" :model="listQuery" label-width="175px">
      <el-row>
      <el-col :span="12">
      <el-form-item label="船舶名称">
        <div class="addBox">
          <el-input v-model="shipName" disabled :placeholder="$t('MRV.boxselect')" style="width:145px;"/>
          <el-button type="primary" style="margin-left:20px" @click="addImon">
          {{ $t('common.select') }}
        </el-button>
        </div>
        </el-form-item>
      </el-col>
      <el-col :span="12">
      <el-form-item label="船舶IMO号">
        <div class="addBox">
          <el-input v-model="shipIom" disabled :placeholder="$t('MRV.boxselect')" style="width:145px;"/>
          <el-button type="primary" style="margin-left:20px" @click="addImon">
          {{ $t('common.select') }}
        </el-button>
        </div>
        </el-form-item>
      </el-col>
      </el-row>
       <el-row>
      <el-col :span="12">
      <el-form-item label="开始日期">
        <el-date-picker
          v-model="listQuery.startTime"
          type="datetime"
          placeholder="选择日期时间"
          format="yyyy-MM-dd"
          >
        </el-date-picker>
      </el-form-item>
      </el-col>
      <el-col :span="12">
      <el-form-item label="结束日期">
      <el-date-picker
      v-model="listQuery.endTime"
      type="datetime"
      placeholder="选择日期时间"
      format="yyyy-MM-dd"
      >
    </el-date-picker>
      </el-form-item>
      </el-col>
      </el-row>
      </el-form>
      <table class="Kin_Table mtp10 table-nonb" width="100%" border="1" cellspacing="0" bordercolor="#000000" style="border-collapse:collapse;">
		  <tbody style="text-align: center;">
        <tr>
          <td>
            <label><el-checkbox v-model="listQuery.voyageRpt" @change="voy">航次报</el-checkbox></label>
            <el-select :disabled="voyageRpt" v-model="listQuery.taskId" placeholder="请选择">
            <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.taskNu +'~'+ item.startTime+'~'+item.endTime"
            :value="item.taskId">
            </el-option>
            </el-select>
          </td>
        </tr>
        <tr>
         <td>
          <p class="newline">Voyage report</p>
          </td>
        </tr>
        <tr>
         <td style="height:30px;">
          </td>
        </tr>
        <tr>
          <td>
            <label><el-checkbox v-model="listQuery.yearRpt" @change="year">年报/月报</el-checkbox> </label>
          </td>
        </tr>
        <tr>
          <td>
            <p class="newline">Annual report /monthly report</p>
          </td>
        </tr>
        <tr>
         <td style="height:30px;">
          </td>
        </tr>
        <tr>
          <td colspan="4">
            <p class="newline">
              船舶在报告期内是否发生船舶转换船旗、所有人或经营人的情形：<br>
              
            </p>
          </td>
        </tr>
        <tr>
          <td colspan="4">
            <p class="newline">
              Whether the following events are occurred during the report period:
            </p>
          </td>
        </tr>
        <tr>
         <td style="height:30px;">
          </td>
        </tr>
        <tr>
          <td colspan="4">
            <label><el-checkbox v-model="listQuery.isTurnToFlalg">转换船旗</el-checkbox></label>
          </td>
        </tr>
          <tr>
          <td colspan="4">
            <p class="newline">The transfer of a ship from one Administration to another</p>
          </td>
        </tr>
        <tr>
         <td style="height:30px;">
          </td>
        </tr>
        <tr>
          <td colspan="4">
            <label><el-checkbox v-model="listQuery.isTurnToDoc">转换所有人或经营人</el-checkbox></label>
            <p class="newline">A change from one Company to another</p>
          </td>
        </tr>
         <tr>
          <td colspan="4">
            <p class="newline">A change from one Company to another</p>
          </td>
        </tr>
        <tr>
         <td style="height:30px;">
          </td>
        </tr>
        <tr>
          <td colspan="4">
            <label><el-checkbox v-model="listQuery.notUse">不适用</el-checkbox></label>
          </td>
        </tr>
        <tr>
          <td colspan="4">
            <p class="newline"> N/A</p>
          </td>
        </tr> 
      </tbody>
    </table>
      <shipSwlectsDelog :add="dialogShipCompanyFormVisible" @adds="adds" v-if="dialogShipCompanyFormVisible"/>
      <CmsadreportManagementDetail  v-if="shipComPanyNamevidata"  :listData="listQuery" :shipComPanyNamevidata="shipComPanyNamevidata" @shipComPanyNameData="shipComPanyNameData"/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDetale">确定</el-button>
        <el-button @click="addDetales">取消</el-button>
      </div>
    </el-dialog>
</template>

<script>
import shipSwlectsDelog from '@/components/ShipComPanySelect/shipSwlects-delog'
import CmsadreportManagementDetail from './CmsadreportManagement-dalog'
import { getTasksByShipId } from '@/api/requestGet'
export default {
  name: "reportManagementDalog",
  components: {
      shipSwlectsDelog,
      CmsadreportManagementDetail
  },
  props: {
    shipComPanyNamevicode: {
      type: Boolean
    },
    listData:{
      type:Object
    }
  },
  data() {
    return {
        yearRpt: true,
        voyageRpt:false,
        value: '',
        options:[],
        shipComPanyNamevidata: false,
        dialogShipCompanyFormVisible: false,
        checked: false,
        shipName: '', // 船名
        shipIom: '', // imo号
        listQuery: {
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
        listq:{
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
        }
    };
  },
  watch:{ 
    'listQuery.yearRpt'(val){
       if(val){
         this.voyageRpt = true
         this.listQuery.voyageRpt = false
         this.listQuery.taskId = ''
       }else {
          this.voyageRpt = false
       }
    },
    'listQuery.voyageRpt'(val) {
         if(val){
         this.yearRpt = true
         this.listQuery.yearRpt = false
       }else {
          this.yearRpt = false
       }
    }
  },
  created() {
      if(this.listData.id){
        this.listQuery = this.listData
         this.shipName= this.listData.shipName // 船名
        this.shipIom=this.listData.imoNu
        this.listQuery.startTime = this.listData.rptStartTime
        this.listQuery.endTime = this.listData.rptEndTime
        getTasksByShipId(this.listData.shipId).then(res => {
          if(res.data.result) {
            this.options = res.data.data.cmsaTaskVos
          }
        })
      }else {
        this.listQuery = this.listq
        this.shipName= '' // 船名
        this.shipIom=''
      }
      
  },
  methods: {
    voy() {

    },
    year() {

    },
    addDetales() {
        this.$emit('shipComPanyNameData', false)
    },
    shipComPanyNameData() {
        this.shipComPanyNamevidata =false
    },
    
    addDetale() {
       this.shipComPanyNamevidata = true
    },
    
      // 船名弹框数据
    adds(val) {
      if(val){
      this.shipName = val.name
      this.shipIom= val.imo
      this.listQuery.shipId = val.id
       }
      this.dialogShipCompanyFormVisible = false
      if(val.id){
        getTasksByShipId(val.id).then(res => {
          if(res.data.result) {
            this.options = res.data.data.cmsaTaskVos
          }
        })
      }
    },
     // 船名选择
     addImon() {
      this.dialogShipCompanyFormVisible = true
     }
  }
};
</script>

<style scoped>
.addBox{
    display: flex;
  }
.table-nonb tr td{
  line-height:170%;
  padding:3px 0;
  font-size:12px;
}
.newline{
  margin:0;
  padding:0;
  padding-left:16px;
}
</style>
