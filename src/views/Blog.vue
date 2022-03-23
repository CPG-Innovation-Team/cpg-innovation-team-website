<template>
  <div>
    <HeaderNav />
    <div class="header-container">
      <img class="nav-img" src="https://picsum.photos/2000/" alt="header image" />

      <div class="header-text">
        <p class="title-cn">博客</p>
        <p class="subtitle">正大创新项目中心博客</p>
      </div>
    </div>

    <v-main class="pt-0">
      <div class="blogs-container">
        <div v-if="!isExpired" class="popular-container">
          <h1 style="text-align: center">Most Popular</h1>
          <v-container>
            <v-row class="justify-center">
              <div v-for="(blog, index) in popularBlogs.slice(0, 4)" :key="index">
                <v-col>
                  <v-card flat color="transparent">
                    <div class="popular-item">
                      <img
                        v-if="blog.imgIsValid"
                        :src="blog.cover"
                        alt="blog cover img"
                        @error="getDefaultCoverForPopular(index)"
                      />
                      <img v-else src="../assets/img-default-blog-cover.jpeg" alt="blog cover img" />
                      <router-link :to="{ path: '/blogDetail', query: { sn: blog.sn.toString() } }">
                        <div class="popular-title">{{ blog.title }}</div>
                      </router-link>
                      <div class="user-info">
                        <div class="name">作者：{{ blog.author }}</div>
                        <div class="likes">Likes: {{ blog.likes }}</div>
                      </div>
                    </div>
                  </v-card>
                </v-col>
              </div>
            </v-row>
          </v-container>
        </div>

        <div class="recent-container">
          <v-container>
            <h1>All Posts</h1>

            <v-tabs class="mb-4" v-model="category" background-color="transparent" color="black">
              <v-tabs-slider></v-tabs-slider>
              <v-tab v-for="i in categories.length" :key="i" @click="getCategoryBlogs(i - 1)">{{
                categories[i - 1]
              }}</v-tab>
            </v-tabs>
            <v-tabs-items v-model="category">
              <v-tab-item style="background: rgb(248, 247, 247)" v-for="i in categories.length" :key="i">
                <div v-for="(blog, index) in catogorizedBlogs.slice(page * 10 - 10, page * 10)" :key="index">
                  <v-card class="mt-4 pl-4" flat>
                    <v-col>
                      <v-row row-wrap>
                        <v-card-text>
                          <v-row no-gutters>
                            <v-col cols="4">
                              <!-- <v-img
                                class="recent-img"
                                :src="`https://source.unsplash.com/random/200x120?sig=` + Math.random() * index"
                                alt="sample img"
                              /> -->
                              <img
                                v-if="blog.imgIsValid"
                                :src="blog.cover"
                                alt="blog cover img"
                                @error="getDefaultCoverForCategorized(index)"
                              />
                              <img v-else src="../assets/img-default-blog-cover.jpeg" alt="blog cover img" />
                            </v-col>
                            <v-col cols="8">
                              <v-row class="recent-user-info">
                                <v-col cols="8">
                                  <router-link :to="{ path: '/blogDetail', query: { sn: blog.sn.toString() } }">
                                    <div class="recent-blog-title">{{ blog.title }}</div>
                                  </router-link>
                                </v-col>
                                <v-col cols="4">
                                  <v-row class="text-right align-center">
                                    <v-avatar class="mr-4">
                                      <img
                                        :src="`https://source.unsplash.com/random/200x120?sig=` + Math.random() * index"
                                        alt="sample img"
                                      />
                                    </v-avatar>
                                    <p class="recent-user-author">作者: {{ blog.author }}</p>
                                  </v-row>
                                </v-col>
                              </v-row>
                              <v-row>
                                <v-card-text class="recent-blog-content"
                                  >{{ util.escapeHTML(blog.content).substring(0, 100) }}...</v-card-text
                                >
                              </v-row>
                            </v-col>
                          </v-row>
                        </v-card-text>
                      </v-row>
                    </v-col>
                  </v-card>
                </div>
              </v-tab-item>
            </v-tabs-items>

            <v-pagination
              v-if="catogorizedBlogs.length !== 0"
              class="mt-10"
              v-model="page"
              :length="util.getPageLength(catogorizedBlogs)"
              color="black"
            ></v-pagination>
          </v-container>
        </div>
      </div>
    </v-main>
  </div>
