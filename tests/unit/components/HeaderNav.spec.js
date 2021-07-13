import { mount } from '@vue/test-utils';
import HeaderNav from '@/components/HeaderNav.vue';
import i18n from '@/plugins/vue-i18n';
import Vue from 'vue';
import Vuetify from 'vuetify';
import VueI18n from 'vue-i18n';
import VueRouter from 'vue-router';

const vuetify = new Vuetify();
const router = new VueRouter();

Vue.use(Vuetify);
Vue.use(VueI18n);
Vue.use(VueRouter);

// console.log(i18n.messages);

describe('Navigation bar', () => {
  let wrapper;
  // const mockRoute = {
  //   params: {
  //     id: 1,
  //   },
  // };
  // const mockRouter = {
  //   push: jest.fn(),
  // };
  beforeEach(() => {
    wrapper = mount(HeaderNav, {
      mocks: {
        $t: (msg) => i18n.messages['zh-CN'][msg],
        // $router: mockRouter,
        // $route: mockRoute,
      },
      stubs: ['router-link', 'router-view'],
      vuetify,
      router,
    });
  });

  it('HeaderNav is rendered', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('functions for searching is returing correct values', () => {
    let link = wrapper.vm.getRouterLink('CSIG15');
    expect(link).toBe('/recruitmentDetail?id=');
    link = wrapper.vm.getRouterLink('创新团队官网网站开发');
    expect(link).toBe('/projectInfo?id=');
    link = wrapper.vm.getRouterLink('错误');
    expect(link).toBe('/error');

    const id = wrapper.vm.getID('CSIG15');
    expect(id).toBe('001');
  });

  it('navigation drawer', () => {
    const drawer = wrapper.find('.v-btn__content .v-icon');
    drawer.trigger('click');
    expect(wrapper.vm.drawer).toBe(true);

    // console.log(wrapper.html());
    // const button = wrapper.findAll('.nav-link .v-btn__content').at(0);
    // console.log('text: ', button.html());
    // button.trigger('click');
    // expect(wrapper.vm.drawer).toBe(false);
  });

  it('change language', () => {
    // console.log(wrapper.vm.lang);
    // const button = wrapper.findAll('.language-setting').at(0);
    // button.trigger('click');
    // console.log(wrapper.html());
    // console.log(wrapper.classes('.v-list-item__content'));
    // expect(wrapper.classes()).toContain('language-setting');
    // expect(wrapper.vm.lang).toBe('Eng');
  });
});
