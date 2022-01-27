import { shallowMount, createLocalVue } from '@vue/test-utils';
import Blogs from '@/views/admin/Blogs.vue';
import VueRouter from 'vue-router';

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe('Admin blogs management page', () => {
  const wrapper = shallowMount(Blogs, { localVue, router });
  it('The adminNav bar and axios is rendered', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
