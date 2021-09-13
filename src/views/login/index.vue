<template>
  <div class="login-container">
    <div class="login-input" style="position:relative;">
      <el-form
        ref="loginForm"
        :model="loginForm"
        class="login-form"
        :rules="loginRules"
        autocomplete="on"
        label-position="left"
      >
        <div class="title-container">
          <div style="width:100%;text-align: center;margin-bottom:20px;">
            <img src="@/images/EEOI_logo.png" />
          </div>
          <h3 class="title">
            {{ $t("login.title") }}
          </h3>
          <lang-select class="set-language" />
        </div>
        <el-form-item v-show="false" prop="i18n">
          <el-input
            ref="i18n"
            v-model="loginForm.i18n"
            name="i18n"
            tabindex="4"
            type="hidden"
            autocomplete="on"
          />
        </el-form-item>
        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            :placeholder="$t('login.username')"
            name="username"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item>
        <el-tooltip
          v-model="capsTooltip"
          content="Caps lock is On"
          placement="right"
          manual
        >
          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              :placeholder="$t('login.password')"
              name="password"
              tabindex="2"
              autocomplete="on"
              @keyup.native="checkCapslock"
              @blur="capsTooltip = false"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon
                :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
              />
            </span>
          </el-form-item>
        </el-tooltip>
        <el-form-item prop="verifycode">
          <el-input
            ref="verifycode"
            v-model="loginForm.verifycode"
            :placeholder="$t('login.verifycode')"
            prefix-icon="lj-icon-yanzhengma"
            name="verifycode"
            tabindex="3"
            autocomplete="off"
            autocapitalize="off"
            spellcheck="false"
            maxlength="5"
            style="float: left; width: 122px;"
            @keyup.enter.native="handleLogin"
          />
          <div class="verifycode">
            <img
              ref="code"
              :src="codeUrl"
              style="padding: 6px 5px 6px 15px; vertical-align: middle;"
              @click="changeCode"
            />
          </div>
        </el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          style="width:100%;height:42px;margin-bottom:15px;font-size:14px; box-shadow:0 3px 0 rgba(0,0,0,0.2)"
          @click.native.prevent="handleLogin"
        >
          {{ $t("login.logIn") }}
        </el-button>
        <div class="login-regnow">
          <a
            :href="
              'https://www.ccs-service.net/signup?languageType=' +
                $t('login.languageType')
            "
            style="color:white"
            target="_blank"
            >{{ $t("login.register") }}</a
          >
        </div>
        <div style="position:relative">
          <!--
        <div class="tips">
          <span>{{ $t('login.username') }} : admin</span>
          <span>{{ $t('login.password') }} : {{ $t('login.any') }}</span>
        </div>
        <div class="tips">
          <span style="margin-right:18px;">
            {{ $t('login.username') }} : editor
          </span>
          <span>{{ $t('login.password') }} : {{ $t('login.any') }}</span>
        </div>
        <el-button class="thirdparty-button" type="primary" @click="showDialog=true">
          {{ $t('login.thirdparty') }}
        </el-button> -->
        </div>
      </el-form>

      <el-dialog
        :title="$t('login.thirdparty')"
        :visible.sync="showDialog"
        :append-to-body="true"
      >
        {{ $t("login.thirdpartyTips") }}
        <br />
        <br />
        <br />
        <social-sign />
      </el-dialog>

      <!--修改密码界面-->
      <CgPwd ref="cgpwdDialog" />

      <p
        style="width:100%;
          position: absolute;
          text-align: center;
          color:#fff;
          font-size:12px;
          bottom:10px;
          "
      >
        © 2019. All Rights Reserved. 版权所有 中国船级社
      </p>
    </div>
    <div class="login-info" style="position:relative" />
  </div>
</template>

<script>
// 内页修改密码
import CgPwd from "@/views/sysManage/CgPwd";

import { validUsername } from "@/utils/validate";
import { login, getCodeImg } from "@/api/user";
import LangSelect from "@/components/LangSelect";
import SocialSign from "./components/SocialSignin";
import Cookies from "js-cookie";

