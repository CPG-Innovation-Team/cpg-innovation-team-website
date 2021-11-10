import { shallowMount, mount } from '@vue/test-utils';
import Profile from '@/views/admin/Profile.vue';
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

  it('save() is triggered by button', async () => {
    const wrapper = mount(Profile, { router, vuetify });
    const button = wrapper.find('.v-btn');
    await button.trigger('click');

    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:8080/admin/user/update/info',
      {
        uid: '',
        username: '',
        email: '',
        passCode: '123456',
        passwd: '',
        nickname: '',
        avatar: '',
        gender: '',
        introduce: '',
        state: '',
      },
      {
        headers: {
          token: '',
        },
      }
    );
  });
});
