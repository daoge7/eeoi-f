<template>
  <div class="app-container">
    <div class="filter-container">
      <div style="display:inline-block;">
        <label class="radio-label" style="padding-left:0;">{{ $t('sysManage.Logname') }}</label>
        <el-input v-model="listQuery.name" :placeholder="$t('sysManage.keywords')" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
        <label class="radio-label" style="padding-left:0;">{{$t('voyageSpec.recordType')}}</label>
        <el-select v-model="listQuery.type" :placeholder="$t('common.selectRemind')" clearable style="width: 150px" class="filter-item">
            <el-option v-for="item in logTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
        </el-select>
        <el-button v-waves class="filter-item" icon="el-icon-search" @click="handleFilter" style="margin-left:20px">
            {{ $t('common.query') }}
        </el-button>
        <el-button v-waves class="filter-item" type="info" icon="el-icon-setting"  @click="handleFilter">
            {{ $t('common.reset') }}
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
       <el-table-column :label="$t('sysManage.Logname')" width="200px">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('sysManage.Operator')" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.author }}</span>
        </template>
      </el-table-column>
       <el-table-column :label="$t('sysManage.Logtype')" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.type | logTypeFilter }}</span>
        </template>
      </el-table-column>
       <el-table-column :label="$t('sysManage.Operationtime')" width="180px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.timestamp | datesformat('YYYY-MM-DD HH:mm') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('sysManage.Operationcontent')" width="auto" align="center">
        <template slot-scope="{row}">
          <span>{{ row.content }}</span>
        </template>
      </el-table-column>
      <el-table-column :hidden="$t('common.operate')" align="center" width="150px" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
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
  </div>
</template>

<script>
import { logList, logDetail } from '@/api/sysManage'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import adaptive from '@/directive/el-table'
const logTypeOptions = [
  { key: '1', display_name: '业务日志' },
  { key: '2', display_name: '登录日志' },
  { key: '3', display_name: '系统日志' }
]

const logTypeKeyValue = logTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'SysLog',
  components: { Pagination },
  directives: { waves ,adaptive },
  filters: {
    logTypeFilter(status) {
      return logTypeKeyValue[status]
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
        type: ''
      },
      logTypeOptions
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      logList(this.listQuery).then(response => {
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
    handleDelete(row) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    }
  }
}
</script>
