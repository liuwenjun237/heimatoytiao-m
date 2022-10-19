import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '../utiles/stroage'

Vue.use(Vuex)
const TOKEN_KEY = 'TAOBAO.USER'
export default new Vuex.Store({
  state: {
    // user: JSON.parse(window.localStorage.getItem(TOKEN_KEY))
    user: getItem(TOKEN_KEY)
  },
  getters: {},
  mutations: {
    updataUser (state, payload) {
      state.user = payload
      setItem(TOKEN_KEY, state.user)
      // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user))
    }
  },
  actions: {},
  modules: {}
})
