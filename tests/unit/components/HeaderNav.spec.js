import { mount } from '@vue/test-utils';
import HeaderNav from '@/components/HeaderNav.vue';
import Vue from 'vue';
import Vuetify from 'vuetify';
import VueI18n from 'vue-i18n';
import VueRouter from 'vue-router';

const vuetify = new Vuetify();
const router = new VueRouter();

Vue.use(Vuetify);
Vue.use(VueI18n);
Vue.use(VueRouter);

describe('Navigation bar', () => {
  let wrapper;
  const mockRoute = {
    params: {
      id: 1,
    },
  };
  const mockRouter = {
    push: jest.fn(),
  };
  beforeEach(() => {
    wrapper = mount(HeaderNav, {
      propsData: { searchText: 'asd' },
      mocks: {
        $t: () => 'msg',
        $router: mockRouter,
        $route: mockRoute,
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

    // const button = wrapper.find('.v-list-item__content .nav-link');
    // button.trigger('click');
    // expect(wrapper.vm.drawer).toBe(false);
  });

  // it('change language', () => {
  //   const button = wrapper.findAll('.v-list-item__content').at(5);
  //   console.log(button.text());
  //   button.trigger('click');
  //   expect(wrapper.vm.lang).toBe('Eng');
  // });
});
