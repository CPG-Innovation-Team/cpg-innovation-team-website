<template>
  <div>
    <div class="header-container">
      <img class="nav-img" src="https://picsum.photos/2000/" alt="header image" />

      <div class="header-text">
        <p class="title-cn">博客</p>
        <p class="subtitle">正大创新项目中心博客</p>
      </div>
      <HeaderNav />
    </div>

    <v-main class="pt-0">
      <div class="blogs-container">
        <div v-if="!isExpired" class="popular-container">
          <h1 style="text-align: center">Most Popular</h1>
          <v-container>
            <v-row>
              <div v-for="(blog, index) in blogs" :key="index">
                <v-col>
                  <div class="popular-item">
                    <img
                      :src="`https://source.unsplash.com/random/200x120?sig=` + Math.random() * index"
                      alt="sample img"
                    />
                    <router-link :to="{ path: '/blogDetail', query: { sn: blog.sn } }">
                      <div class="popular-title">{{ blog.title }}</div>
                    </router-link>
                    <div class="user-info">
                      <v-avatar class="avatar">
                        <img
                          :src="`https://source.unsplash.com/random/200x120?sig=` + Math.random() * index"
                          alt="sample img"
                        />
                      </v-avatar>
                      <div>
                        <div class="name">{{ blog.author }}</div>

                        <div class="date">Likes: {{ blog.likes }}</div>
                      </div>
                    </div>
                    <div class="description">{{ blog.content.substring(0, 30) }}...</div>
                  </div>
                </v-col>
              </div>
            </v-row>
          </v-container>
        </div>

        <div class="recent-container">
          <v-container>
            <h1>Recent Post</h1>

            <v-tabs class="mb-5" v-model="category" background-color="transparent" color="black">
              <v-tabs-slider></v-tabs-slider>
              <v-tab>All</v-tab>
              <v-tab>Technology</v-tab>
              <v-tab>Agriculture</v-tab>
            </v-tabs>

            <div v-if="isExpired">Please log in to see the contents.</div>

            <v-tabs-items v-model="category">
              <v-tab-item style="background: rgb(248, 247, 247)">
                <div v-for="(blog, index) in blogs" :key="index">
                  <v-row>
                    <v-col cols="3">
                      <img
                        :src="`https://source.unsplash.com/random/200x120?sig=` + Math.random() * index"
                        alt="sample img"
                      />
                    </v-col>
                    <v-col>
                      <div class="recent-title">{{ blog.title }}</div>
                      <div class="user-info">
                        <v-avatar class="avatar">
                          <img
                            :src="`https://source.unsplash.com/random/200x120?sig=` + Math.random() * index"
                            alt="sample img"
                          />
                        </v-avatar>
                        <div>
                          <div class="name">{{ blog.author }}</div>
                          <div class="date">Likes: {{ blog.likes }}</div>
                        </div>
                      </div>
                      <div class="description">{{ blog.content.substring(0, 120) }}...</div>
                    </v-col>
                  </v-row>
                </div>
              </v-tab-item>
            </v-tabs-items>

            <v-pagination
              v-if="blogs.length !== 0"
              class="mt-10"
              v-model="page"
              :length="util.getPageLength(blogs)"
              color="black"
            ></v-pagination>
          </v-container>
        </div>
        <v-row justify="space-around">
          <v-col cols="auto">
            <v-dialog transition="dialog-bottom-transition" max-width="600" v-model="dialog">
              <template>
                <v-card>
                  <v-card-text>
                    <div class="text-h6 pa-6">Your login session has expired, please log in again.</div>
                  </v-card-text>
                  <v-card-actions class="justify-end">
                    <v-btn text @click="dialog = false">Close</v-btn>
                    <router-link class="login-btn mr-2" to="/login">
                      <v-btn text>Log in</v-btn>
                    </router-link>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </v-col>
        </v-row>
      </div>
    </v-main>
  </div>
</template>

<script>
import axios from 'axios';
import util from '../util';
import HeaderNav from '../components/HeaderNav.vue';

export default {
  data() {
    return {
      util,
      category: '',
      page: 1,
      token: '',
      blogs: [],
      isExpired: false,
      dialog: false,
    };
  },
  components: {
    HeaderNav,
  },
  async created() {
    if (localStorage.token) {
      this.token = localStorage.token;
    }
    await axios
      .post(
        'http://localhost:8080/admin/article/list',
        {
          article: {
            state: 1,
          },
        },
        {
          headers: {
            token: this.token,
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.data.message === 'Token is expired.' || response.data.message === 'Invalid Token.') {
          this.isExpired = true;
          this.dialog = true;
        } else {
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
            });
          });
        }
      });
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.header-container {
  position: relative;
  height: 400px;
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
    height: 400px;
    opacity: 2;
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
      }
      .popular-title {
        font-size: 1rem;
        font-weight: 650;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .user-info {
        display: flex;
        padding: 8px 0;
        .avatar {
          height: 38px !important;
          width: 38px !important;
          min-width: 38px !important;
          margin-right: 8px;
          align-self: center;
        }
        .name {
          font-size: 0.96rem;
          font-weight: 500;
        }
        .date {
          font-size: 0.88rem;
          font-weight: 380;
        }
      }
      .description {
        font-size: 0.88rem;
        font-weight: 400;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  .recent-container {
    padding: 40px 0;
    background: rgb(248, 247, 247);
    img {
      border-radius: 5px;
    }
    .recent-title {
      font-size: 1rem;
      font-weight: 650;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .user-info {
      display: flex;
      padding: 8px 0;
      .avatar {
        height: 38px !important;
        width: 38px !important;
        min-width: 38px !important;
        margin-right: 8px;
        align-self: center;
      }
      .name {
        font-size: 0.96rem;
        font-weight: 500;
      }
      .date {
        font-size: 0.88rem;
        font-weight: 380;
      }
    }
    .description {
      font-size: 0.88rem;
      font-weight: 400;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
