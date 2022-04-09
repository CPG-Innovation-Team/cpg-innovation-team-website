import { mount, createLocalVue } from '@vue/test-utils';
import AdminNav from '@/components/AdminNav.vue';
import VueRouter from 'vue-router';
import Vue from 'vue';
import Vuetify from 'vuetify';
import i18n from '@/plugins/vue-i18n';
import VueI18n from 'vue-i18n';

const vuetify = new Vuetify();
Vue.use(VueI18n);

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe('Admin nav page', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(AdminNav, {
      mocks: {
        $t: (msg) => i18n.messages['zh-CN'][msg],
      },
      stubs: ['router-link', 'router-view'],
      vuetify,
      router,
    });
  });
  it('Admin navbar is rendered', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
