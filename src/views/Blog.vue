<template>
  <div>
    <div class="header-container">
      <img class="nav-img" src="../assets/img-carousel4.jpg" />

      <div class="header-text">
        <p class="title-cn">博客</p>
        <p class="subtitle">正大创新项目中心博客</p>
      </div>
      <HeaderNav />
    </div>
    <v-main> </v-main>
  </div>
</template>

<script>
import HeaderNav from '../components/HeaderNav.vue';

export default {
  data() {
    return {};
  },
  components: {
    HeaderNav,
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.header-container {
  position: relative;
  .header-text {
    color: white;
    position: absolute;
    width: 600px;
    left: 50%;
    margin-left: -300px;
    top: 50%;
    margin-top: -80px;
    text-align: center;
    .title-en {
      font-size: 1.2rem;
      font-weight: bold;
      margin-bottom: 6px;
    }
    .title-cn {
      font-size: 2.6rem;
      margin: 0;
    }
    .subtitle {
      font-size: 1.2rem;
      font-weight: 900;
    }
  }
  .nav-img {
    width: 100%;
    height: 400px;
    opacity: 2;
  }
}
</style>
