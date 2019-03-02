import Vue from 'vue'
import Vuex from 'vuex'
import types from './mutation-types'
import userAuth from './modules/userAuth'
import invite from './modules/invite'
import reservation from './modules/reservation'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);


export const store = new Vuex.Store({
  modules: {
    userAuth: userAuth,
    invite: invite,
    reservation: reservation
  },
  plugins: [createPersistedState({key: 'Guluri'})]
})