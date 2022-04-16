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
           * 20108, Access Denied
           */
          console.log(response);
          if (response.data.code === 10004 || response.data.code === 10003) {
            if (!url.includes('logout')) {
              router.push('/login');
            }
          }
          if (response.data.code === 20108) {
            console.log('20108');
            router.push('/admin/accessDenied');
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
    return html.replace(/<(?:"[^"]*"|'[^']*'|[^'">])*>/g, '').replace(/&.{1,10};/g, ' ');
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
  clearLocalStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('avatar');
    localStorage.removeItem('routes');
    localStorage.removeItem('isRoot');
    localStorage.removeItem('uid');
  },
  checkAccess(component, router) {
    if (localStorage.uid === undefined) {
      router.push('/login');
    } else if (component !== '') {
      if (localStorage.routes === undefined) {
        router.push('/admin/profile');
      } else if (!localStorage.routes.includes(`${component}`)) {
        router.push('/admin/accessDenied');
      }
    }
  },
  getEnvUrl() {
    return process.env.VUE_APP_HTTP_URL;
  },
};
