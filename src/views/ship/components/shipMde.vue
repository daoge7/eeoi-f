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
        <el-option
          v-for="item in oiMainEngineIds"
          :key="item.id"
          :label="item.xh"
          :value="item.id"
        />
      </el-select>
    </div>
    <el-form
      ref="oiMainEngineForm"
      :rules="oiMainEngineRules"
      :model="oiMainEngine"
      label-width="100px"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('ship.type')" prop="engineType">
            <el-input
              v-model="oiMainEngine.engineType"
              :placeholder="$t('common.inputRemind')"
              :readonly="this.formIsDisabled"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('ship.ratedPower')" prop="ratePower">
            <el-input
              type="number"
              v-model="oiMainEngine.ratePower"
              :placeholder="$t('common.inputRemind')"
              :readonly="this.formIsDisabled"
            >
              <i slot="suffix" style="color:red">Kw</i>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('ship.ratedSpeed')">
            <el-input
              v-model="oiMainEngine.ratedSpeed"
              type="number"
              :placeholder="$t('common.inputRemind')"
              :readonly="this.formIsDisabled"
            >
              <i slot="suffix" style="color:red">Rpm</i>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('ship.consumpRate')" prop="consumpRate">
            <el-input
              v-model="oiMainEngine.consumpRate"
              type="number"
              :placeholder="$t('common.inputRemind')"
              :readonly="this.formIsDisabled"
            >
              <i slot="suffix" style="color:red">g/(kW·h)</i>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('ship.energyId')" prop="energyId">
            <el-checkbox-group v-model="engineIds" @change="checkboxChange">
              <el-checkbox v-for="(item,ind) in situations" :key="ind" :label="item.formCode">{{item.formName}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('ship.equipmentXh')" prop="xh">
            <el-input
              v-model="oiMainEngine.xh"
              :placeholder="$t('common.inputRemind')"
              :readonly="this.formIsDisabled"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('ship.deviceSerial')" prop="serialNo">
            <el-input
              v-model="oiMainEngine.serialNo"
              :placeholder="$t('common.inputRemind')"
              :readonly="this.formIsDisabled"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('ship.source')">
            <el-input
              v-model="oiMainEngine.mfrsName"
              :placeholder="$t('common.inputRemind')"
              :readonly="this.formIsDisabled"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('ship.produceTime')">
            <el-date-picker
              v-model="oiMainEngine.produceTime"
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
         <div v-if="oiMainEngine.shipEquipmentFuelMaps.length" style="width:100%;height:auto;border:1px #ccc solid;margin-top:10px;padding:0 15px;">
          <el-row>
            <el-col :span="24" v-for="(item, index) in oiMainEngine.shipEquipmentFuelMaps" :key="index">
              <span>{{ $t('ship.fuel') }}:{{ item.fuelName }}</span>
              <span v-if="item.consMethod === '1'">{{ $t('ship.method1') }}</span>
              <span v-if="item.consMethod === '2'">{{ $t('ship.method2') }}</span>
              <span v-if="item.consMethod === '3'">{{ $t('ship.method3') }}</span>
            </el-col>
          </el-row>
         </div>
      </el-form-item>
    </el-form>
    <shipType v-if="shipComPanyNamevicode" :shipComPanyNamevicode="shipComPanyNamevicode" :listData="oiMainEngine.shipEquipmentFuelMaps" @shipComPanyNameDatas="shipComPanyNameDatas" @shipComPanyNameData="shipComPanyNameData"/>
  </div>
</template>

<script>
import { getQueryPage } from '../../../api/requestGet'
import shipType from './shipType-dalog'
import indexs from '@/mixin'
export default {
  name: 'ShipMde',
  components:{shipType},
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
      default: () => {}
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
      oiMainEngineId: '',
      oiMainEngineXh: '',
      formIsDisabled: false,
      oiMainEngineIds: [],
      oiMainEngine: {
        id: '',
        shipId: '',
        engineType: '',
        ratePower: '',
        ratedSpeed: '',
        consumpRate: '',
        energyId: '',
        mfrsName: '',
        produceTime: '',
        xh: '',
        fuelIds: [],
        shipEquipmentFuelMaps: [],
        serialNo: ''
      },
      oiMainEngineRules: {
        engineType: [
          {
            required: true,
            message: this.$t('common.inputRequired'),
            trigger: 'blur'
          }
        ],
        ratePower: [
          {
            required: true,
            message: this.$t('common.inputRequired'),
            trigger: 'blur'
          }
        ],
        consumpRate: [
          {
            required: true,
            message: this.$t('common.inputRequired'),
            trigger: 'blur'
          }
        ],
        energyId: [
          {
            required: true,
            message: this.$t('common.inputRequired'),
            trigger: 'blur'
          }
        ],
        xh: [
          {
            required: true,
            message: this.$t('common.inputRequired'),
            trigger: 'blur'
          }
        ],
        serialNo: [
          {
            required: true,
            message: this.$t('common.inputRequired'),
            trigger: 'blur'
          }
        ]
      }
    }
  },
  watch:{
    oiMainEngineIds(val) {
      if(val.length) {
        this.oiMainEngineId = val[0].id
        this.oiMainEngineXh = val[0].xh || val[0].id
        this.initData()
      } else {
        this.oiMainEngineXh = ''
      }

    }
  },
  created() {
  },
  methods: {
    shipTypes() {
      this.shipComPanyNamevicode = true
    },
    shipComPanyNameData() {
      this.shipComPanyNamevicode = false
    },
    shipComPanyNameDatas(val) {
      this.oiMainEngine.shipEquipmentFuelMaps = val
      this.shipComPanyNamevicode = false
    },
    initData() {
       getQueryPage('/shipManager/getShipMainEngine', {
        id: this.oiMainEngineId
      }).then(response => {
        this.oiMainEngine = response.data.data
        this.engineIds = this.getEngineIds(response.data.data.energyId)
        this.oiMainEngine.fuelIds.length = 0
        for (const item of this.oiMainEngine.shipEquipmentFuelMaps) {
          this.oiMainEngine.fuelIds.push(item.fuelId)
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
      this.engineIds = []
      this.oiMainEngineXh = ''
      this.oiMainEngine = {
        id: '',
        shipId: '',
        engineType: '',
        ratePower: '',
        ratedSpeed: '',
        consumpRate: '',
        energyId: '',
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
        this.$refs['oiMainEngineForm'].clearValidate()
      })
    },
    EditRowData(row) {
      const rowdata = Object.assign({}, row)
      this.oiMainEngine = rowdata.shipMde[0]
      this.$nextTick(() => {
        this.$refs['oiMainEngineForm'].clearValidate()
      })
    },
    xhSelectChange() {
      this.oiMainEngineId = this.oiMainEngineXh
      this.initData()
    },
    checkboxChange() {
      if (this.engineIds.length > 0) {
        this.oiMainEngine.energyId = this.engineIds[0]
      } else {
        this.oiMainEngine.energyId = ''
      }
    }
  }
}
</script>

