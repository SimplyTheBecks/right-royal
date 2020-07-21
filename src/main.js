import Vue from 'vue';
import CountryFlag from 'vue-country-flag';
import loading from 'vuejs-loading-screen';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import makeServer from './server';
import 'font-awesome/css/font-awesome.css';

Vue.component('country-flag', CountryFlag);
Vue.use(loading, {
  bg: '#616161b3',
  icon: 'spinner',
  size: 3,
  icon_color: '#ffffff',
});

Vue.config.productionTip = false;

makeServer();

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
