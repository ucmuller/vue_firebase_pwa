import Vue from 'vue'
import Vuex from 'vuex'
import types from './mutation-types'
import userAuth from './modules/userAuth'
import invite from './modules/invite'
import reservation from './modules/reservation'
import admin from './modules/admin'
import referral from './modules/referral'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const modules = {
  userAuth: userAuth,
  invite: invite,
  reservation: reservation,
  admin: admin,
  referral: referral
}


export const store = new Vuex.Store({
  modules: modules,
  plugins: [createPersistedState({key: 'Guluri'})]
})