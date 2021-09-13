<template>
  <div class="app-container">
    <!-- 查询条件区 -->
    <div class="filter-container">
      <div style="display:inline-block;">
        <label class="radio-label" style="padding-left:0;">{{ $t('common.keyWord') }}</label>
        <el-input v-model="listQuery.account" :placeholder="$t('sysManage.searchKeyTip')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
         <label class="radio-label" style="padding-left:0;">{{ $t('sysManage.searchOrg') }}</label>
        <el-input v-model="listQuery.companyName" :placeholder="$t('sysManage.searchOrgTip')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
        <label class="radio-label" style="padding-left:0;">{{ $t('sysManage.role') }}</label>
        <el-select v-model="listQuery.roleId" :placeholder="$t('common.selectRemind')" style="width: 200px;">
        <el-option
        v-for="item in options"
         :key="item.id"
          :label="item.title"
       :value="item.id">
    </el-option>
  </el-select>
        <label class="radio-label" style="padding-left:0;">{{ $t('sysManage.searchStatus') }}</label>
        <el-select v-model="listQuery.userstatus" :placeholder="$t('common.selectRemind')" clearable style="width: 90px" class="filter-item">
            <el-option v-for="item in userStatusOptions" :key="item.key" :label="item.display_name" :value="item.key" />
        </el-select>
        <el-button v-waves class="filter-item" icon="el-icon-search" @click="handleFilter" style="margin-left:20px">
            {{ $t('common.search') }}
        </el-button>
        <el-button v-waves class="filter-item" type="info" icon="el-icon-setting"  @click="reset">
            {{ $t('common.reset') }}
        </el-button>
      </div>
      <div style="margin-top:20px;">
       <el-button
        v-if="$store.getters.button.includes('system:user:add')"
        class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-plus" @click="handleCreate">
            {{ $t('common.add') }}
       </el-button>
      </div>
    </div>
    <!-- 列表展示区 -->
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
      @sort-change="sortChange"
    >
      <el-table-column :label="$t('common.no')" type="index" show-overflow-tooltip width="50" align="center">
      </el-table-column>
      <el-table-column :label="$t('sysManage.username')" align="center" >
        <template slot-scope="{row}" >
           <el-link type="info" class="link-type" @click="handleUpdate(row,'detail')">{{ row.account }}</el-link>
        </template>
      </el-table-column>
       <el-table-column :label="$t('sysManage.personNameCN')" align="center">
        <template slot-scope="{row}">
          <span >{{ row.nameCn }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('sysManage.personNameEN')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.nameEn }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('sysManage.manaCompany')" width="350px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.companyName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('common.operatedTime')" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.opdate | datesformat('YYYY-MM-DD HH:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('sysManage.searchStatus')" width="110px" align="center">
        <template slot-scope="{row}">
          <el-tag>{{ row.userStatus | userStatusFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('common.operate')" align="center" width="250px">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row,'edit')">
            {{ $t('common.edit') }}
          </el-button>
          <el-button size="mini" type="danger" @click="handleDeleteUser(row)">
            {{ $t('common.delete') }}
          </el-button>
          <el-button v-if="$store.getters.button.includes('system:user:reset:password')" size="mini" type="warning" @click="handlerestUser(row)">
            {{ $t('common.resetpassword') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize" @pagination="getList" />
    <!-- 用户信息展示弹窗 -->
    <el-dialog width="80%" v-el-drag-dialog :append-to-body="true"  @dragDialog="this.$refs.select.blur()" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="130px" style="width: 90%; margin-left:20px;">
         <el-row>
           <el-col :span="12">
             <el-form-item :label="$t('sysManage.username')" prop="account"  >
              <el-input v-model="temp.account" :readonly="accountReadonly"/>
             </el-form-item>
           </el-col>
           <el-col :span="12">
            <el-form-item :label="$t('sysManage.personNameCN')" prop="nameCn" >
              <el-input v-model="temp.nameCn" />
            </el-form-item>
           </el-col>
         </el-row>
         <el-row>
           <el-col :span="12">
             <el-form-item :label="$t('sysManage.userRole')" prop="userRole" style="width:100%;" >
               <el-select v-model="temp.userRole" class="filter-item" :placeholder="$t('common.selectRemind')"  multiple :multiple-limit="10" style="width:100%" >
                 <el-option v-for="item in userRoleOptions" :key="item.id" :label="item.title" :value="item.id" />
               </el-select>
             </el-form-item>
           </el-col>
           <el-col :span="12">
             <el-form-item :label="$t('sysManage.personNameEN')" prop="nameEn" >
              <el-input v-model="temp.nameEn" />
              </el-form-item>
           </el-col>
         </el-row>
         <el-row>
           <el-col :span="12">
             <el-form-item :label="$t('sysManage.phone')" >
              <el-input v-model="temp.phone" />
             </el-form-item>
           </el-col>
           <el-col :span="12">
             <el-form-item :label="$t('sysManage.email')">
              <el-input v-model="temp.email" />
             </el-form-item>
           </el-col>
         </el-row>
         <el-row>
           <el-col :span="12">
             <el-form-item :label="$t('sysManage.searchStatus')" prop="userStatus">
              <el-select v-model="temp.userStatus" class="filter-item" :placeholder="$t('common.selectRemind')" style="width:100%;" >
                <el-option v-for="item in userStatusOptions" :key="item.key" :label="item.display_name" :value="item.key" />
              </el-select>
             </el-form-item>
           </el-col>
           <el-col :span="12">
           </el-col>
         </el-row>
         <el-row>
           <el-col :span="24">
             <el-form-item :label="$t('common.memo')">
               <el-input v-model="temp.remark" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" :placeholder="$t('common.inputRemind')" />
             </el-form-item>
           </el-col>
         </el-row>
         
         <el-row v-if="false">
           <el-col :span="24">
             <el-form-item label="船公司id">
               <el-input v-model="temp.companyIds"  />
             </el-form-item>
           </el-col>
         </el-row>
      </el-form>
    <div style="margin-top:20px;margin-bottom:-10px;">
       <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-plus" @click="handleCreateRelation" v-show="statusType">
            {{ $t('sysManage.link2Company') }}
       </el-button>
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-plus" @click="batchDelete(tableChecked2)" v-show="statusType">
            {{ $t('common.batchDel') }}
       </el-button>
    </div>
    <div style="display:inline-block;">
    </div>
    <!-- 关联公司列表-->
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="relationedShipCompanyList"
      border
      fit
      height="100px"
      v-adaptive="{bottomOffset: 38}"
      highlight-current-row
      style="width:100%;overflow:auto"
      :row-style="{height:'35px'}"
      :cell-style="{padding:'0'}"
      @sort-change="sortChange"
      ref="relationShipCompanyTable"
      @selection-change="handleRelationCompanySelectionChange"
    >
      <el-table-column type="selection" width="55" align="center">
      </el-table-column>
      <el-table-column :label="$t('common.no')" type="index" show-overflow-tooltip width="50">
      </el-table-column>
       <el-table-column :label="$t('sysManage.companyNameCNEN')" align="center" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span class="link-type" >{{ row.nameCn+"/"+row.nameEn }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('sysManage.companyCode')" align="center" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span class="link-type" >{{ row.companyCode }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('sysManage.companyImo')" align="center" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.iacsCode }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('common.operate')" align="center" width="100px;" class-name="small-padding fixed-width" v-if="statusType">
        <template slot-scope="{row}" >
          <el-button size="mini" type="danger" @click="handleDeleteRelation(row)" >
            {{ $t('common.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{ $t('common.close') }}
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()" v-show="statusType">
          {{ $t('common.save') }}
        </el-button>
      </div>
    </el-dialog>

    <!-- 船公司列表 -->
    <el-dialog width="80%" :title="textMap[dialogStatus]" :append-to-body="true" :visible.sync="dialogShipCompanyFormVisible" :close-on-click-modal="false" v-el-drag-dialog  @dragDialog="this.$refs.select.blur()">
      <div class="filter-container">
      <div style="display:inline-block;">
        <label class="radio-label" style="padding-left:0;">{{ $t('sysManage.companyNameCNEN') }}</label>
        <el-input v-model="listShipCompanyQuery.nameCn" :placeholder="$t('common.inputRemind')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleShipCompanyFilter" />
         <label class="radio-label" style="padding-left:0;">{{ $t('sysManage.companyCode') }}</label>
        <el-input v-model="listShipCompanyQuery.ccsCode" :placeholder="$t('common.inputRemind')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleShipCompanyFilter" />
        <el-button v-waves class="filter-item"  icon="el-icon-search" @click="handleShipCompanyFilter" style="margin-left:20px">
            {{ $t('common.search') }}
        </el-button>
        <el-button v-waves class="filter-item" type="info" icon="el-icon-setting"  @click="handleShipCompanyReset">
            {{ $t('common.reset') }}
        </el-button>
      </div>
     </div>
      <el-table
      :key="tableKey"
      v-loading="listLoadings"
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
      <el-table-column :label="$t('common.no')" type="index" show-overflow-tooltip width="50" align="center">
      </el-table-column>
      <el-table-column :label="$t('sysManage.companyNameCNEN')"  align="center" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.nameCn+row.nameEn }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('sysManage.companyCode')"  align="center" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('sysManage.companyImo')" align="left" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.iacs }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
        <el-button @click="dialogShipCompanyFormVisible = false">
          {{ $t('common.close') }}
        </el-button>
        <el-button type="primary" @click="saveRelation(tableChecked)">
          {{ $t('common.save') }}
        </el-button>
      </div>
    <pagination v-show="total2>0" style="margin:0px;padding:0px" :total="total2" :page.sync="listShipCompanyQuery.pageNum" :limit.sync="listShipCompanyQuery.pageSize" @pagination="getShipCompanyList" /> 
    </el-dialog>
  </div>
</template>

<script>
import { userList, createSysUser, updateSysUser,userShipCompanyList,userDetail,deleteUser,roleList } from '@/api/sysManage'
import { resetUserPassword } from '@/api/user'
import { postFormData } from '@/api/requestPost'
import { getQueryPage, getQueryDic} from '@/api/requestGet'
import waves from '@/directive/waves' // waves directive
import { parseTime, deepClone } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import adaptive from '@/directive/el-table'
import elDragDialog from '@/directive/el-drag-dialog'
import i18n from '@/lang' // 国际化

const userStatusOptions = [
  { key: 1, display_name: i18n.t('common.EnabledStatus') }, //
  { key: 2, display_name: i18n.t('common.frozenStatus') }  // 
]
const userDeptOptions = []
const userStatusKeyValue = userStatusOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})
const userDeptKeyValue = userDeptOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})
// const indexw = 1
export default {
  name: 'UserManage',
  components: { Pagination },
  directives: { waves , adaptive ,elDragDialog  },
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
      listQuerys: {
        currentPage: 1,
        pageSize: 20
      },
      options:[
      ],
      listLoadings: true,
      tableKey: 0,
      list: null,
      total: 0,
      total2: 0,
      listLoading: true,
      relationedShipCompanyList: [],
      shipCompanylist: [],
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        account: '',
        userstatus: '',
        companyName: '',
        roleId: '',
      },
      listShipCompanyQuery: {
        pageNum: 1,
        pageSize: 20,
        nameCn: '',
        nameEn: '',
        ccsCode: ''
      },
      userStatusOptions,
      userDeptOptions,
      userRoleOptions: [],
      temp: {
        id: undefined,
        num: 1,
        account: '',
        nameEn: '',
        nameCn: '',
        userStatus: '',
        userRole: [],
        email: '',
        phone: '',
        remark: '',
        companyIds: []
      },
      temp2: {
        id: undefined,
        account: '',
        nameEn: '',
        nameCn: '',
        userStatus: '',
        userRole: [],
        email: '',
        phone: '',
        remark: '',
        companyIds: []
      },
      dialogFormVisible: false,
      accountReadonly: false,
      statusType: false,
      dialogShipCompanyFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: i18n.t('common.update'),
        create: i18n.t('common.add'),
        detail: i18n.t('common.detail')
      },
      rules: {
        account: [{ required: true, message: i18n.t('common.inputRequired'), trigger: 'blur' }],
        nameEn: [{ required: true, message: i18n.t('common.inputRequired'), trigger: 'blur' }],
        nameCn: [{ required: true, message: i18n.t('common.inputRequired'), trigger: 'blur' }],
        userDept: [{ required: true, message: i18n.t('common.inputRequired'), trigger: 'change' }],
        userStatus: [{ required: true, message: i18n.t('common.inputRequired'), trigger: 'change' }]
      },
      tableChecked: [],
      tableChecked2: []
    }
  },
  created() {
    this.getList()
    this.getRoles()
    this.inforoleList()
  },
  methods: {
    inforoleList() {
      roleList(this.listQuerys).then(res => {
        if(res.data.result) {
          this.options = res.data.data.items
        } 
      })
    },
    getRoles(){
     var url = '/sysRole/roleListDic'
     getQueryDic(url).then(response => {
      this.userRoleOptions = response.data.data
     })
    },
    getList() {
      this.listLoading = true
      userList(this.listQuery).then(response => {
        this.list = response.data.data.items
        this.total = response.data.data.total
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    userDetail(id, status) {
      this.listLoading = true
      userDetail(id).then(response => {
        this.temp = Object.assign({}, response.data.data)
        this.relationedShipCompanyList=response.data.data.companyList
        this.dialogFormVisible = true
        this.accountReadonly = true
        if(status === 'edit') //编辑和详情
        {
           this.statusType = true
           this.dialogStatus = 'update'
        }else {
           this.statusType = false
           this.dialogStatus = 'detail'
        }
        if (this.temp.userRole !== (null || undefined) && this.temp.userRole.length > 0) {
        var s = []
        for (var i = 0; i < this.temp.userRole.length; i++) {
          s.push(this.temp.userRole[i])
        }
          this.temp.userRole = s
        }
        setTimeout(() => {
          this.listLoading = false
        }, 1000)
      })
      
    },
    getShipCompanyList() {
      this.listLoadings = true
      // this.listShipCompanyQuery.pageSize=1
      userShipCompanyList(this.listShipCompanyQuery).then(response => {
        this.shipCompanylist = response.data.data.items
        this.total2 = response.data.data.total
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoadings = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.currentPage = 1
      this.getList()
    },
    reset(){
      this.listQuery = {
        currentPage: 1,
        pageSize: 20,
        account: '',
        userStatus: '',
        companyName: '',
        roleId: ''
      }
      this.getList()
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
    handleDeleteUser(row) {
      if (confirm(i18n.t('common.deleteConfirmTip')) === false) {
        return
      }
      var url = '/sysUser/deleteUser'
      postFormData(url , {'id' : row.id}).then(response => {
        for (const v of this.list) {
          if (v.id === row.id) {
            const index = this.list.indexOf(v)
            this.list.splice(index, 1)
            break
          }
        }
        if (response.data.result === true)
        {
          this.dialogFormVisible = false
          this.$notify({
            title: 'Success',
            message: 'Success',
            type: 'success',
            duration: 2000
           })
        } else {
          this.$notify({
            title: 'Failure',
            message: response.data.data,
            type: 'error'
            })
        }
      })
    },
    handleSelectionChange(val) {
        this.tableChecked = val
    },
    handleRelationCompanySelectionChange(val) {
      this.tableChecked2 = val
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    handleDeleteRelation(row) {
      if (confirm(i18n.t('common.deleteConfirmTip')) === true) {
        const index = this.relationedShipCompanyList.indexOf(row)
        this.relationedShipCompanyList.splice(index, 1)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        num: 1,
        account: '',
        nameEn: '',
        nameCn: '',
        userStatus: '',
        userRole: [],
        email: '',
        phone: '',
        remark: '',
        companyIds: []
      }
    },
    handleCreate() {
      this.resetTemp()
      this.relationedShipCompanyList = []
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.accountReadonly = false
      this.statusType = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleCreateRelation() {
      this.dialogShipCompanyFormVisible=true
      this.getShipCompanyList()
    },
    createData() {
       for(const vv of this.relationedShipCompanyList) {
         this.temp.companyIds.push(vv.companyId)
       }
      this.dialogShipCompanyFormVisible = false
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createSysUser(this.temp).then((response) => {
            // this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.dialogShipCompanyFormVisible=false
            this.getList()
            if(response.data.result === true)
            {
              this.$notify({
                title: 'Success',
                message: 'Save Successfully',
                type: 'success',
                duration: 2000
              })
            }else{
              this.$notify({
                title: 'Failure',
                message: response.data.data,
                type: 'error'
              })
            }
          }).catch(() => {
          this.$notify({
                title: 'Failure',
                message: 'Failure',
                type: 'error'
              })
          })
        }
      })
    },
    saveRelation(rows) {
      const companyIds = []
      for(const v of this.relationedShipCompanyList){
          companyIds.push(v.companyId)
      }
      for(const v of rows ) {
        const tempData = Object.assign({}, v)
        const index =companyIds.indexOf(v.id)
        if(index===-1) {
           this.relationedShipCompanyList.push({nameEn:tempData.nameEn,nameCn: tempData.nameCn,companyCode:tempData.ccsCode,iacsCode: tempData.iacs,companyId: tempData.id})
        }
      }
      this.dialogShipCompanyFormVisible = false
    },
    handleUpdate(row,status) {
      this.userDetail(row.id,status)
    },
    updateData() {
      this.temp.companyIds=this.temp.companyIds||[]
      for(const vv of this.relationedShipCompanyList){
         this.temp.companyIds.push(vv.companyId)
      }
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp2 = this.temp2||[]
          this.temp2.id = this.temp.id
          this.temp2.account = this.temp.account
          this.temp2.nameEn = this.temp.nameEn
          this.temp2.nameCn = this.temp.nameCn
          this.temp2.userRole = this.temp.userRole
          this.temp2.userStatus = this.temp.userStatus
          this.temp2.email = this.temp.email
          this.temp2.phone = this.temp.phone
          this.temp2.remark = this.temp.remark
          this.temp2.companyIds = this.temp.companyIds
          updateSysUser(this.temp2).then((response) => {
            for (let index = 0; index < this.list.length; index++) {
              if (this.list[index].id === this.temp.id) {
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.getList()
            this.dialogFormVisible = false
            if (response.data.result === true)
            {
              this.$notify({
                title: 'Success',
                message: 'Save Successfully',
                type: 'success',
                duration: 2000
              })
            } else {
              this.$notify({
                title: 'Failure',
                message: response.data.data,
                type: 'error'
              })
            }
          }).catch(() => {
              this.dialogFormVisible = false
              this.$notify({
                title: 'Failure',
                message: 'Failure',
                type: 'error'
              })
          })
        }
      })
    },
    // 重置密码
    handlerestUser(row) {
      console.log(row)
      this.$confirm('是否重置密码?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          resetUserPassword({userId:row.id}).then(res => {
              if(res.data.result) {
                this.$notify.info({
                title: '消息',
                message: res.data.data
        });
              }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消重置'
          });          
        });
    },
    batchDelete(rows){
      var _this = this;
      _this.$confirm(i18n.t('common.deleteConfirmTip'), i18n.t('common.tipWinTitle'), {
        confirmButtonText: i18n.t('common.confirm'),
        cancelButtonText: i18n.t('common.cancel'),
        type: 'warning'
      }).then(() => {
        var val = rows
        if (val) {
          val.forEach(function(item, index) {
            _this.relationedShipCompanyList.forEach(function(itemI, indexI) {
              if (item === itemI) {
                _this.relationedShipCompanyList.splice(indexI, 1)
              }
            })
          })
        }
        this.$notify({
          title: 'Success',
          message: 'Delete Successfully',
          type: 'success',
          duration: 2000
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}`
        ? 'ascending'
        : sort === `-${key}`
          ? 'descending'
          : ''
    },
    selectTrigger: function(val) {
      // 手动刷新
      // this.$forceUpdate()
    }
  }
}
</script>
