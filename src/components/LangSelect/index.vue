<template>
  <!-- <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
    <div>
      <svg-icon class-name="international-icon" icon-class="language" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="language==='zh'" command="zh">
        中文
      </el-dropdown-item>
      <el-dropdown-item :disabled="language==='en'" command="en">
        English
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown> -->
  <el-radio-group v-model="radio" @change="handleSetLanguage">
  <el-radio label="zh" style="color:#fff">中文</el-radio>
  <el-radio label="en" style="color:#fff">English</el-radio>
  </el-radio-group>  
</template>

<script>
export default {
  computed: {
    language() {
      return this.$store.getters.language
    }
  },
  data() {
    return {
        radio: 'zh'
    }},
  created() {
    this.handleSetLanguage()
  },
  methods: {
    handleSetLanguage() {
      this.$i18n.locale = this.radio
      this.$store.dispatch('app/setLanguage', this.radio)
      // this.$message({
      //   message: 'Switch Language Success',
      //   type: 'success'
      // })
    }
  }
}
</script>
