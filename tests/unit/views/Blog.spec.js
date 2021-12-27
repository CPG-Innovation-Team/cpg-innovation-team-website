import { shallowMount, createLocalVue } from '@vue/test-utils';
import Blog from '@/views/Blog.vue';
import VueRouter from 'vue-router';
import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueRouter);
Vue.use(VueI18n);
const router = new VueRouter();

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
});
