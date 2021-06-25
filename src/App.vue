<template>
  <v-app>
    <HeaderNav />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import HeaderNav from './components/HeaderNav.vue';

export default {
  name: 'App',
  components: {
    HeaderNav,
  },

  data: () => ({
    //
  }),
};
</script>

<style lang="scss"></style>
