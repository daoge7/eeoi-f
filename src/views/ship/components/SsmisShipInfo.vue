<template>
  <el-form ref="oiShipInfo" :rules="shipInfoRules" :model="oiShipInfo" label-position="left" label-width="100px" style="width:100%">
    <el-row>
      <el-col :span="8">
        <el-form-item :label="$t('ship.shipNameCn')" prop="cspname">
          <el-input v-model="oiShipInfo.cspname" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('ship.shipName')" prop="spname">
          <el-input v-model="oiShipInfo.spname" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('ship.imono')" prop="imono">
          <el-input v-model="oiShipInfo.imono" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item :label="$t('ship.registNo')">
          <el-input v-model="oiShipInfo.ccsno" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('ship.shipClass')">
          <el-select v-model="oiShipInfo.shipClass" class="filter-item" :placeholder="$t('common.selectRemind')" style="width:100%">
            <el-option v-for="item in shipClassOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('ship.shipFlag')">
          <el-input v-model="oiShipInfo.flag" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('ship.builder')">
          <el-input v-model="oiShipInfo.builderName" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('ship.owner')">
          <el-input v-model="oiShipInfo.ownerName" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('ship.operator')">
          <el-input v-model="oiShipInfo.operatorName" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('ship.manager')">
          <el-input v-model="oiShipInfo.docName" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item :label="$t('ship.mrvContacts')">
          <el-input v-model="oiShipInfo.title" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item :label="$t('ship.mrvPost')">
          <el-input v-model="oiShipInfo.jobtitle" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item :label="$t('ship.mrvPhone')">
          <el-input v-model="oiShipInfo.telephone" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item :label="$t('ship.mrvEmail')">
          <el-input v-model="oiShipInfo.email" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item :label="$t('ship.shipType')">
          <el-input v-model="oiShipInfo.sptype" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('ship.shipSubType')">
          <!--<el-select v-model="oiShipInfo.sptypeSub" class="filter-item" :placeholder="$t('common.selectRemind')" style="width:100%">-->
            <!--<el-option v-for="item in shipSubTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />-->
          <!--</el-select>-->
          <el-input v-model="oiShipInfo.sptypeSub" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('ship.speed')" prop="serviceSpeed">
          <el-input v-model="oiShipInfo.speed" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item :label="$t('ship.gross')">
          <el-input v-model="oiShipInfo.gross" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('ship.dwt')" prop="dw">
          <el-input v-model="oiShipInfo.dw" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('ship.net')">
          <el-input v-model="oiShipInfo.net" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item :label="$t('ship.finishDate')">
          <el-date-picker v-model="oiShipInfo.finish" :editable="true" type="date" align="left" :placeholder="$t('common.datePickerRemind')" style="width:100%" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('ship.passengers')">
          <el-input v-model="oiShipInfo.passengers" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('ship.cars')">
          <el-input v-model="oiShipInfo.cars" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item :label="$t('ship.contractDate')">
          <el-date-picker v-model="oiShipInfo.buildContractTm" :editable="true" type="date" align="left" :placeholder="$t('common.datePickerRemind')" style="width:100%" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('ship.teu')">
          <el-input v-model="oiShipInfo.teus" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('ship.iceCode')">
          <el-input v-model="oiShipInfo.ice" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item :label="$t('ship.lastwuDate')">
          <el-date-picker v-model="oiShipInfo.lastwu" :editable="true" type="date" align="left" :placeholder="$t('common.datePickerRemind')" style="width:100%" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('ship.manageType')">
          <el-select v-model="oiShipInfo.operateType" class="filter-item" :placeholder="$t('common.selectRemind')" style="width:100%">
            <el-option v-for="item in manageOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('ship.testType')">
          <el-select v-model="oiShipInfo.consMethod" class="filter-item" :placeholder="$t('common.selectRemind')" style="width:100%">
            <el-option v-for="item in testOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item :label="$t('ship.eediImp')">
          <el-input v-model="oiShipInfo.eedi" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('ship.eedi')">
          <el-input v-model="oiShipInfo.eediValue" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('ship.eiv')">
          <el-input v-model="oiShipInfo.eiv" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item :label="$t('ship.remark')">
      <el-input v-model="oiShipInfo.remark" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled" />
    </el-form-item>
    <!--<el-form-item style="text-align: center">-->
    <!--<el-button type="primary" @click="createOIShipInfo('oiShipInfo')">保存</el-button>-->
    <!--<el-button @click="resetForm('oiShipInfo')">重置</el-button>-->
    <!--</el-form-item>-->
  </el-form>
