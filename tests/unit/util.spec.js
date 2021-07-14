import util from '@/util';

describe('Test util methods', () => {
  it('Pass an array of length 5 to getPageLength() in util should return 1', () => {
    const arr = [1, 2, 3, 4, 5];
    const length = util.getPageLength(arr);
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
    const sortedArr = util.sort(arr);
    expect(sortedArr).toStrictEqual(result);
  });
});
