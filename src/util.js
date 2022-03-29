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
  post(url, parameters, router) {
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
          /**
           * Code reference
           * 10000, OK
           * 10003, Invalid Token
           * 10004, Token is expired
           * 10009, Invalid Param
           */
          if (response.data.code === 10004 || response.data.code === 10003) {
            router.push({ path: '/login' });
          }
          resolve(response);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  },
  /**
   * converts tinymce html to plain text used to display on blog page
   * @param {*} html
   * @returns
   */
  escapeHTML(html) {
    return html.replace(/<(?:"[^"]*"|'[^']*'|[^'">])*>/g, '').replace(/&.*;/g, ' ');
  },
  getAnnouncementCNContent(announcement) {
    // remove bounary quotes from the string
    const trimmedStr = announcement.content.substring(1, announcement.content.length - 1);
    return trimmedStr.substring(0, trimmedStr.indexOf('#'));
  },
  getAnnouncementENContent(announcement) {
    const trimmedStr = announcement.content.substring(1, announcement.content.length - 1);
    return trimmedStr.substring(trimmedStr.indexOf('#') + 1, trimmedStr.indexOf('@'));
  },
  getAnnouncementURL(announcement) {
    const str = announcement.content;
    const trimmedStr = str.substring(1, str.length - 1);
    return trimmedStr.substring(trimmedStr.indexOf('@') + 1);
  },
  getEnvUrl() {
    return process.env.VUE_APP_HTTP_URL;
  },
};
