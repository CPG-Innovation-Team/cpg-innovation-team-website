<template>
  <div>
    <h1>Projects</h1>
    <v-container>
      <v-img src="https://picsum.photos/500/300?image=91" id="project-head-img" max-height="400" />

      <v-container>
        <v-row>
          <v-col class="project-col">
            <v-hover v-slot="{ hover }">
              <v-card class="mx-auto" color="grey lighten-4" max-width="600">
                <v-card-title class="text-h4"> Lorem Ipsum </v-card-title>
                <v-img :aspect-ratio="9 / 16" src="https://picsum.photos/500/300?image=60">
                  <v-slide-x-transition>
                    <div v-if="hover" class="d-flex white project-list" style="height: 100%; width: 100%">
                      <ul>
                        <li><a>Fusce euismod cursus tempus</a></li>
                        <li>Fusce vulputate nec purus quis gravida</li>
                        <li>Etiam nec cursus elit</li>
                        <li>Phasellus nec ullamcorper elit</li>
                      </ul>
                    </div>
                  </v-slide-x-transition>
                </v-img>
              </v-card>
            </v-hover>
          </v-col>

          <v-col class="project-col">
            <v-hover v-slot="{ hover }">
              <v-card class="mx-auto" color="grey lighten-4" max-width="600">
                <v-card-title class="text-h4"> Lorem Ipsum </v-card-title>
                <v-img :aspect-ratio="9 / 16" src="https://picsum.photos/500/300?image=62">
                  <v-slide-x-transition>
                    <div v-if="hover" class="d-flex white project-list" style="height: 100%">
                      <ul>
                        <li>Lorem Ipsum</li>
                        <li>Lorem Ipsum</li>
                        <li>Lorem Ipsum</li>
                        <li>Lorem Ipsum</li>
                        <li>Lorem Ipsum</li>
                      </ul>
                    </div>
                  </v-slide-x-transition>
                </v-img>
              </v-card>
            </v-hover>
          </v-col>

          <v-col class="project-col">
            <v-hover v-slot="{ hover }">
              <v-card class="mx-auto" color="grey lighten-4" max-width="600">
                <v-card-title class="text-h4"> Lorem Ipsum </v-card-title>
                <v-img :aspect-ratio="9 / 16" src="https://picsum.photos/500/300?image=65">
                  <v-slide-x-transition>
                    <div v-if="hover" class="d-flex white project-list" style="height: 100%">
                      <ul>
                        <li>Lorem Ipsum</li>
                        <li>Lorem Ipsum</li>
                        <li>Lorem Ipsum</li>
                        <li>Lorem Ipsum</li>
                        <li>Lorem Ipsum</li>
                      </ul>
                    </div>
                  </v-slide-x-transition>
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
  data: () => ({}),
};
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
}

.project-col {
  padding: 0px;
}

.project-list {
  ul {
    align-self: center;
    list-style: none;
    li {
      margin: 20px;
      font-size: 1.2em;
    }
  }
}
</style>
