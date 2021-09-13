<!-- cmsa报告 -->
<!--新增cmsa报告管理-->
<template>
  <el-dialog
    title="CMSA报告"
    width="80%"
    :visible.sync="shipComPanyNamevidata"
    append-to-body
    :before-close="addDetales"
  >
    <h2
      style="font-size: 18px;
    line-height: 150%;
    padding: 0;
    margin: 0;
    text-align: center;"
    >船舶能耗数据报告表格</h2>
    <h3
      style="
    font-size: 14px;
    line-height: 150%;
    padding: 0 0 10px;
    margin: 0 7% 10px;
    text-align: center;border-bottom:1px solid #e5e5e5;"
    >Data Report Format for the Energy Consumption of Ships</h3>

    <table
      class="Kin_Table mtp10 table-nonb"
      width="80%"
      cellspacing="0"
      cellpadding="0"
      border="0"
      align="center"
      bordercolor="#cccccc"
    >
      <tbody style="text-align: center;">
        <tr>
          <td colspan="2">
            <table
              width="100%"
              border="1"
              cellspacing="0"
              bordercolor="#000000"
              style="border-collapse:collapse;"
            >
              <tr>
                <td width="25%">
                  填报单位 :
                  <br />Name of ship
                </td>
                <td width="25%">{{ datafrom.rptOrg }}</td>
                <td width="25%">
                  检验机构 :
                  <br />
                  {{datafrom.verifierName}}
                </td>
                <td width="25%">
                  中国船级社/
                  <br />China Classification Society
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  报告周期
                  <br />Report period
                </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colspan="4">
                  <label>
                    <el-checkbox v-model="datafrom.voyageRpt">航次报</el-checkbox>
                  </label>
                  <p class="newline">Voyage report</p>
                </td>
              </tr>
              <tr>
                <td width="25%">
                  上一停靠港口 ：
                  <br />Last port of call:
                </td>
                <td width="25%">{{ datafrom.prePort }}</td>
                <td width="25%">
                  靠泊时间 :
                  <br />Berthing Time
                </td>
                <td width="25%">{{ datafrom.prePortArrTime }}</td>
              </tr>
              <tr>
                <td width="25%">
                  本次停靠港口 ：
                  <br />This port of call:
                </td>
                <td width="25%">{{ datafrom.nextPort }}</td>
                <td width="25%">
                  靠泊时间 :
                  <br />Berthing Time
                </td>
                <td width="25%">{{ datafrom.nextPortArrTime }}</td>
              </tr>
              <tr>
                <td colspan="4">
                  <label>
                    <el-checkbox v-model="datafrom.yearRpt">年报/月报</el-checkbox>
                  </label>
                  <p class="newline">Annual report /monthly report</p>
                </td>
              </tr>
              <tr>
                <td width="25%">
                  开始日期 ：
                  <br />Start Date:
                </td>
                <td width="25%">{{ datafrom.startTm }}</td>
                <td width="25%">
                  结束日期 :
                  <br />End Date
                </td>
                <td width="25%">{{ datafrom.endTm }}</td>
              </tr>
              <tr>
                <td colspan="4">
                  船舶在报告期内是否发生船舶转换船旗、所有人或经营人的情形：
                  <br />Whether the following events are occurred during the report period:
                </td>
              </tr>
              <tr>
                <td colspan="4">
                  <label>
                    <el-checkbox v-model="datafrom.isTurnToFlalg">转换船旗</el-checkbox>
                  </label>
                  <p class="newline">The transfer of a ship from one Administration to another</p>
                </td>
              </tr>
              <tr>
                <td colspan="4">
                  <label>
                    <el-checkbox v-model="datafrom.isTurnToDoc">转换所有人或经营人</el-checkbox>
                  </label>
                  <p class="newline">A change from one Company to another</p>
                </td>
              </tr>
              <tr>
                <td colspan="4">
                  <label>
                    <el-checkbox v-model="datafrom.notUse">不适用</el-checkbox>
                  </label>
                  <p class="newline">N/A</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <table
              class="table-bor"
              width="100%"
              border="1"
              cellspacing="0"
              bordercolor="#000000"
              style="border-collapse:collapse;"
            >
              <tr align="center" style="font-weight:bold;">
                <td width="10%">
                  序号
                  <br />Number
                </td>
                <td width="40%">
                  填报项目
                  <br />Items
                </td>
                <td width="25%">
                  填报内容
                  <br />Contents
                </td>
                <td width="25%">
                  备注
                  <br />Notes
                </td>
              </tr>
              <tr>
                <td colspan="4">
                  <h4>一、船舶基本信息（Ship Particulars）</h4>
                </td>
              </tr>
              <tr align="center">
                <td>1.</td>
                <td>
                  船名
                  <br />Name of ship
                </td>
                <td>{{datafrom.shipName}}</td>
                <td></td>
              </tr>
              <tr align="center">
                <td>2.</td>
                <td>
                  公司名
                  <br />Name of company
                </td>
                <td>{{ datafrom.docName }}</td>
                <td></td>
              </tr>
              <tr align="center">
                <td>3.</td>
                <td>
                  船舶识别信息
                  <br />IMO number
                </td>
                <td>{{ datafrom.imono }}</td>
                <td></td>
              </tr>
              <tr align="center">
                <td>4.</td>
                <td>
                  船旗国
                  <br />Flag state
                </td>
                <td>{{ datafrom.countryFlag }}</td>
                <td></td>
              </tr>
              <tr align="center">
                <td>5.</td>
                <td>
                  船舶类型
                  <br />Category of ship
                </td>
                <td>{{ datafrom.spCate }}</td>
                <td></td>
              </tr>
              <tr align="center">
                <td>6.</td>
                <td>
                  船舶种类
                  <br />Ship type
                </td>
                <td>{{ datafrom.spType }}</td>
                <td></td>
              </tr>
              <tr align="center">
                <td>7.</td>
                <td>
                  建造时间
                  <br />Year of construction
                </td>
                <td>{{datafrom.builderTime }}</td>
                <td></td>
              </tr>
              <tr align="center">
                <td>8.</td>
                <td>
                  总吨
                  <br />Gross tonnage
                </td>
                <td>{{ datafrom.grossTons }}</td>
                <td></td>
              </tr>
              <tr align="center">
                <td>9.</td>
                <td>
                  净吨
                  <br />Net tonnage
                </td>
                <td>{{ datafrom.netTons }}</td>
                <td></td>
              </tr>
              <tr align="center">
                <td>10.</td>
                <td>
                  载重吨
                  <br />Deadweight tonnage
                </td>
                <td>{{ datafrom.dwTons }}</td>
                <td></td>
              </tr>
              <tr align="center">
                <td>11.</td>
                <td>
                  集装箱箱位量
                  <br />TEU
                </td>
                <td>{{ datafrom.teu }}</td>
                <td></td>
              </tr>
              <tr align="center">
                <td>12.</td>
                <td>
                  船舶能效设计指数
                  <br />EEDI
                </td>
                <td>{{ datafrom.eediVal }}</td>
                <td></td>
              </tr>
              <tr align="center">
                <td>13.</td>
                <td>
                  冰级
                  <br />Ice class
                </td>
                <td>{{ datafrom.iceClass }}</td>
                <td></td>
              </tr>
              <tr align="center">
                <td>14.</td>
                <td>
                  设计航速（节）
                  <br />Designed speed (kn)
                </td>
                <td>{{ datafrom.designSpeed }}</td>
                <td></td>
              </tr>
              <tr align="center">
                <td rowspan="3">15.</td>
                <td rowspan="3" style="padding:0;">
                  <table cellspacing="0" width="100%">
                    <tr align="center">
                      <td rowspan="3" style="border-right:1px solid black;">
                        额定功率（kW）
                        <br />Power output
                        <br />(rated power)
                      </td>
                      <td>
                        主机额定功率
                        <br />Main propulsion
                      </td>
                    </tr>
                    <tr align="center">
                      <td style="border-top:1px solid black;border-bottom:1px solid black;">
                        副机额定功率
                        <br />Auxiliary engine (s)
                      </td>
                    </tr>
                    <tr align="center">
                      <td>
                        锅炉额定功率
                        <br />Boiler (s )
                      </td>
                    </tr>
                  </table>
                </td>
                <td>{{ datafrom.mePower }}&nbsp;</td>
                <td></td>
              </tr>
              <tr align="center">
                <td>{{ datafrom.gePower }}&nbsp;</td>
                <td></td>
              </tr>
              <tr align="center">
                <td>{{ datafrom.boPower }}&nbsp;</td>
                <td></td>
              </tr>
              <tr>
                <td colspan="4">
                  <h4>二、运输活动数据（data on transport work）</h4>
                </td>
              </tr>
              <tr align="center">
                <td>16.</td>
                <td rowspan="3" style="padding:0;">
                  <table cellspacing="0" width="100%">
                    <tr align="center">
                      <td rowspan="3" style="border-right:1px solid black;">
                        周转量
                        <br />Transport Work
                      </td>
                      <td>
                        货物周转量(千吨•海里)
                        <br />Cargos(kt•nmile)
                      </td>
                    </tr>
                    <tr align="center">
                      <td style="border-top:1px solid black;border-bottom:1px solid black;">
                        集装箱周转量(TEU•海里)
                        <br />TEUs(TEU•nmile)
                      </td>
                    </tr>
                    <tr align="center">
                      <td>
                        客运周转量（人•海里）
                        <br />Passengers(person•nmile)
                      </td>
                    </tr>
                  </table>
                </td>
                <td>{{ datafrom.tonsNm }}</td>
                <td></td>
              </tr>
              <tr align="center">
                <td>17.</td>
                <td>{{ datafrom.teuNms }}</td>
                <td></td>
              </tr>
              <tr align="center">
                <td>18.</td>
                <td>{{ datafrom.pesNms }}</td>
                <td></td>
              </tr>
              <tr align="center">
                <td>19.</td>
                <td>
                  航行距离（海里）
                  <br />Distance travelled(nm)
                </td>
                <td>{{ datafrom.distOnsea }}</td>
                <td></td>
              </tr>
              <tr align="center">
                <td>20.</td>
                <td>
                  航行时间（小时）
                  <br />Hours underway (h)
                </td>
                <td>{{ datafrom.hourOnsea }}</td>
                <td></td>
              </tr>
              <tr align="center">
                <td>21.</td>
                <td>
                  营运时间（小时）
                  <br />Operation hours (h)
                </td>
                <td>{{ datafrom.hourOpera }}</td>
                <td></td>
              </tr>
              <tr>
                <td colspan="4">
                  <h4>三、船舶能耗数据 fuel consumption data</h4>
                </td>
              </tr>
              <tr>
                <td colspan="4">&nbsp;22.船用燃料消耗 Fuel consumption</td>
              </tr>
			  <tr align="center" v-for="(item,index) in datafrom.cmsaFuelTypeVos" :key="index">
                <td>{{ item.oilName }} <br/>{{ item.oilNameEn }}</td>
                <td>
                  <p style="border-bottom:1px solid #000">燃料种类 Fuel type</p>
				  <p style="border-bottom:1px solid #000">数量(吨) weight (t )</p>
				  <p>收集方法 Methods Used</p>
                </td>
                <td>
					<p style="border-bottom:1px solid #000">{{ item.oilId }}</p>
					<p style="border-bottom:1px solid #000">{{ item.fuelTons }}</p>
					<p>{{ item.method }}</p>
				</td>
                <td></td>
              </tr>
			
              <tr align="center">
                <td>23.</td>
                <td>
                  岸电消耗量（千瓦时）
                  <br />Shore power consumption (kW•h)
                </td>
                <td>{{ datafrom.landPowerKwh }}</td>
                <td></td>
              </tr>
              <tr>
                <td colspan="4">&nbsp;24.其他能源消耗 Other fuel consumption</td>
              </tr>
              <tr align="center">
                <td rowspan="2">
                  其他能源1
                  <br />Other fuel 1
                </td>
                <td>能源种类 Fuel type</td>
                <td>&nbsp;</td>
                <td></td>
              </tr>
              <tr align="center">
                <td>消耗量 Quantities</td>
                <td>&nbsp;</td>
                <td></td>
              </tr>
              <tr align="center">
                <td rowspan="2">
                  其他能源2
                  <br />Other fuel 2
                </td>
                <td>能源种类 Fuel type</td>
                <td>&nbsp;</td>
                <td></td>
              </tr>
              <tr align="center">
                <td>消耗量 Quantities</td>
                <td>&nbsp;</td>
                <td></td>
              </tr>
              <tr align="center">
                <td>25.</td>
                <td>
                  是否使用尾气处理装置
                  <br />Whether to use a scrubber
                </td>
                <td></td>
                <td></td>
              </tr>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <div slot="footer" class="dialog-footer">
      <el-button @click="addDetale">导出</el-button>
      <el-button @click="addDetales">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getCmsaRpt, downLoadCmsaRpt } from "@/api/requestPost";
