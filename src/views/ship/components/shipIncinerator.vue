<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select
        v-model="oiShipIncineratorId"
        class="filter-item"
        :placeholder="$t('common.selectRemind')"
        style="width:100px"
        value="1"
        @change="xhSelectChange"
      >
        <el-option v-for="item in oiShipIncineratorIds" :key="item.id" :label="item.xh" :value="item.id" />
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
    <el-form ref="OiShipIncineratorForm" :rules="shipIncineratorRules" :model="oiShipIncinerator" label-width="100px">
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('ship.type')" prop="model">
            <el-input v-model="oiShipIncinerator.model" :placeholder="$t('common.inputRemind')" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('ship.source')">
            <el-input v-model="oiShipIncinerator.mfrsName" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('ship.produceTime')">
            <el-date-picker
              v-model="oiShipIncinerator.produceTime"
              :editable="true"
              type="year"
              size="small"
              align="left"
              :placeholder="$t('common.dataYearRemind')"
              style="width:100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('ship.equipmentXh')" prop="xh">
            <el-input v-model="oiShipIncinerator.xh" :placeholder="$t('common.inputRemind')" :readonly="this.formIsDisabled" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item :label="$t('ship.energyId')" prop="energyId">
        <el-checkbox-group v-model="engineIds" @change="checkboxChange">
          <el-checkbox v-for="(item,ind) in situations" :key="ind" :label="item.formCode">{{item.formName}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item :label="$t('ship.fuelId')" prop="fuelIds">
        <el-button type="primary" @click="shipTypes" :disabled="this.formIsDisabled">{{ $t('common.select') }}</el-button>
         <div v-if="oiShipIncinerator.shipEquipmentFuelMaps.length" style="width:100%;height:auto;border:1px #ccc solid;margin-top:10px;padding:0 15px;">
          <el-row>
            <el-col :span="12" v-for="(item, index) in oiShipIncinerator.shipEquipmentFuelMaps" :key="index">
              <span>{{ $t('ship.fuel') }}:{{ item.fuelName }}</span>
              <span v-if="item.consMethod === '1'">{{ $t('ship.method1') }}</span>
              <span v-if="item.consMethod === '2'">{{ $t('ship.method2') }}</span>
              <span v-if="item.consMethod === '3'">{{ $t('ship.method3') }}</span>
            </el-col>
          </el-row>
         </div>
      </el-form-item>
      <shipType v-if="shipComPanyNamevicode" :shipComPanyNamevicode="shipComPanyNamevicode" :listData="oiShipIncinerator.shipEquipmentFuelMaps" @shipComPanyNameDatas="shipComPanyNameDatas" @shipComPanyNameData="shipComPanyNameData"/>
    </el-form>
  </div>
</template>

<script>
import { getQueryPage } from '../../../api/requestGet'
import shipType from './shipType-dalog'
import indexs from '@/mixin'
export default {
  name: 'ShipIncinerator',
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
      oiShipIncineratorId: '',
      formIsDisabled: false,
      oiShipIncineratorIds: [],
      oiShipIncinerator: {
        id: '',
        shipId: '',
        model: '',
        energyId: '',
        mfrsName: '',
        produceTime: '',
        xh: '',
        fuelIds: [],
        shipEquipmentFuelMaps: []
      },
      shipIncineratorRules: {
        model: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
        energyId: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
        xh: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }]
      }
    }
  },
  watch:{
    oiShipIncineratorIds(val) {
      if(val.length) {
        this.oiShipIncineratorId = val[0].id
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
      this.oiShipIncinerator.shipEquipmentFuelMaps = val
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
      this.oiShipIncineratorId = ''
      this.oiShipIncinerator = {
        id: '',
        shipId: '',
        model: '',
        energyId: '',
        mfrsName: '',
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
        this.$refs['OiShipIncineratorForm'].clearValidate()
      })
    },
    EditRowData(row) {
      const rowdata = Object.assign({}, row)
      this.oiShipIncinerator = rowdata.shipIncinerator[1]
      this.$nextTick(() => {
        this.$refs['OiShipIncineratorForm'].clearValidate()
      })
    },
    xhSelectChange() {
      getQueryPage('/shipManager/getShipIncinerator', { shipIncineratorId: this.oiShipIncineratorId }).then(response => {
        this.oiShipIncinerator = response.data.data
        this.engineIds = this.getEngineIds(response.data.data.energyId)
        this.oiShipIncinerator.fuelIds.length = 0
        for (const item of this.oiShipIncinerator.shipEquipmentFuelMaps) {
          this.oiShipIncinerator.fuelIds.push(item.fuelId)
        }
      })
    },
    checkboxChange() {
      if (this.engineIds.length > 0) {
        this.oiShipIncinerator.energyId = this.engineIds[0]
      } else {
        this.oiShipIncinerator.energyId = ''
      }
    }
  },
  mixins:[indexs]
}
</script>
