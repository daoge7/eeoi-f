<template>
  <el-dialog
  :title="$t('ship.Theoretical')"
  :visible.sync="datas.dialogVisible"
  width="80%"
  :append-to-body="true"
  >
  <el-form ref="oiShipInfo" :model="oiShipInfo" label-position="left" label-width="150px" style="width:100%">
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('ship.Rowssection')" prop="cspname">
          <el-input v-model="oiShipInfo.averageSpeed" type="number" :placeholder="$t('common.inputRemind')">
          <i slot="suffix" style="color:red">T</i>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('ship.Dailyfuel')" prop="spname">
          <el-input v-model="oiShipInfo.mainEngineFuelCons" type="number" :placeholder="$t('common.inputRemind')">
          <i slot="suffix" style="color:red">T</i>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('ship.Auxiliarymachine')" prop="imono">
          <el-input v-model="oiShipInfo.auxFuelCons" type="number" :placeholder="$t('common.inputRemind')" >
          <i slot="suffix" style="color:red">T</i>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('ship.boiler')" prop="imono">
          <el-input v-model="oiShipInfo.boilerFuelCons" type="number" :placeholder="$t('common.inputRemind')" >
          <i slot="suffix" style="color:red">T</i>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('ship.Shipasawhole')" prop="imono">
          <el-input v-model="oiShipInfo.shipFuelCons" type="number" :placeholder="$t('common.inputRemind')" >
          <i slot="suffix" style="color:red">T</i>
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>
    </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="close">{{ $t('common.close') }}</el-button>
    <el-button type="primary" @click="save">{{ $t('common.save') }}</el-button>
  </span>
</el-dialog>
</template>

<script>
import {saveAndUpdateTfc} from '@/api/requestPost'
export default {
  name: 'ShipPropeller',
  props: {
     datas: {
        type:Object
     },
     rowData: {
       type:Object
     }
  },
  data() {
    return {
      shipId: '',
      oiShipInfo:{
        id: '',
        shipid: '',
        averageSpeed: '', // 航速
        boilerFuelCons: '', // 锅炉理论油耗
        auxFuelCons: '', // 副机理论油耗
        mainEngineFuelCons: '', // 主机理论油耗
        shipFuelCons: '' // 整体油耗
      },
      oiShipInfos:{
        id: '',
        shipid: '',
        averageSpeed: '', // 航速
        boilerFuelCons: '', // 锅炉理论油耗
        auxFuelCons: '', // 副机理论油耗
        mainEngineFuelCons: '', // 主机理论油耗
        shipFuelCons: '' // 整体油耗
      }
    }
  },
  created() {
    if(this.rowData.shipid !=='') {
        this.oiShipInfo = this.rowData
    }
    console.log(this.rowData,1111111111111111111)
  },
  methods: {
    getlist() {
      this.oiShipInfo.shipid = this.datas.shipId
      saveAndUpdateTfc(this.oiShipInfo).then(res => {
           this.datas.dialogVisible = false
           this.$emit('close', false)
      })
    },
    close() {
        this.$emit('close', false)
    },
    save() {
        if(this.datas.shipId =='') {
            this.$message({
          message: '当前没有填写基本信息,请先填写基本信息',
          type: 'warning'
        });
        }else {
          this.getlist()
        }
       
    } 
  }
}
</script>
