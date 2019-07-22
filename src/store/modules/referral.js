// import Vue from 'vue'
// import Vuex from 'vuex'
import types from '../mutation-types'

// Vue.use(Vuex);


const state = {
  referralData: null,
}

const mutations = {
  [types.REFERRALDATA](state, data) {
    state.referralData = data;
  }
}

const getters = {
  referralData(state) {
    return state.referralData
  }

}

const actions = {
  referralData({commit}, data){
    commit(types.REFERRALDATA, data)
  }

}


export default {
  state,
  mutations,
  getters,
  actions
};