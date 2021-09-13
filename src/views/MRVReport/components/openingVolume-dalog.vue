<!-- 期初量弹框 -->
<template>
  <el-dialog
    :title="$t('MRV.openingVolume')"
    :append-to-body="true"
    :visible.sync="shipComPanyNamevicode.dalog"
    :before-close="addDetale"
    width="80%"
  >
    <div class="filter-container">
      <el-form ref="listQuery" :model="listQuery" label-width="175px">
        <el-row>
          <!--船舶名称-->
          <el-col :span="12">
            <el-form-item :label="$t('MRV.Nameofvessel')">
              <div class="addBox">
                <el-input
                  v-model="shipName"
                  disabled
                  :placeholder="$t('MRV.boxselect')"
                  style="width:145px;"
                />
                <el-button
                  type="primary"
                  style="margin-left:20px"
                  @click="addImon"
                >
                  {{ $t("common.select") }}
                </el-button>
              </div>
            </el-form-item>
          </el-col>
          <!--时间-->
          <el-col :span="12">
            <el-form-item :label="$t('table.date')">
              <el-date-picker
                v-model="listQuery.periodTime"
                type="datetime"
                :placeholder="$t('MRV.Selectdatetime')"
                style="width：220px"
                format="yyyy-MM-dd HH:mm"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col
            v-for="(item, index) in listQuery.beginPeriodOils"
            :key="index"
            :span="12"
          >
            <el-form-item :label="item.fuelName">
              <el-input
                v-model="item.fuelTons"
                type="Number"
                :placeholder="$t('common.inputRemind')"
                style="width:220px;"
              >
                <i slot="suffix" style="color:red">T</i>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 增加变量 -->
        <el-row
          v-if="
            listQuery.beginPeriodOils && listQuery.beginPeriodOils.length > 0
          "
        >
          <el-col :span="24"
            ><el-form-item label="公司变更"
              ><span>变更前</span
              ><span class="under-line">{{ other.flagThreeCodeOld }}</span
              ><span>变更后</span
              ><span class="under-line">{{
                other.flagThreeCodeNew
              }}</span></el-form-item
            ></el-col
          >
          <el-col :span="24"
            ><el-form-item label="船旗变更"
              ><span>变更前</span
              ><span class="under-line">{{ other.oldDocName }}</span
              ><span>变更后</span
              ><span class="under-line">{{
                other.newDocName
              }}</span></el-form-item
            ></el-col
          >
        </el-row>
      </el-form>
      <shipSwlectsDelog
        v-if="dialogShipCompanyFormVisible"
        :add="dialogShipCompanyFormVisible"
        @adds="adds"
      />
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="addDetale">{{ $t("common.close") }}</el-button>
      <el-button type="primary" @click="saveRelation">{{
        $t("common.save")
      }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import shipSwlectsDelog from "@/components/ShipComPanySelect/shipSwlects-delog";
import { getFuelType, savemanuinfor, findShipOther } from "@/api/requestGet";
import { saveAndUpdatePeriodOil } from "@/api/requestPost";
export default {
  name: "OpeningVolumeDalog",
  components: {
    shipSwlectsDelog
  },
  props: {
    shipComPanyNamevicode: {
      type: Object
    }
  },
  data() {
    return {
      other: {
        flagThreeCodeOld: "",
        flagThreeCodeNew: "",
        oldDocName: "",
        newDocName: ""
      },

      dialogShipCompanyFormVisible: false,
      shipName: "", // 船名
      listQuery: {
        shipId: "", // 船舶id
        periodTime: "", // 时间戳
        periodId: "", // 期初表id
        beginPeriodOils: [] // 油类类型
      },
      listq: {
        shipId: "", // 船舶id
        periodId: "", // 期初表id
        periodTime: "", // 时间戳
        beginPeriodOils: [] // 油类类型
      }
    };
  },
  created() {
    this.listQuery = this.listq;
    if (Object.keys(this.shipComPanyNamevicode.opening).length !== 0) {
      this.listQuery.shipId = this.shipComPanyNamevicode.opening.shipId;
      this.shipName = this.shipComPanyNamevicode.opening.shipName;
      this.listQuery.periodTime = this.shipComPanyNamevicode.opening.periodTime;
      this.listQuery.periodId = this.shipComPanyNamevicode.opening.periodId;
      this.listQuery.beginPeriodOils = this.shipComPanyNamevicode.opening.beginPeriodOilDtos;
    } else {
    }
  },
  methods: {
    // 获取额外信息
    getOther() {
      if (this.listQuery.shipId) {
        findShipOther(this.listQuery.shipId).then(res => {
          console.log("getOther", res);
          this.other = res.data.data;
        });
      }
    },

    // 关闭弹框
    addDetale() {
      this.$emit("shipComPanyNameData", false);
    },
    // 船名弹框数据
    adds(val) {
      this.shipName = val.name;
      this.listQuery.shipId = val.id;
      this.dialogShipCompanyFormVisible = false;
      if (this.listQuery.shipId) {
        getFuelType(this.listQuery.shipId).then(res => {
          if (res.data.result) {
            this.getOther();
          }

          if (res.data.data.length) {
            this.listQuery.beginPeriodOils = res.data.data;
          } else {
            savemanuinfor().then(res => {
              this.listQuery.beginPeriodOils = res.data.data.items;
            });
          }
        });
      }
    },
    // 保存
    saveRelation() {
      if (this.listQuery.periodTime && this.listQuery.shipId) {
        saveAndUpdatePeriodOil(this.listQuery).then(res => {
          if (res.data.result) {
            this.$emit("shipComPanyNameData", false);
          }
        });
      } else {
        if (this.listQuery.periodTime == "") {
          this.$message({
            message: "请选择时间",
            type: "warning"
          });
        }
        if (this.listQuery.shipId == "") {
          this.$message({
            message: "请选择船舶",
            type: "warning"
          });
        }
      }
    },
    // 船名选择
    addImon() {
      this.dialogShipCompanyFormVisible = true;
    }
  }
};
</script>

<style scoped>
.addBox {
  display: flex;
}

.under-line {
  margin: 0 10px;
  display: inline-block;
  vertical-align: middle;
  min-width: 100px;
  text-decoration: underline;
}
</style>
