<template>
  <div>
    <div class="header">
      <div class="header_main shell">
        <div class="logo">
          <a href="#" title="中国船级社 船舶绿色生态综合管理系统">
            <img src="../../images/EEOI_home_logo.png" alt="中国船级社 船舶绿色生态综合管理系统" />
          </a>
        </div>
        <div class="user_info">
          <a @click="CCsClick">CCS官网</a>
          <a @click="loginClick">登录</a>
        </div>
      </div>
    </div>
    <div class="menu">
      <ul class="nav shell">
        <li @click="logins">
          <a>首页</a>
        </li>
        <li @click="dataDowns">
          <a>资料下载</a>
        </li>
        <li @click="down">
          <a>软件下载</a>
        </li>
        <li @click="efficency">
          <a>能效认证</a>
        </li>
        <li>
          <a href="#">系统说明</a>
        </li>
      </ul>
    </div>
    <div class="main shell clearfix">
      <div style="width:100%;height:570px;">
        <!-- <el-table
      :data="tableData"
       v-loading="listLoading"
       border
       fit
      ref="singleTable">
      <el-table-column
         type="index"
        align="center"
        :label="'序号'">
      </el-table-column>
      <el-table-column
        align="center"
        :label="'资料名称'">
        <template slot-scope="{row}">
            <el-tooltip placement="top">
          <div slot="content">{{ row.content }}</div>
           <a :href="row.path">{{ row.name }}</a>
          </el-tooltip>
           
        </template>
      </el-table-column>
      <el-table-column
        :label="'操作'"
        align="center"
      >
        <template slot-scope="{row}">
          <el-button
            size="mini"
            type="warning"
            style="padding:5px ;"
            @click="handleModifyStatus(row)"
          >{{ '资料下载' }}</el-button>
           </template>
      </el-table-column>
        </el-table>-->
        <el-table
          :data="tableData"
          style="width: 100%;margin-bottom: 20px;"
          border
          default-expand-all
          v-loading="listLoading"
        >
          <el-table-column type="index" align="center" :label="'序号'"></el-table-column>
          <el-table-column align="center" :label="'资料名称'">
            <template slot-scope="{row}">
              <a>{{ row.docTitle }}</a>
            </template>
          </el-table-column>
          <el-table-column :label="'操作'" align="center">
            <template slot-scope="{row}">
              <el-button
                size="mini"
                type="warning"
                style="padding:5px ;"
                @click="enit(row,'detail')"
              >{{ '资料下载' }}</el-button>
            </template>
          </el-table-column>
        </el-table>
         <pagination v-show="total>0" style="margin:0px;padding:0px" :total="total" :page.sync="info.currentPage" :limit.sync="info.pageSize" @pagination="getList"/>
      </div>
      <sysDocNotice ref="child" />
    </div>

    <div class="footer">
      <p style="color:#004a8f">
        地址：北京市东直门南大街9号船检大厦 邮编：100007 调查问卷 | 免责声明 | 客户个人信息保护政策
        <br />版权所有 中国船级社 webmaster@ccs.org.cn Copyright 1996－2020 本网站的 法律声明 京ICP备12032711号-1
      </p>
    </div>
  </div>
 
