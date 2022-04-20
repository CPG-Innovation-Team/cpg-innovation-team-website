<template>
  <v-footer color="black" app absolute>
    <v-container>
      <v-row class="row" justify="center">
        <router-link to="/">
          <img width="100" height="25" src="../assets/icon-logo-white.svg" alt="logo image" />
        </router-link>
      </v-row>

      <v-row class="row" justify="center">
        <router-link class="nav-link" v-for="router in routers" :key="router.index" v-bind:to="router.link">
          {{ router.name }}
        </router-link>
      </v-row>

      <v-row class="row" justify="center">
        <v-btn v-for="icon in icons" :key="icon" class="mx-4 white--text" icon>
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
      </v-row>

      <v-row class="row" justify="center">
        <span class="mr-5">Copyright &#169; 2022</span>
        <span class="ml-5">Terms & Conditions</span>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',

  data: () => ({
    icons: ['mdi-facebook', 'mdi-twitter', 'mdi-linkedin', 'mdi-instagram'],
  }),
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
.row {
  margin: 20px 0;
  a {
    text-decoration: none;
    margin: 0 8px;
    color: white;
    &:hover {
      color: gray;
    }
  }

  span {
    color: gray;
  }
}
</style>
