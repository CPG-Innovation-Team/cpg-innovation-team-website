import Vue from 'vue';
import BaiduMap from 'vue-baidu-map';
import VueDOMPurifyHTML from 'vue-dompurify-html';
import Rollbar from 'rollbar';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import i18n from './plugins/vue-i18n';
import '../node_modules/flag-icons/css/flag-icons.css';

Vue.config.productionTip = false;

Vue.use(VueDOMPurifyHTML, {
  default: {
    ADD_TAGS: ['iframe'],
  },
});

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

new Vue({
  router,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
