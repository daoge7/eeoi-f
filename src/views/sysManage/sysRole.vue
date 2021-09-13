<template>
  <div class="app-container">
    <div class="filter-container">
      <div style="display:inline-block;">
        <label class="radio-label" style="padding-left:0;">{{ $t('common.identification') }}</label>
        <el-input v-model="listQuery.name" :placeholder="$t('sysManage.keywords')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
        <label class="radio-label" style="padding-left:0;">{{ $t('sysManage.roleStatus') }} </label>
        <el-select v-model="listQuery.status" :placeholder="$t('sysManage.selectRemind')" clearable style="width: 90px" class="filter-item">
            <el-option v-for="item in roleStatusOptions" :key="item.key" :label="item.display_name" :value="item.key" />
        </el-select>
        <el-button v-waves class="filter-item" icon="el-icon-search" @click="handleFilter" style="margin-left:20px">
            {{ $t("common.query") }}
        </el-button>
        <el-button v-waves class="filter-item" type="info" icon="el-icon-setting"  @click="handleFilter">
            {{ $t("common.reset") }}
        </el-button>
      </div>
      <div style="margin-top:20px;">
       <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-plus" @click="handleCreate">
            {{ $t('common.add') }}
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
       <el-table-column :label="$t('sysManage.identification')">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('sysManage.roleName')">
        <template slot-scope="{row}">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
       <el-table-column :label="$t('ship.Creationdate')" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.createTimestamp | datesformat('YYYY-MM-DD HH:mm') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('dicManage.upateDate')" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.updateTimestamp | datesformat('YYYY-MM-DD HH:mm') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('sysManage.roleStatus')" width="110px" align="center">
        <template slot-scope="{row}">
          <el-tag>{{ row.roleStatus | roleStatusFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('sysManage.see')" align="center" width="120" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUserList(row)">{{ $t('sysManage.userList') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('sysManage.permissions')" align="center" width="120" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleEditAuth(row)">
              {{ $t('sysManage.authorization') }}
          </el-button>
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
          <el-button size="mini" type="danger" @click="handleModifyStatus(row,'deleted')">
            {{ $t('common.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" style="margin:0px;padding:0px" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    <el-dialog width="80%" :title="textMap[dialogStatus]" :append-to-body="true" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:20px;">
         <el-form-item :label="$t('sysManage.identification')" prop="name" label-width="150px">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item :label="$t('sysManage.roleName')" prop="title" label-width="150px">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item :label="$t('sysManage.roleStatus')" prop="roleStatus" label-width="150px">
          <el-select v-model="temp.roleStatus" class="filter-item" :placeholder="$t('common.selectRemind')" style="width:250px">
            <el-option v-for="item in roleStatusOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('common.memo') " label-width="150px">
          <el-input v-model="temp.remark" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" :placeholder="$t('common.inputRemind')" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{ $t('common.close') }}
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          {{ $t('common.save') }}
        </el-button>
      </div>
    </el-dialog> 
    <el-dialog width="80%" :title="$t('common.userList')" :append-to-body="true" :visible.sync="dialogUserListVisible" :close-on-click-modal="false">
      <el-table :data="userListTable" border fit highlight-current-row style="width: 100%;">
        <el-table-column :label="$t('sysManage.username')" prop="userAccount">
        </el-table-column>
        <el-table-column :label="$t('sysManage.preronName')" prop="userName">
        </el-table-column>
        <el-table-column :label="$t('sysManage.manaCompany')" prop="userDept">
        </el-table-column>
        <el-table-column :label="$t('sysManage.updateTiem')" prop="updateDate">
        </el-table-column>
        <el-table-column label="$t('sysManage.searchStatus')" prop="userStatus">
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUserListVisible = false">
          {{ $t('common.close') }}
        </el-button>
      </div>
    </el-dialog>
    <el-dialog width="80%" :append-to-body="true" :title="$t('sysManage.authorization')" :visible.sync="dialogRoleFuncVisible" :close-on-click-modal="false">
      <el-tree
        :props="defaultProps"
        :data="treeData"
        show-checkbox
        node-key="id"
        :default-checked-keys="[2]">
      </el-tree>
       <div slot="footer" class="dialog-footer">
       <el-button @click="dialogRoleFuncVisible = false">
          {{ $t('common.close') }}
        </el-button>
        <el-button type="primary" @click="saveFunRoleData">
          {{ $t('common.save') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { roleList, createSysRole, updateSysRole } from '@/api/sysManage'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import adaptive from '@/directive/el-table'
const roleStatusOptions = [
  { key: '1', display_name: '启用' },
  { key: '0', display_name: '冻结' }
]

const roleStatusKeyValue = roleStatusOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'RoleManage',
  components: { Pagination },
  directives: { waves,adaptive },
  filters: {
    roleStatusFilter(status) {
      return roleStatusKeyValue[status]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        title: '',
        status: ''
      },
      roleStatusOptions,
      temp: {
        id: undefined,
        createTimestamp: new Date(),
        updateTimestamp: new Date(),
        name: '',
        title: '',
        roleStatus: '',
        remark: ''
      },
      dialogFormVisible: false,
      dialogUserListVisible: false,
      dialogRoleFuncVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新增'
      },
      rules: {
        name: [{ required: true, message: '必填项', trigger: 'blur' }],
        title: [{ required: true, message: '必填项', trigger: 'blur' }],
        roleStatus: [{ required: true, message: '必填项', trigger: 'change' }]
      },
      userListTable: [
        {
          userAccount:'user1',
          userName: '用户1',
          userDept: '机构1',
          updateDate: '2019-12-01',
          userStatus: '启用'
	      }, 
        {
	        userAccount:'user2',
          userName: '用户2',
          userDept: '机构2',
          updateDate: '2019-12-12',
          userStatus: '冻结'
	      }],
      treeData: [{
        id: 1,
        label: '系统管理',
        children: [{
          id: 101,
          label: '用户管理',
          children: [{
            id: 10101,
            label: '新增'
          }, {
            id: 10102,
            label: '修改'
          },{
            id: 10103,
            label: '删除'
          }]
        }]
      }, {
        id: 2,
        label: '船舶管理',
        children: [{
          id: 201,
          label: '新增'
        }, {
          id: 202,
          label: '修改'
        },{
          id: 203,
          label: '删除'
        },{
          id: 204,
          label: '导入'
        }]
      }, {
        id: 3,
        label: '船公司管理',
        children: [{
          id: 301,
          label: '新增'
        }, {
          id: 302,
          label: '修改'
        },{
          id: 303,
          label: '删除'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      roleList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        // Just to simulate the time of the request
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
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    handleDeleteRole(row) {
      var url = '/sysuser/deleteuser'
      deleteDataById(url, row.id).then(response => {
        for (const v of this.list) {
          if (v.id === this.row.id) {
            const index = this.list.indexOf(v)
            this.list.splice(index, 1, this.temp)
            break
          }
        }
        if(response.result==true)
        {
           this.dialogFormVisible = false
           this.$notify({
             title: 'Success',
             message: response.data,
             type: 'success',
             duration: 2000
           })
        }else{
           this.$notify({
             title: 'Failure',
             message: response.data,
             type: 'error'
           })
        }
      })    
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        createTimestamp: new Date(),
        updateTimestamp: new Date(),
        name: '',
        title: '',
        roleStatus: '',
        remark: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = Math.random() // mock a id
          this.temp.author = 'admin'
          this.temp.createTimestamp = new Date(this.temp.createTimestamp)
          createSysRole(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.updateTimestamp = new Date(this.temp.updateTimestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.updateTimestamp = +new Date(tempData.updateTimestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateSysRole(tempData).then(response => {
            debugger
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            if(response.result==true)
            {
               this.dialogFormVisible = false
               this.$notify({
                 title: 'Success',
                 message: response.data,
                 type: 'success',
                 duration: 2000
               })
            }else{
               this.$notify({
                 title: 'Failure',
                 message: response.data,
                 type: 'error'
               })
            }
          })
        }
      })
    },
    handleDelete(row) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
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
    handleUserList(row) {
      this.dialogUserListVisible = true
    },
    handleEditAuth() {
      this.dialogRoleFuncVisible = true
    },
    resetChecked() {
      this.$refs.tree.setCheckedKeys([])
    },
    saveFunRoleData() {
      this.$refs.tree.getCheckedNodes()
       this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
    }
  }
}
</script>
