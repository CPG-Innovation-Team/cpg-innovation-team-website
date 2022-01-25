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

  it('Triggering closeDialog() closes the dialog', () => {
    wrapper.vm.closeDialog();
    expect(wrapper.vm.dialog).toBe(false);
    expect(router.currentRoute.fullPath).toBe('/admin/blogs');
  });

  it('Triggering submit() sets up the dialog', () => {
    wrapper.vm.submit();
    expect(wrapper.vm.dialog).toBe(true);
  });
});
