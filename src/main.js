import Vue from 'vue';
import BaiduMap from 'vue-baidu-map';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import i18n from './plugins/vue-i18n';

Vue.config.productionTip = false;
// add the application key for accessing baidu map api
Vue.use(BaiduMap, {
  ak: 'OLlbwIlG5ovWtUBiIMCQXH9jsAWGh54r',
});
console.log(i18n);

new Vue({
  router,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
