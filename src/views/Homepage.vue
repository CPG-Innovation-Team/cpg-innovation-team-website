<template>
  <div>
    <!-- Old version
    <v-carousel v-model="model" cycle :interval="4000" delimiter-icon="mdi-minus" height="400" show-arrows-on-hover>
      <v-carousel-item v-for="(img, i) in carouselsImg" :key="i" v-bind:src="img"> </v-carousel-item>
    </v-carousel> -->

    <v-container fluid>
      <h1 class="news-header mb-12">{{ $t('news.header') }}</h1>
      <v-row>
        <v-col md="4" sm="6" xs="12" v-for="(news, i) in news" :key="i">
          <v-container>
            <v-card class="card" outlined style="border: none; border-radius: 0">
              <v-img :src="news.img" />
              <div class="data">
                7 Aug 2021 | by Finola Aline
                <span class="category">分类</span>
              </div>
              <v-card-title class="title">{{ news.title }}</v-card-title>
              <v-card-text class="content">
                {{ news.content }}
              </v-card-text>
              <v-card-text class="pa-0">
                <a>阅读<v-icon color="#FFC60D">mdi-chevron-right</v-icon></a>
              </v-card-text>
            </v-card>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
const car1 = require('../assets/img-carousel1.jpg');
const car2 = require('../assets/img-carousel2.jpg');
const car3 = require('../assets/img-carousel3.jpg');
const car4 = require('../assets/img-carousel4.jpg');

const news1 = require('../assets/img-news1.jpg');
const news2 = require('../assets/img-news2.jpg');
const news3 = require('../assets/img-news3.jpg');

export default {
  name: 'Home',
  data: () => ({
    model: 0,
    carouselsImg: [car1, car2, car3, car4],
  }),
  computed: {
    news() {
      return [
        {
          title: this.$t('news.1.title'),
          content: this.$t('news.1.content'),
          img: news1,
        },
        {
          title: this.$t('news.2.title'),
          content: this.$t('news.2.content'),
          img: news2,
        },
        {
          title: this.$t('news.3.title'),
          content: this.$t('news.3.content'),
          img: news3,
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
.news-header {
  text-align: center;
}

.card {
  border: none;
  .data {
    font-size: 0.72rem;
    font-weight: 550;
    margin: 8px 0;
    .category {
      float: right;
    }
  }
  .title {
    padding: 0;
  }
  .content {
    padding: 0;
    margin: 8px 0;
    /* white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  a {
    font-size: 0.8rem;
    font-weight: 800;
    text-decoration: none;
    color: black;
  }
}
</style>
