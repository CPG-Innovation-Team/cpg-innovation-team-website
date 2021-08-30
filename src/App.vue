<template>
  <v-app>
    <router-view :key="$route.fullPath"></router-view>
    <Footer v-show="!$route.fullPath.includes('admin')" />
  </v-app>
</template>

<script>
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Footer,
  },
  data: () => ({
    //
  }),
};
</script>

<style lang="scss"></style>
