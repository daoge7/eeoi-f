
<!-- 期初量-->
<template>
  <div class="app-container">
    <div class="filter-container">
      <div style="display:flex;align-items: center;">
        <label class="radio-labels">{{ $t('common.keyWord') }}</label>
          <el-input v-model="listQuery.keyWord"  @keyup.enter.native="handleFilter" :placeholder="$t('common.inputRemind')" style="width:160px;" />
        <label class="radio-label">{{ $t('MRV.Year') }}</label>
        <el-select v-model="listQuery.Year" :placeholder="$t('common.selectRemind')" clearable class="filter-item" size="mini" style="width: 160px">
          <el-option v-for="item in ReportingyearArray" :key="item" :label="item" :value="item" />
        </el-select>
        <el-button class="filter-item" icon="el-icon-search" style="margin-left:20px" @click="handleFilter">
          {{ $t('common.search') }}
        </el-button>
        <el-button class="filter-item" type="info" style="margin-left:20px" @click="handleReset">
          {{ $t('common.reset') }}
        </el-button>
      </div>
    </div>
    <div>
    <el-button
      type="primary"
      size="mini"
      icon="el-icon-plus"
     @click="addClick"
     >{{ $t('common.add') }}
    </el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      :height="tableHeight"
      highlight-current-row
      style="width: 100%; overflow:auto;margin-top:10px;"
      :row-style="{height:'35px'}"
      :cell-style="{padding:'0'}"
      :empty-text="$t('MRV.noDataAlert')"
    >
        <el-table-column
         :label="$t('common.no')"
          type="index"
          width="50">
        </el-table-column>
        <el-table-column :label="$t('MRV.VesselName')" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <el-tooltip placement="top">
              <div slot="content" v-if="row.beginPeriodOilDtos.length !==0">
               <li v-for="(item, index) in row.beginPeriodOilDtos" :key="index">
               <span>{{ item.fuelName }}:</span>
               <span>{{ item.fuelTons }}T</span>
               </li>
              </div>
              <span>{{ row.shipName }}</span>
              </el-tooltip>
            
          </template>
        </el-table-column>
        <!---->
        <el-table-column :label="$t('MRV.Date')" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
          <el-tooltip placement="top">
              <div slot="content" v-if="row.beginPeriodOilDtos.length !==0">
               <li v-for="(item, index) in row.beginPeriodOilDtos" :key="index">
               <span>{{ item.fuelName }}:</span>
               <span>{{ item.fuelTons }}T</span>
               </li>
              </div>
               <span>{{ row.periodTime | datesformat('YYYY-MM-DD HH:mm:ss') }}</span>
              </el-tooltip>
          </template>
        </el-table-column>
        <!---->
        <el-table-column :label="$t('common.operate')" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
          <el-button
                  v-if="scope.row.recStatus=== '0'"
                  type="warning"
                  size="mini"
                  @click="Unclock(scope.row)"
                >{{ $t('voyage.btnLock') }}
                </el-button>
           <el-button
                  v-if="scope.row.recStatus ==='1'"
                  size="mini"
                  @click="Unclock(scope.row)"
                >{{ $t('voyage.btnUnLock') }}
                </el-button>
            <el-button
                  :disabled="scope.row.recStatus ==='1'"
                  type="primary"
                  size="mini"
                  @click="handleUpdatePort(scope.row)"
                >{{ $t('common.edit') }}
                </el-button>
                <el-button
                  size="mini"
                  type="success"
                  @click="handleDetailPort(scope.row)"
                >{{ $t('common.detail') }}
                </el-button>
                <el-button
                :disabled="scope.row.recStatus ==='1'"
                  size="mini"
                  type="danger"
                  @click="handleDeletePort(scope)"
                >{{ $t('common.delete') }}
                </el-button>
          </template>
        </el-table-column>
    </el-table>
    <pagination v-if="total>0" :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize" @pagination="getList"/>
     <openingVolumeDalog :shipComPanyNamevicode="dialogShipCompanyFormVisibles" @shipComPanyNameData="shipComPanyNameData" v-if="dialogShipCompanyFormVisibles.dalog"/>
     <openingVolumeDeatil :shipComPanyNamevicodeDetail="shipComPanyNamevicodeDetail" @shipComPanyNameDataDetali="shipComPanyNameDataDetali" v-if="shipComPanyNamevicodeDetail.dalog"/>
  </div>
