import Vue from 'vue'
import Vuex from 'vuex'
import types from './mutation-types'
import userAuth from './modules/userAuth'
import invite from './modules/invite'
import reservation from './modules/reservation'
import admin from './modules/admin'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);


export const store = new Vuex.Store({
  modules: {
    userAuth: userAuth,
    invite: invite,
    reservation: reservation,
    admin: admin
  },
  plugins: [createPersistedState({key: 'Guluri'})]
})