<template>
  <div>
    <h1>Projects</h1>
    <v-container>
      <v-img src="https://picsum.photos/500/300?image=91" id="project-head-img" max-height="400" />

      <v-container>
        <v-row>
          <v-col>
            <v-hover v-slot="{ hover }">
              <v-card class="mx-auto" color="grey lighten-4" max-width="600">
                <v-card-title class="text-h4"> Lorem Ipsum </v-card-title>
                <v-img :aspect-ratio="9 / 16" src="https://picsum.photos/500/300?image=60">
                  <v-expand-x-transition>
                    <div
                      v-if="hover"
                      class="d-flex transition-fast-in-fast-out white darken-2 v-card--reveal"
                      style="height: 100%; width: 120%"
                    >
                      <ul>
                        <li>Lorem Ipsum</li>
                        <li>Lorem Ipsum</li>
                        <li>Lorem Ipsum</li>
                        <li>Lorem Ipsum</li>
                        <li>Lorem Ipsum</li>
                      </ul>
                    </div>
                  </v-expand-x-transition>
                </v-img>
              </v-card>
            </v-hover>
          </v-col>
          <v-col>
            <v-hover v-slot="{ hover }">
              <v-card class="mx-auto" color="grey lighten-4" max-width="600">
                <v-card-title class="text-h4"> Lorem Ipsum </v-card-title>
                <v-img :aspect-ratio="9 / 16" src="https://picsum.photos/500/300?image=62">
                  <v-expand-x-transition>
                    <div
                      v-if="hover"
                      class="d-flex transition-fast-in-fast-out white darken-2 v-card--reveal"
                      style="height: 100%; width: 120%"
                    >
                      <ul>
                        <li>Lorem Ipsum</li>
                        <li>Lorem Ipsum</li>
                        <li>Lorem Ipsum</li>
                        <li>Lorem Ipsum</li>
                        <li>Lorem Ipsum</li>
                      </ul>
                    </div>
                  </v-expand-x-transition>
                </v-img>
              </v-card>
            </v-hover>
          </v-col>

          <v-col>
            <v-hover v-slot="{ hover }">
              <v-card class="mx-auto" color="grey lighten-4" max-width="600">
                <v-card-title class="text-h4"> Lorem Ipsum </v-card-title>
                <v-img :aspect-ratio="9 / 16" src="https://picsum.photos/500/300?image=65">
                  <v-expand-x-transition>
                    <div
                      v-if="hover"
                      class="d-flex transition-fast-in-fast-out white darken-2 v-card--reveal"
                      style="height: 100%; width: 120%"
                    >
                      <ul>
                        <li>Lorem Ipsum</li>
                        <li>Lorem Ipsum</li>
                        <li>Lorem Ipsum</li>
                        <li>Lorem Ipsum</li>
                        <li>Lorem Ipsum</li>
                      </ul>
                    </div>
                  </v-expand-x-transition>
                </v-img>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Project',
  data: () => ({
    model: 0,
    colors: ['primary', 'secondary', 'yellow darken-2', 'red', 'orange'],
  }),
};
</script>

<style lang="scss">
.col {
  padding: 0px;
}
.v-img {
  z-index: -1;
}
#project-list {
  list-style: none;
}
</style>
