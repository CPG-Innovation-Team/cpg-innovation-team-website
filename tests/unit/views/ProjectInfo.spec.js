import { shallowMount } from '@vue/test-utils';
import ProjectInfo from '@/views/ProjectInfo.vue';
import Vue from 'vue';
import Vuetify from 'vuetify';
import VueI18n from 'vue-i18n';

const vuetify = new Vuetify();

Vue.use(Vuetify);
Vue.use(VueI18n);

describe('Home page', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(ProjectInfo, {
      mocks: {
        $t: () => 'msg',
      },
      vuetify,
    });
  });

  it('ProjectInfo is rendered', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
