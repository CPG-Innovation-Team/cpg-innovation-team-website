export default {
  getPageLength(arr) {
    return Math.ceil(arr.length / 10);
  },
  sort(arr) {
    const temp = [...arr];
    temp.sort((a, b) => {
      const t1 = new Date(Date.parse(a.time.replace(/-/g, '/')));
      const t2 = new Date(Date.parse(b.time.replace(/-/g, '/')));
      return t2.getTime() - t1.getTime();
    });
    return temp;
  },
};
