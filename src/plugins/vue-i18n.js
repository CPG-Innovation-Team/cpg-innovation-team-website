import Vue from 'vue';
import VueI18n from 'vue-i18n';
import cn from '../lang/cn.json';
import en from '../lang/en.json';

Vue.use(VueI18n);

export default new VueI18n({
  locale: 'en-US', // 语言标识
  // this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages: {
    cn,
    en,
  },
});
