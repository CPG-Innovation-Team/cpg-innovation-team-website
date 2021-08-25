<template>
  <v-app>
    <HeaderNav />
    <v-main>
      <!-- force refresh the page when at the same route -->
      <router-view :key="$route.fullPath"></router-view>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import HeaderNav from './components/HeaderNav.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    HeaderNav,
    Footer,
  },

  data: () => ({
    //
  }),
};
</script>

<style lang="scss"></style>
