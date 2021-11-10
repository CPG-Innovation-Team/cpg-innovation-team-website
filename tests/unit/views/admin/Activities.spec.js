import { shallowMount } from '@vue/test-utils';
import Activities from '@/views/admin/Activities.vue';

describe('Admin activities page', () => {
  it('The adminNav is rendered', () => {
    const wrapper = shallowMount(Activities);
    expect(wrapper.exists()).toBe(true);
  });
});
