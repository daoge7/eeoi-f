<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="oiShipBatteryId" class="filter-item" :placeholder="$t('common.selectRemind')" style="width:100px" value="1" @change="xhSelectChange">
        <el-option v-for="item in oiShipBatteryIds" :key="item.id" :label="item.xh" :value="item.id" />
      </el-select>
      <!--<el-button class="filter-item" style="margin-left: 10px;" size="mini" type="primary" icon="el-icon-plus">-->
      <!--{{ $t('common.add') }}-->
      <!--</el-button>-->
      <!--<el-button class="filter-item" type="primary" size="mini" icon="el-icon-edit" style="margin-left: 10px;">-->
      <!--{{ $t('common.edit') }}-->
      <!--</el-button>-->
      <!--<el-button class="filter-item" type="danger" size="mini" icon="el-icon-delete" style="margin-left: 10px;">-->
      <!--{{ $t('common.delete') }}-->
      <!--</el-button>-->
    </div>
    <el-form ref="batteryForm" :model="oiShipBattery" label-width="100px">
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('shipBattery.cellModel')">
            <el-input v-model="oiShipBattery.cellModel" :placeholder="$t('common.inputRemind')" :readonly="formIsDisabled" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('shipBattery.cellParam')">
            <el-input v-model="oiShipBattery.cellParam" :placeholder="$t('common.inputRemind')" :readonly="formIsDisabled" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('shipBattery.voltage')">
            <el-input v-model="oiShipBattery.voltage"   type="number" :placeholder="$t('common.inputRemind')" :readonly="formIsDisabled" >
              <i slot="suffix" style="color:red">Volt</i>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('shipBattery.capacity')">
            <el-input v-model="oiShipBattery.capacity"  type="number" :placeholder="$t('common.inputRemind')" :readonly="formIsDisabled" >
              <i slot="suffix" style="color:red">Kwh</i>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('shipBattery.weight')">
            <el-input v-model="oiShipBattery.weight"  type="number" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled" >
              <i slot="suffix" style="color:red">Kg</i>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('shipBattery.batteryModel')">
            <el-input v-model="oiShipBattery.batteryModel" :placeholder="$t('common.inputRemind')" :readonly="formIsDisabled" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('shipBattery.serialNo')">
            <el-input v-model="oiShipBattery.serialNo" :placeholder="$t('common.inputRemind')" :readonly="formIsDisabled" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('shipBattery.unitNum')">
            <el-input v-model="oiShipBattery.unitNum" :placeholder="$t('common.inputRemind')" :readonly="formIsDisabled" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('shipBattery.mfrsName')">
            <el-input v-model="oiShipBattery.mfrsName" :placeholder="$t('common.inputRemind')" :readonly="formIsDisabled" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('shipBattery.productDate')">
            <el-input v-model="oiShipBattery.productDate" :placeholder="$t('common.inputRemind')" :readonly="formIsDisabled" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('ship.equipmentXh')">
            <el-input v-model="oiShipBattery.xh" :placeholder="$t('common.inputRemind')" :readonly="formIsDisabled" />
          </el-form-item>
        </el-col>
        <!--<el-col :span="12">-->
        <!--<el-form-item :label="$t('shipBattery.data_source')">-->
        <!--<el-input v-model="temp.DATA_SOURCE" :placeholder="$t('common.inputRemind')" />-->
        <!--</el-form-item>-->
        <!--</el-col>-->
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item :label="$t('shipBattery.memo')">
            <el-input v-model="oiShipBattery.memo" :placeholder="$t('common.inputRemind')" :readonly="formIsDisabled" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { getQueryPage } from '../../../api/requestGet'


export default {
  name: 'Battery',
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
      oiShipBatteryId: '',
      formIsDisabled: false,
      oiShipBatteryIds: [],
      oiShipBattery: {
        id: '',
        shipId: '',
        cellModel: '',
        cellParam: '',
        voltage: '',
        capacity: '',
        weight: '',
        batteryModel: '',
        serialNo: '',
        unitNum: '',
        mfrsName: '',
        productDate: '',
        xh: '',
        memo: ''
      }
    }
  },
  watch:{
    oiShipBatteryIds(val) {
      if(val.length) {
        this.oiShipBatteryId = val[0].id
        console.log(10212121212)
        this.xhSelectChange()
      }
    }
  },
  methods: {
    xhSelectChange() {
      getQueryPage('/shipManager/getOiShipBattery', { oiShipBatteryId: this.oiShipBatteryId }).then(response => {
        this.oiShipBattery = response.data.data
      })
    },
    resetTemp() {
      this.oiShipBatteryId = ''
       this.oiShipBattery = {
        id: '',
        shipId: '',
        cellModel: '',
        cellParam: '',
        voltage: '',
        capacity: '',
        weight: '',
        batteryModel: '',
        serialNo: '',
        unitNum: '',
        mfrsName: '',
        productDate: '',
        xh: '',
        memo: ''
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
        this.$refs['batteryForm'].clearValidate()
      })
    },
    EditRowData(row) {
      const rowdata = Object.assign({}, row)
      this.oiShipBattery = rowdata.battery[1]
      this.$nextTick(() => {
        this.$refs['batteryForm'].clearValidate()
      })
    }
  }
}
</script>
