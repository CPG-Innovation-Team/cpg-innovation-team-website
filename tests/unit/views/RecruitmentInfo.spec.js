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

  it('Sort() method should return an array with latest date to the oldest', () => {
    const arr = [
      { id: '01', time: '2020-03-18' },
      { id: '02', time: '2020-09-10' },
      { id: '03', time: '2021-06-30' },
      { id: '04', time: '2021-03-03' },
    ];
    const result = [
      { id: '03', time: '2021-06-30' },
      { id: '04', time: '2021-03-03' },
      { id: '02', time: '2020-09-10' },
      { id: '01', time: '2020-03-18' },
    ];
    const sortedArr = wrapper.vm.sort(arr);
    expect(sortedArr).toStrictEqual(result);
  });

  it('Filter should return an array that matches with corresponding tags', () => {
    const arr = [
      { id: '01', position: '技术类', city: '上海', type: '社会招聘' },
      { id: '02', position: '产品类', city: '北京', type: '社会招聘' },
      { id: '03', position: '产品类', city: '深圳', type: '社会招聘' },
      { id: '04', position: '人力资源类', city: '广州', type: '校园招聘' },
    ];

    // 全部城市
    const result1 = [
      { id: '02', position: '产品类', city: '北京', type: '社会招聘' },
      { id: '03', position: '产品类', city: '深圳', type: '社会招聘' },
    ];
    let filteredArr = wrapper.vm.filter(arr, '产品类', '全部城市', '社会招聘');
    expect(filteredArr).toStrictEqual(result1);

    // 全部职位
    const result2 = [{ id: '03', position: '产品类', city: '深圳', type: '社会招聘' }];
    filteredArr = wrapper.vm.filter(arr, '全部职位', '深圳', '社会招聘');
    expect(filteredArr).toStrictEqual(result2);

    // 全部类型
    const result3 = [{ id: '04', position: '人力资源类', city: '广州', type: '校园招聘' }];
    filteredArr = wrapper.vm.filter(arr, '人力资源类', '广州', '全部类型');
    expect(filteredArr).toStrictEqual(result3);

    // custom
    const result4 = [{ id: '02', position: '产品类', city: '北京', type: '社会招聘' }];
    filteredArr = wrapper.vm.filter(arr, '产品类', '北京', '社会招聘');
    expect(filteredArr).toStrictEqual(result4);

    // 全部城市、全部类型
    const result5 = [
      { id: '02', position: '产品类', city: '北京', type: '社会招聘' },
      { id: '03', position: '产品类', city: '深圳', type: '社会招聘' },
    ];
    filteredArr = wrapper.vm.filter(arr, '产品类', '全部城市', '全部类型');
    expect(filteredArr).toStrictEqual(result5);

    // 全部职位、全部类型
    const result6 = [{ id: '01', position: '技术类', city: '上海', type: '社会招聘' }];
    filteredArr = wrapper.vm.filter(arr, '全部职位', '上海', '全部类型');
    expect(filteredArr).toStrictEqual(result6);

    // 全部职位、全部城市
    const result7 = [
      { id: '01', position: '技术类', city: '上海', type: '社会招聘' },
      { id: '02', position: '产品类', city: '北京', type: '社会招聘' },
      { id: '03', position: '产品类', city: '深圳', type: '社会招聘' },
    ];
    filteredArr = wrapper.vm.filter(arr, '全部职位', '全部城市', '社会招聘');
    expect(filteredArr).toStrictEqual(result7);

    // 全部职位、全部城市、全部类型
    const result8 = [
      { id: '01', position: '技术类', city: '上海', type: '社会招聘' },
      { id: '02', position: '产品类', city: '北京', type: '社会招聘' },
      { id: '03', position: '产品类', city: '深圳', type: '社会招聘' },
      { id: '04', position: '人力资源类', city: '广州', type: '校园招聘' },
    ];
    filteredArr = wrapper.vm.filter(arr, '全部职位', '全部城市', '全部类型');
    expect(filteredArr).toStrictEqual(result8);
  });

  it('Pass 3 as the num to handlePageChange() the router should redirects to page 3', async () => {
    wrapper.vm.handlePageChange(3);
    await wrapper.vm.$nextTick();
    expect(router.currentRoute.fullPath).toBe('/recruitmentInfo?page=3');
  });
});
