import types from '../mutation-types'

const state = {
  everyStaffData: null,
  everyInviteData: null,
  everyReservationData: null,
  status: false,
}

const mutations = {
  [types.ALLSTAFFDATA](state, everyStaffData) {
    state.everyStaffData = everyStaffData;
  },
  [types.ALLINVITEDATA](state, everyInviteData) {
    state.everyInviteData = everyInviteData;
  },
  [types.ALLRESERVATIONDATA](state, everyReservationData) {
    state.everyReservationData = everyReservationData;
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
}

const actions = {
  fetchAllStaffData({ commit }, everyStaffData){
    commit(types.ALLSTAFFDATA, everyStaffData)
  },  
  fetchAllInviteData({ commit }, everyInviteData){
    commit(types.ALLINVITEDATA, everyInviteData)
  },  
  fetchAllReservationData({ commit }, everyReservationData){
    commit(types.ALLRESERVATIONDATA, everyReservationData)
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