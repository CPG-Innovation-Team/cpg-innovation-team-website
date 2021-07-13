import { shallowMount, createLocalVue } from '@vue/test-utils';
import RecruitmentDetail from '@/views/RecruitmentDetail.vue';

describe('Recruitment detail page with valid query id', () => {
  const localVue = createLocalVue();

  it('Get an existing query id and store it to index', () => {
    const $route = { path: '/recruitmentDetail', query: { id: '007' } };
    const wrapper = shallowMount(RecruitmentDetail, { localVue, mocks: { $route } });
    expect(wrapper.vm.index).toBe(6);
  });

  it('Return 0 when the query id is invalid', () => {
    const $route = { path: '/recruitmentDetail', query: { id: '999' } };
    const wrapper = shallowMount(RecruitmentDetail, { localVue, mocks: { $route } });
    expect(wrapper.vm.index).toBe(0);
  });
});
