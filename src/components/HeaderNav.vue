<template>
  <div>
    <v-app-bar app color="blue darken-1">
      <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-spacer class="hidden-sm-and-down"></v-spacer>

      <router-link to="/"><v-img class="logo" src="../assets/img-cp-logo.png" alt="CP-logo" /></router-link>

      <v-toolbar-items class="navbar hidden-sm-and-down">
        <router-link v-for="router in routers" :key="router.index" class="nav-link" v-bind:to="router.link">
          <v-btn text>{{ router.name }}</v-btn>
        </router-link>
      </v-toolbar-items>

      <v-spacer></v-spacer>

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
      </v-btn>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="language-setting" small color="blue lighten-1" v-bind="attrs" v-on="on">
            {{ lang }}<v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item-group color="primary">
            <v-list-item>
              <v-list-item-content @click="changeLang('zh-CN', '中文')">中文</v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content @click="changeLang('en-US', 'Eng')">Eng</v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary width="150">
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
const projects = require('../data/project');
const jobs = require('../data/career');

export default {
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
  }),
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
    changeLang(locale, lang) {
      this.$i18n.locale = locale;
      this.lang = lang;
    },
    search() {
      if (this.searchText !== null && this.searchText.trim() !== '') {
        this.$router.push({ path: '/searchResults', query: { search: this.searchText } });
      }
    },
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
        if (item.title === searchItemTitle) {
          if (arr === jobs) tag = '职位';
          if (arr === projects) tag = '项目';
        }
      });
      return tag;
    },
    getID(searchItemTitle) {
      const arr = [...jobs, ...projects];
      return arr.find((item) => item.title === searchItemTitle).id.substring(1);
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
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
.logo {
  margin: 0 5% 0 8%;
  align-self: center;
  max-height: 45px;
  max-width: 45px;
}

.navbar {
  .nav-link {
    text-decoration: none;
    color: rgba(0, 0, 0, 0.87);
    text-align: center;
    height: inherit;
    button {
      height: inherit;
    }
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
