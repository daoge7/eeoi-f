<template>
  <div class="app-container" >
    <div class="filter-container" v-if="eeDataVisiable">
      <div style="display:inline-block;">
        <label class="radio-label" style="padding-left:15px;">{{ $t('voyage.searchShipCompany') }}</label>
        <el-input
          v-model="shipComPany"
          :placeholder="$t('common.inputRemind')"
          style="width: 300px;"
          class="filter-item"
          @keyup.enter.native="handleFilter"
        />
        <el-button plain @click="selectShipComPany">{{ $t('common.select') }}</el-button>
        <label class="radio-label" style="padding-left:20px;">{{ $t('voyage.searchShip') }}</label>
        <el-input
          v-model="listQuery.shipNameOrImoOrRegisterNo"
          :placeholder="$t('common.inputRemind')"
          style="width: 300px;"
          class="filter-item"
          @keyup.enter.native="handleFilter"
        />
      </div>
      <div style="display:inline-block;">
        <label class="radio-label" style="padding-left:0;">{{ $t('voyage.searchVoyageName') }}</label>
        <el-input
          v-model="listQuery.volageCode"
          :placeholder="$t('common.inputRemind')"
          style="width: 300px;"
          class="filter-item"
          @keyup.enter.native="handleFilter"
        />
        <label class="radio-label" style="padding-left:100px;">{{ $t('voyage.searchVoyageTime') }}</label>
        <el-date-picker
          v-model="listQuery.startTime"
          :editable="true"
          type="date"
          align="left"
          style="width:130px"
          :placeholder="$t('common.datePickerRemind')"
        />
        ~
        <el-date-picker
          v-model="listQuery.endTime"
          :editable="true"
          type="date"
          align="left"
          style="width:130px"
          :placeholder="$t('common.datePickerRemind')"
        />
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
          @click="handleResetFilter"
        >{{ $t('common.reset') }}
        </el-button>
      </div>
    </div>

    <div class="optionBar" >
      <h3 class="item-tit" style="float:left">{{$t('voyage.Voyagesegmentinformation')}}</h3>
    </div>
    <el-table
      v-loading="listLoading"
      v-adaptive="{bottomOffset: 228}"
      :data="dataTreeGrid"
      border
      fit
      height="95px"
      style="width: 100%; overflow:auto;height: auto"
      highlight-current-row
      @current-change="handleCurrentChange"
      @selection-change="handleSelectionChange"
      :row-style="{height:'35px'}"
      :cell-style="{padding:'0'}"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      row-key="id"
    >
      <!-- <el-table-column
        type="selection"
        width="55">
      </el-table-column> -->
      <el-table-column :label="$t('common.no')" type="index" show-overflow-tooltip width="50" align="center"/>
      <el-table-column :label="$t('voyage.voyageLegCode')"  show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.volageCode }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('voyage.imonoAndRegistNo')"  show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.imo }}/{{ row.registerNo }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('voyage.shipNameView')"  show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.shipName }}/{{ row.shipNameEn }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('voyage.startDate')"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="{row}">
          <span>{{ row.startTime | datesformat('YYYY-MM-DD HH:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('voyage.endDate')"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="{row}">
          <span>{{ row.endTime | datesformat('YYYY-MM-DD HH:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('voyage.EEOI')"  align="center">
        <template slot-scope="{row}">
          <span>{{ row.eeoiValue }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('voyage.CO2Emission')"  align="center">
        <template slot-scope="{row}">
          <span>{{ row.carbonDioxideEmission }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('voyage.speedRatio')"  align="center">
        <template slot-scope="{row}">
          <span>{{ row.dropRatio }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('voyage.LoadUtilization')"  align="center">
        <template slot-scope="{row}">
          <span>{{ row.capacityUtilization }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column :label="$t('voyage.status')" class-name="status-col" width="70">
        <template slot-scope="{row}">
          <el-tag v-if="row.recStatus!== null">{{ row.recStatus === '0'?'unlock': 'lock'}}</el-tag>
        </template>
      </el-table-column> -->
      <!-- <el-table-column
        :label="$t('common.operate')"
        align="left"
        width="150"
        class-name="small-padding fixed-width"
        show-overflow-tooltip
      >
        <template slot-scope="{row}">
          <el-button
            v-if="row.recStatus==='1' && row.volageAndSegmentType === 0"
            type="primary"
            size="mini"
            @click="handleModifyStatus(row)"
          >{{ $t('voyage.btnUnLock') }}
          </el-button>
          <el-button
            v-if="row.recStatus==='0' && row.volageAndSegmentType === 0"
            type="primary"
            size="mini"
            @click="handleModifyStatus(row)"
          >{{ $t('voyage.btnLock') }}
          </el-button>
          <el-button
            v-if="row.volageAndSegmentType === 0"
            size="mini"
            type="danger"
            @click="handleDeleteVoyage(row)"
          >{{ $t('common.delete') }}
          </el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.currentPage"
      :limit.sync="listQuery.pageSize"
      v-if="eeDataVisiable"
    />

    <!--<h3 class="item-tit">抵离港信息</h3>-->
    <div>
      <el-tabs v-model="activeSpectName">
        <el-tab-pane :label="$t('voyagePort.arrival')" name="first">
          <el-table
            :data="portlist"
            height="155px"
            border
            highlight-current-row
            style="width: 100%; overflow:auto"
            :row-style="{height:'35px'}"
            :cell-style="{padding:'0'}"
          >
            <el-table-column
              :label="$t('voyagePort.NameCn')"
              align="center"
              show-overflow-tooltip
            >
              <template slot-scope="{row}">
                <span>{{ row.portNameCn }}</span>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('voyagePort.NameEn')"
              align="center"
              show-overflow-tooltip
            >
              <template slot-scope="{row}">
                <span>{{ row.portName }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('voyagePort.inPort')"  align="center">
              <template slot-scope="{row}">
                <span>{{ row.inPort === '0'?$t('voyagePort.boundary'):$t('voyagePort.Outside') }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('voyagePort.arrTime')"  align="center">
              <template slot-scope="{row}">
                <span>{{ row.localArrivalTime | datesformat('YYYY-MM-DD HH:mm:ss') }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('voyagePort.deptTime')"  align="center">
              <template slot-scope="{row}">
                <span>{{ row.localFormThePortTime | datesformat('YYYY-MM-DD HH:mm:ss') }}</span>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('voyagePort.objective')"
              align="center"
              show-overflow-tooltip
            >
              <template slot-scope="{row}">
                <span>{{ row.portWork }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('voyagePort.distance')"  align="center">
              <template slot-scope="{row}">
                <span>{{ row.distance }}</span>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('common.operate')"
              align="center"
              class-name="small-padding fixed-width"
              show-overflow-tooltip
            >
              <template slot-scope="{row}">
                <!-- <el-button
                  type="primary"
                  size="mini"
                  @click="handleUpdatePort(row)"
                >{{ $t('common.edit') }}
                </el-button> -->
                <el-button
                  size="mini"
                  type="success"
                  @click="handleDetailPort(row)"
                >{{ $t('common.detail') }}
                </el-button>
                <!-- <el-button
                  size="mini"
                  type="danger"
                  @click="handleDeletePort(row)"
                >{{ $t('common.delete') }}
                </el-button> -->
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane :label="$t('voyagePort.iceOrRescue')" name="second">
          <el-table
            :data="speclist"
            height="155px"
            border
            highlight-current-row
            style="width: 100%; overflow:auto"
            :row-style="{height:'35px'}"
            :cell-style="{padding:'0'}"
          >
            <el-table-column
              :label="$t('voyagePort.specNameCn')"
              align="center"
              width="120"
              show-overflow-tooltip
            >
              <template slot-scope="{row}">
                <span>{{ row.recodeType ==='1'?$t('voyage.rescue'):$t('voyage.Icenavigation') }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('voyagePort.specTime')" width="200" align="center">
              <template slot-scope="{row}">
                <span>{{ row.iceStartTime | datesformat('YYYY-MM-DD HH:mm:ss') }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('voyagePort.specEndTime')" width="200" align="center">
              <template slot-scope="{row}">
                <span>{{ row.iceEndTime | datesformat('YYYY-MM-DD HH:mm:ss') }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('voyagePort.specDistance')" width="108" align="center">
              <template slot-scope="{row}">
                <span>{{ row.distance }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('voyagePort.hfo')" width="108" align="center">
              <template slot-scope="{row}">
                <span>{{ row.hfo}}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('voyagePort.lfo')" width="108" align="center">
              <template slot-scope="{row}">
                <span>{{ row.lfo}}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('voyagePort.chaifo')" width="108" align="center">
              <template slot-scope="{row}">
                <span>{{ row.diesel}}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('voyagePort.otherfo')" width="108" align="center">
              <template slot-scope="{row}">
                <span>{{ row.otherOil}}</span>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('common.operate')"
              align="center"
              width="230"
              class-name="small-padding fixed-width"
              show-overflow-tooltip
            >
              <template slot-scope="{row}">
                <el-button
                  type="primary"
                  size="mini"
                  @click="handleUpdateSpec(row)"
                >{{ $t('common.edit') }}
                </el-button>
                <el-button
                  size="mini"
                  type="success"
                  @click="handleDetailSpec(row)"
                >{{ $t('common.detail') }}
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDeleteSpec(row)"
                >{{ $t('common.delete') }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
      :title="$t('voyage.voyageEditText')"
      :visible.sync="voyagedialogFormVisible"
      :close-on-click-modal="voyagedialogFormVisible2"
      width="80%"
      :append-to-body="true"
    >
      <el-form
        ref="voyagedataForm"
        :rules="voyageRules"
        :model="voyageTemp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:20px;"
      >
        <el-form-item label-width="150px" :label="$t('voyage.shipName')" prop="shipName">
          <el-input v-model="voyageTemp.shipName" style="width:250px"/>
        </el-form-item>
        <el-form-item :label="$t('voyage.voyageCode')" prop="voyageCode" label-width="150px">
          <el-input v-model="voyageTemp.voyageCode" style="width:250px"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="voyagedialogFormVisiblea">{{ $t('common.close') }}</el-button>
        <el-button
          type="primary"
          @click="voyagedialogStatus==='create'?createVoyageData():updateVoyageData()"
        >{{ $t('common.save') }}55
        </el-button>
      </div>
    </el-dialog>
    <!-- //批量导入弹出框 -->
    <el-dialog
      :title="$t('voyage.batchImportText')"
      :visible.sync="batchImportFormVisible"
      width="80%"
      :close-on-click-modal="false"
      :append-to-body="true"
    >
      <el-form label-width="70px" style="width: 400px; margin-left:20px;"/>
      <uploadFiles/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="batchImportFormVisible = false">{{ $t('common.close') }}</el-button>
        <el-button
          type="primary"
          @click="batchImportStatus==='create'?createVoyageData():updateVoyageData()"
        >{{ $t('common.save') }}
        </el-button>
      </div>
    </el-dialog>
    <el-dialog
      v-dialogDrag
      :title="$t('voyage.portEditText')"
      :visible.sync="portdialogFormVisible"
      :close-on-click-modal="false"
      custom-class="customwh"
      :append-to-body="true"
      width="70%"

    >
      <!-- :rules="portRules" :modal-append-to-body="false" -->
      <el-form
        ref="portdataForm"
        :rules="portRules"
        :model="portTemp"
        label-position="left"
        label-width="130px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('voyagePort.NameEn')" prop="porten">
              <el-input v-model="portTemp.porten" :readonly="true"/>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item :label="$t('voyagePort.NameCn')" prop="portcn">
              <el-input v-model="portTemp.portcn" :readonly="true"/>
            </el-form-item>
          </el-col>
          <el-col :span="1" style="padding-left: 20px">
            <el-button plain @click="selectPort">{{ $t('common.select') }}</el-button>
          </el-col>
          <el-col :span="7">
            <el-form-item :label="$t('ship.selectShip')" prop="shipName">
              <el-input
                v-model="portTemp.shipName"
                :placeholder="$t('common.inputRemind')"
                :readonly="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="1" style="padding-left: 20px">
            <el-button plain @click="selectShip">{{ $t('common.select') }}</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item :label="$t('voyagePort.firstVolageCode')" prop="firstVolageCode">
              <el-input
                v-model="portTemp.firstVolageCode"
                :placeholder="$t('common.inputRemind')"
                :readonly="readOnly"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('voyagePort.secondVolageCode')" prop="secondVolageCode">
              <el-input
                v-model="portTemp.secondVolageCode"
                :placeholder="$t('common.inputRemind')"
                :readonly="readOnly"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('voyagePort.arrTime')" prop="arrTm">
              <el-date-picker
                v-model="portTemp.arrTm"
                :editable="true"
                type="datetime"
                :placeholder="$t('common.dateTimeRemind')"
                style="width:100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('voyagePort.arrZone')" prop="arrZone">
              <el-select
                v-model="portTemp.arrZone"
                class="filter-item"
                :placeholder="$t('common.selectRemind')"
                style="width:100%"
              >
                <el-option
                  v-for="item in ZoneOptions"
                  :key="item.key"
                  :label="item.display_name"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item :label="$t('voyagePort.deptTime')" prop="deptTm">
              <el-date-picker
                v-model="portTemp.deptTm"
                :editable="true"
                type="datetime"
                :placeholder="$t('common.dateTimeRemind')"
                style="width:100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('voyagePort.deptZone')" prop="deptZone">
              <el-select
                v-model="portTemp.deptZone"
                class="filter-item"
                :placeholder="$t('common.selectRemind')"
                style="width:100%"
              >
                <el-option
                  v-for="item in ZoneOptions"
                  :key="item.key"
                  :label="item.display_name"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('voyagePort.distance')" prop="distance">
              <el-input v-model="portTemp.distance" type="number" min :readonly="readOnly">
                <i slot="suffix" style="color:red">nm</i>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('voyagePort.inPort')" prop="inPort">
              <el-select
                v-model="portTemp.inPort"
                class="filter-item"
                :placeholder="$t('common.selectRemind')"
                style="width:100%"
              >
                <el-option
                  v-for="item in inPortOptions"
                  :key="item.key"
                  :label="item.display_name"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('voyagePort.objective')">
              <el-select
                v-model="portTemp.anchorPurpose"
                class="filter-item"
                :placeholder="$t('common.selectRemind')"
                :multiple-limit="10"
                style="width:100%"
              >
                <el-option
                  v-for="item in objectiveOptions"
                  :key="item.key"
                  :label="item.display_name"
                  :value="item.display_name"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('voyagePort.shorePower')">
              <el-input v-model="portTemp.shorePower" :readonly="readOnly">
                <i slot="suffix" style="color:red">KWH</i>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('voyagePort.isEU')">
              <el-checkbox v-model="portTemp.isEu"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row>
        <el-tabs
          value="first"
          type="border-card"
          style="height:100%;overflow-y:auto;overflow-x:hidden;"
        >
          <el-tab-pane :label="$t('voyageOil.Arrivalcargo')" name="first">
            <arrCargoInfo
              ref="arrCargoInfo"
              :edit-status="this.portdialogStatus"
              :port-edit-row-id="this.portEditRowId"
            />
          </el-tab-pane>
          <el-tab-pane :label="$t('voyageOil.Departurecargo')" name="second">
            <deptCargoInfo
              ref="deptCargoInfo"
              :edit-status="this.portdialogStatus"
              :port-edit-row-id="this.portEditRowId"
            />
          </el-tab-pane>
        </el-tabs>
      </el-row>
       <el-row>
        <el-tabs
          value="one"
          type="border-card"
          style="height:100%;overflow-y:auto;overflow-x:hidden;"
        >
          <el-tab-pane :label="$t('voyageOil.arrDeptPortOil')" name="one">
            <oilTons
          ref="oilTons"
          :edit-status="this.portdialogStatus"
          :port-edit-row-id="this.portEditRowId"
          :port-row-model="this.portRowModel"
        />
          </el-tab-pane>
          <el-tab-pane :label="$t('voyageOil.addOil')" name="two">
            <Fuelquantity/>
          </el-tab-pane>
          <el-tab-pane :label="$t('voyageOil.outOil')" name="star">
            <Bargeoilvolume/>
          </el-tab-pane>
           <el-tab-pane :label="$t('voyageOil.barge')" name="tvit">
            <bargeInfo/>
          </el-tab-pane>
        </el-tabs>

      </el-row>
      <!-- <el-row>
        <oilTons
          ref="oilTons"
          :edit-status="this.portdialogStatus"
          :port-edit-row-id="this.portEditRowId"
          :port-row-model="this.portRowModel"
        />
      </el-row> -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="portdialogFormVisible = false">{{ $t('common.close') }}</el-button>
        <el-button
          v-if="!readOnly"
          type="primary"
          @click="portdialogStatus==='create'?createPortData():updatePortData()"
        >{{ $t('common.save') }}
        </el-button>
      </div>
    </el-dialog>
    <el-dialog
      :title="$t('voyage.driftEditText')"
      :visible.sync="driftdialogFormVisible"
      :close-on-click-modal="false"
      width="80%"
      :append-to-body="true"
    >
      <el-form
        ref="driftdataForm"
        :rules="rules"
        :model="driftTemp"
        label-position="left"
        label-width="200px"
      >
        <el-row>
          <el-col :span="6">
            <el-form-item :label="$t('voyageSpec.recordType')" label-width="100px">
              <el-radio-group v-model="driftTemp.recordType" style="width:200px">
                <span class="anchoring_pm" @click="anchoring(1)">
                  <el-radio :label="1">{{ $t('voyageOil.Anchoringontheway') }}</el-radio>
                </span>
                <span @click="anchoring(2)">
                  <el-radio :label="2">{{ $t('voyageOil.Floatingontheway') }}</el-radio>
                </span>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item :label="$t('ship.selectShip')" prop="shipName">
              <el-input
                v-model="driftTemp.shipName"
                :placeholder="$t('common.inputRemind')"
                :readonly="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="1" style="padding-left: 20px">
            <el-button plain @click="selectShip">{{ $t('common.select') }}</el-button>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('voyagePort.volageCode')" prop="firstVolageCode">
              <el-input
                v-model="driftTemp.firstVolageCode"
                :placeholder="$t('common.inputRemind')"
                :readonly="readOnly"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <el-form-item :label="$t('voyageSpec.beginTime')" label-width="100px">
              <el-date-picker
                v-model="driftTemp.arrTm"
                :editable="true"
                type="datetime"
                :placeholder="$t('common.dateTimeRemind')"
                align="left"
                style="width:200px"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('voyageSpec.endTime')" label-width="150px">
              <el-date-picker
                v-model="driftTemp.deptTm"
                :editable="true"
                type="datetime"
                :placeholder="$t('common.dateTimeRemind')"
                align="left"
                style="width:200px"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('voyageSpec.zone')" prop="name" label-width="150px">
              <el-select
                v-model="driftTemp.arrZone"
                class="filter-item"
                :placeholder="$t('common.selectRemind')"
                style="width:200px"
              >
                <el-option
                  v-for="item in ZoneOptions"
                  :key="item.key"
                  :label="item.display_name"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="Anchoringontheway">
          <oilTons
            ref="driftOilTons"
            :edit-status="portdialogStatus"
            :port-edit-row-id="portEditRowId"
            :port-row-model="{portRowModel}"
          />
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="driftdialogFormVisible = false">{{ $t('common.close') }}</el-button>
        <el-button type="primary" @click="createDriftData()">{{ $t('common.save') }}</el-button>
      </div>
    </el-dialog>
    <el-dialog
      v-dialogDrag
      :title="$t('voyage.specEditText')"
      :visible.sync="specdialogFormVisible"
      :close-on-click-modal="false"
      custom-class="customwh"
      style="height:80%"
      :append-to-body="true"
    >
      <el-form
        ref="specdataForm"
        :rules="rules"
        :model="specTemp"
        label-position="left"
        label-width="130px"
      >
        <el-row>
          <el-col :span="6">
            <el-form-item :label="$t('voyageSpec.recordType')">
              <el-radio-group v-model="specTemp.recordType">
                <el-radio :label="0">{{ $t('voyage.Icenavigation') }}</el-radio>
                <el-radio :label="1">{{ $t('voyage.Rescue') }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item :label="$t('ship.selectShip')" prop="shipName">
              <el-input
                v-model="specTemp.shipName"
                :placeholder="$t('common.inputRemind')"
                :readonly="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="1" style="padding-left: 20px">
            <el-button plain @click="selectShip">{{ $t('common.select') }}</el-button>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('voyagePort.volageCode')" prop="voyageCode">
              <el-input
                v-model="specTemp.voyageCode"
                :placeholder="$t('common.inputRemind')"
                :readonly="specReadOnly"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('voyagePort.specDistance')" prop="distance">
              <el-input
                v-model="specTemp.distance"
                :placeholder="$t('common.inputRemind')"
                :readonly="specReadOnly"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('voyageSpec.beginTime')">
              <el-date-picker
                v-model="specTemp.beginTm"
                :editable="true"
                type="datetime"
                :placeholder="$t('common.dateTimeRemind')"
                style="width:100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('voyageSpec.endTime')">
              <el-date-picker
                v-model="specTemp.endTm"
                :editable="true"
                type="datetime"
                :placeholder="$t('common.dateTimeRemind')"
                style="width:100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('voyageSpec.zone')">
              <el-select
                v-model="specTemp.beginZone"
                class="filter-item"
                :placeholder="$t('common.selectRemind')"
                style="width:100%"
              >
                <el-option
                  v-for="item in ZoneOptions"
                  :key="item.key"
                  :label="item.display_name"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-table :data="specOilFormData" stripe border style="width: 100%" size="mini">
            <el-table-column :label="$t('voyageOil.oilType')" align="center">
              <template slot-scope="{row}">
                <span>{{ row.oilName }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('voyageOil.fuelConsumption')" align="center">
              <template slot-scope="{row}">
                <el-input v-model="row.consTons" class="el_input" :readonly="specReadOnly"/>
              </template>
            </el-table-column>
            <el-table-column :label="$t('voyageOil.outOil')" align="center">
              <template slot-scope="{row}">
                <el-input v-model="row.outTons" class="el_input" :readonly="specReadOnly"/>
              </template>
            </el-table-column>
            <el-table-column :label="$t('voyageOil.outOilTime')" align="center" width="200">
              <template slot-scope="{row}">
                <el-date-picker v-model="row.outTm" :editable="true" type="datetime"
                                :placeholder="$t('common.dateTimeRemind')" style="width:95%"/>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="specdialogFormVisible = false">{{ $t('common.close') }}</el-button>
        <el-button type="primary" @click="specdialogStatus === 'create'?createData():updateSpecData()">{{
          $t('common.save') }}
        </el-button>
      </div>
    </el-dialog>
    <shipSelect ref="shipSelect"/>
    <portSelect ref="portSelect"/>
    <ShipComPanySelect ref="shipComPanySelect"/>
    <el-dialog
      v-dialogDrag
      title="$t('voyage.Energyefficiencystatus')"
      :visible.sync="eestatusVisible"
      :close-on-click-modal="false"
      custom-class="customwh"
      style="height:80%"
      :append-to-body="true"
      >

    </el-dialog>
  </div>
</template>

<script>
  import {
    voyageList,
    portList,
    createVoyage,
    updateVoyage,
    createPort,
    updatePort
  } from '@/api/energyEfficiency'
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  import arrCargoInfo from '../energyEfficiency/components/arrCargoInfo'
  import deptCargoInfo from '../energyEfficiency/components/deptCargoInfo'
  import oilTons from '../energyEfficiency/components/oilTons'
  import adaptive from '@/directive/el-table'
  import uploadFiles from '../energyEfficiency/components/uploadFiles' // 上传文件组件
  import shipSelect from '@/components/ShipComPanySelect/shipSelect'
  import portSelect from '@/components/ShipComPanySelect/portSelect'
  import ShipComPanySelect from '@/components/ShipComPanySelect/index'
  import {
    createIceAndRescue,
    deletePort,
    deleteSpec,
    deleteVolage,
    generatorVolage,
    lockOrUnlock
  } from "../../api/energyEfficiency"
  import {getQueryPage} from "../../api/requestGet"
  import ElRow from "element-ui/packages/row/src/row"
  import Fuelquantity from '../energyEfficiency/components/Fuelquantity'
  import Bargeoilvolume from '../energyEfficiency/components/Bargeoilvolume'
  import bargeInfo from '../energyEfficiency/components/bargeInfo'
  const ZoneOptions = [
    {key: '-8', display_name: '-8'},
    {key: '0', display_name: '0'},
    {key: '8', display_name: '8'}
  ]
  const inPortOptions = [
    {key: '0', display_name: '港界内'},
    {key: '1', display_name: '港界外'}
  ]
  const objectiveOptions = [
    {key: '1', display_name: '装货/登离乘客'},
    {key: '2', display_name: '卸货/登离乘客'},
    {key: '3', display_name: '等待泊位'}
  ]

  export default {
    name: 'EnergyEfficiency',
    components: {
      ElRow,
      Pagination, arrCargoInfo, deptCargoInfo, oilTons, uploadFiles, shipSelect, portSelect, ShipComPanySelect,
      Fuelquantity, Bargeoilvolume, bargeInfo
    },
    directives: {adaptive},
    filters: {
      statusFilter(status) {
        const statusMap = {
          '0': 'lock',
          '1': 'unlock',
          null: '--'
        }
        return statusMap[status]
      }
    },
    data() {
      var validateVolageCode = (rule, value, callback) => {
        if (value !== '') {
          if (this.portTemp.firstVolageCode === '') {
            callback(new Error('Please input the arrival voyage number.'));
          } else {
            callback();
          }
        } else {
          callback();
        }
      }
      return {
        value: [],
        // multipleLimit: 10,
        // 途中抛锚tab
        multipleSelection:[],
        specOilForm: {},
        shipComPany: '',
        speclist: [],
        activeSpectName: 'first',
        oilFormData: [],
        specOilFormData: [],
        specTempOilFormData: [],
        lockStatus: 0,
        readOnly: false,
        specReadOnly: false,
        Anchoringontheway: true,
        portlist: [],
        dataTreeGrid: [],
        total: 0,
        listLoading: true,
        portListLoading: true,
        listQuery: {
          currentPage: 1,
          pageSize: 20,
          shipComPanyName: '',
          shipNameOrImoOrRegisterNo: '',
          volageCode: '',
          startTime: null,
          endTime: null
        },
        ZoneOptions,
        inPortOptions,
        objectiveOptions,
        voyageTemp: {
          id: undefined,
          shipName: '',
          voyageCode: ''
        },
        portTemp: {
          id: '',
          shipId: '',
          shipName: '',
          firstVolageCode: '',
          secondVolageCode: '',
          portid: '',
          porten: '',
          portcn: '',
          arrTm: '',
          arrZone: '',
          deptTm: '',
          deptZone: '',
          isEu: '',
          inPort: '0',
          distance: '',
          anchorPurpose: '',
          recordType: '0',
          shorePower: '',
          portOilInfos: [],
          volagePortLoadingInfos: []
        },
        portEditRowId: '',
        portRowModel: [],
        driftTemp: {
          id: '',
          porten: 'anchor',
          portcn: '抛锚',
          shipId: '',
          shipName: '',
          firstVolageCode: '',
          arrTm: '',
          arrZone: '',
          deptTm: '',
          recordType: 1,
          portOilInfos: [],
          volagePortLoadingInfos: []
        },
        specTemp: {
          id: '',
          shipId: '',
          shipName: '',
          voyageCode: '',
          distance: 0,
          recordType: 0,
          beginZone: '',
          beginTm: null,
          endTm: null,
          volageSpecCons: []
        },
        portdialogFormVisible: false,
        driftdialogFormVisible: false,
        voyagedialogFormVisible: false,
        voyagedialogFormVisible2: false,
        specdialogFormVisible: false,
        batchImportFormVisible: false,
        voyagedialogStatus: '',
        portdialogStatus: '',
        driftdialogStatus: '',
        specdialogStatus: '',
        batchImportStatus: '',
        voyageRules: {
          voyageCode: [{required: true, message: '必填项', trigger: 'blur'}],
          shipName: [{required: true, message: '必填项', trigger: 'blur'}]
        },
        portRules: {
          porten: [{required: true, message: '必填项', trigger: 'change'}],
          portcn: [{required: true, message: '必填项', trigger: 'change'}],
          arrTm: [{required: true, message: '必填项', trigger: 'change'}],
          arrZone: [{required: true, message: '必填项', trigger: 'change'}],
          deptTm: [{required: true, message: '必填项', trigger: 'change'}],
          deptZone: [{required: true, message: '必填项', trigger: 'change'}],
          inPort: [{required: true, message: '必填项', trigger: 'change'}],
          distance: [{required: true, message: '必填项', trigger: 'blur'}],
          shipName: [{required: true, message: '必填项', trigger: 'change'}],
          secondVolageCode: [{validator: validateVolageCode, trigger: 'blur'}]
        },
        rules: {},
        eeDataVisiable: true,
        eestatusVisible: false
      }
    },
    created() {
      //this.getList()
      this.getFuelList()
    },
    methods: {
      handTime() {
        this.listQuery.startTime = this.value[0]
        this.listQuery.endTime = this.value[1]
      },
      voyagedialogFormVisiblea()
      {
        this.voyagedialogFormVisible = false
        this.voyagedialogFormVisible2 = true
      },
      handleGeneratorVolage(){
        if(this.multipleSelection.length === 0){
          this.$notify({
            message: '请选择航次',
            type: 'info',
            duration: 2000
          })
          return
        }
        generatorVolage({generatorVolageDtos:this.multipleSelection}).then(response =>{
          if (response.data.result) {
            this.$notify({
              title: 'Success',
              message: response.data.data,
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: 'Error',
              message: response.data.data,
              type: 'error',
              duration: 2000
            })
          }
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      resetListQuery() {
        this.value = []
        this.listQuery = {
          currentPage: 1,
          pageSize: 20,
          shipComPanyName: '',
          shipNameOrImoOrRegisterNo: '',
          volageCode: '',
          startTime: null,
          endTime: null
        }
      },
      resetOilFormData() {
        for (let item of this.oilFormData) {
          item.id = '',
            item.arrTons = 0,
            item.deptTons = 0,
            item.addTons = 0,
            item.addBillNo = '',
            item.addTm = null,
            item.outTons = 0,
            item.outTm = null,
            item.correctTons = 0
        }
      },
      resetSpecFormData() {
        for (let item of this.specTempOilFormData) {
            item.id = '',
            item.outTons = 0,
            item.outTm = null,
            item.consTons = 0
        }
      },
      getFuelList() {
        getQueryPage('/fuel/findFuelList', {pageSize: 50, pageNum: 1}).then(response => {
          var tempData = []
          var specTempData = []
          for (let item of response.data.data.items) {
            var fuelOil = {
              id: '',
              oilId: '',
              oilName: '',
              arrTons: 0,
              deptTons: 0,
              addTons: 0,
              addBillNo: '',
              addTm: null,
              outTons: 0,
              outTm: null,
              correctTons: 0
            }
            var specfuelOil = {
              id: '',
              oilId: '',
              oilName: '',
              consTons: 0,
              outTons: 0,
              outTm: null
            }
            fuelOil.oilId = item.fuelCode
            fuelOil.oilName = item.fuelName
            specfuelOil.oilId = item.fuelCode
            specfuelOil.oilName = item.fuelName
            tempData.push(fuelOil)
            specTempData.push(specfuelOil)
          }
          this.oilFormData = tempData
          this.specTempOilFormData = specTempData
        })
      },
      lockOrUnLock(data) {
        lockOrUnlock(data).then(response => {
          if (response.data.result) {
            this.$notify({
              title: 'Success',
              message: 'Successfully',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: 'Error',
              message: 'Failed',
              type: 'error',
              duration: 2000
            })
          }
        })
      },
      handleCurrentChange(val) {
        this.portlist = val.voyagePortVos
        this.speclist = val.voyageSpecVos
      },
      selectShip() {
        this.$refs.shipSelect.handleCreateRelation()
      },
      selectPort() {
        this.$refs.portSelect.handleCreateRelation()
      },
      selectShipComPany() {
        this.$refs.shipComPanySelect.handleCreateRelation()
      },
      anchoring(tab) {
        if (tab === 1) {
          this.driftTemp.portcn = '抛锚'
          this.driftTemp.porten = 'anchor'
          this.Anchoringontheway = true
        }
        if (tab === 2) {
          this.driftTemp.portcn = '漂航'
          this.driftTemp.porten = 'drifting'
          this.Anchoringontheway = false
        }
      },
      getList() {
        this.listLoading = true
        if (this.listQuery.startTime !== null && this.listQuery.endTime !== null) {
          this.listQuery.startTime = this.listQuery.startTime.toString()
          this.listQuery.endTime = this.listQuery.endTime.toString()
        }
        voyageList(this.listQuery).then(response => {
          this.dataTreeGrid = response.data.data.items
          if (response.data.data.items.length !== 0) {
            this.portlist = response.data.data.items[0].voyagePortVos
            this.speclist = response.data.data.items[0].voyageSpecVos
          }
          this.total = response.data.data.total
          // Just to simulate the time of the request
          setTimeout(() => {
            this.listLoading = false
          }, 20)
        })
      },
      getPortList() {
        this.portListLoading = true
        portList().then(response => {
          this.portlist = response.data.items
          this.total = response.data.total
          // Just to simulate the time of the request
          setTimeout(() => {
            this.portListLoading = false
          }, 1.5 * 1000)
        })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleResetFilter() {
        this.resetListQuery()
        this.shipComPany = ''
        this.getList()
      },
      handleModifyStatus(row) {
        alert(row.recStatus)
        if (row.recStatus === '0') {
          this.lockOrUnLock({volageId: row.id, recStatus: '1'})
        }
        if (row.recStatus === '1') {
          this.lockOrUnLock({volageId: row.id, recStatus: '0'})
        }
        this.getList()
      },
      resetVoyageTemp() {
        this.voyageTemp = {
          id: undefined,
          shipName: '',
          voyageCode: ''
        }
      },
      handleCreateVoyage() {
        this.resetVoyageTemp()
        this.voyagedialogStatus = 'create'
        this.voyagedialogFormVisible = true
        this.voyagedialogFormVisible2 = false
        this.$nextTick(() => {
          this.$refs['voyagedataForm'].clearValidate()
        })
      },
      resetPortTemp() {
        this.portTemp = {
          id: undefined,
          shipId: '',
          shipName: '',
          firstVolageCode: '',
          secondVolageCode: '',
          portid: '',
          porten: '',
          portcn: '',
          arrTm: '',
          arrZone: '',
          deptTm: '',
          deptZone: '',
          isEu: '',
          inPort: '0',
          distance: '',
          anchorPurpose: '',
          recordType: '0',
          shorePower: '',
          portOilInfos: [],
          volagePortLoadingInfos: []
        }
      },
      handleCreatePort() {
        this.resetPortTemp()
        this.resetOilFormData()
        this.portdialogStatus = 'create'
        this.portdialogFormVisible = true
        this.readOnly = false
        setTimeout(() => {
          this.resetOilFormData()
          this.$refs.oilTons.oilFormData = this.oilFormData
        }, 100)
        this.$nextTick(() => {
          this.$refs.oilTons.readOnly = false
          this.$refs.arrCargoInfo.readonly = false
          this.$refs.deptCargoInfo.readonly = false
          this.$refs['portdataForm'].clearValidate()
          this.$refs.arrCargoInfo.resetArrTemp()
          this.$refs.deptCargoInfo.resetDeptTemp()
        })
      },
      resetDriftTemp() {
        this.driftTemp = {
          id: '',
          shipId: '',
          shipName: '',
          porten: 'anchor',
          portcn: '抛锚',
          firstVolageCode: '',
          arrTm: '',
          arrZone: '',
          deptTm: '',
          recordType: 1,
          portOilInfos: [],
          volagePortLoadingInfos: []
        }
      },
      handleCreateDrift() {
        this.resetDriftTemp()
        this.driftdialogStatus = 'create'
        this.driftdialogFormVisible = true
        this.Anchoringontheway = true
        setTimeout(() => {
          // var temp = this.oilFormData
          // this.$refs.driftOilTons.oilFormData = tempData
          this.readOnly = false
          this.$refs.driftOilTons.readOnly = false
          this.resetOilFormData()
          this.$refs.driftOilTons.oilFormData = this.oilFormData
        }, 100)
        this.$nextTick(() => {
          this.$refs['driftdataForm'].clearValidate()
        })
      },
      resetSpecTemp() {
        this.specTemp = {
          id: '',
          shipId: '',
          shipName: '',
          voyageCode: '',
          distance: 0,
          recordType: 0,
          beginZone: '',
          beginTm: null,
          endTm: null,
          volageSpecCons: []
        }
      },
      // 批量导入按钮
      handleCreateBatch() {
        this.resetSpecTemp()
        this.batchImportFormVisible = true
        this.batchImportStatus = 'create'
      },
      handleCreateSpec() {
        this.resetSpecTemp()
        this.resetSpecFormData()
        this.specOilFormData = this.specTempOilFormData
        this.specdialogStatus = 'create'
        this.specdialogFormVisible = true
        this.specReadOnly = false
        this.$nextTick(() => {
          this.$refs['specdataForm'].clearValidate()
        })
      },
      createVoyageData() {
        this.$refs['voyagedataForm'].validate(valid => {
          if (valid) {
            this.voyageTemp.id = parseInt(Math.random() * 100) + 1024 // mock a id
            this.voyageTemp.author = 'vue-element-admin'
            createVoyage(this.voyageTemp).then(() => {
              this.dataTreeGrid.unshift(this.voyageTemp)
              this.voyagedialogFormVisible = false
              this.voyagedialogFormVisible2 = true
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
      createPortData() {
        var tempPortOil = []
        for (let item of this.$refs.oilTons.oilFormData) {
          if (item.arrTons !== 0 && item.deptTons !== 0) {
            tempPortOil.push(item)
          }
        }
        this.portTemp.portOilInfos = tempPortOil
        var temp = []
        temp.push(this.$refs.arrCargoInfo.arrTemp)
        temp.push(this.$refs.deptCargoInfo.deptTemp)
        this.portTemp.volagePortLoadingInfos = temp
        this.$refs['portdataForm'].validate(valid => {
          if (valid) {
            createPort(this.portTemp).then(response => {
              if (response.data.result) {
                this.$notify({
                  title: 'Success',
                  message: 'Created Successfully',
                  type: 'success',
                  duration: 2000
                })
              } else {
                this.$notify({
                  title: 'Error',
                  message: 'Created Failed',
                  type: 'error',
                  duration: 2000
                })
              }
              this.getList()
              this.portdialogFormVisible = false
            })
          }
        })
      },
      handleUpdateVoyage(row) {
        this.voyageTemp = Object.assign({}, row) // copy obj
        this.voyageTemp.timestamp = new Date(this.voyageTemp.timestamp)
        this.voyagedialogStatus = 'update'
        this.voyagedialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['voyagedataForm'].clearValidate()
        })
      },
      updateVoyageData() {
        this.$refs['voyagedataForm'].validate(valid => {
          if (valid) {
            const tempData = Object.assign({}, this.voyageTemp)
            tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
            updateVoyage(tempData).then(() => {
              for (const v of this.dataTreeGrid) {
                if (v.id === this.temp.id) {
                  const index = this.dataTreeGrid.indexOf(v)
                  this.dataTreeGrid.splice(index, 1, this.temp)
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
        if (confirm('确认是否删除航次') === true) {
          deleteVolage({volageIdList: [row.id]}).then(response => {
            if (response.data.result) {
              this.$notify({
                title: 'Success',
                message: 'Delete Successfully',
                type: 'success',
                duration: 2000
              })
            } else {
              this.$notify({
                title: 'Error',
                message: 'Delete Failed',
                type: 'error',
                duration: 2000
              })
            }
          })
        } else {

        }
      },
      handleUpdatePort(row) {
        this.resetDriftTemp()
        this.resetOilFormData()
        if (row.recodeType === 1) {
          this.driftTemp.id = row.id
          this.driftTemp.recordType = row.recodeType
          this.driftTemp.porten = row.portName
          this.driftTemp.portcn = row.portNameCn
          this.driftTemp.arrTm = row.arrivalTime
          this.driftTemp.deptTm = row.formThePortTime
          this.driftTemp.arrZone = row.arrZone
          this.driftTemp.shipId = row.shipId
          this.driftTemp.shipName = row.shipName
          this.driftTemp.firstVolageCode = row.firstVolageCode
          this.driftdialogFormVisible = true
          this.Anchoringontheway = true
          setTimeout(() => {
            this.readOnly = false
            this.$refs.driftOilTons.readOnly = false
            var portOils = row.voyagePortOilVos
            var tempFormPortOil = []
            for (let item of this.oilFormData) {
              tempFormPortOil.push(item)
            }
            for (var i = 0; i < portOils.length; i++) {
              if (portOils[i].arrTons !== 0 && portOils[i].deptTons !== 0 && portOils[i].arrTons !== null && portOils[i].deptTons !== null) {
                for (var j = 0; j < tempFormPortOil.length; j++) {
                  if (tempFormPortOil[j].oilId === portOils[i].oilId) {
                    tempFormPortOil.splice(j, 1, portOils[i])
                  }
                }
              }
            }
            this.$refs.driftOilTons.oilFormData = tempFormPortOil
          }, 100)
          this.$nextTick(() => {
            this.$refs['driftdataForm'].clearValidate()
          })
        } else if (row.recodeType === 2) {
          this.driftTemp.id = row.id
          this.driftTemp.recordType = row.recodeType
          this.driftTemp.porten = row.portName
          this.driftTemp.portcn = row.portNameCn
          this.driftTemp.arrTm = row.arrivalTime
          this.driftTemp.deptTm = row.formThePortTime
          this.driftTemp.arrZone = row.arrZone
          this.driftTemp.shipId = row.shipId
          this.driftTemp.shipName = row.shipName
          this.driftTemp.firstVolageCode = row.firstVolageCode
          this.driftdialogFormVisible = true
          this.Anchoringontheway = false
          this.$nextTick(() => {
            this.readOnly = false
            this.$refs['driftdataForm'].clearValidate()
          })
        } else {
          this.portTemp.shipName = row.shipName
          this.portTemp.shipId = row.shipId
          this.portTemp.firstVolageCode = row.firstVolageCode
          this.portTemp.secondVolageCode = row.secondVolageCode
          this.portTemp.arrZone = row.arrZone
          this.portTemp.deptZone = row.deptZone
          this.portTemp.shorePower = row.shorePower
          this.portTemp.distance = row.distance
          this.portTemp.isEu = row.isEu === 1 ? true : false
          this.portTemp.portid = row.portId
          this.portTemp.id = row.id
          this.portTemp.porten = row.portName
          this.portTemp.portcn = row.portNameCn
          this.portTemp.arrTm = row.arrivalTime
          this.portTemp.deptTm = row.formThePortTime
          this.portTemp.anchorPurpose = row.portWork === null ? '' : row.portWork
          this.portdialogStatus = 'update'
          this.portdialogFormVisible = true
          this.readOnly = false
          setTimeout(() => {
            this.$refs.oilTons.readOnly = false
            this.$refs.arrCargoInfo.readonly = false
            this.$refs.deptCargoInfo.readonly = false
            var portOils = row.voyagePortOilVos
            var tempFormPortOil = []
            for (let item of this.oilFormData) {
              tempFormPortOil.push(item)
            }
            for (var i = 0; i < portOils.length; i++) {
              if (portOils[i].arrTons !== 0 && portOils[i].deptTons !== 0 && portOils[i].arrTons !== null && portOils[i].deptTons !== null) {
                for (var j = 0; j < tempFormPortOil.length; j++) {
                  if (tempFormPortOil[j].oilId === portOils[i].oilId) {
                    tempFormPortOil.splice(j, 1, portOils[i])
                  }
                }
              }
            }
            this.$refs.oilTons.oilFormData = tempFormPortOil
            this.$refs.deptCargoInfo.resetDeptTemp()
            this.$refs.arrCargoInfo.resetArrTemp()
            for (let item of row.volagePortLordingVos) {
              if (item.loadingType === '0') {
                this.$refs.deptCargoInfo.deptTemp = item
              } else if (item.loadingType === '1') {
                this.$refs.arrCargoInfo.arrTemp = item
              }
            }
          }, 100)
          this.$nextTick(() => {
            this.$refs['portdataForm'].clearValidate()
          })
        }
      },
      handleDetailPort(row) {
        this.resetOilFormData()
        this.resetDriftTemp()
        if (row.recodeType === 1) {
          this.driftTemp.id = row.id
          this.driftTemp.recordType = row.recodeType
          this.driftTemp.porten = row.portName
          this.driftTemp.portcn = row.portNameCn
          this.driftTemp.arrTm = row.arrivalTime
          this.driftTemp.deptTm = row.formThePortTime
          this.driftTemp.arrZone = row.arrZone
          this.driftTemp.shipId = row.shipId
          this.driftTemp.shipName = row.shipName
          this.driftTemp.firstVolageCode = row.firstVolageCode
          this.driftdialogFormVisible = true
          this.Anchoringontheway = true
          setTimeout(() => {
            this.readOnly = true
            this.$refs.driftOilTons.readOnly = true
            var portOils = row.voyagePortOilVos
            var tempFormPortOil = []
            for (let item of this.oilFormData) {
              tempFormPortOil.push(item)
            }
            for (var i = 0; i < portOils.length; i++) {
              if (portOils[i].arrTons !== 0 && portOils[i].deptTons !== 0 && portOils[i].arrTons !== null && portOils[i].deptTons !== null) {
                for (var j = 0; j < tempFormPortOil.length; j++) {
                  if (tempFormPortOil[j].oilId === portOils[i].oilId) {
                    tempFormPortOil.splice(j, 1, portOils[i])
                  }
                }
              }
            }
            this.$refs.driftOilTons.oilFormData = tempFormPortOil
          }, 100)
          this.$nextTick(() => {
            this.$refs['driftdataForm'].clearValidate()
          })
        } else if (row.recodeType === 2) {
          this.driftTemp.id = row.id
          this.driftTemp.recordType = row.recodeType
          this.driftTemp.porten = row.portName
          this.driftTemp.portcn = row.portNameCn
          this.driftTemp.arrTm = row.arrivalTime
          this.driftTemp.deptTm = row.formThePortTime
          this.driftTemp.arrZone = row.arrZone
          this.driftTemp.shipId = row.shipId
          this.driftTemp.shipName = row.shipName
          this.driftTemp.firstVolageCode = row.firstVolageCode
          this.driftdialogFormVisible = true
          this.Anchoringontheway = false
          this.$nextTick(() => {
            this.readOnly = true
            this.$refs['driftdataForm'].clearValidate()
          })
        } else {
          this.portTemp.shipName = row.shipName
          this.portTemp.shipId = row.shipId
          this.portTemp.firstVolageCode = row.firstVolageCode
          this.portTemp.secondVolageCode = row.secondVolageCode
          this.portTemp.arrZone = row.arrZone
          this.portTemp.deptZone = row.deptZone
          this.portTemp.shorePower = row.shorePower
          this.portTemp.distance = row.distance
          this.portTemp.isEu = row.isEu === 1 ? true : false
          this.portTemp.portid = row.portId
          this.portTemp.id = row.id
          this.portTemp.porten = row.portName
          this.portTemp.portcn = row.portNameCn
          this.portTemp.arrTm = row.arrivalTime
          this.portTemp.deptTm = row.formThePortTime
          this.portTemp.anchorPurpose = row.portWork === null ? '' : row.portWork
          this.portdialogStatus = 'update'
          this.portdialogFormVisible = true

          setTimeout(() => {
            this.readOnly = true
            this.$refs.oilTons.readOnly = true
            this.$refs.arrCargoInfo.readonly = true
            this.$refs.deptCargoInfo.readonly = true
            var portOils = row.voyagePortOilVos
            var tempFormPortOil = []
            for (let item of this.oilFormData) {
              tempFormPortOil.push(item)
            }
            for (var i = 0; i < portOils.length; i++) {
              if (portOils[i].arrTons !== 0 && portOils[i].deptTons !== 0 && portOils[i].arrTons !== null && portOils[i].deptTons !== null) {
                for (var j = 0; j < tempFormPortOil.length; j++) {
                  if (tempFormPortOil[j].oilId === portOils[i].oilId) {
                    tempFormPortOil.splice(j, 1, portOils[i])
                  }
                }
              }
            }
            this.$refs.oilTons.oilFormData = tempFormPortOil
            this.$refs.deptCargoInfo.resetDeptTemp()
            this.$refs.arrCargoInfo.resetArrTemp()
            if(row.volagePortLordingVos != undefined)
            {
              for (let item of row.volagePortLordingVos) {
                if (item.loadingType === '0') {
                  this.$refs.deptCargoInfo.deptTemp = item
                } else if (item.loadingType === '1') {
                  this.$refs.arrCargoInfo.arrTemp = item
                }
              }
            }
            // this.portListLoading = false
            // this.listLoading = false
            // this.volagePortLoadingInfos = false
            // this.readOnly = false
          }, 100)
          this.$nextTick(() => {
            this.$refs['portdataForm'].clearValidate()
          })
        }
      },
      updatePortData() {
        var tempPortOil = []
        for (let item of this.$refs.oilTons.oilFormData) {
          if (item.arrTons !== 0 && item.deptTons !== 0) {
            tempPortOil.push(item)
          }
        }
        this.portTemp.portOilInfos = tempPortOil
        var temp = []
        temp.push(this.$refs.arrCargoInfo.arrTemp)
        temp.push(this.$refs.deptCargoInfo.deptTemp)
        this.portTemp.volagePortLoadingInfos = temp
        this.$refs['portdataForm'].validate(valid => {
          if (valid) {
            updatePort(this.portTemp).then(response => {
              if (response.data.result) {
                this.$notify({
                  title: 'Success',
                  message: 'Update Successfully',
                  type: 'success',
                  duration: 2000
                })
              } else {
                this.$notify({
                  title: 'Error',
                  message: 'Update Failed',
                  type: 'error',
                  duration: 2000
                })
              }
              this.getList()
              this.portdialogFormVisible = false
            })
          }
        })
      },
      handleDeletePort(row) {
        if (confirm('确认是否删除') === true) {
          deletePort({volagePortIdList: [row.id]}).then(response => {
            if (response.data.result) {
              this.$notify({
                title: 'Success',
                message: 'Delete Successfully',
                type: 'success',
                duration: 2000
              })
            } else {
              this.$notify({
                title: 'Error',
                message: 'Delete Failed',
                type: 'error',
                duration: 2000
              })
            }
          })
          this.getList()
        } else {

        }
        // const index = this.portlist.indexOf(row)
        // this.portlist.splice(index, 1)
      },
      handleDeleteSpec(row) {
        if (confirm('确认是否删除') === true) {
          deleteSpec({volageIceAndRescueIdList: [row.id]}).then(response => {
            if (response.data.result) {
              this.$notify({
                title: 'Success',
                message: 'Delete Successfully',
                type: 'success',
                duration: 2000
              })
            } else {
              this.$notify({
                title: 'Error',
                message: 'Delete Failed',
                type: 'error',
                duration: 2000
              })
            }
          })
          this.getList()
        } else {

        }
        // const index = this.portlist.indexOf(row)
        // this.portlist.splice(index, 1)
      },
      handleUpdateSpec(row) {
        this.resetSpecFormData()
        this.specdialogStatus = 'update'
        this.specTemp.id = row.id
        this.specTemp.distance = row.distance
        this.specTemp.beginTm = row.iceStartTime
        this.specTemp.endTm = row.iceEndTime
        this.specTemp.shipId = row.shipId
        this.specTemp.shipName = row.shipName
        this.specTemp.distance = row.distance
        this.specTemp.voyageCode = row.voyageCode
        this.specTemp.beginZone = row.beginZone
        var portOils = row.rawVoyageSpecConsVos
        setTimeout(()=>{
          var tempFormPortOil = []
          for (let item of this.specTempOilFormData) {
            tempFormPortOil.push(item)
          }
          for (var i = 0; i < portOils.length; i++) {
            if ((portOils[i].consTons !== 0 && portOils[i].consTons !== '') || (portOils[i].outTons !== 0 && portOils[i].outTons !== '')) {
              for (var j = 0; j < tempFormPortOil.length; j++) {
                if (tempFormPortOil[j].oilId === portOils[i].oilId) {
                  tempFormPortOil.splice(j, 1, portOils[i])
                }
              }
            }
          }
          this.specOilFormData = tempFormPortOil
        },100)
        this.specdialogFormVisible = true
        this.specReadOnly = false
      },
      handleDetailSpec(row) {
        this.specdialogStatus = 'update'
        this.specTemp.id = row.id
        this.specTemp.distance = row.distance
        this.specTemp.beginTm = row.iceStartTime
        this.specTemp.endTm = row.iceEndTime
        this.specTemp.shipId = row.shipId
        this.specTemp.shipName = row.shipName
        this.specTemp.distance = row.distance
        this.specTemp.voyageCode = row.voyageCode
        this.specTemp.beginZone = row.beginZone
        var portOils = row.rawVoyageSpecConsVos
        setTimeout(()=>{
          var tempFormPortOil = []
          for (let item of this.specTempOilFormData) {
            tempFormPortOil.push(item)
          }
          for (var i = 0; i < portOils.length; i++) {
            if ((portOils[i].consTons !== 0 && portOils[i].consTons !== '') || (portOils[i].outTons !== 0 && portOils[i].outTons !== '')) {
              for (var j = 0; j < tempFormPortOil.length; j++) {
                if (tempFormPortOil[j].oilId === portOils[i].oilId) {
                  tempFormPortOil.splice(j, 1, portOils[i])
                }
              }
            }
          }
          this.specOilFormData = tempFormPortOil
        },100)
        this.specdialogFormVisible = true
        this.specReadOnly = true
      },
      setRawVoyageSpecConsDto(data) {
        var rawportSpecs = []
        if (data.dieselOil !== 0 && data.dieselOil !== '') {
          var rawportSpec = {
            id: data.dieselOilId,
            oilId: '3',
            oilName: '柴油/汽油',
            consTons: data.dieselOil
          }
          rawportSpecs.push(rawportSpec)
        }
        if (data.carbinol !== 0 && data.carbinol !== '') {
          var rawportSpec = {
            id: data.carbinolId,
            oilId: '7',
            oilName: '甲醇',
            consTons: data.carbinol
          }
          rawportSpecs.push(rawportSpec)
        }
        if (data.ethanol !== 0 && data.ethanol !== '') {
          var rawportSpec = {
            id: data.ethanolId,
            oilId: '8',
            oilName: '乙醇',
            consTons: data.ethanol
          }
          rawportSpecs.push(rawportSpec)
        }
        if (data.propane !== 0 && data.propane !== '') {
          var rawportSpec = {
            id: data.propaneId,
            oilId: '4',
            oilName: '液化石油气LPG（丙烷）',
            consTons: data.propane
          }
          rawportSpecs.push(rawportSpec)
        }
        if (data.butane !== 0 && data.butane !== '') {
          var rawportSpec = {
            id: data.butaneId,
            oilId: '5',
            oilName: '丁烷',
            consTons: data.butane
          }
          rawportSpecs.push(rawportSpec)
        }
        if (data.tianran !== 0 && data.tianran !== '') {
          var rawportSpec = {
            id: data.tianranId,
            oilId: '6',
            oilName: '液化天然气LNG',
            consTons: data.tianran
          }
          rawportSpecs.push(rawportSpec)
        }
        if (data.highSulfurHeavy !== 0 && data.highSulfurHeavy !== '') {
          var rawportSpec = {
            id: data.highSulfurHeavyId,
            oilId: '1',
            oilName: '重燃油HFO(高硫)',
            consTons: data.highSulfurHeavy
          }
          rawportSpecs.push(rawportSpec)
        }
        if (data.lowSulfurHeavy !== 0 && data.lowSulfurHeavy !== '') {
          var rawportSpec = {
            id: data.lowSulfurHeavyId,
            oilId: '11',
            oilName: '重燃油HFO(低硫)',
            consTons: data.lowSulfurHeavy
          }
          rawportSpecs.push(rawportSpec)
        }
        if (data.ulsdSulfurHeavy !== 0 && data.ulsdSulfurHeavy !== '') {
          var rawportSpec = {
            id: data.ulsdSulfurHeavyId,
            oilId: '12',
            oilName: '重燃油HFO(超低硫)',
            consTons: data.ulsdSulfurHeavy
          }
          rawportSpecs.push(rawportSpec)
        }
        if (data.highSulfurLight !== 0 && data.highSulfurLight !== '') {
          var rawportSpec = {
            id: data.highSulfurLightId,
            oilId: '2',
            oilName: '轻燃油LFO(高硫)',
            consTons: data.highSulfurLight
          }
          rawportSpecs.push(rawportSpec)
        }
        if (data.lowSulfurLight !== 0 && data.lowSulfurLight !== '') {
          var rawportSpec = {
            id: data.lowSulfurLightId,
            oilId: '21',
            oilName: '轻燃油LFO(低硫)',
            consTons: data.lowSulfurLight
          }
          rawportSpecs.push(rawportSpec)
        }
        if (data.ulsdSulfurLight !== 0 && data.ulsdSulfurLight !== '') {
          var rawportSpec = {
            id: data.ulsdSulfurLightId,
            oilId: '22',
            oilName: '轻燃油LFO(超低硫)',
            consTons: data.ulsdSulfurLight
          }
          rawportSpecs.push(rawportSpec)
        }
        return rawportSpecs
      },
      createData() {
        var tempPortOil = []
        for (let item of this.specOilFormData) {
          if ((item.consTons !== 0 && item.consTons !== '') || (item.outTons !== 0 && item.outTons !== '')) {
            tempPortOil.push(item)
          }
        }
        this.specTemp.volageSpecCons = tempPortOil
        createIceAndRescue(this.specTemp).then(response => {
          if (response.data.result) {
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: 'Error',
              message: 'Created Failed',
              type: 'error',
              duration: 2000
            })
          }
        })
        this.specdialogFormVisible = false

      },
      updateSpecData() {
        var tempPortOil = []
        for (let item of this.specOilFormData) {
          if ((item.consTons !== 0 && item.consTons !== '') || (item.outTons !== 0 && item.outTons !== '')) {
            tempPortOil.push(item)
          }
        }
        this.specTemp.volageSpecCons = tempPortOil
        createIceAndRescue(this.specTemp).then(response => {
          if (response.data.result) {
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: 'Error',
              message: 'Update Failed',
              type: 'error',
              duration: 2000
            })
          }
        })
        this.specdialogFormVisible = false

      },
      createDriftData() {
        if (this.driftTemp.recordType === 1) {
          var tempPortOil = []
          for (let item of this.$refs.driftOilTons.oilFormData) {
            if (item.arrTons !== 0 && item.deptTons !== 0) {
              tempPortOil.push(item)
            }
          }
          this.driftTemp.portOilInfos = tempPortOil
        }
        this.$refs['driftdataForm'].validate(valid => {
          if (valid) {
            createPort(this.driftTemp).then(response => {
              if (response.data.result) {
                this.$notify({
                  title: 'Success',
                  message: ' Successfully',
                  type: 'success',
                  duration: 2000
                })
              } else {
                this.$notify({
                  title: 'Error',
                  message: 'Failed',
                  type: 'error',
                  duration: 2000
                })
              }
            })
            this.getList()
            this.driftdialogFormVisible = false
          }
        })
      }
    }
  }
</script>
<style scoped>
  html,
  body {
    overflow: scroll;
    overflow-y: hidden;
    padding:0 !important
  }

  .el-input__inner {
    padding: 2px;
    z-index: 9999;
    /* background: red; */
  }

  .anchoring_pm {
    margin-right: 20px;
  }

  .optionBar {
    width: 100%;
    height: 100%;
  }

  .app-container {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100%;
    height: auto;
  }

  .search_fieldset {
    display: block;
    border: #e1e1e1 solid 1px;
    color: #ababab;
    margin-left: 30px;
    padding-bottom: 0px;
  }

  h3.item-tit {
    font-size: 14px;
    line-height: 100%;
    margin: 10px 0;
  }
  .radio-label{
    width: 178px;
  }
</style>
