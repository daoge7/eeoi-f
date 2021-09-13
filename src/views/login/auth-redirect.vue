<template>
  <div id="switch-box">
    
    <div class="content">Going to EEMS, wait a minuts……</div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      redirect: undefined,
      otherQuery: {},
      loginForm: {
        token: this.from_token,
        uid: from_username,
        lang: from_lang
      }
    }
  },
  computed: {
    // refresh_token () {
    //   return this.$route.query.refresh
    // },
    from_token () {
      return this.$route.query.token
    },
    from_username () {
      return this.$route.query.uid
    },
    from_lang () {
      return this.$route.query.lang
    }
    // // 成功后的跳转链接
    // redirect () {
    //   return this.$route.query.redirect
    // }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  mounted () {
    console.log(this.$route.query.token,this.$route.query.uid,545545454545)
    // 如果是主账户切过来的，记录主账户的token
    if (this.from_token && this.from_username) {
      Cookies.set('from_token', this.from_token)
      Cookies.set('from_username', this.from_username)
    } else {
      Cookies.remove('from_token')
      Cookies.remove('from_username')
    }
    if(this.from_lang=="en"){
      this.$i18n.locale = 'en'
      this.$store.dispatch('app/setLanguage', 'en')
    }
    let obj = {
      token : this.from_token,
      uid:this.from_username
    }
    this.$store.dispatch('user/errorslogin', obj)
            .then(() => {
              // debugger
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            }).catch(() => {
              this.$notify({
              title: this.$t('common.warning'),
              message: this.$t('common.Verification'),
             type: 'warning'
              }); 
            })
    // 用refresh_token登录
    this.$store.dispatch('refreshLogin', this.from_token).then(success => {
      if (success) {
        window.location.href = this.redirect ? decodeURIComponent(this.redirect) : '/console/home'
      } else {
        this.$store.dispatch('backToHome')
      }
    })
    
  },
  methods:{
     getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>
<style lang="scss" scoped>
  #switch-box {
    width: 400px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    i {
      color: #ff9900;
    }
    .content {
      display: inline-block;
      background: #2b85e4;
      color: #FFF;
      padding: 0 5px;
      border-radius: 8px 8px 8px 8px;
    }
  }
</style>
