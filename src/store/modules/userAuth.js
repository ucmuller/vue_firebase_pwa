// import Vue from 'vue'
// import Vuex from 'vuex'
import types from '../mutation-types'

// Vue.use(Vuex);


const state = {
  user: null,
  status: false,
  imageURL: ''
}

const mutations = {
  [types.USER_ONAUTHSTATECHANGED](state, user) {
    state.user = user;
  },
  [types.USER_ONUSERSTATUSCHANGED](state, status) {
    state.status = status;
  },
  [types.USER_ONUSERIMAGECHANGED](state, imageURL) {
    state.imageURL = imageURL;
  }
}

const getters = {
  user(state) {
    return state.user
  },
  isSignedIn(state) {
    return state.status
  },
  imageURL(state){
    return state.imageURL
  }
}

const actions = {
  onAuth({ commit }, user){
    commit(types.USER_ONAUTHSTATECHANGED, user)
    commit(types.USER_ONUSERSTATUSCHANGED, user.staff_uid ? true : false);
  },
  getImageURL({ commit }, imageURL){
    commit(types.USER_ONUSERIMAGECHANGED, imageURL);
  },
  logout({ commit }, status){
    commit(types.USER_ONUSERSTATUSCHANGED, status);
  }
  
}


export default {
  state,
  mutations,
  getters,
  actions
};