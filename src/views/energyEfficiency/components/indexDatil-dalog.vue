<!--
航段详情
-->
<template>
    <el-dialog :title="$t('voyage.Segmentinformation')" :append-to-body="true" :visible.sync="shipComPanyNamevicode.dalog" :before-close="addDetale" width="80%">
      <div class="filter-container">
        <el-form ref="listQuery" :model="listQuery" label-width="185px">
        <el-row>
        <el-col :span="12">
        <el-form-item :label="$t('voyagePort.volageCode')">
            <span>{{ listQuery.taskNu }}</span>
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item :label="$t('voyage.Segmentnumber')">
            <span>{{ listQuery.voyageNu }}</span>
        </el-form-item>
        </el-col>
        </el-row>
        <el-row>
        <el-col :span="12">
        <el-form-item :label="$t('MRV.departure')">
            <span>{{ listQuery.startPort }}</span>
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item :label="$t('MRV.destination')">
            <span>{{ listQuery.endPort }}</span>
        </el-form-item>
        </el-col>
        </el-row>
        <el-row>
        <el-col :span="12">
        <el-form-item :label="$t('MRV.Departuretime')">
            <span>{{ listQuery.startTime }}</span>
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item :label="$t('voyage.endDate')">
            <span>{{ listQuery.endTime }}</span>
        </el-form-item>
        </el-col>
        </el-row>
        <el-row>
        <el-col :span="12">
        <el-form-item :label="$t('voyagePort.specDistance')">
            <span>{{ listQuery.distance }}</span>
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item :label="$t('MRV.Berthingtime')">
            <span>{{ listQuery.stopTime }}</span>
        </el-form-item>
        </el-col>
        </el-row>
        <el-row>
        <el-col :span="12">
        <el-form-item :label="$t('MRV.Speed')">
            <span>{{ listQuery.avgSpeed }}</span>
        </el-form-item>
        </el-col>
        </el-row>
        <el-row>
        <el-col :span="12">
        <el-form-item :label="$t('voyageCargoInfo.cargoTons')">
            <span>{{ listQuery.cargo }}</span>
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item :label="$t('voyageCargoInfo.ballastTons')">
            <span>{{ listQuery.ballest }}</span>
        </el-form-item>
        </el-col>
        </el-row>
        <el-row>
        <el-col :span="12">
        <el-form-item :label="$t('voyageCargoInfo.allBoxNum')">
            <span>{{ listQuery.allBox }}</span>
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item :label="$t('voyageCargoInfo.heavyBoxNum')">
            <span>{{ listQuery.heavyBox }}</span>
        </el-form-item>
        </el-col>
        </el-row>
        <el-row>
        <el-col :span="12">
        <el-form-item :label="$t('ship.Vehicleload')">
            <span>{{ listQuery.cars }}</span>
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item :label="$t('ship.Numberof')">
            <span>{{ listQuery.peoples }}</span>
        </el-form-item>
        </el-col>
        </el-row>
        </el-form>
      </div>
      <el-table
       :data="listQuery.voyageDeitailInfoOilVos"
        border
       style="width: 100%">
    <el-table-column
      prop="oilName"
      :label="$t('ship.fuelId')">
    </el-table-column>
    <el-table-column
      prop="distanceOil"
      :label="$t('ship.Navigation')">
    </el-table-column>
    <el-table-column
      prop="stopOil"
      :label="$t('ship.Parkingconsumption')">
    </el-table-column>
    <el-table-column
      prop="iceOil"
      :label="$t('voyage.Iceconsumption')">
    </el-table-column>
    <el-table-column
      prop="rescueOil"
      :label="$t('voyage.Rescueconsumption')">
    </el-table-column>
  </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDetale">{{ $t('common.close') }}</el-button>
      </div>
    </el-dialog>
</template>

<script>
import { getVoyageDetailInfo } from '@/api/requestGet'
export default {
  name: "openingVolumeDalog",
  components: {
   
  },
  props: {
    shipComPanyNamevicode: {
      type: Object
    }
  },
  data() {
    return {
        listQuery:{
            voyageDeitailInfoOilVos:[]
        }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
        getVoyageDetailInfo(this.shipComPanyNamevicode.id).then(res => {
            console.log(res.data.data)
            this.listQuery = res.data.data
        })
    },
    // 关闭弹框
    addDetale() {
       this.$emit('shipComPanyNameData', false)
    }
  }
};
</script>

<style scoped>
</style>
