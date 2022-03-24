import { mount } from '@vue/test-utils';
import Signup from '@/views/admin/Signup.vue';
import Vue from 'vue';
import i18n from '@/plugins/vue-i18n';
import VueI18n from 'vue-i18n';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
Vue.use(VueI18n);
Vue.use(Vuetify);

const vuetify = new Vuetify();
const router = new VueRouter();

describe('User sign up page', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(Signup, {
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
});
