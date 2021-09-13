<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select
        v-model="oiMainEngineXh"
        class="filter-item"
        :placeholder="$t('common.selectRemind')"
        style="width:100px"
        value="1"
        @change="xhSelectChange"
      >
        <el-option v-for="item in oiShipGeIds" :key="item.id" :label="item.xh" :value="item.id" />
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
      ref="oiShipGeForm"
      :rules="oiShipGeRules"
      :model="oiShipGe"
      label-width="100px"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('ship.type')" prop="engineType">
            <el-input v-model="oiShipGe.engineType" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('ship.ratedPower')" prop="ratePower">
            <el-input v-model="oiShipGe.ratePower"  type="number"  :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled">
              <i slot="suffix" style="color:red">Kw</i>
            </el-input>

          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('ship.ratedSpeed')">
            <el-input v-model="oiShipGe.ratedSpeed"  type="number"  :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled">
              <i slot="suffix" style="color:red">Rpm</i>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('ship.consumpRate')" prop="consumpRate">
            <el-input v-model="oiShipGe.consumpRate"  type="number"  :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled">
              <i slot="suffix" style="color:red">g/(kW·h)</i>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('ship.energyId')" prop="energyid">
            <el-checkbox-group v-model="engineIds" @change="checkboxChange">
             <el-checkbox v-for="(item,ind) in situations" :key="ind" :label="item.formCode">{{item.formName}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('ship.equipmentXh')" prop="xh">
            <el-input v-model="oiShipGe.xh" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('ship.deviceSerial')" prop="serialNo">
            <el-input v-model="oiShipGe.serialNo" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('ship.source')">
            <el-input v-model="oiShipGe.mfrsName" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('ship.produceTime')">
            <el-date-picker
              v-model="oiShipGe.produceTime"
              :editable="true"
              type="year"
              size="small"
              :placeholder="$t('common.dataYearRemind')"
              style="width:100%"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item :label="$t('ship.fuelId')" prop="fuelIds">
        <el-button type="primary" @click="shipTypes" :disabled="this.formIsDisabled">{{ $t('common.select') }}</el-button>
         <div v-if="oiShipGe.shipEquipmentFuelMaps.length" style="width:100%;height:auto;border:1px #ccc solid;margin-top:10px;padding:0 15px;">
          <el-row>
            <el-col :span="12" v-for="(item, index) in oiShipGe.shipEquipmentFuelMaps" :key="index">
             <span>{{ $t('ship.fuel') }}:{{ item.fuelName }}</span>
              <span v-if="item.consMethod === '1'">{{ $t('ship.method1') }}</span>
              <span v-if="item.consMethod === '2'">{{ $t('ship.method2') }}</span>
              <span v-if="item.consMethod === '3'">{{ $t('ship.method3') }}</span>
            </el-col>
          </el-row>
         </div>
      </el-form-item>
    </el-form>
    <shipType v-if="shipComPanyNamevicode" :shipComPanyNamevicode="shipComPanyNamevicode" :listData="oiShipGe.shipEquipmentFuelMaps" @shipComPanyNameDatas="shipComPanyNameDatas" @shipComPanyNameData="shipComPanyNameData"/>
  </div>
</template>
<script>
import { getQueryPage } from '../../../api/requestGet'
import shipType from './shipType-dalog'
import indexs from '@/mixin'
export default {
  name: 'ShipPM',
  components: {shipType},
  mixins: [indexs],
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
      engineIds: [],
      oiShipGeId: '',
      oiMainEngineXh: '',
      formIsDisabled: false,
      oiShipGeIds: [],
      oiShipGe: {
        id: '',
        shipId: '',
        engineType: '',
        ratePower: '',
        ratedSpeed: '',
        consumpRate: '',
        energyid: '',
        mfrsName: '',
        produceTime: '',
        xh: '',
        fuelIds: [],
        shipEquipmentFuelMaps: [],
        serialNo: ''
      },
      oiShipGeRules: {
        engineType: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
        ratePower: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
        consumpRate: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
        energyid: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
        xh: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
        serialNo: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }]
      }
    }
  },
  watch:{
    oiShipGeIds(val) {
      if(val.length) {
        this.oiShipGeId = val[0].id
        this.oiMainEngineXh = val[0].xh || val[0].id
        this.initData()
      }else {
        this.oiMainEngineXh = ''
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
      this.oiShipGe.shipEquipmentFuelMaps = val
      this.shipComPanyNamevicode = false
    },
    initData() {
       getQueryPage('/shipManager/getShipAuEngine', { id: this.oiShipGeId }).then(response => {
        this.oiShipGe = response.data.data
        this.engineIds = this.getEngineIds(response.data.data.energyid)
        this.oiShipGe.fuelIds.length = 0
        for (const item of this.oiShipGe.shipEquipmentFuelMaps) {
          this.oiShipGe.fuelIds.push(item.fuelId)
        }
      })
    },
    getEngineIds(str) {
      var attr = []
      if (str !== '') {
        attr = str.split(',')
      }
      return attr
    },
    resetTemp() {
      this.engineIds = [],
        this.oiMainEngineXh = ''
      this.oiShipGe = {
        id: '',
        shipId: '',
        engineType: '',
        ratePower: '',
        ratedSpeed: '',
        consumpRate: '',
        energyid: '',
        mfrsName: '',
        produceTime: '',
        xh: '',
        fuelIds: [],
        shipEquipmentFuelMaps: [],
        serialNo: ''
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
        this.$refs['oiShipGeForm'].clearValidate()
      })
    },
    EditRowData(row) {
      const rowdata = Object.assign({}, row)
      this.oiShipGe = rowdata.shipPM[1]
      this.$nextTick(() => {
        this.$refs['oiShipGeForm'].clearValidate()
      })
    },
    xhSelectChange() {
      this.oiShipGeId = this.oiMainEngineXh
      this.initData()
    },
    checkboxChange() {
      if (this.engineIds.length > 0) {
        this.oiShipGe.energyId = this.engineIds[0]
      } else {
        this.oiShipGe.energyId = ''
      }
    }
  }
}
</script>
