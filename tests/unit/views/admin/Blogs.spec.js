import { shallowMount, createLocalVue } from '@vue/test-utils';
import Blogs from '@/views/admin/Blogs.vue';
import VueRouter from 'vue-router';

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe('Admin blogs management page', () => {
  const wrapper = shallowMount(Blogs, { localVue, router });
  it('The adminNav bar and axios is rendered', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Triggering close() closes the dialog', () => {
    wrapper.vm.close();
    expect(wrapper.vm.deleteDialog).toBe(false);
    expect(wrapper.vm.updateDialog).toBe(false);
  });

  it('editDeleteArticle() sets up the delete dialog and store the article to a temp variable', () => {
    const item = 'item';
    wrapper.vm.editDeleteArticle(item);
    expect(wrapper.vm.deleteDialog).toBe(true);
    expect(wrapper.vm.editArticle).toBe(item);
  });

  it('editUpdateArticle() sets up the update dialog and store the article to a temp variable', () => {
    const item = { title: 'title', cover: 'cover', tags: 'tags', content: 'content' };
    wrapper.vm.editUpdateArticle(item);
    expect(wrapper.vm.updateDialog).toBe(true);
    expect(wrapper.vm.editArticle).toBe(item);
    expect(wrapper.vm.title).toBe('title');
    expect(wrapper.vm.cover).toBe('cover');
    expect(wrapper.vm.tags).toBe('tags');
    expect(wrapper.vm.content).toBe('content');
  });
});
