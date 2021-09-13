import {
  savemanuinfor,
  getSituation
} from '@/api/requestGet'
const state = {
  list: [],
  situations:[]
}
const mutations = {
  saveList(state, payload) {
    state.list = payload.data
  },
  saveSituations(state,payload) {
    state.situations=payload.data
  }
}
const actions = {
  async getmanu({commit}) {
    let res = await savemanuinfor();
    let data = res.data.data.items;
    commit('saveList', {
      data
    })
  },
  async getSituations({commit}) {
    let res = await getSituation();
    let data = res.data.data.items;
   commit('saveSituations',{data})
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
