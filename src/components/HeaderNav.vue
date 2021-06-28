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

    <input class="header-search" type="text" v-model="searchText" placeholder="search" @keyup.enter="search" />
    <!-- <v-autocomplete
      class="header-search"
      v-model="searchText"
      dense
      filled
      rounded
      @keyup.enter="search"
    ></v-autocomplete> -->
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
export default {
  data() {
    return {
      searchText: '',
    };
  },
  methods: {
    search() {
      console.log(this.searchText);
      this.$router.push({ path: '/searchResults', query: { search: this.searchText } });
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
</style>
