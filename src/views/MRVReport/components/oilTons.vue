<template>
  <el-form ref="oilForm" :rules="oilRules" :model="oilForm">
     <div style="border:1px solid rgba(96, 98, 102, 0.22); border-bottom:none;margin-top:5px;height:23px;vertical-align:middle;">
      <span style="font-size:14px;font-weight:bold;margin-left:10px;">抵离港油量</span>
    </div>
    <el-table :data="oilFormData" stripe border style="width: 100%" size="mini">
      <el-table-column :label="$t('voyageOil.oilType')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.oilType }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('voyageOil.arrOilTons')" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.arrOilTons" :maxlength="10"></el-input>
        </template>
      </el-table-column>
      <el-table-column :label="$t('voyageOil.deptOilTons')" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.deptOilTons"></el-input>
        </template>
      </el-table-column>
      <el-table-column :label="$t('voyageOil.addOil')" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.addOil"></el-input>
        </template>
      </el-table-column>
      <el-table-column :label="$t('voyageOil.addOilTime')" align="center" width="200">
        <template slot-scope="{row}">
          <el-date-picker v-model="row.addOilTime" :editable="true" type="datetime" :placeholder="$t('common.dateTimeRemind')" style="width:95%" />
        </template>
      </el-table-column>
      <el-table-column :label="$t('voyageOil.addOilNumber')" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.addOilNumber"></el-input>
        </template>
      </el-table-column>
      <el-table-column :label="$t('voyageOil.outOil')" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.outOil"></el-input>
        </template>
      </el-table-column>
      <el-table-column :label="$t('voyageOil.outOilTime')" align="center" width="200">
        <template slot-scope="{row}">
          <el-date-picker v-model="row.outOilTime" :editable="true" type="datetime" :placeholder="$t('common.dateTimeRemind')" style="width:95%" />
        </template>
      </el-table-column>
      <el-table-column :label="$t('voyageOil.correctOil')" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.correctOil"></el-input>
        </template>
      </el-table-column>
    </el-table>
  </el-form>
</template>

<script>
export default {
  name: 'oilTons',
  props: {
    editStatus: {
      type: String,
      default: ''
    },
    portEditRowId: {
      type: String,
      default: ''
    },
    portRowModel: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      oilFormData: [
        {
          oilId: '',
          oilType: '高硫重油',
          arrOilTons: '',
          deptOilTons: '',
          addOil: '',
          addOilTime: '',
          addOilNumber: '',
          outOil: '',
          outOilTime: '',
          correctOil: ''
        },
        {
          oilId: '',
          oilType: '低硫重油',
          arrOilTons: '',
          deptOilTons: '',
          addOil: '',
          addOilTime: '',
          addOilNumber: '',
          outOil: '',
          outOilTime: '',
          correctOil: ''
        },
        {
          oilId: '',
          oilType: '超低硫重油',
          arrOilTons: '',
          deptOilTons: '',
          addOil: '',
          addOilTime: '',
          addOilNumber: '',
          outOil: '',
          outOilTime: '',
          correctOil: ''
        },
        {
          oilId: '',
          oilType: '高硫轻油',
          arrOilTons: '',
          deptOilTons: '',
          addOil: '',
          addOilTime: '',
          addOilNumber: '',
          outOil: '',
          outOilTime: '',
          correctOil: ''
        },
        {
          oilId: '',
          oilType: '低硫轻油',
          arrOilTons: '',
          deptOilTons: '',
          addOil: '',
          addOilTime: '',
          addOilNumber: '',
          outOil: '',
          outOilTime: '',
          correctOil: ''
        },
        {
          oilId: '',
          oilType: '超低硫轻油',
          arrOilTons: '',
          deptOilTons: '',
          addOil: '',
          addOilTime: '',
          addOilNumber: '',
          outOil: '',
          outOilTime: '',
          correctOil: ''
        },
        {
          oilId: '',
          oilType: '柴油',
          arrOilTons: '',
          deptOilTons: '',
          addOil: '',
          addOilTime: '',
          addOilNumber: '',
          outOil: '',
          outOilTime: '',
          correctOil: ''
        },
        {
          oilId: '',
          oilType: '甲醇',
          arrOilTons: '',
          deptOilTons: '',
          addOil: '',
          addOilTime: '',
          addOilNumber: '',
          outOil: '',
          outOilTime: '',
          correctOil: ''
        },
        {
          oilId: '',
          oilType: '乙醇',
          arrOilTons: '',
          deptOilTons: '',
          addOil: '',
          addOilTime: '',
          addOilNumber: '',
          outOil: '',
          outOilTime: '',
          correctOil: ''
        },
        {
          oilId: '',
          oilType: '丙烷',
          arrOilTons: '',
          deptOilTons: '',
          addOil: '',
          addOilTime: '',
          addOilNumber: '',
          outOil: '',
          outOilTime: '',
          correctOil: ''
        },
        {
          oilId: '',
          oilType: '丁烷',
          arrOilTons: '',
          deptOilTons: '',
          addOil: '',
          addOilTime: '',
          addOilNumber: '',
          outOil: '',
          outOilTime: '',
          correctOil: ''
        }
      ],
      oilRules: {
      }
    }
  },
  methods: {
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
