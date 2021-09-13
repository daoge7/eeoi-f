<template>
  <div>
    <div class="header">
	<div class="header_main shell">
    	<div class="logo"><a href="#" title="中国船级社 船舶绿色生态综合管理系统"><img src="../../images/EEOI_home_logo.png" alt="中国船级社 船舶绿色生态综合管理系统" /></a></div>
        <div class="user_info">
          <a @click="CCsClick">CCS官网</a>
          <a @click="loginClick">登录</a>
        </div>
    </div>
</div>
<div class="menu">
    <ul class="nav shell">
        <li @click="logins"><a>首页</a></li>
        <li @click="dataDowns"><a>资料下载</a></li>
        <li @click="down"><a>软件下载</a></li>
        <li @click="efficency"><a>能效认证</a></li>
        <li><a href="#">系统说明</a></li>
    </ul>
</div>
<div class="main shell clearfix">
    <div class="effic" style="width:100%;height:570px;">
      <div class="mainleft">
          <h4>船舶能效管理认证 :</h4>
          <p>航运业的高速发展，船舶的排放总量随之大幅增加。在全球“绿色、低碳”的经济大背景下，由于船舶的国际流动性，其能源绩效也逐步成为社会关注的话题。</p>
          <p>IMO海洋环境保护委员会（MEPC）推出了MEPC.1/Circ.683《船舶能效管理计划（SEEMP）制订导则》、MEPC.1/Circ.684《船舶能效营运指数（EEOI）自愿使用指南》，这是关于营运船舶能效管理的指导性文件。IMO.MEPC提请各成员国政府使其主管机关、行业、相关航运组织、航运公司和其他相关利益方关注并促进自愿使用相关导则。为推动航运业的节能减排，IMO.MEPC计划将船舶能效管理计划（SEEMP）纳入MARPOL公约附则六强制实施。</p>
          <div class="imgs">
              <img :src="effic" alt="">
          </div>
          <p>中国船级社多年来一直致力于船舶绿色技术的研发，积极开展绿色船舶规范体系的研究和制定工作。交通运输部“十二五”水运节能减排重点工作—“建立绿色水运统计体系、考核体系、认证体系”，目前也正由我社牵头开展在航运企业实施的研究工作。</p>
          <p>《船舶能效管理认证规范》是我社根据IMO.MEPC通函、主管机关、行业组织要求推出的营运船舶能效管理的规范性文件，是我社“绿色船舶计划”的重要组成部分。该规范对公司能效管理体系及公司/船舶能效管理认证实施提出了基本要求，旨在引导、帮助航运企业建立和完善具有行业特色的船舶能效管理、监测、评估体系，使船舶能源绩效指标可测量、监控和验证，并得到持续改进。从而使企业能尽快适应并满足国际组织、政府、行业组织对船舶“环保、低碳”的强制性要求及指导性建议。</p>
      </div>
      <div class="maincenter">
          <h4>SEEMP流程图：</h4>
          <p>IMO.MEPC.1/Circ.683通函对于能效管理计划(SEEMP)的要求</p>
          <div class="imgs">
              <img :src="effic2" alt="">
          </div>
      </div>
      <div class="mainright">
          <h4>船舶能效管理认证 :</h4>
          <p>中国船级社将推出如下满足公约、政府主管机关、行业组织要求的能效管理认证服务。</p>
          <p>——公司能效管理认证（公司和船舶结合审核）</p>
          <p>——船舶能效管理认证（可独立申请船舶审核）</p>
          <p>——船舶能效核查（可独立申请船舶核查）</p>
          <div class="imgs">
              <img :src="effic3" alt="">
          </div>
      </div>
    </div>
  
</div>

<div class="footer">
	<p style="color:#004a8f">地址：北京市东直门南大街9号船检大厦    邮编：100007 调查问卷  |  免责声明 |  客户个人信息保护政策 <br>
    版权所有 中国船级社 webmaster@ccs.org.cn Copyright 1996－2020 本网站的 法律声明 京ICP备12032711号-1 </p>
</div>
  </div>
</template>
<script>

export default {
    components:{
    },
    data(){
        return {
           effic:require('../../images/a01.jpg'),
           effic2:require('../../images/a02.jpg'),
           effic3:require('../../images/a03.jpg'),
           img: require("../../images/12.jpg"),
           url: require("../../images/2.png"),
           url1: require("../../images/3.png"),
           url2: require("../../images/4.png"),
           url3: require("../../images/5.png"),
           url4: require("../../images/6.png"),
           url5: require("../../images/7.png"),
          listLoading:false
        }
    },
    methods: {
    loginClick() {
      this.$router.push("/login");
    },
    CCsClick() {
      window.location.href = "https://www.ccs.org.cn/ccswz/";
    },
    logins() {
      this.$router.push("/frontLogin");
    },
    down(){
      this.$router.push("/Softwaredownload")
    },
    efficency() {
      this.$router.push("/efficiencycertification")
    },
    dataDowns() {
       this.$router.push("/datadownload")
    },
}
}
</script>
<style lang="scss" scoped>
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

