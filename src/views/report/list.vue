<template>
  <div class="app-container">
    <div class="filter-container">
      <div style="display:inline-block;">
        <label class="radio-label" style="padding-left:0;">{{
          $t("ship.searchOperator")
        }}</label>
        <el-input
          v-model="shipComPany"
          :placeholder="$t('common.inputRemind')"
          size="mini"
          style="width: 200px;"
          class="filter-item"
          :readonly="true"
          @keyup.enter.native="getList"
        />
        <el-button plain @click="selectComPany">{{
          $t("common.select")
        }}</el-button>
        <label class="radio-label" style="padding-left:30px;">{{
          $t("ship.nameOrimo")
        }}</label>
        <el-input
          v-model="listQuery.shipKeyWord"
          :placeholder="$t('ship.shipIdxKey')"
          size="mini"
          style="width: 200px;"
          class="filter-item"
          @keyup.enter.native="getList"
        />

        <label class="radio-label" style="padding-left:30px;">上报时段</label>
        <el-date-picker
          v-model="shiplistQuery.startTime"
          :editable="true"
          type="date"
          value-format="yyyy-MM-dd 00:00:00"
          align="left"
          style="width:130px"
          :placeholder="$t('common.datePickerRemind')"
        />
        ~
        <el-date-picker
          v-model="shiplistQuery.endTime"
          :editable="true"
          type="date"
          value-format="yyyy-MM-dd 23:59:59"
          align="left"
          style="width:130px"
          :placeholder="$t('common.datePickerRemind')"
        />
      </div>

      <div style="display:inline-block;margin-top:5px;">
        <el-button
          v-waves
          class="filter-item"
          icon="el-icon-search"
          size="mini"
          style="margin-left:20px"
          @click="getList"
        >
          {{ $t("common.search") }}
        </el-button>
        <el-button
          v-waves
          class="filter-item"
          type="info"
          icon="el-icon-setting"
          size="mini"
          @click="handleFilter"
        >
          {{ $t("common.reset") }}
        </el-button>
      </div>
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      v-adaptive="{ bottomOffset: 38 }"
      :data="list"
      border
      fit
      height="100px"
      highlight-current-row
      style="width: 100%; overflow:auto"
      :row-style="{ height: '35px' }"
      :cell-style="{ padding: '0' }"
      @sort-change="sortChange"
      @selection-change="handleSelectionChange"
    >
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <el-table-column
        :label="$t('ship.shipLangName')"
        min-width="150px"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <span>{{ row.spname }}/{{ row.spnameCn }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('ship.imono')"
        min-width="100px"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <span>{{ row.imono }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('ship.registNo')"
        min-width="100px"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <span>{{ row.registerno }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('ship.shipFlag')"
        width="110px"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <span>{{ row.flag }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('ship.sptype')"
        width="110px"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <span>{{ row.shipTypeName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('ship.tableGross')"
        width="110px"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <span>{{ row.dw }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('ship.speed')"
        width="110px"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <span>{{ row.serviceSpeed }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('ship.shipClass')"
        width="110px"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <span>{{ row.class_ }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('ship.iceCode')"
        width="110px"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <span>{{ row.ice }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('common.operate')"
        width="110px"
        align="center"
      >
        <template slot-scope="{ row }">
          <el-button
            size="mini"
            type="warning"
            style="min-width: 80px"
            @click="getshipList(row.id)"
            >查看上报</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      style="margin:0px;padding:0px"
      :total="total"
      :page.sync="listQuery.currentPage"
      :limit.sync="listQuery.pageSize"
      @pagination="getList"
    />

    <ShipComPanySelect ref="ShipComPanySelect" />

    <el-dialog
      title="查看上报信息"
      :visible.sync="shipListVisible"
      :close-on-click-modal="false"
      width="80%"
      center
      :append-to-body="true"
      @close="resetDate()"
    >
      <el-table
        ref="singleTable"
        v-loading="listLoading"
        :data="shipList"
        size="medium"
        max-height="500"
        border
        fit
        style="width: 100%; overflow:auto"
        highlight-current-row
      >
        <el-table-column label="公司航次" show-overflow-tooltip align="center">
          <template slot-scope="{ row }">
            <span>{{ row.task }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="港口（中文）"
          show-overflow-tooltip
          align="center"
        >
          <template slot-scope="{ row }">
            <span>{{ row.portcn }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="港口（英文）"
          show-overflow-tooltip
          align="center"
        >
          <template slot-scope="{ row }">
            <span>{{ row.porten }}</span>
          </template>
        </el-table-column>
        <el-table-column label="港界内/外" show-overflow-tooltip align="center">
          <template slot-scope="{ row }">
            <span>{{ row.inPort ? "港界内" : "港界外" }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="抵达时间（LT）"
          show-overflow-tooltip
          align="center"
        >
          <template slot-scope="{ row }">
            <span>{{ row.arrTm }}</span>
          </template>
        </el-table-column>
        <el-table-column label="抵港时区" show-overflow-tooltip align="center">
          <template slot-scope="{ row }">
            <span>{{ row.arrZone }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="离开时间（LT）"
          show-overflow-tooltip
          align="center"
        >
          <template slot-scope="{ row }">
            <span>{{ row.deptTm }}</span>
          </template>
        </el-table-column>
        <el-table-column label="离港时区" show-overflow-tooltip align="center">
          <template slot-scope="{ row }">
            <span>{{ row.deptZone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="航行距离" show-overflow-tooltip align="center">
          <template slot-scope="{ row }">
            <span>{{ row.distance }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="抵港载货量"
          show-overflow-tooltip
          align="center"
        >
          <template slot-scope="{ row }">
            <span>{{ row.arrTons }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="离港载货量"
          show-overflow-tooltip
          align="center"
        >
          <template slot-scope="{ row }">
            <span>{{ row.deptTons }}</span>
          </template>
        </el-table-column>
        <el-table-column label="抵港HFO量" show-overflow-tooltip align="center">
          <template slot-scope="{ row }">
            <span>{{ row.arrPortHfo }}</span>
          </template>
        </el-table-column>
        <el-table-column label="离港HFO量" show-overflow-tooltip align="center">
          <template slot-scope="{ row }">
            <span>{{ row.deptPortHfo }}</span>
          </template>
        </el-table-column>
        <el-table-column label="HFO加油量" show-overflow-tooltip align="center">
          <template slot-scope="{ row }">
            <span>{{ row.addHfo }}</span>
          </template>
        </el-table-column>
        <el-table-column label="HFO驳出量" show-overflow-tooltip align="center">
          <template slot-scope="{ row }">
            <span>{{ row.outHfo }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="抵港 MDO/MGO量"
          show-overflow-tooltip
          align="center"
        >
          <template slot-scope="{ row }">
            <span>{{ row.arrPortM }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="离港 MDO/MGO量"
          show-overflow-tooltip
          align="center"
        >
          <template slot-scope="{ row }">
            <span>{{ row.deptPortM }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="MDO/MGO 加油量"
          show-overflow-tooltip
          align="center"
        >
          <template slot-scope="{ row }">
            <span>{{ row.addM }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="MDO/MGO 驳出量"
          show-overflow-tooltip
          align="center"
        >
          <template slot-scope="{ row }">
            <span>{{ row.outM }}</span>
          </template>
        </el-table-column>
        <el-table-column label="抵港LFO量" show-overflow-tooltip align="center">
          <template slot-scope="{ row }">
            <span>{{ row.arrPortLfo }}</span>
          </template>
        </el-table-column>
        <el-table-column label="离港LFO量" show-overflow-tooltip align="center">
          <template slot-scope="{ row }">
            <span>{{ row.deptPortLfo }}</span>
          </template>
        </el-table-column>
        <el-table-column label="LFO加油量" show-overflow-tooltip align="center">
          <template slot-scope="{ row }">
            <span>{{ row.addLfo }}</span>
          </template>
        </el-table-column>
        <el-table-column label="LFO驳出量" show-overflow-tooltip align="center">
          <template slot-scope="{ row }">
            <span>{{ row.outLfo }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { getQueryPage } from "@/api/requestGet";
import waves from "@/directive/waves"; // waves directive
import adaptive from "@/directive/el-table";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import elDragDialog from "@/directive/el-drag-dialog";
import ShipComPanySelect from "@/components/ShipComPanySelect/index";
import { getPortInfo } from "@/api/energyEfficiency";

export default {
  name: "ReportList",
  components: {
    Pagination,
    ShipComPanySelect
  },
  directives: { waves, adaptive, elDragDialog },
  filters: {
    grossFilter(gross) {
      return grossKeyValue[gross];
    },
    shipTypeFilter(gross) {
      return shipTypeKeyValue[gross];
    },
    shipSubTypeFilter(gross) {
      return shipSubTypeKeyValue[gross];
    }
  },
  data() {
    return {
      // 船列表
      shipList: [],
      shipListVisible: false,
      shiplistQuery: {
        startTime: "",
        endTime: "",
        shipId: ""
      },
      list: [],
      listLoading: false,
      total: 0,
      tableKey: 0,
      shipComPany: "",
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        shipComPanyName: "",
        shipKeyWord: "",
        sort: "spname"
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    resetDate() {
      this.shiplistQuery.startTime = "";
      this.shiplistQuery.endTime = "";
    },

    getshipList(shipId) {
      console.log(shipId);
      this.listLoading = true;
      this.shipListVisible = true;
      if (shipId) {
        this.shiplistQuery.shipId = shipId;
      }
      getPortInfo(this.shiplistQuery).then(response => {
        this.shipList = response.data.data;
        this.listLoading = false;
      });
    },

    selectComPany() {
      this.$refs.ShipComPanySelect.handleCreateRelation();
    },

    // 获取大列表
    getList() {
      this.listLoading = true;
      var url = "/shipManager/shipList";
      getQueryPage(url, this.listQuery).then(response => {
        this.list = response.data.data.items;
        this.total = response.data.data.total;
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false;
        }, 1.5);
      });
    },

    // 重置
    handleFilter() {
      this.shipComPany = "";
      this.listQuery = {
        currentPage: 1,
        pageSize: 20,
        shipComPanyName: "",
        shipKeyWord: "",
        sort: "spname"
      };
      this.shiplistQuery.shipId = "";
      this.resetDate();
      this.getList();
    },

    sortChange(data) {
      const { prop, order } = data;
      if (prop === "id") {
        this.sortByID(order);
      }
    },
    sortByID(order) {
      if (order === "ascending") {
        this.listQuery.sort = "+id";
      } else {
        this.listQuery.sort = "-id";
      }
      this.handleFilter();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.shipIds = this.multipleSelection;
    }
  }
};
</script>

<style scoped>
.radio-label {
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 30px;
}
</style>
