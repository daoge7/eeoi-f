<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select
        v-model="oiShipGeId"
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
      :disabled="formIsDisabled"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('ship.type')" prop="gemodel">
            <el-input v-model="oiShipGe.gemodel" :placeholder="$t('common.inputRemind')" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('ship.ratedPower')" prop="ratePower">
            <el-input v-model="oiShipGe.ratePower" type="number" :placeholder="$t('common.inputRemind')">
              <i slot="suffix" style="color:red">Kw</i>
            </el-input>

          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('ship.ratedSpeed')">
            <el-input v-model="oiShipGe.ratedSpeed" type="number" :placeholder="$t('common.inputRemind')">
              <i slot="suffix" style="color:red">Rpm</i>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('ship.consumpRate')" prop="consumpRate">
            <el-input v-model="oiShipGe.consumpRate" type="number" :placeholder="$t('common.inputRemind')">
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
            <el-input v-model="oiShipGe.xh" :placeholder="$t('common.inputRemind')" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('ship.source')">
            <el-input v-model="oiShipGe.manufacturer" :placeholder="$t('common.inputRemind')" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('ship.produceTime')">
            <el-date-picker
              v-model="oiShipGe.dateManufacturer"
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
import {mapState} from "vuex"
export default {
  name: 'SsmisShipPM',
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
      oiShipGes: [],
      engineIds: [],
      oiShipGeId: '',
      formIsDisabled: false,
      oiShipGeIds: [],
      oiShipGe: {
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
        dateManufacturer: '',
        manufacturer: '',
        gemodel: '',
        setno: '',
        serialno: ''
      }
      // oiShipGeRules: {
      //   engineType: [{required: true, message: this.$t('common.inputRequired'), trigger: 'blur'}],
      //   ratePower: [{required: true, message: this.$t('common.inputRequired'), trigger: 'blur'}],
      //   consumpRate: [{required: true, message: this.$t('common.inputRequired'), trigger: 'blur'}],
      //   energyId: [{required: true, message: this.$t('common.inputRequired'), trigger: 'change'}],
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
      this.oiShipGe = {
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
      this.oiShipGe = this.oiShipGes[this.oiShipGeId - 1]
      this.oiShipGe.xh = this.oiShipGeId
    },
    checkboxChange() {
      if (this.engineIds.length > 0) {
        this.oiShipGe.energyId = this.engineIds[0]
      } else {
        this.oiShipGe.energyId = ''
      }
    }
  },
  computed: {
    ...mapState('zidainma', ['situations'])
  }
}
</script>
