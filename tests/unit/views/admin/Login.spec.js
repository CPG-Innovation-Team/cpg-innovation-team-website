import { mount, shallowMount } from '@vue/test-utils';
import Login from '@/views/admin/Login.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
const router = new VueRouter();

jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({ data: {} })),
}));

describe('User login page', () => {
  it('Axios is rendered', () => {
    const wrapper = shallowMount(Login);
    expect(wrapper.exists()).toBe(true);
  });

  it('login api is triggered, set dialog to true if username is empty', async () => {
    const wrapper = mount(Login, { router });
    const button = wrapper.find('.v-btn');
    await button.trigger('click');
    expect(wrapper.vm.dialog).toBe(true);
  });
});
