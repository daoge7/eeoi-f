<template>
  <el-form ref="oilForm" :rules="oilRules" :model="oilForm">
    <el-table :data="oilFormData" stripe border style="width: 100%" size="mini">
      <el-table-column :label="$t('voyageOil.oilType')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.oilName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('voyageOil.arrOilTons')" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.arrTons" class="el_input" :maxlength="10" type="number" oninput="if(isNaN(value)) { value = parseFloat(value) } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+4)}" :readonly="readOnly" />
        </template>
      </el-table-column>
      <el-table-column :label="$t('voyageOil.deptOilTons')" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.deptTons" class="el_input" :readonly="readOnly" type="number" oninput="if(isNaN(value)) { value = parseFloat(value) } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+4)}" />
        </template>
      </el-table-column>
      <el-table-column :label="$t('voyageOil.addOil')" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.addTons" class="el_input" disabled />
        </template>
      </el-table-column>
      <el-table-column :label="$t('voyageOil.outOil')" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.outTons" class="el_input" disabled />
        </template>
      </el-table-column>
      <el-table-column :label="$t('voyagePort.Correctionquantity')" type="number" oninput="if(isNaN(value)) { value = parseFloat(value) } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+4)}" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.correctTons" class="el_input" type="number" :readonly="readOnly" />
        </template>
      </el-table-column>
      <el-table-column :label="$t('MRV.Fuel')" align="center">
        <template slot-scope="{row}">
          <el-input :value="(Number(row.arrTons) - Number(row.deptTons)+ Number(row.addTons) - Number(row.outTons) + Number(row.correctTons)).toFixed(1)" class="el_input" :readonly="readOnly" />
        </template>
      </el-table-column>
    </el-table>
  </el-form>
</template>

<script>
import { getFuelType, savemanuinfor } from '../../../api/requestGet'

export default {
  name: 'OilTons',
  props: {
    times: {
    },
    timeEnd: {},
    editStatus: {
      type: String,
      default: ''
    },
    portEditRowId: {
      type: String,
      default: ''
    },
    stabel: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      pickerOptionsEndportTemp: {
        disabledDate: time => {
          const val = this.times
          const vas = this.timeEnd
          if (val && vas) {
            return time.getTime() < new Date(val).getTime() - 8.64e7 || time.getTime() > new Date(vas).getTime()// 如果没有后面的-8.64e6就是不可以选择今天的
          }
        }
      },
      shipId: '',
      oilTons: [],
      readOnly: false,
      oilFormData: [
      ],
      tempOilFormdata: [],
      oilRules: {
      },
      oilForm: {}
    }
  },
  watch: {
    shipId(val) {
      if (val) {
        this.getFuelList(val)
      } else {
        this.initsave()
      }
    }
  },
  created() {
    this.oilFormData = []
    this.tempOilFormdata = []
  },
  methods: {
    initsave() {
      const oilFormDatas = []
      const tempOilFormdatas = []
      savemanuinfor().then(res => {
        for (const item of res.data.data.items) {
          var fuelOil = {
            id: '',
            oilId: '',
            oilName: '',
            arrTons: 0,
            deptTons: 0,
            addTons: 0,
            addBillNo: '',
            addTm: null,
            outTons: 0,
            outTm: null,
            correctTons: 0,
            consTons: 0
          }
          var fuelOild = {
            id: '',
            oilId: '',
            oilName: '',
            arrTons: 0,
            deptTons: 0,
            addTons: 0,
            addBillNo: '',
            addTm: null,
            outTons: 0,
            outTm: null,
            correctTons: 0,
            consTons: 0
          }
          fuelOil.id = item.id
          fuelOil.oilId = item.fuelCode
          fuelOil.oilName = item.fuelName
          fuelOild.id = item.id
          fuelOild.oilId = item.fuelCode
          fuelOild.oilName = item.fuelName
          oilFormDatas.push(fuelOil)
          tempOilFormdatas.push(fuelOild)
        }
        this.oilFormData = oilFormDatas
        this.tempOilFormdata = tempOilFormdatas
        if (this.oilTons.length > 0) {
          const addsData = []
          const oilId = this.oilTons.map(item => item.oilId)
          const add = this.oilFormData.filter(item => !oilId.some(ele => ele === item.oilId))
          this.oilFormData = add.concat(this.oilTons)
        }
      })
    },
    initDat() {
      this.oilFormData.length = 0
      this.tempOilFormdata.length = 0
    },
    getFuelList(shipId) {
      getFuelType(shipId).then(response => {
        if (response.data.data.length == 0) {
          this.initsave()
        } else {
          const oilFormDatas = []
          const tempOilFormdatas = []
          response.data.data.forEach(item => {
            var fuelOil = {
              id: '',
              oilId: '',
              oilName: '',
              arrTons: 0,
              deptTons: 0,
              addTons: 0,
              addBillNo: '',
              addTm: null,
              outTons: 0,
              outTm: null,
              consTons: 0
            }
            var fuelOild = {
              id: '',
              oilId: '',
              oilName: '',
              arrTons: 0,
              deptTons: 0,
              addTons: 0,
              addBillNo: '',
              addTm: null,
              outTons: 0,
              outTm: null,
              consTons: 0
            }
            fuelOil.consTons = item.consTons
            fuelOil.id = item.id
            fuelOil.oilId = item.fuelCode
            fuelOil.oilName = item.fuelName
            fuelOild.id = item.id
            fuelOild.oilId = item.fuelCode
            fuelOild.oilName = item.fuelName
            fuelOild.consTons = item.consTons
            oilFormDatas.push(fuelOil)
            tempOilFormdatas.push(fuelOild)
          })
          this.oilFormData = oilFormDatas
          this.tempOilFormdata = tempOilFormdatas
          if (this.oilTons.length > 0) {
            const addsData = []
            const oilId = this.oilTons.map(item => item.oilId)
            const add = this.oilFormData.filter(item => !oilId.some(ele => ele === item.oilId))
            this.oilFormData = add.concat(this.oilTons)
          }
        }
      })
    }
  }
}
</script>
<style  >
  .el_input input{
    padding: 2px;
  }
</style>
