<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select
        v-model="oiShipInertId"
        class="filter-item"
        :placeholder="$t('common.selectRemind')"
        style="width:100px"
        value="1"
        @change="xhSelectChange"
      >
        <el-option v-for="item in oiShipInertIds" :key="item.id" :label="item.xh" :value="item.id" />
      </el-select>
      <!--<el-button class="filter-item" style="margin-left: 10px;" size="mini" type="primary" icon="el-icon-plus">-->
      <!--{{ $t('common.add') }}-->
      <!--</el-button>-->
      <!--<el-button class="filter-item" type="primary" size="mini" icon="el-icon-edit" style="margin-left: 10px;">-->
      <!--{{ $t('common.add') }}-->
      <!--</el-button>-->
      <!--<el-button class="filter-item" type="danger" size="mini" icon="el-icon-delete" style="margin-left: 10px;">-->
      <!--{{ $t('common.add') }}-->
      <!--</el-button>-->
    </div>
    <el-form
      ref="shipInertForm"
      :rules="shipInertRules"
      :model="oiShipInert"
      label-width="100px"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('ship.type')" prop="inertOiltype">
            <el-input v-model="oiShipInert.inertOiltype" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('ship.ratedPower')">
            <el-input v-model="oiShipInert.power" type="number" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled">
              <i slot="suffix" style="color:red">Kw</i>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('ship.source')">
            <el-input v-model="oiShipInert.mfrsName" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('ship.produceTime')">
            <el-date-picker
              v-model="oiShipInert.produceTime"
              :editable="true"
              type="year"
              size="small"
              align="left"
              :placeholder="$t('common.selectRemind')"
              style="width:100%"
            />
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
        <el-col :span="12">
          <el-form-item :label="$t('ship.equipmentXh')" prop="xh">
            <el-input v-model="oiShipInert.xh" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item :label="$t('ship.fuelId')" prop="fuelIds">
        <el-button type="primary" @click="shipTypes" :disabled="this.formIsDisabled">选择</el-button>
         <div v-if="oiShipInert.shipEquipmentFuelMaps.length" style="width:100%;height:auto;border:1px #ccc solid;margin-top:10px;padding:0 15px;">
          <el-row>
            <el-col :span="12" v-for="(item, index) in oiShipInert.shipEquipmentFuelMaps" :key="index">
              <span>{{ $t('ship.fuel') }}:{{ item.fuelName }}</span>
              <span v-if="item.consMethod === '1'">{{ $t('ship.method1') }}</span>
              <span v-if="item.consMethod === '2'">{{ $t('ship.method2') }}</span>
              <span v-if="item.consMethod === '3'">{{ $t('ship.method3') }}</span>
            </el-col>
          </el-row>
         </div>
      </el-form-item>
    </el-form>
    <shipType v-if="shipComPanyNamevicode" :shipComPanyNamevicode="shipComPanyNamevicode" :listData="oiShipInert.shipEquipmentFuelMaps" @shipComPanyNameDatas="shipComPanyNameDatas" @shipComPanyNameData="shipComPanyNameData"/>
  </div>
</template>

<script>
import { getQueryPage } from '../../../api/requestGet'
import indexs from '@/mixin'
import shipType from './shipType-dalog'
export default {
  name: 'ShipInert',
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
      engineIds: [],
      oiShipInertId: '',
      formIsDisabled: false,
      oiShipInertIds: [],
      oiShipInert: {
        id: '',
        shipId: '',
        inertOiltype: '',
        energyid: '',
        mfrsName: '',
        produceTime: '',
        power: '',
        xh: '',
        fuelIds: [],
        shipEquipmentFuelMaps: [],
      },
      shipInertRules: {
        inertOiltype: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
        energyid: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
        xh: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }]
      }
    }
  },
  watch:{
    oiShipInertIds(val) {
      if(val.length) {
        this.oiShipInertId = val[0].id
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
      this.oiShipInert.shipEquipmentFuelMaps = val
      this.shipComPanyNamevicode = false
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
      this.oiShipInertId = ''
      this.oiShipInert = {
        id: '',
        shipId: '',
        inertOiltype: '',
        energyid: '',
        mfrsName: '',
        produceTime: '',
        power: '',
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
        this.$refs['shipInertForm'].clearValidate()
      })
    },
    EditRowData(row) {
      const rowdata = Object.assign({}, row)
      this.oiShipInert = rowdata.shipInert[1]
      this.$nextTick(() => {
        this.$refs['shipInertForm'].clearValidate()
      })
    },
    xhSelectChange() {
      getQueryPage('/shipManager/getShipInert', { shipInertId: this.oiShipInertId }).then(response => {
        this.oiShipInert = response.data.data
        this.engineIds = this.getEngineIds(response.data.data.energyid)
        this.oiShipInert.fuelIds.length = 0
        for (const item of this.oiShipInert.shipEquipmentFuelMaps) {
          this.oiShipInert.fuelIds.push(item.fuelId)
        }
      })
    },
    checkboxChange() {
      if (this.engineIds.length > 0) {
        this.oiShipInert.energyId = this.engineIds[0]
      } else {
        this.oiShipInert.energyId = ''
      }
    }
  },
  mixins:[indexs]
}
</script>
