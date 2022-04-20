import { shallowMount, createLocalVue } from '@vue/test-utils';
import CreateBlog from '@/views/admin/CreateBlog.vue';
import VueRouter from 'vue-router';
import i18n from '@/plugins/vue-i18n';
import Vuetify from 'vuetify';
import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);
Vue.use(Vuetify);

const localVue = createLocalVue();
localVue.use(VueRouter);

const router = new VueRouter();
const vuetify = new Vuetify();

describe('Admin create blog page', () => {
  const wrapper = shallowMount(CreateBlog, {
    mocks: {
      $t: (msg) => i18n.messages['zh-CN'][msg],
    },
    stubs: ['router-link', 'router-view'],
    vuetify,
    localVue,
    router,
  });
  it('The adminNav bar and axios is rendered', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Triggering submit() sets up the dialog', () => {
    wrapper.vm.submit();
    expect(wrapper.vm.failureDialog).toBe(false);
  });
});
