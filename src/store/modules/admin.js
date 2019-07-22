import types from '../mutation-types'

const state = {
  everyStaffData: null,
  everyInviteData: null,
  everyReservationData: null,
  status: false,
  confirmedGuest: null
}

const mutations = {
  [types.ALLSTAFFDATA](state, data) {
    state.everyStaffData = data;
  },
  [types.ALLINVITEDATA](state, data) {
    state.everyInviteData = data;
  },
  [types.ALLRESERVATIONDATA](state, data) {
    state.everyReservationData = data;
  },
  [types.CONFIRMEDGUEST](state, data) {
    state.confirmedGuest = data;
  },
  [types.ADMINCLEAR](state) {
    state.everyStaffData = null;
    state.everyInviteData = null;
    state.everyReservationData = null;
    state.status = false;
  },
}

const getters = {
  everyStaffData(state) {
    return state.everyStaffData
  },
  everyInviteData(state) {
    return state.everyInviteData
  },
  everyReservationData(state) {
    return state.everyReservationData
  },
  confirmedGuest(state) {
    return state.confirmedGuest
  },
}

const actions = {
  fetchAllStaffData({ commit }, data){
    commit(types.ALLSTAFFDATA, data)
  },  
  fetchAllInviteData({ commit }, data){
    commit(types.ALLINVITEDATA, data)
  },  
  fetchAllReservationData({ commit }, data){
    commit(types.ALLRESERVATIONDATA, data)
  },  
  fetchConfirmedGuest({ commit }, data){
    commit(types.CONFIRMEDGUEST, data)
  },  
  adminClear({ commit }){
    commit(types.ADMINCLEAR)
  },  
}


export default {
  state,
  mutations,
  getters,
  actions
};