<template>
  <div>
    <div class="header-container">
      <img class="nav-img" src="../assets/img-carousel1.jpg" alt="header image" />

      <div class="header-text">
        <p class="title-en">Creater your best ides</p>
        <p class="subtitle">
          Resultant to some fault complete, annoying loves was of are idea painful denouncing who itself - it are enjoy.
        </p>
        <v-btn color="#FFC60D" depressed>Start now</v-btn>
      </div>
      <HeaderNav />
    </div>

    <v-main>
      <v-container class="mb-10">
        <v-img src="https://picsum.photos/500/300?image=91" id="project-head-img" max-height="400" />

        <v-container>
          <v-row class="hidden-sm-and-down">
            <v-col class="project-col" v-for="(project, i) in projects" :key="i">
              <v-hover v-slot="{ hover }">
                <v-card class="mx-auto" color="grey lighten-4" max-width="600">
                  <v-card-title class="text-h4">{{ project.title }}</v-card-title>
                  <v-img :aspect-ratio="9 / 16" :src="project.img">
                    <v-slide-x-transition>
                      <div v-if="hover" class="d-flex white project-list" style="height: 100%; width: 100%">
                        <v-card>
                          <v-card-subtitle style="width: 80%; margin: auto"> 介绍 </v-card-subtitle>
                          <v-card-text style="width: 80%; margin: auto">{{ project.intro }}</v-card-text>
                          <ul>
                            <li v-for="(link, j) in project.list" :key="j">
                              <a>{{ link }}</a>
                            </li>
                          </ul>
                        </v-card>
                      </div>
                    </v-slide-x-transition>
                  </v-img>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
          <!-- For Mobile Version -->
          <v-row v-for="(project, i) in projects" :key="i" class="mobile hidden-md-and-up">
            <v-img :aspect-ratio="4 / 1" :src="project.img">
              <v-row>
                <v-col cols="8">
                  <v-card-title class="header">{{ project.title }}</v-card-title>
                </v-col>
                <v-col cols="4">
                  <v-chip icon @click="project.show = !project.show" class="chip-show">
                    更多<v-icon>{{ project.show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                  </v-chip>
                </v-col>
              </v-row>
            </v-img>

            <v-expand-transition>
              <v-card v-show="project.show">
                <v-card-subtitle>介绍</v-card-subtitle>
                <v-card-text>{{ project.intro }}</v-card-text>
                <v-card-subtitle>项目</v-card-subtitle>
                <v-chip v-for="(link, j) in project.list" :key="j" color="blue" class="chip-link"> {{ link }} </v-chip>
              </v-card>
            </v-expand-transition>
          </v-row>
        </v-container>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import HeaderNav from '../components/HeaderNav.vue';

export default {
  name: 'Project',
  data: () => ({
    projects: [
      {
        title: 'Lorem Ipsum',
        img: 'https://picsum.photos/500/300?image=60',
        list: ['item1', 'item2', 'item3'],
        intro:
          "I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.",
        show: false,
      },
      {
        title: 'Lorem Ipsum',
        img: 'https://picsum.photos/500/300?image=62',
        list: ['item4', 'item5', 'item6'],
        intro:
          "I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.",
        show: false,
      },
      {
        title: 'Lorem Ipsum',
        img: 'https://picsum.photos/500/300?image=65',
        list: ['item7', 'item8', 'item9'],
        intro:
          "I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.",
        show: false,
      },
    ],
  }),
  components: {
    HeaderNav,
  },
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
      font-size: 2rem;
      font-weight: 900;
      margin-bottom: 6px;
    }
    .subtitle {
      font-size: 1.2rem;
      font-weight: 400;
    }
  }
  .nav-img {
    width: 100%;
    height: 400px;
    opacity: 2;
  }
}

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

.mobile {
  .header {
    color: white;
    margin-top: 5%;
  }
  .chip-show {
    float: right;
    margin: 25% 10%;
  }

  .chip-link {
    color: white;
    margin: 10px;
    padding: 10px 20px;
  }
}
</style>
