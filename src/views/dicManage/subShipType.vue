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
      v-adaptive="{bottomOffset: 38}"
      :data="list"
      border
      fit
      height="100px"
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
      <el-table-column :label="$t('dicManage.subShipTypeCode')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.subShipTypeCode }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('dicManage.subShipTypeName')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.subShipTypeName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('dicManage.shipType')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.shipType | shipTypeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('dicManage.upateDate')" width="100" align="center">
        <template slot-scope="{row}">
          <span>{{ row.upateDate }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('dicManage.remark')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.remark }}</span>
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

    <el-dialog width="80%" :title="textMap[dialogStatus]" :append-to-body="true" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('dicManage.shipType')" prop="shipType">
              <el-select v-model="temp.shipType" class="filter-item" :placeholder="$t('common.selectRemind')" style="width:100%">
                <el-option v-for="item in shipTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('dicManage.subShipTypeCode')" prop="subShipTypeCode">
              <el-input v-model="temp.subShipTypeCode" :placeholder="$t('common.inputRemind')" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('dicManage.subShipTypeName')" prop="subShipTypeName">
              <el-input v-model="temp.subShipTypeName" :placeholder="$t('common.inputRemind')" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item :label="$t('dicManage.remark')">
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
import { postFormData } from '@/api/requestPost'
import { getQueryPage } from '@/api/requestGet'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import adaptive from '@/directive/el-table'
const dicStatusOptions = [
  { key: '1', display_name: '启用' },
  { key: '0', display_name: '冻结' }
]
const shipTypeOptions = [
  { key: '1', display_name: '散货船' },
  { key: '2', display_name: '液货船' },
  { key: '3', display_name: '气体运输船' },
  { key: '4', display_name: '集装箱船' },
  { key: '5', display_name: '滚装货船' },
  { key: '6', display_name: '普通货船' }
]
const dicStatusKeyValue = dicStatusOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})
const shipTypeKeyValue = shipTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'SubShipTypeList',
  components: { Pagination },
  directives: { adaptive },
  filters: {
    dicStatusFilter(status) {
      return dicStatusKeyValue[status]
    },
    shipTypeFilter(type) {
      return shipTypeKeyValue[type]
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
      shipTypeOptions,
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
        shipType: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'change' }],
        subShipTypeCode: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
        subShipTypeName: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      var url = '/dicManage/subShipTypeList'
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
