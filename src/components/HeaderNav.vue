<template>
  <v-app-bar app color="blue darken-1">
    <v-spacer></v-spacer>

    <v-col cols="1">
      <v-app-bar-title style="align-self: center">Logo</v-app-bar-title>
    </v-col>

    <v-toolbar-items class="navbar">
      <v-btn text><router-link class="nav-link" to="/">Home</router-link></v-btn>
      <v-btn text><router-link class="nav-link" to="/aboutUs">About</router-link></v-btn>
      <v-btn text><router-link class="nav-link" to="/projectInfo">Projects</router-link></v-btn>
      <v-btn text><router-link class="nav-link" to="/recruitmentInfo">Recruitment</router-link></v-btn>
      <v-btn text><router-link class="nav-link" to="/teamInfo">Team</router-link></v-btn>
      <v-btn text><router-link class="nav-link" to="/contact">Contact</router-link></v-btn>
    </v-toolbar-items>

    <v-spacer></v-spacer>

    <v-autocomplete
      class="header-search"
      :search-input.sync="searchTemp"
      :items="searchItems"
      dense
      filled
      rounded
      :hide-no-data="true"
      @keyup.enter="search"
    >
      <template v-slot:item="{ item }">
        <router-link class="redirect-link" :to="'/recruitmentDetail?id=' + getID(item)">{{ item }}</router-link>
      </template>
    </v-autocomplete>
    <v-btn icon class="mr-1" @click="search">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn small color="blue lighten-1" v-bind="attrs" v-on="on">中文<v-icon>mdi-chevron-down</v-icon></v-btn>
      </template>
      <v-list>
        <v-list-item-group color="primary">
          <v-list-item>
            <v-list-item-content>中文</v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>English</v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
const jobs = require('../career');

export default {
  data() {
    return {
      searchText: '',
      searchTemp: '',
      searchItems: [],
      jobs,
    };
  },
  watch: {
    searchTemp(input) {
      this.searchText = input;
      this.getSearchItems();
    },
  },
  methods: {
    search() {
      this.$router.push({ path: '/searchResults', query: { search: this.searchText } });
    },
    getSearchItems() {
      for (let i = 0; i < jobs.length; i += 1) {
        this.searchItems.push(jobs[i].title);
      }
      return this.searchItems;
    },
    getID(input) {
      let index = -1;
      for (let i = 0; i < jobs.length; i += 1) {
        if (this.jobs[i].title.indexOf(input) !== -1) {
          index = i + 1;
        }
      }
      return index;
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar .nav-link {
  text-decoration: none;
  color: rgba(0, 0, 0, 0.87);
}

.header-search {
  border-radius: 4px;
  background-color: rgb(232, 237, 255);
  height: 40px;
}

.redirect-link {
  text-decoration: none;
  color: black;
}
</style>
