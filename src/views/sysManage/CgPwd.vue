<template>
  <!-- 修改密码界面 -->
  <el-dialog
    :title="$t('common.changePassword')"
    width="50%"
    :visible.sync="cgpwdVisible"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
  >
    <el-form
      ref="dataForm"
      :model="dataForm"
      label-width="180px"
      :rules="dataFormRules"
      :size="size"
      label-position="right"
    >
      <el-form-item :label="$t('common.prePassword')" prop="oldPassword">
        <el-input
          v-model="dataForm.oldPassword"
          type="password"
          auto-complete="off"
        />
      </el-form-item>
      <el-form-item :label="$t('common.newPassword')" prop="newPassword">
        <el-input
          v-model="dataForm.newPassword"
          type="password"
          auto-complete="off"
        />
      </el-form-item>
      <el-form-item :label="$t('common.dupnewPassword')" prop="dupnewPassword">
        <el-input
          v-model="dataForm.dupnewPassword"
          type="password"
          auto-complete="off"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" style="margin-top: 5px;">
      <el-button :size="size" @click.native="cgpwdVisible = false">{{
        $t("common.cancel")
      }}</el-button>
      <el-button
        :size="size"
        type="primary"
        :loading="editLoading"
        @click.native="submitForm"
        >{{ $t("common.confirm") }}</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { pwdUpd } from "@/api/user";
export default {
  data() {
    const validatePwd = (rule, value, callback) => {
      //   if (value.length < 6) {
      //     callback(new Error( this.$t('common.cgPwdNewTip')))
      //   } else {
      //     callback()
      //   }

      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!this.pattern.test(value)) {
        callback(
          new Error("8位以上，大写字母、小写字母、数字、特殊符号，至少有三种")
        );
      } else {
        if (this.dataForm.dupnewPassword !== "") {
          this.$refs.dataForm.validateField("dupnewPassword");
        }
        callback();
      }
    };
    const validateDupPwd = (rule, value, callback) => {
      //   if (value.length < 6 || this.dataForm.newPassword!=this.dataForm.dupnewPassword) {
      //     callback(new Error( this.$t('common.cgPwdNewerrTip')))
      //   } else {
      //     callback()
      //   }

      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.dataForm.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 8位以上，大写字母、小写字母、数字、特殊符号，至少有三种
      pattern: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,}$/,

      size: "small",
      cgpwdVisible: false, // 编辑界面是否显示
      editLoading: false, // 载入图标
      // 初始化数据
      dataForm: {
        oldPassword: "",
        newPassword: "",
        dupnewPassword: ""
      },
      // 设置属性
      dataFormRules: {
        oldPassword: [
          {
            required: true,
            message: this.$t("common.cgPwdOldTip"),
            trigger: "blur"
          }
        ],
        newPassword: [
          { required: true, trigger: "blur", validator: validatePwd }
        ],
        dupnewPassword: [
          { required: true, trigger: "blur", validator: validateDupPwd }
        ]
      }
    };
  },
  mounted() {},
  methods: {
    // 设置可见性
    setCgpwdVisible: function(cgpwdVisible) {
      this.cgpwdVisible = cgpwdVisible;
    },
    // 提交请求
    submitForm: function() {
      // this.$refs.XXX 获取ref绑定的节点
      this.$refs.dataForm.validate(valid => {
        if (valid) {
          this.$confirm(
            this.$t("common.dataConfirm"),
            this.$t("common.tipWinTitle"),
            {}
          ).then(() => {
            const params = Object.assign({}, this.dataForm);
            params.user = "admin";
            pwdUpd(this.dataForm).then(res => {
              this.editLoading = true;
              if (res.data.result) {
                this.$confirm(
                  res.data.data + this.$t("common.cgPwdRelogin"),
                  this.$t("common.tipWinTitle"),
                  {
                    confirmButtonText: this.$t("common.nowexe"),
                    cancelButtonText: this.$t("common.laterexe"),
                    type: "success"
                  }
                ).then(() => {
                  this.$store.dispatch("user/logout");
                  location.reload();
                });
                // 隐藏该窗口
                this.cgpwdVisible = false;
              } else {
                this.$message({ message: res.data.data, type: "error" });
              }
              this.editLoading = false;
              // 重置表单
              this.$refs["dataForm"].resetFields();
            });
          });
        }
      });
    }
  }
  // mounted： 在这发起后端请求，拿回数据，配合路由钩子做一些事情  （dom渲染完成 组件挂载完成 ）
};
</script>

<style scoped></style>
