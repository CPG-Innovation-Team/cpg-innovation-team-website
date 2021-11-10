import { shallowMount, mount } from '@vue/test-utils';
import Users from '@/views/admin/Users.vue';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import Vue from 'vue';
import axios from 'axios';

const router = new VueRouter();
const vuetify = new Vuetify();

Vue.use(VueRouter);

jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({ data: {} })),
}));

describe('Admin users page', () => {
  let wrapper = shallowMount(Users, { router });
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

  wrapper = mount(Users, { router, vuetify });
  it('save() is triggered by button', async () => {
    const button = wrapper.find('#save');
    await button.trigger('click');

    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:8080/admin/user/query/list',
      { state: 1 },
      { headers: { token: '' } }
    );
  });

  it('saveRole() is triggered by button', async () => {
    const button = wrapper.find('#saveRole');
    await button.trigger('click');

    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:8080/admin/auth/add/role',
      { rName: '' },
      { headers: { token: '' } }
    );
  });

  it('savePermission() is triggered by button', async () => {
    const button = wrapper.find('#savePermission');
    await button.trigger('click');

    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:8080/admin/auth/add/permission',
      { pName: '', uri: '' },
      { headers: { token: '' } }
    );
  });

  it('deleteRole() is triggered by button', async () => {
    const button = wrapper.find('#deleteRole');
    await button.trigger('click');

    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:8080/admin/auth/delete/role',
      { rName: '' },
      { headers: { token: '' } }
    );
  });

  it('deletePermission() is triggered by button', async () => {
    const button = wrapper.find('#deletePermission');
    await button.trigger('click');

    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:8080/admin/auth/delete/permission',
      { pName: '' },
      { headers: { token: '' } }
    );
  });
});
