import { mount } from '@vue/test-utils';
import Blog from '@/views/Blog.vue';
import VueRouter from 'vue-router';
import Vue from 'vue';
import i18n from '@/plugins/vue-i18n';
import VueI18n from 'vue-i18n';
import Vuetify from 'vuetify';

Vue.use(VueRouter);
Vue.use(VueI18n);
Vue.use(Vuetify);
const router = new VueRouter();
const vuetify = new Vuetify();

describe('Blog page', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(Blog, {
      mocks: {
        $t: (msg) => i18n.messages['zh-CN'][msg],
      },
      stubs: ['router-link', 'router-view'],
      router,
      vuetify,
    });
  });
  it('The blog page is rendered', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
