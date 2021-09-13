<template>
  <div class="app-container">
    <el-dialog title="船舶列表" width="80%" :append-to-body="true" :visible.sync="dialogShipCompanyFormVisible" :close-on-click-modal="false" v-el-drag-dialog  @dragDialog="this.$refs.select.blur()">
      <div class="filter-container">
        <div style="display:inline-block;">
          <label class="radio-label" style="padding-left:0;">{{ $t('ship.nameOrimo') }}</label>
          <el-input v-model="listShipCompanyQuery.shipKeyWord" placeholder="请输入关键字" style="width: 200px;" class="filter-item" @keyup.enter.native="handleShipCompanyFilter" />
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
        ref="multipleTable"
        height="100px"
        v-adaptive="{bottomOffset: 38}"
        highlight-current-row
        style="width:100%;overflow:auto"
        :row-style="{height:'35px'}"
        :cell-style="{padding:'0'}"
        @selection-change="handleSelectionChange"
      >

        <el-table-column type="selection" width="55" align="center" >
        </el-table-column>
        <el-table-column label="序号" type="index" show-overflow-tooltip width="50" align="center">
        </el-table-column>
        <el-table-column :label="$t('ship.shipLangName')" min-width="150px" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.spname }}/{{ row.spnameCn }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ship.imono')" min-width="100px" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.imono }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ship.registNo')" min-width="100px" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.ccsno }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ship.shipFlag')" width="110px" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.flag }}</span>
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
      <pagination v-show="total2>0" style="margin:0px;padding:0px" :total="total2" :page.sync="listShipCompanyQuery.currentPage" :limit.sync="listShipCompanyQuery.pageSize" @pagination="getShipCompanyList" />
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
        name: "shipSelect",
        components:{
          Pagination,
        },
      directives: { waves , adaptive ,elDragDialog  },
        data(){
          return {
            dialogShipCompanyFormVisible:false,
            tableKey:0,
            listShipCompanyQuery: {
              currentPage: 1,
              pageSize: 20,
              shipKeyWord:'',
              sort: 'spname'
            },
            total2:0,
            shipCompanylist:[],
            tableChecked:[],
            relationedShipCompanyList: [],
            listLoading:true
          }
      },
        methods: {
          handleCreateRelation() {
            this.dialogShipCompanyFormVisible=true
            this.getShipCompanyList()
          }, 
          saveRelation(rows) {
            var name = rows[0].spname===null?rows[0].spnameCn:rows[0].spname
            this.$parent.portTemp.shipName = name
            this.$parent.portTemp.shipId = rows[0].id
            this.$parent.driftTemp.shipName = name
            this.$parent.driftTemp.shipId = rows[0].id
            this.$parent.specTemp.shipName = name
            this.$parent.specTemp.shipId = rows[0].id
            if(this.$parent.$refs.oilTons) {
              this.$parent.$refs.oilTons.shipId = rows[0].id
            }
            if(this.$parent.$refs.Fuelquantity) {
              this.$parent.$refs.Fuelquantity.shipId = rows[0].id
            }
            if(this.$parent.$refs.Bargeoilvolume) {
                this.$parent.$refs.Bargeoilvolume.shipId = rows[0].id
            }
            this.dialogShipCompanyFormVisible = false
          },
          handleShipCompanyFilter() {
            this.getShipCompanyList()
          },
          handleShipCompanyReset(){
            this.listShipCompanyQuery = {
              currentPage: 1,
              pageSize: 20,
              shipKeyWord:'',
              sort:'spname'
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
            getQueryPage('/shipManager/shipList',this.listShipCompanyQuery).then(response => {
              this.shipCompanylist = response.data.data.items
              this.total2 = response.data.data.total
              // Just to simulate the time of the request
              setTimeout(() => {
                this.listLoading = false
              }, 1.5 )
            })
          }
        }
    }
</script>

<style scoped>

</style>
