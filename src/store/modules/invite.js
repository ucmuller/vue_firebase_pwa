// import Vue from 'vue'
// import Vuex from 'vuex'
import types from '../mutation-types'

// Vue.use(Vuex);


const state = {
  allData: null,
  inviteAllDataLength: null,
  inviteData: null,
  dataStatus: false,
  inviteDataLength: null
}

const mutations = {
  [types.DATACHANGED](state, data) {
    state.allData = data;
    state.inviteAllDataLength = data.length;
  },
  [types.INVITEDATACHANGED](state, data) {
    state.inviteData = data;
    state.dataStatus = true;
  },
  [types.INVITEDATALENGTH](state, data) {
    state.inviteDataLength = data;
  },
  [types.INVITECLEAR](state) {
    state.allData = null;
    state.inviteAllDataLength = null;
    state.inviteData = null;
    state.dataStatus = false;
    state.inviteDataLength = null;
  },
}

const getters = {
  data(state) {
    return state.allData
  },
  inviteData(state) {
    return state.inviteData
  },
  inviteDataStatus(state) {
    return state.dataStatus
  },
  inviteDataLength(state) {
    return state.inviteDataLength
  },
  inviteAllDataLength(state){
    return state.inviteAllDataLength
  },

}

const actions = {
  inviteDataChanged({ commit }, data) {
    commit(types.INVITEDATACHANGED, data)
  },
  dataChanged({ commit }, data){
    commit(types.DATACHANGED, data)
  },
  inviteDataLength({ commit }, data){
    commit(types.INVITEDATALENGTH, data)
  },
  inviteClear({ commit }){
    commit(types.INVITECLEAR)
  },

}


export default {
  state,
  mutations,
  getters,
  actions
};