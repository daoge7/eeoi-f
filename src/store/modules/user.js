import { login, getInfo, loginCrm } from '@/api/user'
import { getToken, setToken,setRName, removeToken, setButtons, setAllowPage, removeAllowPage, removeSessionId, removeButtons } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import store from '@/store'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  allowPage: [],
  roles: [],
  menus: [],
  buttons: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_allowPage: (state, allowPage) => {
    state.allowPage = allowPage
    sessionStorage.setItem('allowPage', allowPage)
  },
  SET_ROLES: (state, roles) => {
    store.state.permission.roles = roles
  },
  SET_MENUS: (state, menus) => {
    store.state.permission.menus = menus
  },
  SET_BUTTONS: (state, buttons) => {
    state.buttons = buttons
    sessionStorage.setItem('buttons', buttons)
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password, verifycode, i18n } = userInfo
    // var u = new FormData()
    // u.append('username', username.trim())
    // u.append('password', password)
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password, verifycode: verifycode, i18n: i18n })
        .then(response => {
          const { data } = response
          if (!data.result) {
            this.$notify({
              title: "error",
              message: '账号不存在或密码错误请重新输入',
              type: "error",
              duration: 2000
            });
            reject(data.data)
          } else {
            console.log(data, 'chenggong')
            commit('SET_TOKEN', data.data.token)
            commit('SET_NAME', data.data.name)
            commit('SET_allowPage', JSON.stringify(data.data.allowPage))
            commit('SET_BUTTONS', data.data.allowButton)
            setRName(data.data.name)
            setToken(data.data.token)
          }
          resolve()
        }).catch(error => {
          console.log(error, '错误信息')
          reject(error)
        })
    })
  },
  errorslogin({ commit }, userInfo) {
    const { token, uid } = userInfo
    console.log(userInfo)
    // var u = new FormData()
    // u.append('username', username.trim())
    // u.append('password', password)
    return new Promise((resolve, reject) => {
      loginCrm({ token: token, uid: uid })
        .then(response => {
          const { data } = response
          if (!data.result) {
            this.$notify({
              title: "error",
              message: '登录失败',
              type: "error",
              duration: 2000
            });
            reject(data.data)
          } else {
            console.log(data, 'chenggong')
            commit('SET_TOKEN', data.data.token)
            commit('SET_NAME', data.data.name)
            commit('SET_allowPage', JSON.stringify(data.data.allowPage))
            commit('SET_BUTTONS', data.data.allowButton)
            setRName(data.data.name)
            setToken(data.data.token)
          }
          resolve()
        }).catch(error => {
          console.log(error, '错误信息')
          reject(error)
        })
    })
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      alert('get UserInfo')
      getInfo(state.token).then(response => {
        const { data } = response
        console.log(data, 'getINfoDATA')
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        const { roles, name, avatar, introduction } = data
        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      // logout(state.token).then(() => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      // reset visited views and cached views
      // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
      dispatch('tagsView/delAllViews', null, { root: true })
      resolve()
      // }).catch(error => {
      // reject(error)
      // })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      removeAllowPage()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'
      commit('SET_TOKEN', token)
      setToken(token)
      const { roles } = await dispatch('getInfo')
      resetRouter()
      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
      // dynamically add accessible routes
      router.addRoutes(accessRoutes)
      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
