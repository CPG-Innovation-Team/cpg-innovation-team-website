import { shallowMount } from '@vue/test-utils';
import Signup from '@/views/admin/Signup.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

describe('User sign up page', () => {
  it('Axios is rendered', () => {
    const wrapper = shallowMount(Signup);
    expect(wrapper.exists()).toBe(true);
  });
});
