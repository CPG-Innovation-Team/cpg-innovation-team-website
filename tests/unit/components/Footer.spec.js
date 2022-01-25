import { mount } from '@vue/test-utils';
import Footer from '@/components/Footer.vue';
import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n';
import Vuetify from 'vuetify';
import Vue from 'vue';
import i18n from '@/plugins/vue-i18n';

const vuetify = new Vuetify();
const router = new VueRouter();

Vue.use(Vuetify);
Vue.use(VueI18n);
Vue.use(VueRouter);

describe('Footer page', () => {
  it('The footer is rendered', () => {
    const wrapper = mount(Footer, {
      mocks: {
        $t: (msg) => i18n.messages['zh-CN'][msg],
      },
      vuetify,
      router,
    });
    expect(wrapper.exists()).toBe(true);
  });
});
