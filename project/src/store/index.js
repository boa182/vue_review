import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    count1: 1,
    count2: 2
  },
  mutations: {
    increment (state) {
      state.count++
    },
    reduce (state) {
      state.count--
    }
  }
})