export default {
  name: "Login",
  components: { LangSelect, SocialSign, CgPwd },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error("The username can not be empty"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("The password can not be less than 6 digits"));
      } else {
        callback();
      }
    };
    const validateVerifycode = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error("The verify code can not be empty"));
      } else {
        callback();
      }
    };
    return {
      // 大写字母，小写字母，数字，特殊符号必须四选三
      pattern: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,}$/,

      codeUrl: "",
      loginForm: {
        username: "",
        password: "",
        verifycode: "",
        i18n: ""
      },
      //   rulesPassword: {
      //     pass: [{ validator: validatePass, trigger: "change" }],
      //     checkPass: [{ validator: validatePass2, trigger: "change" }]
      //   },

      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ],
        verifycode: [
          { required: true, trigger: "blur", validator: validateVerifycode }
        ]
      },
      passwordType: "password",
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === "") {
      // this.$refs.username.focus()
    } else if (this.loginForm.password === "") {
      // this.$refs.password.focus()
    } else if (this.loginForm.verifycode === "") {
      // this.$refs.verifycode.focus()
    }
    this.changeCode();
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    // 显示密码修改弹窗界面
    showCgpwdDialog: function() {
      this.$refs.cgpwdDialog.setCgpwdVisible(true);
    },

    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (
          (shiftKey && (key >= "a" && key <= "z")) ||
          (!shiftKey && (key >= "A" && key <= "Z"))
        ) {
          this.capsTooltip = true;
        } else {
          this.capsTooltip = false;
        }
      }
      if (key === "CapsLock" && this.capsTooltip === true) {
        this.capsTooltip = false;
      }
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          if (Cookies.get("language") === "zh") {
            this.loginForm.i18n = "1";
          } else if (Cookies.get("language") === "en") {
            this.loginForm.i18n = "2";
          } else {
            this.loginForm.i18n = "1";
          }
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              const isPass = this.pattern.test(this.loginForm.password);
              if (!isPass) {
                this.showCgpwdDialog();
              } else {
                // debugger
                this.$router.push({
                  path: this.redirect || "/",
                  query: this.otherQuery
                });
              }
              this.loading = false;
            })
            .catch(() => {
              this.$notify({
                title: this.$t("common.warning"),
                message: this.$t("common.Verification"),
                type: "warning"
              });
              this.changeCode();
              this.loading = false;
            });
        } else {
          this.$notify({
            title: "error",
            message: "账号不存在或密码错误请重新输入",
            type: "error",
            duration: 2000
          });
          return false;
        }
      });
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
    getCaptchaKey() {
      const captchaKey = Math.random()
        .toString(36)
        .substring(2);
      return captchaKey;
    },
    changeCode() {
      getCodeImg().then(res => {
        // this.$refs.code.setAttribute(
        //   'src',
        //   res.img
        // )
        this.codeUrl = res.data.img;
        // this.loginForm.uuid = res.uuid
      });
      // let captcha_key = this.getCaptchaKey()
      // this.$refs.code.setAttribute(
      //     'src',
      //     process.env.VUE_APP_BASE_API+'/defaultKaptcha?captcha_key=' + captcha_key
      // )
    }
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #ffffff;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .login-form .el-input input {
    color: $cursor;
  }
}

.tips {
  font-size: 14px;
  color: red;
  margin-bottom: 20px;
}

/* reset element-ui css */

.login-container {
  .login-form {
    .el-input {
      display: inline-block;
      height: 40px;
      width: 85%;

      input {
        background: none;
        border: 0;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 10px 5px 10px 15px;
        color: #fff;
        height: 40px;
        caret-color: #333;
        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: #333 !important;
        }
      }
    }

    .el-form-item {
      border: 2px solid #6292d2;
      background: none;
      border-radius: 5px;
      color: #fff;
    }
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #949494;
$light_gray: #eee;
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
.login-info {
  height: 100%;
  width: 68%;
  // background-color: #0c1b2a;
  background-color: #0e1a28;
  background-image: url("EEOI_login_bg.jpg");
  background-size: auto 100%;
  background-repeat: no-repeat;
  background-position: left;
  overflow: hidden;
}
.login-info-c {
  position: relative;
  width: 80%;
  color: #ffffff;
  padding: 10% 35px 0;
  margin: 0 auto;
  overflow: hidden;
}
.login-info-c h1 {
  font-size: 18px;
  line-height: 200%;
}
.login-info-c p {
  font-size: 14px;
  line-height: 200%;
}
.login-input {
  float: right;
  min-height: 100%;
  width: 32%;
  overflow: hidden;
}

.login-container {
  height: 100%;
  width: 100%;
  background-color: #3b77c7;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 420px;
    max-width: 100%;
    padding: 80px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .login-regnow {
    text-align: center;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: #fff;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    .title {
      font-size: 16px;
      color: #ffffff;
      margin: 0px 0 15px 0;
      text-align: left;
      font-weight: normal;
    }

    .set-language {
      color: #fff;
      position: absolute;
      top: 165px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.4);
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
