import { mount } from '@vue/test-utils';
import Profile from '@/views/admin/Profile.vue';
import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import i18n from '@/plugins/vue-i18n';
import VueI18n from 'vue-i18n';

Vue.use(VueRouter);
Vue.use(VueI18n);

const router = new VueRouter();
const vuetify = new Vuetify();

jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({ data: {} })),
}));

describe('Admin profile page', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(Profile, {
      mocks: {
        $t: (msg) => i18n.messages['zh-CN'][msg],
      },
      stubs: ['router-link', 'router-view'],
      vuetify,
      router,
    });
  });

  it('The adminNav bar and axios is rendered', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
