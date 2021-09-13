<template>
  <div class="app-container">
    <el-dialog title="港口选择" width="80%" :append-to-body="dialogShipCompanyFormVisible" :visible.sync="dialogShipCompanyFormVisible" :close-on-click-modal="false" v-el-drag-dialog  @dragDialog="this.$refs.select.blur()">
      <div class="filter-container">
        <div style="display:inline-block;">
          <label class="radio-label" style="padding-left:0;">{{ $t('dicManage.portCode') }}</label>
          <el-input v-model="listShipCompanyQuery.code" :placeholder="$t('dicManage.portCode')" style="width: 150px;" class="filter-item" @keyup.enter.native="handleShipCompanyFilter" />
          <label class="radio-label" style="padding-left:20px;">{{ $t('dicManage.portName') }}</label>
          <el-input v-model="listShipCompanyQuery.enName" :placeholder="$t('dicManage.portName')" style="width: 150px;" class="filter-item" @keyup.enter.native="handleShipCompanyFilter" />
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleShipCompanyFilter" style="margin-left:20px">
            查询
          </el-button>
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-setting"  @click="handleShipCompanyReset">
            重置
          </el-button>
        </div>
      </div>
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="shipCompanylist"
        border
        fit
        height="100px"
        v-adaptive="{bottomOffset: 38}"
        highlight-current-row
        style="width:100%;overflow:auto"
        ref="multipleTable"
        :row-style="{height:'35px'}"
        :cell-style="{padding:'0'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" >
        </el-table-column>
        <el-table-column label="序号" type="index" show-overflow-tooltip width="50" align="center">
        </el-table-column>
        <el-table-column :label="$t('dicManage.portCode')" width="120" align="center">
          <template slot-scope="{row}">
            <span>{{ row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('dicManage.portNameEn')" align="center">
          <template slot-scope="{row}">
            <span>{{ row.enName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('dicManage.portNameCn')" align="center">
          <template slot-scope="{row}">
            <span>{{ row.cnName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('dicManage.nationEn')" align="center">
          <template slot-scope="{row}">
            <span>{{ row.nationEn }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogShipCompanyFormVisible = false">
          关闭
        </el-button>
        <el-button type="primary" @click="saveRelation(tableChecked)">
          保存
        </el-button>
      </div>
      <pagination v-show="total2>0" style="margin:0px;padding:0px" :total="total2" :page.sync="listShipCompanyQuery.pageNum" :limit.sync="listShipCompanyQuery.pageSize" @pagination="getShipCompanyList" />
    </el-dialog>
  </div>
</template>

<script>
import {userShipCompanyList} from '@/api/sysManage'
import Pagination from '@/components/Pagination'
import adaptive from '@/directive/el-table'
import elDragDialog from '@/directive/el-drag-dialog'
import waves from '@/directive/waves'
import {getQueryPage} from "../../api/requestGet"; // waves directive
export default {
  name: "portSelect",
  components:{
    Pagination,
  },
  directives: { waves , adaptive ,elDragDialog  },
  data(){
    return {
      dialogShipCompanyFormVisible:false,
      tableKey:0,
      listShipCompanyQuery: {
        pageNum: 1,
        pageSize: 20,
        enName:'',
        code:''
      },
      total2: 0,
      shipCompanylist: [],
      tableChecked: [],
      relationedShipCompanyList: [],
      listLoading: true
    }
  },
  methods: {
    handleCreateRelation() {
      this.dialogShipCompanyFormVisible = true
      this.getShipCompanyList()
    },
    saveRelation(rows) {
      console.log(rows)
      this.$emit('savetion', rows)
      this.dialogShipCompanyFormVisible = false
    },
    handleShipCompanyFilter() {
      this.getShipCompanyList()
    },
    handleShipCompanyReset(){
      this.listShipCompanyQuery = {
        pageNum: 1,
        pageSize: 20,
        enName:'',
        code:''
      }
      this.getShipCompanyList()
    },
    handleSelectionChange(val) {
      if(val.length > 1) {
                this.$refs.multipleTable.clearSelection()
                this.$refs.multipleTable.toggleRowSelection(val.pop())
                this.tableChecked = val
            }else {
                this.tableChecked = val
            }
      this.tableChecked = val
    },
    getShipCompanyList() {
      this.listLoading = true
      // this.listShipCompanyQuery.pageSize=1
      getQueryPage('/gcCity/findGcCityList', this.listShipCompanyQuery).then(response => {
        this.shipCompanylist = response.data.data.items
        this.total2 = response.data.data.total
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 1000)
      })
    }
  }
}
</script>

<style scoped>

</style>
