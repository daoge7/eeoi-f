<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="temp.num" class="filter-item" :placeholder="$t('common.selectRemind')" style="width:100px" value="1">
        <el-option v-for="item in mainEngineIds" :key="item" :label="item" :value="item" />
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
    <el-form ref="shipMainPropForm" :model="temp" label-width="100px">
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('ship.type')">
            <el-input v-model="temp.type" :placeholder="$t('common.inputRemind')" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('ship.ratedPower')">
            <el-input v-model="temp.ratedPower" type="number" :placeholder="$t('common.inputRemind')">
              <i slot="suffix" style="color:red">Kw</i>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('ship.ratedSpeed')">
            <el-input v-model="temp.ratedSpeed"  type="number"  :placeholder="$t('common.inputRemind')">
              <i slot="suffix" style="color:red">Rpm</i>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'ShipMainProp',
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
      mainEngineIds: ['1', '2'],
      temp: {
        id: undefined,
        type: '',
        ratedPower: '',
        ratedSpeed: ''
      }
    }
  },
  methods: {
    resetTemp() {
      this.temp = {
        id: undefined,
        type: '',
        ratedPower: '',
        ratedSpeed: ''
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
        this.$refs['shipMainPropForm'].clearValidate()
      })
    },
    EditRowData(row) {
      const rowdata = Object.assign({}, row)
      this.temp = rowdata.shipMainProp[1]
      this.$nextTick(() => {
        this.$refs['shipMainPropForm'].clearValidate()
      })
    }
  }
}
</script>
