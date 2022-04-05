import { shallowMount, createLocalVue } from '@vue/test-utils';
import CreateBlog from '@/views/admin/CreateBlog.vue';
import VueRouter from 'vue-router';

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe('Admin create blog page', () => {
  const wrapper = shallowMount(CreateBlog, { localVue, router });
  it('The adminNav bar and axios is rendered', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Triggering submit() sets up the dialog', () => {
    wrapper.vm.submit();
    expect(wrapper.vm.failureDialog).toBe(false);
  });
});
