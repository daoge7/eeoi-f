// import '@babel/polyfill'
// // import 'babel-polyfill'
// // import promise from 'es6-promise'
// // import 'core-js/stable'; 
// import 'regenerator-runtime/runtime';
// import Vue from 'vue'

// import Cookies from 'js-cookie'

// import 'normalize.css/normalize.css' // a modern alternative to CSS resets
// import Element from 'element-ui'
// import './styles/element-variables.scss'
// import '@/styles/index.scss' // global css
// import App from './App'
// import store from './store'
// import router from './router'
// import i18n from './lang' // 国际化
// import ViewUI from 'view-design';
// import 'view-design/dist/styles/iview.css';
// import './icons' // icon
// import './permission' // permission control
// import './utils/error-log' // error log

// import * as filters from './filters' // global filters

// import './utils/eldia'

// import Es6Promise from 'es6-promise'

// require('es6-promise').polyfill()

// Es6Promise.polyfill()
// // Vue.config.productionTip = false // 去掉警告
// // 使用require来引入自定义样式文件，整个项目中都生效
// require('./styles/form-item.scss')

// /**
//  * If you don't want to use mock-server
//  * you want to use MockJs for mock api
//  * you can execute: mockXHR()
//  *
//  * Currently MockJs will be used in the production environment,
//  * please remove it before going online! ! !
//  */
// // import { mockXHR } from '../mock'
// // if (process.env.NODE_ENV === 'production') {
// //   mockXHR()
// // }
// // 修改 el-dialog 默认点击其它地方不关闭弹出框
// Element.Dialog.props.closeOnClickModal.default = false
// Vue.use(ViewUI);
// Vue.use(Element, {
//   size: Cookies.get('size') || 'mini', // set element-ui default size
//   i18n: (key, value) => i18n.t(key, value)
// })

// // register global utility filters
// Object.keys(filters).forEach(key => {
//   Vue.filter(key, filters[key])
// })

// Vue.config.productionTip = false

// new Vue({
//   el: '#app',
//   router,
//   store,
//   i18n,
//   render: h => h(App)
// })
import '@babel/polyfill'
import Es6Promise from 'es6-promise'
Es6Promise.polyfill()
import Vue from 'vue'
import Cookies from 'js-cookie'
// import promise from 'es6-promise'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets
// import './styles/scrollbar.css'
import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'
import i18n from './lang' // 国际化
// import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

import './utils/eldia'
// Vue.config.productionTip = false // 去掉警告

// 使用require来引入自定义样式文件，整个项目中都生效
require('./styles/form-item.scss')
// promise.polyfill()
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
// import { mockXHR } from '../mock'
// if (process.env.NODE_ENV === 'production') {
//   mockXHR()
// }

import moment from 'moment'
Vue.filter('datesformat', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  if (dataStr) {
    return moment(dataStr).format(pattern)
  } else {
    return dataStr
  }
})

// 修改 el-dialog 默认点击其它地方不关闭弹出框
Element.Dialog.props.closeOnClickModal.default = false
// Vue.use(ViewUI);
Vue.use(Element, {
  size: Cookies.get('size') || 'mini', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
