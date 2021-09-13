<template>
     <header>
      <div class="logo">
      <img src="@/assets/ccsLog_images/EEOI_home_logo.png" alt="">
      </div>
      <p>
       <span @click="toogle">CCS官网</span>
       <span v-if="login">登录</span>
       <span v-else>进入</span>
      </p>
     </header>
</template>
<script>
 
export default {
    name:'ccsHrader',
    data(){
        return{
            login:false
        }
    },
    methods:{
        toogle(){
         
          window.location.href='http://localhost:9527'
          
        }
    }
}
</script>
<style lang="scss" scoped>
header{
    height: 110px;
    width: 100%;
    padding: 20px 8%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    .logo{
        width: 40%;
        height: 60px;
        img{
            width: 100%;
            height: 100%;
            display: block;
        }
    }
    p{
        span{
            margin-left: 20px;
            &:hover{
                color: orangered;
            }
        }
    }
    
}

</style>