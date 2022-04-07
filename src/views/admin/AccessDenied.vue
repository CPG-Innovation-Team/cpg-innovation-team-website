<template>
  <div class="layout">
    <AdminNav />
    <v-main style="background: whitesmoke">
      <v-container fill-height fluid>
        <v-row align="center" justify="center">
          <v-card elevation="0" color="transparent">
            <v-row align="center" justify="center">
              <v-icon x-large>mdi-alert-circle</v-icon>
              <v-card-title>Sorry, you don't have the access</v-card-title>
            </v-row>
          </v-card>
        </v-row>
      </v-container>
    </v-main>
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
