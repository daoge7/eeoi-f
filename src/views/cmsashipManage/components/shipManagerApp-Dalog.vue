<template>
  <el-dialog
    title="App账号信息"
    :visible.sync="dialogVisible.dalog"
    width="80%"
    :before-close="handlsole"
    :append-to-body="true"
  >
    <el-form
      label-position="left"
      label-width="150px"
      :model="list"
      ref="uploadReportTemp"
      :rules="rules"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="用户名(登录名)" prop="userName">
            <el-input :disabled="true" v-model="list.userName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="姓名(cn)" prop="cnName">
            <el-input v-model="list.cnName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名(en)" prop="enName">
            <el-input v-model="list.enName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话">
            <el-input v-model="list.phoneNumber"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="密码">
            <el-input v-if="falg" :disabled="falg" v-model="tetx"></el-input>
            <el-input v-if="!falg" v-model="password" @change="passwords"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱">
            <el-input v-model="list.email"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="用户状态" prop="userStatus">
            <el-select v-model="list.userStatus" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="list.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handlsole">关 闭</el-button>
      <el-button type="primary" @click="handlsave">保 存</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { saveAppUser } from "@/api/requestPost";
import { findAppUserByShipId } from "@/api/requestGet";
export default {
  props: {
    dialogVisible: {
      type: Object,
    },
  },
  data() {
    return {
      falg: false,
      tetx:'******',
      password: '',
      list: {
        imoNo: null,
        userName: "",
        enName: "",
        cnName: "",
        phoneNumber: "",
        userStatus: 1,
        email: "",
        remark: "",
        shipId: ""
      },
      options: [
        {
          value: 1,
          label: "启用",
        },
        {
          value: 2,
          label: "冻结",
        },
      ],
      rules: {
        userName: [{ required: true, message: "必填项", trigger: "blur" }],
        cnName: [{ required: true, message: "必填项", trigger: "blur" }],
        enName: [{ required: true, message: "必填项", trigger: "blur" }],
        userStatus: [{ required: true, message: "必填项", trigger: "change" },
        ],
      },
    };
  },
  created() {
    if (this.dialogVisible.id) {
      this.list.shipId = this.dialogVisible.id;
      this.list.imoNo = this.dialogVisible.imono;
      this.initData();
    }
  },
  methods: {
    passwords() {
      if(this.password === ''){
        this.$message.error('请输入密码');
      }
    },
    initData() {
      findAppUserByShipId(this.dialogVisible.id).then((res) => {
        if (res.data.result) {
          this.list = res.data.data;
          if(this.list.status === '2'){
            this.falg = true
          }else {
            this.falg = false
          }
        }
      });
    },
    handlsole() {
      this.$emit("app", false);
    },
    handlsave() {
      this.$refs.uploadReportTemp.validate((valid) => {
        if (valid) {
          if(!this.falg){
            this.list.password = this.password
          }
          saveAppUser(this.list).then((res) => {
            if (res.data.result) {
              this.$emit("app", false);
            }
          });
        }
      });
    },
  },
};
</script>
<style scoped>
</style>