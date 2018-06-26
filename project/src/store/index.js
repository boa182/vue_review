import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    count1: 1,
    count2: 2,
    filtersList: [
      { id: 1, name: 'laoxie' },
      { id: 2, name: 'lenmo' }
    ]
  },
  mutations: {
    increment (state) {
      state.count++
    },
    reduce (state) {
      state.count--
    }
  },
  getters: {
    total: (state) => (symblo) => {
      if (symblo) {
        return symblo + (state.count * 1 + 3)
      } else {
        return '$ ' + state.count
      }
    },
    filtration: (state) => (filtrationFactor) => {
      return state.filtersList.find(item => item.id === filtrationFactor)
    }
  }
})
