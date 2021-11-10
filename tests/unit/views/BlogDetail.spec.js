import { mount } from '@vue/test-utils';
import BlogDetail from '@/views/BlogDetail.vue';
import VueRouter from 'vue-router';
import Vue from 'vue';
import Vuetify from 'vuetify';
import axios from 'axios';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);
const router = new VueRouter();
const vuetify = new Vuetify();

jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({ data: {} })),
}));

describe('Blog detail page', () => {
  Vue.use(VueRouter);
  const wrapper = mount(BlogDetail, {
    mocks: {
      $t: () => 'msg',
    },
    router,
    vuetify,
  });

  it('sendComment() is triggered by button', async () => {
    const button = wrapper.find('#sendComment');
    await button.trigger('click');
    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:8080/comment/add',
      {
        sn: NaN,
        content: '',
      },
      { headers: { token: '' } }
    );
  });
});
