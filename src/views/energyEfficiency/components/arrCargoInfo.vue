<template>
  <el-form ref="arrCargoInfoForm" :model="arrTemp" label-position="left" label-width="100px">
    <el-row>
      <el-col :span="8">
        <el-form-item :label="$t('voyageCargoInfo.cargoTons')">
          <el-input v-model="arrTemp.cargoTons" :placeholder="$t('common.inputRemind')" type="number" oninput="if(isNaN(value)) { value = parseFloat(value) } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+4)}" :readonly="readonly">
            <i slot="suffix" style="color:red">T</i>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('voyageCargoInfo.ballastTons')">
          <el-input v-model="arrTemp.ballastTons" :placeholder="$t('common.inputRemind')" type="number" oninput="if(isNaN(value)) { value = parseFloat(value) } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+4)}" :readonly="readonly">
            <i slot="suffix" style="color:red">T</i>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('voyageCargoInfo.allBoxNum')">
          <el-input v-model="arrTemp.allBoxNum" :placeholder="$t('common.inputRemind')" type="number" oninput="if(isNaN(value)) { value = parseFloat(value) } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+4)}" :readonly="readonly">
            <i slot="suffix" style="color:red">teu</i>
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item :label="$t('voyageCargoInfo.carsNum')">
          <el-input v-model="arrTemp.carsNum" :placeholder="$t('common.inputRemind')" type="number" oninput="if(isNaN(value)) { value = parseFloat(value) } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+4)}" :readonly="readonly"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('voyageCargoInfo.peopleNum')">
          <el-input v-model="arrTemp.peopleNum" :placeholder="$t('common.inputRemind')" type="number" oninput="if(isNaN(value)) { value = parseFloat(value) } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+4)}" :readonly="readonly"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('voyageCargoInfo.heavyBoxNum')">
          <el-input v-model="arrTemp.heavyBoxNum" :placeholder="$t('common.inputRemind')" type="number" oninput="if(isNaN(value)) { value = parseFloat(value) } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+4)}" :readonly="readonly">
            <i slot="suffix" style="color:red">teu</i>
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  // name: 'arrCargoInfo',
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
      readonly:false,
      arrTemp: {
        id: '',
        loadingType: '1',
        cargoTons: 0,
        ballastTons: 0,
        allBoxNum: 0,
        heavyBoxNum: 0,
        peopleNum: 0,
        carsNum: 0
      }
    }
  },
  methods: {
    resetArrTemp() {
      this.arrTemp = {
        id: '',
        loadingType: '1',
        cargoTons: 0,
        ballastTons: 0,
        allBoxNum: 0,
        heavyBoxNum: 0,
        peopleNum: 0,
        carsNum: 0
      }
    },
    CreateModel() {
      this.resetArrTemp()
      this.$nextTick(() => {
        this.$refs['arrCargoInfoForm'].clearValidate()
      })
    },
    EditRowData(row) {
      const rowdata = Object.assign({}, row)
      this.arrTemp = rowdata.arrCargoInfo
      this.$nextTick(() => {
        this.$refs['arrCargoInfoForm'].clearValidate()
      })
    }
  }
}
</script>
