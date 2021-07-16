import { shallowMount } from '@vue/test-utils';
import Homepage from '@/views/Homepage.vue';
import Vue from 'vue';
import Vuetify from 'vuetify';
import VueI18n from 'vue-i18n';

const vuetify = new Vuetify();

Vue.use(Vuetify);
Vue.use(VueI18n);

describe('Home page', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Homepage, {
      mocks: {
        $t: () => 'msg',
      },
      vuetify,
    });
  });

  it('Homepage is rendered', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('news function exits', () => {
    expect(wrapper.vm.news[0].title).toBe('msg');
  });
});
