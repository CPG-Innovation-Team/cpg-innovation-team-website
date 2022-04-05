import { mount } from '@vue/test-utils';
import Login from '@/views/admin/Login.vue';
import Vue from 'vue';
import Vuetify from 'vuetify';
import i18n from '@/plugins/vue-i18n';
import VueI18n from 'vue-i18n';
import VueRouter from 'vue-router';

Vue.use(Vuetify);
Vue.use(VueRouter);
Vue.use(VueI18n);
const router = new VueRouter();
const vuetify = new Vuetify();

jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({ data: {} })),
}));

document.body.setAttribute('data-app', true);

describe('User login page', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(Login, {
      mocks: {
        $t: (msg) => i18n.messages['zh-CN'][msg],
      },
      stubs: ['router-link', 'router-view'],
      vuetify,
      router,
    });
  });
  it('Axios is rendered', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('login api is triggered, set dialog to true if username is empty', async () => {
    const button = wrapper.find('.v-btn');
    await button.trigger('click');
    expect(wrapper.vm.dialog).toBe(true);
  });
});
