<template>
    <div class="ccsBanner">
     <BannerLift/>
     <div class="ccsMiddle">
       <img src="@/assets/ccsLog_images/tj1.jpg" alt="">
       <img src="@/assets/ccsLog_images/tj2.jpg" alt="">
    </div>
    <ul class="ccsRight">
      <li>
      
      </li>
    
    </ul>
    </div>
</template>
<script>
import BannerLift from './bannerLift.vue'
export default {
    name:'ccsBanner',
    components:{
        BannerLift
    }

}
</script>
<style lang="scss" scoped>
.ccsBanner{
    height: 610px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 10px 8%;
    box-sizing: border-box;
    .ccsMiddle{
        width: 58%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        img{
            display: block;
            width: 100%;
            height: 49%;
        }
    }
    .ccsRight{
        width: 18%;    
        margin: 0;
        padding: 0;
        overflow-x:auto ;
        li{         
            width: 100%;
            height: 105px;
            background-color: #88b0f0;
            border-radius: 10px;
            list-style: none;
          
            &:hover{
                 background-color:  #78a1e4;
             }
        }
    }
}
</style>