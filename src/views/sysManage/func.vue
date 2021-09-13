<template>
  <div class="app-container">
    <div class="filter-container">
      <div style="display:inline-block;">
        <label class="radio-label" style="padding-left:0;">{{ $t('sysManage.Functionname') }}</label>
        <el-input v-model="listQuery.name" :placeholder="$t('sysManage.keywords')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
        <label class="radio-label" style="padding-left:0;">{{ $t('sysManage.functionalstatus') }} </label>
        <el-select v-model="listQuery.status" :placeholder="$t('common.selectRemind')" clearable style="width: 90px" class="filter-item">
            <el-option v-for="item in funcStatusOptions" :key="item.key" :label="item.display_name" :value="item.key" />
        </el-select>
        <el-button v-waves class="filter-item" icon="el-icon-search" @click="handleFilter" style="margin-left:20px">
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
      :data="dataTreeGrid"
      v-loading="listLoading"
      border
      fit
      height="100px"
      v-adaptive="{bottomOffset: 38}"
      highlight-current-row
      style="width:100%;overflow:auto"
      :row-style="{height:'35px'}"
      :cell-style="{padding:'0'}"
      row-key="num"
    >
      <el-table-column :label="$t('common.no')" prop="id" align="center" width="120">
        <template slot-scope="{row}">
          <span>{{ row.num }}</span>
        </template>
      </el-table-column>
       <el-table-column :label="$t('sysManage.Functionname')">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="URL">
        <template slot-scope="{row}">
          <span>{{ row.url }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('dicManage.upateDate')" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.timestamp | datesformat('YYYY-MM-DD HH:mm') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('sysManage.functionalstatus')" width="110px" align="center">
        <template slot-scope="{row}">
          <el-tag>{{ row.funcStatus | funcStatusFilter }}</el-tag>
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
 
    <el-dialog width="80%" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :append-to-body="true">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:20px;">
         <el-form-item :label="$t('sysManage.Functionnumber')" prop="code" label-width="150px">
          <el-input v-model="temp.num" />
        </el-form-item>
        <el-form-item :label="$t('sysManage.Functionname')" prop="name" label-width="150px">
          <el-input v-model="temp.name" />
        </el-form-item>
         <el-form-item label="URL" label-width="150px">
          <el-input v-model="temp.url" />
        </el-form-item>
        <el-form-item :label="$t('sysManage.Parentmenu')" prop="parent" label-width="150px">
          <el-select v-model="temp.parent" class="filter-item" :placeholder="$t('common.selectRemind')" style="width:250px">
            <el-option v-for="item in funcParentOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('sysManage.functionalstatus')" prop="funcStatus" label-width="150px">
          <el-select v-model="temp.funcStatus" class="filter-item" :placeholder="$t('common.selectRemind')" style="width:250px">
            <el-option v-for="item in funcStatusOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('common.memo')" label-width="150px">
          <el-input v-model="temp.remark" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" :placeholder="$t('common.inputRemind')" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{$t('common.close')}}
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
        {{ $t('common.save') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { funcList, createSysFunc, updateSysFunc } from '@/api/sysManage'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import adaptive from '@/directive/el-table'
const funcStatusOptions = [
  { key: '1', display_name: '启用' },
  { key: '0', display_name: '冻结' }
]
const funcParentOptions = [
  { key: '0', display_name: '-无-' },
  { key: '1', display_name: '系统管理' },
  { key: '101', display_name: '系统管理=>用户管理' },
  { key: '102', display_name: '系统管理=>角色管理' },
  { key: '2', display_name: '船公司管理' },
  { key: '3', display_name: '船队管理' },
  { key: '301', display_name: '船队管理=>船舶列表' }
]
const funcStatusKeyValue = funcStatusOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'FuncManage',
  components: { Pagination },
  directives: { waves ,adaptive },
  filters: {
    funcStatusFilter(status) {
      return funcStatusKeyValue[status]
    }
  },
  data() {
    return {
      tableKey: 0,
      dataTreeGrid: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        name: '',
        status: ''
      },
      funcStatusOptions,
      funcParentOptions,
      temp: {
        id: undefined,
        num: 1,
        timestamp: new Date(),
        name: '',
        code: '',
        url: '',
        funcStatus: '',
        remark: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新增'
      },
      rules: {
        code: [{ required: true, message: '必填项', trigger: 'blur' }],
        name: [{ required: true, message: '必填项', trigger: 'blur' }],
        url: [{ required: true, message: '必填项', trigger: 'blur' }],
        funcStatus: [{ required: true, message: '必填项', trigger: 'change' }],
        parent: [{ required: true, message: '必填项', trigger: 'change' }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      funcList(this.listQuery).then(response => {
        debugger
        this.dataTreeGrid = response.data.items
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
    resetTemp() {
      this.temp = {
        id: undefined,
        num: '',
        timestamp: new Date(),
        name: '',
        code: '',
        url: '',
        funcStatus: '',
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
          createSysFunc(this.temp).then(() => {
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
          updateSysFunc(tempData).then(() => {
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
    }
  }
}
</script>
