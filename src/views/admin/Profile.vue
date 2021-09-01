<template>
  <div class="layout">
    <AdminNav />
    <v-main> Profile </v-main>
  </div>
</template>

<script>
import AdminNav from '../../components/AdminNav.vue';

export default {
  data() {
    return {};
  },
  components: {
    AdminNav,
  },
};
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
}
</style>