*{ margin:0; padding:0;}
ul li{ list-style:none;}
body{ font-size:14px; line-height:150%; font-family:"微软雅黑"; color:#333; background:#ffffff;}
.shell{ width:1200px; margin:auto;}
.fl{ float:left;}
.fr{ float:right;}
a{
  color: #004a8f;
}
a:link,a:visited{ color:#004a8f; text-decoration:none;}
a:hover,a:active{ color:#f36100; text-decoration: none;}

a.w:link,a.w:visited{ color:#FFF; text-decoration:none;}
a.w:hover,a.w:active{ color:#FFF; text-decoration: underline;}


.clearfix {
  *zoom: 1;
}
// .clearfix:before,
// .clearfix:after {
//   display: table;
//   content: "";
// }
// .clearfix:after {
//   clear: both;
// }

.f16{ font-size:16px;}

input.text{border:1px solid #dbdbdb; height:18px; padding:4px 5px; line-height:14px; vertical-align: middle;
-moz-box-shadow:inset 1px 1px 0 #f5f5f5; 
-webkit-box-shadow:inset 1px 1px 0 #f5f5f5; 
box-shadow:inset 1px 1px 0 #f5f5f5;} 

/*头部*/
.header{ width:100%; height:100px; }
.logo{ float:left; padding-top:17px;}
.user_info{ float:right;padding-top: 40px;}
.user_info a{margin-left: 15px;}


/*导航*/
.nav *{text-decoration:none;}
.nav * a:hover{background-color:#00427f;/* 鼠标经过时的红色背景，可自定义 */}
.menu{list-style:none;height:50px;width:100%;background-color:#004a8f;}
.nav{list-style:none;}
.nav li{float:left;position:relative;width:20%; }
.nav li a{color:#fff;font-size:16px;line-height:50px;text-align: center;display:block;}


/*主体*/
.main{ padding:20px 0;  }
.report{float:left; width: 300px; height: 570px; background: url(../../images/report_bg.jpg) no-repeat; padding: 10px;box-sizing:border-box;}
.report h3{margin: 10px 0 0 20px; font-size:24px;}
.statistics{padding:0 220px 0 310px;}
.btm10{margin-bottom: 10px;}
.link{float:right; }
.link ul li{ margin-bottom: 10px;}
.link ul li a{display: block;width: 210px; height: 105px;border-radius:10px; background: #88b0f0; color: #ffffff; padding: 25px 0 0 30px;box-sizing:border-box; font-size: 20px; line-height: 48px;}
.link ul li a:visited{background: #88b0f0; color: #ffffff;}
.link ul li a:hover{background: #78a1e4; color: #ffffff;}
.link ul li a:active{background: #78a1e4; color: #ffffff;}
.link ul li a i.fa{ display: block; float: left;width: 48px;height: 48px; margin-right: 20px;}
i.fa1{ background: url(../../images/l01.png) no-repeat ;}
i.fa2{ background: url(../../images/l02.png) no-repeat ;}
i.fa3{ background: url(../../images/l03.png) no-repeat ;}
i.fa4{ background: url(../../images/l04.png) no-repeat ;}
.effic{ overflow-y: auto;padding:  0 15px; }
.mainleft{
    flex:4;
    h4{
        color:#f5f5f5;
        background: #00427f;
        height: 30px;
        padding: 0 15px;
        line-height: 30px;
    }
    p{
        text-indent:2em
    }
    .imgs{
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
.maincenter{
    flex: 3;
    h4{
        color:#f5f5f5;
        background:#00427f;
        height: 30px;
        padding: 0 15px;
        line-height: 30px;
    }
     p{
        text-indent:2em
    }
    .imgs{
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
.mainright{
    flex: 3;
    h4{
        color:#f5f5f5;
        background:#00427f;
        height: 30px;
        padding: 0 15px;
        line-height: 30px;
    }
    .imgs{
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
/*底部*/
.footer{ padding:30px 0; background:#dee8f2}
.web{margin-bottom: 15px;text-align:center;}
.footer p{ text-align:center; font-size: 12px;}
</style>
