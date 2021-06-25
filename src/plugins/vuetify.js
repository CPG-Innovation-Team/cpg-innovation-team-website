import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import zhHans from 'vuetify/lib/locale/zh-Hans';
import BaiduMap from 'vue-baidu-map';

Vue.use(Vuetify);
Vue.use(BaiduMap, {
  ak: 'OLlbwIlG5ovWtUBiIMCQXH9jsAWGh54r',
});

export default new Vuetify({
  lang: {
    locales: { zhHans },
    current: 'zhHans',
  },
});
