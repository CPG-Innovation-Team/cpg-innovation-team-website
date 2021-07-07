import { shallowMount } from '@vue/test-utils';
import AboutUs from '@/views/AboutUs.vue';

describe('About us page', () => {
  // The code below is only a template but not recommended, try to improve it!
  it('Run openInfoWindow with false parameter then set the showInfoWindow variable to false', () => {
    const wrapper = shallowMount(AboutUs);
    wrapper.vm.openInfoWindow(false);
    expect(wrapper.vm.$data.showInfoWindow).toBe(false);
  });
});
