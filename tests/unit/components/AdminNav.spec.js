import { shallowMount, createLocalVue } from '@vue/test-utils';
import AdminNav from '@/components/AdminNav.vue';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';

const vuetify = new Vuetify();

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe('Admin nav page', () => {
  it('Admin navbar is rendered', () => {
    const wrapper = shallowMount(AdminNav, { localVue, router, vuetify });
    expect(wrapper.exists()).toBe(true);
  });
});