export default {
  name: "reportManagementDalog",
  components: {},
  props: {
    shipComPanyNamevidata: {
      type: Boolean,
    },
    listData: {
      type: Object,
    },
  },
  data() {
    return {
      datafrom: {},
      dialogShipCompanyFormVisible: false,
      checked: false,
      shipName: "", // 船名
      shipIom: "", // imo号
      listQuery: {
        shipName: "",
        startTime: "",
        endTiem: "",
      },
      listq: {
        shipName: "",
        time: "",
      },
    };
  },
  created() {
    this.listQuery = this.listq;
    this.shipName = ""; // 船名
    this.shipIom = "";
    this.initData();
  },
  methods: {
    initData() {
      getCmsaRpt(this.listData).then((res) => {
        if (res.data.result) {
          this.datafrom = res.data.data;
        }
      });
    },
    addDetales() {
      this.$emit("shipComPanyNameData", false);
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
    // 关闭弹框
    addDetale() {
      downLoadCmsaRpt(this.listData).then(res => {
		  this.download(res.data, 'CMSA报告.xls')
	  })
    },
    // 船名弹框数据
    adds(val) {
      this.shipName = val.name;
      this.shipIom = val.name;
      this.listQuery.shipName = val.id;
      this.dialogShipCompanyFormVisible = false;
    },
    // 船名选择
    addImon() {
      this.dialogShipCompanyFormVisible = true;
    },
  },
};
</script>

<style scoped>
.addBox {
  display: flex;
}
.table-nonb tr td {
  line-height: 170%;
  padding: 3px 0;
  font-size: 12px;
}
.newline {
  margin: 0;
  padding: 0;
  padding-left: 16px;
}
</style>
