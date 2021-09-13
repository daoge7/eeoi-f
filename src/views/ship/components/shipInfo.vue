<template xmlns:el-col="http://www.w3.org/1999/html">
  <div style="padding:15px 0">
    <el-form
      id="uploadForm"
      ref="oiShipInfo"
      :rules="shipInfoRules"
      :model="oiShipInfo"
      label-position="left"
      label-width="100px"
      style="width:100%"
    >
      <el-row>
        <el-col :span="6">
          <el-form-item :label="$t('ship.imono')" prop="imono">
            <el-input
              v-model="oiShipInfo.imono"
              :placeholder="$t('common.inputRemind')"
              :readonly="this.formIsDisabled"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('ship.registNo')" prop="registerno">
            <el-input
              v-model="oiShipInfo.registerno"
              :placeholder="$t('common.inputRemind')"
              :readonly="this.formIsDisabled"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('ship.shipNameCn')" prop="spnameCn">
            <el-input
              v-model="oiShipInfo.spnameCn"
              :placeholder="$t('common.inputRemind')"
              :readonly="this.formIsDisabled"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('ship.shipName')" prop="spname">
            <el-input
              v-model="oiShipInfo.spname"
              :placeholder="$t('common.inputRemind')"
              :readonly="this.formIsDisabled"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item :label="$t('ship.ccsNo')">
            <el-input
              v-model="oiShipInfo.ccsno"
              :placeholder="$t('common.inputRemind')"
              :readonly="this.formIsDisabled"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('ship.shipClass')">
            <el-select
              v-model="oiShipInfo.class_"
              class="filter-item"
              :placeholder="$t('common.selectRemind')"
              style="width:100%"
            >
              <el-option
                v-for="item in shipClassOptions"
                :key="item.id"
                :label="item.abbrn"
                :value="item.abbrn"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item ref="flagCode" :label="$t('ship.shipFlag')" prop="flagCode">
            <el-select
              v-model="oiShipInfo.flagCode"
              class="filter-item"
              :placeholder="$t('common.selectRemind')"
              style="width:100%"
              filterable
            >
              <el-option
                v-for="item in shipFlagOptions"
                :key="item.threeCode"
                :label="item.enBrief"
                :value="item.threeCode"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">

          <el-form-item :label="$t('ship.shipHomePort')">
            <el-input
              v-model="oiShipInfo.homePort"
              :placeholder="$t('common.selectRemind')"
              :readonly="this.formIsDisabled"
            >
              <i slot="suffix" style="color:red">
                <el-button
                  plain
                  style="border：none "
                  @click="toogle(true)"
                  v-text="$t('common.select')"
                />
              </i>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <pertSelect :bool="bool" />
      <el-row>
        <el-col :span="6">
          <el-form-item :label="$t('ship.shipType')" prop="sptype">
            <el-select
              v-model="oiShipInfo.sptype"
              class="filter-item"
              filterable
              :placeholder="$t('common.selectRemind')"
              style="width:100%"
              @change="sptypeSub"
            >
              <el-option
                v-for="item in shipTypeOptions"
                :key="item.id"
                :label="item.csptype"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('ship.shipSubType')">
            <el-select
              v-model="oiShipInfo.sptypeSub"
              class="filter-item"
              :placeholder="$t('common.selectRemind')"
              style="width:100%"
            >
              <el-option
                v-for="item in shipSubTypeOptions"
                :key="item.id"
                :label="item.subName"
                :value="item.subCode"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('ship.designSpeed')" prop="speed">
            <el-input
              v-model="oiShipInfo.speed"
              :placeholder="$t('common.inputRemind')"
              :readonly="this.formIsDisabled"
              type="number"
            >
              <i slot="suffix" style="color:red">Kn</i>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('ship.speed')" prop="serviceSpeed">
            <el-input
              v-model="oiShipInfo.serviceSpeed"
              :placeholder="$t('common.inputRemind')"
              :readonly="this.formIsDisabled"
              type="number"
            >
              <i slot="suffix" style="color:red">Kn</i>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="oiShipInfo.sptype === '14'">
        <el-form-item :label="$t('ship.sptypeOther')" prop="sptypeOther">
          <el-input
            v-model="oiShipInfo.sptypeOther"
            type="textarea"
            :placeholder="$t('common.inputRemind')"
            :readonly="this.formIsDisabled"
          />
        </el-form-item>
      </el-row>
      <el-row>
        <el-col :span="5">
          <el-form-item :label="$t('ship.gross')" prop="gross">
            <el-input
              v-model="oiShipInfo.gross"
              type="number"
              :placeholder="$t('common.inputRemind')"
              :readonly="this.formIsDisabled"
              class="el_input"
            >
              <i slot="suffix" style="color:red">T</i>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item :label="$t('ship.dwt')" prop="dw">
            <el-input
              v-model="oiShipInfo.dw"
              type="number"
              :placeholder="$t('common.inputRemind')"
              :readonly="this.formIsDisabled"
              class="el_input"
            >
              <i slot="suffix" style="color:red">T</i>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item :label="$t('ship.net')" prop="net">
            <el-input
              v-model="oiShipInfo.net"
              type="number"
              oninput="value=value.replace(/[^\d]/g,'')"
              :placeholder="$t('common.inputRemind')"
              :readonly="this.formIsDisabled"
              class="el_input"
            >
              <i slot="suffix" style="color:red">T</i>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item :label="$t('ship.passengers')">
            <el-input
              v-model="oiShipInfo.passengers"
              oninput="value=value.replace(/[^\d]/g,'')"
              :placeholder="$t('common.inputRemind')"
              :readonly="this.formIsDisabled"
              class="el_input"
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('ship.cars')">
            <el-input
              v-model="oiShipInfo.cars"
              oninput="value=value.replace(/[^\d]/g,'')"
              :placeholder="$t('common.inputRemind')"
              :readonly="this.formIsDisabled"
              class="el_input"
            />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item :label="$t('ship.teu')">
            <el-input
              v-model="oiShipInfo.teus"
              oninput="value=value.replace(/[^\d]/g,'')"
              :placeholder="$t('common.inputRemind')"
              :readonly="this.formIsDisabled"
              class="el_input"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider />
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('ship.builder')">
            <el-input
              v-model="oiShipInfo.builder"
              :placeholder="$t('common.inputRemind')"
              :readonly="this.formIsDisabled"
            >
              <i slot="suffix" style="color:red">
                <el-button
                  plain
                  style="border:none"
                  @click="handleCreateRelation('builder')"
                  v-text="$t('common.select')"
                />
              </i>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('ship.owner')">
            <el-input
              v-model="oiShipInfo.owner"
              :placeholder="$t('common.inputRemind')"
              :readonly="this.formIsDisabled"
            >
              <i slot="suffix" style="color:red">
                <el-button
                  plain
                  style="border:none"
                  @click="handleCreateRelation('owner')"
                  v-text="$t('common.select')"
                />
              </i>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('ship.operator')">
            <el-input
              v-model="oiShipInfo.operatorShip"
              :placeholder="$t('common.selectRemind')"
              :readonly="true"
            >
              <i slot="suffix" style="color:red">
                <el-button
                  plain
                  style="border:none"
                  @click="handleCreateRelation('operator')"
                  v-text="$t('common.select')"
                />
              </i>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('ship.ownerAddress')">
            <el-input
              v-model="oiShipInfo.ownerAddr"
              :placeholder="$t('common.inputRemind')"
              :readonly="this.formIsDisabled"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item ref="docmanagerData" :label="$t('ship.manager')" prop="docmanager">
            <el-input
              v-model="oiShipInfo.docmanager"
              :placeholder="$t('common.selectRemind')"
              :readonly="true"
            >
              <i slot="suffix" style="color:red">
                <el-button
                  plain
                  style="border:none"
                  @click="handleCreateRelation('docmanager')"
                  v-text="$t('common.select')"
                />
              </i>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('ship.manaInst')">
            <el-input
              v-model="oiShipInfo.clientName"
              :placeholder="$t('common.selectRemind')"
              :readonly="true"
            >
              <i slot="suffix" style="color:red">
                <el-button
                  plain
                  style="border:none"
                  @click="handleCreateRelation('client')"
                  v-text="$t('common.select')"
                />
              </i>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item :label="$t('ship.mrvContacts')">
            <el-input
              v-model="oiShipInfo.title"
              :placeholder="$t('common.inputRemind')"
              :readonly="this.formIsDisabled"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('ship.mrvPost')">
            <el-input
              v-model="oiShipInfo.jobtitle"
              :placeholder="$t('common.inputRemind')"
              :readonly="this.formIsDisabled"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('ship.mrvPhone')">
            <el-input
              v-model="oiShipInfo.telephone"
              :placeholder="$t('common.inputRemind')"
              :readonly="this.formIsDisabled"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('ship.mrvEmail')">
            <el-input
              v-model="oiShipInfo.email"
              :placeholder="$t('common.inputRemind')"
              :readonly="this.formIsDisabled"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider style="padding: 0px 0px 0px 0px;" />
      <el-row>
        <el-col :span="8">
          <el-form-item :label="$t('ship.finishDate')">
            <el-date-picker
              v-model="oiShipInfo.finish"
              :editable="true"
              type="date"
              align="left"
              :placeholder="$t('common.datePickerRemind')"
              style="width:100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('ship.contractDate')">
            <el-date-picker
              v-model="oiShipInfo.buildContractTm"
              :editable="true"
              type="date"
              align="left"
              :placeholder="$t('common.datePickerRemind')"
              style="width:100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('ship.lastwuDate')">
            <el-date-picker
              v-model="oiShipInfo.lastwu"
              :editable="true"
              type="date"
              align="left"
              :placeholder="$t('common.datePickerRemind')"
              style="width:100%"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item :label="$t('ship.iceCode')">
            <el-input
              v-model="oiShipInfo.ice"
              :placeholder="$t('common.inputRemind')"
              :readonly="this.formIsDisabled"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('ship.manageType')">
            <el-select
              v-model="oiShipInfo.operateType"
              class="filter-item"
              :placeholder="$t('common.selectRemind')"
              style="width:100%"
            >
              <el-option
                v-for="item in manageOptions"
                :key="item.key"
                :label="item.display_name"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="燃油检测方法">
            <el-select
              v-model="oiShipInfo.consMethod"
              class="filter-item"
              :placeholder="$t('common.selectRemind')"
              style="width:100%"
            >
              <el-option
                v-for="item in manageOptionsadd"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item :label="$t('ship.eedi')">
            <el-input
              v-model="oiShipInfo.eedivalue"
              :placeholder="$t('common.inputRemind')"
              :readonly="this.formIsDisabled"
              type="number"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('ship.eediImp')">
            <el-input
              v-model="oiShipInfo.eedi"
              :placeholder="$t('common.inputRemind')"
              :readonly="this.formIsDisabled"
              type="number"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('ship.eiv')">
            <el-input
              v-model="oiShipInfo.eiv"
              :placeholder="$t('common.inputRemind')"
              :readonly="this.formIsDisabled"
              type="number"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <!--1111111111111111111-->
      <el-form-item :label="$t('ship.fuelId')" prop="fuelIds">
        <el-button type="primary" :disabled="this.formIsDisabled" @click="shipTypes">{{ $t('common.select') }}</el-button>
        <div v-if="oiShipInfo.shipEquipmentFuelMaps !== undefined && oiShipInfo.shipEquipmentFuelMaps.length" style="width:100%;height:auto;border:1px #ccc solid;margin-top:10px;padding:0 15px;">
          <el-row>
            <el-col v-for="(item, index) in oiShipInfo.shipEquipmentFuelMaps" :key="index" :span="12">
              <span>{{ $t('ship.fuel') }}:{{ item.fuelName }}</span>
              <span v-if="item.consMethod === '1'">{{ $t('ship.method1') }}</span>
              <span v-if="item.consMethod === '2'">{{ $t('ship.method2') }}</span>
              <span v-if="item.consMethod === '3'">{{ $t('ship.method3') }}</span>
            </el-col>
          </el-row>
        </div>
        <!-- <el-checkbox-group v-model="oiShipInfo.fuelIds">
          <el-checkbox
            v-for="(item,ind) in list"
            :key="ind"
            :label="item.fuelCode"
            style="width:350px;"

          >
          <div> -->
        <!-- <p style="width:150px;display: inline-block;">{{item.fuelName}}</p> -->
        <!-- <el-select v-model="item.consMethod" placeholder="请选择" style="width:55%;">
         <el-option
         v-for="item in consMethodArray"
         :key="item.value"
         :label="item.label"
         :value="item.value">
         </el-option>
         </el-select> -->
        <!-- </div>
        </el-checkbox>
        </el-checkbox-group> -->
      </el-form-item>
      <el-form-item :label="$t('ship.remark')">
        <el-input
          v-model="oiShipInfo.remark"
          :autosize="{ minRows: 2, maxRows: 4}"
          type="textarea"
          :placeholder="$t('common.inputRemind')"
          :readonly="this.formIsDisabled"
        />
      </el-form-item>
      <!--<el-form-item style="text-align: center">-->
      <!--<el-button type="primary" @click="createOIShipInfo('oiShipInfo')">保存</el-button>-->
      <!--<el-button @click="resetForm('oiShipInfo')">重置</el-button>-->
      <!--</el-form-item>-->
    </el-form>
    <el-dialog
      v-el-drag-dialog
      :title="$t('ship.Listofshippingcompanies')"
      :visible.sync="dialogShipCompanyFormVisible"
      :close-on-click-modal="false"
      :append-to-body="true"
      width="80%"
    >
      <div class="filter-container">
        <div style="display:inline-block;">
          <label class="radio-label" style="padding-left:0;">{{ $t('ship.companyNameCNEN') }}</label>
          <el-input
            v-model="listShipCompanyQuery.nameCn"
            :placeholder="$t('common.keyWord')"
            style="width: 200px;"
            class="filter-item"
            @keyup.enter.native="handleShipCompanyFilter"
          />
          <label class="radio-label" style="padding-left:0;">{{ $t('common.Companycode') }}</label>
          <el-input
            v-model="listShipCompanyQuery.ccsCode"
            :placeholder="$t('common.Companycode')"
            style="width: 200px;"
            class="filter-item"
            @keyup.enter.native="handleShipCompanyFilter"
          />
          <el-button
            v-waves
            class="filter-item"
            type="primary"
            icon="el-icon-search"
            style="margin-left:20px"
            @click="handleShipCompanyFilter"
          >{{ $t('MRV.query') }}</el-button>
          <el-button
            v-waves
            class="filter-item"
            type="primary"
            icon="el-icon-setting"
            @click="handleShipCompanyReset"
          >{{ $t('common.reset') }}</el-button>
        </div>
      </div>
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        v-adaptive="{bottomOffset: 38}"
        :data="shipCompanylist"
        border
        fit
        height="100px"
        highlight-current-row
        style="width:100%;overflow:auto"
        :row-style="{height:'35px'}"
        :cell-style="{padding:'0'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column :label="$t('common.no')" type="index" show-overflow-tooltip width="50" align="center" />
        <el-table-column :label="$t('common.corporatename')" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.nameCn+row.nameEn }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('common.Companycode')" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.ccsCode }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('common.CompanyIACScode')" align="left" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.iacs }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogShipCompanyFormVisible = false">{{ $t('common.close') }}</el-button>
        <el-button type="primary" @click="saveOwnerInfo">{{ $t('common.save') }}</el-button>
      </div>
      <pagination
        v-show="total2>0"
        style="margin:0px;padding:0px"
        :total="total2"
        :page.sync="listShipCompanyQuery.pageNum"
        :limit.sync="listShipCompanyQuery.pageSize"
        @pagination="getShipCompanyList"
      />
    </el-dialog>
    <pertSelect ref="pertSelect" @savetion="onWathers" />
    <shipType v-if="shipComPanyNamevicode" :ship-com-pany-namevicode="shipComPanyNamevicode" :list-data="oiShipInfo.shipEquipmentFuelMaps" @shipComPanyNameDatas="shipComPanyNameDatas" @shipComPanyNameData="shipComPanyNameData" />
  </div>
