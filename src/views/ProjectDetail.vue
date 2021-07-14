<template>
  <v-app id="ProjectDetailPage">
    <v-main class="grey lighten-4">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg" elevation="3" style="position: fixed; width: 150px">
              <v-list color="transparent">
                <v-list-item v-for="n in 5" :key="n" link>
                  <v-list-item-content>
                    <v-list-item-title @click="movePage(n)"> Item {{ n }} </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item link color="grey lighten-5">
                  <v-list-item-content>
                    <v-list-item-title @click="$router.go(-1)"> Back </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet min-height="70vh" rounded="lg">
              <v-card elevation="2" class="display-card">
                <v-card-title> Item 1 </v-card-title>
              </v-card>

              <v-card elevation="2" class="display-card">
                <v-card-title> Item 2 </v-card-title>
              </v-card>

              <v-card elevation="2" class="display-card">
                <v-card-title> Item 3 </v-card-title>
              </v-card>

              <v-card elevation="2" class="display-card">
                <v-card-title> Item 4 </v-card-title>
              </v-card>

              <v-card elevation="2" class="display-card">
                <v-card-title> Item 5 </v-card-title>
              </v-card>

              <!--  -->
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    ProjectDetails: [{ title: 'item1' }, { title: 'item2' }, { title: 'item3' }],
  }),
  methods: {
    movePage(index) {
      const moveTo = (index - 1) * 400;
      window.scrollTo({
        top: moveTo,
        behavior: 'smooth',
      });
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
.vertical-nav {
  margin-left: 200px;
}
.display-card {
  height: 400px;
  margin-bottom: 20px;
}
</style>
