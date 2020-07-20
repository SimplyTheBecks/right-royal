import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentLocale: 'en',
    routeName: '',
  },
  mutations: {
    setCurrentLocale(state, value = 'en') {
      state.currentLocale = value;
    },
    setRouteName(state, value = '') {
      state.routeName = value;
    },
  },
  actions: {
  },
  modules: {
  },
});
