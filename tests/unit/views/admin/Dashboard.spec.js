import { shallowMount } from '@vue/test-utils';
import Dashboard from '@/views/admin/Dashboard.vue';

describe('Admin dashboard page', () => {
  it('The adminNav bar is rendered', () => {
    const wrapper = shallowMount(Dashboard);
    expect(wrapper.exists()).toBe(true);
  });
});
