import { shallowMount, createLocalVue } from '@vue/test-utils';
import RecruitmentInfo from '@/views/RecruitmentInfo.vue';
import VueRouter from 'vue-router';

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe('Recruitment info page', () => {
  const wrapper = shallowMount(RecruitmentInfo, { localVue, router });

  it('Filter should return an array that matches with corresponding tags', () => {
    const arr = [
      { id: '01', position: '技术类', city: '上海', type: '社会招聘' },
      { id: '02', position: '产品类', city: '北京', type: '社会招聘' },
      { id: '03', position: '产品类', city: '深圳', type: '社会招聘' },
      { id: '04', position: '人力资源类', city: '广州', type: '校园招聘' },
    ];

    // 全部城市
    let result = [
      { id: '02', position: '产品类', city: '北京', type: '社会招聘' },
      { id: '03', position: '产品类', city: '深圳', type: '社会招聘' },
    ];
    let filteredArr = wrapper.vm.filter(arr, '产品类', '全部城市', '社会招聘');
    expect(filteredArr).toStrictEqual(result);

    // 全部职位
    result = [{ id: '03', position: '产品类', city: '深圳', type: '社会招聘' }];
    filteredArr = wrapper.vm.filter(arr, '全部职位', '深圳', '社会招聘');
    expect(filteredArr).toStrictEqual(result);

    // 全部类型
    result = [{ id: '04', position: '人力资源类', city: '广州', type: '校园招聘' }];
    filteredArr = wrapper.vm.filter(arr, '人力资源类', '广州', '全部类型');
    expect(filteredArr).toStrictEqual(result);

    // custom
    result = [{ id: '02', position: '产品类', city: '北京', type: '社会招聘' }];
    filteredArr = wrapper.vm.filter(arr, '产品类', '北京', '社会招聘');
    expect(filteredArr).toStrictEqual(result);

    // 全部城市、全部类型
    result = [
      { id: '02', position: '产品类', city: '北京', type: '社会招聘' },
      { id: '03', position: '产品类', city: '深圳', type: '社会招聘' },
    ];
    filteredArr = wrapper.vm.filter(arr, '产品类', '全部城市', '全部类型');
    expect(filteredArr).toStrictEqual(result);

    // 全部职位、全部类型
    result = [{ id: '01', position: '技术类', city: '上海', type: '社会招聘' }];
    filteredArr = wrapper.vm.filter(arr, '全部职位', '上海', '全部类型');
    expect(filteredArr).toStrictEqual(result);

    // 全部职位、全部城市
    result = [
      { id: '01', position: '技术类', city: '上海', type: '社会招聘' },
      { id: '02', position: '产品类', city: '北京', type: '社会招聘' },
      { id: '03', position: '产品类', city: '深圳', type: '社会招聘' },
    ];
    filteredArr = wrapper.vm.filter(arr, '全部职位', '全部城市', '社会招聘');
    expect(filteredArr).toStrictEqual(result);

    // 全部职位、全部城市、全部类型
    result = [
      { id: '01', position: '技术类', city: '上海', type: '社会招聘' },
      { id: '02', position: '产品类', city: '北京', type: '社会招聘' },
      { id: '03', position: '产品类', city: '深圳', type: '社会招聘' },
      { id: '04', position: '人力资源类', city: '广州', type: '校园招聘' },
    ];
    filteredArr = wrapper.vm.filter(arr, '全部职位', '全部城市', '全部类型');
    expect(filteredArr).toStrictEqual(result);
  });

  it('When not on the first page, press filter() will redirects to page 1', () => {
    wrapper.vm.handlePageChange(3);
    const arr = [
      { id: '01', position: '技术类', city: '上海', type: '社会招聘' },
      { id: '02', position: '产品类', city: '北京', type: '社会招聘' },
      { id: '03', position: '产品类', city: '深圳', type: '社会招聘' },
      { id: '04', position: '人力资源类', city: '广州', type: '校园招聘' },
    ];
    wrapper.vm.filter(arr, '产品类', '全部城市', '社会招聘');
    expect(router.currentRoute.fullPath).toBe('/recruitmentInfo?page=1');
  });

  it('Pass 3 as the num to handlePageChange() the router should redirects to page 3', async () => {
    wrapper.vm.handlePageChange(3);
    await wrapper.vm.$nextTick();
    expect(router.currentRoute.fullPath).toBe('/recruitmentInfo?page=3');
  });
});
