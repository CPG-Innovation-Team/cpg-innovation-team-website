import { shallowMount, createLocalVue } from '@vue/test-utils';
import RecruitmentDetail from '@/views/RecruitmentDetail.vue';

const localVue = createLocalVue();

describe('Recruitment detail page with valid query id', () => {
  const $route = { path: '/recruitmentDetail', query: { id: '007' } };
  const wrapper = shallowMount(RecruitmentDetail, { localVue, mocks: { $route } });

  it('Get an existing query id and store it to index', () => {
    expect(wrapper.vm.index).toBe(6);
  });
});

describe('Recruitment detail page with invalid query id', () => {
  const $route = { path: '/recruitmentDetail', query: { id: '999' } };
  const wrapper = shallowMount(RecruitmentDetail, { localVue, mocks: { $route } });

  it('Get an existing query id and store it to index', () => {
    expect(wrapper.vm.index).toBe(0);
  });
});
