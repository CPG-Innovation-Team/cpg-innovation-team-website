import { shallowMount, createLocalVue, mount } from '@vue/test-utils';
import Blog from '@/views/Blog.vue';
import VueRouter from 'vue-router';
import Vue from 'vue';
import Vuetify from 'vuetify';
import axios from 'axios';
import VueI18n from 'vue-i18n';

Vue.use(VueRouter);
Vue.use(VueI18n);
const router = new VueRouter();
const vuetify = new Vuetify();

jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({ data: {} })),
}));

const localVue = createLocalVue();
localVue.use(VueRouter);

describe('Blog page', () => {
  it('The headerNav and axios is rendered', () => {
    const wrapper = shallowMount(Blog, { localVue, router });
    expect(wrapper.exists()).toBe(true);
  });

  it('getArticleList is completed during created()', async () => {
    const wrapper = mount(Blog, {
      mocks: {
        $t: () => 'msg',
      },
      router,
      vuetify,
    });
    wrapper.find('.v-btn');

    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:8080/admin/article/list',
      {
        article: {
          state: 1,
        },
      },
      {
        headers: {
          token: undefined,
        },
      }
    );
  });
});
