<template>
  <div class="app-container">
    <div class="filter-container">
      <div style="padding:10px 10px 0;">
        <label class="radio-label" >{{ $t('MRV.shipCompany') }}</label>
        <el-input v-model="listQuery.shipCompany" :placeholder="$t('common.inputRemind')" style="width: 240px;margin-right:10px;" class="filter-item" @keyup.enter.native="handleFilter" />
        <label class="radio-label">{{ $t('MRV.VesselName') }}</label>
        <el-input v-model="listQuery.VesselName" :placeholder="$t('common.inputRemind')" style="width: 240px;margin-right:10px;" class="filter-item" @keyup.enter.native="handleFilter" />
        <label class="radio-label"  style="width:120px">{{ $t('MRV.IMONoOrRegistrationNo') }}</label>
        <el-input v-model="listQuery.IMONO" :placeholder="$t('common.inputRemind')" style="width: 160px;" class="filter-item" @keyup.enter.native="handleFilter" />
      </div>
      <div style="padding:5px 10px 6px;">
        <label class="radio-label" >{{ $t('MRV.Period') }}</label>
        <el-date-picker :editable="true" v-model="listQuery.startDate" type="date" align="left" style="width:150px" :placeholder="$t('common.datePickerRemind')"/> ~
        <el-date-picker :editable="true" v-model="listQuery.endDate" type="date" align="left" style="width:150px" :placeholder="$t('common.datePickerRemind')"/>
        <el-button class="filter-item" type="primary" icon="el-icon-search" style="margin-left:20px" @click="handleFilter">
          {{ $t('common.search') }}
        </el-button>
        <el-button class="filter-item" type="primary" icon="el-icon-setting"  @click="handleFilter">
          {{ $t('common.reset') }}
        </el-button>
      </div>
    </div>
    <div>
    <el-table
      v-loading="listLoading"
      :data="dataTreeGrid"
      border
      fit
      :height="tableHeight"
      style="width: 100%; overflow:auto"
      highlight-current-row
      :row-style="{height:'35px'}"
      :cell-style="{padding:'0'}"
      row-key="id"
      v-adaptive="{bottomOffset: 38}"
    >
      <el-table-column type="selection" width="55px" align="center">
      </el-table-column>
      <el-table-column :label="$t('MRV.NameOfShip')"  align="center" width="auto" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.shipName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('MRV.IMONoOrRegistrationNo')" align="center" width="auto" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.imono }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('MRV.FlagState')" width="auto" align="center" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.FlagState }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('MRV.VesselType')" width="auto" align="center" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.VesselType }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('MRV.GrossTonnage')" width="auto" align="center" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.GrossTonnage }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('MRV.Class')" width="120px" align="center" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.VesselType }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('MRV.DesignSpeed')" width="100px" align="center" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.DesignSpeed }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('MRV.EmissionReport')" align="center" width="220px" class-name="small-padding fixed-width" show-overflow-tooltip>
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleEUEMissionReportInfo(row)">
            {{ $t('MRV.EU') }}
          </el-button>
          <el-dropdown trigger="click" class="international" @command="handleIMOReportInfo">
          <el-button type="primary" size="mini">
            {{ $t('MRV.IMO') }}
          </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item  command="IMOReport">
                 IMO Report
              </el-dropdown-item>
              <el-dropdown-item  >
                 <a class='download' href='./templateFile/IMOCollectedData.xls' download=""  title="IMO Collected Data"> {{ "IMO Collected Data" }}</a>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button size="mini" type="primary"  @click="handleCMSAReportInfo(row)">
            {{ $t('MRV.CMSA') }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column :label="$t('MRV.Confirmed')" align="left" width="170" class-name="small-padding fixed-width" show-overflow-tooltip>
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdateInfo(row)">
            {{ $t('MRV.NO') }}
          </el-button>
          <el-button size="mini" type="danger" @click="handleDeleteVoyage(row)">
            {{ $t('MRV.Submit') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList"/>
    </div>
    <el-dialog width="80%" :append-to-body="true" :title="$t('voyage.voyageEditText')" :visible.sync="voyagedialogFormVisible" :close-on-click-modal="false">
      <el-form ref="UploadInfoForm" :rules="voyageRules" :model="uploadReportTemp" label-position="left" label-width="70px" style="width: 400px; margin-left:20px;">
        <el-form-item label-width="150px" :label="$t('MRV.IMONoOrRegistrationNo')" prop="imono">
          <el-input v-model="uploadReportTemp.imono" style="width:250px"/>
        </el-form-item>
        <el-form-item :label="$t('MRV.ReportStartDate')" prop="startDate" label-width="150px">
        <el-date-picker :editable="true" v-model="uploadReportTemp.startDate" type="date" align="left" style="width:150px" :placeholder="$t('common.datePickerRemind')"/>
        </el-form-item>
        <el-form-item :label="$t('MRV.ReportEndDate')" prop="endDate" label-width="150px">
        <el-date-picker :editable="true" v-model="uploadReportTemp.endDate" type="date" align="left" style="width:150px" :placeholder="$t('common.datePickerRemind')"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="voyagedialogFormVisible = false">
          {{ $t('common.close') }}
        </el-button>
        <el-button type="primary" @click="voyagedialogStatus==='create'?createUploadInfoData():updateUploadInfoData()">
          {{ $t('common.save') }}
        </el-button>
      </div>
    </el-dialog>
    <!-- 欧盟排放报告 -->
     <el-dialog width="80%" :append-to-body="true" :title="$t('MRV.EUEMissionReport')" :visible.sync="EUEMissionReportInfo" :close-on-click-modal="false">
        <el-row  style="border:1px">
         <el-col :span="24">
            <h4>Part A：Data identifying the ship and the company</h4>
         </el-col>
        </el-row>

        <div style="padding:5px 10px;">
        <el-row>
          <el-col :span="12">
            <p>1. Name of the ship</p>
          </el-col>
          <el-col :span="12">
            <p>{{VesselName}}</p>
          </el-col>
        </el-row>
          <el-row>
            <el-col :span="12">
              <p>2. IMO identification number</p>
            </el-col>
            <el-col :span="12">
              <p>{{IMO}}</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <p>3. Port of registry / Home port</p>
            </el-col>
            <el-col :span="12">
              <p>{{}}</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <p>4. Ship category</p>
            </el-col>
            <el-col :span="12">
              <p>{{}}</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <p>5. Ice class of the ship</p>
            </el-col>
            <el-col :span="12">
              <p>---</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <p>6. Technical efficiency of the ship</p>
            </el-col>
            <el-col :span="12">
              <p>{{}}</p>
            </el-col>
          </el-row>
          <div style="padding:5px 10px;">
            <el-row>
              <el-col :span="12">
                <p>a) Energy Efficiency Design Index (EEDI):</p>
              </el-col>
              <el-col :span="12">
                <p>{{}}</p>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <p>b) Estimated Index Value (EIV):</p>
              </el-col>
              <el-col :span="12">
                <p>{{5.62}}</p>
              </el-col>
            </el-row>
          </div>
          <el-row>
            <el-col :span="12">
              <p>7. Name of the shipowner</p>
            </el-col>
            <el-col :span="12">
              <p>{{"Jinhai 1258 Limited"}}</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <p>8. Address of the shipowner and its principal place of business</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <p>{{}}Trust Company Complex, Ajeltake Road, Ajeltake Island, Majuro, Marshall Islands, MH96960</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <p>9. Name of the company (only if not the shipowner)</p>
            </el-col>
            <el-col :span="12">
              <p>{{}}</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <p>10. Address of the company (only if not the shipowner) and its principal place of business</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <p>{{}}</p>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <p>11. Contact person </p>
            </el-col>
          </el-row>

          <div style="padding:5px 10px;">
            <el-row>
              <el-col :span="24">
                <p>    a) title：{{IMO}}    	first name：{{IMO}}    surname：{{IMO}}     	job title：{{IMO}}</p>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <p>    b) Address </p>
              </el-col>
              <el-col :span="12">
                <p>{{}}</p>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <p>    c) Telephone </p>
              </el-col>
              <el-col :span="12">
                <p>{{}}</p>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <p>    d) email </p>
              </el-col>
              <el-col :span="12">
                <p>{{}}</p>
              </el-col>
            </el-row>
          </div>
        </div>

        <el-row>
         <el-col :span="24">
            <h4>Part B Verification</h4>
         </el-col>
        </el-row>

        <div style="padding:5px 10px;">
          <el-row>
            <el-col :span="12">
              <p>1. Name of the verifier</p>
            </el-col>
            <el-col :span="12">
              <p>{{}}</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <p>2. Address of the verifier and its principal place of business:</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <p>{{}}</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <p>3. Accreditation number</p>
            </el-col>
            <el-col :span="12">
              <p>{{}}</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <p>4. Verifier's statement </p>
            </el-col>
            <el-col :span="12">
              <p>{{}}</p>
            </el-col>
          </el-row>
        </div>


        <el-row>
          <el-col :span="24">
            <h4>Part C Information on the monitoring method used and the related level of uncertainty</h4>
          </el-col>
        </el-row>

        <div style="padding:5px 10px;">
          <el-row>
            <el-col :span="12">
              <p>1. Emission source </p>
            </el-col>
            <el-col :span="12">
              <p>{{}}</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <p>2.Monitoring method(s) used (per emission source) </p>
            </el-col>
            <el-col :span="12">
              <p>{{}}</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <p>3.Related level of uncertainty </p>
            </el-col>
            <el-col :span="12">
              <p>{{}}</p>
            </el-col>
          </el-row>

        </div>


        <el-row>
          <el-col :span="24">
            <h4>Part D Results from annual monitoring of the parameters in accordance with Article 10 </h4>
          </el-col>
        </el-row>

        <div style="padding:5px 10px;">
          <el-row>
            <el-col :span="24">
              <p>FUEL CONSUMPTION AND CO2 EMITTED</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <p>1. Amount and emission factor for each type of fuel consumed in total </p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <p>Fuel type: </p>
            </el-col>
            <el-col :span="6">
              <p>Heavy fuel oil</p>
            </el-col>
            <el-col :span="6">
              <p>Diesel/Gas oil</p>
            </el-col>
            <el-col :span="6">
              <p>Light fuel oil</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <p>Emission factor:</p>
            </el-col>
            <el-col :span="6">
              <p>{{}}</p>
            </el-col>
            <el-col :span="6">
              <p>{{}}</p>
            </el-col>
            <el-col :span="6">
              <p>{{}}</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <p>Total fuel consumption:</p>
            </el-col>
            <el-col :span="6">
              <p>{{0.000}}</p>
            </el-col>
            <el-col :span="6">
              <p>{{0.000}}}</p>
            </el-col>
            <el-col :span="6">
              <p>{{0.000}}</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <p>2. Total aggregated CO2 emitted within the scope of this Regulation: </p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <p>{{ 0.00 }} </p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <p>3. aggregated CO2 emissions from all voyages between ports under a Member State's jurisdiction </p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <p>{{ 0.00 }} </p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <p>4. aggregated CO2 emissions from all voyages which departed from ports under a Member State's jurisdiction </p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <p>{{ 0.00 }} </p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <p>5. aggregated CO2 emissions from all voyages to ports under a Member State's jurisdiction </p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <p>{{ 0.00 }} </p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <p>6. CO2 emissions which occurred within ports under a Member State's jurisdiction at berth: </p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <p>{{ 0.00 }} </p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <p>7. Total fuel consumption and total aggregated CO2 emitted assigned to passenger transport (for ro-pax ships) </p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <p>{{  }} </p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <p>8. Total fuel consumption and total aggregated CO2 emitted assigned to freight transport (for ro-pax ships)</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <p>{{  }} </p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <p>9. Total fuel consumption and total aggregated CO2 emitt(ed on laden voyages (voluntary)</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <p>{{  }} </p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <p>10.Total fuel consumption for cargo heating (for chemical tankers, voluntary)</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <p>{{  }} </p>
            </el-col>
          </el-row>
        </div>


        <el-row>
          <el-col :span="24">
            <h4>DISTANCE TRAVELLED, TIME SPENT AT SEA AND TRANSPORT WORK</h4>
          </el-col>
        </el-row>

        <div style="padding:5px 10px;">
          <el-row>
            <el-col :span="12">
              <p>1.Total distance travelled: </p>
            </el-col>
            <el-col :span="12">
              <p>{{ 0.0}}</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <p>2. Total distance travelled when navigating through ice (voluntary) </p>
            </el-col>
            <el-col :span="12">
              <p>{{ 0.0}}</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <p>3. Total time spent at sea</p>
            </el-col>
            <el-col :span="12">
              <p>{{ 0.0}}</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <p>4. Total time spent at sea when navigating through ice (voluntary)</p>
            </el-col>
            <el-col :span="12">
              <p>{{ 0.0}}</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <p>5.Total transport work</p>
            </el-col>
            <el-col :span="12">
              <p>{{ 0.0}}</p>
            </el-col>
          </el-row>
        </div>


        <el-row>
          <el-col :span="12">
            <h4>ENERGY EFFICIENCY</h4>
          </el-col>
          <el-col :span="12">
            <p>{{ 0.0}}</p>
          </el-col>
        </el-row>

        <div style="padding:5px 10px;">
          <el-row>
            <el-col :span="24">
              <p>1.Average energy efficiency</p>
            </el-col>
          </el-row>
          <div style="padding:5px 10px;">
            <el-row>
              <el-col :span="24">
                <p>  a) Fuel consumption per distance</p>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <p>  b) Fuel consumption per transport work</p>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <p>  c) CO2 emissions per distance</p>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <p>  d) CO2 emissions per transport work</p>
              </el-col>
            </el-row>
          </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="EUEMissionReportInfo = false">
          {{ $t('common.close') }}
        </el-button>
        <el-button type="primary" >
          <a class='download' href='./templateFile/IMO_DCS_DATA_REPORT_TEMPLATE.xls' download=""  title="* Appendix 1-IMO DCS DATA REPORT_TEMPLATE"> {{ $t('common.export') }}</a>
        </el-button>
      </div>
    </el-dialog>

    <!-- 数据收集系统标准数据报告表 -->
      <el-dialog :append-to-body="true" width="80%" :title="$t('MRV.IMODCSDataReport')" :visible.sync="IMOReportInfo" :close-on-click-modal="false">
       <!-- <center style="font-size:24px; font-weight:bold;">数据收集系统标准数据报告表</center> -->
       		<h2 style="font-size: 18px;
    line-height: 150%;
    padding: 0;
    margin: 0 0 5px;
    text-align: center;">数据收集系统标准数据报告表</h2>
		<!-- <h3 style="
    font-size: 14px;
    line-height: 150%;
    padding: 0 0 10px;
    margin: 0 7% 10px;
    text-align: center;border-bottom:1px solid #e5e5e5;">Data Report Format for the Energy Consumption of Ships</h3> -->
      <table class="table-bor2" border="1" cellspacing="0" bordercolor="#000000" style="border-collapse:collapse;" align="center">
   		<tr>
   			<td width="50%" colspan="2">开始日期（日/月/年）<br/>
   			Start date (dd/mm/yyyy)
   			</td>
   			<td width="50%">2019-01-01</td>
   		</tr>
   		<tr>
   			<td width="50%" colspan="2">结束日期（日/月/年）<br/>
   			End date (dd/mm/yyyy)
   			</td>
   			<td width="50%">2020-01-01</td>
   		</tr>
   		<tr>
   			<td width="50%" colspan="2">IMO编号<span style="vertical-align:super; font-size: 10px;">①</span><br/>
   			IMO number
   			</td>
   			<td width="50%">9603714</td>
   		</tr>
   		<tr>
   			<td width="50%" colspan="2">船型<span style="vertical-align:super; font-size: 10px;">②</span><br/>
   			Ship type
   			</td>
   			<td width="50%">散货船</td>
   		</tr>
   		<tr>
   			<td width="50%" colspan="2">总吨位<span style="vertical-align:super; font-size: 10px;">③</span><br/>
   			Gross Tonnage</td>
   			<td width="50%">32964</td>
   		</tr>
   		<tr>
   			<td width="50%" colspan="2">净吨位<span style="vertical-align:super; font-size: 10px;">④</span><br/>
   			NT
   			</td>
   			<td width="50%">0</td>
   		</tr>
   		<tr>
   			<td width="50%" colspan="2">载重吨位<span style="vertical-align:super; font-size: 10px;">⑤</span><br/>
   			DWT
   			</td>
   			<td width="50%">56699.4</td>
   		</tr>
   		<tr>
   			<td width="50%" colspan="2">EEID(如适用/if applicable)<span style="vertical-align:super; font-size: 10px;">⑥</span>（gCO2/t.nm）
   			</td>
   			<td width="50%">0.0</td>
   		</tr>
   		<tr>
   			<td width="50%" colspan="2">冰级<span style="vertical-align:super; font-size: 10px;">⑦</span>（如适用）<br/>
   				Ice class(if applicable)
   			</td>
   			<td width="50%">N/A</td>
   		</tr>
   		<tr>
   			<td width="20%" rowspan="2">功率输出<span style="vertical-align:super; font-size: 10px;">⑧</span>(额定功率)(kW)<br/>
   			Power output(rated power)(kW)
   			</td>
   			<td width="30%">主推进动力装置<br/>
   				Main Propulsion Power
   			</td>
   			<td width="50%">9480.0</td>
   		</tr>
   		<tr>
   			<td width="30%">辅助发动机<br/>
   				Auxiliary Engine(s)
   			</td>
   			<td width="50%">No1: null / No2: null / No3: null</td>
   		</tr>
   		<tr>
   			<td width="50%" colspan="2">航行距离（nm）<br/>
   				Distance Travelled (nm)
   			</td>
   			<td width="50%"></td>
   		</tr>
   		<tr>
   			<td width="50%" colspan="2">航行小时数（h）<br/>
   				Hours underway (h)
   			</td>
   			<td width="50%"></td>
   		</tr>
   		<tr>
   			<td width="20%" rowspan="10">燃油消耗量（t）<br/>
   			Fuel oil consumption (t)
   			</td>
   			<td width="30%">柴/气油（C<span style="vertical-align:sub; font-size: 10px;">f</span>: 3.206）<br/>
   				Diesel/Gas Oil(Cf: 3.206)
   			</td>
   			<td width="50%"></td>
   		</tr>
   		<tr>
   			<td width="30%">轻燃油（C<span style="vertical-align:sub; font-size: 10px;">f</span>: 3.151）
   				LFO(Cf: 3.151)
   			</td>
   			<td width="50%"></td>
   		</tr>
   		<tr>
   			<td width="30%">重燃油（C<span style="vertical-align:sub; font-size: 10px;">f</span>: 3.114）
   				HFO(Cf: 3.114)
   			</td>
   			<td width="50%"></td>
   		</tr>
   		<tr>
   			<td width="30%">液化石油气（丙烷）（C<span style="vertical-align:sub; font-size: 10px;">f</span>: 3.000）<BR/>
   				LPG (Propane)(Cf: 3.000)
   			</td>
   			<td width="50%"></td>
   		</tr>
   		<tr>
   			<td width="30%">液化石油气（丁烷）（C<span style="vertical-align:sub; font-size: 10px;">f</span>: 3.030）<BR/>
   				LPG (Butane)(Cf: 3.030)
   			</td>
   			<td width="50%"></td>
   		</tr>
   		<tr>
   			<td width="30%">液化天然气（C<span style="vertical-align:sub; font-size: 10px;">f</span>: 2.750）<br/>
   				LNG(Cf: 2.750)
   			</td>
   			<td width="50%"></td>
   		</tr>
   		<tr>
   			<td width="30%">甲醇（C<span style="vertical-align:sub; font-size: 10px;">f</span>: 1.375）<br/>
   				Methanol(Cf: 1.375)
   			</td>
   			<td width="50%"></td>
   		</tr>
   		<tr>
   			<td width="30%">乙醇（C<span style="vertical-align:sub; font-size: 10px;">f</span>: 1.913）<br/>
   				Ethanol(Cf: 1.913)
   			</td>
   			<td width="50%"></td>
   		</tr>
   		<tr>
   			<td width="30%">其他（……）<br/>
   			Other(………)
   			</td>
   			<td width="50%">N/A</td>
   		</tr>
   		<tr>
   			<td width="30%">（C<span style="vertical-align:sub; font-size: 10px;">f</span>: ……）	</td>
   			<td width="50%">N/A</td>
   		</tr>
   		<tr>
   			<td width="50%" colspan="2">用于测量燃油消耗量的方法<span style="vertical-align:super; font-size: 10px;">⑨</span><br/>
   			Method used to measure fuel oil consumption
   			</td>
   			<td width="50%">使用燃油交付单的方法</td>
   		</tr>
   		<tr>
   			<td bordercolor="white" style="font-size: 14px; line-height: 180%" colspan="3" >
   			①  按照本组织A.1117(30)决议通过的《国际海事组织船舶识别号计划》。<br/>
   			1.In accordance with the IMO Ship Identification Number Scheme, adopted by the Organization by resolution A.1117(30). <br/>
