<template>
  <div id="app">
    <!-- <keep-alive :include="cachedViews"> -->
    <router-view />
  <!-- </keep-alive> -->
    <!-- <transition name="fade" mode="out-in">
   <keep-alive>
       <router-view></router-view>
   </keep-alive>
</transition> -->
  </div>
</template>

<script>
export default {
  name: 'App',
 data() {
    return {
     cachedViews: ['AnnualDataPer', 'AnnualTargetPer', 'CompanyAnnualData', 'CompanyAnnualTarget']
    };
  }
}
</script>


<style lang="scss" scoped>
/deep/input[type="number"] {
  -moz-appearance: textfield;
}
/deep/input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
