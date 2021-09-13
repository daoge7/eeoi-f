<template>
  <div class="app-container">
    <div class="filter-container">
      <div style="display:inline-block;">
        <label class="radio-label" style="padding-left:0;">{{ $t('sysManage.username') }}</label>
        <el-input v-model="listQuery.account" :placeholder="$t('sysManage.keywords')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
         <label class="radio-label" style="padding-left:0;">{{ $t('sysManage.Ownershipcompany') }}</label>
        <el-input v-model="listQuery.userdept" :placeholder="$t('sysManage.keywords')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
        <label class="radio-label" style="padding-left:0;">{{ $t('sysManage.searchStatus') }} </label>
        <el-select v-model="listQuery.userstatus" :placeholder="$t('sysManage.selectRemind')" clearable style="width: 90px" class="filter-item">
            <el-option v-for="item in userStatusOptions" :key="item.key" :label="item.display_name" :value="item.key" />
        </el-select>
        <el-button v-waves class="filter-item" icon="el-icon-search" @click="handleFilter" style="margin-left:20px">
            {{ $t('common.query') }}
        </el-button>
      </div>
      <div style="margin-top:10px;">
       <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-plus" @click="handleSetShipAuth">
            {{ $t('sysManage.Setshipauthority') }}
       </el-button>
      </div>
   </div>

   <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      height="100px"
      v-adaptive="{bottomOffset: 38}"
      highlight-current-row
      style="width:100%;overflow:auto"
      :row-style="{height:'35px'}"
      :cell-style="{padding:'0'}"
    >
      <el-table-column :label="$t('common.no')" prop="id" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.num }}</span>
        </template>
      </el-table-column>
       <el-table-column :label="$t('sysManage.usernames')">
        <template slot-scope="{row}">
          <span>{{ row.account }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('sysManage.preronName')">
        <template slot-scope="{row}">
          <span >{{ row.nameCn }}/{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('sysManage.Ownershipcompany')" align="left">
        <template slot-scope="{row}">
          <span>{{ row.userDept | userDeptFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('sysManage.searchStatus')" width="110px" align="center">
        <template slot-scope="{row}">
          <el-tag>{{ row.userStatus | userStatusFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('sysManage.shippauthority')" width="500px" align="left">
       <template slot-scope="{row}">
          <span>{{ row.manageShips }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" style="margin:0px;padding:0px" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog width="80%" :append-to-body="true" :title="$t('sysManage.Setshipauthority')" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
        <div class="filter-container">
          <div style="display:inline-block;">
            <label class="radio-label" style="padding-left:30px;">{{ $t('sysManage.Nameofvessel') }}</label>
            <el-input v-model="shiplistQuery.nameOrimo" :placeholder="$t('sysManage.keywords')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
             <label class="radio-label" style="padding-left:0;">{{ c$t('sysManage.shiptype') }}</label>
            <el-select v-model="shiplistQuery.type" :placeholder="$t('sysManage.selectRemind')" clearable class="filter-item" style="width: 130px">
                <el-option v-for="item in shipTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
            </el-select>
          </div>
          <div style="display:inline-block;">
           <label class="radio-label" style="padding-left:30px;">{{ $t('sysManage.Ownershipcompany') }}</label>
            <el-input v-model="shiplistQuery.company" :placeholder="$t('sysManage.keywords')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
            <label class="radio-label" style="padding-left:30px;">{{ 'sysManage.Airworthiness' }}</label>
            <el-input v-model="shiplistQuery.area" :placeholder="$t('sysManage.keywords')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search"  @click="handleFilter" style="margin-left:20px">
                {{ $t('common.query') }}
            </el-button>
          </div>
        </div>
   <el-table
      v-loading="shiplistLoading"
      :data="shiplist"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column type="selection" width="55" align="center">
      </el-table-column>
       <el-table-column :label="$t('MRV.NameOfShip')" min-width="150px">
        <template slot-scope="{row}">
          <span>{{ row.shipNameCn }}/{{ row.shipName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="IMO.No" min-width="100px">
        <template slot-scope="{row}">
          <span>{{ row.imono }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('sysManage.fvessel')" min-width="100px">
        <template slot-scope="{row}">
          <span>{{ row.registNo }}</span>
        </template>
      </el-table-column>
    </el-table>
     <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{ $t('common.close') }}
        </el-button>
        <el-button type="primary" @click="saveShipAuth">
          {{ $t('common.save') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { authUserList, authShipList } from '@/api/sysManage'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import adaptive from '@/directive/el-table'
const userStatusOptions = [
  { key: '1', display_name: '启用' },
  { key: '0', display_name: '冻结' }
]
const userDeptOptions = [
  { key: '1', display_name: '机构1' },
  { key: '2', display_name: '机构2' }
]
const shipTypeOptions = [
  { key: '1', display_name: '散货船' },
  { key: '2', display_name: '液货船' },
  { key: '3', display_name: '气体运输船' },
  { key: '4', display_name: '集装箱船' },
  { key: '5', display_name: '滚装货船' },
  { key: '6', display_name: '普通货船' }
]

const userStatusKeyValue = userStatusOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})
const userDeptKeyValue = userDeptOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ShipAuth',
  components: { Pagination },
  directives: { waves ,adaptive},
  filters: {
    userStatusFilter(status) {
      return userStatusKeyValue[status]
    },
    userDeptFilter(status) {
      return userDeptKeyValue[status]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      shiplist: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        account: '',
        userstatus: '',
        userdept: ''
      },
      shiplistQuery: {
        page: 1,
        limit: 20,
        account: '',
        userstatus: '',
        userdept: ''
      },
      shiplistLoading: true,
      userStatusOptions,
      userDeptOptions,
      shipTypeOptions,
      temp: {
        id: undefined,
        num: 1,
        timestamp: new Date(),
        account: '',
        userDept: '',
        userStatus: ''
      },
      dialogFormVisible: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      authUserList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    getShipList() {
      this.shiplistLoading = true
      authShipList(this.shiplistQuery).then(response => {
        this.shiplist = response.data.items
        setTimeout(() => {
          this.shiplistLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSetShipAuth() {
      this.getShipList()
      this.dialogFormVisible = true
      this.$nextTick(() => {
      })
    },
    saveShipAuth() {
      this.dialogFormVisible = false
      this.$notify({
        title: 'Success',
        message: 'Created Successfully',
        type: 'success',
        duration: 2000
      })
    }
  }
}
</script>
