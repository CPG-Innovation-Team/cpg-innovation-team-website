import { mount, shallowMount } from '@vue/test-utils';
import Login from '@/views/admin/Login.vue';
import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';

const vuetify = new Vuetify();
Vue.use(Vuetify);
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
    const wrapper = mount(Login, { router, vuetify });
    const button = wrapper.find('.v-btn');
    await button.trigger('click');
    expect(wrapper.vm.dialog).toBe(true);
  });
});
