import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const state = {
  // 设置默认值
  remark: '',
  jsontest: '',
  shipinfo: ''
}

const mutations = {
  setRemark(state, remark) {
    state.remark = remark
    sessionStorage.setItem('remark', remark)
  },
  setJsontest(state, entity) {
    var jsonStr = JSON.stringify(entity)
    state.jsontest = jsonStr
    sessionStorage.setItem('jsontest', jsonStr)
  },
  setShipInfo(state, entity) {
    var jsonStr = JSON.stringify(entity)
    state.jsontest = jsonStr
    sessionStorage.setItem('shipinfo', jsonStr)
  }
}

const actions = {

}

const store = new Vuex.Store({
  modules,
  getters,
  mutations,
  state,
  actions
})

export default store
