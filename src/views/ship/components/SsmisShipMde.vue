<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select
        v-model="oiMainEngineId"
        class="filter-item"
        :placeholder="$t('common.selectRemind')"
        style="width:100px"
        value="1"
        @change="xhSelectChange"
      >
        <el-option v-for="item in oiMainEngineIds" :key="item.id" :label="item.xh" :value="item.id" />
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
      ref="oiMainEngineForm"
      :rules="oiMainEngineRules"
      :model="oiMainEngine"
      label-width="100px"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('ship.type')" prop="enginetype">
            <el-input v-model="oiMainEngine.enginetype" :placeholder="$t('common.inputRemind')" :readonly="formIsDisabled" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('ship.ratedPower')" prop="ratePower">
            <el-input v-model="oiMainEngine.ratePower"  type="number" :placeholder="$t('common.inputRemind')" :readonly="formIsDisabled">
              <i slot="suffix" style="color:red">Kw</i>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('ship.ratedSpeed')">
            <el-input v-model="oiMainEngine.ratedSpeed"  type="number" :placeholder="$t('common.inputRemind')" :readonly="formIsDisabled">
              <i slot="suffix" style="color:red">Rpm</i>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('ship.consumpRate')" prop="consumpRate">
            <el-input v-model="oiMainEngine.consumpRate"  type="number" :placeholder="$t('common.inputRemind')" :readonly="formIsDisabled">
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
        <el-col :span="12">
          <el-form-item :label="$t('ship.equipmentXh')" prop="xh">
            <el-input v-model="oiMainEngine.xh" :placeholder="$t('common.inputRemind')" :readonly="formIsDisabled" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('ship.source')">
            <el-input v-model="oiMainEngine.manufacturer" :placeholder="$t('common.inputRemind')" :readonly="formIsDisabled" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('ship.produceTime')">
            <el-date-picker
              v-model="oiMainEngine.dateManufacturer"
              :editable="true"
              type="year"
              size="small"
              :placeholder="$t('common.dataYearRemind')"
              style="width:100%"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  name: 'SsmisShipMde',
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
      oiMainEngines: [],
      engineIds: [],
      oiMainEngineId: '',
      formIsDisabled: false,
      oiMainEngineIds: [],
      oiMainEngine: {
        id: undefined,
        shipId: '',
        engineType: '',
        ratePower: '',
        ratedSpeed: '',
        consumpRate: '',
        energyId: '',
        mfrsName: '',
        produceTime: '',
        xh: '',
        enginetype: '',
        manufacturer: '',
        dateManufacturer: ''
      }
      // oiMainEngineRules: {
      //   engineType: [{required: true, message: this.$t('common.inputRequired'), trigger: 'blur'}],
      //   ratePower: [{required: true, message: this.$t('common.inputRequired'), trigger: 'blur'}],
      //   consumpRate: [{required: true, message: this.$t('common.inputRequired'), trigger: 'blur'}],
      //   energyId: [{required: true, message: this.$t('common.inputRequired'), trigger: 'bl'}],
      //   xh: [{required: true, message: this.$t('common.inputRequired'), trigger: 'change'}]
      // }
    }
  },
  methods: {
    getEngineIds(str) {
      var attr = []
      if (str !== '') {
        attr = str.split(',')
      }
      return attr
    },
    resetTemp() {
      this.engineIds = []
      this.oiMainEngine = {
        id: undefined,
        shipId: '',
        engineType: '',
        ratePower: '',
        ratedSpeed: '',
        consumpRate: '',
        energyId: '',
        mfrsName: '',
        produceTime: '',
        xh: ''
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
      this.oiMainEngine = this.oiMainEngines[this.oiMainEngineId - 1]
      this.oiMainEngine.xh = this.oiMainEngineId
    },
    checkboxChange() {
      if (this.engineIds.length > 0) {
        this.oiMainEngine.energyId = this.engineIds[0]
      } else {
        this.oiMainEngine.energyId = ''
      }
    }
  },
  computed: {
    ...mapState("zidainma",["situations"])
  }
}
</script>
