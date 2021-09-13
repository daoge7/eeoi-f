<!--Docflag变更记录-->
<template>
  <el-dialog
    :title="$t('ship.changerecord')"
    :visible.sync="record.dialog"
    :before-close="addDetales"
    width="80%"
    :append-to-body="true"
  >
    <el-button icon="el-icon-delete" type="danger" @click="handldeteltArr">{{ $t('ship.btnBatchDelete') }}</el-button>
    <el-table
      ref="multipleTable"
      v-loading="listLoading"
      :data="tableData"
      tooltip-effect="dark"
      border
      style="width: 100%;margin-top:10px;overflow:auto"
      height="100px"
      v-adaptive="{bottomOffset: 38}"
      highlight-current-row
      :row-style="{height:'35px'}"
      :cell-style="{padding:'0'}"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column :label="$t('shipBattery.shipName')" width="120">
        <template slot-scope="scope">{{ scope.row.shipName }}</template>
      </el-table-column>
      <el-table-column label="IMO.NO" width="120">
        <template slot-scope="scope">{{ scope.row.imoNo }}</template>
      </el-table-column>
      <el-table-column :label="$t('ship.Changetype')" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.changeType === '1'">{{ $t('ship.Flagchange') }}</span>
          <span v-if="scope.row.changeType === '2'">{{ $t('ship.docChange') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('ship.Flagstatebeforechange')" width="120">
        <template slot-scope="scope">{{ scope.row.flagThreeCodeOld }}</template>
      </el-table-column>
      <el-table-column :label="$t('ship.Flagstateafterchange')" width="120">
        <template slot-scope="scope">{{ scope.row.flagThreeCodeNew }}</template>
      </el-table-column>
      <el-table-column :label="$t('ship.Docbeforechange')" width="120">
        <template slot-scope="scope">{{ scope.row.docOld }}</template>
      </el-table-column>
      <el-table-column :label="$t('ship.Docafterchange')" width="120">
        <template slot-scope="scope">{{ scope.row.docNew }}</template>
      </el-table-column>
      <el-table-column :label="$t('ship.effectivedate')" width="120">
        <template slot-scope="scope">{{ scope.row.effectiveDate | datesformat('YYYY-MM-DD HH:mm') }}</template>
      </el-table-column>
      <el-table-column :label="$t('common.creator')" width="120">
        <template slot-scope="scope">{{ scope.row.creator }}</template>
      </el-table-column>
      <el-table-column :label="$t('ship.Creationdate')" width="120">
        <template slot-scope="scope">{{ scope.row.createTm | datesformat('YYYY-MM-DD HH:mm')  }}</template>
      </el-table-column>
      <el-table-column :label="$t('ship.Lastupdatedby')" width="120">
        <template slot-scope="scope">{{ scope.row.opuser }}</template>
      </el-table-column>
      <el-table-column :label="$t('ship.Lastupdatedate')" width="120">
        <template slot-scope="scope">{{ scope.row.opdate | datesformat('YYYY-MM-DD HH:mm') }}</template>
      </el-table-column>
      <el-table-column :label="$t('ship.operate')" width="250">
        <template slot-scope="{row}">
          <el-button type="success" @click="handlupdate(row)">{{ $t('common.update') }}</el-button>
          <el-button type="danger" @click="handldetelt(row)">{{ $t('common.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <entid
      v-if="shipComPanyNamevicode"
      :shipComPanyNamevicode="shipComPanyNamevicode"
      :ids="ids"
      @shipComPanyNameData="shipComPanyNameData"
    />
    <div slot="footer" class="dialog-footer">
      <el-button @click="addDetales">{{ $t('common.close') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import entid from "./list-entid";
import adaptive from "@/directive/el-table";
import { deleteMultiFlagDocChangeById } from "@/api/requestPost";
import {
  findAllFlagDocChangeOrderByEffectiveDateDesc,
  deleteFlagDocChangeById,
} from "@/api/requestGet";
export default {
  name: "reportManagementDalog",
  components: {
    entid,
  },
  props: {
    record: {
      type: Object,
    },
    nameImon: {
      type: Object
    }
  },
  directives: { adaptive },
  data() {
    return {
      listLoading: false,
      shipComPanyNamevicode: false,
      ids: "",
      tableData: [
        {
          date: "2020",
          id: "11",
        },
        {
          date: "2020",
          id: "11",
        },
      ],
      multipleSelection: [],
    };
  },
  created() {
    if(this.nameImon.id){
      this.init();
    }
    
  },
  methods: {
    init() {
      findAllFlagDocChangeOrderByEffectiveDateDesc(this.nameImon.id).then((res) => {
        if (res.data.result) {
          this.tableData = res.data.data;
        }
      });
    },
    shipComPanyNameData() {
      this.shipComPanyNamevicode = false;
      this.init();
    },
    // init(){
    //   this.listLoading = true
    // },
    addDetales() {
      this.$emit("shiprecordData", false);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handlupdate(row) {
      this.ids = row.id;
      console.log(this.ids, 212121212121);
      this.shipComPanyNamevicode = true;
    },
    handldetelt(row) {
      let ids = [row.id];
      this.$confirm("此操作将删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteMultiFlagDocChangeById(ids).then((res) => {
            if (res.data.result) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.init();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handldeteltArr() {
      let obj = [];
      if (this.multipleSelection.length < 1) {
        this.$message("请选择至少一条记录进行删除");
      } else {
        this.multipleSelection.forEach((ele) => {
          obj.push(ele.id);
        });
        this.$confirm("此操作将删除该记录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            deleteMultiFlagDocChangeById(obj).then((res) => {
              if (res.data.result) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                this.init();
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      }
    },
  },
};
</script>

<style scoped>
.addBox {
  display: flex;
}
.table-nonb tr td {
  height: 40px;
  font-size: 10px;
  color: #606266;
  text-align: center;
}
</style>
