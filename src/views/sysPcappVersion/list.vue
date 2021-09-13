<template>
  <div class="app-container">
    <div class="filter-container">
      <div style="display:inline-block;">
        <label class="radio-label" style="padding-left:0;">{{ $t('sysPcappVersion.newVersion') }}</label>
        <el-input
          v-model="listQuery.newVersion"
          :placeholder="$t('common.selectRemind')"
          style="width: 200px;"
          class="filter-item"
          @keyup.enter.native="handleFilter"
        />
        <label class="radio-label" style="padding-left:0;">{{ $t('sysPcappVersion.upType') }}</label>
        <el-input
          v-model="listQuery.upType"
          :placeholder="$t('common.selectRemind')"
          style="width: 200px;"
          class="filter-item"
          @keyup.enter.native="handleFilter"
        />
        <el-button
          v-waves
          class="filter-item"
          icon="el-icon-search"
          style="margin-left:20px"
          @click="handleFilter"
        >
         {{ $t('common.query') }}
        </el-button>
        <el-button v-waves class="filter-item" type="info" icon="el-icon-setting" @click="reset">
          {{ $t('common.reset') }}
        </el-button>
      </div>
      <div style="margin-top:20px;">
        <el-button
          class="filter-item"
          style="margin-left: 10px;"
          type="primary"
          icon="el-icon-plus"
          @click="handleCreate"
        >
          {{ $t('common.add') }}
        </el-button>
      </div>
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      v-adaptive="{bottomOffset: 38}"
      :data="list"
      border
      fit
      height="100px"
      highlight-current-row
      style="width:100%;overflow:auto"
      :row-style="{height:'35px'}"
      :cell-style="{padding:'0'}"
      @sort-change="sortChange"
    >
      <el-table-column :label="$t('common.no')" type="index" show-overflow-tooltip width="50" align="center" />
      <el-table-column :label="$t('sysPcappVersion.sysCode')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.sysCode | docsysCodeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('sysPcappVersion.preVersion')" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.preVersion }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('sysPcappVersion.newVersion')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.newVersion }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('sysPcappVersion.upType')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.upType | upTypeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('sysPcappVersion.recStatus')" align="center">
        <template slot-scope="{row}">
          <el-tag>{{ row.recStatus | docStatusFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('common.creator')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.creator }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('common.createdTime')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.createTm | datesformat('YYYY-MM-DD HH:mm') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('common.operator')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.opuser }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('common.operatedTime')" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.opdate | datesformat('YYYY-MM-DD HH:mm') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('common.operate')" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="userDetail2(row,'edit')">
            {{ $t('common.edit') }}
          </el-button>
          <el-button size="mini" type="success" @click="userDetail2(row,'detail')">
            {{ $t('common.detail') }}
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row)">
            {{ $t('common.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.pageNum"
      :limit.sync="listQuery.pageSize"
      @pagination="getList"
    />
    <div>
      <sysPcappVersion ref="child" @inidData="inidData" />
    </div>
  </div>
</template>

<script>
import { getQueryPage } from '@/api/requestGet'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import adaptive from '@/directive/el-table'
import elDragDialog from '@/directive/el-drag-dialog'
import sysPcappVersion from '@/views/sysPcappVersion/sysPcappVersion-dialog'

const recStatusOptions = [
  { key: 0, display_name: '拟稿' },
  { key: 1, display_name: '发布' },
  { key: 2, display_name: '失效' }
]
const sysCodeOptions = [
  { key: '01', display_name: 'PC' },
  { key: '02', display_name: 'App' }
]
const upTypeOptions = [
  { key: '0', display_name: '全量' },
  { key: '1', display_name: '增量' }
]
const recStatusKeyValue = recStatusOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

const sysCodeOptionsKeyValue = sysCodeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

const upTypeOptionsKeyValue = upTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'PcAppMng',
  // eslint-disable-next-line vue/no-unused-components
  components: { Pagination, sysPcappVersion },
  directives: { waves, adaptive, elDragDialog },
  filters: {
    docStatusFilter(status) {
      return recStatusKeyValue[status]
    },
    docsysCodeFilter(status) {
      return sysCodeOptionsKeyValue[status]
    },
    upTypeFilter(status) {
      return upTypeOptionsKeyValue[status]
    }
  },
  props: {
    datascndoc: {
      type: Boolean
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      total2: 0,
      listLoading: true,
      recStatusOptions,
      upTypeOptions,
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        newVersion: '',
        upType: ''
      },
      downloadFile: {
        path: '',
        fileName: ''
      },
      userRoleOptions: [],
      currentFile: { fileId: '' },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新增',
        detail: '详情'
      },
      tableChecked: [],
      tableChecked2: [],
      fileList: [],
      readonly: false,
      btnShow: true
    }
  },
  created() {
    this.getList()
  },
  methods: {
    inidData() {
      this.getList()
    },
    getList() {
      this.listLoading = true
      var url = '/sysPcappVersion/findSysPcappVersionList'
      getQueryPage(url, this.listQuery).then(response => {
        this.list = response.data.data.items
        this.total = response.data.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    handleFilter() {
      this.listQuery.pageNum = 1
      this.getList()
    },
    reset() {
      this.listQuery = {
        pageNum: 1,
        pageSize: 20,
        newVersion: '',
        upType: ''
      }
      this.getList()
    },
    handleCreate() {
      this.$refs.child.handleCreate()
    },
    userDetail2(row, status) {
      this.$refs.child.userDetail2(row, status)
    },
    handleDelete(row) {
      this.$refs.child.handleDelete(row)
    }
  }
}
</script>
