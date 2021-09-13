<!--Docflag变更-->
<template>
  <el-dialog
    :title="$t('ship.docflagchange')"
    :append-to-body="shipComPanyNamevicode"
    :visible.sync="shipComPanyNamevicode"
    :before-close="addDetales"
    width="80%"
  >
    <el-form ref="listQuery" :model="listQuery" label-width="175px">
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('ship.Changetype')">
            <el-radio v-model="radio" label="1">{{ $t('ship.Flagchange') }}</el-radio>
            <el-radio v-model="radio" label="2">{{ $t('ship.docChange') }}</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <table
      v-if="radio==='1'"
      width="100%"
      align="right"
      border="1"
      cellspacing="0"
      bordercolor="#DCDFE6"
      style="border-collapse:collapse;"
    >
      <tbody class="table-nonb">
        <tr>
          <td>
            <span style="color:red">*</span> {{ $t('ship.shipLangName') }}：
          </td>
          <td>
            <el-input
              :disabled="true"
              v-model="listQuery.shipName"
              :placeholder="$t('common.inputRemind')"
              size="mini"
              style="width:70%"
            ></el-input>
          </td>
          <td>
            <span style="color:red">*</span> IMO.NO：
          </td>
          <td>
            <el-input
              v-model="listQuery.imoNo"
              :disabled="true"
              :placeholder="$t('common.inputRemind')"
              size="mini"
              style="width:70%"
            ></el-input>
          </td>
        </tr>
        <tr>
          <td>
            <span style="color:red">*</span> {{ $t('ship.Originalflag') }}：
          </td>
          <td>
            <el-select
              v-model="listQuery.flagThreeCodeOld"
              filterable
              :placeholder="$t('common.selectRemind')"
              style="width:70%"
            >
              <el-option
                v-for="item in options"
                :key="item.threeCode"
                :label="item.enBrief"
                :value="item.threeCode"
              ></el-option>
            </el-select>
          </td>
          <td>
            <span style="color:red">*</span> {{ $t('ship.Revisedflag') }}：
          </td>
          <td>
            <el-select
              v-model="listQuery.flagThreeCodeNew"
              filterable
              :placeholder="$t('common.selectRemind')"
              style="width:70%"
            >
              <el-option
                v-for="item in options"
                :key="item.threeCode"
                :label="item.enBrief"
                :value="item.threeCode"
              ></el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td>
            <span style="color:red">*</span> {{ $t('ship.effectivedate') }}：
          </td>
          <td>
            <el-date-picker
              v-model="listQuery.effectiveDate"
              type="date"
              :placeholder="$t('common.datePickerRemind')"
              style="width:70%"
            ></el-date-picker>
          </td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <table
      v-if="radio==='2'"
      width="100%"
      border="1"
      cellspacing="0"
      bordercolor="#DCDFE6"
      style="border-collapse:collapse;"
    >
      <tbody class="table-nonb">
        <tr>
          <td>
            <span style="color:red">*</span> {{ $t('ship.shipNameCnNe') }}：
          </td>
          <td>
            <el-input
              :disabled="true"
              v-model="listq.shipName"
              :placeholder="$t('common.inputRemind')"
              size="mini"
              style="width:70%"
            ></el-input>
          </td>
          <td>
            <span style="color:red">*</span> IMO.NO：
          </td>
          <td>
            <el-input
              v-model="listq.imoNo"
              :disabled="true"
             :placeholder="$t('common.inputRemind')"
              size="mini"
              style="width:70%"
            ></el-input>
          </td>
        </tr>
        <tr>
          <td>
            <span style="color:red">*</span> {{ $t('ship.Originalshipmanagement') }}：
          </td>
          <td>
            <el-input
              v-model="shipName"
              :disabled="true"
              :placeholder="$t('common.inputRemind')"
              size="mini"
              style="width:30%"
            ></el-input>
            <el-button type="primary" size="mini" @click="handlSect('0')">{{ $t('common.select') }}</el-button>
            <el-button type="primary" size="mini" @click="handlempty('0')">{{ $t('common.empty') }}</el-button>
          </td>
          <td>
            <span style="color:red">*</span> {{ $t('ship.Revisedshipmanagement') }}：
          </td>
          <td>
            <el-input
              v-model="shipName1"
              :disabled="true"
              :placeholder="$t('common.inputRemind')"
              size="mini"
              style="width:30%"
            ></el-input>
            <el-button type="primary" size="mini" @click="handlSect('1')">{{ $t('common.select') }}</el-button>
            <el-button type="primary" size="mini" @click="handlempty('1')">{{ $t('common.empty') }}</el-button>
          </td>
        </tr>
        <tr>
          <td>
            <span style="color:red">*</span> {{ $t('ship.effectivedate') }}：
          </td>
          <td>
            <el-date-picker
              v-model="listq.effectiveDate"
              type="date"
             :placeholder="$t('common.inputRemind')"
              style="width:70%"
            ></el-date-picker>
          </td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <shipComPanyNameDalog
      v-if="shipDalog"
      :shipComPanyNamevicode="shipDalog"
      @shipComPanyNameData="shipComPanyNameData"
    />
    <shipComPanyNameDalog1
      v-if="shipDalog1"
      :shipComPanyNamevicode="shipDalog1"
      @shipComPanyNameData1="shipComPanyNameData1"
    />
    <div slot="footer" class="dialog-footer">
      <el-button @click="addsave">{{ $t('common.save') }}</el-button>
      <el-button @click="addDetales">{{ $t('common.close') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import shipComPanyNameDalog from "@/components/ShipComPanySelect/shipComPanyName-dalog";
import shipComPanyNameDalog1 from "@/components/ShipComPanySelect/shipComPanyName-dalog1";
import { string } from "jszip/lib/support";
import {
  saveOrUpdateGcState,
  findOiShipInfoByImoNo,
  findFlagDocChangeById,
} from "@/api/requestGet";
import { saveFlagDocChange } from "@/api/requestPost";
export default {
  name: "reportManagementDalog",
  components: {
    shipComPanyNameDalog,
    shipComPanyNameDalog1,
  },
  props: {
    shipComPanyNamevicode: {
      type: Boolean,
    },
    ids: {
      type: String,
    },
    nameImon: {
      type: Object,
    },
  },
  data() {
    return {
      options: [],
      radio: "1",
      shipName: "",
      shipName1: "",
      shipDalog: false,
      shipDalog1: false,
      shipIom: "", // imo号
      listQuery: {
        // flag变更
        id: "",
        changeType: "1",
        shipId: "",
        shipName: "",
        imoNo: "",
        flagThreeCodeOld: "",
        flagThreeCodeNew: "",
        effectiveDate: "",
      },
      listq: {
        // doc
        id: "",
        changeType: "2",
        shipId: "",
        shipName: "",
        imoNo: "",
        docOld: "",
        docNew: "",
        effectiveDate: "",
      },
    };
  },
  watch: {
    radio(val) {
      if (val === "1") {
        if (this.ids) {
          findFlagDocChangeById(this.ids).then((res) => {
            console.log(res.data.data);
            this.listQuery.id = res.data.data.id;
            this.listQuery.shipId = res.data.data.shipId;
            this.listQuery.changeType = "1";
            this.listQuery.effectiveDate = res.data.data.effectiveDate;
            this.listQuery.shipName = res.data.data.shipName;
            this.listQuery.imoNo = res.data.data.imoNo;
            this.listQuery.flagThreeCodeOld = res.data.data.flagThreeCodeOld;
            this.listQuery.flagThreeCodeNew = res.data.data.flagThreeCodeNew;
          });
        } else {
          this.listQuery.shipId = this.nameImon.id;
          this.listQuery.shipName = this.nameImon.name;
          this.listQuery.imoNo = this.nameImon.imono;
        }
      }
      if (val === "2") {
        if (this.ids) {
          findFlagDocChangeById(this.ids).then((res) => {
            this.listq.id = res.data.data.id;
            this.listq.shipId = res.data.data.shipId;
            this.listq.changeType = "2";
            this.listq.effectiveDate = res.data.data.effectiveDate;
            this.listq.shipName = res.data.data.shipName;
            this.listq.imoNo = res.data.data.imoNo;
            this.shipName = res.data.data.oldDocName;
            this.shipName1 = res.data.data.newDocName;
            this.listq.docOld = res.data.data.docOld;
            this.listq.docNew = res.data.data.docNew;
          });
        } else {
          this.listq.shipId = this.nameImon.id;
          this.listq.shipName = this.nameImon.name;
          this.listq.imoNo = this.nameImon.imono;
        }
      }
    },
  },
  created() {
    if (this.nameImon) {
      this.listQuery.shipId = this.nameImon.id;
      this.listQuery.shipName = this.nameImon.name;
      this.listQuery.imoNo = this.nameImon.imono;
      this.listq.shipId = this.nameImon.id;
      this.listq.shipName = this.nameImon.name;
      this.listq.imoNo = this.nameImon.imono;
    }

    this.initsaveOrUpdateGcState();
    if (this.ids) {
      findFlagDocChangeById(this.ids).then((res) => {
        console.log(res.data.data);
        if (res.data.data.changeType === "1") {
          this.radio = res.data.data.changeType;
          this.listQuery.id = res.data.data.id;
          this.listQuery.shipId = res.data.data.shipId;
          this.listQuery.changeType = res.data.data.changeType;
          this.listQuery.effectiveDate = res.data.data.effectiveDate;
          this.listQuery.shipName = res.data.data.shipName;
          this.listQuery.imoNo = res.data.data.imoNo;
          this.listQuery.flagThreeCodeOld = res.data.data.flagThreeCodeOld;
          this.listQuery.flagThreeCodeNew = res.data.data.flagThreeCodeNew;
        }
        if (res.data.data.changeType === "2") {
          this.radio = res.data.data.changeType;
          this.listq.id = res.data.data.id;
          this.listq.shipId = res.data.data.shipId;
          this.listq.changeType = res.data.data.changeType;
          this.listq.effectiveDate = res.data.data.effectiveDate;
          this.listq.shipName = res.data.data.shipName;
          this.listq.imoNo = res.data.data.imoNo;
          this.shipName = res.data.data.oldDocName;
          this.shipName1 = res.data.data.newDocName;
          this.listq.docOld = res.data.data.docOld;
          this.listq.docNew = res.data.data.docNew;
        }
      });
    }
  },
  methods: {
    initsaveOrUpdateGcState() {
      saveOrUpdateGcState().then((res) => {
        this.options = res.data.data.items;
      });
    },
    handlSect(val) {
      if (val === "0") {
        this.shipDalog = true;
      }
      if (val === "1") {
        this.shipDalog1 = true;
      }
    },
    handlempty(val) {
      if (val === "0") {
        this.shipName = "";
        this.listq.docOld = "";
      }
      if (val === "1") {
        this.shipName1 = "";
        this.listq.docNew = "";
      }
    },
    shipComPanyNameData(val) {
      this.shipName = val.name;
      this.listq.docOld = val.id;
      this.shipDalog = false;
    },
    shipComPanyNameData1(val) {
      this.shipName1 = val.name;
      this.listq.docNew = val.id;
      this.shipDalog1 = false;
    },
    addDetales() {
      this.$emit("shipComPanyNameData", false);
    },
    // 保存
    addsave() {
      if (this.radio === "1") {
        if (
          this.listQuery.imoNo &&
          this.listQuery.flagThreeCodeOld &&
          this.listQuery.flagThreeCodeNew &&
          this.listQuery.effectiveDate
        ) {
          saveFlagDocChange(this.listQuery).then((res) => {
            if (res.data.result) {
              this.$message({
                message: "保存成功",
                type: "success",
              });
              this.$emit("shipComPanyNameData", false);
            }
          });
        } else {
          if (this.listQuery.imoNo === "") {
            this.$message({
              message: " IMO.NO不能为空",
              type: "warning",
            });
          }
          if (this.listQuery.flagThreeCodeOld === "") {
            this.$message({
              message: "原船期不能为空",
              type: "warning",
            });
          }
          if (this.listQuery.flagThreeCodeNew === "") {
            this.$message({
              message: "修改后船期不能为空",
              type: "warning",
            });
          }
          if (this.listQuery.effectiveDate === "") {
            this.$message({
              message: "生效日期不能为空",
              type: "warning",
            });
          }
        }
      }
      if (this.radio === "2") {
        if (
          this.listq.imoNo &&
          this.listq.docOld &&
          this.listq.docNew &&
          this.listq.effectiveDate
        ) {
          saveFlagDocChange(this.listq).then((res) => {
            if (res.data.result) {
              this.$message({
                message: "保存成功",
                type: "success",
              });
              this.$emit("shipComPanyNameData", false);
            }
          });
        } else {
          if (this.listq.imoNo === "") {
            this.$message({
              message: " IMO.NO不能为空",
              type: "warning",
            });
          }
          if (this.listq.docOld === "") {
            this.$message({
              message: "原船舶管理公司不能为空",
              type: "warning",
            });
          }
          if (this.listq.docNew === "") {
            this.$message({
              message: "修改后船舶管理公司不能为空",
              type: "warning",
            });
          }
          if (this.listq.effectiveDate === "") {
            this.$message({
              message: "生效日期不能为空",
              type: "warning",
            });
          }
        }
      }
    },
  },
};
</script>

<style scoped>
.addBox {
  display: flex;
}
.table-nonb tr td {
  height: 40px;
  font-size: 10px;
  color: #606266;
  text-align: center;
}
</style>
