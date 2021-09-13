<!-- 期初量详情弹框 -->
<template>
  <el-dialog
    :title="$t('MRV.openingVolume')"
    :append-to-body="true"
    :visible.sync="shipComPanyNamevicodeDetail.dalog"
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
                {{ shipName }}
              </div>
            </el-form-item>
          </el-col>
          <!--时间-->
          <el-col :span="12">
            <el-form-item :label="$t('table.date')">
              {{ listQuery.periodTime | datesformat("YYYY-MM-DD HH:mm:ss") }}
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
              {{ item.fuelTons
              }}<span style="color:red;margin-left:10px;">T</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="addDetale">{{ $t("common.close") }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "OpeningVolumeDetaildalog",
  props: {
    shipComPanyNamevicodeDetail: {
      type: Object
    }
  },
  data() {
    return {
      dialogShipCompanyFormVisibleDetail: false,
      shipName: "", // 船名
      listQuery: {
        shipId: "", // 船舶id
        periodTime: "", // 时间戳
        beginPeriodOils: [] // 油类类型
      },
      listq: {
        shipId: "", // 船舶id
        periodTime: "", // 时间戳
        beginPeriodOils: [] // 油类类型
      }
    };
  },
  created() {
    this.listQuery = this.listq;
    if (Object.keys(this.shipComPanyNamevicodeDetail.opening).length !== 0) {
      this.listQuery.shipId = this.shipComPanyNamevicodeDetail.opening.shipId;
      this.shipName = this.shipComPanyNamevicodeDetail.opening.shipName;
      this.listQuery.periodTime = this.shipComPanyNamevicodeDetail.opening.periodTime;
      this.listQuery.beginPeriodOils = this.shipComPanyNamevicodeDetail.opening.beginPeriodOilDtos;
    }
  },
  methods: {
    // 关闭弹框
    addDetale() {
      this.$emit("shipComPanyNameDataDetali", false);
    }
  }
};
</script>

<style scoped>
.addBox {
  display: flex;
}
</style>
