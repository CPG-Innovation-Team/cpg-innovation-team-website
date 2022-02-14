<template>
  <div>
    <HeaderNav />
    <div class="header-container">
      <img class="nav-img" src="../assets/img-carousel1.jpg" alt="header image" />

      <div class="header-text">
        <p class="title-en">创新团队项目</p>
        <p class="subtitle"></p>
        <v-btn color="#FFC60D" depressed>探索更多</v-btn>
      </div>
    </div>

    <v-main>
      <v-container class="mb-10">
        <v-img :src="projectBanner" id="project-head-img" max-height="400" />

        <v-container>
          <v-row class="hidden-sm-and-down">
            <v-col class="project-col" v-for="(project, i) in projects" :key="i">
              <v-hover v-slot="{ hover }">
                <v-card class="mx-auto" color="grey lighten-4" max-width="600">
                  <v-card-title class="text-h4">{{ project.title }}</v-card-title>
                  <v-img :aspect-ratio="1" :src="project.img">
                    <v-slide-x-transition>
                      <div v-if="hover" class="d-flex project-list" style="height: 100%; width: 100%">
                        <v-card>
                          <v-card-text class="product-intro">{{ project.intro }}</v-card-text>
                          <ul>
                            <li v-for="(item, j) in project.list" :key="j">
                              <a :href="item.link">{{ item.name }}</a>
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

const projectBanner = require('../assets/img-project-banner.jpg');
const cpxBanner = require('../assets/img-cpx-banner.jpg');
const cpcoinBanner = require('../assets/img-cpcoin-banner.png');
const cppulseBanner = require('../assets/img-cppulse-banner.webp');

export default {
  name: 'Project',
  data: () => ({
    projectBanner,
    projects: [
      {
        title: 'CPX',
        img: cpxBanner,
        list: [{ name: '点击前往', link: 'https://cpx.cpgroup.top' }],
        intro:
          'CPX正大集团全球采购平台是核心产品，支持NFT数字资产及商店，与CP Pulse结合进行数据分析。可以视为正大集团对标亚马逊针对AWS的策略。',
        show: false,
      },
      {
        title: 'CP Coin',
        img: cpcoinBanner,
        list: [{ name: '点击前往', link: 'https://coin.cpgroup.top' }],
        intro: '延伸至区块链技术的忠诚度计划。CP Coin将结合NFT产品进一步探索金融科技和资产管理。',
        show: false,
      },
      {
        title: 'CP Pulse',
        img: cppulseBanner,
        list: [{ name: '点击前往', link: 'https://pulse.cpgroup.top' }],
        intro: '为食品商品打造的数据分析引擎，致力于为定价与商品资源分配做出合理决策',
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
  height: 400px;
  width: 100%;
  .header-text {
    color: white;
    position: absolute;
    left: 0;
    right: 0;
    margin-left: 5%;
    margin-right: 5%;
    top: 40%;
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
  opacity: 0.8;
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

.product-intro {
  width: 80%;
  line-height: 28px;
  margin: 20px auto;
  font-size: 16px;
  font-weight: 600;
}
</style>
