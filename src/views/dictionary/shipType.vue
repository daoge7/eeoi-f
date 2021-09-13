<template>
  <div class="app-container">
    <div class="filter-container">
      <div style="display:inline-block;">
        <label class="radio-label" style="padding-left:0;">{{ $t('dictionary.shipType.euSptype') }}</label>
        <el-input
          v-model="listQuery.euSptype"
          :placeholder="$t('dictionary.shipType.euSptype')"
          style="width: 200px;"
          class="filter-item"
          @keyup.enter.native="handleFilter"
        />
        <label class="radio-label" style="padding-left:0;">{{ $t('dictionary.shipType.csptype') }}</label>
        <el-input
          v-model="listQuery.csptype"
          :placeholder="$t('dictionary.shipType.csptype')"
          style="width: 200px;"
          class="filter-item"
          @keyup.enter.native="handleFilter"
        />
        <el-button
          v-waves
          class="filter-item"
          icon="el-icon-search"
          @click="handleFilter"
        >
          {{ $t('common.search') }}
        </el-button>
        <el-button
          v-waves
          class="filter-item"
          type="info"
          icon="el-icon-setting"
          @click="reset"
        >
          {{ $t('common.reset') }}
        </el-button>
        <div style="margin-top:5px;">
          <el-button
            class="filter-item"
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
        <el-table-column :label="$t('dictionary.shipType.spcode')" width="auto" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.spcode }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('dictionary.shipType.sptype')" width="auto" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span class="link-type"> <el-link type="info" @click="handleModifyStatus(row,'detail')">{{ row.sptype }}<i class="el-icon-view el-icon--right" /></el-link></span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('dictionary.shipType.csptype')" width="auto" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.csptype }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('dictionary.shipType.imoSptype')" width="auto" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.imoSptype }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('dictionary.shipType.euSptype')" width="auto" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.euSptype }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('common.operate')"
          align="center"
          width="200px"
          class-name="small-padding fixed-width"
          show-overflow-tooltip
        >
          <template slot-scope="{row}">
            <el-button type="primary" @click="handleUpdate(row)">
              {{ $t('common.edit') }}
            </el-button>
            <!--            <el-button type="success" show-overflow-tooltip @click="handleModifyStatus(row,'detail')">-->
            <!--              {{ $t('common.detail') }}-->
            <!--            </el-button>-->
            <el-button type="danger" show-overflow-tooltip @click="handleDelete(row,'delete')">
              {{ $t('common.delete') }}
            </el-button>
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
          :rules="rules"
          :model="temp"
          label-position="left"
          label-width="130px"
          style="width: 100%;"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('dictionary.shipType.spcode')">
                <el-input v-model="temp.spcode" :readonly="dialogStatus=='detail'?true:false" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('dictionary.shipType.sptype')">
                <el-input v-model="temp.sptype" :readonly="dialogStatus=='detail'?true:false" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('dictionary.shipType.csptype')">
                <el-input v-model="temp.csptype" :readonly="dialogStatus=='detail'?true:false" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('dictionary.shipType.imoSptype')">
                <el-input v-model="temp.imoSptype" :readonly="dialogStatus=='detail'?true:false" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('dictionary.shipType.euSptype')">
                <el-input v-model="temp.euSptype" :readonly="dialogStatus=='detail'?true:false" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('dictionary.shipType.remarkInfo')">
                <el-input v-model="temp.remarkInfo" type="textarea" :readonly="dialogStatus=='detail'?true:false" />
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
  </div></template>

<script>
import { postFormData } from '@/api/requestPost'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import adaptive from '@/directive/el-table'
import elDragDialog from '@/directive/el-drag-dialog'
import { getQueryInfo, getQueryPage } from '@/api/requestGet'

export default {
  name: 'shipType',
  components: { Pagination },
  directives: { waves, adaptive, elDragDialog },
  data() {
    return {
      total: 3,
      listLoading: false,
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        euSptype: '',
        csptype: ''
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
        id: '',
        spcode: '',
        sptype: '',
        csptype: '',
        imoSptype: '',
        euSptype: '',
        remarkInfo: ''
      },
      rules: {
        spcode: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
        sptype: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
        csptype: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
        imoSptype: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }],
        euSptype: [{ required: true, message: this.$t('common.inputRequired'), trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      var url = '/shipType/findShipTypeList'
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
        id: '',
        shipTypeCode: '',
        shipTypeName: '',
        carbonConten: '',
        conversion: '',
        remark: ''
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
      var url = '/shipType/findShipTypeById/' + row.id
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
    handleDelete(row, status) {
      if (status === 'delete') {
        if (confirm('确定要删除？') === true) {
          getQueryInfo('/shipType/deleteShipTypeById/' + row.id).then(response => {
            if (response.data.result) {
              this.$notify({
                title: 'Success',
                message: '删除成功',
                type: 'success',
                duration: 2000
              })
              const index = this.list.indexOf(row)
              this.list.splice(index, 1)
              this.total = this.total - 1
            } else {
              this.$notify({
                title: 'Fail',
                message: '删除失败',
                type: 'fail',
                duration: 2000
              })
            }
          })
        }
      }
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          var url = '/shipType/saveOrUpdateShipType'
          postFormData(url, this.temp).then((response) => {
            this.total = this.total + 1
            this.temp.id = response.data.data.id
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
    handleModifyStatus(row, status) {
      var url = '/shipType/findShipTypeById/' + row.id
      getQueryPage(url).then(response => {
        this.temp = response.data.data
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
      this.dialogStatus = 'detail'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.version = +new Date(tempData.version)
          var url = '/shipType/saveOrUpdateShipType'
          postFormData(url, tempData).then(response => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, response.data.data)
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
    }
  }
}
</script>
