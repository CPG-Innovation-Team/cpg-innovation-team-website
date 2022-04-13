import { shallowMount } from '@vue/test-utils';
import Users from '@/views/admin/Users.vue';
import VueRouter from 'vue-router';
import Vue from 'vue';

const router = new VueRouter();

Vue.use(VueRouter);

jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({ data: {} })),
}));

describe('Admin users page', () => {
  const wrapper = shallowMount(Users, { router });
  it('The adminNav is rendered', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
