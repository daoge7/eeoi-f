<template>
  <el-form ref="oilForm" :rules="oilRules" :model="oilForm">
    <el-table :data="oilFormData" stripe border style="width: 100%" size="mini">
      <el-table-column :label="$t('voyageOil.oilType')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.oilName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('voyageOil.addOil')" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.addTons" class="el_input" type="number" oninput="if(isNaN(value)) { value = parseFloat(value) } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+4)}" :readonly="readOnly" />
        </template>
      </el-table-column>
      <el-table-column :label="$t('voyageOil.Sulfurcontent')" align="center">
        <template slot-scope="{row}">
          <div style="display:flex;align-items: center;">
            <el-input v-model="row.sulfurPercent" class="el_input" type="number" oninput="if(isNaN(value)) { value = parseFloat(value) } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+4)}" :readonly="readOnly">
              <span slot="suffix" style="color:red">%</span>
            </el-input>
          </div>

        </template>
      </el-table-column>
      <el-table-column :label="$t('voyageOil.viscosity')" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.viscosity" class="el_input" :readonly="readOnly" />
        </template>
      </el-table-column>
      <el-table-column :label="$t('voyageOil.fueloilbrand')" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.isoBrand" class="el_input" :readonly="readOnly" />
        </template>
      </el-table-column>
      <el-table-column :label="$t('voyageOil.FuelingOrderNo')" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.addBillNo" class="el_input" :readonly="readOnly" />
        </template>
      </el-table-column>
      <el-table-column :label="$t('voyageOil.Refuelingtime')" align="center" width="200px">
        <template slot-scope="{row}">
          <el-date-picker
            v-model="row.addTm"
            type="datetime"
            :placeholder="$t('MRV.Selectdatetime')"
            class="el_input"
            style="width:90%"
            :picker-options="pickerOptionsEndportTemp"
            format="yyyy-MM-dd HH:mm"
          />
        </template>
      </el-table-column>
      <el-table-column v-if="!readOnly" :label="$t('common.operate')" align="center" width="180px">
        <template slot-scope="scope">
          <el-button type="primary" @click="addClick(scope.row,scope.$index)">{{ $t('common.add') }}</el-button>
          <el-button type="danger" @click="deleteClick(scope.row,scope.$index)">{{ $t('common.delete') }}</el-button>
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
    timeEnd: {}
  },
  data() {
    return {
      shipId: '',
      Fuelquantity: [],
      readOnly: false,
      oilFormData: [
      ],
      tempOilFormdata: [],
      oilRules: {
      },
      oilForm: {},
      pickerOptionsEndportTemp: {
        disabledDate: time => {
          const val = this.times
          const vas = this.timeEnd
          if (val || vas) {
            return time.getTime() < new Date(val).getTime() - 8.64e7 || time.getTime() > new Date(vas).getTime()// 如果没有后面的-8.64e7就是不可以选择今天的
          }
        }
      }
    }
  },
  watch: {
    oilFormData() {
      this.$emit('fuelquantity', this.oilFormData)
    },
    timeEnd() {

    },
    shipId(val) {
      if (val) {
        console.log(val)
        this.getFuelList(val)
      } else {
        this.initsace()
      }
    }
    // times(val) {
    //   if(val) {
    //     this.times = val
    //   }
    // }
  },
  created() {
  },
  methods: {
    initsace() {
      const list = []
      savemanuinfor().then(res => {
        res.data.data.items.forEach(ele => {
          if (ele.fuelName !== '重燃油HFO(低硫)' && ele.fuelName !== '重燃油HFO(超低硫)' && ele.fuelName !== '轻燃油LFO(低硫)' && ele.fuelName !== '轻燃油LFO(超低硫)' && ele.fuelName !== '重燃油HFO(高硫)' && ele.fuelName !== '轻燃油LFO(高硫)') {
            list.push(ele)
          }
        })
        const obj = {
          carbonConten: '',
          conversion: '',
          createTm: null,
          creator: '',
          fuelCode: '燃油',
          fuelName: '燃油',
          id: '',
          isDelete: '',
          opdate: '',
          opuser: '',
          remark: null,
          viscosity: '',
          sulfurPercent: ''
        }
        list.push(obj)
        const oilFormDatas = []
        const tempOilFormdatas = []
        for (const item of list) {
          var fuelOil = {
            id: '',
            oilId: '',
            oilName: '',
            addTons: 0,
            addBillNo: 0,
            isoBrand: 0,
            addTm: null,
            outTons: 0,
            outTm: null,
            correctTons: 0,
            viscosity: '0',
            sulfurPercent: 0
          }
          fuelOil.id = item.id
          fuelOil.oilId = item.fuelCode
          fuelOil.oilName = item.fuelName
          oilFormDatas.push(fuelOil)
          tempOilFormdatas.push(fuelOil)
        }
        this.oilFormData = oilFormDatas
        this.tempOilFormdata = tempOilFormdatas
        if (this.Fuelquantity.length > 0) {
          const addsData = []
          const oilId = this.Fuelquantity.map(item => item.oilId)
          const add = this.oilFormData.filter(item => !oilId.some(ele => ele === item.oilId))
          this.oilFormData = add.concat(this.Fuelquantity)
        }
      })
    },
    initdast() {
      this.oilFormData = this.Fuelquantity
    },
    initDat() {
      this.oilFormData.length = 0
      this.tempOilFormdata.length = 0
    },
    addClick(row, index) {
      const list = {
        id: row.id,
        oilId: row.oilId,
        oilName: row.oilName,
        addTons: row.addTons,
        addBillNo: row.addBillNo,
        addTm: row.addTm,
        sulfurPercent: row.sulfurPercent,
        isoBrand: row.isoBrand,
        viscosity: row.viscosity
      }
      this.oilFormData.splice(index, 0, list)
    },
    deleteClick(row, index) {
      this.$confirm('此操作将永久删除该油料类型如需想从新添加需要从新选择船舶, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.oilFormData.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    getFuelList(shipId) {
      getFuelType(shipId).then(response => {
        if (response.data.data.length == 0) {
          this.initsace()
        } else {
          const list = []
          response.data.data.forEach(ele => {
            if (ele.fuelName !== '重燃油HFO(低硫)' && ele.fuelName !== '重燃油HFO(超低硫)' && ele.fuelName !== '轻燃油LFO(低硫)' && ele.fuelName !== '轻燃油LFO(超低硫)' && ele.fuelName !== '重燃油HFO(高硫)' && ele.fuelName !== '轻燃油LFO(高硫)') {
              list.push(ele)
            }
          })
          const obj = {
            carbonConten: '',
            conversion: '',
            createTm: null,
            creator: '',
            fuelCode: '燃油',
            fuelName: '燃油',
            id: '',
            isDelete: '',
            opdate: '',
            opuser: '',
            remark: null
          }
          list.push(obj)
          const oilFormDatas = []
          const tempOilFormdatas = []
          for (const item of list) {
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
              correctTons: 0
            }
            fuelOil.id = item.id
            fuelOil.oilId = item.fuelCode
            fuelOil.oilName = item.fuelName
            oilFormDatas.push(fuelOil)
            tempOilFormdatas.push(fuelOil)
          }
          this.oilFormData = oilFormDatas
          this.tempOilFormdata = tempOilFormdatas
          if (this.Fuelquantity.length > 0) {
            const addsData = []
            const oilId = this.Fuelquantity.map(item => item.oilId)
            const add = this.oilFormData.filter(item => !oilId.some(ele => ele === item.oilId))
            this.oilFormData = add.concat(this.Fuelquantity)
          }
        }
      })
    },
    CreateModel() {
      this.$nextTick(() => {
        this.$refs['oilForm'].clearValidate()
      })
    },
    EditRowData(row) {
      const rowdata = Object.assign({}, row)
      this.oilFormData = rowdata.oilTons
      this.$nextTick(() => {
        this.$refs['oilForm'].clearValidate()
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
