// import Vue from 'vue'
// import Vuex from 'vuex'
import types from '../mutation-types'

// Vue.use(Vuex);


const state = {
  allReservationData: null,
  reservationData: null,
  reservationDataStatus: false,
  reservationdataLength: null
}

const mutations = {
  [types.RESERVATIONDATA](state, data) {
    state.allReservationData = data;
  },
  [types.RESERVATIONDATACHANGED](state, data) {
    state.reservationData = data;
    state.reservationDataStatus = true;
  },
  [types.RESERVATIONDATALENGTH](state, data) {
    state.reservationdataLength = data;
  },
  [types.RESERVATIONCLEAR](state) {
    state.allReservationData = null;
    state.reservationData = null;
    state.reservationDataStatus = false;
    state.reservationdataLength = null;
  },
}

const getters = {
  allReservationData(state) {
    return state.allReservationData
  },
  reservationData(state) {
    return state.reservationData
  },
  reservationDataStatus(state){
    return state.reservationDataStatus
  },
  reservationdataLength(state){
    return state.reservationdataLength
  }
}

const actions = {
  reservationData({ commit }, data){
    commit(types.RESERVATIONDATA, data)
  },
  reservationDataChanged({ commit }, data){
    commit(types.RESERVATIONDATACHANGED, data)
  },
  reservationDataLength({ commit }, data){
    commit(types.RESERVATIONDATALENGTH, data)
  },
  reservationClear({ commit }){
    commit(types.RESERVATIONCLEAR)
  },
}


export default {
  state,
  mutations,
  getters,
  actions
};