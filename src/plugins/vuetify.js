import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import en from '../locale/en';
import ru from '../locale/ru';

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: {
      en,
      ru,
    },
    current: 'en',
  },
});
