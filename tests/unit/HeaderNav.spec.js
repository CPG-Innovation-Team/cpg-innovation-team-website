import { shallowMount } from '@vue/test-utils';
import HeaderNav from '@/components/HeaderNav.vue';

describe('test header', () => {
  it('renders props.msg when passed', () => {
    const msg = 'home';
    const wrapper = shallowMount(HeaderNav, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
