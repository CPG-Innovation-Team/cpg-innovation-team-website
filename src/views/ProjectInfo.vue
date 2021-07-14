<template>
  <div>
    <v-container>
      <v-img src="https://picsum.photos/500/300?image=91" id="project-head-img" max-height="400" />
      <v-container>
        <v-row>
          <v-col class="project-col" v-for="(project, i) in projects" :key="i">
            <v-hover v-slot="{ hover }">
              <v-card class="mx-auto" color="grey lighten-4" max-width="600">
                <v-card-title class="text-h4">{{ project.title }}</v-card-title>
                <v-img :aspect-ratio="9 / 16" :src="project.img">
                  <v-slide-x-transition>
                    <div v-if="hover" class="d-flex white project-list" style="height: 100%; width: 100%">
                      <ul>
                        <li v-for="(link, j) in project.list" :key="j">
                          <router-link :to="{ path: '/projectDetail' }" style="text-decoration: none">
                            {{ link }}
                          </router-link>
                        </li>
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
  data: () => ({
    projects: [
      {
        title: 'Project 1',
        img: 'https://picsum.photos/500/300?image=60',
        list: ['item1', 'item2', 'item3', 'item4', 'item5'],
      },
      {
        title: 'Project 2',
        img: 'https://picsum.photos/500/300?image=62',
        list: ['item6', 'item7', 'item8', 'item9', 'item10'],
      },
      {
        title: 'Project 3',
        img: 'https://picsum.photos/500/300?image=65',
        list: ['item11', 'item12', 'item13', 'item14', 'item15'],
      },
    ],
  }),
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
