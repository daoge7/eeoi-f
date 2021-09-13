<template>
  <div class="app-container">
    <el-dialog :title="$t('ship.fuelId')" width="80%" :append-to-body="true" :visible.sync="shipComPanyNamevicode" :before-close="addDetale">
      <el-table
        v-loading="listLoading"
        :data="shipCompanylist"
        ref="multipleTable"
        border
        append-to-body
        fit
        height="100px"
        v-adaptive="{bottomOffset: 38}"
        highlight-current-row
        style="width:100%;overflow:auto"
        :row-style="{height:'35px'}"
        :cell-style="{padding:'0'}"
        @selection-change="handleSelectionChange"
      >

        <el-table-column type="selection" width="55" align="center" >
        </el-table-column>
        <el-table-column :label="$t('common.no')" type="index" show-overflow-tooltip width="50" align="center">
        </el-table-column>
        <el-table-column :label="$t('ship.Oiltype')"  align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{ row.fuelName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('MRV.Datacollectionmethod')"  align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
         <el-select v-model="row.consMethod" :placeholder="$t('common.selectRemind')">
         <el-option
         v-for="item in consMethodArray"
         :key="item.value"
         :label="item.label"
         :value="item.value">
         </el-option>
         </el-select>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDetale">
          {{ $t('common.close') }}
        </el-button>
        <el-button type="primary" @click="saveRelation(tableChecked)">
          {{ $t('common.save') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import adaptive from '@/directive/el-table'
import {getshipType} from '@/api/requestGet'
    export default {
        name: "ShipComPanySelect",
      directives: { adaptive  },
      props:{
          shipComPanyNamevicode:{
            type:Boolean
          },
          listData:{
              type:Array
          }
        },
        data(){
          return {
              changValue: null,
              shipCompanylist: [],
              listLoading: false,
              shipComPanyNmevicode: false,
              consMethodArray:[
        {
          value: '1',
          label: 'Method of using fuel delivery note'
        }, {
          value: '2',
          label: 'Method of using flowmeter'
        }, {
          value: '3',
          label: 'Monitoring method of fuel tank'
        }
      ],
          }
      },
      created(){
        this.initData()
        
     },
     mounted() {
      //DOM还没更新
     },
        methods: {
          initData() {
              getshipType().then(res => {
                this.shipCompanylist = res.data.data
                let list =[]
                res.data.data.forEach(ele => {
                   this.listData.forEach(el => {
                     if(ele.fuelId === el.fuelId) {
                        ele.consMethod = el.consMethod 
                        list.push(ele)
                     }
                   })
                })
                 this.$nextTick(() => {
                    list.forEach(ele => {
                    this.$refs.multipleTable.toggleRowSelection(ele, true) // 回显
                   })
                })
              })
          },
          addDetale() {
              this.$emit('shipComPanyNameData', false)
          },  
          saveRelation() {
          this.$emit('shipComPanyNameDatas', this.tableChecked)
          },
          handleSelectionChange(val) {
            this.tableChecked = val
          },
          getShipCompanyList() {
            this.listLoading = true
          }
        }
    }
</script>

<style scoped>

</style>
