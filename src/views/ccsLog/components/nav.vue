<template>
<ul class="cssNav">
   <li v-for="(item,ind) in list" :key="ind">{{item.name}}</li>
</ul>
    
</template>
<script>
export default {
    nama:'cssNav',
    data(){
        return{
            list:[
                {   
                    id:'1',
                    name:"首页",
                    links:''
                },
                {   
                    id:'2',
                    name:"资料下载",
                     links:''
                },{   
                    id:'3',
                    name:"软件下载",
                     links:''
                },{   
                    id:'4',
                    name:"能效认证",
                     links:''
                },
                ]
        }
    }
}
</script>>
<style lang="scss" scoped>
.cssNav{
    height: 50px;
    width: 100%;
    background-color: #004a8f;
    padding: 0 8%;
    display: flex;
    justify-content: space-between;
    align-items: center;
      box-sizing: border-box;
      margin: 0;
    li{
        list-style: none;
        flex: 1;
        text-align: center;
         color:#fff;
         line-height: 50px;
        &:hover{
            background-color:#00427f ;
        }
    }

}

</style>