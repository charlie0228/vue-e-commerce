import Vue from 'vue';
import Vuex from 'vuex';
// import axios from 'axios';

import cartModules from './carts';
import productModules from './products';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: true,
  },
  actions: {
    updateLoading(context, status) {
      context.commit('LOADING', status);
    },
  },
  mutations: {
    LOADING(state, status) {
      state.isLoading = status;
    },
  },
  getters: {
    isLoading: state => state.isLoading,
  },
  modules: {
    cartModules,
    productModules,
  },
});
