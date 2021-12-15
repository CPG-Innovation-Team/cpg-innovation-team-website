import Vue from 'vue';
import BaiduMap from 'vue-baidu-map';
import CountryFlag from 'vue-country-flag';
import Rollbar from 'rollbar';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import i18n from './plugins/vue-i18n';

Vue.config.productionTip = false;

if (process.env.VUE_APP_ROLLBAR_ACCESS_TOKEN) {
  Vue.prototype.$rollbar = new Rollbar({
    accessToken: process.env.VUE_APP_ROLLBAR_ACCESS_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
  });

  Vue.config.errorHandler = (err, vm) => {
    vm.$rollbar.error(err);
    throw err;
  };
}

// add the application key for accessing baidu map api
Vue.use(BaiduMap, {
  ak: 'OLlbwIlG5ovWtUBiIMCQXH9jsAWGh54r',
});
Vue.component('country-flag', CountryFlag);

new Vue({
  router,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
