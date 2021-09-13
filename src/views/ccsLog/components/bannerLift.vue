<template>
  <div class="bannerLift">
    <img src="@/assets/bannerLift/report_bg.jpg" alt />
    <div class="ccsPosition">
      <h3>2019中国船舶能效报告</h3>
      <h3>2019全球航运能效</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "ccsBannerLift"
};
</script>

<style lang="scss" scoped>
.bannerLift {
  width: 22%;
  height: 100%;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
  .ccsPosition {
    position: absolute;
    left: 30px;
    top: 40px;
    h3 {
      color: #004a8f;

      &:hover {
        color: orangered;
      }
    }
  }
}
</style>
  