</template>
<!--<el-button type="primary" @click="createOIShipInfo('oiShipInfo')">保存</el-button>-->
<!--<el-button @click="resetForm('oiShipInfo')">重置</el-button>-->

<script>
import * as API from "@/api/requestPost"
const manageOptions = [ // eslint-disable-line no-unused-vars
  { key: '1', display_name: '公司1' },
  { key: '2', display_name: '公司2' },
  { key: '3', display_name: '公司3' }
]

const testOptions = [ // eslint-disable-line no-unused-vars
  { key: '1', display_name: '公司1' },
  { key: '2', display_name: '公司2' },
  { key: '3', display_name: '公司3' }
]

const companyOptions = [
  { key: '1', display_name: '公司1' },
  { key: '2', display_name: '公司2' },
  { key: '3', display_name: '公司3' }
]

const shipClassOptions = [
  { key: '1', display_name: 'CCS' },
  { key: '2', display_name: '船级2' },
  { key: '3', display_name: '船级3' }
]

// const shipFlagOptions = [
//   { key: '1', display_name: '阿尔巴尼亚' },
//   { key: '2', display_name: '阿富汗' },
//   { key: '3', display_name: '阿根廷' }
// ]

const shipTypeOptions = [
  { key: '1', display_name: '散货船' },
  { key: '2', display_name: '液货船' },
  { key: '3', display_name: '气体运输船' },
  { key: '4', display_name: '集装箱船' },
  { key: '5', display_name: '滚装货船' },
  { key: '6', display_name: '普通货船' }
]

const shipSubTypeOptions = [
  { key: '101', display_name: '灵便型' },
  { key: '102', display_name: '巴拿马' },
  { key: '103', display_name: '好望角' },
  { key: '104', display_name: 'VLOC' },
  { key: '105', display_name: '苏伊士' },
  { key: '106', display_name: 'VLCC' }
]

export default {
  name: 'SsmisShipInfo',
  props: {
    editStatus: {
      type: String,
      default: ''
    },
    editRowId: {
      type: String,
      default: ''
    },
    rowModel: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      companyOptions,
      shipTypeOptions,
      shipSubTypeOptions,
      shipClassOptions,
      shipFlagOptions:[],
      dialogFormVisible: false,
      formIsDisabled: false,
      oiShipInfo: {
        id: undefined,
        imono: '',
        ccsno: '',
        spname: '',
        cspname: '',
        flag: '',
        shipClass: '',
        sptype: '',
        docCode: '',
        sptypeSub: '',
        speed: '',
        gross: '',
        dw: '',
        net: '',
        finish: '',
        passengers: '',
        cars: '',
        buildContractTm: '',
        teus: '',
        ice: '',
        lastwu: '',
        operateType: '',
        consMethod: '',
        eedi: '',
        eedivalue: '',
        eeoi: '',
        eiv: '',
        remark: '',
        clientId: '',
        eediValue: ''
      }
      // shipInfoRules: {
      //   spnameCn: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
      //   spname: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
      //   imono: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
      //   serviceSpeed: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
      //   dw: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
      // }
    }
  },
  created() {
    this.getList()
  },
  methods: {

    resetForm() {
      // this.$refs['oiShipInfo'].resetFields();
      this.oiShipInfo = {
        id: undefined,
        imono: '',
        registerno: '',
        spname: '',
        spnameCn: '',
        flagCode: '',
        builderId: '',
        ownerId: '',
        operatorId: '',
        docId: '',
        title: '',
        jobtitle: '',
        telephone: '',
        email: '',
        class_: '',
        sptype: '',
        sptypeSub: '',
        serviceSpeed: '',
        gross: '',
        dw: '',
        net: '',
        finish: '',
        passengers: '',
        cars: '',
        buildContractTm: '',
        teus: '',
        ice: '',
        lastwu: '',
        operateType: '',
        consMethod: '',
        eedi: '',
        eedivalue: '',
        eeoi: '',
        eiv: '',
        remark: '',
        clientId: '',
        ccsno: ''
      }
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    CreateModel() {
      this.resetForm()
      this.$nextTick(() => {
        this.$refs['oiShipInfo'].clearValidate()
      })
    },
    EditRowData(row) {
      this.oiShipInfo = Object.assign({}, row)
      this.$nextTick(() => {
        this.$refs['oiShipInfo'].clearValidate()
      })
    },

  }
}
</script>