②  见 MARPOL附则VI第2条或其他（应说明）所定义。<br/>
2.As defined in regulation 2 of MARPOL Annex VI or other (to be stated).<br/>
③  应按照1969 年国际船舶吨位丈量公约计算总吨位。<br/>
3.Gross tonnage should be calculated in accordance with the International Convention on Tonnage Measurement of Ships, 1969.<br/>
④  应按照1969 年国际船舶吨位丈量公约计算净吨位。如不适用，备注“N/A”。<br/>
4.NT should be calculated in accordance with the International Convention on Tonnage Measurement of Ships, 1969. If not applicable, note "N/A".<br/>
⑤  载重吨位系指船舶在相对密度为1025kg/m3的海水中，夏季装载吃水排水量与空船排水量之差，以吨计。夏季装载吃水应取主管机关或由其认可的组织认可的稳性手册核准的夏季吃水最大值。<br/>
5.DWT means the difference in tonnes between the displacement of a ship in water of relative density of 1025 kg/m3 at the summer load draught and the lightweight of the ship. The summer load draught should be taken as the maximum summer draught as certified in the stability booklet approved by the Administration or an organization recognized by it.<br/>
⑥  EEDI应按MEPC.245(66)决议通过的经修正的《2014年新船达到的能效设计指数（EEDI）计算方法指南》计算。如不适用，备注“N/A”。<br/>
6.EEDI should be calculated in accordance with the 2014 Guidelines on the method of calculation of the attained Energy Efficiency Design Index (EEDI) for new ships, as amended, adopted by resolution MEPC.245 (66). If not applicable, note "N/A".<br/>
⑦  冰级应符合MEPC.264(68)决议和MSC.385(94)决议通过的《国际极地水域营运船舶规则》（极地规则）规定的定义。如不适用，备注“N/A”。<br/>
7.Ice class should be consistent with the definition set out in the International Code for ships operating in polar waters (Polar Code), adopted by resolutions MEPC.264 (68) and MSC.385 (94)). If not applicable, note "N/A".<br/>
⑧  主机和辅机往复式内燃机的输出功率（额定功率）为130kW以上（以kW计）。额定功率系指发动机铭牌规定的最大连续额定功率。<br/>
8.Power output (rated power) of main and auxiliary reciprocating internal combustion engines over 130 kW (to be stated in kW). Rated power means the maximum continuous rated power as specified on the nameplate of the engine.<br/>
⑨  测量燃油消耗量的方法：1：使用燃油交付单的方法，2：使用流量计的方法，3：使用燃油舱柜监测的方法。<br/>
9.Method used to measure fuel oil consumption: 1: method using BDNs, 2: method using flow meters, 3: method using bunker fuel oil tank monitoring."<br/>
<BR/><br/>
   			</td>
   		</tr>
   	</table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="IMOReportInfo = false">
          {{ $t('common.close') }}
        </el-button>
        <el-button type="primary" >
          <a class='download' href='./templateFile/JINFACN.doc' download=""  title="* Appendix 1-IMO DCS DATA REPORT_TEMPLATE"> {{ "导出（CN）" }}</a>
        </el-button>
        <el-button type="primary" >
          <a class='download' href='./templateFile/JINFAEN.doc' download=""  title="* Appendix 1-IMO DCS DATA REPORT_TEMPLATE"> {{ "导出（EN）" }}</a>
        </el-button>
      </div>
    </el-dialog>

   <el-dialog :append-to-body="true" width="80%" :title="$t('MRV.EUEMissionReport')" :visible.sync="CMSAReportDialog" :close-on-click-modal="false">
     <table class="Kin_Table mtp10 table-nonb" width="60%" cellspacing="0" cellpadding="0" border="0" align="center">
		  <tbody>
        <tr>
          <td>
            <label><input type="checkbox" name="reportMethod" value="byTask" id="byTask"> 航次报</label>
            <p class="newline">Voyage report</p>
          </td>
        </tr>

        <tr>
          <td>
            <label><input type="checkbox" name="reportMethod" value="byYear" id="byYear"> 年报/月报</label>
            <p class="newline">Annual report /monthly report</p></td>
        </tr>

        <tr>
          <td colspan="4">
            <p class="newline">
              船舶在报告期内是否发生船舶转换船旗、所有人或经营人的情形：<br>
              Whether the following events are occurred during the report period:
            </p>
          </td>
        </tr>

        <tr>
          <td colspan="4">
            <label><input type="checkbox" name="transferFlag" value="1"> 转换船旗</label>
            <p class="newline">The transfer of a ship from one Administration to another</p>
          </td>
        </tr>

        <tr>
          <td colspan="4">
            <label><input type="checkbox" name="transferOwner" value="1"> 转换所有人或经营人</label>
            <p class="newline">A change from one Company to another</p>
          </td>
        </tr>

        <tr>
          <td colspan="4">
            <label><input type="checkbox" name="_na" value="1"> 不适用</label>
            <p class="newline"> N/A</p>
          </td>
        </tr>

      </tbody>
    </table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="CMSAReportDialog = false">
          {{ $t('common.close') }}
        </el-button>
        <el-button type="primary" @click="handleCMSAReportCreate(row)" >
          {{ $t('common.export') }}
        </el-button>
      </div>
    </el-dialog>

     <!-- CMSA报告 -->
     <el-dialog :append-to-body="true" width="80%" :title="$t('MRV.EUEMissionReport')" :visible.sync="CMSAReportCreate" :close-on-click-modal="false">

		<h2 style="font-size: 18px;
    line-height: 150%;
    padding: 0;
    margin: 0;
    text-align: center;">船舶能耗数据报告表格</h2>
		<h3 style="
    font-size: 14px;
    line-height: 150%;
    padding: 0 0 10px;
    margin: 0 7% 10px;
    text-align: center;border-bottom:1px solid #e5e5e5;">Data Report Format for the Energy Consumption of Ships</h3>

    <table width="86%" border="0" align="center" cellpadding=0 cellspacing=0 class="Kin_Table mtp10">
		<tbody id="dx01">
		   <tr>
		   	<td colspan="2">
		   	<table width="100%" border="0" class="table-nonb">
		   		<tr>
            <td width="25%">填报单位 :<br/>Name of ship</td>
            <td width="25%"> JIN FA/津發</td>
            <td width="25%">检验机构 :<br/>Authorized Organization</td>
            <td width="25%">中国船级社/<br/>China Classification Society</td>
		   		</tr>
		   		<tr>
		   		  <td colspan="4">报告周期 :<br/>Report period</td>
		   		</tr>
		   		<tr>
		   		  <td colspan="4">
		   		  <label><input type="checkbox" name="reportMethod" value="byTask"> 航次报</label>
            <p class="newline">Voyage report</p>
            </td>
		   		</tr>
		   		<tr>
		   		<td width="25%">上一停靠港口 ：<br/>Last port of call:</td>
		   		<td width="25%"></td>
		   		<td width="25%">靠泊时间 :<br/>Berthing Time</td>
		   		<td width="25%"></td>
		   		</tr>
		   		<tr>
		   		<td width="25%">本次停靠港口 ：<br/>This port of call:</td>
		   		<td width="25%"></td>
		   		<td width="25%">靠泊时间 :<br/>Berthing Time</td>
		   		<td width="25%"></td>
		   		</tr>
		   		<tr>
		   		  <td colspan="4">
		   		    <label><input type="checkbox" name="reportMethod" value="byYear" checked="checked"> 年报/月报</label>
              <p class="newline">Annual report /monthly report</p>
            </td>
		   		</tr>
		   		<tr>
		   		<td width="25%">开始日期 ：<br/>Start Date:</td>
		   		<td width="25%"></td>
		   		<td width="25%">结束日期 :<br/>End Date</td>
		   		<td width="25%"></td>
		   		</tr>
		   		<tr>
		   		<td colspan="4">
            船舶在报告期内是否发生船舶转换船旗、所有人或经营人的情形：<br>
            Whether the following events are occurred during the report period:</td>
		   		</tr>
		   		<tr>
            <td colspan="4">
              <label><input type="checkbox" name="transferFlag" value="1"> 转换船旗</label>
              <p class="newline">The transfer of a ship from one Administration to another</p>
            </td>
          </tr>
		   		<tr>
		   		  <td colspan="4">
              <label><input type="checkbox" name="transferOwner" value="1"> 转换所有人或经营人</label>
              <p class="newline">A change from one Company to another</p>
            </td>
		   		</tr>
		   		<tr>
		   		  <td colspan="4">
              <label><input type="checkbox" name="_na" value="1"> 不适用</label>
              <p class="newline">N/A</p>
            </td>
		   		</tr>
		   	</table>
		   	</td>
		   </tr>
		   <tr>
		   <td colspan="2">
		   	<table class="table-bor" width="100%"  border="1" cellspacing="0" bordercolor="#000000" style="border-collapse:collapse;">
		   		<tr align="center" style="font-weight:bold;">
		   		<td width="10%">序号<br/>Number</td>
		   		<td width="40%">填报项目<br/>Items</td>
		   		<td width="25%">填报内容<br/>Contents</td>
		   		<td width="25%">备注<br/>Notes</td>
		   		</tr>
		   		<tr>
		   		  <td colspan="4">
              <h4>一、船舶基本信息（Ship Particulars）</h4>
            </td>
		   		</tr>
		   		<tr align="center">
            <td>1.</td>
            <td>船名<br/>Name of ship</td>
            <td>JIN FA/津發</td>
            <td></td>
		   		</tr>
		   		<tr align="center">
            <td>2.</td>
            <td>公司名<br/>Name of company</td>
            <td></td>
            <td></td>
		   		</tr>
		   		<tr align="center">
            <td>3.</td>
            <td>船舶识别信息<br/>IMO number</td>
            <td>9603714</td>
            <td></td>
		   		</tr>
		   		<tr align="center">
            <td>4.</td>
            <td>船旗国<br/>Flag state </td>
            <td>Barbados</td>
            <td></td>
		   		</tr>
		   		<tr align="center">
            <td>5.</td>
            <td>船舶类型<br/>Category of ship </td>
            <td></td>
            <td></td>
		   		</tr>
		   		<tr align="center">
            <td>6.</td>
            <td>船舶种类<br/>Ship type </td>
            <td>Bulk Carrier</td>
            <td></td>
		   		</tr>
		   		<tr align="center">
            <td>7.</td>
            <td>建造时间<br/>Year of construction </td>
            <td>2012-06-28</td>
            <td></td>
		   		</tr>
		   		<tr align="center">
            <td>8.</td>
            <td>总吨<br/>Gross tonnage </td>
            <td>32964</td>
            <td></td>
		   		</tr>
		   		<tr align="center">
            <td>9.</td>
            <td>净吨<br/>Net tonnage</td>
            <td>0</td>
            <td></td>
		   		</tr>
		   		<tr align="center">
		   		<td>10.</td>
		   		<td>载重吨<br/>Deadweight tonnage</td>
		   		<td>56699.4</td>
		   		<td></td>
		   		</tr>
		   		<tr align="center">
		   		<td>11.</td>
		   		<td>集装箱箱位量<br/>TEU</td>
		   		<td>0</td>
		   		<td></td>
		   		</tr>
		   		<tr align="center">
		   		<td>12.</td>
		   		<td>船舶能效设计指数<br/>EEDI</td>
		   		<td>0.0</td>
		   		<td></td>
		   		</tr>
		   		<tr align="center">
		   		<td>13.</td>
		   		<td>冰级<br/>Ice class</td>
		   		<td></td>
		   		<td></td>
		   		</tr>
		   		<tr align="center">
		   		<td>14.</td>
		   		<td>设计航速（节）<br/>Designed speed (kn)</td>
		   		<td>14.2</td>
		   		<td></td>
		   		</tr>
		   		<tr align="center">
            <td rowspan="3">15.</td>
            <td rowspan="3" style="padding:0;">
              <table cellspacing="0" width="100%">
              <tr align="center">
                <td rowspan="3" style="border-right:1px solid black;">额定功率（kW）<br/>Power output<br/>(rated power)</td>
                <td>主机额定功率<br/>Main propulsion</td>
              </tr>
              <tr align="center">
                <td style="border-top:1px solid black;border-bottom:1px solid black;">副机额定功率<br/>Auxiliary engine (s)</td>
              </tr>
              <tr align="center">
                <td>锅炉额定功率<br/>Boiler (s )</td>
              </tr>
              </table>
            </td>
            <td>9480.0&nbsp;</td>
            <td></td>
		   		</tr>
		   		<tr align="center">
            <td>1800.0&nbsp;</td>
            <td></td>
		   		</tr>
		   		<tr align="center">
            <td>0.0&nbsp;</td>
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
		   				<td rowspan="3" style="border-right:1px solid black;">周转量<br/>Transport Work</td>
		   				<td>货物周转量(千吨•海里)<br/>Cargos(kt•nmile)</td>
		   			</tr>
		   			<tr align="center">
		   				<td style="border-top:1px solid black;border-bottom:1px solid black;">集装箱周转量(TEU•海里)<br/>TEUs(TEU•nmile)</td>
		   			</tr>
		   			<tr align="center">
		   				<td>客运周转量（人•海里）<br/>Passengers(person•nmile)</td>
		   			</tr>
		   			</table>
		   		</td>
		   		<td></td>
		   		<td></td>
		   		</tr>
		   		<tr align="center">
		   		<td>17.</td>
		   		<td></td>
		   		<td></td>
		   		</tr>
		   		<tr align="center">
		   		<td>18.</td>
		   		<td></td>
		   		<td></td>
		   		</tr>
		   		<tr align="center">
		   		<td>19.</td>
		   		<td>航行距离（海里）<br/>Distance travelled(nm)</td>
		   		<td></td>
		   		<td></td>
		   		</tr>
		   		<tr align="center">
		   		<td>20.</td>
		   		<td>航行时间（小时）<br/>Hours underway (h)</td>
		   		<td></td>
		   		<td></td>
		   		</tr>
		   		<tr align="center">
		   		<td>21.</td>
		   		<td>营运时间（小时）<br/>Operation hours (h)</td>
		   		<td></td>
		   		<td></td>
		   		</tr>
		   		<tr>
		   		<td colspan="4">
			   		<h4>三、船舶能耗数据 fuel consumption data</h4>
			   	</td>
			   </tr>
			   <tr>
		   		<td colspan="4">
			   		&nbsp;22.船用燃料消耗 Fuel consumption
			   	</td>
			   </tr>

		   		<tr align="center">
		   		<td>23.</td>
		   		<td>岸电消耗量（千瓦时）<br/>Shore power consumption (kW•h)</td>
		   		<td></td>
		   		<td></td>
		   		</tr>
		   		<tr>
		   		<td colspan="4">
			   		&nbsp;24.其他能源消耗 Other fuel consumption
			   	</td>
			   </tr>
			   <tr align="center">
		   		<td rowspan="2">其他能源1<br/> Other fuel 1</td>
		   		<td>
		   			能源种类 Fuel type
		   		</td>
		   		<td>&nbsp;</td>
		   		<td></td>
		   		</tr>
		   		<tr align="center">
		   		<td>消耗量 Quantities</td>
		   		<td>&nbsp;</td>
		   		<td></td>
		   		</tr>
			   <tr align="center">
		   		<td rowspan="2">其他能源2<br/> Other fuel 2</td>
		   		<td>
		   			能源种类 Fuel type
		   		</td>
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
		   		<td>是否使用尾气处理装置<br/>Whether to use a scrubber </td>
		   		<td></td>
		   		<td></td>
		   		</tr>
		   	</table>
		   </td>
		   </tr>

			<tr>
				<td colspan="2">
				  <table class="table-nonb" width="90%" border="0" style="margin-top:10px">
            <tr>
              <td width="25%">单位负责人：<br/>Captain:</td>
              <td width="25%"></td>
              <td width="25%">统计负责人：<br/>Person to contact:</td>
              <td width="25%"></td>
            </tr>
            <tr>
              <td width="25%">填  表  人：<br/>Reporter:</td>
              <td width="25%"></td>
              <td width="25%">联系电话：<br/>Tel:</td>
              <td width="25%"></td>
            </tr>
		   		</table>
				</td>
			</tr>
       </tbody>
    </table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="CMSAReportCreate = false">
          {{ $t('common.close') }}
        </el-button>
        <el-button type="primary" @click="handleCMSAReportCreate(row)" >
           <a class='download' href='./templateFile/report_cmsa.doc' download=""  title="report_cmsa.doc"> {{ $t('common.export') }}</a>
        </el-button>
      </div>
    </el-dialog>



  </div>
