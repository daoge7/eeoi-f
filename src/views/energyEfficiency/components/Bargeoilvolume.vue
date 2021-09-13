<template>
  <el-form ref="oilForm" :rules="oilRules" :model="oilForm">
    <el-table :data="oilFormData" stripe border style="width: 100%" size="mini">
      <el-table-column :label="$t('voyageOil.oilType')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.oilName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('voyageOil.Bargeoilvolume')" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.outTons" class="el_input" type="number" oninput="if(isNaN(value)) { value = parseFloat(value) } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+4)}" :readonly="readOnly"/>
        </template>
      </el-table-column>
      <el-table-column :label="$t('voyageOil.Oiltransfertime')" align="center">
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
import {getFuelType, savemanuinfor} from "../../../api/requestGet";
export default {
  name: 'Bargeoilvolume',
  props: {
     times: {
   },
   timeEnd: {}
    // portRowModel: {
    //   type: Object,
    //   default: () => {}
    // }
  },
  data() {
    return {
      shipId: '',
      Bargeoilvolume: [],
      readOnly:false,
      oilFormData: [
       // {
        //   id: '',  //记录id
        //   oilId: '',
        //   oilName: '',
        //   outTons: '',
        //   outTm: '',
        // }
      ],
      oilRules: {
      },
       tempOilFormdata:[],
      oilForm: {},
      pickerOptionsEndportTemp: {
        disabledDate: time => {
          let val = this.times
          let vas = this.timeEnd
          if(val && vas) {
             return time.getTime() < new Date(val).getTime() - 8.64e7 || time.getTime() > new Date(vas).getTime();//如果没有后面的-8.64e7就是不可以选择今天的
          }
          }
      }
    }
  },
  watch:{
    shipId(val) {
      if(val) {
        console.log(857)
        this.getFuelList(val)
      } else {
        // this.initsaves()
        console.log(524)
      }
    }
  },
  created() {
  },
  methods: {
    addClick(row, index) {
      let list =  {
          id: row.id,
          oilId: row.oilId,
          oilName: row.oilName,
          outTons: row.outTons,
          outTm: row.outTm
         }
        this.oilFormData.splice(index, 0, list)
      },
      deleteClick(row,index){
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

      },
    initsave() {
      let oilFormDatas= []
      let tempOilFormdatas = []
       savemanuinfor().then(res =>{
          for(let item of res.data.data.items){
          var fuelOil = {
            id:'',
            oilId:'',
            oilName:'',
            arrTons:0,
            deptTons:0,
            addTons:0,
            addBillNo:'',
            addTm:null,
            outTons:0,
            outTm:null,
            correctTons:0
          }
           var fuelOild = {
            id:'',
            oilId:'',
            oilName:'',
            arrTons:0,
            deptTons:0,
            addTons:0,
            addBillNo:'',
            addTm:null,
            outTons:0,
            outTm:null,
            correctTons:0
          }
          fuelOil.id=item.id
          fuelOil.oilId=item.fuelCode
          fuelOil.oilName=item.fuelName
          fuelOild.id=item.id
          fuelOild.oilId=item.fuelCode
          fuelOild.oilName=item.fuelName
          oilFormDatas.push(fuelOil)
          tempOilFormdatas.push(fuelOild)
        }
         this.oilFormData = oilFormDatas
         this.tempOilFormdata = tempOilFormdatas
        if(this.Bargeoilvolume.length > 0) {
          let addsData =[]
        let oilId = this.Bargeoilvolume.map(item => item.oilId)
        let add=this.oilFormData.filter(item=>!oilId.some(ele=>ele===item.oilId))
        this.oilFormData = add.concat(this.Bargeoilvolume)
        }
        })
    },
    initDat() {
    this.oilFormData.length = 0
    this.tempOilFormdata.length = 0
    },
    getFuelList(shipId){
      getFuelType(shipId).then(response=>{
        if(response.data.data.length == 0) {
           this.initsave()
        } else {
          let oilFormDatas= []
          let tempOilFormdatas = []
          response.data.data.forEach(item => {
              var fuelOil = {
            id:'',
            oilId:'',
            oilName:'',
            arrTons:0,
            deptTons:0,
            addTons:0,
            addBillNo:'',
            addTm:null,
            outTons:0,
            outTm:null,
            correctTons:0
          }
           var fuelOild = {
            id:'',
            oilId:'',
            oilName:'',
            arrTons:0,
            deptTons:0,
            addTons:0,
            addBillNo:'',
            addTm:null,
            outTons:0,
            outTm:null,
            correctTons:0
          }
          fuelOil.id=item.id
          fuelOil.oilId=item.fuelCode
          fuelOil.oilName=item.fuelName
          fuelOild.id=item.id
          fuelOild.oilId=item.fuelCode
          fuelOild.oilName=item.fuelName
          oilFormDatas.push(fuelOil)
          tempOilFormdatas.push(fuelOild)
          })
        this.oilFormData = oilFormDatas
          this.tempOilFormdata = tempOilFormdatas
        if(this.Bargeoilvolume.length > 0) {
          let addsData =[]
        let oilId = this.Bargeoilvolume.map(item => item.oilId)
         let add=this.oilFormData.filter(item=>!oilId.some(ele=>ele===item.oilId))
        this.oilFormData = add.concat(this.Bargeoilvolume)
        }
        }

      })
    }
  }
}
</script>
<style  >
  .el_input input{
    padding: 2px;
  }
</style>
