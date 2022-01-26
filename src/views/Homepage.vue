<template>
  <div>
    <HeaderNav />
    <div class="header-container">
      <img class="nav-img" src="../assets/img-carousel2.jpg" alt="header image" />

      <div class="header-text">
        <p class="title-en">CP Group Innovation Center</p>
        <p class="title-cn">正大创新中心</p>
        <p class="subtitle">正大集团股权投资事业部，关注产业链、科技、健康、消费四大投资主题。</p>
        <v-btn color="#FFC60D" depressed>浏览项目</v-btn>
      </div>
    </div>

    <v-main>
      <v-container fluid class="mb-10">
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
    </v-main>
  </div>
</template>

<script>
import HeaderNav from '../components/HeaderNav.vue';

const news1 = require('../assets/img-news1.jpg');
const news2 = require('../assets/img-news2.jpg');
const news3 = require('../assets/img-news3.jpg');

export default {
  name: 'Home',
  data: () => ({}),
  components: {
    HeaderNav,
  },
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
.header-container {
  position: relative;
  height: auto;
  .header-text {
    color: white;
    position: absolute;
    top: 25%;
    left: 8%;
    .title-en {
      font-size: 15px;
      font-weight: bold;
      margin-bottom: 6px;
    }
    .title-cn {
      font-size: 35px;
      margin: 0;
    }
    .subtitle {
      font-size: 15px;
      font-weight: 900;
    }
  }
  .nav-img {
    width: 100%;
    height: 400px;
    opacity: 2;
  }
}

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
