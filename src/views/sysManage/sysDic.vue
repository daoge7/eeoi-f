<template>
  <div class="app-container">
    <div class="filter-container">
      <div style="display:inline-block;">
        <label class="radio-label" style="padding-left:0;">{{$t('sysManage.Dictionary')}}</label>
        <el-input v-model="listQuery.name" :placeholder="$t('sysManage.keywords')" style="width: 250px;" class="filter-item" @keyup.enter.native="handleFilter" />
        <label class="radio-label" style="padding-left:0;">{{ $t('sysManage.Dictionarystatus') }} </label>
        <el-select v-model="listQuery.status" :placeholder="$t('common.selectRemind')" clearable style="width: 150px" class="filter-item">
            <el-option v-for="item in dicStatusOptions" :key="item.key" :label="item.display_name" :value="item.key" />
        </el-select>
        <el-button v-waves class="filter-item" icon="el-icon-search" @click="handleFilter" style="margin-left:20px">
            {{ $t('MRV.query') }}
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
      height="100px"
      v-adaptive="{bottomOffset: 38}"
      highlight-current-row
      style="width:100%;overflow:auto"
      :row-style="{height:'35px'}"
      :cell-style="{padding:'0'}"
    >
       <el-table-column :label="$t('sysManage.Dictionaryidentification')">
        <template slot-scope="{row}">
          <span>{{ row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('sysManage.Dictionarytitle')">
        <template slot-scope="{row}">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
       <el-table-column :label="$t('sysManage.Dictionarytype')" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.dicType | dicTypeFilter }}</span>
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
      <el-table-column :label="$t('sysManage.Dictionarystatus')" width="110px" align="center">
        <template slot-scope="{row}">
          <el-tag>{{ row.dicStatus | dicStatusFilter }}</el-tag>
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
            {{ $t('common.batchDel') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" style="margin:0px;padding:0px" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :append-to-body="true" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:20px;">
         <el-form-item :label="$t('sysManage.Dictionaryidentification')" prop="code" label-width="150px">
          <el-input v-model="temp.code" />
        </el-form-item>
        <el-form-item :label="$t('sysManage.Dictionarytitle')" prop="title" label-width="150px">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item :label="$t('sysManage.Dictionarytype')" label-width="150px" prop="dicType">
          <el-select v-model="temp.dicType" class="filter-item" :placeholder="$t('common.selectRemind')" style="width:250px">
            <el-option v-for="item in dicTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('sysManage.Dictionarystatus')" label-width="150px" prop="dicStatus">
          <el-select v-model="temp.dicStatus" class="filter-item" :placeholder="$t('common.selectRemind')" style="width:250px">
            <el-option v-for="item in dicStatusOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('sysManage.Dictionaryvalue')" label-width="150px" prop="dicValue">
          <el-input v-model="temp.dicValue" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" :placeholder="$t('common.inputRemind')" />
        </el-form-item>
        <el-form-item :label="$('common.memo')" label-width="150px">
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
import { dicList, createSysDic, updateSysDic } from '@/api/sysManage'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import adaptive from '@/directive/el-table'
const dicStatusOptions = [
  { key: '1', display_name: '启用' },
  { key: '0', display_name: '冻结' }
]

const dicTypeOptions = [
  { key: '1', display_name: '键值对' },
  { key: '2', display_name: '其它' }
]

const dicStatusKeyValue = dicStatusOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})
const dicTypeKeyValue = dicTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'DicManage',
  components: { Pagination },
  directives: { waves ,adaptive },
  filters: {
    dicStatusFilter(status) {
      return dicStatusKeyValue[status]
    },
    dicTypeFilter(status) {
      return dicTypeKeyValue[status]
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
        name: '',
        status: ''
      },
      dicStatusOptions,
      dicTypeOptions,
      temp: {
        id: undefined,
        createTimestamp: new Date(),
        updateTimestamp: new Date(),
        code: '',
        title: '',
        dicStatus: '',
        dicType: '',
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
        title: [{ required: true, message: '必填项', trigger: 'blur' }],
        dicStatus: [{ required: true, message: '必填项', trigger: 'change' }],
        dicType: [{ required: true, message: '必填项', trigger: 'change' }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      dicList(this.listQuery).then(response => {
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
    resetTemp() {
      this.temp = {
        id: undefined,
        createTimestamp: new Date(),
        updateTimestamp: new Date(),
        code: '',
        title: '',
        dicStatus: '',
        dicType: '',
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
          createSysDic(this.temp).then(() => {
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
          updateSysDic(tempData).then(() => {
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
