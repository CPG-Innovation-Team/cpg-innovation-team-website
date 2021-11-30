import { shallowMount, mount } from '@vue/test-utils';
import Signup from '@/views/admin/Signup.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import axios from 'axios';

Vue.use(VueRouter);
const router = new VueRouter();
const vuetify = new Vuetify();

jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({ data: {} })),
}));
const $t = () => {
  'msg';
};

describe('User sign up page', () => {
  it('Axios is rendered', () => {
    const wrapper = shallowMount(Signup);
    expect(wrapper.exists()).toBe(true);
  });

  it('signup() is triggered by button', async () => {
    const wrapper = mount(Signup, { mocks: { $t }, router, vuetify });
    const button = wrapper.find('.v-btn');
    await button.trigger('click');

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/register', {
      username: '',
      nickname: '',
      email: '',
      passCode: '123456',
      passwd: '',
    });
  });
});
