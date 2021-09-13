<template>
  <el-form ref="oilForm" :rules="oilRules" :model="oilForm">
    <el-table :data="oilFormData" stripe border style="width: 100%" size="mini">
      <el-table-column :label="$t('voyageOil.oilType')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.oilName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Statistics.FuelConsumption')" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.consTons" class="el_input" :readonly="readOnly" />
        </template>
      </el-table-column>
      <el-table-column :label="$t('voyageOil.outOil')" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.outTons" class="el_input" :readonly="readOnly" />
        </template>
      </el-table-column>
      <el-table-column :label="$t('voyageOil.outOilTime')" align="center" width="200">
        <template slot-scope="{row}">
          <el-date-picker
            v-model="row.outTm"
            type="datetime"
            :placeholder="$t('MRV.Selectdatetime')"
            class="el_input"
            style="width:90%"
            :disabled="readOnly"
            :picker-options="pickerOptionsEndportTemp"
            format="yyyy-MM-dd HH:mm"
          ></el-date-picker>
          <!-- <el-date-picker v-model="row.outTm" :editable="false" type="datetime"
                  :disabled="readOnly"
                  :picker-options="pickerOptionsEndportTemp"
          :placeholder="$t('common.dateTimeRemind')" style="width:95%" format="yyyy-MM-dd HH:mm"/>-->
        </template>
      </el-table-column>
    </el-table>
  </el-form>
</template>

<script>
import { getFuelType, savemanuinfor } from "../../../api/requestGet";

export default {
  name: "OilTons",
  props: {
    times: {},
    timeEnd: {},
    editStatus: {
      type: String,
      default: "",
    },
    portEditRowId: {
      type: String,
      default: "",
    },
    stabel: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      pickerOptionsEndportTemp: {
        disabledDate: (time) => {
          let val = this.times;
          let vas = this.timeEnd;
          if (val && vas) {
            return (
              time.getTime() < new Date(val).getTime() - 8.64e7 ||
              time.getTime() > new Date(vas).getTime()
            ); //如果没有后面的-8.64e6就是不可以选择今天的
          }
        },
      },
      shipId: "",
      oilTons: [],
      readOnly: false,
      oilFormData: [],
      tempOilFormdata: [],
      oilRules: {},
      oilForm: {},
    };
  },
  watch: {
    shipId(val) {
      if (val) {
        console.log(val,11111111111111111)
        this.getFuelList(val);
      } else {
        this.initsave();
      }
    },
  },
  created() {
    this.oilFormData = [];
    this.tempOilFormdata = [];
  },
  methods: {
    initsave() {
      let oilFormDatas = [];
      let tempOilFormdatas = [];
      savemanuinfor().then((res) => {
        for (let item of res.data.data.items) {
          var fuelOil = {
            id: "",
            oilId: "",
            oilName: "",
            arrTons: 0,
            deptTons: 0,
            addTons: 0,
            addBillNo: "",
            addTm: null,
            outTons: 0,
            outTm: null,
            correctTons: 0,
            consTons: 0,
          };
          var fuelOild = {
            id: "",
            oilId: "",
            oilName: "",
            arrTons: 0,
            deptTons: 0,
            addTons: 0,
            addBillNo: "",
            addTm: null,
            outTons: 0,
            outTm: null,
            correctTons: 0,
            consTons: 0,
          };
          fuelOil.id = item.id;
          fuelOil.oilId = item.fuelCode;
          fuelOil.oilName = item.fuelName;
          fuelOild.id = item.id;
          fuelOild.oilId = item.fuelCode;
          fuelOild.oilName = item.fuelName;
          oilFormDatas.push(fuelOil);
          tempOilFormdatas.push(fuelOild);
        }
        this.oilFormData = oilFormDatas;
        this.tempOilFormdata = tempOilFormdatas;
        if (this.oilTons.length > 0) {
          let addsData = [];
          let oilId = this.oilTons.map((item) => item.oilId);
          let add = this.oilFormData.filter(
            (item) => !oilId.some((ele) => ele === item.oilId)
          );
          this.oilFormData = add.concat(this.oilTons);
        }
      });
    },
    initDat() {
      this.oilFormData.length = 0;
      this.tempOilFormdata.length = 0;
    },
    getFuelList(shipId) {
      getFuelType(shipId).then((response) => {
        if (response.data.data.length == 0) {
          this.initsave();
        } else {
          let oilFormDatas = [];
          let tempOilFormdatas = [];
          response.data.data.forEach((item) => {
            var fuelOil = {
              id: "",
              oilId: "",
              oilName: "",
              arrTons: 0,
              deptTons: 0,
              addTons: 0,
              addBillNo: "",
              addTm: null,
              outTons: 0,
              outTm: null,
              consTons: 0,
            };
            var fuelOild = {
              id: "",
              oilId: "",
              oilName: "",
              arrTons: 0,
              deptTons: 0,
              addTons: 0,
              addBillNo: "",
              addTm: null,
              outTons: 0,
              outTm: null,
              consTons: 0,
            };
            fuelOil.consTons = item.consTons;
            fuelOil.id = item.id;
            fuelOil.oilId = item.fuelCode;
            fuelOil.oilName = item.fuelName;
            fuelOild.id = item.id;
            fuelOild.oilId = item.fuelCode;
            fuelOild.oilName = item.fuelName;
            fuelOild.consTons = item.consTons;
            oilFormDatas.push(fuelOil);
            tempOilFormdatas.push(fuelOild);
          });
          this.oilFormData = oilFormDatas;
          this.tempOilFormdata = tempOilFormdatas;
          if (this.oilTons.length > 0) {
            let addsData = [];
            let oilId = this.oilTons.map((item) => item.oilId);
            let add = this.oilFormData.filter(
              (item) => !oilId.some((ele) => ele === item.oilId)
            );
            this.oilFormData = add.concat(this.oilTons);
          }
        }
      });
    },
  },
};
</script>
<style  >
.el_input input {
  padding: 2px;
}
</style>
