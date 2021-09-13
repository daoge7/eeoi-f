<template>
  <div class="app-container">
    <div class="filter-container">
      <div style="display:inline-block;">
        <label class="radio-label" style="padding-left:0;">{{ $t('dicManage.classAbbrn') }}</label>
        <el-input v-model="listQuery.abbr" :placeholder="$t('dicManage.classAbbrn')" style="width: 150px;" class="filter-item" @keyup.enter.native="handleFilter" />
        <label class="radio-label" style="padding-left:20px;">{{ $t('dicManage.name') }}</label>
        <el-input v-model="listQuery.name" :placeholder="$t('dicManage.name')" style="width: 150px;" class="filter-item" @keyup.enter.native="handleFilter" />
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
      <el-table-column :label="$t('dicManage.classAbbrn')" width="120" align="center">
        <template slot-scope="{row}">
          <span>{{ row.abbrn }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('dicManage.fullName')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.fullName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('dicManage.cnFullName')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.cnFullName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('dicManage.classPhone')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('dicManage.classEmail')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('dicManage.upateDate')" width="100" align="center">
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

    <el-dialog width="80%" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :append-to-body="true" :close-on-click-modal="false" custom-class="customwh" style="height:75%">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="150px" style="width:100%;">
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('dicManage.code')" prop="code">
              <el-input v-model="temp.code" :placeholder="$t('common.inputRemind')" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('dicManage.IACS')" prop="IACS">
              <el-input v-model="temp.IACS" :placeholder="$t('common.inputRemind')" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('dicManage.isIACS')" prop="isIACS">
              <el-input v-model="temp.isIACS" :placeholder="$t('common.inputRemind')" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('dicManage.classAbbrn')" prop="abbrn">
              <el-input v-model="temp.abbrn" :placeholder="$t('common.inputRemind')" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('dicManage.fullName')" prop="fullName">
              <el-input v-model="temp.fullName" :placeholder="$t('common.inputRemind')" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('dicManage.classNation')" prop="nation">
              <el-input v-model="temp.nation" :placeholder="$t('common.inputRemind')" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('dicManage.classPhone')" prop="phone">
              <el-input v-model="temp.phone" :placeholder="$t('common.inputRemind')" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('dicManage.classFax')" prop="fax">
              <el-input v-model="temp.fax" :placeholder="$t('common.inputRemind')" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('dicManage.classTelex')" prop="telex">
              <el-input v-model="temp.telex" :placeholder="$t('common.inputRemind')" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('dicManage.classEmail')" prop="email">
              <el-input v-model="temp.email" :placeholder="$t('common.inputRemind')" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('dicManage.classWebsite')" prop="website">
              <el-input v-model="temp.website" :placeholder="$t('common.inputRemind')" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('dicManage.telegraph')" prop="telegraph">
              <el-input v-model="temp.telegraph" :placeholder="$t('common.inputRemind')" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('dicManage.cnFullName')" prop="cnFullName">
              <el-input v-model="temp.cnFullName" :placeholder="$t('common.inputRemind')" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('dicManage.postCode')" prop="postCode">
              <el-input v-model="temp.postCode" :placeholder="$t('common.inputRemind')" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item :label="$t('dicManage.classAddr')" prop="addr">
          <el-input v-model="temp.addr" :placeholder="$t('common.inputRemind')" />
        </el-form-item>
        <el-form-item :label="$t('dicManage.cnAddr')" prop="cnAddr">
          <el-input v-model="temp.cnAddr" :placeholder="$t('common.inputRemind')" />
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
  name: 'GcClass',
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
        abbr: '',
        name: ''
      },
      dicStatusOptions,
      temp: {
        code: '',
        IACS: '',
        isIACS: '',
        abbrn: '',
        fullName: '',
        nation: '',
        addr: '',
        phone: '',
        fax: '',
        telex: '',
        email: '',
        website: '',
        telegraph: '',
        cnFullName: '',
        cnAddr: '',
        postCode: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: this.$t('common.edit'),
        create: this.$t('common.add')
      },
      rules: {
        code: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
        IACS: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
        isIACS: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
        abbrn: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
        fullName: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
        nation: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
        addr: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
        phone: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
        fax: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
        telex: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
        email: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
        website: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
        telegraph: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
        cnFullName: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
        cnAddr: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
        postCode: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      var url = '/dicManage/gcClassList'
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
      this.listQuery.abbr = ''
      this.listQuery.name = ''
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    resetTemp() {
      this.temp = {
        code: '',
        IACS: '',
        isIACS: '',
        abbrn: '',
        fullName: '',
        nation: '',
        addr: '',
        phone: '',
        fax: '',
        telex: '',
        email: '',
        website: '',
        telegraph: '',
        cnFullName: '',
        cnAddr: '',
        postCode: ''
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
