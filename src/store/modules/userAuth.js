// import Vue from 'vue'
// import Vuex from 'vuex'
import types from '../mutation-types'

// Vue.use(Vuex);


const state = {
  user: null,
  status: false,
  imageURL: '',
  shopImageURL: '',
  loginState: ''
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
  },
  [types.USER_ONUSERSHOPIMAGECHANGED](state, shopImageURL) {
    state.shopImageURL = shopImageURL;
  },
  [types.USERAUTHCLEAR](state) {
    state.user = null;
    state.status = false;
    state.imageURL = '';
    state.shopImageURL = '';
    state.loginState = '';
  },
  [types.USERLOGINSTATE](state, message) {
    state.loginState = message;
  },
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
  },
  shopImageURL(state){
    return state.shopImageURL
  },
  loginState(state){
    return state.loginState
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
  getShopImageURL({ commit }, shopImageURL){
    commit(types.USER_ONUSERSHOPIMAGECHANGED, shopImageURL);
  },
  logout({ commit }, status){
    commit(types.USER_ONUSERSTATUSCHANGED, status);
    commit(types.USERAUTHCLEAR)
  },
  userAuthClear({ commit }){
    commit(types.USERAUTHCLEAR);
  },
  loginState({ commit }, message){
    commit(types.USERLOGINSTATE, message)
  }
  
}


export default {
  state,
  mutations,
  getters,
  actions
};