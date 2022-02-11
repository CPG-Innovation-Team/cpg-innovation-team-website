import axios from 'axios';

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
  post(url, parameters) {
    if (localStorage.token) {
      this.token = localStorage.token;
    }
    return new Promise((resolve) => {
      axios
        .post(url, parameters, {
          headers: {
            token: this.token,
          },
        })
        .then((response) => {
          resolve(response);
        });
    });
  },
  checkValidToken(response) {
    if (response.data.code === 10003 || response.data.code === 10004) {
      return false;
    }
    return true;
  },
  escapeHTML(html) {
    return html.replace(/<(?:"[^"]*"|'[^']*'|[^'">])*>/g, '');
  },
};
