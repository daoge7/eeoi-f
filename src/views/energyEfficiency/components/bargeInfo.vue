<template>
  <el-form ref="oilForm" :rules="oilRules" :model="oilForm">
    <el-table :data="oilFormData" stripe border style="width: 100%" size="mini">
      <el-table-column :label="$t('voyageOil.oilType')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.fuelName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('voyageOil.barge')" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.sludgeTons" class="el_input" type="number" oninput="if(isNaN(value)) { value = parseFloat(value) } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+4)}" :readonly="readOnly"/>
        </template>
      </el-table-column>
      <el-table-column :label="$t('voyageOil.Refutationtime')" align="center">
        <template slot-scope="{row}">
          <el-date-picker
          v-model="row.outTm"
          type="datetime"
          :placeholder="$t('MRV.Selectdatetime')"
          class="el_input"
          :disabled="readOnly"
          format="yyyy-MM-dd HH:mm"
          :picker-options="pickerOptionsEndportTemp"
          >
          </el-date-picker>
        </template>
      </el-table-column>
       <el-table-column :label="$t('common.operate')" align="center" v-if="!readOnly">
        <template slot-scope="scope">
          <el-button type="primary" @click="addClick(scope.row,scope.$index)">{{ $t('common.add') }}</el-button>
          <el-button type="danger" @click="deleteClick(scope.row,scope.$index)">{{ $t('common.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-form>
</template>

<script>
export default {
  name: 'OilTons',
  props: {
    editStatus: {
      type: String,
      default: ''
    },
    portEditRowId: {
      type: String,
      default: ''
    },
       times: {
   },
   timeEnd: {}
  },
  data() {
    return {
      bargeInfo: [],
      readOnly:false,
      oilFormData: [
        {
          id: '',  //记录id
          oilId: '1',
          fuelName: '重油',
          sludgeTons: '',
          outTm: '',
        }
      ],
      oilFormDatas: [
        {
          id: '',  //记录id
          oilId: '1',
          fuelName: '重油',
          sludgeTons: '',
          outTm: '',
        }
      ],
      oilRules: {
      },
      oilForm: {},
      pickerOptionsEndportTemp: {
        disabledDate: time => {
          let val = this.times
          let vas = this.timeEnd
          if(val && vas) {
             return time.getTime() < new Date(val).getTime() - 8.64e7 || time.getTime() > new Date(vas).getTime();//如果没有后面的-8.64e6就是不可以选择今天的
          }
          }
      }
    }
  },
  watch: {
    bargeInfo(val) {
        if(val.length) {
          this.oilFormData = this.bargeInfo
        } else {
          this.initData()
        }
    }
  },
  methods: {
    initdast(){
      this.oilFormData = this.bargeInfo
    },
    initDat() {
       if(this.bargeInfo.length >0) {
          this.oilFormData = this.bargeInfo
       }else {
         this.initData()
       }
    },
      initData() {
        let obj = [
        {
          id: '',  //记录id
          oilId: '1',
          fuelName: '重油',
          sludgeTons: '',
          outTm: '',
        }
      ]
      this.oilFormData = obj
      },
      addClick(row, index) {
        let list = {
          id: '',  //记录id
          oilId: '1',
          fuelName: '重油',
          sludgeTons: '',
          outTm: '',
        }
        this.oilFormData.splice(index, 0, list)
      },
      deleteClick(row,index){
        if(this.oilFormData.length ===1) {
          this.$message({
          message: '该条油料类型为一条，不可进行删除操作',
          type: 'warning'
          })
        } else {
           this.$confirm('此操作将永久删除该油料类型如需想从新添加需要从新选择船舶, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.oilFormData.splice(index,1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
        }
      }
  }
}
</script>
<style  >
  .el_input input{
    padding: 2px;
  }
</style>
