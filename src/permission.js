import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect', '/frontLogin', '/exchart', '/Softwaredownload', '/efficiencycertification', '/datadownload'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login' || to.path === '/auth-redirect' || to.path === '/frontLogin' || to.path === '/exchart' || to.path === '/Softwaredownload' || to.path === '/efficiencycertification' || to.path === '/datadownload') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    }else if(to.path === '/frontLogin'){
      next({ path: '/frontLogin' })
      NProgress.done()
    } else if (to.path === '/exchart') {
      next({ path: '/exchart' })
      NProgress.done()
    } else if (to.path === '/Softwaredownload') {
      next({ path: '/Softwaredownload' })
      NProgress.done()
    } else if (to.path === '/efficiencycertification') {
      next({ path: '/efficiencycertification' })
      NProgress.done()
    } else if (to.path === '/datadownload') {
      next({ path: '/datadownload' })
      NProgress.done()
    } else {
      // determine whether the user has obtained his permission roles through getInfo确定用户是否已通过getInfo获得其权限角色
      const hasRoles = store.state.permission.roles && store.state.permission.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          const accessRoutes = await store.dispatch('permission/generateRoutes', JSON.parse(sessionStorage.getItem('allowPage')))
          // dynamically add accessible routes
          router.addRoutes(accessRoutes)
          // store.state.permission.addRoutes)
          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record确保addRoutes完整的hack方法
          // 设置replace:true，这样导航就不会留下历史记录
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
