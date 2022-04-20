import { shallowMount, createLocalVue } from '@vue/test-utils';
import Users from '@/views/admin/Users.vue';
import Vue from 'vue';
import i18n from '@/plugins/vue-i18n';
import Vuetify from 'vuetify';
import VueI18n from 'vue-i18n';
import VueRouter from 'vue-router';

Vue.use(VueI18n);
Vue.use(Vuetify);

const localVue = createLocalVue();
localVue.use(VueRouter);

const router = new VueRouter();
const vuetify = new Vuetify();

jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({ data: {} })),
}));

describe('Admin users page', () => {
  const wrapper = shallowMount(Users, {
    mocks: {
      $t: (msg) => i18n.messages['zh-CN'][msg],
    },
    stubs: ['router-link', 'router-view'],
    vuetify,
    localVue,
    router,
  });

  it('The adminNav is rendered', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
