<template>
  <el-form ref="deptCargoInfoForm" :rules="rules" :model="deptTemp" label-position="left" label-width="100px">
    <el-row>
      <el-col :span="8">
        <el-form-item :label="$t('voyageCargoInfo.cargoTons')">
          <el-input :placeholder="$t('common.inputRemind')" v-model="deptTemp.cargoTons">
            <i slot="suffix" style="color:red">T</i>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('voyageCargoInfo.ballastTons')">
          <el-input :placeholder="$t('common.inputRemind')" v-model="deptTemp.ballastTons">
            <i slot="suffix" style="color:red">T</i>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('voyageCargoInfo.allBoxNum')">
          <el-input :placeholder="$t('common.inputRemind')" v-model="deptTemp.allBoxNum">
            <i slot="suffix" style="color:red">teu</i>
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item :label="$t('voyageCargoInfo.carsNum')">
          <el-input :placeholder="$t('common.inputRemind')" v-model="deptTemp.carsNum">
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('voyageCargoInfo.peopleNum')">
          <el-input :placeholder="$t('common.inputRemind')" v-model="deptTemp.peopleNum">
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('voyageCargoInfo.heavyBoxNum')">
          <el-input :placeholder="$t('common.inputRemind')" v-model="deptTemp.heavyBoxNum">
            <i slot="suffix" style="color:red">teu</i>
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  name: 'deptCargoInfo',
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
      deptTemp: {
        cargoTons: '',
        ballastTons: '',
        allBoxNum: '',
        heavyBoxNum: '',
        peopleNum: '',
        carsNum: ''
      }
    }
  },
  methods: {
    resetDeptTemp() {
      this.deptTemp = {
        cargoTons: '',
        ballastTons: '',
        allBoxNum: '',
        heavyBoxNum: '',
        peopleNum: '',
        carsNum: ''
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