</template>
<!--<el-button type="primary" @click="createOIShipInfo('oiShipInfo')">保存</el-button>-->
<!--<el-button @click="resetForm('oiShipInfo')">重置</el-button>-->

<script>
import { userShipCompanyList } from '../../../api/sysManage'
import { findShipSubByShipType } from '@/api/requestGet'
import Pagination from '@/components/Pagination'
import waves from '@/directive/waves' // waves directive
import adaptive from '@/directive/el-table'
import elDragDialog from '@/directive/el-drag-dialog'
import shipType from './shipType-dalog'
import indexs from '@/mixin'
import * as API from '@/api/requestGet'
import pertSelect from '@/components/ShipComPanySelect/portSelect-dalog'

const companyOptions = []

const shipClassOptions = []

const homePortOptions = []
export default {
  name: 'ShipInfo',
  components: { Pagination, pertSelect, shipType },
  directives: { waves, adaptive, elDragDialog },
  mixins: [indexs],
  props: {
    editStatus: {
      type: String,
      default: ''
    },
    editRowId: {
      type: String,
      default: ''
    },
    rowModel: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    var validateImoAndRegisterNo = (rule, value, callback) => {
      if (value === '') {
        if (this.oiShipInfo.imono === '') {
          callback(new Error('IMO NO.、船舶识别号必填其一'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    return {
      engineIds: [],
      codesc: [
        {
          item: ''
        }
      ],
      cones: [{
        code: '1',
        name: '甲乙',
        consMethod: ''
      }],
      shipComPanyNamevicode: false,
      consMethodArray: [
        {
          value: '1',
          label: '使用燃油交付单的方法'
        }, {
          value: '2',
          label: '使用流量计的方法'
        }, {
          value: '3',
          label: '使用燃油舱柜监测的方法'
        }
      ],
      shipTypeList: [],
      bool: false,
      manageOptions: [],
      manageOptionsadd: [
        {
          value: '方法A',
          label: '方法A'
        }, {
          value: '方法B',
          label: '方法B'
        }, {
          value: '方法C',
          label: '方法C'
        }, {
          value: '方法D',
          label: '方法D'
        }
      ],
      // 船公司
      listLoading: true,
      label: '',
      total2: 0,
      shipCompanylist: [],
      tableChecked: [],
      tableKey: 0,
      dialogShipCompanyFormVisible: false,
      listShipCompanyQuery: {
        pageNum: 1,
        pageSize: 20,
        nameCn: '',
        nameEn: '',
        ccsCode: ''
      },
      //
      docOptions: [],
      operateOptions: [],
      ownerOptions: [],
      clientOptions: [],
      builderOptions: [],
      docValue: [],
      docList: [],
      docLoading: false,
      docStates: [],
      operateValue: [],
      operateList: [],
      operateLoading: false,
      operateStates: [],
      ownerValue: [],
      ownerList: [],
      ownerLoading: false,
      ownerStates: [],
      clientValue: [],
      clientList: [],
      clientLoading: false,
      clientStates: [],
      builderValue: [],
      builderList: [],
      builderLoading: false,
      builderStates: [],
      companyOptions,
      shipTypeOptions: [],
      shipSubTypeOptions: [],
      shipClassOptions,
      shipFlagOptions: [],
      homePortOptions,
      dialogFormVisible: false,
      formIsDisabled: false,
      oiShipInfo: {
        consMethod: '',
        operatorShip: '',
        owner: '',
        id: undefined,
        fuelIds: [],
        ownerAddr: '',
        imono: '',
        registerno: '',
        spname: '',
        spnameCn: '',
        flagCode: '',
        homePort: '',
        builderId: '',
        builderName: '',
        ownerId: '',
        ownerName: '',
        operatorId: '',
        operatorName: '',
        docId: '',
        docName: '',
        docmanager: '',
        title: '',
        jobtitle: '',
        telephone: '',
        email: '',
        class_: '',
        sptype: '',
        sptypeSub: '',
        sptypeOther: '',
        serviceSpeed: '',
        gross: '',
        dw: '',
        net: '',
        finish: '',
        passengers: '',
        cars: '',
        buildContractTm: '',
        teus: '',
        ice: '',
        lastwu: '',
        operateType: '',
        consMethod: '',
        eedi: '',
        eedivalue: '',
        eeoi: '',
        eiv: '',
        remark: '',
        clientId: [],
        clientName: '',
        oiShipCmsaMaps: [],
        shipEquipmentFuelMaps: [],
        ccsno: ''
      },
      shipInfoRules: {
        // spnameCn: [
        //   {
        //     required: true,
        //     message: this.$t('common.inputRequired'),
        //     trigger: 'blur'
        //   }
        // ],
        spname: [
          {
            required: true,
            message: this.$t('common.inputRequired'),
            trigger: 'blur'
          }
        ],
        registerno: [{ validator: validateImoAndRegisterNo, trigger: 'blur' }],
        speed: [
          {
            required: true,
            message: this.$t('common.inputRequired'),
            trigger: 'blur'
          }
        ],
        dw: [
          {
            required: true,
            message: this.$t('common.inputRequired'),
            trigger: 'blur'
          }
        ],
        net: [
          {
            required: true,
            message: this.$t('common.inputRequired'),
            trigger: 'blur'
          }
        ],
        gross: [
          {
            required: true,
            message: this.$t('common.inputRequired'),
            trigger: 'blur'
          }
        ],
        sptype: [
          {
            required: true,
            message: this.$t('common.inputRequired'),
            trigger: 'blur'
          }
        ],
        sptypeOther: [
          {
            required: true,
            message: this.$t('common.inputRequired'),
            trigger: 'blur'
          }
        ],
        homePort: [
          {
            required: true,
            message: this.$t('common.inputRequired'),
            trigger: 'blur'
          }
        ],
        flagCode: [
          {
            required: true,
            message: this.$t('common.inputRequired'),
            trigger: 'cheng'
          }
        ],
        docmanager: [
          {
            required: true,
            message: this.$t('common.inputRequired'),
            trigger: 'change'
          }
        ]
      }
    }
  },
  created() {
    this.getlist()
    this.resetForm()
  },
  mounted() {
  },
  methods: {
    sptypeSub() {
      console.log(this.oiShipInfo.sptype)
      findShipSubByShipType(this.oiShipInfo.sptype).then(res => {
        if (res.data.result) {
          this.shipSubTypeOptions = res.data.data
          this.oiShipInfo.sptypeSub = ''
        }
      })
    },
    shipTypes() {
      this.shipComPanyNamevicode = true
    },
    shipComPanyNameData() {
      this.shipComPanyNamevicode = false
    },
    shipComPanyNameDatas(val) {
      this.oiShipInfo.shipEquipmentFuelMaps = val
      this.shipComPanyNamevicode = false
    },
    onWathers(val) {
      this.oiShipInfo.homePort = val[0].enName
    },
    getlist() {
      this.getShipInfoRules()
      this.getShipTypeList()
      this.getShipSubTypeOptions()
      this.getFindClassificatList()
    },
    async getShipInfoRules() {
      const res = await API.saveOrUpdateGcState()
      this.shipFlagOptions = res.data.data.items
    },
    async getShipTypeList() {
      const res = await API.savefindShipTypeList()
      this.shipTypeOptions = res.data.data.items
    },
    async getShipSubTypeOptions() {
      const res = await API.savefindShipSubList()
      this.shipSubTypeOptions = res.data.data.items
    },
    async getFindClassificatList() {
      const res = await API.savefindClassificatList()
      this.shipClassOptions = res.data.data.items
    },
    toogle() {
      console.log(this.$refs.pertSelect.handleCreateRelation())
    },
    // 船公司
    saveOwnerInfo() {
      var name =
        this.tableChecked[0].nameEn === null
          ? this.tableChecked[0].nameCn
          : this.tableChecked[0].nameEn
      var ccscode = this.tableChecked[0].ccsCode
      if (this.label === 'owner') {
        this.oiShipInfo.owner = name
        this.oiShipInfo.ownerAddr =
          this.tableChecked[0].adressEn === null
            ? this.tableChecked[0].adressCn
            : this.tableChecked[0].adressEn
        this.oiShipInfo.ownerId = ccscode
      }
      if (this.label === 'builder') {
        this.oiShipInfo.builder = name
        this.oiShipInfo.builderId = ccscode
      }
      if (this.label === 'operator') {
        this.oiShipInfo.operatorShip = name
        this.oiShipInfo.operatorId = ccscode
      }
      if (this.label === 'docmanager') {
        this.oiShipInfo.docmanager = name
        this.oiShipInfo.docId = ccscode
      }
      if (this.label === 'client') {
        this.oiShipInfo.clientName = ''
        this.oiShipInfo.clientId.length = 0
        for (const item of this.tableChecked) {
          this.oiShipInfo.clientId.push(item.id)
          this.oiShipInfo.clientName = this.oiShipInfo.clientName + name + '/'
        }
      }
      this.dialogShipCompanyFormVisible = false
    },
    handleCreateRelation(label) {
      this.label = label
      this.dialogShipCompanyFormVisible = true
      this.getShipCompanyList()
    },
    handleSelectionChange(val) {
      this.tableChecked = val
    },
    getShipCompanyList() {
      this.listLoading = true
      userShipCompanyList(this.listShipCompanyQuery).then(response => {
        this.shipCompanylist = response.data.data.items
        this.total2 = response.data.data.total
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5)
      })
    },
    handleShipCompanyFilter() {
      this.getShipCompanyList()
    },
    handleShipCompanyReset() {
      this.listShipCompanyQuery = {
        pageNum: 1,
        pageSize: 20,
        nameCn: '',
        nameEn: '',
        ccsCode: ''
      }
      this.getShipCompanyList()
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        )
      }
    },
    docRemoteMethod(query) {
      if (query !== '') {
        this.docLoading = true
        setTimeout(() => {
          this.docLoading = false
          this.docOptions = this.docList.filter(item => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
          })
        }, 200)
      } else {
        this.docOptions = []
      }
    },
    operateRemoteMethod(query) {
      if (query !== '') {
        this.operateLoading = true
        setTimeout(() => {
          this.operateLoading = false
          this.operateOptions = this.operateList.filter(item => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
          })
        }, 200)
      } else {
        this.operateOptions = []
      }
    },
    ownerRemoteMethod(query) {
      if (query !== '') {
        this.ownerLoading = true
        setTimeout(() => {
          this.ownerLoading = false
          this.ownerOptions = this.ownerList.filter(item => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
          })
        }, 200)
      } else {
        this.ownerOptions = []
      }
    },
    clientRemoteMethod(query) {
      if (query !== '') {
        this.clientLoading = true
        setTimeout(() => {
          this.clientLoading = false
          this.clientOptions = this.clientList.filter(item => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
          })
        }, 200)
      } else {
        this.clientOptions = []
      }
    },
    builderRemoteMethod(query) {
      if (query !== '') {
        this.builderLoading = true
        setTimeout(() => {
          this.builderLoading = false
          this.builderOptions = this.builderList.filter(item => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
          })
        }, 200)
      } else {
        this.builderOptions = []
      }
    },
    resetForm() {
      // this.$refs['oiShipInfo'].resetFields();
      this.docOptions = []
      this.operateOptions = []
      this.ownerOptions = []
      this.builderOptions = []
      this.oiShipInfo = {
        id: undefined,
        homePort: '',
        imono: '',
        owner: '',
        ownerAddr: '',
        ownerId: '',
        registerno: '',
        spname: '',
        spnameCn: '',
        flagCode: '',
        builderId: '',
        builder: '',
        operatorId: '',
        operatorShip: '',
        docId: '',
        title: '',
        jobtitle: '',
        telephone: '',
        email: '',
        class_: '',
        sptype: '',
        sptypeSub: '',
        serviceSpeed: '',
        gross: '',
        dw: '',
        net: '',
        finish: '',
        passengers: '',
        cars: '',
        buildContractTm: '',
        teus: '',
        ice: '',
        lastwu: '',
        operateType: '',
        consMethod: '',
        eedi: '',
        eedivalue: '',
        eeoi: '',
        eiv: '',
        remark: '',
        clientId: [],
        clientName: '',
        ccsno: '',
        fuelIds: []

      }
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    CreateModel() {
      this.resetForm()
      this.$nextTick(() => {
        this.$refs['oiShipInfo'].clearValidate()
      })
    },
    EditRowData(row) {
      this.oiShipInfo = Object.assign({}, row)
      this.oiShipInfo.clientId.length = 0
      this.oiShipInfo.clientName = ''
      for (const item of this.oiShipInfo.oiShipCmsaMaps) {
        this.oiShipInfo.clientId.push(item.clientId)
        this.oiShipInfo.clientName =
          this.oiShipInfo.clientName + item.cmsaName + '/'
      }
      this.oiShipInfo.fuelIds.length = 0
      for (const item of this.oiShipInfo.shipEquipmentFuelMaps) {
        if (item.equipmentId === null) {
          this.oiShipInfo.fuelIds.push(item.fuelId)
        }
      }
      this.$nextTick(() => {
        this.$refs['oiShipInfo'].clearValidate()
      })
    }
  }
}
</script>
<style lang="scss" >
/deep/.el-select-dropdown .el-popper {
  width: 100px !important;
}
/deep/.el_input input {
  padding-left: 2px;
  padding-right: 2px;
}
/deep/.el_select input {
  border: none;
}
</style>
