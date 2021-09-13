/* * @Author: ZhangJH * @Date: 2020-04-01 15:32:50 * @Last Modified by: ZhangJH
* @Last Modified time: 2020-07-09 11:08:277 */
<template>
  <div class="app-container">
    <!-- 检索条件区 -->
    <div class="filter-container">
      <div style="display:inline-block;">
        <label class="radio-label" style="padding-left:15px;">{{
          $t("voyage.searchShipCompany")
        }}</label>
        <el-input
          v-model="shipComPany"
          :placeholder="$t('common.inputRemind')"
          style="width: 300px;"
          class="filter-item"
          @keyup.enter.native="handleFilter"
        />
        <el-button plain @click="selectShipComPany">{{
          $t("common.select")
        }}</el-button>
        <label class="radio-label" style="padding-left:20px;">{{
          $t("voyage.searchShip")
        }}</label>
        <el-input
          v-model="listQuery.shipNameOrImoOrRegisterNo"
          :placeholder="$t('common.inputRemind')"
          style="width: 300px;"
          class="filter-item"
          @keyup.enter.native="handleFilter"
        />
      </div>
      <div style="display:inline-block;">
        <label class="radio-label" style="padding-left:0;">{{
          $t("voyage.searchVoyageName")
        }}</label>
        <el-input
          v-model="listQuery.volageCode"
          :placeholder="$t('common.inputRemind')"
          style="width: 300px;"
          class="filter-item"
          @keyup.enter.native="handleFilter"
        />
        <div style="display:inline-block;">
          <label class="radio-label" style="padding-left:100px;">{{
            $t("voyage.searchVoyageTime")
          }}</label>
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
        </div>
        <el-button
          class="filter-item"
          icon="el-icon-search"
          style="margin-left:20px"
          @click="handleFilter"
          >{{ $t("common.search") }}</el-button
        >
        <el-button
          class="filter-item"
          type="info"
          icon="el-icon-setting"
          @click="handleResetFilter"
          >{{ $t("common.reset") }}</el-button
        >
      </div>
    </div>
    <!-- 操作按钮区 -->
    <div class="optionBar">
      <h3 class="item-tit" style="float:left">
        {{ $t("voyage.Voyagesegmentinformation") }}
      </h3>
      <div style="float:right">
        <el-button
          class="filter-item"
          style="margin-left: 10px;"
          type="success"
          icon="el-icon-plus"
          @click="handleCreatePort"
          >{{ $t("voyage.btnAddPort") }}</el-button
        >
        <el-button
          class="filter-item"
          style="margin-left: 10px;"
          type="success"
          icon="el-icon-plus"
          @click="handleCreateDrift"
          >{{ $t("voyage.btnAddDrift") }}</el-button
        >
        <el-button
          class="filter-item"
          style="margin-left: 10px;"
          type="success"
          icon="el-icon-plus"
          @click="handleCreateSpec"
          >{{ $t("voyage.btnAddSpec") }}</el-button
        >
        <!-- <el-button
          class="filter-item"
          style="margin-left: 10px;"
          type="warning"
          icon="el-icon-plus"
          @click="handleCreateBatch"
        >{{ $t('common.batchImport') }}</el-button> -->
        <el-button
          class="filter-item"
          style="margin-left: 10px;"
          type="success"
          icon="el-icon-setting"
          @click="handleGeneratorVolage"
          >{{ $t("voyage.generatorVolage") }}</el-button
        >
      </div>
    </div>

    <el-table
      ref="singleTable"
      v-loading="listLoading"
      v-adaptive="{ bottomOffset: 228 }"
      :data="dataTreeGrid"
      border
      fit
      height="95px"
      style="width: 100%; overflow:auto;height: auto"
      highlight-current-row
      :row-style="{ height: '35px' }"
      :cell-style="{ padding: '0' }"
      :tree-props="{ children: 'children', hasChildren: true }"
      row-key="id"
      @current-change="handleCurrentChange"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column
        :label="$t('voyage.voyageLegCode')"
        width="120px"
        show-overflow-tooltip
        align="center"
      >
        <template slot-scope="scope">
          <el-tag
            v-if="
              scope.row.volageAndSegmentType !== 0 && scope.row.voyType === 0
            "
            type="success"
            style="visibility:hidden;"
            >EU</el-tag
          >
          <el-tag
            v-if="
              scope.row.volageAndSegmentType === 1 && scope.row.voyType === 1
            "
            type="success"
            >EU</el-tag
          >
          <span>{{ scope.row.volageCode }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('voyage.imonoAndRegistNo')"
        show-overflow-tooltip
        align="center"
      >
        <template slot-scope="{ row }">
          <span>{{ row.imo }}/{{ row.registerNo }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('voyage.shipNameView')"
        show-overflow-tooltip
        align="center"
      >
        <template slot-scope="{ row }">
          <span>{{ row.shipNameCn }}/{{ row.shipNameEn }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('MRV.departure')"
        show-overflow-tooltip
        align="center"
      >
        <template slot-scope="{ row }">
          <span>{{ row.startPortEn }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('MRV.destination')"
        show-overflow-tooltip
        align="center"
      >
        <template slot-scope="{ row }">
          <span>{{ row.endPortEn }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('voyage.Startingandendingtime') + '(UTC)'"
        width="250px"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <span>{{ row.startTime | datesformat("YYYY-MM-DD HH:mm") }}</span>
          {{ $t("voyage.voyageTo") }}
          <span>{{ row.endTime | datesformat("YYYY-MM-DD HH:mm") }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('voyage.EEOI') + '(g/t·nm)'"
        width="120px"
        align="center"
      >
        <template slot-scope="{ row }">
          <span>{{ row.eeoiValue }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('voyage.CO2Emission') + '(kg/nm)'"
        width="70px"
        align="center"
      >
        <template slot-scope="{ row }">
          <span>{{ row.carbonDioxideEmission }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('voyage.speedRatio')" align="center">
        <template slot-scope="{ row }">
          <div style="display:flex;align-items:center;">
            <span v-if="row.dropRatio" style="width:50px;"
              >{{ row.dropRatio }}%</span
            >
            <el-tooltip class="item" effect="dark" placement="top">
              <div slot="content">{{ $t("voyage.Decelerationratio") }}100%</div>
              <svg-icon v-if="row.dropRatio >= 100" icon-class="jinggao" />
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('voyage.LoadUtilization')" align="center">
        <template slot-scope="{ row }">
          <div style="display:flex;align-items:center;">
            <span v-if="row.dropRatio" style="width:50px;"
              >{{ row.capacityUtilization }}%</span
            >
            <el-tooltip class="item" effect="dark" placement="top">
              <div slot="content">
                {{ $t("voyage.Capacityutilization") }}150%
              </div>
              <svg-icon
                v-if="row.capacityUtilization >= 150"
                icon-class="jinggao"
                style="margin-left:5px;color:red;"
              />
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('voyage.status')"
        class-name="status-col"
        width="70"
        align="center"
      >
        <template slot-scope="{ row }">
          <svg-icon
            v-if="row.recStatus !== null && row.recStatus !== '0'"
            icon-class="lock"
            style="color:#67C23A;font-size:12px"
          />
          <svg-icon
            v-if="row.recStatus !== null && row.recStatus === '0'"
            icon-class="unlock"
            style="color:#F56C6C;font-size:14px"
          />
          <!-- <el-tag v-if="row.recStatus!== null">{{ row.recStatus === '0'?'unlock': 'lock'}}</el-tag> -->
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('common.operate')"
        align="left"
        width="160"
        class-name="small-padding fixed-width"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <el-button
            v-if="row.recStatus === '1' && row.volageAndSegmentType === 0"
            size="mini"
            @click="handleModifyStatus(row)"
            >{{ $t("voyage.btnUnLock") }}</el-button
          >
          <el-button
            v-if="row.recStatus === '0' && row.volageAndSegmentType === 0"
            type="warning"
            size="mini"
            @click="handleModifyStatus(row)"
            >{{ $t("voyage.btnLock") }}</el-button
          >
          <el-button
            v-if="row.volageAndSegmentType === 0"
            size="mini"
            type="danger"
            @click="handleDeleteVoyage(row)"
            >{{ $t("common.delete") }}</el-button
          >
          <el-button
            v-if="row.volageAndSegmentType === 1"
            type="primary"
            size="mini"
            @click="handlDetail(row)"
            >{{ $t("common.detail") }}</el-button
          >
          <!-- <el-button
            size="mini"
            type="warning"
            style="min-width: 80px"
            @click="getshipList(row.shipId)"
            >查看上报</el-button
          > -->
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.currentPage"
      :limit.sync="listQuery.pageSize"
      @pagination="getList"
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
            :row-style="{ height: '35px' }"
            :cell-style="{ padding: '0' }"
          >
            <el-table-column
              :label="$t('voyagePort.NameCn')"
              align="center"
              show-overflow-tooltip
            >
              <template slot-scope="{ row }">
                <span>{{ row.portNameCn }}</span>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('voyagePort.NameEn')"
              align="center"
              show-overflow-tooltip
            >
              <template slot-scope="{ row }">
                <span>{{ row.portName }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('voyagePort.inPort')" align="center">
              <template slot-scope="{ row }">
                <span>{{
                  row.inPort
                    ? $t("voyagePort.boundary")
                    : $t("voyagePort.Outside")
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('voyagePort.arrTime') + '(UTC)'"
              align="center"
            >
              <template slot-scope="{ row }">
                <span>{{
                  row.localArrivalTime | datesformat("YYYY-MM-DD HH:mm:ss")
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('voyagePort.deptTime') + '(UTC)'"
              align="center"
            >
              <template slot-scope="{ row }">
                <span>{{
                  row.localFormThePortTime | datesformat("YYYY-MM-DD HH:mm:ss")
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('voyagePort.objective')"
              align="center"
              show-overflow-tooltip
            >
              <template slot-scope="{ row }">
                <div v-for="(item, index) in row.portWork" :key="index">
                  <span v-if="item === '0'">{{
                    $t("voyagePort.loading")
                  }}</span>
                  <span v-if="item === '1'">{{
                    $t("voyagePort.discharge")
                  }}</span>
                  <span v-if="item === '2'">{{
                    $t("voyagePort.shipbarge")
                  }}</span>
                  <span v-if="item === '3'">{{
                    $t("voyagePort.Waiting")
                  }}</span>
                  <span v-if="item === '4'">{{
                    $t("voyagePort.Fueling")
                  }}</span>
                  <span v-if="item === '5'">{{ $t("voyagePort.supply") }}</span>
                  <span v-if="item === '6'">{{ $t("voyagePort.repair") }}</span>
                  <span v-if="item === '7'">{{
                    $t("voyagePort.Replacement")
                  }}</span>
                  <span v-if="item === '8'">{{ $t("voyagePort.Risk") }}</span>
                  <span v-if="item === '9'">{{ $t("voyagePort.Other") }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="$t('voyagePort.distance')" align="center">
              <template slot-scope="{ row }">
                <span>{{ row.distance }}</span>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('common.operate')"
              align="center"
              width="230"
              class-name="small-padding fixed-width"
              show-overflow-tooltip
            >
              <template slot-scope="{ row }">
                <el-button
                  type="primary"
                  size="mini"
                  @click="handleUpdatePort(row)"
                  >{{ $t("common.edit") }}</el-button
                >
                <el-button
                  size="mini"
                  type="success"
                  @click="handleDetailPort(row)"
                  >{{ $t("common.detail") }}</el-button
                >
                <el-button
                  v-if="row.recStatus !== '1'"
                  size="mini"
                  type="danger"
                  @click="handleDeletePort(row)"
                  >{{ $t("common.delete") }}</el-button
                >
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
            :row-style="{ height: '35px' }"
            :cell-style="{ padding: '0' }"
          >
            <el-table-column
              :label="$t('voyageSpec.recordType')"
              align="center"
              show-overflow-tooltip
            >
              <template slot-scope="{ row }">
                <span>{{
                  row.recodeType === "1"
                    ? $t("voyage.rescue")
                    : $t("voyage.Icenavigation")
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('voyageSpec.beginTime') + '(UTC)'"
              align="center"
            >
              <template slot-scope="{ row }">
                <span>{{
                  row.iceStartTime | datesformat("YYYY-MM-DD HH:mm:ss")
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('voyageSpec.endTime') + '(UTC)'"
              align="center"
            >
              <template slot-scope="{ row }">
                <span>{{
                  row.iceEndTime | datesformat("YYYY-MM-DD HH:mm:ss")
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('voyageSpec.specDistance')"
              align="center"
            >
              <template slot-scope="{ row }">
                <span>{{ row.distance }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('voyageSpec.hfo')" align="center">
              <template slot-scope="{ row }">
                <span>{{ row.hfo }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('voyageSpec.lfo')" align="center">
              <template slot-scope="{ row }">
                <span>{{ row.lfo }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('voyageSpec.dieselOil')" align="center">
              <template slot-scope="{ row }">
                <span>{{ row.diesel }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('voyageSpec.otherfo')" align="center">
              <template slot-scope="{ row }">
                <span>{{ row.otherOil }}</span>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('common.operate')"
              align="center"
              width="230"
              class-name="small-padding fixed-width"
              show-overflow-tooltip
            >
              <template slot-scope="{ row }">
                <el-button
                  type="primary"
                  size="mini"
                  @click="handleUpdateSpec(row)"
                  >{{ $t("common.edit") }}</el-button
                >
                <el-button
                  size="mini"
                  type="success"
                  @click="handleDetailSpec(row)"
                  >{{ $t("common.detail") }}</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDeleteSpec(row)"
                  >{{ $t("common.delete") }}</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
      title="查看所有上报信息"
      :visible.sync="shipListVisible"
      :close-on-click-modal="false"
      width="80%"
      center
      :append-to-body="true"
      @close="resetDate()"
    >
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
      <el-button
        class="filter-item"
        icon="el-icon-search"
        type="primary"
        style="margin-left:20px;margin-bottom: 30px"
        @click="getshipList(shiplistQuery.shipId)"
        >{{ $t("common.search") }}</el-button
      >
      <el-table
        ref="singleTable"
        v-loading="listLoading"
        :data="shipList"
        size="medium"
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
    <el-dialog
      :title="$t('voyage.voyageEditText')"
      :visible.sync="voyagedialogFormVisible"
      :close-on-click-modal="false"
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
        <el-form-item
          label-width="150px"
          :label="$t('voyage.shipName')"
          prop="shipName"
        >
          <el-input v-model="voyageTemp.shipName" style="width:250px" />
        </el-form-item>
        <el-form-item
          :label="$t('voyage.voyageCode')"
          prop="voyageCode"
          label-width="150px"
        >
          <el-input v-model="voyageTemp.voyageCode" style="width:250px" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="voyagedialogFormVisible = false">{{
          $t("common.close")
        }}</el-button>
        <el-button
          type="primary"
          @click="
            voyagedialogStatus === 'create'
              ? createVoyageData()
              : updateVoyageData()
          "
          >{{ $t("common.save") }}</el-button
        >
      </div>
    </el-dialog>
    <!-- //批量导入弹出框 -->
    <el-dialog
      :title="$t('voyage.batchImportText')"
      :visible.sync="batchImportFormVisible"
      :close-on-click-modal="false"
      width="80%"
      :append-to-body="true"
    >
      <el-form label-width="70px" style="width: 400px; margin-left:20px;" />
      <uploadFiles />
      <div slot="footer" class="dialog-footer">
        <el-button @click="batchImportFormVisible = false">{{
          $t("common.close")
        }}</el-button>
        <el-button
          type="primary"
          @click="
            batchImportStatus === 'create'
              ? createVoyageData()
              : updateVoyageData()
          "
          >{{ $t("common.save") }}</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      v-dialogDrag
      :title="$t('voyage.portEditText')"
      :visible.sync="portdialogFormVisible"
      :close-on-click-modal="false"
      :append-to-body="true"
      custom-class="customwh"
      width="80%"
    >
      <!-- :rules="portRules" -->
      <el-form
        ref="portdataForm"
        :rules="portRules"
        :model="portTemp"
        label-position="left"
        label-width="130px"
      >
        <el-row>
          <el-col :span="6">
            <el-form-item :label="$t('voyagePort.NameEn')">
              <el-input
                v-model="portTemp.porten"
                :placeholder="$t('common.inputRemind')"
                :readonly="readOnly"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('voyagePort.NameCn')">
              <el-input v-model="portTemp.portcn" :readonly="readOnly">
                <i slot="suffix">
                  <el-button plain @click="selectPort">{{
                    $t("common.select")
                  }}</el-button>
                </i>
              </el-input>
            </el-form-item>
          </el-col>
          <!--<el-col :span="1" style="padding-left: 20px">-->
          <!--&lt;!&ndash;<el-button plain @click="selectPort">选择</el-button>&ndash;&gt;-->
          <!--</el-col>-->
          <el-col :span="6">
            <el-form-item :label="$t('ship.selectShip')" prop="shipName">
              <el-input
                v-model="portTemp.shipName"
                :placeholder="$t('common.inputRemind')"
                :readonly="true"
              >
                <i slot="suffix">
                  <el-button plain @click="selectShip">{{
                    $t("common.select")
                  }}</el-button>
                </i>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('voyage.Whetherthvoyagehandoverport')">
              <el-switch v-model="ridiosfalg" />
            </el-form-item>
          </el-col>
          <!--<el-col :span="1" style="padding-left: 20px">-->
          <!--<el-button plain @click="selectShip">选择</el-button>-->
          <!--</el-col>-->
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item
              :label="$t('voyagePort.firstVolageCode')"
              prop="firstVolageCode"
            >
              <el-input
                v-model="portTemp.firstVolageCode"
                :placeholder="$t('common.inputRemind')"
                :readonly="readOnly"
              />
            </el-form-item>
          </el-col>
          <el-col v-if="ridiosfalg" :span="6">
            <el-form-item
              :label="$t('voyagePort.secondVolageCode')"
              prop="secondVolageCode"
            >
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
                format="yyyy-MM-dd HH:mm"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('voyagePort.arrZone')" prop="arrZone">
              <el-select
                v-model="portTemp.arrZone"
                filterable
                class="filter-item"
                :placeholder="$t('common.selectRemind')"
                style="width:100%"
                @change="changePortZone"
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
              <!-- <DatePicker type="datetime" v-model="portTemp.deptTm" format="yyyy-MM-dd HH:mm" @on-change="changeEndportTemp" :options="pickerOptionsEndportTemp" :placeholder="$t('common.dateTimeRemind')"></DatePicker> -->
              <el-date-picker
                v-model="portTemp.deptTm"
                :editable="true"
                type="datetime"
                :placeholder="$t('common.dateTimeRemind')"
                style="width:100%"
                format="yyyy-MM-dd HH:mm"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('voyagePort.deptZone')" prop="deptZone">
              <el-select
                v-model="portTemp.deptZone"
                filterable
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
              <el-input
                v-model.number="portTemp.distance"
                type="number"
                min
                :readonly="readOnly"
              >
                <i slot="suffix" style="color:red">nm</i>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('voyagePort.inPort')" prop="inPort">
              <!--<el-select-->
              <!--v-model="portTemp.inPort"-->
              <!--class="filter-item"-->
              <!--:placeholder="$t('common.selectRemind')"-->
              <!--style="width:100%"-->
              <!--&gt;-->
              <!--<el-option-->
              <!--v-for="item in inPortOptions"-->
              <!--:key="item.key"-->
              <!--:label="item.display_name"-->
              <!--:value="item.key"-->
              <!--/>-->
              <!--</el-select>-->
              <el-switch v-model="portTemp.inPort" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('voyagePort.objective')">
              <el-select
                v-model="portTemp.anchorPurpose"
                class="filter-item"
                :placeholder="$t('common.selectRemind')"
                :multiple-limit="10"
                style="width:100%"
                multiple
              >
                <el-option
                  v-for="item in objectiveOptions"
                  :key="item.key"
                  :label="item.display_name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              :label="$t('voyagePort.shorePower')"
              prop="shorePower"
            >
              <el-input
                v-model.number="portTemp.shorePower"
                :readonly="readOnly"
              >
                <i slot="suffix" style="color:red">KWH</i>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('voyagePort.isEU')">
              <!--<el-checkbox v-model="portTemp.isEu"/>-->
              <el-switch v-model="portTemp.isEu" />
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
              v-if="portdialogFormVisible"
              ref="oilTons"
              :times="times"
              :time-end="timeEnd"
              :stabel="stabel"
              :edit-status="this.portdialogStatus"
              :port-edit-row-id="this.portEditRowId"
              :port-row-model="this.portRowModel"
            />
          </el-tab-pane>
          <el-tab-pane :label="$t('voyageOil.addOil')" name="two">
            <Fuelquantity
              v-if="portdialogFormVisible"
              ref="Fuelquantity"
              :times="times"
              :time-end="timeEnd"
              :edit-status="Fuelquantity"
              @fuelquantity="fuelquantity"
            />
          </el-tab-pane>
          <el-tab-pane :label="$t('voyageOil.outOil')" name="star">
            <Bargeoilvolume
              v-if="portdialogFormVisible"
              ref="Bargeoilvolume"
              :times="times"
              :time-end="timeEnd"
            />
          </el-tab-pane>
          <el-tab-pane :label="$t('voyageOil.barge')" name="tvit">
            <bargeInfo
              v-if="portdialogFormVisible"
              ref="bargeInfo"
              :times="times"
              :time-end="timeEnd"
            />
          </el-tab-pane>
        </el-tabs>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="portdialogFormVisible = false">{{
          $t("common.close")
        }}</el-button>
        <el-button
          v-if="!readOnly"
          type="primary"
          @click="
            portdialogStatus === 'create' ? createPortData() : updatePortData()
          "
          >{{ $t("common.save") }}</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      :title="$t('voyage.driftEditText')"
      :visible.sync="driftdialogFormVisible"
      :close-on-click-modal="false"
      :append-to-body="true"
      width="80%"
    >
      <el-form
        ref="driftdataForm"
        :rules="driftTempRules"
        :model="driftTemp"
        label-position="left"
        label-width="200px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item
              :label="$t('voyageSpec.recordType')"
              label-width="100px"
            >
              <el-radio-group
                v-model="driftTemp.recordType"
                style="width:200px"
              >
                <span class="anchoring_pm" @click="anchoring(1)">
                  <el-radio :label="1">{{
                    $t("voyageOil.Anchoringontheway")
                  }}</el-radio>
                </span>
                <span @click="anchoring(2)">
                  <el-radio :label="2">{{
                    $t("voyageOil.Floatingontheway")
                  }}</el-radio>
                </span>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('ship.selectShip')" prop="shipName">
              <el-input
                v-model="driftTemp.shipName"
                :placeholder="$t('common.inputRemind')"
                :readonly="true"
                style="width:180px"
              >
                <i slot="suffix">
                  <el-button plain @click="selectShip">{{
                    $t("common.select")
                  }}</el-button>
                </i>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              :label="$t('voyagePort.volageCode')"
              prop="firstVolageCode"
            >
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
            <el-form-item
              :label="$t('voyageSpec.beginTime')"
              label-width="150px"
              prop="arrTm"
            >
              <el-date-picker
                v-model="driftTemp.arrTm"
                :editable="true"
                type="datetime"
                :placeholder="$t('common.dateTimeRemind')"
                align="left"
                style="width:150px"
                format="yyyy-MM-dd HH:mm"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item
              :label="$t('voyagePort.startZone')"
              label-width="100px"
              prop="arrZone"
            >
              <el-select
                v-model="driftTemp.arrZone"
                filterable
                class="filter-item"
                :placeholder="$t('common.selectRemind')"
                style="width:100px"
                @change="changeDriftZone"
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
          <el-col :span="7">
            <el-form-item
              :label="$t('voyageSpec.endTime')"
              label-width="150px"
              prop="deptTm"
            >
              <el-date-picker
                v-model="driftTemp.deptTm"
                :editable="true"
                type="datetime"
                :placeholder="$t('common.dateTimeRemind')"
                align="left"
                style="width:150px"
                format="yyyy-MM-dd HH:mm"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item
              :label="$t('voyagePort.endZone')"
              label-width="100px"
              prop="deptZone"
            >
              <el-select
                v-model="driftTemp.deptZone"
                filterable
                class="filter-item"
                :placeholder="$t('common.selectRemind')"
                style="width:100px"
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
        <!--漂航-->
        <el-row v-if="Anchoringontheway">
          <el-tabs
            value="two"
            type="border-card"
            style="height:100%;overflow-y:auto;overflow-x:hidden;"
          >
            <el-tab-pane :label="$t('voyageOil.addOil')" name="two">
              <Fuelquantity
                v-if="driftdialogFormVisible"
                ref="Fuelquantity"
                :times="times"
                :time-end="timeEnd"
                @fuelquantity="fuelquantity"
              />
            </el-tab-pane>
            <el-tab-pane :label="$t('voyageOil.Bargeoilvolume')" name="star">
              <Bargeoilvolume
                v-if="driftdialogFormVisible"
                ref="Bargeoilvolume"
                :times="times"
                :time-end="timeEnd"
              />
            </el-tab-pane>
            <el-tab-pane :label="$t('voyageOil.residuequantity')" name="tvit">
              <bargeInfo
                v-if="driftdialogFormVisible"
                ref="driftbargeInfo"
                :times="times"
                :time-end="timeEnd"
              />
            </el-tab-pane>
          </el-tabs>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="driftdialogFormVisible = false">{{
          $t("common.close")
        }}</el-button>
        <el-button type="primary" @click="createDriftData()">{{
          $t("common.save")
        }}</el-button>
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
        :rules="specTempRules"
        :model="specTemp"
        label-position="left"
        label-width="130px"
      >
        <el-row>
          <el-col :span="6">
            <el-form-item :label="$t('voyageSpec.recordType')">
              <el-radio-group v-model="specTemp.recordType">
                <el-radio :label="0">{{ $t("voyage.Icenavigation") }}</el-radio>
                <el-radio :label="1">{{ $t("voyage.Rescue") }}</el-radio>
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
            <el-button plain @click="selectShip">{{
              $t("common.select")
            }}</el-button>
          </el-col>
          <el-col :span="6">
            <el-form-item
              :label="$t('voyagePort.volageCode')"
              prop="voyageCode"
            >
              <el-input
                v-model="specTemp.voyageCode"
                :placeholder="$t('common.inputRemind')"
                :readonly="specReadOnly"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              :label="$t('voyagePort.specDistance')"
              prop="distance"
            >
              <el-input
                v-model.number="specTemp.distance"
                :placeholder="$t('common.inputRemind')"
                :readonly="specReadOnly"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item :label="$t('voyageSpec.beginTime')" prop="beginTm">
              <el-date-picker
                v-model="specTemp.beginTm"
                :editable="true"
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                :placeholder="$t('common.dateTimeRemind')"
                style="width:100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('voyagePort.startZone')" prop="beginZone">
              <el-select
                v-model="specTemp.beginZone"
                filterable
                class="filter-item"
                :placeholder="$t('common.selectRemind')"
                style="width:100%"
                @change="changeSpecZone"
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
            <el-form-item :label="$t('voyageSpec.endTime')" prop="endTm">
              <el-date-picker
                v-model="specTemp.endTm"
                :editable="true"
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                :placeholder="$t('common.dateTimeRemind')"
                style="width:100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('voyagePort.endZone')" prop="endZone">
              <el-select
                v-model="specTemp.endZone"
                filterable
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
          <oilTonscopy
            v-if="specdialogFormVisible"
            ref="oilTonscopy"
            :times="times"
            :time-end="timeEnd"
            :edit-status="portdialogStatus"
            :port-edit-row-id="portEditRowId"
            :port-row-model="{ portRowModel }"
          />
          <!-- <el-table :data="specOilFormData" stripe border style="width: 100%" size="mini">
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
                <el-date-picker v-model="row.outTm" :editable="false" type="datetime"
                                :placeholder="$t('common.dateTimeRemind')" style="width:95%"/>
              </template>
            </el-table-column>
          </el-table>-->
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="specdialogFormVisible = false">{{
          $t("common.close")
        }}</el-button>
        <el-button
          type="primary"
          @click="
            specdialogStatus === 'create' ? createData() : updateSpecData()
          "
        >
          {{ $t("common.save") }}
        </el-button>
      </div>
    </el-dialog>
    <indexDatil
      v-if="shipComPanyNamevicode.dalog"
      :ship-com-pany-namevicode="shipComPanyNamevicode"
      @shipComPanyNameData="shipComPanyNameData"
    />
    <shipSelect ref="shipSelect" />
    <portSelect ref="portSelect" />
    <ShipComPanySelect ref="shipComPanySelect" />
  </div>
</template>

<script>
import {
  voyageList,
  portList,
  getPortInfo,
  getRawVoyagePortByVoyageId,
  createVoyage,
  updateVoyage,
  createPort,
  updatePort
} from "@/api/energyEfficiency";
import oilTonscopy from "./components/oilTonscopy";
import indexDatil from "./components/indexDatil-dalog";
// import DatePicker from 'iview/src/components/date-picker';
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import arrCargoInfo from "./components/arrCargoInfo";
import deptCargoInfo from "./components/deptCargoInfo";
import oilTons from "./components/oilTons";
import adaptive from "@/directive/el-table";
import uploadFiles from "./components/uploadFiles"; // 上传文件组件
import shipSelect from "@/components/ShipComPanySelect/shipSelect";
import portSelect from "@/components/ShipComPanySelect/portSelect";
import ShipComPanySelect from "@/components/ShipComPanySelect/index";
import Fuelquantity from "./components/Fuelquantity";
import Bargeoilvolume from "./components/Bargeoilvolume";
import bargeInfo from "./components/bargeInfo";
import {
  createIceAndRescue,
  deletePort,
  deleteSpec,
  deleteVolage,
  generatorVolage,
  lockOrUnlock
} from "../../api/energyEfficiency";
import { getQueryPage } from "../../api/requestGet";
import ElRow from "element-ui/packages/row/src/row";

const ZoneOptions = [
  { key: -8, display_name: "-8" },
  { key: 0, display_name: "0" },
  { key: 8, display_name: "8" }
];
const inPortOptions = [
  { key: "0", display_name: "港界内" },
  { key: "1", display_name: "港界外" }
];
const objectiveOptions = [
  { key: "1", id: "0", display_name: "装货/登离乘客" },
  { key: "2", id: "1", display_name: "卸货/登离乘客" },
  { key: "3", id: "2", display_name: "船对船驳装/卸" },
  { key: "4", id: "3", display_name: "等待泊位" },
  { key: "5", id: "4", display_name: "加装燃料" },
  { key: "6", id: "5", display_name: "补给" },
  { key: "7", id: "6", display_name: "修理" },
  { key: "8", id: "7", display_name: "更换船员" },
  { key: "9", id: "8", display_name: "避险" },
  { key: "10", id: "9", display_name: "其他原因" }
];

export default {
  name: "EnergyEfficiencys",
  components: {
    ElRow,
    Pagination,
    arrCargoInfo,
    deptCargoInfo,
    oilTons,
    uploadFiles,
    shipSelect,
    portSelect,
    ShipComPanySelect,
    Fuelquantity,
    Bargeoilvolume,
    bargeInfo,
    indexDatil,
    oilTonscopy
  },
  directives: { adaptive },
  filters: {
    statusFilter(status) {
      const statusMap = {
        "0": "lock",
        "1": "unlock",
        null: "--"
      };
      return statusMap[status];
    }
  },
  data() {
    var validateVolageCode = (rule, value, callback) => {
      if (value !== "") {
        if (this.portTemp.firstVolageCode === "") {
          callback(new Error("Please input the arrival voyage number."));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    return {
      shipList: [],
      ranyoucode: [],
      ridiosfalg: false,
      value: "",
      stabel: "",
      shipComPanyNamevicode: {
        dalog: false,
        id: ""
      },
      pickerOptionsStartport: {},
      pickerOptionsEndport: {},
      timeEnd: "",
      times: "",
      codeShip: "",
      codest: "",
      objectiveId: [],
      pickerOptionsStartportTemp: {},
      pickerOptionsEndportTemp: {},
      pickerOptionsStart: {},
      pickerOptionsEnd: {},
      Fuelquantity: "",
      // multipleLimit: 10,
      // 途中抛锚tab
      multipleSelection: [],
      specOilForm: {},
      shipComPany: "",
      speclist: [],
      shiplistQuery: {
        shipId: "4028e3ff65e585f10165e61b1fab0011",
        startTime: null,
        endTime: null
      },
      activeSpectName: "first",
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
        shipComPanyName: "",
        shipNameOrImoOrRegisterNo: "",
        volageCode: "",
        startTime: null,
        endTime: null
      },
      ZoneOptions,
      inPortOptions,
      objectiveOptions,
      voyageTemp: {
        id: undefined,
        shipName: "",
        voyageCode: ""
      },
      portTemp: {
        id: "",
        shipId: "",
        shipName: "",
        firstVolageCode: "",
        secondVolageCode: "",
        portid: "",
        porten: "",
        portcn: "",
        arrTm: null,
        arrZone: 0,
        deptTm: null,
        deptZone: 0,
        isEu: false,
        inPort: false,
        distance: 0,
        anchorPurpose: [],
        recordType: "0",
        shorePower: 0,
        portOilInfos: [],
        volagePortLoadingInfos: [],
        voyagePortAddOilDtos: [], // 加油量
        voyagePortOutOilDtos: [], // 港口驳油量
        voyagePortOutSulageOilDtos: [] // 港口驳油渣
      },
      portEditRowId: "",
      portRowModel: [],
      pickerOptionsStartDa: {}, // 冰区
      pickerOptionsEndDa: {}, // 冰区
      driftTemp: {
        id: "",
        porten: "anchor",
        portcn: "抛锚",
        shipId: "",
        shipName: "",
        firstVolageCode: "",
        arrTm: null,
        arrZone: 0,
        deptZone: 0,
        deptTm: null,
        recordType: 1,
        portOilInfos: [],
        volagePortLoadingInfos: [], // 抵离港b
        voyagePortAddOilDtos: [], // 加油量
        voyagePortOutOilDtos: [], // 港口驳油量
        voyagePortOutSulageOilDtos: [] // 港口驳油渣
      },
      specTemp: {
        id: "",
        shipId: "",
        shipName: "",
        voyageCode: "",
        distance: 0,
        recordType: 0,
        beginZone: 0,
        endZone: 0,
        beginTm: null,
        endTm: null,
        volageSpecCons: []
      },
      portdialogFormVisible: false,
      driftdialogFormVisible: false,
      voyagedialogFormVisible: false,
      specdialogFormVisible: false,
      batchImportFormVisible: false,
      shipListVisible: false,
      voyagedialogStatus: "",
      portdialogStatus: "",
      driftdialogStatus: "",
      specdialogStatus: "",
      batchImportStatus: "",
      rowlist: "",
      voyageRules: {
        voyageCode: [{ required: true, message: "必填项", trigger: "blur" }],
        shipName: [{ required: true, message: "必填项", trigger: "blur" }]
      },
      portRules: {
        porten: [{ required: true, message: "必填项", trigger: "change" }],
        portcn: [{ required: true, message: "必填项", trigger: "change" }],
        firstVolageCode: [
          { required: true, message: "必填项", trigger: "change" }
        ],
        arrTm: [{ required: true, message: "必填项", trigger: "change" }],
        arrZone: [{ required: true, message: "必填项", trigger: "change" }],
        deptTm: [{ required: true, message: "必填项", trigger: "change" }],
        deptZone: [{ required: true, message: "必填项", trigger: "change" }],
        inPort: [{ required: true, message: "必填项", trigger: "change" }],
        distance: [
          { type: "number", message: "航程必须为数字值" },
          { required: true, message: "必填项" }
        ],
        shorePower: [{ type: "number", message: "岸电消耗量必须为数字值" }],
        shipName: [{ required: true, message: "必填项", trigger: "change" }],
        secondVolageCode: [{ validator: validateVolageCode, trigger: "blur" }]
      },
      driftTempRules: {
        firstVolageCode: [
          { required: true, message: "必填项", trigger: "change" }
        ],
        shipName: [{ required: true, message: "必填项", trigger: "change" }],
        arrTm: [{ required: true, message: "必填项", trigger: "change" }],
        arrZone: [{ required: true, message: "必填项", trigger: "change" }],
        deptZone: [{ required: true, message: "必填项", trigger: "change" }],
        deptTm: [{ required: true, message: "必填项", trigger: "change" }]
      },
      specTempRules: {
        distance: [
          { type: "number", message: "航程必须为数字值" },
          { required: true, message: "必填项" }
        ],
        voyageCode: [{ required: true, message: "必填项", trigger: "change" }],
        shipName: [{ required: true, message: "必填项", trigger: "change" }],
        beginTm: [{ required: true, message: "必填项", trigger: "change" }],
        beginZone: [{ required: true, message: "必填项", trigger: "change" }],
        endZone: [{ required: true, message: "必填项", trigger: "change" }],
        endTm: [{ required: true, message: "必填项", trigger: "change" }]
      }
    };
  },
  created() {
    this.getList();
    this.getFuelList();
    this.ZoneOptions = this.initZoneOPtions();
  },
  methods: {
    resetDate() {
      this.shiplistQuery.startTime = "";
      this.shiplistQuery.endTime = "";
    },
    TextWidthChange(e) {
      const odivParent = e.currentTarget.parentNode; // 获取目标父元素
      const dx = e.clientX; // 当你第一次单击的时候，存储x轴的坐标。
      const dw = odivParent.offsetHeight; // 存储默认的div的宽度。
      document.onmousemove = e => {
        odivParent.style.Height = dw + (e.clientX - dx) + "px";

        if (odivParent.offsetHeight <= 100) {
          // 当盒子缩小到一定范围内的时候，让他保持一个固定值，不再继续改变
          odivParent.style.Height = "100px";
        }

        if (odivParent.offsetHeight + odivParent.offsetLeft >= this.pdfHeight) {
          odivParent.style.Height =
            this.pdfHeight - odivParent.offsettop + "px";
        }
      };
      document.onmouseup = e => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
      e.stopPropagation();
      e.preventDefault();
      return false;
    },
    handTime() {
      this.listQuery.startTime = this.value[0];
      this.listQuery.endTime = this.value[1];
    },
    shipComPanyNameData() {
      this.shipComPanyNamevicode.dalog = false;
    },
    handlDetail(row) {
      this.shipComPanyNamevicode.dalog = true;
      this.shipComPanyNamevicode.id = row.id;
    },
    changeStart() {
      // 限制开始时间
      this.pickerOptionsEnd = Object.assign({}, this.pickerOptionsEnd, {
        disabledDate: time => {
          if (this.listQuery.startTime) {
            return time.getTime() < this.listQuery.startTime;
          }
        }
      });
    },
    changeEnd() {
      // 限制结束时间
      this.pickerOptionsStart = Object.assign({}, this.pickerOptionsStart, {
        disabledDate: time => {
          if (this.listQuery.endTime) {
            return (
              time.getTime() > this.listQuery.endTime - 1 * 24 * 60 * 60 * 1000
            );
          }
        }
      });
    },
    changeStartDa() {
      // 限制开始时间
      this.times = this.specTemp.beginTm;
      this.pickerOptionsEndDa = Object.assign({}, this.pickerOptionsEndDa, {
        disabledDate: time => {
          if (this.specTemp.beginTm) {
            return time.getTime() < this.specTemp.beginTm;
          }
        }
      });
    },
    changeEndDa() {
      // 限制结束时间
      this.timeEnd = this.specTemp.endTm;
      this.pickerOptionsStartDa = Object.assign({}, this.pickerOptionsStartDa, {
        disabledDate: time => {
          if (this.specTemp.endTm) {
            return (
              time.getTime() > this.specTemp.endTm - 1 * 24 * 60 * 60 * 1000
            );
          }
        }
      });
    },
    changeStartportTemp() {
      // 限制开始时间
      this.times = this.portTemp.arrTm;
      this.pickerOptionsEndportTemp = Object.assign(
        {},
        this.pickerOptionsEndportTemp,
        {
          disabledDate: time => {
            if (this.portTemp.arrTm) {
              return time.getTime() < this.portTemp.arrTm;
            }
          }
        }
      );
    },
    changeEndportTemp() {
      // 限制结束时间
      this.timeEnd = this.portTemp.deptTm;
      this.pickerOptionsStartportTemp = Object.assign(
        {},
        this.pickerOptionsStartportTemp,
        {
          disabledDate: time => {
            if (this.portTemp.deptTm) {
              return (
                time.getTime() > this.portTemp.deptTm - 2 * 24 * 60 * 60 * 1000
              );
            }
          }
        }
      );
    },
    changeStartport() {
      // 限制开始时间
      this.times = this.driftTemp.arrTm;
      this.pickerOptionsEndport = Object.assign({}, this.pickerOptionsEndport, {
        disabledDate: time => {
          if (this.driftTemp.arrTm) {
            return time.getTime() < this.driftTemp.arrTm;
          }
        }
      });
    },
    changeEndport() {
      // 限制结束时间
      this.timeEnd = this.driftTemp.deptTm;
      this.pickerOptionsStartport = Object.assign(
        {},
        this.pickerOptionsStartport,
        {
          disabledDate: time => {
            if (this.driftTemp.deptTm) {
              return (
                time.getTime() > this.driftTemp.deptTm - 1 * 24 * 60 * 60 * 1000
              );
            }
          }
        }
      );
    },
    changePortZone() {
      this.portTemp.deptZone = this.portTemp.arrZone;
    },
    changeDriftZone() {
      this.driftTemp.deptZone = this.driftTemp.arrZone;
    },
    changeSpecZone() {
      this.specTemp.endZone = this.specTemp.beginZone;
    },
    initZoneOPtions() {
      var zoneOptions = [];
      var zone = 12.5;
      var label = "西";
      for (let i = 0; i < 49; i++) {
        if (zone === 0.5) {
          label = "";
          zoneOptions.push({ key: (zone -= 0.5), display_name: label + zone });
        } else if (zone < 0.5) {
          label = "西";
          zoneOptions.push({ key: (zone -= 0.5), display_name: label + -zone });
        } else if (zone > 0.5) {
          label = "东";
          zoneOptions.push({ key: (zone -= 0.5), display_name: label + zone });
        }
      }
      return zoneOptions;
    },
    handleGeneratorVolage() {
      if (this.multipleSelection.length === 0) {
        this.$notify({
          message: "请选择航次",
          type: "info",
          duration: 2000
        });
      } else {
        var flag = this.multipleSelection.every(
          (ele, i) => ele.recStatus === "1"
        );
        if (flag) {
          this.$notify({
            message: "锁定状态下航次不能生成航次信息",
            type: "info",
            duration: 2000
          });
        } else {
          this.initgentartir();
        }
      }
    },
    initgentartir() {
      generatorVolage({ generatorVoyageDtos: this.multipleSelection }).then(
        response => {
          if (response.data.result) {
            this.$notify({
              title: "Success",
              message: response.data.data,
              type: "success",
              duration: 2000
            });
            this.getList();
            this.getFuelList();
          } else {
            this.$notify({
              title: "Error",
              message: response.data.data,
              type: "error",
              duration: 2000
            });
          }
        }
      );
    },
    getshipList(shipId) {
      this.listLoading = true;
      this.shipListVisible = true;
      if (shipId) {
        this.shiplistQuery.shipId = shipId;
      }
      // if (
      //   this.shiplistQuery.startTime &&
      //   this.shiplistQuery.endTime
      // ) {
      //   this.shiplistQuery.startTime = this.shiplistQuery.startTime.toString()
      //   this.shiplistQuery.endTime = this.shiplistQuery.endTime.toString()
      // }
      getPortInfo(this.shiplistQuery).then(response => {
        this.shipList = response.data.data;
        this.listLoading = false;
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    resetListQuery() {
      this.value = [];
      this.listQuery = {
        currentPage: 1,
        pageSize: 20,
        shipComPanyName: "",
        shipNameOrImoOrRegisterNo: "",
        volageCode: "",
        startTime: null,
        endTime: null
      };
    },
    resetOilFormData() {
      for (const item of this.oilFormData) {
        (item.id = ""),
          (item.arrTons = 0),
          (item.deptTons = 0),
          (item.addTons = 0),
          (item.addBillNo = ""),
          (item.addTm = null),
          (item.outTons = 0),
          (item.outTm = null),
          (item.correctTons = 0),
          (item.sulfurPercent = 0);
      }
    },
    resetSpecFormData() {
      for (const item of this.specTempOilFormData) {
        // eslint-disable-next-line no-sequences
        (item.id = ""),
          (item.outTons = 0),
          (item.outTm = null),
          (item.consTons = 0);
      }
    },
    getFuelList() {
      getQueryPage("/fuel/findFuelList", { pageSize: 50, pageNum: 1 }).then(
        response => {
          var tempData = [];
          var specTempData = [];
          for (const item of response.data.data.items) {
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
              sulfurPercent: 0
            };
            var specfuelOil = {
              id: "",
              oilId: "",
              oilName: "",
              consTons: 0,
              outTons: 0,
              outTm: null
            };
            fuelOil.oilId = item.fuelCode;
            fuelOil.oilName = item.fuelName;
            specfuelOil.oilId = item.fuelCode;
            specfuelOil.oilName = item.fuelName;
            tempData.push(fuelOil);
            specTempData.push(specfuelOil);
          }
          this.oilFormData = tempData;
          this.specTempOilFormData = specTempData;
        }
      );
    },
    lockOrUnLock(data) {
      lockOrUnlock(data).then(response => {
        if (response.data.result) {
          this.getList();
          this.$notify({
            title: "Success",
            message: "Successfully",
            type: "success",
            duration: 2000
          });
        } else {
          this.$notify({
            title: "Error",
            message: "Failed",
            type: "error",
            duration: 2000
          });
        }
      });
    },
    handleCurrentChange(val) {
      this.rowlist = val;
      this.codest = val.shipNameEn;
      this.codeShip = val.shipId;
      getRawVoyagePortByVoyageId({
        voyageId: val.id,
        voyageType: val.voyageFlag
      }).then(response => {
        this.portlist = response.data.data.voyagePortVos;
        this.speclist = response.data.data.voyageSpecVos;
      });
    },
    // 选择船
    selectShip() {
      this.$refs.shipSelect.handleCreateRelation();
    },
    selectPort() {
      this.$refs.portSelect.handleCreateRelation();
    },
    selectShipComPany() {
      this.$refs.shipComPanySelect.handleCreateRelation();
    },
    anchoring(tab) {
      if (tab === 1) {
        this.driftTemp.portcn = "抛锚";
        this.driftTemp.porten = "anchor";
        this.Anchoringontheway = true;
        this.resetOilFormData();

        this.$refs.driftOilTons.oilFormData = this.oilFormData;
      }
      if (tab === 2) {
        this.driftTemp.portcn = "漂航";
        this.driftTemp.porten = "drifting";
        this.Anchoringontheway = false;
      }
    },
    getList() {
      this.listLoading = true;
      if (
        this.listQuery.startTime !== null &&
        this.listQuery.endTime !== null
      ) {
        this.listQuery.startTime = this.listQuery.startTime.toString();
        this.listQuery.endTime = this.listQuery.endTime.toString();
      }
      voyageList(this.listQuery).then(response => {
        this.dataTreeGrid = response.data.data.items;
        if (response.data.data.items.length !== 0) {
          var voyageId = response.data.data.items[0].id;
          var voyageType = response.data.data.items[0].voyageFlag;
          getRawVoyagePortByVoyageId({
            voyageId: voyageId,
            voyageType: voyageType
          }).then(response => {
            this.portlist = response.data.data.voyagePortVos;
            this.speclist = response.data.data.voyageSpecVos;
          });
        }
        this.total = response.data.data.total;
        // Just to simulate the time of the request
        this.listLoading = false;
      });
    },
    getPortList() {
      this.portListLoading = true;
      portList().then(response => {
        this.portlist = response.data.items;
        this.total = response.data.total;
        // Just to simulate the time of the request
        setTimeout(() => {
          this.portListLoading = false;
        }, 1.5 * 1000);
      });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    handleResetFilter() {
      this.resetListQuery();
      this.shipComPany = "";
      this.getList();
    },
    handleModifyStatus(row) {
      if (row.recStatus === "0") {
        this.lockOrUnLock({ volageId: row.id, recStatus: "1" });
        // this.getList()
      }
      if (row.recStatus === "1") {
        this.lockOrUnLock({ volageId: row.id, recStatus: "0" });
        // this.getList()
      }
    },
    resetVoyageTemp() {
      this.voyageTemp = {
        id: undefined,
        shipName: "",
        voyageCode: ""
      };
    },
    handleCreateVoyage() {
      this.resetVoyageTemp();
      this.voyagedialogStatus = "create";
      this.voyagedialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["voyagedataForm"].clearValidate();
      });
    },
    resetPortTemp() {
      // this.$refs.Bargeoilvolume.shipId = ''
      // this.$refs.Fuelquantity.shipId = ''

      this.portTemp = {
        id: undefined,
        shipId: "",
        shipName: "",
        firstVolageCode: "",
        secondVolageCode: "",
        portid: "",
        porten: "",
        portcn: "",
        arrTm: null,
        arrZone: 0,
        deptTm: null,
        deptZone: 0,
        isEu: false,
        inPort: true,
        distance: 0,
        anchorPurpose: [],
        recordType: "0",
        shorePower: 0,
        portOilInfos: [],
        volagePortLoadingInfos: [],
        voyagePortAddOilDtos: [], // 加油量
        voyagePortOutOilDtos: [], // 港口驳油量
        voyagePortOutSulageOilDtos: [] // 港口驳油渣
      };
    },
    // 增加抵离港
    handleCreatePort() {
      this.stabel = "1";
      // this.$refs.oilTons.shipId = ''
      this.resetPortTemp();
      this.resetOilFormData();
      this.portdialogStatus = "create";
      this.portdialogFormVisible = true;
      this.readOnly = false;
      setTimeout(() => {
        this.resetOilFormData();
        // this.$refs.oilTons.getFuelList()
        // this.$refs.Bargeoilvolume.getFuelList()
        // this.$refs.Fuelquantity.getFuelList()
        this.$refs.bargeInfo.initData();
      }, 0);
      this.$nextTick(() => {
        this.portTemp.shipName = this.codest;
        this.portTemp.shipId = this.codeShip;
        this.driftTemp.shipName = this.codest;
        this.driftTemp.shipId = this.codeShip;
        this.specTemp.shipName = this.codest;
        this.specTemp.shipId = this.codeShip;
        this.$refs.oilTons.shipId = this.codeShip;
        this.$refs.Fuelquantity.shipId = this.codeShip;
        this.$refs.Bargeoilvolume.shipId = this.codeShip;
        this.$refs.oilTons.readOnly = false;
        this.$refs.Fuelquantity.readOnly = false;
        this.$refs.Bargeoilvolume.readOnly = false;
        this.$refs.bargeInfo.readOnly = false;
        this.$refs.arrCargoInfo.readonly = false;
        this.$refs.deptCargoInfo.readonly = false;
        // this.$refs['portdataForm'].clearValidate()
        this.$refs.arrCargoInfo.resetArrTemp();
        this.$refs.deptCargoInfo.resetDeptTemp();
      });
    },
    resetDriftTemp() {
      this.driftTemp = {
        id: "",
        shipId: "",
        shipName: "",
        porten: "anchor",
        portcn: "抛锚",
        firstVolageCode: "",
        arrTm: null,
        arrZone: 0,
        deptZone: 0,
        deptTm: null,
        recordType: 1,
        portOilInfos: [],
        volagePortLoadingInfos: [],
        voyagePortAddOilDtos: [], // 加油量
        voyagePortOutOilDtos: [], // 港口驳油量
        voyagePortOutSulageOilDtos: [] // 港口驳油渣
      };
    },
    // 增加漂航
    handleCreateDrift() {
      this.resetDriftTemp();
      this.driftdialogStatus = "create";
      this.driftdialogFormVisible = true;
      this.Anchoringontheway = true;
      setTimeout(() => {
        // var temp = this.oilFormData
        // this.$refs.driftOilTons.oilFormData = tempData
        this.portTemp.shipName = this.codest;
        this.portTemp.shipId = this.codeShip;
        this.driftTemp.shipName = this.codest;
        this.driftTemp.shipId = this.codeShip;
        this.specTemp.shipName = this.codest;
        this.specTemp.shipId = this.codeShip;
        // this.$refs.oilTons.shipId = this.codeShip;
        this.$refs.Fuelquantity.shipId = this.codeShip;
        this.$refs.Bargeoilvolume.shipId = this.codeShip;
        this.readOnly = false;
        // this.$refs.oilTons.readOnly = false;
        this.$refs.Fuelquantity.readOnly = false;
        this.$refs.Bargeoilvolume.readOnly = false;
        this.$refs.driftbargeInfo.readOnly = false;
        // this.$refs.driftoilTons.getFuelList()
        // this.$refs.Bargeoilvolume.getFuelList()
        // this.$refs.Fuelquantity.getFuelList()
        this.$refs.driftbargeInfo.initData();
        this.resetOilFormData();
        // this.$refs.driftOilTons.oilFormData = this.oilFormData
      }, 100);
      this.$nextTick(() => {
        this.$refs["driftdataForm"].clearValidate();
      });
    },
    resetSpecTemp() {
      // this.$refs.oilTons.shipId = ''
      //   this.$refs.Bargeoilvolume.shipId = ''
      //   this.$refs.Fuelquantity.shipId = ''
      this.specTemp = {
        id: "",
        shipId: "",
        shipName: "",
        voyageCode: "",
        distance: 0,
        recordType: 0,
        beginZone: 0,
        endZone: 0,
        beginTm: null,
        endTm: null,
        volageSpecCons: []
      };
    },
    // 批量导入按钮
    handleCreateBatch() {
      this.resetSpecTemp();
      this.batchImportFormVisible = true;
      this.batchImportStatus = "create";
    },
    handleCreateSpec() {
      this.resetSpecTemp();
      this.resetSpecFormData();
      this.stabel = "0";
      // this.specOilFormData = this.specTempOilFormData;
      this.specdialogStatus = "create";
      this.specdialogFormVisible = true;
      this.specReadOnly = false;
      this.resetOilFormData();
      this.$nextTick(() => {
        this.specTemp.shipName = this.codest;
        this.specTemp.shipId = this.codeShip;
        this.$refs.oilTonscopy.shipId = this.codeShip;
        this.$refs["specdataForm"].clearValidate();
      });
    },
    createVoyageData() {
      this.$refs["voyagedataForm"].validate(valid => {
        if (valid) {
          this.voyageTemp.id = parseInt(Math.random() * 100) + 1024; // mock a id
          this.voyageTemp.author = "vue-element-admin";
          createVoyage(this.voyageTemp).then(() => {
            this.dataTreeGrid.unshift(this.voyageTemp);
            this.voyagedialogFormVisible = false;
            this.$notify({
              title: "Success",
              message: "Created Successfully",
              type: "success",
              duration: 2000
            });
          });
        }
      });
    },
    fuelquantity(val) {
      console.log(val);
      const list = [];
      val.forEach(ele => {
        if (ele.oilName === "燃油" && ele.oilTons !== 0) {
          list.push(ele);
        }
      });
      this.ranyoucode = list;
    },
    createPortData() {
      console.log("-------------", this.portTemp.arrTm);
      if (!(this.portTemp.arrTm.getTime() < this.portTemp.deptTm.getTime())) {
        this.$message({
          message: "抵港时间晚于离港时间",
          type: "error"
        });
        return;
      }
      if (
        this.ranyoucode.length > 0 &&
        this.ranyoucode[0].addTons > 0 &&
        this.ranyoucode[0].viscosity == "0"
      ) {
        this.$message({
          message: "请输入燃油的粘度",
          type: "warning"
        });
      }
      const tempPortOil = [];
      for (const item of this.$refs.oilTons.oilFormData) {
        if (item.arrTons !== 0 && item.deptTons !== 0) {
          tempPortOil.push(item);
        }
      }
      const fuelquantity = [];
      for (const item of this.$refs.Fuelquantity.oilFormData) {
        if (item.addTons !== 0) {
          fuelquantity.push(item);
        }
      }
      const bargeoilvolume = [];
      for (const item of this.$refs.Bargeoilvolume.oilFormData) {
        if (item.outTons !== 0) {
          bargeoilvolume.push(item);
        }
      }
      const bargeInfo = [];
      for (const item of this.$refs.bargeInfo.oilFormData) {
        if (item.sludgeTons !== 0) {
          bargeInfo.push(item);
        }
      }
      this.portTemp.portOilInfos = tempPortOil;
      this.portTemp.voyagePortAddOilDtos = fuelquantity;
      this.portTemp.voyagePortOutOilDtos = bargeoilvolume;
      this.portTemp.voyagePortOutSulageOilDtos = bargeInfo;
      var temp = [];
      temp.push(this.$refs.arrCargoInfo.arrTemp);
      temp.push(this.$refs.deptCargoInfo.deptTemp);
      this.portTemp.volagePortLoadingInfos = temp;
      this.$refs["portdataForm"].validate(valid => {
        if (valid) {
          // this.$confirm('是否退出编辑?', '提示', {
          // confirmButtonText: '确定',
          // cancelButtonText: '取消',
          // type: 'warning'
          // }).then(() => {
          createPort(this.portTemp).then(response => {
            if (response.data.result) {
              this.$notify({
                title: "Success",
                message: "Created Successfully",
                type: "success",
                duration: 2000
              });
              this.portdialogFormVisible = false;
              this.getList();
              this.getFuelList();
              // location.reload();
              //  this.$refs.singleTable.setCurrentRow(rowlist)
            } else {
              this.$notify({
                title: "Error",
                message: response.data.data,
                type: "error",
                duration: 2000
              });
            }
            // this.getList()
          });
          // }).catch(() => {
          // })
        }
      });
    },
    handleUpdateVoyage(row) {
      this.voyageTemp = Object.assign({}, row); // copy obj
      this.voyageTemp.timestamp = new Date(this.voyageTemp.timestamp);
      this.voyagedialogStatus = "update";
      this.voyagedialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["voyagedataForm"].clearValidate();
      });
    },
    updateVoyageData() {
      this.$refs["voyagedataForm"].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.voyageTemp);
          tempData.timestamp = +new Date(tempData.timestamp); // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateVoyage(tempData).then(() => {
            for (const v of this.dataTreeGrid) {
              if (v.id === this.temp.id) {
                const index = this.dataTreeGrid.indexOf(v);
                this.dataTreeGrid.splice(index, 1, this.temp);
                break;
              }
            }
            this.dialogFormVisible = false;
            this.$notify({
              title: "Success",
              message: "Update Successfully",
              type: "success",
              duration: 2000
            });
          });
        }
      });
    },
    handleDeleteVoyage(row) {
      if (row.recStatus == "1") {
        this.$message({
          message: "该航次为锁定状态不可进行删除操作",
          type: "warning"
        });
      } else {
        if (confirm("确认是否删除航次") === true) {
          deleteVolage({ volageIdList: [row.id] }).then(response => {
            if (response.data.result) {
              this.$notify({
                title: "Success",
                message: "Delete Successfully",
                type: "success",
                duration: 2000
              });
              this.getList();
              this.getFuelList();
              // location.reload()
            } else {
              this.$notify({
                title: "Error",
                message: "Delete Failed",
                type: "error",
                duration: 2000
              });
            }
          });
        }
      }
    },
    initdateTime() {
      this.changeStart();
      this.changeEnd();
      this.changeStartDa();
      this.changeEndDa();
      this.changeStartportTemp();
      this.changeEndportTemp();
      this.changeStartport();
      this.changeEndport();
    },
    // 编辑
    handleUpdatePort(row) {
      this.stabel = "1";
      this.resetDriftTemp();
      this.times = row.arrivalTime;
      this.timeEnd = row.formThePortTime;
      this.resetOilFormData();
      if (row.recodeType === 1) {
        console.log(row);
        this.driftTemp.id = row.id;
        this.driftTemp.recordType = row.recodeType;
        this.driftTemp.porten = row.portName;
        this.driftTemp.portcn = row.portNameCn;
        this.driftTemp.arrTm = row.arrivalTime;
        this.driftTemp.deptTm = row.formThePortTime;
        this.driftTemp.arrZone = row.arrZone;
        this.driftTemp.shipId = row.shipId;
        this.driftTemp.shipName = row.shipNameEn;
        this.driftTemp.firstVolageCode = row.firstVolageCode;
        this.driftTemp.deptZone = row.deptZone;
        this.driftdialogFormVisible = true;
        this.Anchoringontheway = true;
        setTimeout(() => {
          this.initdateTime();
          this.readOnly = false;
          // this.$refs.driftOilTons.readOnly = false;
          this.times = row.arrivalTime;
          this.timeEnd = row.formThePortTime;
          // var portOils = row.volagePortOilVos
          // this.$refs.oilTons.oilTons = row.voyagePortOilVos;
          // this.$refs.oilTons.shipId = row.shipId;
          this.$refs.Fuelquantity.Fuelquantity = row.voyagePortAddOilVos;
          this.$refs.Fuelquantity.shipId = row.shipId;
          this.$refs.Bargeoilvolume.Bargeoilvolume = row.voyagePortOutOilVos;
          this.$refs.Bargeoilvolume.shipId = row.shipId;
          this.$refs.driftbargeInfo.bargeInfo = row.voyagePortOutSulageOilVos;
          // this.$refs.driftbargeInfo.shipId = row.shipId
          // this.$refs.oilTons.readOnly = false;
          this.$refs.Fuelquantity.readOnly = false;
          this.$refs.Bargeoilvolume.readOnly = false;
          // this.$refs.bargeInfo.readOnly = false;
          var tempFormPortOil = [];
          for (const item of this.oilFormData) {
            tempFormPortOil.push(item);
          }
          // for (var i = 0; i < portOils.length; i++) {
          //   if (
          //     portOils[i].arrTons !== 0 &&
          //     portOils[i].deptTons !== 0 &&
          //     portOils[i].arrTons !== null &&
          //     portOils[i].deptTons !== null
          //   ) {
          //     for (var j = 0; j < tempFormPortOil.length; j++) {
          //       if (tempFormPortOil[j].oilId === portOils[i].oilId) {
          //         tempFormPortOil.splice(j, 1, portOils[i]);
          //       }
          //     }
          //   }
          // }
          // this.$refs.oilTons.oilFormData = tempFormPortOil;
        }, 100);
        this.$nextTick(() => {
          this.$refs["driftdataForm"].clearValidate();
        });
      } else if (row.recodeType === 2) {
        this.driftTemp.id = row.id;
        this.driftTemp.recordType = row.recodeType;
        this.driftTemp.porten = row.portName;
        this.driftTemp.portcn = row.portNameCn;
        this.driftTemp.arrTm = row.arrivalTime;
        this.driftTemp.deptTm = row.formThePortTime;
        this.driftTemp.arrZone = row.arrZone;
        this.driftTemp.shipId = row.shipId;
        this.driftTemp.shipName = row.shipNameEn;
        this.driftTemp.firstVolageCode = row.firstVolageCode;
        this.driftdialogFormVisible = true;
        this.Anchoringontheway = false;
        this.$nextTick(() => {
          this.readOnly = false;
          this.$refs["driftdataForm"].clearValidate();
        });
      } else {
        // this.$refs.oilTons.shipId = ''
        this.portTemp.shipName = row.shipNameEn;
        this.portTemp.shipId = row.shipId;
        if (
          row.firstVolageCode !== row.secondVolageCode &&
          row.secondVolageCode !== null
        ) {
          this.ridiosfalg = true;
        } else {
          this.ridiosfalg = false;
        }
        this.portTemp.firstVolageCode = row.firstVolageCode;
        this.portTemp.secondVolageCode = row.secondVolageCode;
        this.portTemp.arrZone = row.arrZone;
        this.portTemp.deptZone = row.deptZone;
        this.portTemp.shorePower = row.shorePower;
        this.portTemp.distance = row.distance;
        this.portTemp.isEu = row.isEu === 1;
        this.portTemp.portid = row.portId;
        this.portTemp.id = row.id;
        this.portTemp.porten = row.portName;
        this.portTemp.portcn = row.portNameCn;
        this.portTemp.arrTm = row.arrivalTime;
        this.portTemp.deptTm = row.formThePortTime;
        this.portTemp.anchorPurpose = row.portWork === null ? [] : row.portWork;
        this.portTemp.inPort = row.inPort;
        this.portdialogStatus = "update";
        this.portdialogFormVisible = true;
        // this.objectiveId.forEach(ele => {
        //     this.objectiveOptions.forEach(el => {
        //        if(ele === el.display_name) {
        //         this.portTemp.anchorPurpose.push(el.id)
        //        }
        //     })
        // })
        this.readOnly = false;
        setTimeout(() => {
          this.initdateTime();
          for (const item of row.voyagePortLordingVos) {
            if (item.loadingType === "0") {
              this.$refs.deptCargoInfo.deptTemp = item;
            } else if (item.loadingType === "1") {
              this.$refs.arrCargoInfo.arrTemp = item;
            }
          }
          this.times = row.arrivalTime;
          this.timeEnd = row.formThePortTime;
          this.$refs.oilTons.oilTons = row.voyagePortOilVos;
          this.$refs.oilTons.shipId = row.shipId;
          this.$refs.Fuelquantity.Fuelquantity = row.voyagePortAddOilVos;
          this.$refs.Fuelquantity.shipId = row.shipId;
          this.$refs.Bargeoilvolume.Bargeoilvolume = row.voyagePortOutOilVos;
          this.$refs.Bargeoilvolume.shipId = row.shipId;
          this.$refs.bargeInfo.bargeInfo = row.voyagePortOutSulageOilVos;
          //  this.$refs.bargeInfo.shipId = row.shipId
          this.$refs.oilTons.readOnly = false;
          this.$refs.Fuelquantity.readOnly = false;
          this.$refs.Bargeoilvolume.readOnly = false;
          this.$refs.bargeInfo.readOnly = false;
          this.$refs.arrCargoInfo.readonly = false;
          this.$refs.deptCargoInfo.readonly = false;
          var portOils = row.volagePortOilVos;
          var tempFormPortOil = [];
          for (const item of this.oilFormData) {
            tempFormPortOil.push(item);
          }
          for (var i = 0; i < portOils.length; i++) {
            if (
              portOils[i].arrTons !== 0 &&
              portOils[i].deptTons !== 0 &&
              portOils[i].arrTons !== null &&
              portOils[i].deptTons !== null
            ) {
              for (var j = 0; j < tempFormPortOil.length; j++) {
                if (tempFormPortOil[j].oilId === portOils[i].oilId) {
                  tempFormPortOil.splice(j, 1, portOils[i]);
                }
              }
            }
          }
          this.$refs.oilTons.oilFormData = tempFormPortOil;
          this.$refs.deptCargoInfo.resetDeptTemp();
          this.$refs.arrCargoInfo.resetArrTemp();
        }, 100);
        this.$nextTick(() => {
          this.$refs["portdataForm"].clearValidate();
        });
      }
    },
    // 详情
    handleDetailPort(row) {
      this.resetOilFormData();
      this.resetDriftTemp();
      if (row.recodeType === 1) {
        this.driftTemp.id = row.id;
        this.driftTemp.recordType = row.recodeType;
        this.driftTemp.porten = row.portName;
        this.driftTemp.portcn = row.portNameCn;
        if (
          row.firstVolageCode !== row.secondVolageCode &&
          row.secondVolageCode !== null
        ) {
          this.ridiosfalg = true;
        } else {
          this.ridiosfalg = false;
        }
        this.driftTemp.arrTm = row.arrivalTime;
        this.driftTemp.deptTm = row.formThePortTime;
        this.driftTemp.arrZone = row.arrZone;
        this.driftTemp.shipId = row.shipId;
        this.driftTemp.shipName = row.shipNameEn;
        this.driftTemp.firstVolageCode = row.firstVolageCode;
        this.driftTemp.deptZone = row.deptZone;
        this.driftdialogFormVisible = true;
        this.Anchoringontheway = true;
        setTimeout(() => {
          this.readOnly = true;
          this.$refs.oilTons.readOnly = true;
          this.$refs.oilTons.oilTons = row.voyagePortOilVos;
          this.$refs.oilTons.shipId = row.shipId;
          this.$refs.Fuelquantity.Fuelquantity = row.voyagePortAddOilVos;
          this.$refs.Fuelquantity.shipId = row.shipId;
          this.$refs.Bargeoilvolume.Bargeoilvolume = row.voyagePortOutOilVos;
          this.$refs.Bargeoilvolume.shipId = row.shipId;
          this.$refs.driftbargeInfo.bargeInfo = row.voyagePortOutSulageOilVos;
          this.$refs.driftbargeInfo.shipId = row.shipId;
          this.readOnly = true;
          this.$refs.Fuelquantity.readOnly = true;
          this.$refs.Bargeoilvolume.readOnly = true;
          this.$refs.driftbargeInfo.readOnly = true;
          var portOils = row.volagePortOilVos;
          var tempFormPortOil = [];
          for (const item of this.oilFormData) {
            tempFormPortOil.push(item);
          }
          // for (var i = 0; i < portOils.length; i++) {
          //   if (
          //     portOils[i].arrTons !== 0 &&
          //     portOils[i].deptTons !== 0 &&
          //     portOils[i].arrTons !== null &&
          //     portOils[i].deptTons !== null
          //   ) {
          //     for (var j = 0; j < tempFormPortOil.length; j++) {
          //       if (tempFormPortOil[j].oilId === portOils[i].oilId) {
          //         tempFormPortOil.splice(j, 1, portOils[i]);
          //       }
          //     }
          //   }
          // }
          // this.$refs.oilTons.oilFormData = tempFormPortOil;
        }, 100);
        this.$nextTick(() => {
          this.$refs["driftdataForm"].clearValidate();
        });
      } else if (row.recodeType === 2) {
        this.driftTemp.id = row.id;
        this.driftTemp.recordType = row.recodeType;
        this.driftTemp.porten = row.portName;
        this.driftTemp.portcn = row.portNameCn;
        this.driftTemp.arrTm = row.arrivalTime;
        this.driftTemp.deptTm = row.formThePortTime;
        this.driftTemp.arrZone = row.arrZone;
        this.driftTemp.shipId = row.shipId;
        this.driftTemp.shipName = row.shipNameEn;
        this.driftTemp.firstVolageCode = row.firstVolageCode;
        this.driftTemp.deptZone = row.deptZone;
        this.driftdialogFormVisible = true;
        this.Anchoringontheway = false;
        this.$nextTick(() => {
          this.readOnly = true;
          this.$refs["driftdataForm"].clearValidate();
        });
      } else {
        this.portTemp.shipName = row.shipName;
        this.portTemp.shipId = row.shipId;
        this.portTemp.firstVolageCode = row.firstVolageCode;
        this.portTemp.secondVolageCode = row.secondVolageCode;
        this.portTemp.arrZone = row.arrZone;
        this.portTemp.deptZone = row.deptZone;
        this.portTemp.shorePower = row.shorePower;
        this.portTemp.distance = row.distance;
        this.portTemp.isEu = row.isEu === 1;
        this.portTemp.inPort = row.inPort;
        if (
          row.firstVolageCode !== row.secondVolageCode &&
          row.secondVolageCode !== null
        ) {
          this.ridiosfalg = true;
        } else {
          this.ridiosfalg = false;
        }
        this.portTemp.portid = row.portId;
        this.portTemp.id = row.id;
        this.portTemp.porten = row.portName;
        this.portTemp.portcn = row.portNameCn;
        this.portTemp.arrTm = row.arrivalTime;
        this.portTemp.deptTm = row.formThePortTime;
        this.portTemp.anchorPurpose = row.portWork === null ? [] : row.portWork;
        this.portdialogStatus = "update";
        this.portdialogFormVisible = true;
        setTimeout(() => {
          this.$refs.oilTons.oilTons = row.voyagePortOilVos;
          this.$refs.oilTons.shipId = row.shipId;
          this.$refs.Fuelquantity.Fuelquantity = row.voyagePortAddOilVos;
          this.$refs.Fuelquantity.shipId = row.shipId;
          this.$refs.Bargeoilvolume.Bargeoilvolume = row.voyagePortOutOilVos;
          this.$refs.Bargeoilvolume.shipId = row.shipId;
          this.$refs.bargeInfo.bargeInfo = row.voyagePortOutSulageOilVos;
          this.$refs.bargeInfo.shipId = row.shipId;
          this.readOnly = true;
          this.$refs.oilTons.readOnly = true;
          this.$refs.Fuelquantity.readOnly = true;
          this.$refs.Bargeoilvolume.readOnly = true;
          this.$refs.bargeInfo.readOnly = true;
          this.$refs.arrCargoInfo.readonly = true;
          this.$refs.deptCargoInfo.readonly = true;
          this.$refs.deptCargoInfo.resetDeptTemp();
          this.$refs.arrCargoInfo.resetArrTemp();
          for (const item of row.voyagePortLordingVos) {
            if (item.loadingType === "0") {
              this.$refs.deptCargoInfo.deptTemp = item;
            } else if (item.loadingType === "1") {
              this.$refs.arrCargoInfo.arrTemp = item;
            }
          }
          var portOils = row.volagePortOilVos;
          var tempFormPortOil = [];
          for (const item of this.oilFormData) {
            tempFormPortOil.push(item);
          }
          for (var i = 0; i < portOils.length; i++) {
            if (
              portOils[i].arrTons !== 0 &&
              portOils[i].deptTons !== 0 &&
              portOils[i].arrTons !== null &&
              portOils[i].deptTons !== null
            ) {
              for (var j = 0; j < tempFormPortOil.length; j++) {
                if (tempFormPortOil[j].oilId === portOils[i].oilId) {
                  tempFormPortOil.splice(j, 1, portOils[i]);
                }
              }
            }
          }
          this.$refs.oilTons.oilFormData = tempFormPortOil;
        }, 10);
        this.$nextTick(() => {
          this.$refs["portdataForm"].clearValidate();
        });
      }
    },
    updatePortData() {
      console.log("==============", this.portTemp.arrTm);
      if (
        !(
          new Date(this.portTemp.arrTm).getTime() <
          new Date(this.portTemp.deptTm).getTime()
        )
      ) {
        this.$message({
          message: "抵港时间晚于离港时间",
          type: "error"
        });
        return;
      }
      if (
        this.ranyoucode.length > 0 &&
        this.ranyoucode[0].addTons > 0 &&
        this.ranyoucode[0].viscosity === "0"
      ) {
        this.$message({
          message: "请输入燃油的粘度",
          type: "warning"
        });
      }
      const tempPortOil = [];
      for (const item of this.$refs.oilTons.oilFormData) {
        console.log("-------------", this.$refs.oilTons.oilFormData);
        if (item.arrTons !== 0 || item.deptTons !== 0) {
          tempPortOil.push(item);
        }
      }
      const fuelquantity = [];
      for (const item of this.$refs.Fuelquantity.oilFormData) {
        if (item.addTons !== 0) {
          fuelquantity.push(item);
        }
      }
      const bargeoilvolume = [];
      for (const item of this.$refs.Bargeoilvolume.oilFormData) {
        if (item.outTons !== 0) {
          bargeoilvolume.push(item);
        }
      }
      const bargeInfo = [];
      for (const item of this.$refs.bargeInfo.oilFormData) {
        if (item.sludgeTons !== 0) {
          bargeInfo.push(item);
        }
      }
      this.portTemp.portOilInfos = tempPortOil;
      this.portTemp.voyagePortAddOilDtos = fuelquantity;
      this.portTemp.voyagePortOutOilDtos = bargeoilvolume;
      this.portTemp.voyagePortOutSulageOilDtos = bargeInfo;
      var temp = [];
      temp.push(this.$refs.arrCargoInfo.arrTemp);
      temp.push(this.$refs.deptCargoInfo.deptTemp);
      // 1111111111111111
      this.portTemp.volagePortLoadingInfos = temp;
      this.$refs["portdataForm"].validate(valid => {
        if (valid) {
          // this.$confirm('是否退出编辑?', '提示', {
          //   confirmButtonText: '确定',
          //   cancelButtonText: '取消',
          //   type: 'warning'
          // }).then(() => {
          updatePort(this.portTemp).then(response => {
            if (response.data.result) {
              this.$notify({
                title: "Success",
                message: "Update Successfully",
                type: "success",
                duration: 2000
              });
            } else {
              this.$notify({
                title: "Error",
                message: "Update Failed",
                type: "error",
                duration: 2000
              });
            }
            this.getList();
            this.getFuelList();
            this.portdialogFormVisible = false;
            // location.reload();
          });
          // }).catch(() => {
          // });
        }
      });
    },
    handleDeletePort(row) {
      if (confirm("确认是否删除") === true) {
        deletePort({ volagePortIdList: [row.id] }).then(response => {
          if (response.data.result) {
            this.$notify({
              title: "Success",
              message: "Delete Successfully",
              type: "success",
              duration: 2000
            });
            this.getList();
          } else {
            this.$notify({
              title: "Error",
              message: "Delete Failed",
              type: "error",
              duration: 2000
            });
          }
        });
        // eslint-disable-next-line no-empty
      } else {
      }
      // const index = this.portlist.indexOf(row)
      // this.portlist.splice(index, 1)
    },
    handleDeleteSpec(row) {
      if (confirm("确认是否删除") === true) {
        deleteSpec({ volageIceAndRescueIdList: [row.id] }).then(response => {
          if (response.data.result) {
            this.$notify({
              title: "Success",
              message: "Delete Successfully",
              type: "success",
              duration: 2000
            });
          } else {
            this.$notify({
              title: "Error",
              message: "Delete Failed",
              type: "error",
              duration: 2000
            });
          }
        });
        this.getList();
      }
      // const index = this.portlist.indexOf(row)
      // this.portlist.splice(index, 1)
    },
    // 冰区救援
    handleUpdateSpec(row) {
      this.stabel = "0";
      console.log(111, row);
      this.resetSpecFormData();
      this.specdialogStatus = "update";
      this.specTemp.id = row.id;
      this.specTemp.distance = row.distance;
      this.specTemp.beginTm = row.iceStartTime;
      this.specTemp.endTm = row.iceEndTime;
      this.specTemp.shipId = row.shipId;
      this.specTemp.shipName = row.shipNameEn;
      this.specTemp.distance = row.distance;
      this.specTemp.voyageCode = row.voyageCode;
      this.specTemp.beginZone = row.beginZone;
      var portOils = row.rawVoyageSpecConsVos;
      setTimeout(() => {
        this.times = row.iceStartTime;
        this.timeEnd = row.iceEndTime;
        this.$refs.oilTonscopy.readOnly = false;
        this.$refs.oilTonscopy.oilTons = row.rawVoyageSpecConsVos;
        this.$refs.oilTonscopy.shipId = row.shipId;
        // var tempFormPortOil = [];
        // for (let item of this.specTempOilFormData) {
        //   tempFormPortOil.push(item);
        // }
        // for (var i = 0; i < portOils.length; i++) {
        //   if (
        //     (portOils[i].consTons !== 0 && portOils[i].consTons !== "") ||
        //     (portOils[i].outTons !== 0 && portOils[i].outTons !== "")
        //   ) {
        //     for (var j = 0; j < tempFormPortOil.length; j++) {
        //       if (tempFormPortOil[j].oilId === portOils[i].oilId) {
        //         tempFormPortOil.splice(j, 1, portOils[i]);
        //       }
        //     }
        //   }
        // }
        // this.specOilFormData = tempFormPortOil;
      }, 100);
      this.specdialogFormVisible = true;
      this.specReadOnly = false;
    },
    // 冰区详情
    handleDetailSpec(row) {
      this.stabel = "0";
      this.specdialogStatus = "update";
      this.specTemp.id = row.id;
      this.specTemp.distance = row.distance;
      this.specTemp.beginTm = row.iceStartTime;
      this.specTemp.endTm = row.iceEndTime;
      this.specTemp.shipId = row.shipId;
      this.specTemp.shipName = row.shipNameEn;
      this.specTemp.distance = row.distance;
      this.specTemp.voyageCode = row.voyageCode;
      this.specTemp.beginZone = row.beginZone;
      var portOils = row.rawVoyageSpecConsVos;
      setTimeout(() => {
        this.$refs.oilTonscopy.readOnly = true;
        this.$refs.oilTonscopy.oilTons = row.rawVoyageSpecConsVos;
        this.$refs.oilTonscopy.shipId = row.shipId;
        // var tempFormPortOil = [];
        // for (let item of this.specTempOilFormData) {
        //   tempFormPortOil.push(item);
        // }
        // for (var i = 0; i < portOils.length; i++) {
        //   if (
        //     (portOils[i].consTons !== 0 && portOils[i].consTons !== "") ||
        //     (portOils[i].outTons !== 0 && portOils[i].outTons !== "")
        //   ) {
        //     for (var j = 0; j < tempFormPortOil.length; j++) {
        //       if (tempFormPortOil[j].oilId === portOils[i].oilId) {
        //         tempFormPortOil.splice(j, 1, portOils[i]);
        //       }
        //     }
        //   }
        // }
        // this.specOilFormData = tempFormPortOil;
      }, 100);
      this.specdialogFormVisible = true;
      this.specReadOnly = true;
    },
    setRawVoyageSpecConsDto(data) {
      var rawportSpecs = [];
      if (data.dieselOil !== 0 && data.dieselOil !== "") {
        var rawportSpec = {
          id: data.dieselOilId,
          oilId: "3",
          oilName: "柴油/汽油",
          consTons: data.dieselOil
        };
        rawportSpecs.push(rawportSpec);
      }
      if (data.carbinol !== 0 && data.carbinol !== "") {
        var rawportSpec = {
          id: data.carbinolId,
          oilId: "7",
          oilName: "甲醇",
          consTons: data.carbinol
        };
        rawportSpecs.push(rawportSpec);
      }
      if (data.ethanol !== 0 && data.ethanol !== "") {
        var rawportSpec = {
          id: data.ethanolId,
          oilId: "8",
          oilName: "乙醇",
          consTons: data.ethanol
        };
        rawportSpecs.push(rawportSpec);
      }
      if (data.propane !== 0 && data.propane !== "") {
        var rawportSpec = {
          id: data.propaneId,
          oilId: "4",
          oilName: "液化石油气LPG（丙烷）",
          consTons: data.propane
        };
        rawportSpecs.push(rawportSpec);
      }
      if (data.butane !== 0 && data.butane !== "") {
        var rawportSpec = {
          id: data.butaneId,
          oilId: "5",
          oilName: "丁烷",
          consTons: data.butane
        };
        rawportSpecs.push(rawportSpec);
      }
      if (data.tianran !== 0 && data.tianran !== "") {
        var rawportSpec = {
          id: data.tianranId,
          oilId: "6",
          oilName: "液化天然气LNG",
          consTons: data.tianran
        };
        rawportSpecs.push(rawportSpec);
      }
      if (data.highSulfurHeavy !== 0 && data.highSulfurHeavy !== "") {
        var rawportSpec = {
          id: data.highSulfurHeavyId,
          oilId: "1",
          oilName: "重燃油HFO(高硫)",
          consTons: data.highSulfurHeavy
        };
        rawportSpecs.push(rawportSpec);
      }
      if (data.lowSulfurHeavy !== 0 && data.lowSulfurHeavy !== "") {
        var rawportSpec = {
          id: data.lowSulfurHeavyId,
          oilId: "11",
          oilName: "重燃油HFO(低硫)",
          consTons: data.lowSulfurHeavy
        };
        rawportSpecs.push(rawportSpec);
      }
      if (data.ulsdSulfurHeavy !== 0 && data.ulsdSulfurHeavy !== "") {
        var rawportSpec = {
          id: data.ulsdSulfurHeavyId,
          oilId: "12",
          oilName: "重燃油HFO(超低硫)",
          consTons: data.ulsdSulfurHeavy
        };
        rawportSpecs.push(rawportSpec);
      }
      if (data.highSulfurLight !== 0 && data.highSulfurLight !== "") {
        var rawportSpec = {
          id: data.highSulfurLightId,
          oilId: "2",
          oilName: "轻燃油LFO(高硫)",
          consTons: data.highSulfurLight
        };
        rawportSpecs.push(rawportSpec);
      }
      if (data.lowSulfurLight !== 0 && data.lowSulfurLight !== "") {
        var rawportSpec = {
          id: data.lowSulfurLightId,
          oilId: "21",
          oilName: "轻燃油LFO(低硫)",
          consTons: data.lowSulfurLight
        };
        rawportSpecs.push(rawportSpec);
      }
      if (data.ulsdSulfurLight !== 0 && data.ulsdSulfurLight !== "") {
        var rawportSpec = {
          id: data.ulsdSulfurLightId,
          oilId: "22",
          oilName: "轻燃油LFO(超低硫)",
          consTons: data.ulsdSulfurLight
        };
        rawportSpecs.push(rawportSpec);
      }
      return rawportSpecs;
    },
    createData() {
      if (
        !(
          new Date(this.specTemp.beginTm).getTime() <
          new Date(this.specTemp.endTm).getTime()
        )
      ) {
        this.$message({
          message: "开始时间晚于结束时间",
          type: "error"
        });
        return;
      }
      this.$refs["specdataForm"].validate(valid => {
        if (valid) {
          const tempPortOil = [];
          for (const item of this.$refs.oilTonscopy.oilFormData) {
            if (item.consTons !== 0 && item.outTons !== 0) {
              item.id = "";
              tempPortOil.push(item);
              console.log(item, 5456454545);
            }
          }
          this.specTemp.volageSpecCons = tempPortOil;
          createIceAndRescue(this.specTemp).then(response => {
            if (response.data.result) {
              this.$notify({
                title: "Success",
                message: "Created Successfully",
                type: "success",
                duration: 2000
              });
              // location.reload()
              this.getList();
              this.getFuelList();
            } else {
              this.$notify({
                title: "Error",
                message: "Created Failed",
                type: "error",
                duration: 2000
              });
            }
          });
          this.specdialogFormVisible = false;
        }
      });
    },
    updateSpecData() {
      if (
        !(
          new Date(this.specTemp.beginTm).getTime() <
          new Date(this.specTemp.endTm).getTime()
        )
      ) {
        this.$message({
          message: "开始时间晚于结束时间",
          type: "error"
        });
        return;
      }
      const tempPortOil = [];
      for (const item of this.$refs.oilTonscopy.oilFormData) {
        if (item.consTons !== 0 && item.outTons !== 0) {
          tempPortOil.push(item);
        }
      }
      this.specTemp.volageSpecCons = tempPortOil;
      createIceAndRescue(this.specTemp).then(response => {
        if (response.data.result) {
          this.$notify({
            title: "Success",
            message: "Update Successfully",
            type: "success",
            duration: 2000
          });
          this.getList();
          this.getFuelList();
        } else {
          this.$notify({
            title: "Error",
            message: "Update Failed",
            type: "error",
            duration: 2000
          });
        }
      });
      this.specdialogFormVisible = false;
    },
    createDriftData() {
      if (
        !(
          new Date(this.driftTemp.arrTm).getTime() <
          new Date(this.driftTemp.deptTm).getTime()
        )
      ) {
        this.$message({
          message: "开始时间晚于结束时间",
          type: "error"
        });
        return;
      }
      if (
        this.ranyoucode.length > 0 &&
        this.ranyoucode[0].addTons > 0 &&
        this.ranyoucode[0].viscosity === "0"
      ) {
        this.$message({
          message: "请输入燃油的粘度",
          type: "warning"
        });
      }
      if (this.driftTemp.recordType === 1) {
        const tempPortOil = [];
        // for (let item of this.$refs.oilTons.oilFormData) {
        //   if (item.arrTons !== 0 && item.deptTons !== 0) {
        //     tempPortOil.push(item);
        //   }
        // }
        const fuelquantity = [];
        for (const item of this.$refs.Fuelquantity.oilFormData) {
          if (item.addTons !== 0) {
            fuelquantity.push(item);
          }
        }
        const bargeoilvolume = [];
        for (const item of this.$refs.Bargeoilvolume.oilFormData) {
          if (item.outTons !== 0) {
            bargeoilvolume.push(item);
          }
        }
        const bargeInfo = [];
        for (const item of this.$refs.driftbargeInfo.oilFormData) {
          if (item.sludgeTons !== 0) {
            bargeInfo.push(item);
          }
        }
        this.driftTemp.voyagePortAddOilDtos = fuelquantity;
        this.driftTemp.voyagePortOutOilDtos = bargeoilvolume;
        this.driftTemp.voyagePortOutSulageOilDtos = bargeInfo;
        this.driftTemp.portOilInfos = tempPortOil;
      }
      this.$refs["driftdataForm"].validate(valid => {
        if (valid) {
          createPort(this.driftTemp).then(response => {
            if (response.data.result) {
              this.$notify({
                title: "Success",
                message: "Successfully",
                type: "success",
                duration: 2000
              });
            } else {
              this.$notify({
                title: "Error",
                message: "Failed",
                type: "error",
                duration: 2000
              });
            }
          });
          this.getList();
          this.driftdialogFormVisible = false;
        }
      });
    }
  }
};
</script>
<style scoped>
/deep/ .el-table__body-wrapper {
  min-height: 370px;
}
html,
body {
  overflow: scroll;
  overflow-y: hidden;
}
.el-input__inner {
  padding: 2px;
  z-index: 9999;
  /* background: red; */
  display: flex;
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
</style>
