<template v-slot:activator="{ on }">
  <div>
    <v-carousel v-model="model" cycle :interval="4000" delimiter-icon="mdi-minus" height="400" show-arrows-on-hover>
      <v-carousel-item v-for="(img, i) in carouselsImg" :key="i" v-bind:src="img"> </v-carousel-item>
    </v-carousel>

    <v-container fluid>
      <h1 class="news-header">{{ $t('news.header') }}</h1>
      <v-row>
        <v-col md="4" sm="6" xs="12" v-for="(news, i) in news" :key="i">
          <v-container>
            <v-card>
              <v-img :src="news.img" />
              <v-card-title>{{ news.title }}</v-card-title>
              <v-card-text>
                {{ news.content }}
              </v-card-text>
              <v-card-text>
                <v-chip><a>More</a></v-chip>
              </v-card-text>
            </v-card>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
const car1 = require('../assets/carousel-img1.jpeg');
const car2 = require('../assets/carousel-img2.jpeg');
const car3 = require('../assets/carousel-img3.jpeg');
const car4 = require('../assets/carousel-img4.jpeg');

const news1 = require('../assets/news-img1.jpeg');
const news2 = require('../assets/news-img2.jpeg');
const news3 = require('../assets/news-img3.jpeg');

export default {
  name: 'Home',
  data: () => ({
    model: 0,
    carouselsImg: [car1, car2, car3, car4],
    // news: [
    //   {
    //     title: 'AAA',
    //     content:
    //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vestibulum ac nibh a malesuada. Etiam aarcu ullamcorper, luctus dui tristique, varius magna.',
    //     img: news1,
    //   },
    //   {
    //     title: 'BBB',
    //     content:
    //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vestibulum ac nibh a malesuada. Etiam aarcu ullamcorper, luctus dui tristique, varius magna.',
    //     img: news2,
    //   },
    //   {
    //     title: 'CCC',
    //     content:
    //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vestibulum ac nibh a malesuada. Etiam aarcu ullamcorper, luctus dui tristique, varius magna.',
    //     img: 'https://picsum.photos/500/300?image=30',
    //   },
    // ],
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

<style scoped>
.news-header {
  text-align: center;
}
</style>
