<template>
  <div :style="cssProps">
    <v-app-bar class="nav-container" app flat hide-on-scroll>
      <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="drawer = true"></v-app-bar-nav-icon>

      <!-- <v-spacer class="hidden-sm-and-down"></v-spacer> -->

      <router-link to="/">
        <img v-if="!color" class="ml-8" width="136" height="34" src="../assets/logo-white.svg" alt="logo image" />
        <img v-else class="ml-8" width="136" height="34" src="../assets/logo-black.svg" alt="logo image" />
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

      <router-link v-if="!login" class="login-btn mr-2" to="/login">
        <v-btn outlined color="white"> {{ $t('navbar.login') }} </v-btn>
      </router-link>

      <v-menu offset-y content-class="elevation-0" rounded="14">
        <template v-slot:activator="{ on, attrs }">
          <div v-if="!login" class="language-setting" v-bind="attrs" v-on="on">
            <country-flag class="flag" :country="flag" />
            <v-icon>mdi-chevron-down</v-icon>
          </div>
        </template>
        <v-list dense>
          <v-list-item-group color="primary" test="language">
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

      <v-menu offset-y content-class="elevation-0" rounded="14">
        <template v-slot:activator="{ on, attrs }">
          <div v-if="login" class="language-setting" v-bind="attrs" v-on="on">
            <v-avatar size="36">
              <img src="https://randomuser.me/api/portraits/men/81.jpg" alt="user icon" />
            </v-avatar>
            <v-icon>mdi-chevron-down</v-icon>
          </div>
        </template>
        <v-list dense>
          <v-subheader>Mike. D</v-subheader>
          <v-list-item-group color="primary">
            <router-link to="/admin/profile" style="text-decoration: none">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>My Blogs</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </router-link>

            <v-menu offset-x left content-class="elevation-0">
              <template v-slot:activator="{ on, attrs }">
                <v-list-item v-bind="attrs" v-on="on">
                  <v-list-item-icon>
                    <v-icon>mdi-translate</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Language</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
              <v-list dense>
                <v-list-item-group color="primary" test="language">
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

            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-bell</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Notification</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item @click="login = false">
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>

      <!-- Search component
      <v-autocomplete
        class="header-search"
        :search-input.sync="searchTemp"
        :items="searchItems"
        dense
        hide-details
        solo
        v-bind:placeholder="$t('search')"
        :hide-no-data="true"
        @keyup.enter="search"
      >
        <template v-slot:item="{ item }">
          <router-link class="redirect-link" :to="getRouterLink(item) + getID(item)">
            {{ item }}
          </router-link>
        </template>
      </v-autocomplete>
      <v-btn icon class="mr-1" @click="search">
        <v-icon>mdi-magnify</v-icon>
      </v-btn> -->
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
import CountryFlag from 'vue-country-flag';

const projects = require('../data/project');
const jobs = require('../data/career');

export default {
  name: 'HeaderNav',
  data: () => ({
    login: true,
    lang: '中文',
    flag: 'cn',
    drawer: false,
    group: null,
    // search
    searchText: '',
    searchTemp: '',
    searchItems: [],
    jobs,
    projects,
  }),
  props: ['color'],
  components: {
    CountryFlag,
  },
  watch: {
    group() {
      this.drawer = false;
    },
    searchTemp(input) {
      this.searchText = input;
      this.searchItems = [...this.getSearchItems(jobs), ...this.getSearchItems(projects)];
    },
  },
  methods: {
    changeLang(locale, lang, flag) {
      this.$i18n.locale = locale;
      this.lang = lang;
      this.flag = flag;
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
  },
  computed: {
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
  },
};
</script>

<style lang="scss" scoped>
.nav-container {
  background-color: rgba(0, 0, 0, 0) !important;
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

.login-btn {
  font-weight: bold;
  text-decoration: none;
  color: var(--themeColor);
}

.flag {
  border-radius: 6px;
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