</template>

<script>
import util from '../util';
import HeaderNav from '../components/HeaderNav.vue';

export default {
  data() {
    return {
      util,
      category: 'All',
      page: 1,
      categories: ['All', 'Technology', 'Agriculture'],
      blogs: [],
      popularBlogs: [],
      catogorizedBlogs: [],
      isExpired: false,
      dialog: false,
    };
  },
  components: {
    HeaderNav,
  },
  async created() {
    await util
      .post(`${util.getEnvUrl()}/article/list`, {
        article: {
          state: 1,
        },
      })
      .then((response) => {
        if (response.data.data) {
          response.data.data.ArticleDetailList.forEach((blog) => {
            this.blogs.push({
              title: blog.Title,
              tags: blog.Tags,
              content: blog.Content,
              viewNum: blog.ViewNum,
              cmtNum: blog.ViewNum,
              author: blog.Author,
              sn: blog.Sn,
              uid: blog.Uid,
              state: blog.State,
              cover: blog.Cover,
              likes: blog.ZanNum,
              imgIsValid: true,
            });
          });
        }
      });
    this.getPopularBlogs();
    this.catogorizedBlogs = this.blogs;
  },
  methods: {
    getDefaultCoverForPopular(index) {
      this.popularBlogs[index].imgIsValid = false;
    },
    getDefaultCoverForCategorized(index) {
      console.log(index);
      console.log(this.catogorizedBlogs);
      this.catogorizedBlogs[index].imgIsValid = false;
    },
    getPopularBlogs() {
      this.popularBlogs = [...this.blogs];
      this.popularBlogs.sort((a, b) => (a.likes < b.likes && 1) || -1);
    },
    getCategoryBlogs(category) {
      this.page = 1;
      if (category === 1) {
        this.catogorizedBlogs = this.blogs.filter((blog) => {
          return blog.tags === 'Technology';
        });
      } else if (category === 2) {
        this.catogorizedBlogs = this.blogs.filter((blog) => {
          return blog.tags === 'Agriculture';
        });
      } else {
        this.catogorizedBlogs = this.blogs;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.header-container {
  position: relative;
  min-height: 400px;
  background-color: #e2e2e2;
  text-align: center;
  .header-text {
    color: white;
    position: absolute;
    left: 0;
    right: 0;
    margin-left: 5%;
    margin-right: 5%;
    top: 35%;
    text-align: center;
    text-shadow: 0.1em 0.1em 0.3em black;
    .title-en {
      font-size: 1.2rem;
      font-weight: bold;
      margin-bottom: 6px;
    }
    .title-cn {
      font-size: 2.6rem;
      margin: 0;
    }
    .subtitle {
      font-size: 1.2rem;
      font-weight: 900;
    }
  }
  .nav-img {
    width: 100%;
    max-height: 400px;
  }
}

.blogs-container {
  .popular-container {
    padding: 40px 0;
    background: rgb(226, 226, 226);
    .popular-item {
      width: 200px;
      img {
        border-radius: 5px;
        width: 200px;
        height: 120px;
      }
      .popular-title {
        margin-left: 5%;
        font-size: 20px;
        font-weight: 650;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .user-info {
        margin-left: 5%;
      }
    }
  }

  .recent-container {
    padding: 40px 0;
    background: rgb(248, 247, 247);

    .recent-title {
      font-size: 1rem;
      font-weight: 650;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .recent-blog-title {
      font-size: 16px;
    }
    img {
      border-radius: 5px;
      width: 200px;
      height: 120px;
    }
    .recent-user-info {
      margin-top: 2%;
      margin-left: 10px;
      display: flex;
      align-items: center;
      .recent-user-author {
        margin-left: 2%;
        margin-top: 2%;
      }
    }
    .recent-blog-content {
      margin-left: 10px;
    }
  }
}
</style>
