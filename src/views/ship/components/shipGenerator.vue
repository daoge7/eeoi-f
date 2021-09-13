<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select
        v-model="oiShipGeneratorId"
        class="filter-item"
        :placeholder="$t('common.selectRemind')"
        style="width:100px"
        value="1"
        @change="xhSelectChange"
      >
        <el-option v-for="item in oiShipGeneratorIds" :key="item.id" :label="item.xh" :value="item.id" />
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
      ref="shipGeneratorForm"
      :rules="oiShipGeneratorRules"
      :model="oiShipGenerator"
      label-width="100px"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('ship.type')" prop="engineType">
            <el-input v-model="oiShipGenerator.engineType" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled" />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item :label="$t('ship.isShaftGen')" label-width="140px">
            <el-radio-group v-model="oiShipGenerator.axisstatus">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item :label="$t('ship.equipmentXh')" prop="xh">
            <el-input v-model="oiShipGenerator.xh" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('ship.ratedPower')" prop="ratePower">
            <el-input v-model="oiShipGenerator.ratePower"  type="number" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled">
              <i slot="suffix" style="color:red">Kw</i>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('ship.rateadVoltage')" prop="rateVoltage">
            <el-input v-model="oiShipGenerator.rateVoltage" type="number" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled">
              <i slot="suffix" style="color:red">Volta</i>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('ship.source')">
            <el-input v-model="oiShipGenerator.mfrsName" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('ship.produceTime')">
            <el-date-picker
              v-model="oiShipGenerator.produceTime"
              :editable="true"
              size="small"
              type="year"
              align="left"
              :placeholder="$t('common.dataYearRemind')"
              style="width:100%"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item :label="$t('ship.fuelId')" prop="fuelIds">
         <el-button type="primary" @click="shipTypes" :disabled="this.formIsDisabled">{{ $t('common.select') }}</el-button>
         <div v-if="oiShipGenerator.shipEquipmentFuelMaps.length" style="width:100%;height:auto;border:1px #ccc solid;margin-top:10px;padding:0 15px;">
          <el-row>
            <el-col :span="12" v-for="(item, index) in oiShipGenerator.shipEquipmentFuelMaps" :key="index">
             <span>{{ $t('ship.fuel') }}:{{ item.fuelName }}</span>
              <span v-if="item.consMethod === '1'">{{ $t('ship.method1') }}</span>
              <span v-if="item.consMethod === '2'">{{ $t('ship.method2') }}</span>
              <span v-if="item.consMethod === '3'">{{ $t('ship.method3') }}</span>
            </el-col>
          </el-row>
         </div>
      </el-form-item>
    </el-form>
    <shipType v-if="shipComPanyNamevicode" :shipComPanyNamevicode="shipComPanyNamevicode" :listData="oiShipGenerator.shipEquipmentFuelMaps" @shipComPanyNameDatas="shipComPanyNameDatas" @shipComPanyNameData="shipComPanyNameData"/>
  </div>
</template>

<script>
import { getQueryPage } from '../../../api/requestGet'
import indexs from '@/mixin'
import shipType from './shipType-dalog'
export default {
  name: 'ShipGenerator',
  components:{shipType},
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
      oiShipGeneratorId: '',
      formIsDisabled: false,
      oiShipGeneratorIds: [],
      oiShipGenerator: {
        id: '',
        shipId: '',
        engineType: '',
        ratePower: '',
        rateVoltage: '',
        mfrsName: '',
        axisstatus: '',
        produceTime: '',
        xh: '',
        fuelIds: [],
        shipEquipmentFuelMaps: [],
      },
      oiShipGeneratorRules: {
        engineType: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
        ratePower: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
        rateVoltage: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
        xh: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }]
      }
    }
  },
   watch:{
    oiShipGeneratorIds(val) {
      if(val.length) {
        this.oiShipGeneratorId = val[0].id
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
      this.oiShipGenerator.shipEquipmentFuelMaps = val
      this.shipComPanyNamevicode = false
    },
    resetTemp() {
      this.oiShipGeneratorId = ''
      this.oiShipGenerator = {
        id: '',
        shipId: '',
        engineType: '',
        ratePower: '',
        rateVoltage: '',
        mfrsName: '',
        axisstatus: '',
        produceTime: '',
        xh: '',
        fuelIds: [],
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
        this.$refs['shipGeneratorForm'].clearValidate()
      })
    },
    EditRowData(row) {
      const rowdata = Object.assign({}, row)
      this.oiShipGenerator = rowdata.shipGenerator[1]
      this.$nextTick(() => {
        this.$refs['shipGeneratorForm'].clearValidate()
      })
    },
    xhSelectChange() {
      getQueryPage('/shipManager/getshipGenerator', { shipGeneratorId: this.oiShipGeneratorId }).then(response => {
        this.oiShipGenerator = response.data.data
        this.oiShipGenerator.fuelIds.length = 0
        for (const item of this.oiShipGenerator.shipEquipmentFuelMaps) {
          this.oiShipGenerator.fuelIds.push(item.fuelId)
        }
      })
    }
  },
  mixins:[indexs]
}
</script>
