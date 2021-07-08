import { mount } from '@vue/test-utils';
import HeaderNav from '@/components/HeaderNav.vue';
import Vue from 'vue';
import Vuetify from 'vuetify';
import VueI18n from 'vue-i18n';
import VueRouter from 'vue-router';

const vuetify = new Vuetify();

Vue.use(Vuetify);
Vue.use(VueI18n);
Vue.use(VueRouter);

describe('Navigation bar', () => {
  it('HeaderNav is rendered', () => {
    const wrapper = mount(HeaderNav, {
      mocks: {
        $t: (msg) => msg,
      },
      stubs: ['router-link'],
      vuetify,
    });

    expect(wrapper.exists()).toBe(true);
  });
});
