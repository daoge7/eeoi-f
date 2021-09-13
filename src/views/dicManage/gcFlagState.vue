<template>
  <div class="app-container">
    <div class="filter-container">
      <div style="display:inline-block;">
        <label class="radio-label" style="padding-left:0;">{{ $t('dicManage.threeCode') }}</label>
        <el-input v-model="listQuery.threeCode" :placeholder="$t('dicManage.threeCode')" style="width: 150px;" class="filter-item" @keyup.enter.native="handleFilter" />
        <label class="radio-label" style="padding-left:20px;">{{ $t('dicManage.gcFlagName') }}</label>
        <el-input v-model="listQuery.gcFlagName" :placeholder="$t('dicManage.gcFlagName')" style="width: 150px;" class="filter-item" @keyup.enter.native="handleFilter" />
        <label class="radio-label" style="padding-left:20px;">{{ $t('dicManage.gcFlagBrief') }}</label>
        <el-input v-model="listQuery.gcFlagBrief" :placeholder="$t('dicManage.gcFlagBrief')" style="width: 150px;" class="filter-item" @keyup.enter.native="handleFilter" />
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
          {{ $t('common.search') }}
        </el-button>
        <el-button class="filter-item" type="info" icon="el-icon-setting" @click="handleReset">
          {{ $t('common.reset') }}
        </el-button>
      </div>
      <div style="margin-top:5px;">
        <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="handleCreate">
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
      <el-table-column :label="$t('dicManage.threeCode')" width="120" align="center">
        <template slot-scope="{row}">
          <span>{{ row.threeCode }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('dicManage.nameEn')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.nameEn }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('dicManage.nameCn')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.nameCn }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('dicManage.briefEn')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.briefEn }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('dicManage.briefCn')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.briefCn }}</span>
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
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('dicManage.ISOCode')" prop="ISOCode">
              <el-input v-model="temp.ISOCode" :placeholder="$t('common.inputRemind')" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('dicManage.isAuthorizedCountry')" prop="isAuthorizedCountry">
              <el-radio-group v-model="temp.isAuthorizedCountry">
                <el-radio :label="1">{{ $t('dicManage.yes') }}</el-radio>
                <el-radio :label="0">{{ $t('dicManage.no') }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('dicManage.briefCn')" prop="briefCn">
              <el-input v-model="temp.briefCn" :placeholder="$t('common.inputRemind')" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('dicManage.briefEn')" prop="briefEn">
              <el-input v-model="temp.briefEn" :placeholder="$t('common.inputRemind')" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('dicManage.nameCn')" prop="nameCn">
              <el-input v-model="temp.nameCn" :placeholder="$t('common.inputRemind')" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('dicManage.nameEn')" prop="nameEn">
              <el-input v-model="temp.nameEn" :placeholder="$t('common.inputRemind')" />
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

const dicStatusKeyValue = dicStatusOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'GcFlagState',
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
        limit: 10,
        threeCode: '',
        gcFlagName: '',
        gcFlagBrief: ''
      },
      dicStatusOptions,
      temp: {
        ISOCode: '',
        nameEn: '',
        nameCn: '',
        briefEn: '',
        briefCn: '',
        twoCode: '',
        threeCode: '',
        isAuthorizedCountry: '',
        remark: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: this.$t('common.edit'),
        create: this.$t('common.add')
      },
      rules: {
        ISOCode: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
        nameEn: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
        nameCn: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
        briefEn: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
        briefCn: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
        twoCode: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
        threeCode: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
        isAuthorizedCountry: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'change' }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      var url = '/dicManage/gcFlagStateList'
      getQueryPage(url, this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 100)
      })
    },
    handleReset() {
      this.listQuery.page = 1
      this.listQuery.threeCode = ''
      this.listQuery.gcFlagName = ''
      this.listQuery.gcFlagBrief = ''
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    resetTemp() {
      this.temp = {
        ISOCode: '',
        nameEn: '',
        nameCn: '',
        briefEn: '',
        briefCn: '',
        twoCode: '',
        threeCode: '',
        isAuthorizedCountry: '',
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
