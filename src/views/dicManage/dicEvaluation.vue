<template>
  <div class="app-container">
    <div class="filter-container">
      <div style="display:inline-block;">
        <el-button class="filter-item" style="margin-top: 10px;" type="primary" icon="el-icon-plus" @click="handleCreate">
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
      <el-table-column :label="$t('dicManage.num')" width="60" align="center">
        <template slot-scope="{row}">
          <span>{{ row.num }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('dicManage.evaluaParam')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.paramName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('dicManage.paramValue')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.paramValue }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('dicManage.upateDate')" width="150" align="center">
        <template slot-scope="{row}">
          <span>{{ row.upateDate }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('common.operate')" align="center" width="180" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            {{ $t('common.update') }}
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row)">
            {{ $t('common.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" style="margin:0px;padding-left:0px" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog width="80%" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :append-to-body="true" :close-on-click-modal="false">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width:80%">
        <el-form-item :label="$t('dicManage.paramName')" prop="paramName">
          <el-input v-model="temp.paramName" :placeholder="$t('common.inputRemind')" />
        </el-form-item>
        <el-form-item :label="$t('dicManage.paramValue')" prop="paramValue">
          <el-input v-model="temp.paramValue" :placeholder="$t('common.inputRemind')" />
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
import { postFormData } from '@/api/requestPost'
import { getQueryPage } from '@/api/requestGet'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import adaptive from '@/directive/el-table'
const dicStatusOptions = [
  { key: '1', display_name: '启用' },
  { key: '0', display_name: '冻结' }
]
const dicStatusKeyValue = dicStatusOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'dicEvaluation',
  components: { Pagination },
  directives: { adaptive },
  filters: {
    dicStatusFilter(status) {
      return dicStatusKeyValue[status]
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
        limit: 10
      },
      dicStatusOptions,
      temp: {
        shipType: undefined,
        subShipTypeCode: undefined,
        subShipTypeName: undefined,
        remark: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: this.$t('common.edit'),
        create: this.$t('common.add')
      },
      rules: {
        paramName: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'change' }],
        paramValue: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      var url = '/dicManage/dicEvaluationList'
      getQueryPage(url, this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 100)
      })
    },
    resetTemp() {
      this.temp = {
        shipType: '',
        subShipTypeCode: '',
        subShipTypeName: '',
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
          var url = '/dicManage/create'
          postFormData(url, this.temp).then(() => {
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
          var url = '/dicManage/update'
          postFormData(url, tempData)(tempData).then(() => {
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
    }
  }
}
</script>
