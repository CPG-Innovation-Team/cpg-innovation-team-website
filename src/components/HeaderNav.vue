<template>
  <div>
    <v-app-bar app color="blue darken-1">
      <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-img class="logo" src="../assets/CP-logo.png" alt="CP-logo" />

      <v-toolbar-items class="navbar hidden-sm-and-down">
        <router-link v-for="router in routers" :key="router.index" class="nav-link" v-bind:to="router.link">
          <v-btn text>{{ router.name }}</v-btn>
        </router-link>
      </v-toolbar-items>

      <v-spacer></v-spacer>

      <input class="header-search" type="text" placeholder="search" />
      <v-btn icon class="mr-1">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="language-setting" small color="blue lighten-1" v-bind="attrs" v-on="on"
            >中文<v-icon>mdi-chevron-down</v-icon></v-btn
          >
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

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group v-model="group" class="navbar" active-class="deep-purple--text text--accent-4">
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
export default {
  data: () => ({
    drawer: false,
    group: null,
    routers: [
      { name: 'Home', link: '/' },
      { name: 'About', link: '/aboutUs' },
      { name: 'Projects', link: '/projectInfo' },
      { name: 'Recruitment', link: '/recruitmentInfo' },
      { name: 'Team', link: '/teamInfo' },
      { name: 'Contact', link: '/contact' },
    ],
  }),

  watch: {
    group() {
      this.drawer = false;
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
  // margin-right: 4%;
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
  border-radius: 4px;
  background-color: rgb(232, 237, 255);
  height: 60%;
  min-width: 100px;
  width: 18%;
  padding: 5px;
}
</style>
