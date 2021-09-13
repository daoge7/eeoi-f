<template>
  <div class="app-container">
    <div class="filter-container">
      <div style="display:inline-block;">
        <label class="radio-label" style="padding-left:0;">{{ $t('sysManage.unName') }}</label>
        <el-input v-model="listQuery.account" :placeholder="$t('sysManage.keywords')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
         <label class="radio-label" style="padding-left:0;">{{ $t('sysManage.searchOrg') }}</label>
        <el-input v-model="listQuery.userdept" :placeholder="$t('sysManage.keywords')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
        <label class="radio-label" style="padding-left:0;">{{$t('sysManage.searchStatus')}} </label>
        <el-select v-model="listQuery.userstatus" :placeholder="$t('common.selectRemind')" clearable style="width: 90px" class="filter-item">
            <el-option v-for="item in userStatusOptions" :key="item.key" :label="item.display_name" :value="item.key" />
        </el-select>
        <el-button v-waves class="filter-item"  icon="el-icon-search" @click="handleFilter" style="margin-left:20px">
            {{ $t('common.query') }}
        </el-button>
        <el-button v-waves class="filter-item" type="info" icon="el-icon-setting"  @click="handleFilter">
            {{ $t('common.reset') }}
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
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column :label="$t('common.no')" prop="id" sortable="custom" align="center" width="80" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.num }}</span>
        </template>
      </el-table-column>
       <el-table-column :label="$t('sysManage.usernames')">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.account }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('sysManage.preronName')">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.nameCn }}/{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('sysManage.manaCompany')" width="350px" align="left">
        <template slot-scope="{row}">
          <span>{{ row.userDept }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('sysManage.updateTiem')" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.timestamp | datesformat('YYYY-MM-DD HH:mm') }}</span>
        </template>
      </el-table-column>
       <el-table-column :label="$t('sysManage.updateTiem')" width="110px" align="center">
        <template slot-scope="{row}">
          <el-tag>{{ row.userStatus | userStatusFilter }}</el-tag>
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

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog width="80%" :append-to-body="true" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:20px;">
         <el-form-item :label="$t('sysManage.usernames')" prop="account" label-width="150px">
          <el-input v-model="temp.account" />
        </el-form-item>
        <el-form-item :label="$t('sysManage.preronName')" prop="nameCn" label-width="150px">
          <el-input v-model="temp.nameCn" />
        </el-form-item>
        <el-form-item :label="$t('sysManage.Englishname')" prop="name" label-width="150px">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item :label="$t('sysManage.searchOrg')" prop="userDept" label-width="150px">
          <el-select v-model="temp.userDept" class="filter-item" :placeholder="$t('common.selectRemind')">
            <el-option v-for="item in userDeptOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
         <el-form-item :label="$t('sysManage.phone')" label-width="150px">
          <el-input v-model="temp.phone" />
        </el-form-item>
        <el-form-item :label="$t('sysManage.email')" label-width="150px">
          <el-input v-model="temp.email" />
        </el-form-item>
        <el-form-item :label="$t('sysManage.searchStatus')" prop="userStatus" label-width="150px">
          <el-select v-model="temp.userStatus" class="filter-item" :placeholder="$t('common.selectRemind')">
            <el-option v-for="item in userStatusOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('common.memo')" label-width="150px">
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
  </div>
</template>

<script>
import { userList, createSysUser, updateSysUser } from '@/api/sysManage'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const userStatusOptions = [
  { key: '1', display_name: '启用' },
  { key: '0', display_name: '冻结' }
]
const userDeptOptions = [
  { key: '1', display_name: '机构1' },
  { key: '0', display_name: '机构2' }
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
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
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
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        account: '',
        userstatus: '',
        userdept: '',
        sort: '+id'
      },
      userStatusOptions,
      userDeptOptions,
      temp: {
        id: undefined,
        num: 1,
        timestamp: new Date(),
        account: '',
        name: '',
        nameCn: '',
        userDept: '',
        userStatus: '',
        email: '',
        phone: '',
        remark: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新增'
      },
      rules: {
        account: [{ required: true, message: '必填项', trigger: 'blur' }],
        name: [{ required: true, message: '必填项', trigger: 'blur' }],
        nameCn: [{ required: true, message: '必填项', trigger: 'blur' }],
        userDept: [{ required: true, message: '必填项', trigger: 'change' }],
        userStatus: [{ required: true, message: '必填项', trigger: 'change' }]
      }
    }
  },
  created() {
    // this.$store.commit('setRemark', 'testtest')
    // var temp1 = sessionStorage['remark']
    // alert(temp1)
    // this.paramTest()
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      userList(this.listQuery).then(response => {
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
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
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
        timestamp: new Date(),
        account: '',
        name: '',
        nameCn: '',
        userDept: '',
        userStatus: '',
        email: '',
        phone: '',
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
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createSysUser(this.temp).then(() => {
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
      this.temp.timestamp = new Date(this.temp.timestamp)
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
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateSysUser(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
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
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}`
        ? 'ascending'
        : sort === `-${key}`
          ? 'descending'
          : ''
    },
    paramTest: function() {
        // 赋值
      this.$store.commit('setRemark', 'stringtest')
      // 取值
      // var temp1 = sessionStorage['remark']
      // alert(temp1)
      var userEntity = {
        name: 'zhangsan',
        age: 22
      }
      // 赋值
      this.$store.commit('setJsontest', userEntity)
      // 取值
      // var userJsonStr = sessionStorage.getItem('jsontest')
      // 将string转为json
      // var userTemp = JSON.parse(userJsonStr)
      // alert(userTemp.name)
    }
  }
}
</script>
