<template>
  <el-form ref="deptCargoInfoForm" :model="deptTemp" label-position="left" label-width="100px">
    <el-row>
      <el-col :span="8">
        <el-form-item :label="$t('voyageCargoInfo.cargoTons')">
          <el-input v-model="deptTemp.cargoTons" :placeholder="$t('common.inputRemind')" type="number" oninput="if(isNaN(value)) { value = parseFloat(value) } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+4)}" :readonly="readOnly">
            <i slot="suffix" style="color:red">T</i>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('voyageCargoInfo.ballastTons')">
          <el-input v-model="deptTemp.ballastTons" :placeholder="$t('common.inputRemind')" type="number" oninput="if(isNaN(value)) { value = parseFloat(value) } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+4)}" :readonly="readOnly">
            <i slot="suffix" style="color:red">T</i>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('voyageCargoInfo.allBoxNum')">
          <el-input v-model="deptTemp.allBoxNum" :placeholder="$t('common.inputRemind')" type="number" oninput="if(isNaN(value)) { value = parseFloat(value) } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+4)}" :readonly="readOnly">
            <i slot="suffix" style="color:red">teu</i>
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item :label="$t('voyageCargoInfo.carsNum')">
          <el-input v-model="deptTemp.carsNum" :placeholder="$t('common.inputRemind')" type="number" oninput="if(isNaN(value)) { value = parseFloat(value) } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+4)}" :readonly="readOnly" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('voyageCargoInfo.peopleNum')">
          <el-input v-model="deptTemp.peopleNum" :placeholder="$t('common.inputRemind')" type="number" oninput="if(isNaN(value)) { value = parseFloat(value) } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+4)}" :readonly="readOnly" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('voyageCargoInfo.heavyBoxNum')">
          <el-input v-model="deptTemp.heavyBoxNum" :placeholder="$t('common.inputRemind')" type="number" oninput="if(isNaN(value)) { value = parseFloat(value) } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+4)}" :readonly="readOnly">
            <i slot="suffix" style="color:red">teu</i>
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  name: 'DeptCargoInfo',
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
      readOnly: false,
      deptTemp: {
        id: '',
        loadingType: '0',
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
    resetDeptTemp() {
      this.deptTemp = {
        id: '',
        loadingType: '0',
        cargoTons: 0,
        ballastTons: 0,
        allBoxNum: 0,
        heavyBoxNum: 0,
        peopleNum: 0,
        carsNum: 0
      }
    },
    CreateModel() {
      this.resetDeptTemp()
      this.$nextTick(() => {
        this.$refs['deptCargoInfoForm'].clearValidate()
      })
    },
    EditRowData(row) {
      const rowdata = Object.assign({}, row)
      this.deptTemp = rowdata.deptCargoInfo
      this.$nextTick(() => {
        this.$refs['deptCargoInfoForm'].clearValidate()
      })
    }
  }
}
</script>
