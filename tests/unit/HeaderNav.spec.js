import { shallowMount } from '@vue/test-utils';
import HeaderNav from '@/components/HeaderNav.vue';

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(HeaderNav, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
