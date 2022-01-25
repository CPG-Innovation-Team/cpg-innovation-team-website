import { shallowMount } from '@vue/test-utils';
import TeamInfo from '@/views/TeamInfo.vue';

describe('Team info page', () => {
  it('The headerNav is rendered', () => {
    const wrapper = shallowMount(TeamInfo);
    expect(wrapper.exists()).toBe(true);
  });
});
