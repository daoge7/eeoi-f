<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select
        v-model="oiShipTurbineId"
        class="filter-item"
        :placeholder="$t('common.selectRemind')"
        style="width:100px"
        value="1"
        @change="xhSelectChange"
      >
        <el-option v-for="item in oiShipTurbineIds" :key="item.id" :label="item.xh" :value="item.id" />
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
    <el-form
      ref="shipGasTurbinesForm"
      :rules="oiShipTurbineRules"
      :model="oiShipTurbine"
      label-width="100px"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('ship.type')" prop="engineType">
            <el-input v-model="oiShipTurbine.engineType" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('ship.ratedPower')" prop="ratePower">
            <el-input v-model="oiShipTurbine.ratePower"   type="number" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled">
              <i slot="suffix" style="color:red">Kw</i>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('ship.oilType')">
            <el-select
              v-model="oiShipTurbine.energyid"
              class="filter-item"
              :placeholder="$t('common.selectRemind')"
              style="width:100%"
            >
              <el-option v-for="item in oilTypeOptions" :key="item" :label="item" :value="item" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('ship.equipmentXh')" prop="xh">
            <el-input v-model="oiShipTurbine.xh" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('ship.deviceSerial')" prop="serialNo">
            <el-input v-model="oiShipTurbine.serialNo" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item :label="$t('ship.fuelId')" prop="fuelIds">
         <el-button type="primary" @click="shipTypes" :disabled="this.formIsDisabled">{{ $t('common.select') }}</el-button>
         <div v-if="oiShipTurbine.shipEquipmentFuelMaps.length" style="width:100%;height:auto;border:1px #ccc solid;margin-top:10px;padding:0 15px;">
          <el-row>
            <el-col :span="12" v-for="(item, index) in oiShipTurbine.shipEquipmentFuelMaps" :key="index">
              <span>{{ $t('ship.fuel') }}:{{ item.fuelName }}</span>
              <span v-if="item.consMethod === '1'">{{ $t('ship.method1') }}</span>
              <span v-if="item.consMethod === '2'">{{ $t('ship.method2') }}</span>
              <span v-if="item.consMethod === '3'">{{ $t('ship.method3') }}</span>
            </el-col>
          </el-row>
         </div>
      </el-form-item>
    </el-form>
    <shipType v-if="shipComPanyNamevicode" :shipComPanyNamevicode="shipComPanyNamevicode" :listData="oiShipTurbine.shipEquipmentFuelMaps" @shipComPanyNameDatas="shipComPanyNameDatas" @shipComPanyNameData="shipComPanyNameData"/>
  </div>
</template>

<script>
import shipType from './shipType-dalog'
import { getQueryPage } from '../../../api/requestGet'
import indexs from '@/mixin'
export default {
  name: 'ShipGasTurbines',
  components: {shipType},
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
      default: () => {
      }
    }
  },
  data() {
    return {
      shipComPanyNamevicode: false,
      consMethodArray:[
        {
          value: '1',
          label: '使用燃油交付单的方法'
        }, {
          value: '2',
          label: '使用流量计的方法'
        }, {
          value: '3',
          label: '使用燃油舱柜监测的方法'
        }
      ],
      oiShipTurbineId: '',
      formIsDisabled: false,
      oiShipTurbineIds: [],
      oilTypeOptions: ['柴油', '汽油', '轻燃油', '重燃油'],
      oiShipTurbine: {
        id: '',
        shipId: '',
        engineType: '',
        ratePower: '',
        energyid: '',
        xh: '',
        fuelIds: [],
        serialNo: '',
        shipEquipmentFuelMaps: []
      },
      oiShipTurbineRules: {
        engineType: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
        ratePower: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
        xh: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
        serialNo: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
      }
    }
  },
  watch:{
    oiShipTurbineIds(val) {
      if(val.length) {
        this.oiShipTurbineId = val[0].id
        this.xhSelectChange()
      }
    }
  },
  methods: {
    shipTypes() {
      this.shipComPanyNamevicode = true
    },
    shipComPanyNameData() {
      this.shipComPanyNamevicode = false
    },
    shipComPanyNameDatas(val) {
      this.oiShipTurbine.shipEquipmentFuelMaps = val
      this.shipComPanyNamevicode = false
    },
    resetTemp() {
     this.oiShipTurbineId = ''
      this.oiShipTurbine = {
        id: '',
        shipId: '',
        engineType: '',
        ratePower: '',
        energyid: '',
        xh: '',
        fuelIds: [],
        serialNo:'',
        shipEquipmentFuelMaps: []
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
        this.$refs['shipGasTurbinesForm'].clearValidate()
      })
    },
    EditRowData(row) {
      const rowdata = Object.assign({}, row)
      this.temp = rowdata.shipGasTurbines[1]
      this.$nextTick(() => {
        this.$refs['shipGasTurbinesForm'].clearValidate()
      })
    },
    xhSelectChange() {
      getQueryPage('/shipManager/getShipTurbine', { turbineId: this.oiShipTurbineId }).then(response => {
        this.oiShipTurbine = response.data.data
        this.oiShipTurbine.fuelIds.length = 0
        for (const item of this.oiShipTurbine.shipEquipmentFuelMaps) {
          this.oiShipTurbine.fuelIds.push(item.fuelId)
        }
      })
    }
  },
  mixins:[indexs]
}
</script>