</template>

<script>
import { postFormData } from '@/api/requestPost'
import { getQueryPage, getQueryAll } from '@/api/requestGet'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import arrCargoInfo from './components/arrCargoInfo'
import deptCargoInfo from './components/deptCargoInfo'
import oilTons from './components/oilTons'
import adaptive from '@/directive/el-table'

export default {
  name: 'EmissionReport',
  components: { Pagination, arrCargoInfo, deptCargoInfo, oilTons },
  directives: { adaptive},
  filters: {
    statusFilter(status) {
      const statusMap = {
        lock: 'lock',
        unlock: 'unlock',
        empty: '--'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tableHeight: window.innerHeight - 240-200,
      dataTreeGrid: null,
      total: 0,
      listLoading: true,
      portListLoading: true,
      VesselName:"JIN FA",
      IMO:'9603714',
      listQuery: {
        page: 1,
        limit: 20,
        shipCompany: '',
        shipName: '',
        voyageName: '',
        startDate: '',
        endDate: ''
      },
      uploadReportTemp: {
        id: undefined,
        imono: '',
        startDate: '',
        endDate:''
      },
      portdialogFormVisible: false,
      driftdialogFormVisible: false,
      voyagedialogFormVisible: false,
      specdialogFormVisible: false,
      EUEMissionReportInfo:false,
      IMOReportInfo:false,
      CMSAReportDialog:false,
      CMSAReportCreate:false,
      voyagedialogStatus: '',
      portdialogStatus: '',
      driftdialogStatus: '',
      specdialogStatus: ''
    }
  },
  created() {
    this.getList()
    this.getPortList()
  },
  methods: {
    getList() {
      this.listLoading = true
      var url = '/MRVReport/uploadInfoList'
      getQueryPage(url, this.listQuery).then(response => {
        this.dataTreeGrid = response.data.items
        this.total = response.data.total
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
      this.getPortList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    resetuploadReportTemp() {
      this.uploadReportTemp = {
        id: undefined,
        imono: '',
        startDate: '',
        endDate:''
      }
    },
    handleCreateUploadInfo() {
      this.resetuploadReportTemp()
      this.voyagedialogStatus = 'create'
      this.voyagedialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['UploadInfoForm'].clearValidate()
      })
    },
    createUploadInfoData() {
      this.$refs['UploadInfoForm'].validate((valid) => {
        if (valid) {
          this.uploadReportTemp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          var url = '/MRVReport/createUploadInfo'
          postFormData(url, this.uploadReportTemp).then(() => {
            this.dataTreeGrid.unshift(this.uploadReportTemp)
            this.voyagedialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdateInfo(row) {
      this.uploadReportTemp = Object.assign({}, row) // copy obj
      this.uploadReportTemp.timestamp = new Date(this.uploadReportTemp.timestamp)
      this.voyagedialogStatus = 'update'
      this.voyagedialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['UploadInfoForm'].clearValidate()
      })
    },
    updateUploadInfoData() {
      this.$refs['UploadInfoForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.uploadReportTemp)
          var url = '/MRVReport/updateUploadInfo'
          postFormData(url, tempData).then(() => {
            for (const v of this.dataTreeGrid) {
              if (v.id === this.uploadReportTemp.id) {
                const index = this.dataTreeGrid.indexOf(v)
                this.dataTreeGrid.splice(index, 1, this.uploadReportTemp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDeleteVoyage(row) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      const index = this.dataTreeGrid.indexOf(row)
      this.dataTreeGrid.splice(index, 1)
    },
    createData() {
      this.driftdialogFormVisible = false
      this.specdialogFormVisible = false
      this.$notify({
        title: 'Success',
        message: 'Created Successfully',
        type: 'success',
        duration: 2000
      })
    },
    handleEUEMissionReportInfo(){
      this.EUEMissionReportInfo = true
    },
    handleIMOReportInfo()
    {
        this.IMOReportInfo=true
    },
    handleCMSAReportInfo(){
      this.CMSAReportDialog=true
    },
    handleCMSAReportCreate(){
      this.CMSAReportDialog=false
      this.CMSAReportCreate=true
    }
  }
}
</script>
<style scoped>
.search_fieldset {
  display: block;
  border: #e1e1e1 solid 1px;
  color: #ababab;
  margin-left:30px;
  padding-bottom:0px;
}
.radio-label {
    display: inline-block;
    font-size: 12px;
    color: #606266;
    line-height: 35px;
    padding:0;
    width:50px;
    text-align:right;
    margin-right: 10px;
  }
  .el-select{
    margin-right:20px;
  }
  .el-checkbox__label{
    padding-left:5px;font-size: 12px;
  }
  .el-dialog__body p{
    line-height:180%;padding:0;margin:0;font-size:12px;
  }

.label{font-size:14px;font-weight:normal;}
.table-nonb tr td{
  line-height:170%;
  padding:3px 0;
  font-size:12px;
}
.newline{
  margin:0;
  padding:0;
  padding-left:16px;
}
input[type="checkbox"]{
  vertical-align:middle;
}
h4{margin:0;padding:5px 0;font-size:14px;line-height:150%}

.table-bor tr td{
  padding:5px 10px;
  line-height:140%;
  font-size:12px;
}

.table-bor2 tr td{
  padding:5px 10px;
  font-size:12px;
  text-align:center;
  line-height:140%;
}

</style>
