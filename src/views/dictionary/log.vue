<template>
  <div class="app-container">
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      v-adaptive="{bottomOffset: 40}"
      :data="list"
      border
      fit
      height="100px"
      highlight-current-row
      style="width:100%;overflow:auto"
      :row-style="{height:'35px'}"
      :cell-style="{padding:'0'}"
    >
      <el-table-column label="序号" type="index" show-overflow-tooltip width="auto" align="center" />
      <el-table-column :label="$t('log.name')" width="auto" align="center" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('log.lastUpdateTime')" width="auto" align="center" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.createDate }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('common.operate')"
        align="center"
        width="180px"
        class-name="small-padding fixed-width"
        show-overflow-tooltip
      >
        <template slot-scope="{row}">
          <!--          <el-button type="primary" @click="handleUpdate(row)">-->
          <!--            {{ $t('common.edit') }}-->
          <!--          </el-button>-->
          <el-button type="success" show-overflow-tooltip @click="handleModifyStatus(row,'detail')">
            {{ $t('common.detail') }}
          </el-button>
          <!--          <el-button type="danger" show-overflow-tooltip @click="handleDelete(row,'delete')">-->
          <!--            {{ $t('common.delete') }}-->
          <!--          </el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      style="margin:0px;padding-left:0px;"
      :total="total"
      :page.sync="listQuery.pageNum"
      :limit.sync="listQuery.pageSize"
      @pagination="getList"
    />
    <el-dialog
      v-dialogDrag
      v-el-drag-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      custom-class="customwh;"
      width="80%"
      @dragDialog="this.$refs.select.blur()"
      :append-to-body="true"
    >
      <el-form
        ref="dataForm"
        v-loading="loading"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="130px"
        style="width: 100%;"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('log.content')">
              <el-input v-model="temp.content" :autosize="{ minRows: 20, maxRows: 40}" type="textarea" :readonly="dialogStatus=='detail'?true:false" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{ $t('common.close') }}
        </el-button>
        <el-button
          v-if="dialogStatus!='detail'"
          type="primary"
          @click="dialogStatus==='create'?createData():updateData()"
        >
          {{ $t('common.save') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import adaptive from '@/directive/el-table'
import elDragDialog from '@/directive/el-drag-dialog'
import { getQueryPage } from '@/api/requestGet'

export default {
  name: 'log',
  components: { Pagination },
  directives: { waves, adaptive, elDragDialog },
  data() {
    return {
      loading: false,
      total: 3,
      listLoading: false,
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        paramname: '',
        paramvalue: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: this.$t('common.edit'),
        create: this.$t('common.add'),
        detail: this.$t('common.detail')
      },
      list: [],
      temp: {
        name: '',
        createDate: '',
        content: ''
      },
      rules: {
        ageSmall: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
        ageBig: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      var url = '/log/findAllLogFiles'
      getQueryPage(url, this.listQuery).then(response => {
        this.list = response.data.data.items
        this.total = response.data.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    resetTemp() {
      this.temp = {
        name: '',
        lastUpdateTime: '',
        content: ''
      }
    },
    handleFilter() {
      this.getList()
    },
    reset() {
      this.listQuery.enName = ''
      this.listQuery.code = ''
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleUpdate(row) {
      var url = '/log/findAllLogFiles/' + row.id
      getQueryPage(url).then(response => {
        this.temp = response.data.data
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleModifyStatus(row, status) {
      debugger
      this.dialogStatus = status
      this.dialogFormVisible = true
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 2000)
      setTimeout(() => {
        this.temp.content = row.content
      }, 1000)
    }
  }
}
</script>
