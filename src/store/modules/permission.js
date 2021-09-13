import { asyncRoutes, constantRoutes, resetRouter } from '@/router'
/* Layout */
import Layout from '@/layout'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
// function hasPermission(roles, route) {
//   // if (route.meta && route.meta.roles) {
//   //   return roles.some(role => route.meta.roles.includes(role))
//   // } else {
//   //   return true
//   // }

//   for (let index = 0; index < roles.length; index++) {
//     const e = roles[index]
//     if (e.url === route.path) {
//       return true
//     }
//   }
//   return false
// }

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
var i = 0
export function generaMenu(routes, data) {
  data.forEach(item => {
    i++
    const menu = {
      path: item.url,
      component: item.menuType === 1 ? Layout : () => import(`@/views${item.url}`),
      // hidden: true,
      children: [],
      name: i + item.title,
      meta: { title: item.title, icon: item.icon, keepAlive: true  }
    }
    if (item.children && item.children.length) {
      generaMenu(menu.children, item.children)
    } else if (item.pid === '0') { // 解决顶级菜单，且是实体菜单的路由
      var submenu = {
        path: item.url,
        component: item.menuType === 1 ? Layout : () => import(`@/views${item.url}`),
        // hidden: true,
        name: i + item.title,
        meta: { title: item.title, icon: item.icon, keepAlive: true }
      }
      menu.name = null
      menu.meta = null
      menu.component = Layout
      menu.children.push(submenu)
    }
    routes.push(menu)
  })
  console.log(routes, 'permission routes')
  return routes
}

const state = {
  routes: [],
  addRoutes: [],
  menus: [],
  roles: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_MENUS: (state, menus) => {
    state.menus = menus
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  generateRoutes({ commit }, allowPage) {
    return new Promise(resolve => {
      var accessedRoutes = generaMenu(asyncRoutes, allowPage)
      commit('SET_ROUTES', accessedRoutes)
      commit('SET_ROLES', ['hasBeen'])
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
