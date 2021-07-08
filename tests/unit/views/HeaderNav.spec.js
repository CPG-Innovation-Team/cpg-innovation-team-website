import { mount } from '@vue/test-utils';
import HeaderNav from '@/components/HeaderNav.vue';
import Vue from 'vue';
import Vuetify from 'vuetify';
import VueI18n from 'vue-i18n';
import VueRouter from 'vue-router';

const vuetify = new Vuetify();

Vue.use(Vuetify);
Vue.use(VueI18n);
Vue.use(VueRouter);

describe('Navigation bar', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(HeaderNav, {
      propsData: {},
      mocks: {
        $t: () => 'msg',
      },
      stubs: ['router-link'],
      vuetify,
    });
  });
  // it('funcation changeLang', () => {
  //   wrapper.vm.changeLang('locale', 'zh-CH');
  //   console.log(wrapper.vm.lang);
  //   expect(wrapper.vm.lang).toBe('zh-CH');
  // });
  it('HeaderNav is rendered', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('search functionality', () => {
    console.log(wrapper.vm.lang);
    let link = wrapper.vm.getRouterLink('CSIG15');
    expect(link).toBe('/recruitmentDetail?id=');
    link = wrapper.vm.getRouterLink('创新团队官网网站开发');
    expect(link).toBe('/projectInfo?id=');
    link = wrapper.vm.getRouterLink('错误');
    expect(link).toBe('/error');

    const id = wrapper.vm.getID('CSIG15');
    expect(id).toBe('001');
  });

  it('routers', () => {
    expect(wrapper.vm.routers[0].name).toBe('msg');
  });
});
