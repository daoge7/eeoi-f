<template>
  <div class="app-container">
    <el-dialog title="船公司列表" width="80%" :append-to-body="true" :visible.sync="shipComPanyNamevicode" :before-close="addDetale">
      <div class="filter-container">
        <div style="display:inline-block;">
          <label class="radio-label" style="padding-left:0;">公司名称（中/英文）</label>
          <el-input v-model="listShipCompanyQuery.nameCn" placeholder="请输入关键字" style="width: 200px;" class="filter-item" @keyup.enter.native="handleShipCompanyFilter" />
          <label class="radio-label" style="padding-left:0;">公司代码code</label>
          <el-input v-model="listShipCompanyQuery.ccsCode" placeholder="请输入关键字" style="width: 200px;" class="filter-item" @keyup.enter.native="handleShipCompanyFilter" />
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleShipCompanyFilter" style="margin-left:20px">
            查询
          </el-button>
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-setting"  @click="handleShipCompanyReset">
            重置
          </el-button>
        </div>
      </div>
      <el-table
        ref="multipleTable"
        :key="tableKey"
        v-loading="listLoading"
        :data="shipCompanylist"
        border
        fit
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
        <el-table-column label="公司名称（中/英文）"  align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.nameCn+row.nameEn }}</span>
          </template>
        </el-table-column>
        <el-table-column label="公司代码code"  align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column label="公司IACS码"  align="left" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.iacs }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDetale">
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
    import waves from '@/directive/waves' // waves directive
    export default {
        name: "ShipComPanySelect",
        components:{
          Pagination,
        },
      directives: { waves , adaptive ,elDragDialog  },
      props:{
          shipComPanyNamevicode:{
            type:Boolean
          },
        },
        data(){
          return {
            tableKey:0,
            listShipCompanyQuery: {
              pageNum: 1,
              pageSize: 20,
              nameCn: '',
              nameEn: '',
              ccsCode: ''
            },
            total2:0,
            shipCompanylist:[],
            tableChecked:[],
            relationedShipCompanyList: [],
            listLoading:true
          }
      },
      created(){
        this.getShipCompanyList()
     },
        methods: {
          addDetale() {
              this.$emit('shipComPanyNameData2', false)
          },  
          saveRelation() {
             let obj = {}
              if(Array.isArray(this.tableChecked)){
              obj = {
              name: this.tableChecked[0].nameEn,
              id: this.tableChecked[0].ccsCode
              }
          }else {
              obj = {
              name: this.tableChecked.nameEn,
              id: this.tableChecked.ccsCode
              }
          }
          this.$emit('shipComPanyNameData2', obj)
          },
          handleShipCompanyFilter() {
            this.getShipCompanyList()
          },
          handleShipCompanyReset(){
            this.listShipCompanyQuery = {
              pageNum: 1,
              pageSize: 20,
              nameCn: '',
              nameEn: '',
              ccsCode: ''
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
            userShipCompanyList(this.listShipCompanyQuery).then(response => {
              this.shipCompanylist = response.data.data.items
              this.total2 = response.data.data.total
              // Just to simulate the time of the request
              setTimeout(() => {
                this.listLoading = false
              }, 1.5 * 1000)
            })
          }
        }
    }
</script>

<style scoped>

</style>
