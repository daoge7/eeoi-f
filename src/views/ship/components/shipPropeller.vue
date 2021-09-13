<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="oiShipBoilerId" class="filter-item" :placeholder="$t('common.selectRemind')" style="width:100px" value="1" @change="xhSelectChange">
        <el-option v-for="item in oiShipPropellers" :key="item.id" :label="item.xh" :value="item.id" />
      </el-select>
    </div>
    <el-form ref="shipPropellerForm" :rules="rules" :model="temp" label-position="left" label-width="100px">
      <el-row>
        <el-col :span="8">
          <el-form-item :label="$t('ship.formType')" prop="type">
            <el-select :disabled="this.formIsDisabled" v-model="temp.type" class="filter-item" :placeholder="$t('common.selectRemind')" prop="typeop" style="width:100%">
              <el-option v-for="item in typeOptions" :key="item" :label="item" :value="item" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('ship.certNO')">
            <el-input v-model="temp.certNu" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('ship.count')">
            <el-input v-model="temp.count" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item :label="$t('ship.weight')">
            <el-input v-model="temp.weight"  type="number" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled">
              <i slot="suffix" style="color:red">Kg</i>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('ship.material')">
            <el-input v-model="temp.material" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('ship.diameter')">
            <el-input v-model="temp.diameter"  type="number" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled">
              <i slot="suffix" style="color:red">mm</i>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item :label="$t('ship.pitch')">
            <el-input v-model="temp.pitch"  type="number" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled">
              <i slot="suffix" style="color:red">mm</i>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('ship.ypCount')">
            <el-input v-model="temp.leafNum" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('ship.turnTo')">
            <el-input v-model="temp.turnTo" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item :label="$t('ship.iceCode')">
            <el-input v-model="temp.ice" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('ship.source')">
            <el-input v-model="temp.builder" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('ship.equipmentXh')" prop="xh">
            <el-input v-model="temp.xh" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled"/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { getQueryPage } from '../../../api/requestGet'
export default {
  name: 'ShipPropeller',
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
  watch:{
    oiShipPropellers(val) {
      if(val.length) {
        this.oiShipBoilerId = val[0].id
        this.initData()
      }
    }
  },
  data() {
    return {
      formIsDisabled: false,
      oiShipBoilerId: '',
      oiShipPropellers: [],
	    typeOptions: ['形式1', '形式2', '形式3'],
      rules: {
        type: [{ required: true, message: '必填项', trigger: 'blur' }],
        xh: [{ required: true, message: '必填项', trigger: 'blur' }]
      },
      temp: {
        id: undefined,
        shipId: '',
        type: '',
        xh: '',
        ice: '',
        builder: '',
        turnTo: '',
        leafNum: '',
        pitch: '',
        weight: '',
        material: '',
        certNu: '',
        diameter: '',
        count: ''
      }
    }
  },
  methods: {
    resetTemp() {
      this.temp = {
       id: undefined,
        shipId: '',
        type: '',
        xh: '',
        ice: '',
        builder: '',
        turnTo: '',
        leafNum: '',
        pitch: '',
        weight: '',
        material: '',
        certNu: '',
        diameter: '',
        count: ''
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
      this.resetTemp()
      this.$nextTick(() => {
        this.$refs['shipPropellerForm'].clearValidate()
      })
    },
    EditRowData(row) {
      const rowdata = Object.assign({}, row)
      this.temp = rowdata.shipPropeller[1]
      this.$nextTick(() => {
        this.$refs['shipPropellerForm'].clearValidate()
      })
    },
    initData() {
       getQueryPage('/shipManager/getOiShipPropelerById', {
        oiShipPropellerId: this.oiShipBoilerId
      }).then(response => {
        this.temp = response.data.data
      })
    },
    xhSelectChange() {
      getQueryPage('/shipManager/getOiShipPropelerById', { oiShipPropellerId: this.oiShipBoilerId }).then(response => {
        this.temp = response.data.data

      })
    }
  },
  }
</script>
