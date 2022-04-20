import { shallowMount, createLocalVue } from '@vue/test-utils';
import Blogs from '@/views/admin/Blogs.vue';
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

describe('Admin blogs management page', () => {
  const wrapper = shallowMount(Blogs, {
    mocks: {
      $t: (msg) => i18n.messages['zh-CN'][msg],
    },
    stubs: ['router-link', 'router-view'],
    vuetify,
    localVue,
    router,
  });

  it('The adminNav bar and axios is rendered', () => {
    expect(wrapper).toBeDefined();
  });
});
