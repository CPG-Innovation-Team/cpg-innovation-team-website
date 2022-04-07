import { shallowMount, createLocalVue } from '@vue/test-utils';
import Dashboard from '@/views/admin/Dashboard.vue';
import VueRouter from 'vue-router';

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe('Admin dashboard page', () => {
  it('The adminNav bar is rendered', () => {
    const wrapper = shallowMount(Dashboard, { localVue, router });
    expect(wrapper.exists()).toBe(true);
  });
});
