import Vue from 'vue';
import VueI18n from 'vue-i18n';
import zhCN from '../lang/zh-CN.json';
import enUS from '../lang/en-US.json';

Vue.use(VueI18n);

export default new VueI18n({
  locale: 'zh-CN', // 语言标识
  // this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS,
  },
});
