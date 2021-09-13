<template>
  <div class="app-container">
    <div class="filter-container">
      <div style="display:inline-block;">
        <label class="radio-label" style="padding-left:0;">{{ $t('ship.searchOperator') }}</label>
        <el-input v-model="shipComPany" :placeholder="$t('common.inputRemind')" size="mini"
        style="width: 200px;"
        class="filter-item" @keyup.enter.native="getList" :readonly="true"/>
        <el-button plain @click="selectComPany">{{ $t('common.select') }}</el-button>
        <label class="radio-label" style="padding-left:30px;">{{ $t('ship.nameOrimo') }}</label>
        <el-input
          v-model="listQuery.shipKeyWord"
          :placeholder="$t('ship.shipIdxKey')"
          size="mini"
          style="width: 200px;"
          class="filter-item"
          @keyup.enter.native="getList"
        />
        <label class="radio-label" style="padding-left:30px;">{{ $t('ship.speed') }}</label>
        <el-input
          v-model="listQuery.startSpeed"
          placeholder=""
          style="width: 60px;"
          size="mini"
          class="filter-item"
          @keyup.enter.native="getList"
        />

        <el-input
          v-model="listQuery.endSpeed"
          placeholder=""
          style="width: 60px;"
          size="mini"
          class="filter-item"
          @keyup.enter.native="getList"
        />
      </div>
      <div style="display:inline-block;">
        <label class="radio-label" style="padding-left:0;">{{ $t('ship.shipType') }}</label>
        <el-select
          v-model="listQuery.sptype"
          :placeholder="$t('common.selectRemind')"
          clearable
          class="filter-item"
          size="mini"
          style="width: 130px"
        >
          <el-option
                v-for="item in shipTypeOptions"
                :key="item.id"
                :label="item.csptype"
                :value="item.id"
              />

        </el-select>
        <label class="radio-label" style="padding-left:0;">{{ $t('ship.shipSubType') }}</label>
        <el-select
          v-model="listQuery.sptypeSub"
          :placeholder="$t('common.selectRemind')"
          clearable
          class="filter-item"
          size="mini"
          style="width: 130px"
        >
         <el-option
                v-for="item in shipSubTypeOptions"
                :key="item.id"
                :label="item.subName"
                :value="item.subCode"
              />
        </el-select>
        <label class="radio-label" style="padding-left:30px;">{{ $t('ship.searchGross') }}</label>
        <el-select
          v-model="dw"
          :placeholder="$t('common.selectRemind')"
          clearable
          class="filter-item"
          size="mini"
          style="width: 200px"
        >
          <el-option
            v-for="item in grossOptions"
            :key="item.tonCode"
            :label="item.tonSmall +'~'+ item.tonBig"
            :value="item.tonSmall +'~'+ item.tonBig"
          />
        </el-select>
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
          {{ $t('common.search') }}
        </el-button>
        <el-button v-waves class="filter-item" type="info" icon="el-icon-setting" size="mini" @click="handleFilter">
          {{ $t('common.reset') }}
        </el-button>
      </div>
      <div style="margin-top:5px;padding-bottom: 5px">
        <el-button
          v-if="$store.getters.button.includes('ship:list:add')"
          class="filter-item" size="mini" type="primary" icon="el-icon-plus" @click="handleCreate">
          {{ $t('ship.btnAddShip') }}
        </el-button>
        <!-- <el-button
          v-if="$store.getters.button.includes('ship:list:delete')"
          v-waves
          :loading="downloadLoading"
          size="mini"
          class="filter-item"
          type="danger"
          icon="el-icon-delete"
          @click="batchDeleteOiShipInfo"
        >
          {{ $t('ship.btnBatchDelete') }}
        </el-button> -->
        <!-- <el-button
          v-if="$store.getters.button.includes('ship:list:import')"
          v-waves
          :loading="downloadLoading"
          size="mini"
          class="filter-item"
          type="warning"
          icon="el-icon-download"
        >
          {{ $t('ship.btnBatchImport') }}
        </el-button> -->
        <el-button
          v-if="$store.getters.button.includes('ship:list:syn')"
          v-waves
          :loading="downloadLoading"
          size="mini"
          class="filter-item"
          type="primary"
          icon="el-icon-refresh"
          @click="gotoSsmis"
        >
          {{ $t('ship.syncSSMIS') }}
        </el-button>
        <el-button
          size="mini"
          class="filter-item"
          type="primary"
          @click="docflagchange"
        >
          {{ $t('ship.docflagchange') }}
        </el-button>
        <el-button
          size="mini"
          class="filter-item"
          type="primary"
          @click="Changerecord"
        >
          {{ $t('ship.Changerecord') }}
        </el-button>
      </div>
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      v-adaptive="{bottomOffset: 38}"
      :data="list"
      border
      fit
      height="100px"
      highlight-current-row
      style="width: 100%; overflow:auto"
      :row-style="{height:'35px'}"
      :cell-style="{padding:'0'}"
      @current-change="handleCurrentChange"
      @sort-change="sortChange"
      @selection-change="handleSelectionChange"
    >
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <el-table-column :label="$t('ship.shipLangName')" min-width="150px" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.spname }}/{{ row.spnameCn }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('ship.imono')" min-width="100px" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.imono }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('ship.registNo')" min-width="100px" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.registerno }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('ship.shipFlag')" width="110px" align="center" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.flag }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('ship.sptype')" width="110px" align="center" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.shipTypeName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('ship.tableGross')" width="110px" align="center" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.dw }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('ship.speed')" width="110px" align="center" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.serviceSpeed }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('ship.shipClass')" width="110px" align="center" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.class_ }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('ship.iceCode')" width="110px" align="center" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{ row.ice }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('common.operate')" align="center" width="230" class-name="small-padding2 fixed-width">
        <template slot-scope="{row}">
          <el-button size="mini" type="success" @click="handleUpdate(row,'detail')">
            {{ $t('common.detail') }}
          </el-button>
          <el-button
            v-if="$store.getters.button.includes('ship:list:edit')"
            type="primary" size="mini" @click="handleUpdate(row)">
            {{ $t('common.edit') }}
          </el-button>
          <el-button
            v-if="$store.getters.button.includes('ship:list:delete')"
            size="mini" type="danger" @click="handleModifyStatus(row,'deleted')">
            {{ $t('common.delete') }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        v-if="$store.getters.button.includes('ship:list:notme')"
        :label="$t('ship.btnRemoveShip')" width="110px" align="center">
        <template slot-scope="{row}">
          <el-button
            type="primary" size="mini" @click="handleRemove(row)">
            {{ $t('ship.btnRemoveShip') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      style="margin:0px;padding:0px"
      :total="total"
      :page.sync="listQuery.currentPage"
      :limit.sync="listQuery.pageSize"
      @pagination="getList"
    />

    <el-dialog
      v-el-drag-dialog
      width="80%"
      :title="$t('ship.shipEditText')"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      custom-class="customwh"
      @dragDialog="this.$refs.select.blur()"
      :append-to-body="true"
    >
      <el-tabs
        v-model="activeName"
        value="first"
        type="border-card"
        style="height:100%;overflow:hidden;"
        @tab-click="handleClick"
      >
        <el-tab-pane :key="'first'" :label="$t('ship.shipInfo')" name="first">
          <shipInfo
            ref="shipInfo"
            :edit-status="dialogStatus"
            :edit-row-id="editRowId"
            :row-model="rowModel"
            v-if="dialogFormVisible"
          />
        </el-tab-pane>
        <el-tab-pane :key="'second'" :disabled="flages" :label="$t('ship.shipMde')" name="second">
          <shipMde
            ref="shipMde"
            :edit-status="dialogStatus"
            :edit-row-id="editRowId"
            :row-model="rowModel"
            v-if="dialogFormVisible"
          />
        </el-tab-pane>
        <el-tab-pane :key="'third'" :disabled="flages" :label="$t('ship.shipPM')" name="third">
          <shipPM
            ref="shipPM"
            :edit-status="dialogStatus"
            :edit-row-id="editRowId"
            :row-model="rowModel"
            v-if="dialogFormVisible"
          />
        </el-tab-pane>
        <el-tab-pane :key="'eighth'" :disabled="flages" :label="$t('ship.shipGenerator')" name="eighth">
          <shipGenerator
            ref="shipGenerator"
            :edit-status="dialogStatus"
            :edit-row-id="editRowId"
            :row-model="rowModel"
          />
        </el-tab-pane>
        <el-tab-pane :key="'eleven'" :disabled="flages" :label="$t('ship.battery')" name="eleven">
          <battery
            ref="battery"
            :edit-status="dialogStatus"
            :edit-row-id="editRowId"
            :row-model="rowModel"
          />
        </el-tab-pane>
        <el-tab-pane :key="'fourth'"  :disabled="flages" :label="$t('ship.shipBoiler')" name="fourth">
          <shipBoiler
            ref="shipBoiler"
            :edit-status="dialogStatus"
            :edit-row-id="editRowId"
            :row-model="rowModel"
          />
        </el-tab-pane>
        <el-tab-pane :key="'fifth'" :disabled="flages" :label="$t('ship.shipIncinerator')" name="fifth">
          <shipIncinerator
            ref="shipIncinerator"
            :edit-status="dialogStatus"
            :edit-row-id="editRowId"
            :row-model="rowModel"
          />
        </el-tab-pane>
        <el-tab-pane :key="'sixth'" :disabled="flages" :label="$t('ship.shipInert')" name="sixth">
          <shipInert
            ref="shipInert"
            :edit-status="dialogStatus"
            :edit-row-id="editRowId"
            :row-model="rowModel"
          />
        </el-tab-pane>
        <el-tab-pane :key="'seventh'" :disabled="flages" :label="$t('ship.shipGasTurbines')" name="seventh">
          <shipGasTurbines
            ref="shipGasTurbines"
            :edit-status="dialogStatus"
            :edit-row-id="editRowId"
            :row-model="rowModel"
          />
        </el-tab-pane>
        <!-- <el-tab-pane :key="'ninth'" :disabled="flages" :label="$t('ship.shipMainProp')" name="ninth">
          <shipMainProp
            ref="shipMainProp"
            :edit-status="dialogStatus"
            :edit-row-id="editRowId"
            :row-model="rowModel"
          />
        </el-tab-pane> -->
        <el-tab-pane :key="'tenth'" :disabled="flages" :label="$t('ship.shipPropeller')" name="tenth">
          <shipPropeller
            ref="shipPropeller"
            :edit-status="dialogStatus"
            :edit-row-id="editRowId"
            :row-model="rowModel"
          />
        </el-tab-pane>
        <el-tab-pane :key="'shipTheoreticals'" :disabled="flages" :label="$t('ship.Theoretical')" name="shipTheoreticals">
        <shipTheoretical ref="shipTheoretical" v-if="dialogFormVisible"/>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <!--<el-switch-->
          <!--v-if="activeName !== 'first' && saveButtonIsDisabled && dialogStatus === 'update'"-->
          <!--v-model="createOrUpdate"-->
          <!--style="padding-right: 50px"-->
          <!--active-text="新增"-->
          <!--inactive-text="更新">-->
        <!--</el-switch>-->
        <el-button @click="dialogFormVisible = false">
          {{ $t('common.close') }}
        </el-button>
        <el-button v-if="saveButtonIsDisabled && flag" type="primary" @click="createData('update')">
          {{ $t('common.save') }}
        </el-button>
        <!-- <el-button
          v-if="saveButtonIsDisabled && dialogStatus === 'update' && activeName !== 'first' && flag"
          class="filter-item"
          style="margin-left: 10px;"
          size="mini"
          type="primary"
          @click="createData('updateAdd')"
        >
          {{ $t('common.add') }}
        </el-button> -->
        <el-button
          v-if="saveButtonIsDisabled && flag"
          class="filter-item"
          style="margin-left: 10px;"
          size="mini"
          type="primary"
          @click="resetForm"
        >
          {{ $t('common.add') }}
        </el-button>
        <el-button
          v-if="activeName !== 'first' && saveButtonIsDisabled  && flag"
          class="filter-item"
          type="danger"
          size="mini"
          style="margin-left: 10px;"
          @click="deleteEquipment"
        >
          {{ $t('common.delete') }}
        </el-button>
      </div>
    </el-dialog>
    <el-dialog
      v-el-drag-dialog
      :title="$t('ship.shipEditText')"
      :visible.sync="dialogSsmisFormVisible"
      :close-on-click-modal="false"
      custom-class="customwh"
      @dragDialog="this.$refs.select.blur()"
      width="80%"
      :append-to-body="true"
    >
      <div class="filter-container">
        <div style="display:inline-block;">
          <label class="radio-label" style="padding-left:0;">{{ $t('ship.searchOperator') }}</label>
          <el-input
            v-model="ssmisListQuery.docId"
            :placeholder="$t('common.inputRemind')"
            size="mini"
            style="width: 200px;"
            class="filter-item"
            @keyup.enter.native="handleFilter"
          />
          <label class="radio-label" style="padding-left:30px;">{{ $t('ship.imono') }}</label>
          <el-input
            v-model="ssmisListQuery.imo"
            :placeholder="$t('common.inputRemind')"
            size="mini"
            style="width: 200px;"
            class="filter-item"
            @keyup.enter.native="handleFilter"
          />
        </div>
        <div style="display:inline-block;">
          <el-button
            v-waves
            class="filter-item"
            type="primary"
            icon="el-icon-search"
            size="mini"
            style="margin-left:20px"
            @click="getSsmisList"
          >
            {{ $t('common.search') }}
          </el-button>
        </div>
        <div style="display:inline-block;">
          <el-button
            v-waves
            class="filter-item"
            type="primary"
            size="mini"
            style="margin-left:20px"
            @click="synData"
          >
            {{ $t('common.checkSsmis') }}
          </el-button>
        </div>
      </div>
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        v-adaptive="{bottomOffset: 38}"
        :data="ssmisList"
        border
        fit
        height="100px"
        highlight-current-row
        style="width: 100%; overflow:auto"
        :row-style="{height:'35px'}"
        :cell-style="{padding:'0'}"
        @sort-change="sortChange"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column :label="$t('ship.shipLangName')" min-width="150px" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.cspname }}/{{ row.spname }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ship.imono')" min-width="100px" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.imono }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ship.registNo')" min-width="100px" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.ccsno }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ship.shipFlag')" width="110px" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.flag }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ship.tableGross')" width="110px" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.dw }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ship.speed')" width="110px" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.speed }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ship.shipClass')" width="110px" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.shipClass }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('common.operate')"
          align="center"
          width="130"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{row}">
            <el-button size="mini" type="success" @click="ssmisHandleUpdate(row,'detail')">
              {{ $t('common.detail') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="ssmisTotal>0"
        style="margin:0px;padding:0px"
        :total="ssmisTotal"
        :page.sync="ssmisListQuery.currentPage"
        :limit.sync="ssmisListQuery.pageSize"
        @pagination="getSsmisList"
      />
      <el-dialog
        v-dialogDrag
        :title="$t('ship.shipEditText')"
        :visible.sync="dialogSsmisDetailFormVisible"
        :close-on-click-modal="false"
        custom-class="customwh"
        :append-to-body="true"
        width="80%"
      >
        <el-tabs
          v-model="ssmisActiveName"
          value="first"
          type="border-card"
          style="height:100%;overflow-y:auto;overflow-x:hidden;"
          @tab-click="handleClick"
        >
          <el-tab-pane :key="'first'" :label="$t('ship.shipInfo')" name="first">
            <SsmisShipInfo
              ref="SsmisShipInfo"
              :edit-status="dialogStatus"
              :edit-row-id="editRowId"
              :row-model="rowModel"
            />
          </el-tab-pane>
          <el-tab-pane :key="'second'" :label="$t('ship.shipMde')" name="second">
            <SsmisShipMde
              ref="SsmisShipMde"
              :edit-status="dialogStatus"
              :edit-row-id="editRowId"
              :row-model="rowModel"
            />
          </el-tab-pane>
          <el-tab-pane :key="'third'" :label="$t('ship.shipPM')" name="third">
            <SsmisShipPM
              ref="SsmisShipPM"
              :edit-status="dialogStatus"
              :edit-row-id="editRowId"
              :row-model="rowModel"
            />
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogSsmisDetailFormVisible = false">
            {{ $t('common.close') }}
          </el-button>
        </div>
      </el-dialog>
    </el-dialog>
    <ShipComPanySelect ref="ShipComPanySelect"/>
    <!--<div slot="footer" class="dialog-footer">-->
    <!--<el-button @click="dialogFormVisible = false">-->
    <!--{{ $t('common.close') }}-->
    <!--</el-button>-->
    <!--<el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">-->
    <!--{{ $t('common.save') }}-->
    <!--</el-button>-->
    <!--</div>-->
    <listentid :shipComPanyNamevicode="shipComPanyNamevicode" :nameImon="nameImon" @shipComPanyNameData="shipComPanyNameData" v-if="shipComPanyNamevicode"/>
    <record :record="recordVocode" @shiprecordData="shiprecordData" :nameImon="nameImon" v-if="recordVocode.dialog"/>
  </div>
</template>

<script>
import listentid from './components/list-entid'
import record from './components/list-record'
import { postFormData } from '@/api/requestPost'
import { getQueryPage } from '@/api/requestGet'
import waves from '@/directive/waves' // waves directive
import adaptive from '@/directive/el-table'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import SsmisShipInfo from './components/SsmisShipInfo'
import SsmisShipPM from './components/SsmisShipPM'
import SsmisShipMde from './components/SsmisShipMde'
import shipInfo from './components/shipInfo'
import shipPM from './components/shipPM'
import shipMde from './components/shipMde'
import shipBoiler from './components/shipBoiler'
import shipIncinerator from './components/shipIncinerator'
import shipInert from './components/shipInert'
import shipGasTurbines from './components/shipGasTurbines'
import shipGenerator from './components/shipGenerator'
import battery from './components/battery'
import shipMainProp from './components/shipMainProp'
import shipPropeller from './components/shipPropeller'
import elDragDialog from '@/directive/el-drag-dialog'
import ShipComPanySelect from  '@/components/ShipComPanySelect/index'
import shipTheoretical from './components/shipTheoretical'
import * as API from "@/api/requestGet";


import {mapActions} from 'vuex'

// const grossOptions = [
//   { key: '1', display_name: '0~2000' },
//   { key: '2', display_name: '2000~4000' },
//   { key: '3', display_name: '4000~6000' },
//   { key: '4', display_name: '6000~8000' },
//   { key: '5', display_name: '8000~10000' },
//   { key: '6', display_name: '10000~20000' }
// ]

// const shipTypeOptions = [
//   { key: '1', display_name: '散货船' },
//   { key: '2', display_name: '液货船' },
//   { key: '3', display_name: '气体运输船' },
//   { key: '4', display_name: '集装箱船' },
//   { key: '5', display_name: '滚装货船' },
//   { key: '6', display_name: '普通货船' }
// ]

// const shipSubTypeOptions = [
//   { key: '101', display_name: '灵便型' },
//   { key: '102', display_name: '巴拿马' },
//   { key: '103', display_name: '好望角' },
//   { key: '104', display_name: 'VLOC' },
//   { key: '105', display_name: '苏伊士' },
//   { key: '106', display_name: 'VLCC' }
// ]
// // arr to obj, such as { CN : "China", US : "USA" }
// const shipTypeKeyValue = shipTypeOptions.reduce((acc, cur) => {
//   acc[cur.key] = cur.display_name
//   return acc
// }, {})
// const shipSubTypeKeyValue = shipSubTypeOptions.reduce((acc, cur) => {
//   acc[cur.key] = cur.display_name
//   return acc
// }, {})
// const grossKeyValue = grossOptions.reduce((acc, cur) => {
//   acc[cur.key] = cur.display_name
//   return acc
// }, {})

export default {
  name: 'ShipList',
  components: {
    SsmisShipInfo,
    SsmisShipPM,
    SsmisShipMde,
    Pagination,
    shipInfo,
    shipPM,
    shipMde,
    shipBoiler,
    shipIncinerator,
    shipInert,
    shipGasTurbines,
    shipGenerator,
    battery,
    shipMainProp,
    shipPropeller,
    ShipComPanySelect,
    shipTheoretical,
    listentid,
    record
  },
  directives: { waves, adaptive, elDragDialog },
  filters: {
    grossFilter(gross) {
      return grossKeyValue[gross]
    },
    shipTypeFilter(gross) {
      return shipTypeKeyValue[gross]
    },
    shipSubTypeFilter(gross) {
      return shipSubTypeKeyValue[gross]
    }
  },
  data() {
    return {
      nameImon:{
        name: '',
        imono: '',
        id: ''
      },
      recordVocode:{
        dialog: false,
        id: ''
      },
      shipComPanyNamevicode: false,
      flag:true,
      createOrUpdate: false,
      createOrUpdateButtonLabel:false,
      dialogShipCompany: false,
      dialogSsmisDetailFormVisible: false,
      dialogSsmisFormVisible: false,
      docOptions: [],
      docValue: [],
      docList: [],
      loading:false,
      docLoading: false,
      docStates: [],
      oiMainEngineCount: 0,
      oiShipGeCount: 0,
      saveButtonIsDisabled: true,
      formIsDisabled: false,
      shipIds: [],
      multipleSelection: [],
      tableKey: 0,
      activeName: 'first',
      ssmisActiveName: 'first',
      shipId: '',
      flages: true,
      list: null,
      ssmisList: null,
      total: 0,
      ssmisTotal: 0,
      listLoading: true,
      dw: '',
      shipComPany:'',
      listQuery: {
        sptype: '',
        sptypeSub: '',
        currentPage: 1,
        pageSize: 20,
        shipComPanyName: '',
        shipKeyWord: '',
        startSpeed: '',
        endSpeed: '',
        sort: 'spname'
      },
      ssmisListQuery: {
        docId: '',
        imo: '',
        currentPage: 1,
        pageSize: 10

      },
      shipTypeOptions:[],
      shipSubTypeOptions:[],
      grossOptions:[],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      showReviewer: false,
      temp: {
        id: undefined,
        operator: '',
        shipKeyWord: '',
        startSpeed: 0,
        endSpeed: 0
      },
      oiShipInfo: {
        shipMde: [],
        shipPM: [],
        shipGenerator: [],
        shipBoiler: [],
        shipIncinerator: [],
        shipInert: [],
        shipGasTurbines: []
      },
      dialogFormVisible: false,
      dialogStatus: '',
      editRowId: '',
      rowModel: {},
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList();
    this.getmanu();
    this.getSituations();
    this.getShipTypeList();
    this.getShipSubTypeOptions();
    this.getfindDicGrossTonList()
  },
  methods: {
    ...mapActions("zidainma",["getmanu","getSituations"]),
     async getShipTypeList() {
      let res = await API.savefindShipTypeList();
      this.shipTypeOptions = res.data.data.items;
    },
    async getShipSubTypeOptions() {
      let res = await API.savefindShipSubList();
      this.shipSubTypeOptions = res.data.data.items;
    },

    async getfindDicGrossTonList() {
      let res = await API.savefindDicGrossTonList();
      let data  =  res.data.data.items
       data.sort(function(a,b) {
         return a.tonSmall-b.tonSmall
       })
       this.grossOptions=data
    },
    // 变更记录
    Changerecord() {
      if(this.nameImon.id){
        this.recordVocode.dialog = true
      }else {
        this.$message('必须选择一条数据才能查看变更记录');
      }
      
    },
    // 变更记录
    shiprecordData() {
      this.recordVocode.dialog = false
    },
    selectComPany(){
      this.$refs.ShipComPanySelect.handleCreateRelation()
      // this.$refs.ShipComPanySelect.dialogShipCompanyFormVisible = true
    },
    docRemoteMethod(query) {
      if (query !== '') {
        this.docLoading = true
        setTimeout(() => {
          this.docLoading = false
          this.docOptions = this.docList.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1
          })
        }, 200)
      } else {
        this.docOptions = []
      }
    },
    gotoSsmis() {
      // this.$router.push({path:'/ship',name:'ssmis'})
      this.dialogSsmisFormVisible = true
      this.ssmisList = []
    },
    resetCheckBox() {
      this.$refs.shipMde.engineIds = []
      this.$refs.shipPM.engineIds = []
      this.$refs.shipIncinerator.engineIds = []
      this.$refs.shipInert.engineIds = []
      this.$refs.shipBoiler.engineIds = []
    },
    getEngineId(attr) {
      var engineId = ''
      for (var i = 0; i < attr.length; i++) {
        engineId += attr[i] + ','
      }
      if (engineId.length > 0) {
        engineId = engineId.substr(0, engineId.length - 1)
      }
      return engineId
    },
    getEngineIds(str) {
      var attr = []
      if (str !== '' && str !== null) {
        attr = str.split(',')
      }
      return attr
    },
    deleteOishipByShipId(url, data) {
      postFormData(url, data).then(response => {

      })
    },
    handleClick() {
      if(this.activeName  == 'shipTheoreticals') {
        this.flag = false
      } else {
         this.flag = true
      }

      // if(this.activeName === 'second'){
      //   this.getEquipmentById('/shipManager/getShipMainEngine',{id:this.$refs.shipMde.oiMainEngineIds[0].id},this.$refs.shipMde.oiMainEngine)
      // }
    },
    addClick() {
      this.datas.dialogVisible = true
    },
    // flagdoc变更
    docflagchange() {
      if(this.nameImon.id){
        this.shipComPanyNamevicode = true
      }else {
        this.$message('必须选择一条数据才能进行变更');
      }
      
    },
    // 关闭 flagdoc变更
    shipComPanyNameData() {
       this.shipComPanyNamevicode = false
    },
    getSsmisList() {
      this.listLoading = true
      var url = '/shipManager/ssmisOishipInfoList'
      getQueryPage(url, this.ssmisListQuery).then(response => {
        this.ssmisList = response.data.data.items
        this.ssmisTotal = response.data.data.total
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5)
      })
    },
    synData() {
      if (confirm('确认是否同步船舶数据') === true) {
        if (this.shipIds.length === 0) {
          this.$notify({
            type: 'error',
            message: 'please select row',
            duration: 2000
          })
          return
        }
        postFormData('/shipManager/synSsmisShipInfo', { ccsnos: this.shipIds }).then(response => {
          if (response.data.result) {
            this.$notify({
              type: 'success',
              message: response.data.data,
              duration: 2000
            })
          } else {
            this.$notify({
              type: 'error',
              message: response.data.data,
              duration: 2000
            })
          }
        })
      }
    },
    getList() {
      this.listLoading = true
      var dw = '?&dw=' + this.dw.split('~')[0] + '&dw=' + this.dw.split('~')[1]
      var serviceSpeed = '?serviceSpeed=' + this.listQuery.startSpeed + '&serviceSpeed=' + this.listQuery.endSpeed
      var url = '/shipManager/shipList'
      if (this.dw !== '') {
        url = url + dw
      }
      if (this.listQuery.startSpeed !== '' && this.listQuery.endSpeed !== '') {
        url = url + serviceSpeed
      }
      getQueryPage(url, this.listQuery).then(response => {
        this.list = response.data.data.items
        this.total = response.data.data.total
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5)
      })
    },
    getEqiupmentIdAndXh(shipId) {
      var url = '/shipManager/getShipEqipment'
      getQueryPage(url, { shipId: shipId }).then(response => {
        if (response.data.data.mainEngineIds.length !== 0) {
          this.$refs.shipMde.oiMainEngineIds = response.data.data.mainEngineIds
        }
        if (response.data.data.shipGeIds.length !== 0) {
          this.$refs.shipPM.oiShipGeIds = response.data.data.shipGeIds
        }
        if (response.data.data.shipGeneratorIds.length !== 0) {
          this.$refs.shipGenerator.oiShipGeneratorIds = response.data.data.shipGeneratorIds
        }
        if (response.data.data.shipBoilerIds.length !== 0) {
          this.$refs.shipBoiler.oiShipBoilerIds = response.data.data.shipBoilerIds
        }
        if (response.data.data.incineratorIds.length !== 0) {
          this.$refs.shipIncinerator.oiShipIncineratorIds = response.data.data.incineratorIds
        }
        if (response.data.data.shipInert.length !== 0) {
          this.$refs.shipInert.oiShipInertIds = response.data.data.shipInert
        }
        if (response.data.data.shipTurbine.length !== 0) {
          this.$refs.shipGasTurbines.oiShipTurbineIds = response.data.data.shipTurbine
        }
        if (response.data.data.shipBatteryIds.length !== 0) {
          this.$refs.battery.oiShipBatteryIds = response.data.data.shipBatteryIds
        }
        if (response.data.data.oiShipPropellers.length !== 0) {
          this.$refs.shipPropeller.oiShipPropellers = response.data.data.oiShipPropellers
        }
      })
    },
    refreshEqiupmentIdAndXh(shipId) {
      var url = '/shipManager/getShipEqipment'
      getQueryPage(url, { shipId: shipId }).then(response => {
        if (response.data.data.mainEngineIds.length !== 0) {
          this.$refs.shipMde.oiMainEngineIds = response.data.data.mainEngineIds
        }
        if (response.data.data.shipGeIds.length !== 0) {
          this.$refs.shipPM.oiShipGeIds = response.data.data.shipGeIds
        }
        if (response.data.data.shipGeneratorIds.length !== 0) {
          this.$refs.shipGenerator.oiShipGeneratorIds = response.data.data.shipGeneratorIds
        }
        if (response.data.data.shipBoilerIds.length !== 0) {
          this.$refs.shipBoiler.oiShipBoilerIds = response.data.data.shipBoilerIds
        }
        if (response.data.data.incineratorIds.length !== 0) {
          this.$refs.shipIncinerator.oiShipIncineratorIds = response.data.data.incineratorIds
        }
        if (response.data.data.shipInert.length !== 0) {
          this.$refs.shipInert.oiShipInertIds = response.data.data.shipInert
        }
        if (response.data.data.shipTurbine.length !== 0) {
          this.$refs.shipGasTurbines.oiShipTurbineIds = response.data.data.shipTurbine
        }
        if (response.data.data.shipBatteryIds.length !== 0) {
          this.$refs.battery.oiShipBatteryIds = response.data.data.shipBatteryIds
        }
        if (response.data.data.oiShipPropellers.length !== 0) {
          this.$refs.shipPropeller.oiShipPropellers = response.data.data.oiShipPropellers
        }
      })
    },
    handleFilter() {
      this.shipComPany = ''
      this.listQuery = {
        sptype: '',
        sptypeSub: '',
        currentPage: 1,
        pageSize: 20,
        shipComPanyName: '',
        shipKeyWord: '',
        startSpeed: '',
        endSpeed: '',
        sort: 'spname'
      }
      this.getList()
    },
    handleModifyStatus(row, status) {
      if (status === 'deleted') {
        if (confirm('确定要删除？') === true) {
          this.handleDelete(row)
        }
      } else {
        this.$message({
          message: '操作Success',
          type: 'success'
        })
        row.status = status
      }
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    clearSearchTemp() {
      this.temp = {
        id: undefined,
        imono: '',
        registerno: '',
        spname: '',
        spnameCn: '',
        shipTypeCode: '',
        shipSubTypeCode: '',
        shipFlag: '',
        shipClass: ''
      }
    },
    getEquipmentById(url, equimentObject, getObject) {
      getQueryPage(url, equimentObject).then(response => {
        getObject = response.data.data
      })
    },
    handleCreate() {
      this.shipId = ''
      this.dialogStatus = 'create'
      this.saveButtonIsDisabled = true
      this.dialogFormVisible = true
      this.flages = true
      this.activeName = 'first'
      setTimeout(()=>{
      this.resetCheckBox()
      this.resetXhOptions()
      this.formDisabledIsFalse()
      this.$refs.shipInfo.CreateModel()
      this.$refs.shipMde.CreateModel()
      this.$refs.shipPM.CreateModel()
      this.$refs.shipBoiler.CreateModel()
      this.$refs.shipIncinerator.CreateModel()
      this.$refs.shipInert.CreateModel()
      this.$refs.shipGasTurbines.CreateModel()
      this.$refs.shipGenerator.CreateModel()
      this.$refs.battery.CreateModel()
      this.$refs.shipMainProp.CreateModel()
      this.$refs.shipPropeller.CreateModel()
      },0)


    },
    createData(updateAdd) {
      var formName = ''
      var url = ''
      var oiShipInfo = ''
      var shipFormObject = ''
      var attr = ''
      if (this.activeName !== 'first') {
        if (this.shipId === '') {
          this.$notify({
            message: 'ship not exsits',
            type: 'error',
            duration: 2000
          })
          return
        }
      }
      if (this.activeName === 'first') {
        formName = 'oiShipInfo'
        url = '/shipManager/createAndUpdateShip'
        oiShipInfo = this.$refs.shipInfo.oiShipInfo
        shipFormObject = this.$refs.shipInfo
      } else if (this.activeName === 'second') {
        var flag = true
        if (this.dialogStatus === 'create' || updateAdd === 'updateAdd') {
          if (this.$refs.shipMde.oiMainEngineIds.length >= 1) {
            //TODO: 国际化
            if (confirm('主机数量已有1台，确认是否继续添加') === true) {
              flag = true
            } else {
              flag = false
            }
          }
        }
        if (!flag) {
          return
        }
        formName = 'oiMainEngineForm'
        url = '/shipManager/createAndUpdateShipMainEngine'
        this.$refs.shipMde.oiMainEngine.shipId = this.shipId
        oiShipInfo = this.$refs.shipMde.oiMainEngine
        shipFormObject = this.$refs.shipMde
        attr = this.$refs.shipMde.engineIds
        oiShipInfo.energyId = this.getEngineId(attr)
      } else if (this.activeName === 'third') {
        var flagPm = true
        if (this.dialogStatus === 'create' || updateAdd === 'updateAdd') {
          if (this.$refs.shipPM.oiShipGeIds.length >= 3) {
            //TODO: 国际化
            if (confirm('副机数量已有3台，确认是否继续添加') === true) {
              flagPm = true
            } else {
              flagPm = false
            }
          }
        }
        if (!flagPm) {
          return
        }
        formName = 'oiShipGeForm'
        url = '/shipManager/createAndUpdateShipAuEnGine'
        this.$refs.shipPM.oiShipGe.shipId = this.shipId
        oiShipInfo = this.$refs.shipPM.oiShipGe
        shipFormObject = this.$refs.shipPM
        attr = this.$refs.shipPM.engineIds
        oiShipInfo.energyid = this.getEngineId(attr)
      } else if (this.activeName === 'eighth') {
        formName = 'shipGeneratorForm'
        url = '/shipManager/createAndUpdateShipGenerator'
        this.$refs.shipGenerator.oiShipGenerator.shipId = this.shipId
        oiShipInfo = this.$refs.shipGenerator.oiShipGenerator
        shipFormObject = this.$refs.shipGenerator
      } else if (this.activeName === 'fourth') {
        formName = 'shipBoilerForm'
        url = '/shipManager/createAndUpdateShipBolier'
        this.$refs.shipBoiler.oiShipBoiler.shipId = this.shipId
        oiShipInfo = this.$refs.shipBoiler.oiShipBoiler
        shipFormObject = this.$refs.shipBoiler
        attr = this.$refs.shipBoiler.engineIds
        oiShipInfo.energyId = this.getEngineId(attr)
      } else if (this.activeName === 'fifth') {
        formName = 'OiShipIncineratorForm'
        url = '/shipManager/createAndUpdateShipIncinerator'
        this.$refs.shipIncinerator.oiShipIncinerator.shipId = this.shipId
        oiShipInfo = this.$refs.shipIncinerator.oiShipIncinerator
        shipFormObject = this.$refs.shipIncinerator
        attr = this.$refs.shipIncinerator.engineIds
        oiShipInfo.energyId = this.getEngineId(attr)
      } else if (this.activeName === 'sixth') {
        formName = 'shipInertForm'
        url = '/shipManager/createAndUpdateShipInert'
        this.$refs.shipInert.oiShipInert.shipId = this.shipId
        oiShipInfo = this.$refs.shipInert.oiShipInert
        shipFormObject = this.$refs.shipInert
        attr = this.$refs.shipInert.engineIds
        oiShipInfo.energyid = this.getEngineId(attr)
      } else if (this.activeName === 'seventh') {
        formName = 'shipGasTurbinesForm'
        url = '/shipManager/createAndUpdateShipTurbine'
        this.$refs.shipGasTurbines.oiShipTurbine.shipId = this.shipId
        oiShipInfo = this.$refs.shipGasTurbines.oiShipTurbine
        shipFormObject = this.$refs.shipGasTurbines
      } else if (this.activeName === 'eleven') {
        formName = 'batteryForm'
        url = '/shipManager/createAndUpdateBattery'
        this.$refs.battery.oiShipBattery.shipId = this.shipId
        oiShipInfo = this.$refs.battery.oiShipBattery
        shipFormObject = this.$refs.battery
      }else if (this.activeName === 'tenth') {
        formName = 'shipPropellerForm'
        url = '/shipManager/createAndUpdatePropeller'
        this.$refs.shipPropeller.temp.shipId = this.shipId
        oiShipInfo = this.$refs.shipPropeller.temp
        shipFormObject = this.$refs.shipPropeller
      }
      var createOrUpdate = true
      if (this.dialogStatus === 'update' && updateAdd === 'updateAdd') {
        //TODO: 国际化
        if (confirm('此操作将新增一台设备，是否继续？') === true) {
          createOrUpdate = true
        } else {
          createOrUpdate = false
        }
        if(!createOrUpdate){
          return
        }
        oiShipInfo.id = ''
      }
      // //TODO: 更新操作，更新状态，没有选择到设备，自动默认为新增
      // if (this.dialogStatus === 'update' && updateAdd === 'update' && oiShipInfo.id === '') {
      //   this.$notify({
      //     message: '请选择要更新的设备，如没有设备请点击新增按钮增加设备',
      //     type: 'error',
      //     duration: 2000
      //   })
      //   return
      // }
      shipFormObject.$refs[formName].validate((valid) => {
        if (valid) {
          postFormData(url, oiShipInfo).then(response => {
            if (this.activeName === 'first') {
              if (this.dialogStatus === 'update') {
                for (const v of this.list) {
                  if (v.id === oiShipInfo.id) {
                    const index = this.list.indexOf(v)
                    this.list.splice(index, 1, oiShipInfo)
                    break
                  }
                }
              } else if (this.dialogStatus === 'create') {
                this.list.unshift(oiShipInfo)
              }
            }
            // this.dialogFormVisible = false
            if (response.data.result) {
              if (this.activeName === 'first') {
                this.shipId = response.data.data
                this.flages = false
              }
              this.$refs.shipTheoretical.shipId = this.shipId
              this.refreshEqiupmentIdAndXh(this.shipId)
              this.$notify({
                title: 'Success',
                message: 'Created Successfully',
                type: 'success',
                duration: 2000
              })
            } else {
              this.$notify({
                title: 'Failed',
                message: response.data.data,
                type: 'error',
                duration: 2000
              })
            }
          })
        }
      })
    },
    handleCurrentChange(val) {
      this.nameImon.name = val.spname+'/'+val.spnameCn
      this.nameImon.imono = val.imono
      this.nameImon.id = val.id
    },
    handleUpdate(row, buttonSattus) {
      this.oiShipInfo = row // copy obj
      this.dialogStatus = 'update'
      this.flages = false
      this.editRowId = this.oiShipInfo.id
      this.rowModel = this.oiShipInfo
      this.shipId = row.id
      this.dialogFormVisible = true
      setTimeout(() => {
        this.$refs.shipMde.resetTemp()
        this.$refs.shipPM.resetTemp()
        this.$refs.shipGenerator.resetTemp()
        this.$refs.shipInert.resetTemp()
        this.$refs.shipBoiler.resetTemp()
        this.$refs.shipIncinerator.resetTemp()
        this.$refs.shipGasTurbines.resetTemp()
        this.$refs.battery.resetTemp()
        this.$refs.battery.resetTemp()
        this.resetXhOptions()
        this.$refs.shipInfo.EditRowData(this.oiShipInfo)
        this.getEqiupmentIdAndXh(this.oiShipInfo.id)
        this.$refs.shipTheoretical.shipId = this.shipId
        if (buttonSattus === 'detail') {
          this.formDisabledIsTrue()
          this.saveButtonIsDisabled = false
          this.$refs.shipTheoretical.flag = false
        } else {
          this.saveButtonIsDisabled = true
          this.formDisabledIsFalse()
          this.$refs.shipTheoretical.flag = true
        }
      }, 500)
    },
    ssmisHandleUpdate(row, buttonSattus) {
      this.oiShipInfo = row // copy obj
      this.dialogSsmisDetailFormVisible = true
      setTimeout(() => {
        if (buttonSattus === 'detail') {
          this.$refs.SsmisShipInfo.formIsDisabled = true
          this.$refs.SsmisShipMde.formIsDisabled = true
          this.$refs.SsmisShipPM.formIsDisabled = true
          this.saveButtonIsDisabled = false
        } else {
          this.saveButtonIsDisabled = true
        }
        var oiShipGes = row.ssmisOiShipGeEntities
        var oiMainEngines = row.ssmisOiShipMainEngineEntities
        this.$refs.SsmisShipMde.oiMainEngines = oiMainEngines
        this.$refs.SsmisShipPM.oiShipGes = oiShipGes
        this.$refs.SsmisShipMde.oiMainEngineIds = []
        this.$refs.SsmisShipPM.oiShipGeIds = []
        var i = 0
        if (oiMainEngines.length > 0) {
          for (i = 1; i <= oiMainEngines.length; i++) {
            this.$refs.SsmisShipMde.oiMainEngineIds.push({ id: i, xh: i })
          }
          this.$refs.SsmisShipMde.oiMainEngine = oiMainEngines[0]
          this.$refs.SsmisShipMde.oiMainEngine.xh = 1
          this.$refs.SsmisShipMde.oiMainEngineId = 1
        }
        if (oiShipGes.length > 0) {
          for (i = 1; i <= oiShipGes.length; i++) {
            this.$refs.SsmisShipPM.oiShipGeIds.push({ id: i, xh: i })
          }
          this.$refs.SsmisShipPM.oiShipGe = oiShipGes[0]
          this.$refs.SsmisShipPM.oiShipGe.xh = 1
          this.$refs.SsmisShipPM.oiShipGeId = 1
        }
        this.$refs.SsmisShipInfo.EditRowData(this.oiShipInfo)
        if (buttonSattus === 'detail') {
          this.formDisabledIsTrue()
          this.saveButtonIsDisabled = false
        } else {
          this.saveButtonIsDisabled = true
          this.formDisabledIsFalse()
        }
      }, 100)
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          var url = '/ship/update'
          postFormData(url, tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
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
    handleDelete(row) {
      this.deleteOishipByShipId('/shipManager/deleteShip', { shipIds: [{ id: row.id }] })
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    handleRemove(row) {
      if (confirm('确定要将此船舶从列表中移除？') === true) {
        getQueryPage('/shipManager/notMyCompanyShip', { shipId: row.id }).then(response => {
          if (response.data.result) {
            this.$notify({
              message: response.data.data,
              type: 'success',
              duration: 2000
            })
            const index = this.list.indexOf(row)
            this.list.splice(index, 1)
          } else {
            this.$notify({
              message: response.data.data,
              type: 'error',
              duration: 2000
            })
          }
        })
      }
    },
    // onTableSelect(rows, row) {
    //   let selected = rows.length && rows.indexOf(row) !== -1
    //   alert(selected)
    // },
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.shipIds = this.multipleSelection
    },
    batchDeleteOiShipInfo() {
      if (this.shipIds.length === 0) {
        this.$notify({
          message: '请选择要删除的船舶 ',
          type: 'info',
          duration: 2000
        })
        return
      }
      if (confirm('确定要批量删除船舶？') === true) {
        postFormData('/shipManager/deleteShip', { shipIds: this.shipIds }).then(response => {
          if (response.data.result) {
            for (const item of this.shipIds) {
              const index = this.list.indexOf(item)
              this.list.splice(index, 1)
            }
            this.$notify({
              message: response.data.data,
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              message: response.data.data,
              type: 'error',
              duration: 2000
            })
          }
        })
      }
    },
    formDisabledIsFalse() {
      this.$refs.shipInfo.formIsDisabled = false
      this.$refs.shipMde.formIsDisabled = false
      this.$refs.shipPM.formIsDisabled = false
      this.$refs.shipBoiler.formIsDisabled = false
      this.$refs.shipIncinerator.formIsDisabled = false
      this.$refs.shipInert.formIsDisabled = false
      this.$refs.shipGasTurbines.formIsDisabled = false
      this.$refs.shipGenerator.formIsDisabled = false
      this.$refs.battery.formIsDisabled = false
      this.$refs.shipPropeller.formIsDisabled = false
    },
    formDisabledIsTrue() {
      this.$refs.shipInfo.formIsDisabled = true
      this.$refs.shipMde.formIsDisabled = true
      this.$refs.shipPM.formIsDisabled = true
      this.$refs.shipBoiler.formIsDisabled = true
      this.$refs.shipIncinerator.formIsDisabled = true
      this.$refs.shipInert.formIsDisabled = true
      this.$refs.shipGasTurbines.formIsDisabled = true
      this.$refs.shipGenerator.formIsDisabled = true
      this.$refs.battery.formIsDisabled = true
      this.$refs.shipPropeller.formIsDisabled = true
    },
    resetXhOptions() {
      this.$refs.shipMde.oiMainEngineIds = []
      this.$refs.shipMde.oiMainEngineId = ''
      this.$refs.shipPM.oiShipGeIds = []
      this.$refs.shipPM.oiShipGeId = ''
      this.$refs.shipGenerator.oiShipGeneratorIds = []
      this.$refs.shipGenerator.oiShipGeneratorId = ''
      this.$refs.shipBoiler.oiShipBoilerIds = []
      this.$refs.shipBoiler.oiShipBoilerId = ''
      this.$refs.shipIncinerator.oiShipIncineratorIds = []
      this.$refs.shipIncinerator.oiShipIncineratorId = ''
      this.$refs.shipInert.oiShipInertIds = []
      this.$refs.shipInert.oiShipInertId = ''
      this.$refs.shipGasTurbines.oiShipTurbineIds = []
      this.$refs.shipGasTurbines.oiShipTurbineId = ''
      this.$refs.battery.oiShipBatteryIds = []
      this.$refs.battery.oiShipBatteryId = ''
      this.$refs.shipPropeller.oiShipPropellers = []
      this.$refs.shipPropeller.oiShipBoilerId = ''
    },
    resetForm() {
      var id = ''
      if (this.activeName === 'first') {
        id = this.$refs.shipInfo.oiShipInfo.id
        this.$refs.shipInfo.resetForm()
        if (this.dialogStatus === 'update') {
          this.$refs.shipInfo.oiShipInfo.id = id
        }
      } else if (this.activeName === 'second') {
        // id = this.$refs.shipMde.oiMainEngine.id
        this.$refs.shipMde.resetTemp()
        // if (this.dialogStatus === 'update') {
        this.$refs.shipMde.oiMainEngine.id = ''
        // }
      } else if (this.activeName === 'third') {
        // id = this.$refs.shipPM.oiShipGe.id
        this.$refs.shipPM.resetTemp()
        // if (this.dialogStatus === 'update') {
        this.$refs.shipPM.oiShipGe.id = ''
        // }
      } else if (this.activeName === 'eighth') {
        // id = this.$refs.shipGenerator.oiShipGenerator.id
        this.$refs.shipGenerator.resetTemp()
        // if (this.dialogStatus === 'update') {
        this.$refs.shipGenerator.oiShipGenerator.id = id
        // }
      } else if (this.activeName === 'fourth') {
        // id = this.$refs.shipBoiler.oiShipBoiler.id
        this.$refs.shipBoiler.resetTemp()
        // if (this.dialogStatus === 'update') {
        this.$refs.shipBoiler.oiShipBoiler.id = ''
        // }
      } else if (this.activeName === 'fifth') {
        // id = this.$refs.shipIncinerator.oiShipIncinerator.id
        this.$refs.shipIncinerator.resetTemp()
        // if (this.dialogStatus === 'update') {
        this.$refs.shipIncinerator.oiShipIncinerator.id = ''
        // }
      } else if (this.activeName === 'sixth') {
        // id = this.$refs.shipInert.oiShipInert.id
        this.$refs.shipInert.resetTemp()
        // if (this.dialogStatus === 'update') {
        this.$refs.shipInert.oiShipInert.id = ''
        // }
      } else if (this.activeName === 'seventh') {
        // id = this.$refs.shipGasTurbines.oiShipTurbine.id
        this.$refs.shipGasTurbines.resetTemp()
        // if (this.dialogStatus === 'update') {
        this.$refs.shipGasTurbines.oiShipTurbine.id = ''
        // }
      } else if (this.activeName === 'eleven') {
        // id = this.$refs.battery.oiShipBatteryId.id
        this.$refs.battery.resetTemp()
        // if (this.dialogStatus === 'update') {
        this.$refs.shipGasTurbines.oiShipTurbine.id = ''
        // }
      } else if (this.activeName === 'tenth') {
        // id = this.$refs.shipPropeller.temp.id
        this.$refs.shipPropeller.resetTemp()
        // if (this.dialogStatus === 'update') {
        this.$refs.shipPropeller.temp.id = ''
        // }
      }
    },
    deleteEquipment() {
      if (confirm('确认是否删除设备') === true) {
        var url = ''
        var oiShipInfo = ''
        var equipmentids = ''
        if (this.activeName === 'second') {
          url = '/shipManager/deleteMainEngine'
          oiShipInfo = { id: this.$refs.shipMde.oiMainEngineId }
          equipmentids = this.$refs.shipMde.oiMainEngineIds
        } else if (this.activeName === 'third') {
          url = '/shipManager/deleteShipAuEngine'
          oiShipInfo = { id: this.$refs.shipPM.oiShipGeId }
          equipmentids = this.$refs.shipPM.oiShipGeIds
        } else if (this.activeName === 'eighth') {
          url = '/shipManager/deleteShipGenerator'
          oiShipInfo = { id: this.$refs.shipGenerator.oiShipGeneratorId }
          equipmentids = this.$refs.shipGenerator.oiShipGeneratorIds
        } else if (this.activeName === 'fourth') {
          url = '/shipManager/deleteShipBoiler'
          oiShipInfo = { id: this.$refs.shipBoiler.oiShipBoilerId }
          equipmentids = this.$refs.shipBoiler.oiShipBoilerIds
        } else if (this.activeName === 'fifth') {
          url = '/shipManager/deleteShipIncinerator'
          oiShipInfo = { id: this.$refs.shipIncinerator.oiShipIncineratorId }
          equipmentids = this.$refs.shipIncinerator.oiShipIncineratorIds
        } else if (this.activeName === 'sixth') {
          url = '/shipManager/deleteShipInert'
          oiShipInfo = { id: this.$refs.shipInert.oiShipInertId }
          equipmentids = this.$refs.shipInert.oiShipInertIds
        } else if (this.activeName === 'seventh') {
          url = '/shipManager/deleteShipTurbine'
          oiShipInfo = { id: this.$refs.shipGasTurbines.oiShipTurbineId }
          equipmentids = this.$refs.shipGasTurbines.oiShipTurbineIds
        } else if (this.activeName === 'eleven') {
          url = '/shipManager/deleteOiShipBattery'
          oiShipInfo = { id: this.$refs.battery.oiShipBatteryId }
          equipmentids = this.$refs.battery.oiShipBatteryIds
        }
        else if (this.activeName === 'tenth') {
          url = '/shipManager/deleteOiShipPropeller'
          oiShipInfo = { id: this.$refs.shipPropeller.oiShipBoilerId }
          equipmentids = this.$refs.shipPropeller.oiShipPropellers
        }
        postFormData(url, oiShipInfo).then(response => {
          if (response.data.result) {
            for (const v of equipmentids) {
              if (v.id === oiShipInfo.id) {
                const index = equipmentids.indexOf(v)
                equipmentids.splice(index, 1)
              }
            }
            if (this.activeName === 'second') {
              this.$refs.shipMde.oiMainEngineId = ''
              this.$refs.shipMde.resetTemp()
            } else if (this.activeName === 'third') {
              this.$refs.shipPM.oiShipGeId = ''
              this.$refs.shipPM.resetTemp()
            } else if (this.activeName === 'eighth') {
              this.$refs.shipGenerator.oiShipGeneratorId = ''
              this.$refs.shipGenerator.resetTemp()
            } else if (this.activeName === 'fourth') {
              this.$refs.shipBoiler.oiShipBoilerId = ''
              this.$refs.shipBoiler.resetTemp()
            } else if (this.activeName === 'fifth') {
              this.$refs.shipIncinerator.oiShipIncineratorId = ''
              this.$refs.shipIncinerator.resetTemp()
            } else if (this.activeName === 'sixth') {
              this.$refs.shipInert.oiShipInertId = ''
              this.$refs.shipInert.resetTemp()
            } else if (this.activeName === 'seventh') {
              this.$refs.shipGasTurbines.oiShipTurbineId = ''
              this.$refs.shipGasTurbines.resetTemp()
            } else if (this.activeName === 'eleven') {
              this.$refs.battery.oiShipBatteryId = ''
              this.$refs.battery.resetTemp()
            }
            this.$notify({
              message: response.data.data,
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              message: 'delete failed',
              type: 'error',
              duration: 2000
            })
          }
        })
      } else {
        // wuyong
      }
    }
  }
}

</script>

<style scoped>
  .radio-label {
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 30px;
  }



</style>
