<template>
    <footer class="cssFooter">
      <div class="footer-images">
        <img src="@/assets/ccsLog_images/web1.jpg" alt="">
        <img src="@/assets/ccsLog_images/web2.jpg" alt="">
      </div>
      <p>地址：北京市东直门南大街9号船检大厦    邮编：100007 调查问卷  |  免责声明 |  客户个人信息保护政策 <br>
    版权所有 中国船级社 webmaster@ccs.org.cn Copyright 1996－2020 本网站的 法律声明 京ICP备12032711号-1 </p>
    </footer>
</template>
<script>
export default {
    name:'ccsFooter'
}

</script>
<style lang="scss" scoped>
.cssFooter{
    height: 164px;
    width: 100%;
    background-color:#dee8f2;
    padding: 30px 0;
    
    .footer-images{
        margin: 0 auto;
         display: flex;
         justify-content: center;
        img{
            display: block;
        }
    }
    p{ 
            display: flex;
         justify-content: center;
         font-size: 12px;
    }
}
</style>