<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <!--:include=""-->
      <keep-alive :include="list">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  },
  data() {
    return {
      list: []
    }
  },
  watch:{
    cachedViews(val) {
      let lists =[]
      val.forEach(ele => {
        if(ele === '1船公司管理'){
          lists.push('ShipCompany')
        }
        if(ele === '2船队管理'){
          lists.push('ShipList')
        }
        if(ele === 'Dashboard'){
          lists.push('Dashboard')
        }
        if(ele === '4内河船队'){
           lists.push('shipManager')
        }
        if(ele === '5能效信息'){
           lists.push('EnergyEfficiency')
        }
         if(ele === '6船队统计'){
           lists.push('shipStatistics')
        }
         if(ele === '7船队能效统计分析'){
           lists.push('shipStatisticsAnalysis')
        }
        if(ele === '9船舶航次信息'){
           lists.push('EnergyEfficiencys')
        }
        if(ele === '10船舶期初油量'){
           lists.push('openingVolume')
        }
        if(ele === '12数据评估'){
           lists.push('DataAssessment')
        }
        if(ele === '13图形分析'){
           lists.push('DiagramExhibition')
        }
        if(ele === '14航段监测'){
           lists.push('Segmentdetection')
        }
        if(ele === '15EU MRV报告'){
           lists.push('reportManagement')
        }
        if(ele === '16IMO DCS报告'){
           lists.push('ImoDcsRreport')
        }
        if(ele === '17CMSA报告'){
           lists.push('CmsaRreport')
        }
         if(ele === '28港口代码'){
           lists.push('DictionaryPort')
        }
         if(ele === '29总吨范围代码'){
           lists.push('dicGrossTon')
        }
         if(ele === '30船龄范围代码'){
           lists.push('shipAge')
        }
         if(ele === '31日志查询"'){
           lists.push('log')
        }
         if(ele === '32燃油类型字典'){
           lists.push('fuel')
        }
         if(ele === '33评估参数'){
           lists.push('evaluation')
        }
         if(ele === '34能源形式字典'){
           lists.push('energyForm')
        }
         if(ele === '35船旗国代码'){
           lists.push('gcState')
        }
         if(ele === '36船级代码"'){
           lists.push('classificat')
        }
         if(ele === '37船型细分代码'){
           lists.push('shipSub')
        }
         if(ele === '38船型代码'){
           lists.push('shipType')
        }
         if(ele === '39资料管理'){
           lists.push('DocMng')
        }
         if(ele === '42用户管理'){
           lists.push('UserManage')
        }
         if(ele === '43角色管理'){
           lists.push('RoleManage')
        }
         if(ele === '45版本管理'){
           lists.push('PcAppMng')
        }
      })
      this.list = lists
    },
    key(val) {
      console.log(this.$route)
    }
  },
  created() {
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
 height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header+.app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    height: 100%;
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header+.app-main {
    padding-top: 84px;
  }
}
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>

