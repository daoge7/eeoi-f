<template>
  <div class="app-container">
    <div class="filter-container">
      <div style="display:inline-block;">
        <label class="radio-label" style="padding-left:0;">{{ $t('sysManage.roleName') }}</label>
        <el-input v-model="listQuery.name" :placeholder="$t('common.inputRemind')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
        <label class="radio-label" style="padding-left:0;">{{ $t('sysManage.roleStatus') }} </label>
        <el-select v-model="listQuery.status" :placeholder="$t('common.selectRemind')" clearable style="width: 90px" class="filter-item">
            <el-option v-for="item in statusOptions" :key="item.key" :label="item.display_name" :value="item.key" />
        </el-select>
        <el-button v-waves class="filter-item" icon="el-icon-search" @click="handleFilter" style="margin-left:20px">
            {{$t('common.search')}}
        </el-button>
        <el-button v-waves class="filter-item" type="info" icon="el-icon-setting"  @click="searchResert">
            {{$t('common.reset')}}
        </el-button>
      </div>
      <div style="margin-top:20px;">
       <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-plus" @click="handleCreate">
            {{$t('common.add')}}
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
      ref="roleTable"
    >
      <el-table-column :label="$t('common.no')" type="index" show-overflow-tooltip width="50" align="center">
      </el-table-column>
      <el-table-column :label="$t('sysManage.roleName')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('sysManage.roleStatus')" width="110px" align="center">
        <template slot-scope="{row}">
          <el-tag>{{ row.status | statusFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('common.operate')" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            {{ $t('common.edit') }}
          </el-button>
          <el-button size="mini" type="success" @click="handleModifyStatus(row,'detail')">
            {{ $t('common.detail') }}
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row)">
            {{ $t('common.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" style="margin:0px;padding:0px" :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize" @pagination="getList" />
    <el-dialog :append-to-body="true" v-dialogDrag :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false"  @dragDialog="this.$refs.select.blur()">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="140px" style="width: 400px; margin-left:20px;">
        <el-form-item :label="$t('sysManage.roleName')" prop="title" label-width="150px">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item :label="$t('sysManage.roleStatus')" prop="status" label-width="150px">
          <el-select v-model="temp.status" class="filter-item" :placeholder="$t('common.selectRemind')" style="width:250px">
            <el-option v-for="item in statusOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('sysManage.functionMenu')" label-width="150px">
          <el-tree
            ref="tree"
            :check-strictly="checkStrictly"
            :data="routesData"
            :props="defaultProps2"
            show-checkbox
            node-key="nodeid"
            class="permission-tree"
          />
        </el-form-item>
        <el-form-item :label="$t('common.memo')" label-width="150px">
          <el-input v-model="temp.remark" :autosize="{ minRows: 2, maxRows: 4}" type="textarea"  :placeholder="$t('common.inputRemind')" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{ $t('common.close') }}
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()" v-show="statusType">
          {{ $t('common.save') }}
        </el-button>
      </div>
    </el-dialog>
    <el-dialog :title="$t('sysManage.userList')" :append-to-body="true" :visible.sync="dialogUserListVisible" :close-on-click-modal="false">
      <el-table :data="userListTable" border fit highlight-current-row style="width: 100%;">
        <el-table-column :label="$t('sysManage.username')" prop="userAccount">
        </el-table-column>
        <el-table-column :label="$t('sysManage.personNameCN')" prop="userName">
        </el-table-column>
        <el-table-column :label="$t('sysManage.manaCompany')" prop="userDept">
        </el-table-column>
        <el-table-column :label="$t('common.operatedTime')" prop="updateDate">
        </el-table-column>
        <el-table-column :label="$t('sysManage.searchStatus')" prop="userStatus">
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUserListVisible = false">
          {{ $t('common.close') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { roleList, createSysRole, updateSysRole, roleDetail } from '@/api/sysManage'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import adaptive from '@/directive/el-table'
import { postFormData, deleteDataById} from '@/api/requestPost'
import { getQueryPage, getQueryInfo, getQueryDic } from '@/api/requestGet'
import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui
import i18n from '@/lang' // 国际化

const statusOptions = [
  { key: 1, display_name: i18n.t('common.EnabledStatus') }, //
  { key: 2, display_name: i18n.t('common.frozenStatus') }  // 
]
const path = require('path')
const statusKeyValue = statusOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'RoleManage',
  components: { Pagination },
  directives: { waves, adaptive, elDragDialog },
  filters: {
    statusFilter(status) {
      return statusKeyValue[status]
    }
  },
  data() {
    return {
      init: this.$t('ship.searchOperator'),
      treeData: [],
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        title: '',
        status: ''
      },
      statusOptions,
      temp: {
        id: '',
        title: '',
        status: '',
        remark: '',
        menuIds: []
      },
      temp2: {
        id: '',
        title: '',
        status: '',
        remark: '',
        menuIds: []
      },
      dialogFormVisible: false,
      dialogUserListVisible: false,
      dialogRoleFuncVisible: false,
      dialogStatus: '',
      textMap: {
        update: i18n.t('sysManage.roleAddWindow'),
        create: i18n.t('sysManage.roleEditWindow'),
        detail: i18n.t('common.detail')
      },
      statusType: true,

      rules: {
        // name: [{ required: true, message: '必填项', trigger: 'blur' }],
        title: [{ required: true, message: i18n.t('common.inputRequired'), trigger: 'blur' }],
        status: [{ required: true, message: i18n.t('common.inputRequired'), trigger: 'change' }]
      },
      userListTable: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      routes: [],
      
      checkStrictly: false,
      defaultProps2: {
        children: 'children',
        label: 'title'
      }
    }
  },
  computed: {
    routesData() {
      return this.routes
    },
    
  },
  created() {
    this.getList()
    this.getFuncList()
  },
  methods: {
    getFuncList(){
      var url = '/sysMenu/allSysMenus'
      getQueryDic(url).then(response => {
        this.routes = this.generateRoutes(response.data.data)
        console.log(this.generateRoutes(response.data.data))
      })
    },
    generateRoutes(routes, basePath = '/') {
      const res = []

      for (let route of routes) {
        // skip some route
        // if (route.hidden) { continue }

        const onlyOneShowingChild = this.onlyOneShowingChild(route.children, route)

        if (route.children && onlyOneShowingChild ) {
          route = onlyOneShowingChild
        }
        const data = {
          nodeid: route && route.id,
          title: route && route.title
          // id: route && route.id
        }

        // recursive child routes
        if (route.children) {
          data.children = this.generateRoutes(route.children, data.nodeid)
        }
        if(route.buttons){
          for(const vv of route.buttons) {
            const dataTemp = {
              nodeid: vv.id,
              title: vv.title
            }
            data.children.push(dataTemp)
          }
        }
        res.push(data)
      }
      return res
    },
    onlyOneShowingChild(children = [], parent) {
      let onlyOneChild = null
      // const showingChildren = children.filter(item => !item.hidden)
      const showingChildren = children
      // When there is only one child route, the child route is displayed by default
      if (showingChildren.length === 1) {
        onlyOneChild = showingChildren[0]
        onlyOneChild.url = path.resolve(parent.url, onlyOneChild.url)
        return onlyOneChild
      }

      // Show parent if there are no child route to display
      if (showingChildren.length === 0) {
        onlyOneChild = { ... parent, nodeid: '', noShowingChildren: true }
        return onlyOneChild
      }

      return false
    },
    getList() {
      this.listLoading = true
      roleList(this.listQuery).then(response => {
        this.list = response.data.data.items
        this.total = response.data.data.total
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    roleDetail(id , status) {
      this.listLoading = true
      var url = '/sysRole/roleDetail'
      roleDetail(id).then(response => {
        this.temp = Object.assign({}, response.data.data)
        this.relationedShipCompanyList = response.data.data.companyList
        this.dialogFormVisible = true
        this.accountReadonly = true
        // for(const cc in this.temp.menuIds){
        // } 
        this.checkStrictly = true
        this.$nextTick(() => {
          this.$refs.tree.setCheckedKeys(this.temp.menuIds)
          this.checkStrictly = false
        })
        if(status === "edit") //编辑和详情
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
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.roleDetail(row.id,status)
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        title: '',
        status: '',
        remark: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.statusType = true
      this.dialogFormVisible = true
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([])
      }
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {      
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          var url = '/sysRole/saveRole'
          this.temp.menuIds = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys());
          postFormData(url,this.temp).then((response) => {
            if(response.data.result){
              this.temp.id = response.data.data
              this.list.unshift(this.temp)
              this.dialogFormVisible = false
              this.$notify({
                title: 'Success',
                message: 'Created Successfully',
                type: 'success',
                duration: 2000
              })
            }
            else{
              this.$notify({
                 title: 'Failure',
                 message: response.data.data,
                 type: 'error',
                 duration: 2000
              })
            }
          })
        }
      })
    },
    handleUpdate(row) {
      this.roleDetail(row.id,'edit')
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp2 = this.temp2||[]
          this.temp2.id = this.temp.id
          this.temp2.title = this.temp.title
          this.temp2.remark = this.temp.remark
          this.temp2.status = this.temp.status 
          this.temp2.menuIds = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
          postFormData('/sysRole/saveRole', this.temp2).then((response) => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.getList()
            if(response.data.result){       
              this.$notify({
                title: 'Success',
                message: 'Update Successfully',
                type: 'success',
                duration: 2000
              })            
            }else{
              this.$notify({
                title: 'Failure',
                message: response.data.data,
                type: 'error',
                duration: 2000
              })   
            }
          })
        }
      })
    },
    handleDelete(row) {
      if (confirm(i18n.t('common.deleteConfirmTip')) === false) {
        return
      }
      var url = '/sysRole/deleteRole'
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
            message: response.data.data,
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
    searchResert(){
      this.listQuery= {
        currentPage: 1,
        pageSize: 20,
        title: '',
        status: ''
      }
      this.getList()
    },
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
