<template>
  <div :style="cssProps">
    <v-system-bar
      class="announcement-bar"
      :style="announcementStyle"
      v-if="announcementContent !== '' && checkIfAnnouncemmentIsClosed() === false && isAnnouncementClosed == false"
      app
      color="purple"
    >
      <v-row justify="center" align="center" @click="redirectURL()">
        <div class="announcement">{{ announcementContent }}</div>
      </v-row>
      <v-btn icon @click="closeAnnouncement(announcement.id)"><v-icon color="white">mdi-close</v-icon></v-btn>
    </v-system-bar>
    <v-app-bar class="nav-container" app flat :style="backgroundStyle">
      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click.stop="drawer = true"
        data-test-id="menu-expand-icon"
      ></v-app-bar-nav-icon>

      <router-link to="/">
        <img
          v-if="!color"
          class="ml-8 mt-2"
          width="136"
          height="34"
          src="../assets/icon-logo-white.svg"
          alt="logo image"
        />
        <img v-else class="ml-8 mt-2" width="136" height="34" src="../assets/icon-logo-black.svg" alt="logo image" />
      </router-link>

      <v-spacer></v-spacer>

      <v-toolbar-items class="nav-menu hidden-sm-and-down">
        <button v-for="router in routers" :key="router.index">
          <router-link class="nav-link" v-bind:to="router.link">
            {{ router.name }}
          </router-link>
        </button>
      </v-toolbar-items>
      <v-spacer></v-spacer>

      <router-link v-if="!token" class="login-btn mr-2" to="/login">
        <v-btn outlined color="white" data-test-id="login-btn"> {{ $t('navbar.login') }} </v-btn>
      </router-link>

      <v-menu offset-y content-class="elevation-0" rounded="14">
        <template v-slot:activator="{ on, attrs }">
          <div v-if="token" class="language-setting" v-bind="attrs" v-on="on">
            <v-avatar size="36" data-test-id="user-avatar">
              <img :src="avatar || require('../assets/icon-default-avatar.jpg')" alt="user icon" />
            </v-avatar>
          </div>
        </template>
        <v-list dense data-test-id="user-menu">
          <v-subheader>{{ username }}</v-subheader>
          <v-list-item-group color="primary">
            <router-link to="/admin/profile" style="text-decoration: none">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title data-test-id="user-blogs">{{ $t('navbar.myBlogs') }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </router-link>

            <v-list-item @click="logout">
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ $t('navbar.logout') }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>

      <v-menu offset-y content-class="elevation-0" rounded="14">
        <template v-slot:activator="{ on, attrs }">
          <div class="language-setting" v-bind="attrs" v-on="on">
            <country-flag class="flag" :country="$t('flag')" data-test-id="country-flag" />
            <v-icon>mdi-chevron-down</v-icon>
          </div>
        </template>
        <v-list dense>
          <v-list-item-group color="primary" data-test-id="language-menu">
            <v-list-item class="pr-2 pl-2">
              <v-list-item-content class="pa-0" @click="changeLang('zh-CN', '中文', 'cn')">
                <div class="language-selection">
                  <country-flag class="flag" country="cn" />
                  <span class="language-text">简体中文</span>
                </div>
              </v-list-item-content>
            </v-list-item>
            <v-list-item class="pr-2 pl-2">
              <v-list-item-content class="pa-0" @click="changeLang('en-US', 'Eng', 'gb')">
                <div class="language-selection">
                  <country-flag class="flag" country="gb" />
                  <span class="language-text">English(UK)</span>
                </div>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group v-model="group" class="navbar" active-class="blue--text font-weight-bold">
          <v-list-item v-for="router in routers" :key="router.index">
            <v-list-item-content>
              <router-link class="nav-link" v-bind:to="router.link">{{ router.name }}</router-link>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode';
import CountryFlag from 'vue-country-flag';
import util from '../util';
import Event from '../Event';

