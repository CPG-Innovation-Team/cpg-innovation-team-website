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

  it('Triggering editItem() set up the dialog', () => {
    const item = { username: 'item' };
    wrapper.vm.editItem(item);
    expect(wrapper.vm.dialog).toBe(true);
    expect(wrapper.vm.editedItem).toBe(item);
    expect(wrapper.vm.username).toBe(item.username);
  });

  it('Triggering close() closes the dialog', () => {
    wrapper.vm.close();
    expect(wrapper.vm.dialog).toBe(false);
    expect(wrapper.vm.successDialog).toBe(false);
    expect(wrapper.vm.failureDialog).toBe(false);
  });
});
