<template>
  <div class="app-container">
    <div class="filter-container">
      <div style="padding:10px 10px 0;">
        <label class="radio-label">{{ $t('MRV.shipCompany') }}</label>
        <el-input
          v-model="getImoStdRptsData.keyword"
          :placeholder="$t('common.keys')"
          style="width: 240px;margin-right:10px;"
          class="filter-item"
        />
        <label class="radio-label">{{ $t('MRV.FlagState') }}</label>
        <el-input
          v-model="getImoStdRptsData.flag"
          :placeholder="$t('common.inputRemind')"
          style="width: 240px;margin-right:10px;"
          class="filter-item"
        />
        <label class="radio-label">{{ $t('MRV.Reportstatus') }}</label>
        <el-select v-model="getImoStdRptsData.imoRptStatus" :placeholder="$t('common.selectRemind')">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div style="padding:5px 10px 0;">
        <label class="radio-label">{{ $t('MRV.Period') }}</label>
        <el-date-picker
          v-model="value"
          type="daterange"
          :range-separator="$t('voyage.voyageTo')"
          :start-placeholder="$t('voyage.Startdate')"
          :end-placeholder="$t('voyage.enddate')"
          style="width:310px"
          @change="handTime"
        />
        <!-- <el-date-picker
          v-model="getImoStdRptsData.startTime"
          :editable="true"
          type="date"
          align="left"
          style="width:150px"
          :placeholder="$t('common.datePickerRemind')"
        />~
        <el-date-picker
          v-model="getImoStdRptsData.endTime"
          :editable="true"
          type="date"
          align="left"
          style="width:150px"
          :placeholder="$t('common.datePickerRemind')"
        /> -->
        <el-button
          class="filter-item"
          icon="el-icon-search"
          style="margin-left:20px"
          @click="handleFilter"
        >{{ $t('common.search') }}
        </el-button>
        <el-button
          class="filter-item"
          type="info"
          icon="el-icon-setting"
          @click="handleRest"
        >{{ $t('common.reset') }}
        </el-button>
      </div>
      <div style="margin-top:10px;">
        <el-dropdown @command="handleCreateUploadInfo">
          <el-button type="primary">
            {{ $t('common.add') }}<i class="el-icon-arrow-down el-icon--right"/>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="Autogenerate">{{ $t('MRV.Autogenerate') }}</el-dropdown-item>
            <el-dropdown-item command="Fillinmanually">{{ $t('MRV.Fillinmanually') }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button
          class="filter-item"
          type="primary"
          @click="handleCreateSubmitted"
        >{{ $t('common.Submitted') }}
        </el-button>
        <el-dropdown @command="handleCreateDowon">
          <el-button type="warning">
            {{ $t('common.Datadownload') }}<i class="el-icon-arrow-down el-icon--right"/>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="0">{{ $t('MRV.Downloadselected') }}</el-dropdown-item>
            <el-dropdown-item command="1">{{ $t('MRV.Downloadall') }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- <el-button
          class="filter-item"
          type="warning"
          @click="handleCreateDowon"
        >{{ $t('common.Datadownload') }}</el-button> -->
      </div>
    </div>
    <div>
      <el-table
        v-loading="listLoading"
        v-adaptive="{bottomOffset: 38}"
        :data="dataTreeGrid"
        border
        fit
        :height="tableHeight"
        style="width: 100%; overflow:auto"
        highlight-current-row
        :row-style="{height:'35px'}"
        :cell-style="{padding:'0'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"/>
        <el-table-column
          :label="$t('MRV.IMONoOrRegistrationNo')"
          align="center"
          width="auto"
          show-overflow-tooltip
        >
          <template slot-scope="{row}">
            <span>{{ row.imoNu }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('MRV.ManagementCompany')"
          align="center"
          width="auto"
          show-overflow-tooltip
        >
          <template slot-scope="{row}">
            <span>{{ row.docManager }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('MRV.NameOfShip')"
          align="center"
          width="auto"
          show-overflow-tooltip
        >
          <template slot-scope="{row}">
            <span @click="handleUpdateInfo(row)">{{ row.shipName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('MRV.FlagState')"
          width="auto"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="{row}">
            <span>{{ row.flag }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('MRV.Class')" width="auto" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.shipType }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('MRV.ReportStartDate')"
          width="auto"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="{row}">
            <span>{{ row.rptStartTime | datesformat('YYYY-MM-DD HH:mm') }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('MRV.ReportEndDate')"
          width="auto"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="{row}">
            <span>{{ row.rptEndTime | datesformat('YYYY-MM-DD HH:mm') }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('MRV.Reportstatus')"
          width="auto"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="{row}">
            <span v-if="row.rptStatus =='1'">{{ $t('MRV.Registration') }}</span>
            <span v-if="row.rptStatus =='2'">{{ $t('MRV.Lockstate') }}</span>
            <span v-if="row.rptStatus =='3'">{{ $t('MRV.Submitted') }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('common.operate')"
          align="left"
          class-name="small-padding fixed-width"
          show-overflow-tooltip
          width="320"
        >
          <template slot-scope="{row}">
            <el-button
              v-if="row.rptStatus=='1'"
              size="mini"
              type="warning"
              @click="handleModifyStatus(row)"
            >{{ $t('voyage.btnLock') }}
            </el-button>
            <el-button
              v-if="row.rptStatus =='2' || row.rptStatus == '3'"
              size="mini"
              @click="handleModifyStatus(row)"
            >{{ $t('voyage.btnUnLock') }}
            </el-button>
            <el-button
              v-if="row.rptStatus =='1'"
              type="primary"
              size="mini"
              @click="handleUpdateInfo(row)"
            >{{ $t('common.edit') }}
            </el-button>
            <el-button
              v-if="row.rptStatus !=='1'"
              type="primary"
              size="mini"
              @click="handleUpdateInfo(row)"
            >{{ $t('common.detail') }}
            </el-button>
            <el-button
              v-if="row.rptStatus =='2' && row.flag !=='LBR'"
              style="width:85px;"
              size="mini"
              type="primary"
              @click="handleDeleteVoyage(row)"
            >{{ $t('common.Submitted') }}
            </el-button>
            <el-button
              v-if="row.flag =='LBR'"
              size="mini"
              type="primary"
              @click="handleDeleteLoad(row)"
            >{{ $t('common.Liberia') }}
            </el-button>
            <el-button
              v-if="row.rptStatus =='1'"
              size="mini"
              type="danger"
              @click="handleDelete(row)"
            >{{ $t('common.delete') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" style="margin:0px;padding:0px" :total="total"
                  :page.sync="getImoStdRptsData.currentPage" :limit.sync="getImoStdRptsData.pageSize"
                  @pagination="getList"/>
    </div>
    <!-- 自动生成弹框 -->
    <el-dialog
      :title="$t('MRV.Generatereport')"
      :visible.sync="voyagedialogFormVisible"
      :close-on-click-modal="false"
      width="80%"
      :append-to-body="true"
    >
      <el-form
        ref="generateData"
        :model="generateData"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:20px;"
      >
        <el-form-item label-width="150px" :label="$t('shipBattery.shipName')" prop="imono">
          <div class="addBox">
            <el-input v-model="shipNam" disabled :placeholder="$t('MRV.boxselect')"/>
            <el-button
              type="primary"
              style="margin-left:20px"
              @click="addImon"
            >{{ $t('common.select') }}
            </el-button>
          </div>
        </el-form-item>
        <el-form-item label-width="150px" :label="$t('MRV.ShipIMONo')" prop="imono">
          <div class="addBox">
            <el-input v-model="shipMOM" disabled :placeholder="$t('MRV.boxselect')" style="width:174px;"/>
          </div>
        </el-form-item>
        <el-form-item label-width="150px" :label="$t('MRV.particularyear')" prop="imono">
          <div class="addBox">
            <el-select v-model="generateData.year" :placeholder="$t('common.selectRemind')">
              <el-option
                v-for="item in ReportingyearArray"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
            <el-button @click="queryPostClick">{{ $t('MRV.query') }}</el-button>
          </div>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" :height="tableHeight" style="width: 100%;">
        <el-table-column type="index" :label="$t('common.no')" width="50"/>
        <el-table-column :label="$t('voyage.startDate')">
          <template slot-scope="scope">
            <el-date-picker
              v-model="scope.row.startTime"
              type="datetime"
              :placeholder="$t('common.datePickerRemind')"
              style="width:80%"
              format="yyyy-MM-dd"
            />
          </template>
        </el-table-column>
        <el-table-column :label="$t('voyage.endDate')">
          <template slot-scope="scope">
            <el-date-picker
              v-model="scope.row.endTime"
              type="datetime"
              :placeholder="$t('common.datePickerRemind')"
              style="width:80%"
              format="yyyy-MM-dd"
            />
          </template>
        </el-table-column>
        <el-table-column :label="$t('common.operate')">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.imoRptStatus === 0"
              type="primary"
              @click="addIMOReportInfo(scope.row)"
            >{{ $t('MRV.Generative') }}
            </el-button>
            <el-button
              v-if="scope.row.imoRptStatus === 1"
              type="primary"
              disabled
            >{{ $t('MRV.Nongenerative') }}
            </el-button>
            <el-button
              v-if="scope.row.imoRptStatus === 2"
              type="primary"
              @click="addIMOReportInfo(scope.row)"
            >{{ $t('MRV.Alreadygenerated') }}
            </el-button>
            <el-button type="danger" @click="deleteArr(scope.row)">{{ $t("common.delete") }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 手工填写弹框 -->
    <el-dialog
      :title="$t('MRV.Fillinmanually')"
      :visible.sync="voyagedialogFillinmanually"
      :close-on-click-modal="false"
      width="80%"
      :append-to-body="true"
    >
      <el-form
        ref="uploadReportTemp"
        :model="uploadReportTemp"
        :rules="rules"
        label-position="left"
        label-width="130px"
      >
        <!-- <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('MRV.Reportingyear')" prop="imono">
              <el-select
                v-model="Reportingyear"
                :placeholder="$t('common.selectRemind')"
                style="width: 150px"
              >
                <el-option
                  v-for="item in ReportingyearArray"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row> -->
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('MRV.Reportstartdates')" prop="startTime">
              <el-date-picker
                v-model="dateTimes"
                type="daterange"
                :range-separator="$t('voyage.voyageTo')"
                :start-placeholder="$t('voyage.Startdate')"
                :end-placeholder="$t('voyage.enddate')"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider content-position="left">{{ $t('MRV.ShipParticulars') }}</el-divider>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('MRV.FlagAdministration')" prop="flag">
              <el-select
                v-model="uploadReportTemp.flagCode"
                clearable
                filterable
                :placeholder="$t('common.selectRemind')"
                style="width: 150px"
              >
                <el-option
                  v-for="find in findGcStateList"
                  :key="find.id"
                  filterable
                  :label="find.enBrief"
                  :value="find.threeCode"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('MRV.IMONumber')" prop="imoNu">
              <el-input
                v-model="uploadReportTemp.imoNu"
                style="width: 38%"
                class="filter-item"
              />
              <el-button @click="dalogData">{{ $t('common.selectRemind') }}</el-button>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('MRV.Shiptype')" prop="shipType">
              <el-select
                v-model="uploadReportTemp.shipType"
                clearable
                filterable
                :placeholder="$t('common.selectRemind')"
                style="width: 150px"
              >
                <el-option
                  v-for="findShip in findShipTypeList"
                  :key="findShip.id"
                  :label="findShip.euSptype"
                  :value="findShip.spcode"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('MRV.Grosstonnage')" prop="gross">
              <el-input
                v-model="uploadReportTemp.gross"
                style="width: 135px"
                class="filter-item"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('MRV.Nettonnage')" prop="net">
              <el-input
                v-model="uploadReportTemp.net"
                style="width: 150px"
                class="filter-item"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('MRV.Deadweighttonnage')" prop="dwt">
              <el-input
                v-model="uploadReportTemp.dwt"
                style="width: 135px"
                class="filter-item"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('MRV.Mainpropulsionpoweroutput')" prop="oiMainEngines">
              <div
                v-for="(oiMainEngine, index) in uploadReportTemp.oiMainEngines"
                :key="index"
                class="adds"
              >
                <div>
                  <el-input
                    v-model="oiMainEngine.ratePower"
                    style="width: 150px"
                    class="filter-item"
                  >
                    <span slot="suffix" style="color:red">kW</span>
                  </el-input>
                  <el-button type="primary" icon="el-icon-plus" @click="addDatas"/>
                  <el-button
                    v-if="uploadReportTemp.oiMainEngines.length>1"
                    type="danger"
                    icon="el-icon-delete"
                    @click="DeteleDatas(index)"
                  />
                </div>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="$t('MRV.Auxiliaryenginepoweroutput')" prop="endDate">
              <div v-for="(oiShipGe, indexs) in uploadReportTemp.oiShipGes" :key="indexs" class="adds">
                <div>
                  <el-input
                    v-model="oiShipGe.ratePower"
                    style="width: 150px;"
                    class="filter-item"
                  >
                    <span slot="suffix" style="color:red">kW</span>
                  </el-input>
                  <el-button type="primary" icon="el-icon-plus" @click="addDatass"/>
                  <el-button
                    v-if="uploadReportTemp.oiShipGes.length>1"
                    type="danger"
                    icon="el-icon-delete"
                    @click="DeteleDatass(indexs)"
                  />
                </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('MRV.EEDI')" prop="endDate">
              <el-input v-model="uploadReportTemp.eedi" style="width: 150px" class="filter-item" type="number"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('MRV.Iceclass')" prop="endDate">
              <el-input
                v-model="uploadReportTemp.ice"
                style="width: 150px"
                class="filter-item"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider content-position="left">{{ $t('MRV.ConsumptionData') }}</el-divider>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('MRV.Distancetravelled')" prop="endDate">
              <el-input
                v-model="uploadReportTemp.distance"
                οnkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"
                style="width: 150px"
                class="filter-item"
                type="number"
              >
                <span slot="suffix" style="color:red">nm</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('MRV.Hoursunderway')" prop="endDate">
              <el-input
                v-model="uploadReportTemp.distanceHour"
                type="number"
                style="width: 150px"
                class="filter-item"
              >
                <span slot="suffix" style="color:red">hour</span>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-divider content-position="left">{{ $t('MRV.Consumption') }}</el-divider>
        <el-row v-for="(item, indexe) in uploadReportTemp.manualOilDtos" :key="indexe">
          <el-col :span="8">
            <el-form-item :label="$t('MRV.Fueloiltype')" prop="endDate">
              <el-select
                v-model="item.oilId"
                filterable
                :placeholder="$t('common.selectRemind')"
              >
                <el-option
                  v-for="Code in manuinfor"
                  :key="Code.id"
                  :label="Code.fuelName"
                  :value="Code.fuelCode"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('MRV.Quantity')" prop="endDate">
              <el-input v-model="item.fuelTons" class="filter-item" style="width:100px;">
                <span slot="suffix" style="color:red">tons</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item :label="$t('MRV.Datacollectionmethod')" prop="endDate">
              <div class="addBox">
                <el-select
                  v-model="item.useMethod"
                  filterable
                  :placeholder="$t('common.selectRemind')"
                >
                  <el-option
                    v-for="Report in ReportingindemendArray"
                    :key="Report.id"
                    :label="Report.label"
                    :value="Report.value"
                  />
                </el-select>
                <el-button
                  v-if="uploadReportTemp.manualOilDtos.length>1"
                  type="danger"
                  icon="el-icon-delete"
                  @click="DeteleData(indexe)"
                />
                <el-button
                  type="primary"
                  icon="el-icon-plus"
                  @click="addData"
                />
              </div>
            </el-form-item>
          </el-col>
          <!-- <div v-for="(item, indexe) in uploadReportTemp.manualOilDtos" :key="indexe" style="line-height:">
            <el-col :span="8" >
              <el-form-item :label="$t('MRV.Fueloiltype')" prop="endDate" >
                <el-select
                  v-model="item.oilId"
                  filterable
                  :placeholder="$t('common.selectRemind')"
                >
                  <el-option
                    v-for="Code in manuinfor"
                    :key="Code.id"
                    :label="Code.fuelName"
                    :value="Code.fuelCode"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('MRV.Quantity')" prop="endDate">
                <el-input v-model="item.fuelTons" class="filter-item" style="width:100px;">
                  <span slot="suffix" style="color:red">tons</span>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('MRV.Datacollectionmethod')" prop="endDate">
                <div class="addBox">
                  <el-select
                    v-model="item.useMethod"
                    filterable
                    :placeholder="$t('common.selectRemind')"
                  >
                    <el-option
                      v-for="Report in ReportingindemendArray"
                      :key="Report.id"
                      :label="Report.label"
                      :value="Report.value"
                    />
                  </el-select>
                  <el-button
                    v-if="uploadReportTemp.manualOilDtos.length>1"
                    type="primary"
                    @click="DeteleData(indexe)"
                  >{{ $t('common.delete') }}</el-button>
                </div>
              </el-form-item>
            </el-col>
          </div> -->
        </el-row>

        <!-- <el-form-item prop="endDate">
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="addData"
          >{{ $t('MRV.AddConsumptionData') }}</el-button>
        </el-form-item> -->
        <el-form-item :label="$t('MRV.BDN')" prop="CollectedData">
          <el-upload
            class="upload-demo"
            action="/sysUpload/upload"
            :data="currentFile"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-change="handleChange"
            :before-upload="handleBeforeUpload"
            :on-success="handleSuccess"
            :on-error="handError"
            accept=".xlsx,.xls"
            multiple
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button slot="trigger" size="small" type="primary">{{ $t('sysDocNotice.clickToUpload') }}</el-button>
            <div slot="tip" class="el-upload__tip"/>
            {{ $t('voyage.OnlyExcel') }}
          </el-upload>
        </el-form-item>
        <el-form-item :label="$t('MRV.CollectedData')" prop="CollectedData">
          <el-upload
            class="upload-demow"
            action="/sysUpload/upload"
            :data="currentFiled"
            :on-remove="handleRemoves"
            :before-remove="beforeRemoves"
            :on-change="handleChanges"
            :before-upload="handleBeforeUploads"
            :on-success="handleSuccesss"
            :on-error="handErrors"
            accept=".xlsx,.xls"
            multiple
            :limit="1"
            :on-exceed="handleExceeds"
            :file-list="fileListd"
          >
            <el-button slot="trigger" size="small" type="primary">{{ $t('sysDocNotice.clickToUpload') }}</el-button>
            <div slot="tip" class="el-upload__tip"/>
            {{ $t('voyage.OnlyExcel') }}
          </el-upload>
        </el-form-item>
      </el-form>
      <div style="text-align:center">
        <el-button type="primary" :disabled="disableds" @click="exportManuClick(&quot;0&quot;)">导出(CN)</el-button>
        <el-button type="primary" :disabled="disableds" @click="exportManuClick(&quot;1&quot;)">导出(EN)</el-button>
        <el-button type="primary" :disabled="disableds" @click="ManualBdnData">导出BDN报告</el-button>
        <el-button type="primary" :disabled="disableds" @click="ManualCdData">导出CollectionData报告</el-button>
        <el-button type="primary" :disabled="disableds" @click="showsaveClick">{{ $t('common.save') }}</el-button>
        <el-button v-if="flags" type="danger" @click="btnLockClick(list.imoStdId,list.rptSource)">{{
          $t('voyage.btnLock') }}
        </el-button>
        <el-button v-if="flags" @click="btnLockClick(list.imoStdId,list.rptSource)">{{ $t('voyage.btnUnLock') }}
        </el-button>
        <el-button type="primary" @click="showcloseClick">{{ $t('common.close') }}</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :title="$t('MRV.IMODCSDataReport')"
      :visible.sync="IMOReportInfo"
      :close-on-click-modal="false"
      width="80%"
      :append-to-body="true"
    >
      <div v-loading="dialogLoading" element-loading-text="Calculation in progress, please wait">
        <h2
          style="font-size: 18px;
    line-height: 150%;
    padding: 0;
    margin: 0 0 5px;
    text-align: center;"
        >{{ $t('MRV.standard') }}</h2>
        <table
          class="table-bor2"
          border="1"
          cellspacing="0"
          bordercolor="#000000"
          style="border-collapse:collapse; font-size:14px;"
          align="center"
        >
          <tr style="padding: 0 10px;">
            <td width="50%" class="pad" colspan="2">
              开始日期（日/月/年）
              <br>Start date (dd/mm/yyyy)
            </td>
            <td width="50%" class="pad">{{ list.startTime | datesformat('YYYY-MM-DD HH:mm') }}</td>
          </tr>
          <tr>
            <td width="50%" class="pad" colspan="2">
              结束日期（日/月/年）
              <br>End date (dd/mm/yyyy)
            </td>
            <td width="50%" class="pad">{{ list.endTime | datesformat('YYYY-MM-DD HH:mm') }}</td>
          </tr>
          <tr>
            <td width="50%" colspan="2" class="pad">
              IMO编号
              <span style="vertical-align:super; font-size: 10px;">①</span>
              <br>IMO number
            </td>
            <td width="50%" class="pad">{{ list.imoNu }}</td>
          </tr>
          <tr>
            <td width="50%" colspan="2" class="pad">
              船型
              <span style="vertical-align:super; font-size: 10px;">②</span>
              <br>Ship type
            </td>
            <td width="50%" class="pad">{{ list.shipType }}</td>
          </tr>
          <tr>
            <td width="50%" colspan="2" class="pad">
              总吨位
              <span style="vertical-align:super; font-size: 10px;">③</span>
              <br>Gross Tonnage
            </td>
            <td width="50%" class="pad">{{ list.gross }}</td>
          </tr>
          <tr>
            <td width="50%" colspan="2" class="pad">
              净吨位
              <span style="vertical-align:super; font-size: 10px;">④</span>
              <br>NT
            </td>
            <td width="50%" class="pad">{{ list.net }}</td>
          </tr>
          <tr>
            <td width="50%" colspan="2" class="pad">
              载重吨位
              <span style="vertical-align:super; font-size: 10px;">⑤</span>
              <br>DWT
            </td>
            <td width="50%" class="pad">{{ list.dwt }}</td>
          </tr>
          <tr>
            <td width="50%" colspan="2" class="pad">
              EEDI(如适用/if applicable)
              <span style="vertical-align:super; font-size: 10px;">⑥</span><br>(gCO2/t.nm)
            </td>
            <td width="50%" class="pad">{{ list.eedi }}</td>
          </tr>
          <tr>
            <td width="50%" colspan="2" class="pad">
              冰级
              <span style="vertical-align:super; font-size: 10px;">⑦</span>（如适用）
              <br>Ice class(if applicable)
            </td>
            <td width="50%" class="pad">{{ list.ice }}</td>
          </tr>
          <tr>
            <td width="20%" rowspan="2" class="pad">
              功率输出
              <span style="vertical-align:super; font-size: 10px;">⑧</span>(额定功率)(kW)
              <br>Power output(rated power)(kW)
            </td>
            <td width="30%" class="pad">
              主推进动力装置
              <br>Main Propulsion Power
            </td>
            <td width="50%" class="pad">{{ list.mainEngines }}</td>
          </tr>
          <tr>
            <td width="30%" class="pad">
              辅助发动机
              <br>Auxiliary Engine(s)
            </td>
            <td width="50%" class="pad">{{ list.auxEngines }}</td>
          </tr>
          <tr>
            <td width="50%" colspan="2" class="pad">
              航行距离（nm）
              <br>Distance Travelled (nm)
            </td>
            <td width="50%" class="pad">
              <p class="inputBox">
                <el-input
                  v-model="list.distance"
                  type="number"
                  class="filter-item"
                  style="width:30%"
                />
                +
                <el-input
                  v-model="list.correctionDistance"
                  type="number"
                  class="filter-item"
                  style="width:30%"
                />
                =
                <span>{{ Number(list.distance)+Number(list.correctionDistance) }}</span>
              </p>
            </td>
          </tr>
          <tr>
            <td width="50%" colspan="2" class="pad">
              航行小时数（h）
              <br>Hours underway (h)
            </td>
            <td width="50%" class="pad">
              <p class="inputBox">
                <el-input
                  v-model="list.distanceHour"
                  type="number"
                  class="filter-item"
                  style="width:30%"
                />
                +
                <el-input
                  v-model="list.correctionDistanceHour"
                  type="number"
                  class="filter-item"
                  style="width:30%"
                />
                =
                <span>{{ Number(list.distanceHour)+Number(list.correctionDistanceHour) }}</span>
              </p>
            </td>
          </tr>
          <tr>
            <td width="20%" rowspan="10" class="pad">
              燃油消耗量（t）
              <br>Fuel oil consumption (t)
            </td>
            <td width="30%" class="pad">
              柴/气油（C
              <span style="vertical-align:sub; font-size: 10px;">f</span>: 3.206）
              <br>Diesel/Gas Oil(Cf: 3.206)
            </td>
            <td width="50%" class="pad">
              <p class="inputBox">
                <el-input
                  v-model="list.chaiFo"
                  type="number"
                  class="filter-item"
                  style="width:30%"
                />
                +
                <el-input
                  v-model="list.correctionChaiFo"
                  type="number"
                  class="filter-item"
                  style="width:30%"
                />
                =
                <span>{{ Number(list.chaiFo)+Number(list.correctionChaiFo) }}</span>
              </p>
            </td>
          </tr>
          <tr>
            <td width="30%" class="pad">
              轻燃油（C
              <span style="vertical-align:sub; font-size: 10px;">f</span>: 3.151）
              <br> LFO(Cf: 3.151)
            </td>
            <td width="50%" class="pad">
              <p class="inputBox">
                <el-input
                  v-model="list.lfo"
                  type="number"
                  class="filter-item"
                  style="width:30%"
                />
                +
                <el-input
                  v-model="list.correctionLfo"
                  type="number"
                  class="filter-item"
                  style="width:30%"
                />
                =
                <span>{{ Number(list.lfo)+Number(list.correctionLfo) }}</span>
              </p>
            </td>
          </tr>
          <tr>
            <td width="30%" class="pad">
              重燃油（C
              <span style="vertical-align:sub; font-size: 10px;">f</span>: 3.114）
              <br>HFO(Cf: 3.114)
            </td>
            <td width="50%" class="pad">
              <p class="inputBox">
                <el-input
                  v-model="list.hfo"
                  type="number"
                  class="filter-item"
                  style="width:30%"
                />
                +
                <el-input
                  v-model="list.correctionHfo"
                  type="number"
                  class="filter-item"
                  style="width:30%"
                />
                =
                <span>{{ Number(list.hfo)+Number(list.correctionHfo) }}</span>
              </p>
            </td>
          </tr>
          <tr>
            <td width="30%" class="pad">
              液化石油气（丙烷）（C
              <span style="vertical-align:sub; font-size: 10px;">f</span>: 3.000）
              <BR/>LPG (Propane)(Cf: 3.000)
            </td>
            <td width="50%" class="pad">
              <p class="inputBox">
                <el-input
                  v-model="list.propane"
                  type="number"
                  class="filter-item"
                  style="width:30%"
                />
                +
                <el-input
                  v-model="list.correctionPropane"
                  type="number"
                  class="filter-item"
                  style="width:30%"
                />
                =
                <span>{{ Number(list.propane)+Number(list.correctionPropane) }}</span>
              </p>
            </td>
          </tr>
          <tr>
            <td width="30%" class="pad">
              液化石油气（丁烷）（C
              <span style="vertical-align:sub; font-size: 10px;">f</span>: 3.030）
              <BR/>LPG (Butane)(Cf: 3.030)
            </td>
            <td width="50%" class="pad">
              <p class="inputBox">
                <el-input
                  v-model="list.butane"
                  type="number"
                  class="filter-item"
                  style="width:30%"
                />
                +
                <el-input
                  v-model="list.correctionButane"
                  type="number"
                  class="filter-item"
                  style="width:30%"
                />
                =
                <span>{{ Number(list.butane)+Number(list.correctionButane) }}</span>
              </p>
            </td>
          </tr>
          <tr>
            <td width="30%" class="pad">
              液化天然气（C
              <span style="vertical-align:sub; font-size: 10px;">f</span>: 2.750）
              <br>LNG(Cf: 2.750)
            </td>
            <td width="50%" class="pad">
              <p class="inputBox">
                <el-input
                  v-model="list.lng"
                  type="number"
                  class="filter-item"
                  style="width:30%"
                />
                +
                <el-input
                  v-model="list.correctionLng"
                  type="number"
                  class="filter-item"
                  style="width:30%"
                />
                =
                <span>{{ Number(list.lng)+Number(list.correctionLng) }}</span>
              </p>
            </td>
          </tr>
          <tr>
            <td width="30%" class="pad">
              甲醇（C
              <span style="vertical-align:sub; font-size: 10px;">f</span>: 1.375）
              <br>Methanol(Cf: 1.375)
            </td>
            <td width="50%" class="pad">
              <p class="inputBox">
                <el-input
                  v-model="list.methanol"
                  type="number"
                  class="filter-item"
                  style="width:30%"
                />
                +
                <el-input
                  v-model="list.correctionMethanol"
                  type="number"
                  class="filter-item"
                  style="width:30%"
                />
                =
                <span>{{ Number(list.methanol)+Number(list.correctionMethanol) }}</span>
              </p>
            </td>
          </tr>
          <tr>
            <td width="30%" class="pad">
              乙醇（C
              <span style="vertical-align:sub; font-size: 10px;">f</span>: 1.913）
              <br>Ethanol(Cf: 1.913)
            </td>
            <td width="50%" class="pad">
              <p class="inputBox">
                <el-input
                  v-model="list.ethanol"
                  type="number"
                  class="filter-item"
                  style="width:30%"
                />
                +
                <el-input
                  v-model="list.correctionEthanol"
                  type="number"
                  class="filter-item"
                  style="width:30%"
                />
                =
                <span>{{ Number(list.ethanol)+Number(list.correctionEthanol) }}</span>
              </p>
            </td>
          </tr>
          <tr>
            <td width="30%" class="pad">
              其他（……）
              <br>Other(………)
            </td>
            <td width="50%" class="pad">N/A</td>
          </tr>
          <tr>
            <td width="30%" class="pad">
              （C
              <span style="vertical-align:sub; font-size: 10px;">f</span>: ……）
            </td>
            <td width="50%" class="pad">{{ list.other }}</td>
          </tr>
          <tr>
            <td width="50%" colspan="2" class="pad">
              用于测量燃油消耗量的方法
              <span style="vertical-align:super; font-size: 10px;">⑨</span>
              <br>Method used to measure fuel oil consumption
            </td>
            <td width="50%" class="pad">{{ list.methodUse }}</td>
          </tr>
          <tr>
            <td bordercolor="white" style="font-size: 14px; line-height: 180%" class="pad" colspan="3">
              ① 按照本组织A.1117(30)决议通过的《国际海事组织船舶识别号计划》。
              <br>1.In accordance with the IMO Ship Identification Number Scheme, adopted by the Organization by
              resolution A.1117(30).
              <br>② 见 MARPOL附则VI第2条或其他（应说明）所定义。
              <br>2.As defined in regulation 2 of MARPOL Annex VI or other (to be stated).
              <br>③ 应按照1969 年国际船舶吨位丈量公约计算总吨位。
              <br>3.Gross tonnage should be calculated in accordance with the International Convention on Tonnage
              Measurement of Ships, 1969.
              <br>④ 应按照1969 年国际船舶吨位丈量公约计算净吨位。如不适用，备注“N/A”。
              <br>4.NT should be calculated in accordance with the International Convention on Tonnage Measurement of
              Ships, 1969. If not applicable, note "N/A".
              <br>⑤ 载重吨位系指船舶在相对密度为1025kg/m3的海水中，夏季装载吃水排水量与空船排水量之差，以吨计。夏季装载吃水应取主管机关或由其认可的组织认可的稳性手册核准的夏季吃水最大值。
              <br>5.DWT means the difference in tonnes between the displacement of a ship in water of relative density
              of 1025 kg/m3 at the summer load draught and the lightweight of the ship. The summer load draught should
              be taken as the maximum summer draught as certified in the stability booklet approved by the
              Administration or an organization recognized by it.
              <br>⑥ EEDI应按MEPC.245(66)决议通过的经修正的《2014年新船达到的能效设计指数（EEDI）计算方法指南》计算。如不适用，备注“N/A”。
              <br>6.EEDI should be calculated in accordance with the 2014 Guidelines on the method of calculation of the
              attained Energy Efficiency Design Index (EEDI) for new ships, as amended, adopted by resolution MEPC.245
              (66). If not applicable, note "N/A".
              <br>⑦ 冰级应符合MEPC.264(68)决议和MSC.385(94)决议通过的《国际极地水域营运船舶规则》（极地规则）规定的定义。如不适用，备注“N/A”。
              <br>7.Ice class should be consistent with the definition set out in the International Code for ships
              operating in polar waters (Polar Code), adopted by resolutions MEPC.264 (68) and MSC.385 (94)). If not
              applicable, note "N/A".
              <br>⑧ 主机和辅机往复式内燃机的输出功率（额定功率）为130kW以上（以kW计）。额定功率系指发动机铭牌规定的最大连续额定功率。
              <br>8.Power output (rated power) of main and auxiliary reciprocating internal combustion engines over 130
              kW (to be stated in kW). Rated power means the maximum continuous rated power as specified on the
              nameplate of the engine.
              <br>⑨ 测量燃油消耗量的方法：1：使用燃油交付单的方法，2：使用流量计的方法，3：使用燃油舱柜监测的方法。
              <br>9.Method used to measure fuel oil consumption: 1: method using BDNs, 2: method using flow meters, 3:
              method using bunker fuel oil tank monitoring."
              <br>
              <BR/>
              <br>
            </td>
          </tr>
        </table>
        <div slot="footer" class="dialog-footer">
          <el-button :disabled="disableds" @click="saveClick">{{ $t('common.save') }}</el-button>
          <el-button type="primary" @click="exportClick(&quot;0&quot;)">
            {{ $t('MRV.exportCn') }}
          </el-button>
          <el-button type="primary" @click="exportClick(&quot;1&quot;)">
            {{ $t('MRV.exportEn') }}
          </el-button>
          <el-button type="primary" @click="BdnData">
            {{ $t('MRV.exportBDN') }}
          </el-button>
          <el-button type="primary" @click="collectionData">
            {{ $t('MRV.ExportcollectionData') }}
          </el-button>
          <el-button
            v-if="list.rptStatus =='1'"
            size="mini"
            type="danger"
            @click="btnClick"
          >{{ $t('voyage.btnLock') }}
          </el-button>
          <el-button
            v-if="list.rptStatus =='2' || list.rptStatus == '3'"
            size="mini"
            @click="btnClick"
          >{{ $t('voyage.btnUnLock') }}
          </el-button>
          <el-button @click="IMOReportInfo = false;voyagedialogFormVisible = false">{{ $t('common.close') }}</el-button>
        </div>
      </div>
    </el-dialog>
    <shipSwlectsDelog
      v-if="dialogShipCompanyFormVisible"
      :add="dialogShipCompanyFormVisible"
      @adds="adds"
    />
  </div>
</template>

<script>
  import shipSwlectsDelog from '../../components/ShipComPanySelect/shipSwlects-delog'
  import {
    generatorImoRpt,
    deleteImoStdRpt,
    saveImoRpt,
    getImoStdRpts,
    imoLockOrUnlock,
    imoStdRptStatusTag,
    saveManualDcs,
    getManuleDcs,
    downLoadDcs,
    downLoadCollectionData,
    downLoadBdnData,
    downLoadManualImoBdnData,
    downLoadManualBdnData,
    downLoadManualImoCdData,
    imoReportLibya
  } from '@/api/requestPost'
  import {getDcsPeriodTime, savemanuinfor, saveOrUpdateGcState, savefindShipTypeList, getYears} from '@/api/requestGet'
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  import arrCargoInfo from './components/arrCargoInfo'
  import deptCargoInfo from './components/deptCargoInfo'
  import oilTons from './components/oilTons'
  import adaptive from '@/directive/el-table'
  import {Loading} from 'element-ui'

  export default {
    name: 'ImoDcsRreport',
    components: {
      Pagination,
      arrCargoInfo,
      deptCargoInfo,
      oilTons,
      shipSwlectsDelog
    },
    directives: {adaptive},
    data() {
      return {
        options: [
          {
            value: '1',
            label: '登记'
          },
          {
            value: '2',
            label: '锁定'
          },
          {
            value: '3',
            label: '已报送'
          }
        ],
        value: [],
        dateTimes: [],
        disableds: false,
        flags: true,
        fileList: [],
        fileListd: [],
        currentFile: {fileId: ''}, // cdb上传
        currentFiled: {fileId: ''}, // crr上传
        imoStdRptIds: [], // 报送数据
        shipNam: '', // 船名
        shipMOM: '', // 船mom号
        list: [], // 自动填写
        getImoStdRptsData: { // 报告列表查询
          flag: '', // 船旗国
          imoRptStatus: '',
          keyword: '', // 关键字（船名、imo、船公司名称）
          startTime: null, // 开始时间
          endTime: null, // 结束时间
          currentPage: 1, // 当前页
          pageSize: 20// 显示条数
        },
        dialogShipCompanyFormVisible: false,
        IMOReportInfo: false,
        findGcStateList: [], // 船旗国字典
        findShipTypeList: [], // 船型
        manuinfor: [], // 油耗类型
        ReportingyearArray: [ // 年度
        ],
        ReportingindemendArray: [ // 测量方法
          {
            id: '1',
            value: '使用燃油交付单的方法',
            label: '使用燃油交付单的方法'
          },
          {
            id: '2',
            value: '使用流量计的方法',
            label: '使用流量计的方法'
          },
          {
            id: '3',
            value: '使用燃油舱柜监测的方法',
            label: '使用燃油舱柜监测的方法'
          }
        ],
        Reportingyear: '',
        tableData: [], // 自动生成表格数据
        tableHeight: window.innerHeight - 240 - 200,
        dataTreeGrid: [],
        total: 0,
        listLoading: true,
        dialogLoading: true,
        generateData: {
          // 自动生成查询数据
          shipId: '',
          year: '2020',
          rptType: '1'
        },
        uploadReportTemp: { // 手工填写数据
          imoRptId: undefined, // 填写报告id
          bdnFileDir: '',
          bdnFileName: '',
          cdFileDir: '',
          cdFileName: '',
          imoNu: '', // imo号
          startTime: '', // 填写报告时间
          endDate: '', // 填写报告结束时间
          shipType: '', // 船舶类型
          flag: '', // 船旗国
          flagCode: '', // 船旗国三位代码
          gross: '', // 总吨
          net: '', // 净吨
          dwt: '', // 载重吨
          eedi: '', // 船舶eeid
          ice: '', // 冰集体
          distance: '', // 航程
          distanceHour: '', // 航行小时
          manualOilDtos: [ // 油耗类型
            {
              oilId: '', // 油耗id
              fuelTons: '', // 油耗量
              oilName: '', // 油耗名称
              useMethod: '' // 测量方法
            }
          ],
          oiMainEngines: [ // 主机信息
            {
              ratePower: ''
            }
          ],
          oiShipGes: [ // 辅机信息
            {
              ratePower: ''
            }
          ]
        },
        reportForm: { // 报告数据
          shipId: '', // 船舶id
          startTime: '', // 报告开始时间
          endTime: '', // 报告结束时间
          rptResource: '', // 报告来源
          imoRptId: '' // 报告id
        },
        temptase: [],
        infoFrom: { // 比利亚数据下载
          downLoadType: '0',
          startTime: '',
          endTime: '',
          imoRptIds: []
        },
        voyagedialogFormVisible: false,
        voyagedialogFillinmanually: false,
        voyagedialogStatus: '',
        voymrvData: { // 自动生成报告保存
          imoRptId: '', // 报告id
          distance: '', // 航程
          distanceHour: '', // 航行时间
          chaiFo: '', // 柴油油耗
          hfo: '', // 重油油耗
          lfo: '', // 轻油油耗
          propane: '', // 丙烷
          butane: '', // 丁烷
          lng: '', // 液化天然气
          methanol: '', // 甲醇
          Ethanol: '', // 乙醇
          correctionChaiFo: 0, // 修正柴油量
          correctionHfo: 0, // 修正重油
          correctionLfo: 0, // 修正轻油
          correctionPropane: 0, // 修正丙烷
          correctionButane: 0, // 修正丁烷
          correctionLng: 0, // 修正液化天然气
          correctionMethanol: 0, // 修正甲醇
          correctionEthanol: 0, // 修正乙醇
          correctionDistance: 0, // 修正航程
          correctionDistanceHour: 0 // 修正航行时间
        },
        rules: {
          flagCode: [{required: true, message: '必填项', trigger: 'blur'}],
          imoNu: [{required: true, message: '必填项', trigger: 'blur'}],
          shipType: [{required: true, message: '必填项', trigger: 'blur'}],
          gross: [{required: true, message: '必填项', trigger: 'blur'}],
          net: [{required: true, message: '必填项', trigger: 'blur'}],
          dwt: [{required: true, message: '必填项', trigger: 'blur'}],
          distance: [{required: true, message: '必填项', trigger: 'blur'}],
          distanceHour: [{required: true, message: '必填项', trigger: 'blur'}]
        }
      }
    },
    created() {
      this.getList()
      this.initSaveOrUpdateGcState()
      this.initSavefindShipTypeList()
      this.initData()
      this.initYear()
    },
    methods: {
      handTime() {
        this.getImoStdRptsData.startTime = this.value[0]
        this.getImoStdRptsData.endTime = this.value[1]
      },
      initYear() {
        getYears().then(res => {
          this.ReportingyearArray = res.data.data
      })
      },
      changeStartportTemp() { // 限制开始时间
        this.pickerOptionsEndportTemp = Object.assign({}, this.pickerOptionsEndportTemp, {
          disabledDate: (time) => {
          if(this.portTemp.arrTm)
        {
          return time.getTime() < this.portTemp.arrTm
        }
      }
      })
      },
      changeEndportTemp() { // 限制结束时间
        this.pickerOptionsStartportTemp = Object.assign({}, this.pickerOptionsStartportTemp, {
          disabledDate: (time) => {
          if(this.portTemp.deptTm)
        {
          return time.getTime() > this.portTemp.deptTm - 1 * 24 * 60 * 60 * 1000
        }
      }
      })
      },
      // 打开船舶imo号弹框
      dalogData() {
        this.dialogShipCompanyFormVisible = true
      },
      // 船型字典查询
      initSavefindShipTypeList() {
        savefindShipTypeList().then(res => {
          this.findShipTypeList = res.data.data.items
      })
      },
      // 船旗国字典查询
      initSaveOrUpdateGcState() {
        saveOrUpdateGcState().then(res => {
          this.findGcStateList = res.data.data.items
      })
      },
      // 保存自动生成报告表
      saveClick() {
        saveImoRpt(this.list).then(res => {
          this.IMOReportInfo = false
        this.getList()
      })
      },
      // 手工填写保存
      showsaveClick() {
        this.$refs.uploadReportTemp.validate((valid) => {
          this.uploadReportTemp.startTime = this.dateTimes[0]
        this.uploadReportTemp.endTime = this.dateTimes[1]
        if (valid) {
          saveManualDcs(this.uploadReportTemp).then(res => {
            this.voyagedialogFillinmanually = false
          this.getList()
        })
        } else {
          return false
        }
      })
      },


      // 油耗类型查询字典
      initData() {
        savemanuinfor().then(res => {
          console.log(res.data.data.items)
        this.manuinfor = res.data.data.items
      })
      },
      // 船舶选择数据
      adds(val, vas) {
        this.dialogShipCompanyFormVisible = false
        this.shipNam = val.name
        this.shipMOM = val.imo
        this.generateData.shipId = val.id // 自动生成查询数据
        this.uploadReportTemp.imoNu = val.imo
        this.uploadReportTemp.shipType = vas.sptype
        this.uploadReportTemp.flag = vas.flag
        this.uploadReportTemp.gross = vas.gross
        this.uploadReportTemp.net = vas.net
        this.uploadReportTemp.dwt = vas.dwt
        this.uploadReportTemp.ice = vas.ice
        this.uploadReportTemp.eedi = vas.eedivalue
        if (vas.oiMainEngines.length) {
          this.uploadReportTemp.oiMainEngines = vas.oiMainEngines
        }
        if (vas.oiShipGes.length) {
          this.uploadReportTemp.oiShipGes = vas.oiShipGes
        }
      },
      // 查询报表
      queryPostClick() {
        this.getListAdd()
      },
      getListAdd() {
        const url = '/mrv/getDcsPeriodTime'
        getDcsPeriodTime(this.generateData.shipId, this.generateData.year, '0').then(
          res => {
          if(res.data.result
      )
        {
          this.tableData = res.data.data
        }
      else
        {
          this.$notify({
            title: 'error',
            message: res.data.data,
            type: 'warning',
            duration: 2000
          })
        }
      }
      )
      },
      // addImon
      addImon() {
        this.dialogShipCompanyFormVisible = true
      },
      // 删除自动表格数据
      deleteArr(row) {
        // console.log(row.imoRptId);
        deleteImoStdRpt({imoStdId: row.imoRptId}).then(res => {
          this.getListAdd()
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      })
      },
      // 删除表格数据
      handleDelete(row) {
        this.$confirm('是否删除该条报告?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteImoStdRpt({imoStdId: row.id
      }).
        then(res => {
          this.getList()
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      })
      }).
        catch(() => {
          this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
      },
      // 弹出报告弹框
      addIMOReportInfo(row) {
        this.reportForm.shipId = row.shipId
        this.reportForm.startTime = row.startTime
        this.reportForm.endTime = row.endTime
        this.reportForm.rptResource = '1'
        this.reportForm.imoRptId = row.imoRptId
        this.IMOReportInfo = true
        this.initSodata()
      },
      initSodata() {
        this.disableds = true
        generatorImoRpt(this.reportForm).then(res => {
          this.dialogLoading = false
        this.list = res.data.data
        this.disableds = false
      })
      },
      // 删除油耗数据
      DeteleData(index) {
        this.uploadReportTemp.manualOilDtos.splice(index, 1)
      },
      // 添加油耗数据
      addData() {
        this.uploadReportTemp.manualOilDtos.push({
          oilId: '', // 油耗id
          fuelTons: '', // 油耗量
          oilName: '', // 油耗名称
          useMethod: '' // 测量方法
        })
      },
      // 删除推进装置
      DeteleDatas(index) {
        this.uploadReportTemp.oiMainEngines.splice(index, 1)
      },
      // 添加推进装置
      addDatas() {
        this.uploadReportTemp.oiMainEngines.push({
          ratePower: ''
        })
      },
      // 删除辅助发动机
      DeteleDatass(index) {
        this.uploadReportTemp.oiShipGes.splice(index, 1)
      },
      // 添加辅助发动机
      addDatass() {
        this.uploadReportTemp.oiShipGes.push({
          ratePower: ''
        })
      },
      // 报送事件
      handleCreateSubmitted() {
        let flag = false
        this.temptase.forEach(ele => {
          if(ele.rptStatus !== '2'
      )
        {
          this.$message({
            showClose: true,
            message: '有未锁定项,无法进行报送操作',
            type: 'error'
          })
          flag = true
        }
      })
        if (!flag) {
          imoStdRptStatusTag(this.imoStdRptIds).then(res => {
            if(res.data.result
        )
          {
            this.getList()
          }
        else
          {
            this.$message({
              showClose: true,
              message: res.data.data,
              type: 'error'
            })
          }
        })
        }
      },
      // 单个报送
      handleDeleteVoyage(row) {
        if (row.rptStatus == '2') {
          imoStdRptStatusTag([row.id]).then(res => {
            if(res.data.result
        )
          {
            this.getList()
          }
        else
          {
            this.$message({
              showClose: true,
              message: res.data.data,
              type: 'error'
            })
          }
        })
        } else {
          this.$message({
            message: '当前报告未锁定,不能进行报送操作',
            type: 'warning'
          })
        }
      },
      handErrors() {
        this.$notify({
          title: 'error',
          message: '上传失败',
          type: 'error',
          duration: 2000
        })
      },
      handError() {
        this.$notify({
          title: 'error',
          message: '上传失败',
          type: 'error',
          duration: 2000
        })
      },
      handleCreateDowon(val) {
        // 下载事件
        this.infoFrom.downLoadType = val
        this.infoFrom.startTime = this.getImoStdRptsData.startTime
        this.infoFrom.endTime = this.getImoStdRptsData.endTime
        this.infoFrom.imoRptIds = this.imoStdRptIds
        this.initimoReportLibya()
      },
      initimoReportLibya() {
        imoReportLibya(this.infoFrom).then(res => {
          // console.log(res.data)
          this.downxmls(res.data)
      })
      },
      showcloseClick() {
        this.voyagedialogFillinmanually = false
      },
      getList() {
        getImoStdRpts(this.getImoStdRptsData).then(response => {
          this.dataTreeGrid = response.data.data.items
        this.total = response.data.data.total
        this.listLoading = false
      })
      },
      handleRest() {
        this.value = []
        this.getImoStdRptsData.flag = ''
        this.getImoStdRptsData.imoRptStatus = ''
        this.getImoStdRptsData.keyword = ''
        this.getImoStdRptsData.startTime = ''
        this.getImoStdRptsData.endTime = ''
        this.getImoStdRptsData.currentPage = 1
        this.getImoStdRptsData.pageSize = 20
        this.getList()
      },
      handleFilter() {
        this.getImoStdRptsData.currentPage = 1
        this.getList()
      },
      // 解锁、锁定
      handleModifyStatus(row) {
        console.log(row)
        imoLockOrUnlock({imoStdId: row.id, rptSource: row.reaportSource}).then(res => {
          if(res.data.result
      )
        {
          this.getList()
          this.$message({
            message: '操作Success',
            type: 'success'
          })
        }
      else
        {
          this.$message({
            showClose: true,
            message: '操作error',
            type: 'error'
          })
        }
      })
        // if (row.rptStatus === '2') {
        //   imoLockOrUnlock({ imoStdId: row.id, rptSource: '1' }).then(res => {
        //     if (res.data.result) {
        //       this.getList()
        //       this.$message({
        //         message: '操作Success',
        //         type: 'success'
        //       })
        //     } else {
        //       this.$message({
        //         showClose: true,
        //         message: '操作error',
        //         type: 'error'
        //       })
        //     }
        //   })
        // }
      },
      // 手工填写报告解锁 锁定
      btnLockClick(id, ro) {
        imoLockOrUnlock({imoStdId: id, rptSource: ro}).then(res => {
          this.getList()
        this.$message({
          message: '操作Success',
          type: 'success'
        })
      })
      },

      // 自动报告解锁、锁定
      btnClick() {
        imoLockOrUnlock({imoStdId: this.list.imoRptId, rptSource: '1'}).then(res => {
          this.getList()
        this.$message({
          message: '操作Success',
          type: 'success'
        })
      })
      },
      // 选择报送数据
      handleSelectionChange(val) {
        this.temptase = val
        this.imoStdRptIds = []
        val.forEach(ele => {
          this.imoStdRptIds.push(ele.id)
      })
      },
      // 增加报表
      handleCreateUploadInfo(val) {
        if (val == 'Autogenerate') {
          this.voyagedialogFormVisible = true
          this.generateData.shipId = ''
          this.generateData.year = '2020'
          this.shipNam = ''
          this.shipMOM = ''
          this.tableData = []
          this.disableds = false
        }
        if (val == 'Fillinmanually') {
          this.disableds = false
          this.voyagedialogFillinmanually = true
          this.flags = false
          this.clers()
          const obj = { // 手工填写数据
            imoRptId: undefined, // 填写报告id
            bdnFileDir: '',
            bdnFileName: '',
            cdFileDir: '',
            cdFileName: '',
            imoNu: '', // imo号
            startTime: '', // 填写报告时间
            endDate: '', // 填写报告结束时间
            shipType: '', // 船舶类型
            flag: '', // 船旗国
            flagCode: '', // 船旗国三位代码
            gross: '', // 总吨
            net: '', // 净吨
            dwt: '', // 载重吨
            eedi: '', // 船舶eeid
            ice: '', // 冰集体
            distance: '', // 航程
            distanceHour: '', // 航行小时
            manualOilDtos: [ // 油耗类型
              {
                oilId: '', // 油耗id
                fuelTons: '', // 油耗量
                oilName: '', // 油耗名称
                useMethod: '' // 测量方法
              }
            ],
            oiMainEngines: [ // 主机信息
              {
                ratePower: ''
              }
            ],
            oiShipGes: [ // 辅机信息
              {
                ratePower: ''
              }
            ]
          }
        }
      },
      clers() {
        this.dateTimes = []
        const obj = { // 手工填写数据
          imoRptId: undefined, // 填写报告id
          bdnFileDir: '',
          bdnFileName: '',
          cdFileDir: '',
          cdFileName: '',
          imoNu: '', // imo号
          startTime: '', // 填写报告时间
          endDate: '', // 填写报告结束时间
          shipType: '', // 船舶类型
          flag: '', // 船旗国
          flagCode: '', // 船旗国三位代码
          gross: '', // 总吨
          net: '', // 净吨
          dwt: '', // 载重吨
          eedi: '', // 船舶eeid
          ice: '', // 冰集体
          distance: '', // 航程
          distanceHour: '', // 航行小时
          manualOilDtos: [ // 油耗类型
            {
              oilId: '', // 油耗id
              fuelTons: '', // 油耗量
              oilName: '', // 油耗名称
              useMethod: '' // 测量方法
            }
          ],
          oiMainEngines: [ // 主机信息
            {
              ratePower: ''
            }
          ],
          oiShipGes: [ // 辅机信息
            {
              ratePower: ''
            }
          ]
        }
        this.uploadReportTemp = obj
      },
      // 表格编辑
      handleUpdateInfo(row) {
        console.log(row)
        if (row.rptStatus == '2' || row.rptStatus == '3') {
          this.disableds = true
        } else {
          this.disableds = false
        }
        if (row.reaportSource === '1' || row.reaportSource === '2') {
          this.disableds = true
          this.reportForm.shipId = row.shipId
          this.reportForm.startTime = row.rptStartTime
          this.reportForm.endTime = row.rptEndTime
          this.reportForm.rptResource = row.reaportSource
          this.reportForm.imoRptId = row.id
          this.IMOReportInfo = true
          this.dialogLoading = true
          generatorImoRpt(this.reportForm).then(res => {
            this.dialogLoading = false
          if (res.data.result) {
            this.list = res.data.data
            this.disableds = false
          } else {
            this.$notify({
              title: 'error',
              message: res.data.data,
              type: 'error',
              duration: 2000
            })
          }
        })
        }
        if (row.reaportSource === '0') {
          getManuleDcs({imoRptId: row.id}).then(res => {
            this.uploadReportTemp = res.data.data
          this.dateTimes[0] = this.uploadReportTemp.startTime
          this.dateTimes[1] = this.uploadReportTemp.endTime
          this.fileList = []
          this.fileListd = []
          this.fileList.push({name: this.uploadReportTemp.bdnFileName, url: this.uploadReportTemp.bdnFileDir})
          this.fileListd.push({name: this.uploadReportTemp.cdFileName, url: this.uploadReportTemp.cdFileDir})
          getManuleDcs
          this.voyagedialogFillinmanually = true
          this.flags = true
          console.log('--------------', this.uploadReportTemp)
        })
        }
        // getManuleDcs({imoRptId: row.id}).then(res => {
        //     console.log(res.data)
        // })
        // this.uploadReportTemp = Object.assign({}, row); // copy obj
        // this.uploadReportTemp.timestamp = new Date(
        //   this.uploadReportTemp.timestamp
        // );
        // this.voyagedialogStatus = "update";
      },
      // Liberia下载
      handleDeleteLoad(row) {
        this.reportForm.shipId = row.shipId
        this.reportForm.startTime = row.rptStartTime
        this.reportForm.endTime = row.rptEndTime
        this.reportForm.rptResource = row.reaportSource
        this.reportForm.imoRptId = [row.id]
        this.initimoReportLibya()
      },
      // Collected 报告
      handleRemove(file, fileList) {
        //
      },
      handleChange(file, fileList) {
        this.fileList = fileList.slice(-3)
      },
      // Collected 报告
      handleExceed(files, fileList) {
        this.$message.warning(
          `当前限制选择 3 个文件，本次选择了 ${
            files.length
            } 个文件，共选择了 ${files.length + fileList.length} 个文件`
        )
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`)
      },
      handleSuccess(response, file, fileList) {
        this.uploadReportTemp.bdnFileDir = file.response
        this.uploadReportTemp.bdnFileName = file.name
      },
      handleBeforeUpload(file) {
        const testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
        const extension = testmsg === 'xls'
        const extension2 = testmsg === 'xlsx'
        // const isLt2M = file.size / 1024 / 1024 < 10
        if (!extension && !extension2) {
          this.$message({
            message: '上传文件只能是 xls、xlsx格式!',
            type: 'warning'
          })
        } else {
          this.currentFile.fileId = file.uid
        }
      },
      // Collected 报告
      handleRemoves(file, fileList) {
        //
      },
      handleChanges(file, fileList) {
        this.fileListd = fileList.slice(-3)
      },
      // Collected 报告
      handleExceeds(files, fileList) {
        this.$message.warning(
          `当前限制选择 3 个文件，本次选择了 ${
            files.length
            } 个文件，共选择了 ${files.length + fileList.length} 个文件`
        )
      },
      beforeRemoves(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`)
      },
      handleSuccesss(response, file, fileList) {
        console.log('===========', file)
        this.uploadReportTemp.cdFileDir = file.response
        this.uploadReportTemp.cdFileName = file.name
      },
      handleBeforeUploads(file) {
        const testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
        const extension = testmsg === 'xls'
        const extension2 = testmsg === 'xlsx'
        // const isLt2M = file.size / 1024 / 1024 < 10
        if (!extension && !extension2) {
          this.$message({
            message: '上传文件只能是 xls、xlsx格式!',
            type: 'warning'
          })
        } else {
          this.currentFiled.fileId = file.uid
        }
      },
      // xml
      downxmls(res) {
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = res
        link.download = 'Liberia数据下载.xml'
        document.body.appendChild(link)
        link.click()
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
      BdnData() {
        downLoadBdnData({imoRptId: this.list.imoRptId}).then(res => {
          this.download(res.data, 'BDN报告.xls')
      })
      },
      ManualBdnData() {
        downLoadManualImoBdnData(this.uploadReportTemp).then(res => {
          this.download(res.data, this.uploadReportTemp.bdnFileName)
      })
      },
      ManualCdData() {
        downLoadManualImoCdData(this.uploadReportTemp).then(res => {
          this.download(res.data, this.uploadReportTemp.cdFileName)
      })
      },
      collectionData() {
        downLoadCollectionData({imoRptId: this.list.imoRptId}).then(res => {
          this.download(res.data, 'collectionData报告.xls')
      })
      },
      exportClick(sun) {
        console.log(this.list)
        const data = {
          imoRptId: this.list.imoRptId,
          type: sun
        }
        if (sun == '0') {
          downLoadDcs(data).then(res => {
            this.download(res.data, '数据收集系统标准数据报告表.xls')
        })
        }
        if (sun == '1') {
          downLoadDcs(data).then(res => {
            this.download(res.data, 'Data collection system standard data report form.xls')
        })
        }
      },
      exportCd() {

      },
      exportManuClick(sun) {
        console.log(this.uploadReportTemp.imoRptId)
        const data = {
          imoRptId: this.uploadReportTemp.imoRptId,
          type: sun
        }
        if (sun == '0') {
          downLoadDcs(data).then(res => {
            this.download(res.data, '数据收集系统标准数据报告表.xls')
        })
        }
        if (sun == '1') {
          downLoadDcs(data).then(res => {
            this.download(res.data, 'Data collection system standard data report form.xls')
        })
        }
      }

    }
  }
</script>
<style scoped>
  .search_fieldset {
    display: block;
    border: #e1e1e1 solid 1px;
    color: #ababab;
    margin-left: 30px;
    padding-bottom: 0px;
  }

  .radio-label {
    display: inline-block;
    font-size: 12px;
    color: #606266;
    line-height: 35px;
    padding: 0;
    width: 50px;
  }

  .el-select {
    margin-right: 20px;
  }

  .el-checkbox__label {
    padding-left: 5px;
    font-size: 12px;
  }

  .addBox {
    display: flex;
  }

  .p {
    height: 3px;
    background: brown;
  }

  .inputBox {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .inputBox span {
    width: 80px;
  }

  .el-form-item__content div:nth-child(n+2) {
    margin-top: 20px;
  }

  .pad {
    padding: 0 10px;
  }
</style>
