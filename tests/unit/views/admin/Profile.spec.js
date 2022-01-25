import { shallowMount } from '@vue/test-utils';
import Profile from '@/views/admin/Profile.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({ data: {} })),
}));

describe('Admin profile page', () => {
  it('The adminNav bar and axios is rendered', () => {
    const wrapper = shallowMount(Profile);
    expect(wrapper.exists()).toBe(true);
  });

  it('showRole() returns `User` when isRoot is 0', () => {
    const wrapper = shallowMount(Profile);
    const output = wrapper.vm.showRole();
    expect(output).toBe('User');
  });
});