</template>
<script>
import Pagination from "@/components/Pagination";
import sysDocNotice from '@/views/docMng/sysDocNotice-dialog2'
import { downloadFile, findAllSysDocNoticeListAndSysFiles,getQueryPage } from "@/api/requestGet";
export default {
  components: {
    Pagination,
    sysDocNotice
  },
  data() {
    return {
      dialogVisible: false,
      img: require("../../images/12.jpg"),
      url: require("../../images/2.png"),
      url1: require("../../images/3.png"),
      url2: require("../../images/4.png"),
      url3: require("../../images/5.png"),
      url4: require("../../images/6.png"),
      url5: require("../../images/7.png"),
      listLoading: false,
      total: 0,
      info: {
        currentPage: 1,
        pageSize: 20,
      },
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        docTitle: '',
        docType: '',
        docNumber: '',
        fileIds: '',
        fileNames: '',
        recStatus: ''
      },
      tableData: [
      ],
      tableDataDialog:[],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    handleClose() {
      this.dialogVisible = false
    },
    enit(row,status){
      console.log(row)
       this.$refs.child.userDetail2(row, status)
    },
    loginClick() {
      this.$router.push("/login");
    },
    CCsClick() {
      window.location.href = "https://www.ccs.org.cn/ccswz/";
    },
    logins() {
      this.$router.push("/frontLogin");
    },
    down() {
      this.$router.push("/Softwaredownload");
    },
    efficency() {
      this.$router.push("/efficiencycertification");
    },
    dataDowns() {
      this.$router.push("/datadownload");
    },
    // handleModifyStatus(row) {
    //   console.log(row)
    //   downloadFile(row.path, row.name).then((res) => {
    //     this.download(res.data, row.name);
    //   });
    // },
    // // 文件导出
    // download(data, name) {
    //   if (!data) {
    //     return;
    //   }
    //   const url = window.URL.createObjectURL(new Blob([data]));
    //   const link = document.createElement("a");
    //   link.style.display = "none";
    //   link.href = url;
    //   if (name) {
    //     link.setAttribute("download", `${name}`);
    //   } else {
    //     link.setAttribute("download");
    //   }
    //   document.body.appendChild(link);
    //   link.click();
    // },
    getList() {
      this.listLoading = true;
      var url = '/sysDocNotice/findSysDocNoticeList'
      getQueryPage(url,this.listQuery).then((res) => {
        if (res.data.result) {
          this.tableData = res.data.data.items
          this.total = res.data.data.total
          this.listLoading = false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

* {
  margin: 0;
  padding: 0;
}
ul li {
  list-style: none;
}
body {
  font-size: 14px;
  line-height: 150%;
  font-family: "微软雅黑";
  color: #333;
  background: #ffffff;
}
.shell {
  width: 1200px;
  margin: auto;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
a {
  color: #004a8f;
}
a:link,
a:visited {
  color: #004a8f;
  text-decoration: none;
}
a:hover,
a:active {
  color: #f36100;
  text-decoration: none;
}

a.w:link,
a.w:visited {
  color: #fff;
  text-decoration: none;
}
a.w:hover,
a.w:active {
  color: #fff;
  text-decoration: underline;
}

.clearfix {
  *zoom: 1;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.f16 {
  font-size: 16px;
}

input.text {
  border: 1px solid #dbdbdb;
  height: 18px;
  padding: 4px 5px;
  line-height: 14px;
  vertical-align: middle;
  -moz-box-shadow: inset 1px 1px 0 #f5f5f5;
  -webkit-box-shadow: inset 1px 1px 0 #f5f5f5;
  box-shadow: inset 1px 1px 0 #f5f5f5;
}

/*头部*/
.header {
  width: 100%;
  height: 100px;
}
.logo {
  float: left;
  padding-top: 17px;
}
.user_info {
  float: right;
  padding-top: 40px;
}
.user_info a {
  margin-left: 15px;
}

/*导航*/
.nav * {
  text-decoration: none;
}
.nav * a:hover {
  background-color: #00427f; /* 鼠标经过时的红色背景，可自定义 */
}
.menu {
  list-style: none;
  height: 50px;
  width: 100%;
  background-color: #004a8f;
}
.nav {
  list-style: none;
}
.nav li {
  float: left;
  position: relative;
  width: 20%;
}
.nav li a {
  color: #fff;
  font-size: 16px;
  line-height: 50px;
  text-align: center;
  display: block;
}

/*主体*/
.main {
  padding: 20px 0;
}
.report {
  float: left;
  width: 300px;
  height: 570px;
  background: url(../../images/report_bg.jpg) no-repeat;
  padding: 10px;
  box-sizing: border-box;
}
.report h3 {
  margin: 10px 0 0 20px;
  font-size: 24px;
}
.statistics {
  padding: 0 220px 0 310px;
}
.btm10 {
  margin-bottom: 10px;
}
.link {
  float: right;
}
.link ul li {
  margin-bottom: 10px;
}
.link ul li a {
  display: block;
  width: 210px;
  height: 105px;
  border-radius: 10px;
  background: #88b0f0;
  color: #ffffff;
  padding: 25px 0 0 30px;
  box-sizing: border-box;
  font-size: 20px;
  line-height: 48px;
}
.link ul li a:visited {
  background: #88b0f0;
  color: #ffffff;
}
.link ul li a:hover {
  background: #78a1e4;
  color: #ffffff;
}
.link ul li a:active {
  background: #78a1e4;
  color: #ffffff;
}
.link ul li a i.fa {
  display: block;
  float: left;
  width: 48px;
  height: 48px;
  margin-right: 20px;
}
i.fa1 {
  background: url(../../images/l01.png) no-repeat;
}
i.fa2 {
  background: url(../../images/l02.png) no-repeat;
}
i.fa3 {
  background: url(../../images/l03.png) no-repeat;
}
i.fa4 {
  background: url(../../images/l04.png) no-repeat;
}

/*底部*/
.footer {
  padding: 30px 0;
  background: #dee8f2;
}
.web {
  margin-bottom: 15px;
  text-align: center;
}
.footer p {
  text-align: center;
  font-size: 12px;
}
</style>
