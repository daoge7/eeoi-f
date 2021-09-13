<template>
  <div class="app-container">
    <div class="filter-container">
      <div style="display:inline-block;">
        <label class="radio-label">{{ $t('Analysis.startYear') }}</label>
        <el-select
          v-model="listQuery.startYear"
          :placeholder="$t('common.selectRemind')"
          class="filter-item"
          style="width: 130px"
        >
          <el-option v-for="item in yearOptions" :key="item" :label="item" :value="item" />
        </el-select>
        <label class="radio-label" style="padding-left:15px">{{ $t('Analysis.endYear') }}</label>
        <el-select
          v-model="listQuery.endYear"
          :placeholder="$t('common.selectRemind')"
          class="filter-item"
          style="width: 130px"
        >
          <el-option v-for="item in yearOptions" :key="item" :label="item" :value="item" />
        </el-select>
        <label class="radio-label" style="padding-left:15px">{{ $t('Analysis.computingUnit') }}</label>
        <el-select
          v-model="listQuery.rollingCycleUnit"
          :placeholder="$t('common.selectRemind')"
          clearable
          class="filter-item"
          style="width: 130px"
        >
          <el-option
            v-for="item in computingUnitOptions"
            :key="item.key"
            :label="item.display_name"
            :value="item.key"
          />
        </el-select>
        <el-button
          style="margin-left:20px"
          class="filter-item"
          icon="el-icon-search"
          @click="handleFilter"
        >{{ $t('common.Statistics') }}</el-button>
        <el-button
          class="filter-item"
          type="info"
          icon="el-icon-setting"
          @click="handleReset"
        >{{ $t('common.reset') }}</el-button>
        <el-button
          class="filter-item"
          type="primary"
          plain
          icon="el-icon-download"
          @click="handleExport"
        >{{ $t('common.exportExcel') }}</el-button>
      </div>
      <el-row>
        <el-col :span="1.5">
          <label class="radio-label">{{ $t('Analysis.analyzeItems') }}</label>
        </el-col>
        <el-col :span="19.5">
          <el-checkbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            style="margin-right: 10px;"
            @change="handleCheckAllChange"
          >{{ $t('Analysis.checkAll') }}</el-checkbox>
          <el-checkbox-group
            v-model="listQuery.indexItems"
            @change="handleCheckedItemsChange"
          >
            <el-checkbox
              v-for="item in analyzeItems"
              :key="item.key"
              :label="item.key"
              style="margin-right: 10px;"
            >{{ item.display_name }}</el-checkbox>
          </el-checkbox-group>
        </el-col>
        <el-col :span="3">
          <el-button
            class="filter-item"
            style="margin-left:10px;margin-top:5px;"
            type="success"
            @click="AddCondition()"
          >{{ $t('Analysis.btnAddCondition') }}</el-button>
        </el-col>
      </el-row>
      <div style="min-height:150px;max-height:150px;overflow-y:auto;">
        <div title="firstCondition">
          <div style="display:flex;align-items: center;">
            <div style="padding:10px 10px 0; display:flex;align-items: center;">
              <label class="radio-label">{{ $t('Analysis.firstCondition') }}</label>
            </div>
            <div style="padding:10px 10px 0; display:flex;align-items: center;">
              <label class="radio-label">{{ $t('Analysis.shipCompany') }}</label>
              <div class="addBox">
                <el-input
                  v-model="shipComPanyName"
                  :readonly="true"
                  :placeholder="$t('MRV.boxselect')"
                />
                <el-button style="margin-left:5px" @click="addImonName('0')">{{ $t('common.select') }}</el-button>
              </div>
            </div>

            <div style="padding:10px 10px 0; display:flex;align-items: center;">
              <label class="radio-label" style="padding-left:30px">{{ $t('Analysis.shipType') }}</label>
              <el-select
                v-model="listQuery.compareAnalysisDataConditions[0].shipTypeCode"
                :placeholder="$t('common.selectRemind')"
                clearable
                class="filter-item"
                style="width: 130px"
              >
                <el-option
                  v-for="item in shipTypeOptions"
                  :key="item.id"
                  :label="item.csptype"
                  :value="item.spcode"
                />
              </el-select>
            </div>
            <div style="padding:10px 10px 0; display:flex;align-items: center;">
              <label class="radio-label">{{ $t('Analysis.shipSubType') }}</label>
              <el-select
                v-model="listQuery.compareAnalysisDataConditions[0].shipTypeSub"
                :placeholder="$t('common.selectRemind')"
                clearable
                class="filter-item"
                style="width: 130px"
              >
                <el-option
                  v-for="item in shipSubTypeOptions"
                  :key="item.id"
                  :label="item.subName"
                  :value="item.subCode"
                />
              </el-select>
            </div>
            <div style="padding:10px 10px 0; display:flex;align-items: center;">
              <label class="radio-label">{{ $t('Analysis.grossScope') }}</label>
              <el-select
                v-model="listQuery.compareAnalysisDataConditions[0].grossRange"
                :placeholder="$t('common.selectRemind')"
                clearable
                class="filter-item"
                style="width: 130px"
              >
                <el-option
                  v-for="item in grossOptions"
                  :key="item.id"
                  :label="item.tonSmall +'~'+ item.tonBig"
                  :value="item.tonSmall +'~'+ item.tonBig"
                />
              </el-select>
            </div>
          </div>
          <div style="display:flex;align-items: center;">
            <div style="padding:10px 10px 0; display:flex;align-items: center;">
              <label class="radio-label" style="margin-left:60px">{{ $t('Analysis.ageLimit') }}</label>
              <el-select
                v-model="listQuery.compareAnalysisDataConditions[0].shipAgeRange"
                :placeholder="$t('common.selectRemind')"
                clearable
                class="filter-item"
                style="width: 130px"
              >
                <el-option
                  v-for="item in ageLimitOptions"
                  :key="item.id"
                  :label="item.ageSmall + '~'+ item.ageBig"
                  :value="item.ageSmall + '~'+ item.ageBig"
                />
              </el-select>
            </div>
            <div style="padding:10px 10px 0; display:flex;align-items: center;">
              <label class="radio-label" style="padding-left:15px">{{ $t('Analysis.shipName') }}</label>
              <div class="addBox">
                <el-input v-model="shipName" :readonly="true" :placeholder="$t('MRV.boxselect')" />
                <el-button style="margin-left:5px" @click="addImon('0')">{{ $t('common.select') }}</el-button>
              </div>
            </div>
          </div>
        </div>
        <div v-if="showsecondCondition" title="secondCondition">
        <div style="display:flex;align-items: center;">
            <div style="padding:10px 10px 0; display:flex;align-items: center;">
              <label
                class="radio-label"
                style="padding-right:2px;"
              >{{ $t('Analysis.secondCondition') }}</label>
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                style="padding:1px"
                @click="DeleteCondition('secondCondition')"
              ></el-button>
            </div>
            <div style="padding:10px 10px 0; display:flex;align-items: center;">
              <label class="radio-label">{{ $t('Analysis.shipCompany') }}</label>
              <div class="addBox">
                <el-input
                  v-model="shipComPanyName1"
                  :readonly="true"
                  :placeholder="$t('MRV.boxselect')"
                />
                <el-button style="margin-left:5px" @click="addImonName('1')">{{ $t('common.select') }}</el-button>
              </div>
            </div>

            <div style="padding:10px 10px 0; display:flex;align-items: center;">
              <label class="radio-label" style="padding-left:30px">{{ $t('Analysis.shipType') }}</label>
              <el-select
                v-model="listQuery.compareAnalysisDataConditions[1].shipTypeCode"
                :placeholder="$t('common.selectRemind')"
                clearable
                class="filter-item"
                style="width: 130px"
              >
                <el-option
                  v-for="item in shipTypeOptions"
                  :key="item.id"
                  :label="item.csptype"
                  :value="item.id"
                />
              </el-select>
            </div>
            <div style="padding:10px 10px 0; display:flex;align-items: center;">
              <label class="radio-label">{{ $t('Analysis.shipSubType') }}</label>
              <el-select
                v-model="listQuery.compareAnalysisDataConditions[1].shipTypeSub"
                :placeholder="$t('common.selectRemind')"
                clearable
                class="filter-item"
                style="width: 130px"
              >
                <el-option
                  v-for="item in shipSubTypeOptions"
                  :key="item.id"
                  :label="item.subName"
                  :value="item.subCode"
                />
              </el-select>
            </div>
            <div style="padding:10px 10px 0; display:flex;align-items: center;">
              <label class="radio-label">{{ $t('Analysis.grossScope') }}</label>
              <el-select
                v-model="listQuery.compareAnalysisDataConditions[1].grossRange"
                :placeholder="$t('common.selectRemind')"
                clearable
                class="filter-item"
                style="width: 130px"
              >
                <el-option
                  v-for="item in grossOptions"
                  :key="item.id"
                  :label="item.tonSmall +'~'+ item.tonBig"
                  :value="item.tonSmall +'~'+ item.tonBig"
                />
              </el-select>
            </div>
          </div>
          <div style="display:flex;align-items: center;">
            <div style="padding:10px 10px 0; display:flex;align-items: center;">
              <label class="radio-label" style="margin-left:60px">{{ $t('Analysis.ageLimit') }}</label>
              <el-select
                v-model="listQuery.compareAnalysisDataConditions[1].shipAgeRange"
                :placeholder="$t('common.selectRemind')"
                clearable
                class="filter-item"
                style="width: 130px"
              >
                <el-option
                  v-for="item in ageLimitOptions"
                  :key="item.id"
                  :label="item.ageSmall + '~'+ item.ageBig"
                  :value="item.ageSmall + '~'+ item.ageBig"
                />
              </el-select>
            </div>
            <div style="padding:10px 10px 0; display:flex;align-items: center;">
              <label class="radio-label" style="padding-left:15px">{{ $t('Analysis.shipName') }}</label>
              <div class="addBox">
                <el-input v-model="shipName1" :readonly="true" :placeholder="$t('MRV.boxselect')" />
                <el-button style="margin-left:5px" @click="addImon('1')">{{ $t('common.select') }}</el-button>
              </div>
            </div>
          </div>


        </div>
          <div v-if="showthirdCondition" title="thirdCondition">
            <div style="display:flex;align-items: center;">
            <div style="padding:10px 10px 0; display:flex;align-items: center;">
              <label
              class="radio-label"
              style="padding-right:2px;"
            >{{ $t('Analysis.thirdCondition') }}</label>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              style="padding:1px"
              @click="DeleteCondition('thirdCondition')"
            ></el-button>
            </div>
            <div style="padding:10px 10px 0; display:flex;align-items: center;">
              <label class="radio-label">{{ $t('Analysis.shipCompany') }}</label>
              <div class="addBox">
                <el-input
                  v-model="shipComPanyName2"
                  :readonly="true"
                  :placeholder="$t('MRV.boxselect')"
                />
                <el-button style="margin-left:5px" @click="addImonName('2')">{{ $t('common.select') }}</el-button>
              </div>
            </div>

            <div style="padding:10px 10px 0; display:flex;align-items: center;">
              <label class="radio-label" style="padding-left:30px">{{ $t('Analysis.shipType') }}</label>
              <el-select
                v-model="listQuery.compareAnalysisDataConditions[2].shipTypeCode"
                :placeholder="$t('common.selectRemind')"
                clearable
                class="filter-item"
                style="width: 130px"
              >
                <el-option
                  v-for="item in shipTypeOptions"
                  :key="item.id"
                  :label="item.csptype"
                  :value="item.id"
                />
              </el-select>
            </div>
            <div style="padding:10px 10px 0; display:flex;align-items: center;">
              <label class="radio-label">{{ $t('Analysis.shipSubType') }}</label>
              <el-select
                v-model="listQuery.compareAnalysisDataConditions[2].shipTypeSub"
                :placeholder="$t('common.selectRemind')"
                clearable
                class="filter-item"
                style="width: 130px"
              >
                <el-option
                  v-for="item in shipSubTypeOptions"
                  :key="item.id"
                  :label="item.subName"
                  :value="item.subCode"
                />
              </el-select>
            </div>
            <div style="padding:10px 10px 0; display:flex;align-items: center;">
              <label class="radio-label">{{ $t('Analysis.grossScope') }}</label>
              <el-select
                v-model="listQuery.compareAnalysisDataConditions[2].grossRange"
                :placeholder="$t('common.selectRemind')"
                clearable
                class="filter-item"
                style="width: 130px"
              >
                <el-option
                  v-for="item in grossOptions"
                  :key="item.id"
                  :label="item.tonSmall +'~'+ item.tonBig"
                  :value="item.tonSmall +'~'+ item.tonBig"
                />
              </el-select>
            </div>
          </div>
          <div style="display:flex;align-items: center;">
            <div style="padding:10px 10px 0; display:flex;align-items: center;">
              <label class="radio-label" style="margin-left:60px">{{ $t('Analysis.ageLimit') }}</label>
              <el-select
                v-model="listQuery.compareAnalysisDataConditions[2].shipAgeRange"
                :placeholder="$t('common.selectRemind')"
                clearable
                class="filter-item"
                style="width: 130px"
              >
                <el-option
                  v-for="item in ageLimitOptions"
                  :key="item.id"
                  :label="item.ageSmall + '~'+ item.ageBig"
                  :value="item.ageSmall + '~'+ item.ageBig"
                />
              </el-select>
            </div>
            <div style="padding:10px 10px 0; display:flex;align-items: center;">
              <label class="radio-label" style="padding-left:15px">{{ $t('Analysis.shipName') }}</label>
              <div class="addBox">
                <el-input v-model="shipName2" :readonly="true" :placeholder="$t('MRV.boxselect')" />
                <el-button style="margin-left:5px" @click="addImon('2')">{{ $t('common.select') }}</el-button>
              </div>
            </div>
          </div>
          </div>
      </div>
    </div>
    <el-tabs value="first" style="height:100%;overflow-y:auto;overflow-x:hidden;">
      <el-tab-pane :key="'first'" name="first" :label="$t('Analysis.AnalysisChart')">
        <div v-if="showInitImg" align="center">
          <img src="../../images/Analysis.png" />
          <br />
          <span style="text-align:center">{{ $t('MRV.analysis') }}</span>
        </div>
        <div v-if="showAnalysis" class="chart-container">
          <chart
            v-if="chartFlag"
            ref="chart"
            height="100%"
            width="100%"
            v-bind:chartTitle="chartTitle"
            v-bind:xData="xData"
            v-bind:legendData="legendData"
            v-bind:seriesData="seriesData"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane :key="'second'" name="second" :label="$t('Analysis.AnalysisData')">
        <div v-for="(item,index) in list" :key="index">
        <p v-if="item.type === '0'" style="margin-top:10px; margin-bottom:10px;font-size:18px;">{{ $t('ship.searchOperator') }}:{{ item.name }}</p>
        <p v-if="item.type === '1'" style="margin-top:10px; margin-bottom:10px;font-size:18px;">{{ $t('shipBattery.shipName') }}:{{ item.name }}</p>
        <!-- <p v-if="list.length > 1 " style="margin-bottom:10px;font-size:18px;font-weight: 600;">条件{{ index+1 }}:</p> -->
        <el-table
          :data="item.eneryEfficTrendDataVos"
          border
          fit
          style="width:100%;overflow:auto"
          :cell-style="{padding:'0'}"
        >
         <el-table-column :label="$t('Analysis.displayDate')" align="center" width="120">
            <template slot-scope="{row}">
              <span>{{ row.time }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('Analysis.EEOI')" width="120" align="center">
            <template slot-scope="{row}">
              <span>{{ row.eeoi }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('Analysis.fuelPerMile')" width="auto" align="center" :render-header="renderheader">
            <template slot-scope="{row}">
              <span>{{ row.fuelPerMile }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('Analysis.CO2Distance')" width="auto" align="center" :render-header="renderheader">
            <template slot-scope="{row}">
              <span>{{ row.co2PerMile }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('Analysis.CO2Transport')" width="auto" align="center" :render-header="renderheader">
            <template slot-scope="{row}">
              <span>{{ row.co2PerT }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('Analysis.reductionRatio')" width="auto" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              <span>{{ row.dropRadio }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('Analysis.loadUtilization')" width="120" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              <span>{{ row.userRate }}</span>
            </template>
          </el-table-column>
        </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
    <shipSwlectsDelog
      :add="dialogShipCompanyFormVisible"
      @adds="adds"
      v-if="dialogShipCompanyFormVisible"
    />
    <shipSwlectsDelog1
      :add="dialogShipCompanyFormVisible1"
      @adds1="adds1"
      v-if="dialogShipCompanyFormVisible1"
    />
    <shipSwlectsDelog2
      :add="dialogShipCompanyFormVisible2"
      @adds2="adds2"
      v-if="dialogShipCompanyFormVisible2"
    />
    <shipComPanyName
      :shipComPanyNamevicode="dialogShipCompanyFormVisibles"
      @shipComPanyNameData="shipComPanyNameData"
      v-if="dialogShipCompanyFormVisibles"
    />
    <shipComPanyName1
      :shipComPanyNamevicode="dialogShipCompanyFormVisibles1"
      @shipComPanyNameData1="shipComPanyNameData1"
      v-if="dialogShipCompanyFormVisibles1"
    />
    <shipComPanyName2
      :shipComPanyNamevicode="dialogShipCompanyFormVisibles2"
      @shipComPanyNameData2="shipComPanyNameData2"
      v-if="dialogShipCompanyFormVisibles2"
    />
  </div>
</template>

<script>
import Chart from "@/components/Charts/MultiDataMixChart";
import { getCompareAnalysisData,getCompareAnalysisDatas, downLoadCompareAnalysisData } from '@/api/requestPost'
import {
  getYears,
  savefindShipTypeList,
  savefindShipSubList,
  savefindDicGrossTonList,
  findShipAgeList,
} from "@/api/requestGet";
import Cookies from 'js-cookie'
import adaptive from "@/directive/el-table";
import shipSwlectsDelog1 from "../../components/ShipComPanySelect/shipSwlects-delog1";
import shipSwlectsDelog2 from "../../components/ShipComPanySelect/shipSwlects-delog2";
import shipSwlectsDelog from "../../components/ShipComPanySelect/shipSwlects-delog";
import shipComPanyName from "../../components/ShipComPanySelect/shipComPanyName-dalog";
import shipComPanyName1 from "../../components/ShipComPanySelect/shipComPanyName-dalog1";
import shipComPanyName2 from "../../components/ShipComPanySelect/shipComPanyName-dalog2";
const computingUnitOptions = [
  { key: "月", display_name: "月" },
  { key: "季", display_name: "季" },
  { key: "年", display_name: "年" },
];

const analyzeItemsOptions = [
  { key: '1', display_name: 'EEOI(g/t∙nm)' },
  { key: '2', display_name: '每海里油耗(kg/nm)' },
  { key: '3', display_name: '每运输单位油耗(kg/kt∙nm)' },
  { key: '4', display_name: '每海里CO2排放(100kg/nm)' },
  { key: '5', display_name: '每运输单位CO2排放(10kg/t)' },
  { key: '6', display_name: '降速比(%)' },
  { key: '7', display_name: '载货量利用率(%)' }
]

export default {
  name: "ComparisonAnalysis",
  components: {
    Chart,
    shipSwlectsDelog,
    shipComPanyName,
    shipSwlectsDelog1,
    shipSwlectsDelog2,
    shipComPanyName1,
    shipComPanyName2,
  },
  directives: { adaptive },
  data() {
    return {
      shipComPanyName: "", // 船公司
      shipComPanyName1: "",
      shipComPanyName2: "",
      shipName: "", // 船名
      shipName1: "",
      shipName2: "",
      dialogShipCompanyFormVisible: false,
      dialogShipCompanyFormVisible1: false,
      dialogShipCompanyFormVisible2: false,
      dialogShipCompanyFormVisibles: false,
      dialogShipCompanyFormVisibles1: false,
      dialogShipCompanyFormVisibles2: false,
      chartTitle: "",
      xData: [],
      legendData: [],
      seriesData: [],
      list: [],
      listQuery: {
        startYear: '2020',
        endYear: '2020',
        rollingCycleUnit: '年',
        indexItems: ['1','2'],
        compareAnalysisDataConditions:[
          {
            shipCompanyId: undefined,
            shipId: undefined,
            shipTypeCode: undefined,
            shipTypeSub: undefined,
            grossRange: undefined,
            shipAgeRange: undefined,

          },
          {
            shipCompanyId: undefined,
            shipId: undefined,
            shipTypeCode: undefined,
            shipTypeSub: undefined,
            grossRange: undefined,
            shipAgeRange: undefined,

          },
          {
            shipCompanyId: undefined,
            shipId: undefined,
            shipTypeCode: undefined,
            shipTypeSub: undefined,
            grossRange: undefined,
            shipAgeRange: undefined,
          }
        ]
      },
      shipTypeOptions: [],
      shipSubTypeOptions: [],
      grossOptions: [],
      yearOptions: [],
      ageLimitOptions: [],
      computingUnitOptions,
      checkAll: false,
      analyzeItems: analyzeItemsOptions,
      isIndeterminate: true,
      showInitImg: false,
      showAnalysis: false,
      chartFlag: false,
      showfirstCondition: true,
      showsecondCondition: false,
      showthirdCondition: false,
      query: []
    };
  },
  created() {
    this.showInitImg = true;
    this.showAnalysis = false;
    this.initYear();
    this.initShiptype(); // 船型
    this.initsavefindShipSubList(); // 船型细分
    this.initsavefindDicGrossTonList(); // 总吨范围
    this.initfindShipAgeList(); // 船龄范围
  },
  methods: {
    initgetCompareAnalysisDatas() {
      this.query = JSON.parse(JSON.stringify(this.listQuery))
      for (let i = 0; i < this.query.compareAnalysisDataConditions.length; i++) {
        if (this.query.compareAnalysisDataConditions[i] == null || this.query.compareAnalysisDataConditions[i] == "" || JSON.stringify(this.query.compareAnalysisDataConditions[i]) == "{}" || this.query.compareAnalysisDataConditions[i].shipCompanyId === '' || this.query.compareAnalysisDataConditions[i].shipCompanyId === undefined && this.query.compareAnalysisDataConditions[i].shipId === undefined || this.query.compareAnalysisDataConditions[i].shipId === '') {
          this.query.compareAnalysisDataConditions.splice(i, 1);
          i = i - 1;
        }
      }
      getCompareAnalysisDatas(this.query).then(res => {
         this.list = res.data.data
      })
      console.log(this.list)
    },
    initfindShipAgeList() {
      findShipAgeList().then((res) => {
        this.ageLimitOptions = res.data.data.items;
      });
    },
    initsavefindDicGrossTonList() {
      savefindDicGrossTonList().then((res) => {
        this.grossOptions = res.data.data.items;
      });
    },
    initsavefindShipSubList() {
      savefindShipSubList().then((res) => {
        this.shipSubTypeOptions = res.data.data.items;
      });
    },
    initShiptype() {
      savefindShipTypeList().then((res) => {
        this.shipTypeOptions = res.data.data.items;
      });
    },
    // 年份
    initYear() {
      getYears().then((res) => {
        this.yearOptions = res.data.data;
      });
    },
    // addImon
    addImon(val) {
      if (val === "0") {
        this.dialogShipCompanyFormVisible = true;
      }
      if (val === "1") {
        this.dialogShipCompanyFormVisible1 = true;
      }
      if (val === "2") {
        this.dialogShipCompanyFormVisible2 = true;
      }
    },
    // addImonName
    addImonName(val) {
       if (val === "0") {
        this.dialogShipCompanyFormVisibles = true;
      }
      if (val === "1") {
        this.dialogShipCompanyFormVisibles1 = true;
      }
      if (val === "2") {
        this.dialogShipCompanyFormVisibles2 = true;
      }
    },
    // 弹框数据
    adds(val) {
      this.shipName = val.name;
      this.listQuery.compareAnalysisDataConditions[0].shipId = val.id
      this.dialogShipCompanyFormVisible = false;
    },
    // 弹框数据
    adds1(val) {
      this.shipName1 = val.name;
      this.listQuery.compareAnalysisDataConditions[1].shipId = val.id
      this.dialogShipCompanyFormVisible1 = false;
    },
    // 弹框数据
    adds2(val) {
      this.shipName2 = val.name;
      this.listQuery.compareAnalysisDataConditions[2].shipId = val.id
      this.dialogShipCompanyFormVisible2 = false;
    },
    // 弹框数据
    shipComPanyNameData(val) {
      this.shipComPanyName = val.name;
      this.listQuery.compareAnalysisDataConditions[0].shipCompanyId = val.id
      this.dialogShipCompanyFormVisibles = false;
    },
    // 弹框数据
    shipComPanyNameData1(val) {
      this.shipComPanyName1 = val.name;
     this.listQuery.compareAnalysisDataConditions[1].shipCompanyId = val.id
      this.dialogShipCompanyFormVisibles1 = false;
    },
    // 弹框数据
    shipComPanyNameData2(val) {
      this.shipComPanyName2 = val.name;
      this.listQuery.compareAnalysisDataConditions[2].shipCompanyId = val.id
      this.dialogShipCompanyFormVisibles2 = false;
    },
    getChartData() {
      this.query = JSON.parse(JSON.stringify(this.listQuery))
      for (let i = 0; i < this.query.compareAnalysisDataConditions.length; i++) {
        if (this.query.compareAnalysisDataConditions[i] == null || this.query.compareAnalysisDataConditions[i] == "" || JSON.stringify(this.query.compareAnalysisDataConditions[i]) == "{}" || this.query.compareAnalysisDataConditions[i].shipCompanyId === '' || this.query.compareAnalysisDataConditions[i].shipCompanyId === undefined && this.query.compareAnalysisDataConditions[i].shipId === undefined || this.query.compareAnalysisDataConditions[i].shipId === '') {
          this.query.compareAnalysisDataConditions.splice(i, 1);
          i = i - 1;
        }
      }
      getCompareAnalysisData(this.query).then((res) => {
         this.chartTitle = '能效比较分析'
        //  if(res.data.data.shipComPanyName && res.data.data.shipName) {
        //     this.chartTitle = res.data.data.shipComPanyName+'公司/'+res.data.data.shipName+'船舶 能效趋势分析'
        //   }
        //   if(res.data.data.shipComPanyName && !res.data.data.shipName){
        //     this.chartTitle = res.data.data.shipComPanyName+'公司能效趋势分析'
        //   }
        //   if(!res.data.data.shipComPanyName && res.data.data.shipName){
        //     this.chartTitle = res.data.data.shipName+'船舶能效趋势分析'
        //   } 
           this.xData = res.data.data[0].xdata
           let list= []
          res.data.data.forEach(ele => {
              this.legendData.push(ele.name)
              let obj = {
                name: ele.name,
                type: ele.type,
                yAxisIndex: ele.yaxisIndex,
                data:ele.ydata
              }
              list.push(obj)
          })
          this.seriesData = list 
          this.chartFlag = true
      });
    },
    ResetFirstCondition() {
      this.listQuery.compareAnalysisDataConditions[0].shipCompanyId = "";
      this.listQuery.compareAnalysisDataConditions[0].shipId = "";
      this.listQuery.compareAnalysisDataConditions[0].shipTypeCode = "";
      this.listQuery.compareAnalysisDataConditions[0].shipTypeSub = "";
      this.listQuery.compareAnalysisDataConditions[0].grossRange = "";
      this.listQuery.compareAnalysisDataConditions[0].shipAgeRange = "";

      this.query.compareAnalysisDataConditions[0].shipCompanyId = "";
      this.query.compareAnalysisDataConditions[0].shipId = "";
      this.query.compareAnalysisDataConditions[0].shipTypeCode = "";
      this.query.compareAnalysisDataConditions[0].shipTypeSub = "";
      this.query.compareAnalysisDataConditions[0].grossRange = "";
      this.query.compareAnalysisDataConditions[0].shipAgeRange = "";
      
    },
    ResetSecondCondition() {
       this.shipComPanyName1 = "", // 船公司
      this.shipName1 = "", // // 船名
      this.listQuery.compareAnalysisDataConditions[1].shipCompanyId = "";
      this.listQuery.compareAnalysisDataConditions[1].shipId = "";
      this.listQuery.compareAnalysisDataConditions[1].shipTypeCode = "";
      this.listQuery.compareAnalysisDataConditions[1].shipTypeSub = "";
      this.listQuery.compareAnalysisDataConditions[1].grossRange = "";
      this.listQuery.compareAnalysisDataConditions[1].shipAgeRange = "";

      this.query.compareAnalysisDataConditions[1].shipCompanyId = "";
      this.query.compareAnalysisDataConditions[1].shipId = "";
      this.query.compareAnalysisDataConditions[1].shipTypeCode = "";
      this.query.compareAnalysisDataConditions[1].shipTypeSub = "";
      this.query.compareAnalysisDataConditions[1].grossRange = "";
      this.query.compareAnalysisDataConditions[1].shipAgeRange = "";
    },
    ResetThirdCondition() {
      this.shipComPanyName2 = "", // 船公司
      this.shipName2 = "", // // 船名
      this.listQuery.compareAnalysisDataConditions[2].shipCompanyId = "";
      this.listQuery.compareAnalysisDataConditions[2].shipId = "";
      this.listQuery.compareAnalysisDataConditions[2].shipTypeCode = "";
      this.listQuery.compareAnalysisDataConditions[2].shipTypeSub = "";
      this.listQuery.compareAnalysisDataConditions[2].grossRange = "";
      this.listQuery.compareAnalysisDataConditions[2].shipAgeRange = "";

      this.query.compareAnalysisDataConditions[2].shipCompanyId = "";
      this.query.compareAnalysisDataConditions[2].shipId = "";
      this.query.compareAnalysisDataConditions[2].shipTypeCode = "";
      this.query.compareAnalysisDataConditions[2].shipTypeSub = "";
      this.query.compareAnalysisDataConditions[2].grossRange = "";
      this.query.compareAnalysisDataConditions[2].shipAgeRange = "";
    },
    handleReset() {
      this.shipComPanyName = "", // 船公司
      this.shipComPanyName1 = "", // 船公司
      this.shipComPanyName2 = "", // 船公司
      this.shipName = "", // // 船名
      this.shipName1 = "", // // 船名
      this.shipName2 = "", // // 船名
      this.listQuery.startYear = "2020";
      this.listQuery.endYear = "2020";
      this.listQuery.rollingCycleUnit = "年";
      this.listQuery.indexItems = ['1','2'];

      this.query.startYear = "2020";
      this.query.endYear = "2020";
      this.query.rollingCycleUnit = "年";
      this.query.indexItems = ['1','2'];
      
      this.seriesData = []
      this.showInitImg = true
      this.chartFlag = false
      this.initgetCompareAnalysisDatas()
      this.chartTitle = ''
      this.xData = []
      this.ResetFirstCondition();
      this.ResetSecondCondition();
      this.ResetThirdCondition();
    },
    handleFilter() {
    this.showInitImg = false
    this.showAnalysis = true
    this.initgetCompareAnalysisDatas()
    this.getChartData()
    },
     // 文件导出
    download(data, name) {
      if (!data) {
        return
      }
      const url = window.URL.createObjectURL(new Blob([data]))
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      if (name) {
        link.setAttribute('download', `${name}`)
      } else {
        link.setAttribute('download', 'excel.xlsx')
      }
      document.body.appendChild(link)
      link.click()
    },
    handleExport() {
    this.query = JSON.parse(JSON.stringify(this.listQuery))
      for (let i = 0; i < this.query.compareAnalysisDataConditions.length; i++) {
        if (this.query.compareAnalysisDataConditions[i] == null || this.query.compareAnalysisDataConditions[i] == "" || JSON.stringify(this.query.compareAnalysisDataConditions[i]) == "{}" || this.query.compareAnalysisDataConditions[i].shipCompanyId === '' || this.query.compareAnalysisDataConditions[i].shipCompanyId === undefined && this.query.compareAnalysisDataConditions[i].shipId === undefined || this.query.compareAnalysisDataConditions[i].shipId === '') {
          this.query.compareAnalysisDataConditions.splice(i, 1);
          i = i - 1;
        }
    }
    if(Cookies.get('language') === 'zh'){
        this.query.type = '1'
      }else if(Cookies.get('language') === 'en') {
          this.query.type = '0'
      } else {
        this.query.type = '1'
      }
    downLoadCompareAnalysisData(this.query).then(res => {
          this.download(res.data, '能效比较分析.xls')
    })
    },
    // 添加比对条件
    AddCondition() {
      if (this.showsecondCondition && this.showthirdCondition) {
        this.$message({
          showClose: true,
          message: "最多只允许添加三个比对条件",
          type: "error",
        });
      } else if (!this.showsecondCondition) {
        this.showsecondCondition = true;
      } else if (!this.showthirdCondition) {
        this.showthirdCondition = true;
      }
    },
    // 删除比对条件
    DeleteCondition(title) {
      if (title === "secondCondition") {
        this.ResetSecondCondition();
        this.showsecondCondition = false;
      } else if (title === "thirdCondition") {
        this.ResetThirdCondition();
        this.showthirdCondition = false;
      }
    },
    // checkbox
    handleCheckAllChange(val) {
      const checkList = [];
      if (val) {
        for (const v of this.analyzeItems) {
          checkList.push(v.key);
        }
      }
      this.listQuery.indexItems = checkList;
      this.isIndeterminate = false;
    },
    handleCheckedItemsChange(value) {
      const checkedCount = value.length;
      this.checkAll = checkedCount === this.analyzeItems.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.analyzeItems.length;
    },
    renderheader(h, { column, $index }) {
      return h("span", {}, [
        h("span", {}, column.label.split("|")[0]),
        h("br"),
        h("span", {}, column.label.split("|")[1]),
      ]);
    },
  },
};
</script>
<style scoped>
.el-table__empty-text {
  display: block;
  width: 500px;
  height: 385px;
  padding-top: 300px;
  background: url("../../images/noData.png") no-repeat;
  color: #909399;
  box-sizing: border-box;
}
.radio-label {
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0px;
  text-align:right;
}
.el-checkbox__label {
  display: inline-block;
  padding-left: 0px;
  line-height: 19px;
  font-size: 14px;
}

.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 310px);
}
.addBox {
  display: flex;
}
</style>
