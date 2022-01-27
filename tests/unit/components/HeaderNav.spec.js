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

describe('Navigation bar works on mobile and international languages works', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(HeaderNav, {
      mocks: {
        $t: (msg) => i18n.messages['zh-CN'][msg],
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

  it('navigation drawer shows up when icon is clicked', () => {
    const drawer = wrapper.find('.v-btn__content .v-icon');
    drawer.trigger('click');
    expect(wrapper.vm.drawer).toBe(true);
  });

  it('getSearchItems() returns the array of titles', () => {
    const arr = [
      { id: '001', title: '1' },
      { id: '002', title: '2' },
      { id: '002', title: '3' },
    ];
    const output = ['1', '2', '3'];
    expect(wrapper.vm.getSearchItems(arr)).toEqual(output);
  });
});
