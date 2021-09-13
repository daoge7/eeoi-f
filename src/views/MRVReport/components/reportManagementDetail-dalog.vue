<!--
MRV报告
-->
<template>
  <el-dialog
    title="MRV报告"
    :visible.sync="shipComPanyNamevicodes"
    :before-close="addDetale"
    width="80%"
    append-to-body
  >
    <el-row style="border:1px">
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
          <p>{{list.shipName}}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <p>2. IMO identification number</p>
        </el-col>
        <el-col :span="12">
          <p>{{ list.imono }}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <p>3. Port of registry / Home port</p>
        </el-col>
        <el-col :span="12">
          <p>{{list.homePortName}}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <p>4. Ship category</p>
        </el-col>
        <el-col :span="12">
          <p>{{list.spType}}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <p>5. Ice class of the ship</p>
        </el-col>
        <el-col :span="12">
          <p>{{ list.iceClass }}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <p>6. Technical efficiency of the ship</p>
        </el-col>
      </el-row>
      <div style="padding:5px 10px;">
        <el-row>
          <el-col :span="12">
            <p>a) Energy Efficiency Design Index (EEDI):</p>
          </el-col>
          <el-col :span="12">
            <p>{{(list.eediVal === 0 || list.eediVal === null)? 'N/A':list.eediVal}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <p>b) Estimated Index Value (EIV):</p>
          </el-col>
          <el-col :span="12">
            <p>{{list.eivVal}}</p>
          </el-col>
        </el-row>
      </div>
      <el-row>
        <el-col :span="12">
          <p>7. Name of the shipowner</p>
        </el-col>
        <el-col :span="12">
          <p>{{list.ownerName}}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <p>8. Address of the shipowner and its principal place of business</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <p>{{ list.ownerAddr }}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <p>9. Name of the company (only if not the shipowner)</p>
        </el-col>
        <el-col :span="12">
          <p>{{list.docName}}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <p>10. Address of the company (only if not the shipowner) and its principal place of business</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <p>{{list.docAddr}}</p>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <p>11. Contact person</p>
        </el-col>
      </el-row>

      <div style="padding:5px 10px;">
        <el-row>
          <el-col :span="24">
            <p>a) title：{{list.mrvpTitle}} first name：{{list.mrvpFname}} surname：{{list.mrvpSname}} job title：{{list.mrvpJobtitle}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <p>b) Address</p>
          </el-col>
          <el-col :span="12">
            <p>{{ list.mrvAddress }}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <p>c) Telephone</p>
          </el-col>
          <el-col :span="12">
            <p>{{ list.mrvpTele }}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <p>d) email</p>
          </el-col>
          <el-col :span="12">
            <p>{{ list.mrvpEmail }}</p>
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
          <p>{{ list.verifierName }}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <p>2. Address of the verifier and its principal place of business:</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <p>{{ list.verifierAddr }}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <p>3. Accreditation number</p>
        </el-col>
        <el-col :span="12">
          <p>{{ list.accrNum }}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <p>4. Verifier's statement</p>
        </el-col>
        <el-col :span="12">
          <p>{{ list.verifierState }}</p>
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
          <p>1. Emission source</p>
        </el-col>
        <el-col :span="12">
          <p>{{ list.emmSource }}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <p>2.Monitoring method(s) used (per emission source)</p>
        </el-col>
        <el-col :span="12">
          <p>{{ list.emmMeMethod }}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <p>3.Related level of uncertainty</p>
        </el-col>
        <el-col :span="12">
          <p>{{ list.emmMeUncer }}</p>
        </el-col>
      </el-row>
    </div>

    <el-row>
      <el-col :span="24">
        <h4>Part D Results from annual monitoring of the parameters in accordance with Article 10</h4>
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
          <p>1. Amount and emission factor for each type of fuel consumed in total</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <p>Fuel type:</p>
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
          <p>{{ list.hfoFactorr }}</p>
        </el-col>
        <el-col :span="6">
          <p>{{ list.chaiFactorr }}</p>
        </el-col>
        <el-col :span="6">
          <p>{{ list.lfoFactorr }}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <p>Total fuel consumption:</p>
        </el-col>
        <el-col :span="6">
          <p>{{list.hfoTons}}</p>
        </el-col>
        <el-col :span="6">
          <p>{{list.dgoTons}}</p>
        </el-col>
        <el-col :span="6">
          <p>{{list.lfoTons}}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <p>2. Total aggregated CO2 emitted within the scope of this Regulation:</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <p>{{ list.euCo2Tons }}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <p>3. aggregated CO2 emissions from all voyages between ports under a Member State's jurisdiction</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <p>{{ list.euInnerCo2Tons }}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <p>4. aggregated CO2 emissions from all voyages which departed from ports under a Member State's jurisdiction</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <p>{{ list.euFrCo2Tons }}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <p>5. aggregated CO2 emissions from all voyages to ports under a Member State's jurisdiction</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <p>{{ list.euToCo2Tons }}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <p>6. CO2 emissions which occurred within ports under a Member State's jurisdiction at berth:</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <p>{{ list.euBerthCo2Tons }}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <p>7. Total fuel consumption and total aggregated CO2 emitted assigned to passenger transport (for ro-pax ships)</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <p></p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <p>8. Total fuel consumption and total aggregated CO2 emitted assigned to freight transport (for ro-pax ships)</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <p></p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <p>9. Total fuel consumption and total aggregated CO2 emitt(ed on laden voyages (voluntary)</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <p><el-input v-model="list.euLadenCons" placeholder="请输入内容"></el-input></p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <p>10.Total fuel consumption for cargo heating (for chemical tankers, voluntary)</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <p><el-input v-model="list.euCargoheatCons" placeholder="请输入内容"></el-input></p>
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
          <p>1.Total distance travelled:</p>
        </el-col>
        <el-col :span="12">
          <p>{{ list.distOnsea }}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <p>2. Total distance travelled when navigating through ice (voluntary)</p>
        </el-col>
        <el-col :span="12">
          <p>{{ list.distIce }}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <p>3. Total time spent at sea</p>
        </el-col>
        <el-col :span="12">
          <p>{{ list.hourOnsea }}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <p>4. Total time spent at sea when navigating through ice (voluntary)</p>
        </el-col>
        <el-col :span="12">
          <p>{{ list.hourIce }}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <p>5.Total transport work</p>
        </el-col>
        <el-col :span="12">
          <p>{{ list.transportWork }}</p>
        </el-col>
      </el-row>
    </div>

    <el-row>
      <el-col :span="12">
        <h4>ENERGY EFFICIENCY</h4>
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
          <el-col :span="12">
            <p>a) Fuel consumption per distance</p>
          </el-col>
           <el-col :span="12">
            <p>{{ list.fuelConsPerMile }} kg / n mile</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <p>b) Fuel consumption per transport work</p>
          </el-col>
           <el-col :span="12">
            <p>{{ list.fuelConsPerWork }} g / m tonnes • n miles</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <p>c) CO<sub>2</sub> emissions per distance</p>
          </el-col>
           <el-col :span="12">
             <p>{{ list.co2PerMile2 }} kg CO<sub>2</sub> / n mile</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <p>d) CO<sub>2</sub> emissions per transport work</p>
          </el-col>
           <el-col :span="12">
            <p>{{ list.co2PerWork2 }} g CO<sub>2</sub> / m tonnes • n miles </p>
          </el-col>
        </el-row>
      </div>
      <div>
        <el-row>
        <el-col :span="24">
          <el-upload
            class="upload-demo"
            action="/sysUpload/upload"
            :data="currentFile"
            :before-remove="beforeRemove"
            :on-change="handleChange"
            :before-upload="handleBeforeUpload"
            :on-success="handleSuccess"

            multiple
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button slot="trigger" size="small" type="primary">{{ $t('sysDocNotice.clickToUpload') }}</el-button>
            <div slot="tip" class="el-upload__tip" />
            只能上传Excel文件，且不超过2MB
          </el-upload>
        </el-col>
      </el-row>
      </div>

    </div>
    <div slot="footer" class="dialog-footer">
      <el-button :disabled="flag" @click="save">保存</el-button>
      <el-button @click="docCclick">导出</el-button>
      <el-button @click="addDetale">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {downEuDcs ,saveEuDcs} from '@/api/requestPost'
export default {
  name: "reportManagementDalog",
  components: {},
  props: {
    shipComPanyNamevicodes: {
      type: Boolean
    },
    list: {
      type: Object
    },
    flag: {
      type: Boolean
    }
  },
  data() {
    return {
      currentFile: { fileId: '' }, // cdb上传
      fileList: []
    };
  },
  created() {},
  methods: {
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    // 关闭弹框
    addDetale() {
      this.$emit("shipComPanyNameDetail", false);
    },
    handleBeforeUpload(file) {
      this.currentFile.fileId = file.uid
    },
    handleSuccess(response, file, fileList) {
      this.list.fileDir = file.response
      this.list.fileName = file.name
    },
    save() {
      saveEuDcs(this.list).then(res =>{
          if (res.data.result) {

            this.$message({
              message: '保存Success',
              type: 'success'
            })
            this.$emit("shipComPanyNameDetail", false);
          } else {
            this.$message({
              showClose: true,
              message: '保存error',
              type: 'error'
            })
          }
      })
    },
    // Collected 报告
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      )
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
    docCclick() {
      downEuDcs(this.list).then(res => {
        this.download(res.data, 'MRV报告.xls')
      })
    },
  }
};
</script>

<style scoped>
.addBox {
  display: flex;
}
</style>
