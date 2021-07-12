import { shallowMount, createLocalVue } from '@vue/test-utils';
import SearchResults from '@/views/SearchResults.vue';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';

const vuetify = new Vuetify();
const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe('Search results page', () => {
  const wrapper = shallowMount(SearchResults, { localVue, router, vuetify });

  it('Pass an array of length 5 to getPageLength and should return 1', () => {
    const arr = [1, 2, 3, 4, 5];
    const length = wrapper.vm.getPageLength(arr);
    expect(length).toBe(1);
  });

  it('Pass 5 as the num to handlePageChange() the router should redirects to page 5', async () => {
    wrapper.vm.handlePageChange(5);
    await wrapper.vm.$nextTick();
    expect(router.currentRoute.fullPath).toBe('/searchResults?page=5');
  });

  it('Filter function should return a list of items that matches with the input tag', () => {
    const arr = [
      { id: '001', tag: '职位' },
      { id: '002', tag: '项目' },
      { id: '003', tag: '职位' },
      { id: '004', tag: '项目' },
      { id: '005', tag: '职位' },
    ];
    // 所有
    let result = [
      { id: '001', tag: '职位' },
      { id: '002', tag: '项目' },
      { id: '003', tag: '职位' },
      { id: '004', tag: '项目' },
      { id: '005', tag: '职位' },
    ];
    let filteredArr = wrapper.vm.filter(arr, '所有');
    expect(filteredArr).toStrictEqual(result);

    // 职位
    result = [
      { id: '001', tag: '职位' },
      { id: '003', tag: '职位' },
      { id: '005', tag: '职位' },
    ];
    filteredArr = wrapper.vm.filter(arr, '职位');
    expect(filteredArr).toStrictEqual(result);

    // 项目
    result = [
      { id: '002', tag: '项目' },
      { id: '004', tag: '项目' },
    ];
    filteredArr = wrapper.vm.filter(arr, '项目');
    expect(filteredArr).toStrictEqual(result);
  });

  it('getRouterLink() should return the corresponding router link with respect to the input tag', () => {
    expect(wrapper.vm.getRouterLink('职位')).toEqual('/recruitmentDetail');
    expect(wrapper.vm.getRouterLink('项目')).toEqual('/projectInfo');
    expect(wrapper.vm.getRouterLink('错误')).toEqual('/error');
  });

  it('link() should redirects to the page with the query string id', () => {
    wrapper.vm.link('职位', 'c001');
    expect(router.currentRoute.fullPath).toBe('/recruitmentDetail?id=001');
    wrapper.vm.link('项目', 'p008');
    expect(router.currentRoute.fullPath).toBe('/projectInfo?id=008');
  });
});
