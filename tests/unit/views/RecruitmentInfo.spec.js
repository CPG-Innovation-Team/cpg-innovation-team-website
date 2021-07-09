import { shallowMount, createLocalVue } from '@vue/test-utils';
import RecruitmentInfo from '@/views/RecruitmentInfo.vue';
import VueRouter from 'vue-router';

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe('Recruitment info page', () => {
  const wrapper = shallowMount(RecruitmentInfo, { localVue, router });

  it('Pass an array of length 5 to getPageLength and should return 1', () => {
    const arr = [1, 2, 3, 4, 5];
    const length = wrapper.vm.getPageLength(arr);
    expect(length).toBe(1);
  });
});