const projects = require('../data/project');
const jobs = require('../data/career');

export default {
  name: 'HeaderNav',
  data: () => ({
    lang: '中文',
    drawer: false,
    group: null,
    // search
    searchText: '',
    searchTemp: '',
    searchItems: [],
    jobs,
    projects,
    // navbar user info
    username: '',
    token: '',
    avatar: null,
    // announcement
    announcement: { content: '' },
    announcementContent: '',
    announcementURL: '',
    isAnnouncementClosed: false,
    // header nav opacity
    backgroundOpacity: 0,
    // timer
    timer: '',
  }),
  props: ['color'],
  components: {
    CountryFlag,
  },
  async created() {
    if (localStorage.username) {
      this.username = localStorage.username;
    }
    if (localStorage.token) {
      this.token = localStorage.token;
    }
    if (localStorage.avatar) {
      this.avatar = localStorage.avatar;
    }
    await this.getAnnouncement();
    this.getAnnouncementForLocale();
    this.announcementURL = util.getAnnouncementURL(this.announcement);

    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
    clearInterval(this.timer);
  },
  watch: {
    locale() {
      this.getAnnouncementForLocale();
    },
    group() {
      this.drawer = false;
    },
    searchTemp(input) {
      this.searchText = input;
      this.searchItems = [...this.getSearchItems(jobs), ...this.getSearchItems(projects)];
    },
  },
  mounted() {
    // 0.5 hour = 1000 * 60 * 30 ms
    // check if the user is logged in
    if (this.token !== '') {
      // when user opens the page, check timeout immediately
      this.checkTimeOut();
      // then, check timeout every 30 minutes
      this.timer = setInterval(this.checkTimeOut, 1000 * 60 * 30);
    }
  },
  methods: {
    checkTimeOut() {
      const currentTime = parseInt(new Date().getTime() / 1000, 10);
      const expTime = jwtDecode(this.token).exp;
      // if the time difference is longer than 1 hour, then log out
      if (currentTime >= expTime) {
        this.clearUserInfo();
        clearInterval(this.timer);
      }
    },
    getAnnouncementForLocale() {
      if (this.$t('locale') === 'zh-CN') {
        this.announcementContent = util.getAnnouncementCNContent(this.announcement);
      }
      if (this.$t('locale') === 'en-US') {
        this.announcementContent = util.getAnnouncementENContent(this.announcement);
      }
    },
    changeLang(locale, lang, flag) {
      this.$i18n.locale = locale;
      this.lang = lang;
      this.flag = flag;
      document.title = this.$t('title');
      this.$vuetify.lang.current = locale === 'zh-CN' ? 'zhHans' : 'en';
      Event.$emit('change-lang', locale);
    },
    search() {
      if (this.searchText !== null && this.searchText.trim() !== '') {
        this.$router.push({ path: '/searchResults', query: { search: this.searchText } });
      }
    },
    // get title
    getSearchItems(arr) {
      const output = [];
      arr.forEach((item) => {
        output.push(item.title);
      });
      return output;
    },
    getRouterLink(searchItemTitle) {
      if (this.getTag(jobs, searchItemTitle) === '职位') {
        return '/recruitmentDetail?id=';
      }
      if (this.getTag(projects, searchItemTitle) === '项目') {
        return '/projectInfo?id=';
      }
      return '/error';
    },
    getTag(arr, searchItemTitle) {
      let tag = '';
      arr.forEach((item) => {
        if (item.title.includes(searchItemTitle)) {
          if (arr === jobs) tag = '职位';
          if (arr === projects) tag = '项目';
        }
      });
      return tag;
    },
    getID(searchItemTitle) {
      const arr = [...jobs, ...projects];
      return arr.find((item) => item.title.includes(searchItemTitle)).id.substring(1);
    },
    logout() {
      util.post(`${util.getEnvUrl()}/admin/logout`, {}, this.$router).then(() => {
        this.clearUserInfo();
      });
    },
    clearUserInfo() {
      this.token = '';
      this.username = '';
      this.avatar = null;
      util.clearLocalStorage();
    },
    async getAnnouncement() {
      await util.post(`${util.getEnvUrl()}/notify/query`, {}).then((response) => {
        if (response.data.code === 10000) {
          if (response.data.message === '当前时间段暂无通知') {
            this.announcement = { content: '' };
          }
          if (response.data.data.NotificationList) {
            this.announcement = {
              content: response.data.data.NotificationList.slice(-1)[0].Content,
              id: response.data.data.NotificationList.slice(-1)[0].Id,
            };
          }
        }
      });
    },
    redirectURL() {
      if (this.announcementURL !== '') {
        window.location = this.announcementURL;
      }
    },
    handleScroll() {
      if (window.scrollY === 0) {
        this.backgroundOpacity = 0;
      } else if (window.scrollY > 240) {
        this.backgroundOpacity = 0.5;
      } else {
        this.backgroundOpacity = window.scrollY / 480;
      }
    },
    closeAnnouncement() {
      localStorage.closeAnnouncementId = this.announcement.id;
      this.isAnnouncementClosed = true;
    },
    checkIfAnnouncemmentIsClosed() {
      if (localStorage.closeAnnouncementId) {
        // if the current announcement id matches with the one that user has closed
        // return true that the announcement is closed
        if (this.announcement.id.toString() === localStorage.closeAnnouncementId) return true;
      }
      return false;
    },
  },
  computed: {
    locale() {
      return {
        locale: this.$t('locale'),
      };
    },
    routers() {
      return [
        { name: this.$t('navbar.home'), link: '/' },
        { name: this.$t('navbar.projects'), link: '/projectInfo' },
        { name: this.$t('navbar.team'), link: '/teamInfo' },
        { name: this.$t('navbar.recruitment'), link: '/recruitmentInfo' },
        { name: this.$t('navbar.about'), link: '/aboutUs' },
        { name: this.$t('navbar.blog'), link: '/blog' },
      ];
    },
    cssProps() {
      if (this.color) {
        return { '--themeColor': this.color };
      }
      return { '--themeColor': 'white' };
    },
    backgroundStyle() {
      if (this.color) {
        return { backgroundColor: `rgba(255, 255, 255, ${this.backgroundOpacity * 1.5} !important` };
      }
      return { backgroundColor: `rgba(0, 0, 0, ${this.backgroundOpacity} !important` };
    },
    announcementStyle() {
      if (this.announcementURL !== '') {
        return {
          cursor: 'pointer',
        };
      }
      return { cursor: 'auto' };
    },
  },
};
</script>

<style lang="scss" scoped>
.announcement-bar {
  .announcement {
    color: white;
    font-size: 15px;
  }
}

.nav-container {
  background-color: rgba(0, 0, 0, 0);
  .nav-menu {
    button {
      padding: 0 16px;
      cursor: default;
      a {
        font-weight: bold;
        text-decoration: none;
        color: var(--themeColor);
        &:hover {
          color: #ffc60d;
        }
      }
    }
  }
  .language-setting {
    display: flex;
    align-self: center;
  }
}

.navbar {
  .nav-link {
    font-weight: bold;
    text-decoration: none;
    color: black;
    margin-top: 10%;
    margin-left: 2%;
  }
}

.login-btn {
  font-weight: bold;
  text-decoration: none;
  color: var(--themeColor);
}

.flag {
  border-radius: 6px;
  margin-right: -10px;
}

.language-selection {
  display: flex;
  justify-content: left;
  align-items: center;
  .language-text {
    display: inline-block;
    vertical-align: middle;
    line-height: normal;
  }
}

.header-search {
  min-width: 120px;
  width: 8%;
}

.redirect-link {
  text-decoration: none;
  color: black;
  font-size: 14px;
}
</style>
