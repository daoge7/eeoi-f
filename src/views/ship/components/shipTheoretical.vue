<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button v-if="flag" class="filter-item" size="mini" type="primary" icon="el-icon-plus" @click="addClick">
      {{ $t('common.add') }}</el-button>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="averageSpeed"
        :label="$t('ship.Rowssection')"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mainEngineFuelCons"
        :label="$t('ship.Dailyfuel')"
        width="180">
      </el-table-column>
      <el-table-column
        prop="auxFuelCons"
        :label="$t('ship.Auxiliarymachine')">
      </el-table-column>
      <el-table-column
        prop="boilerFuelCons"
        :label="$t('ship.boiler')">
      </el-table-column>
       <el-table-column
        prop="shipFuelCons"
        :label="$t('ship.Shipasawhole')">
      </el-table-column>
      <el-table-column
        :label="$t('common.operate')">
        <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">{{ $t('common.edit') }}</el-button>
        <el-button type="text" size="small" @click="deleteClick(scope.$index,scope.row)">{{ $t('common.delete') }}</el-button>
      </template>
      </el-table-column>
    </el-table>
    <shipTheoreticals v-if="datas.dialogVisible" :rowData="rowData" :datas="datas" @close="close"/>
  </div>
</template>

<script>
import shipTheoreticals from './shipTheoretical-dalog'
import { getTfc } from '@/api/requestGet'
import { deleteTfc } from '@/api/requestPost'
export default {
  name: 'ShipPropeller',
  props: {
  },
  components:{
    shipTheoreticals
  },
  data() {
    return {
      shipId: '',
      flag: true,
      rowData: {},
      tableData: [
        {
          date:'11'
        }
      ],
      datas:{
        id:'',
        shipId: '',
        dialogVisible: false
      }
    }
  },
  watch: {
    shipId(val) {
      console.log(val)
      this.datas.shipId = val
      this.getlist()
    },
  },
  created() {
    this.getlist()
  },
  methods: {
    getlist() {
      getTfc(this.shipId).then(res => {
          this.tableData = res.data.data
      })
    },
    addClick() {
      this.datas.dialogVisible = true
    },
    handleClick(row) {
      // 打开弹框
      this.rowData = row
      this.datas.dialogVisible = true

    },
    deleteClick(index,row) {
      console.log(row)
      deleteTfc({id:row.id}).then(res => {
        this.getlist()
      })
      
    },
    close() {
      this.getlist()
      this.datas.dialogVisible = false
      this.rowData = {}
    }
  }
}
</script>