</template>

<script>
import { getPeriodOil, deletePeriodOil,lockOrUnlock } from '@/api/requestPost'
import { getYears } from '@/api/requestGet'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import openingVolumeDalog from './components/openingVolume-dalog'
import openingVolumeDeatil from './components/openingVolumeDetail-dalog'
const yearOptions = [
  { key: '2017', display_name: '2017' },
  { key: '2018', display_name: '2018' },
  { key: '2019', display_name: '2019' },
  { key: '2020', display_name: '2020' }
]

export default {
  name: 'openingVolume',
  components: { Pagination, openingVolumeDalog, openingVolumeDeatil },
  data() {
    return {
      shipComPanyNamevicodeDetail:{
         dalog: false,
         opening:{}
      },
      ReportingyearArray: [],
      shipName: '',
      shipComPanyNamevicode:{},
      tableKey: 0,
      tableHeight: window.innerHeight - 240,
      list: [],
      total: 0,
      dialogShipCompanyFormVisibles:{
        dalog: false,
        opening: {}
      },
      listLoading: true,
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        keyWord: '',
        year: ''
      },
      yearOptions
    }
  },
  created() {
    this.listLoading = false
    this.getList()
    this.initYear()
  },
  methods: {
    initYear() {
      getYears().then(res => {
        this.ReportingyearArray = res.data.data
      })
    },
    // 关闭弹框详情
    shipComPanyNameDataDetali() {
      this.shipComPanyNamevicodeDetail.dalog = false
    },
      // 弹框数据
    shipComPanyNameData() {
      this.getList()
      this.dialogShipCompanyFormVisibles.dalog = false
    },
    // 编辑
    handleUpdatePort(row) {
        this.dialogShipCompanyFormVisibles.dalog = true
        this.dialogShipCompanyFormVisibles.opening = row
        console.log(this.dialogShipCompanyFormVisibles)
    },
    // 详情
    handleDetailPort(row) {
      this.shipComPanyNamevicodeDetail.opening = row
      this.shipComPanyNamevicodeDetail.dalog = true
    },
    // 删除
    handleDeletePort(scope) {
       if(scope.row.recStatus ==='1') {
          this.$message({
          message: '锁定状态不可进行删除操作',
          type: 'warning'
        });
      }else {
         deletePeriodOil({periodId:scope.row.periodId}).then(res => {
            this.list.splice(scope.$index,1)
            this.getList()
        })
      }
        
        // scope.row.periodId
        // this.list.splice(scope.$index,1)
    },
    Unclock(row) {
       lockOrUnlock({periodId:row.periodId}).then(res => {
            this.getList()
       })
    },
    // 新增
    addClick() {
     // 打开弹框
     this.dialogShipCompanyFormVisibles.dalog = true
     this.dialogShipCompanyFormVisibles.opening = {}

    },
    // 请求数据
    getList() {
      this.listLoading = true
      getPeriodOil(this.listQuery).then(response => {
        this.list = response.data.data.items
        this.total = response.data.data.total
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    // 重置
    handleReset() {
      this.listQuery.currentPage = 1
      this.listQuery.pageSize = 20
      this.listQuery.keyWord =''
      this.listQuery.year = ''
    },
    // 搜索
    handleFilter() {
       this.listQuery.currentPage = 1
      this.getList()
    }
  }
}
</script>
<style scoped>
*{
  list-style: none;
}
  .el-table__empty-text {
    display: block;
    width: 500px;
    height: 385px;
    padding-top: 300px;
    background:url('../../images/noData.png') no-repeat;
    color: #909399;
    box-sizing: border-box;
  }
  .radio-labels {
    font-size: 12px;
    color: #606266;
    padding:0;
    width:70px;
    margin-right: 10px;
    display: flex;
    justify-content: flex-end;
  }
  .radio-label {
    margin-left: 20px;
    font-size: 12px;
    color: #606266;
    padding:0;
    width:70px;
    margin-right: 10px;
    display: flex;
    justify-content: flex-end;
  }
  .el-select{
    margin-right:20px;
  }
  .el-checkbox__label{
    padding-left:5px;font-size: 12px;
  }
  .addBox{
    display: flex;
  }
</style>
