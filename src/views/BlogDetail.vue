<template>
  <div>
    <div class="header-container">
      <img class="nav-img" src="https://picsum.photos/2000/" alt="header image" />

      <div class="header-text">
        <p class="title-cn">{{ blog.title }}</p>
        <p class="subtitle">Author: {{ blog.author }}</p>
        <div>
          Likes: {{ likes }}
          <v-btn icon color="pink" @click="likeArticle()">
            <v-icon>mdi-heart</v-icon>
          </v-btn>
        </div>
      </div>
      <HeaderNav />
    </div>

    <v-main>
      <v-row>
        <v-col>
          <div class="blog-container">
            <div class="blog-content">
              {{ blog.content }}
            </div>
          </div>
          <v-divider></v-divider>
          <div class="blog-comment">
            <v-card class="ma-4" min-width="800">
              <v-subheader> Comments </v-subheader>

              <v-list two-line>
                <template v-for="n in comments.length">
                  <v-list-item :key="n">
                    <v-list-item-avatar color="grey darken-1"> </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>{{ comments[n - 1].uid }}</v-list-item-title>

                      <v-list-item-subtitle>
                        {{ comments[n - 1].content }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action :key="n">
                      <v-list-item-subtitle>
                        {{ comments[n - 1].createdAt }}
                      </v-list-item-subtitle>
                      <v-icon v-if="!comments[n - 1].likeIsClicked" color="grey lighten-1" @click="likeComment(n - 1)">
                        mdi-heart-outline
                      </v-icon>
                      <v-icon v-else color="yellow darken-3" @click="unlikeComment(n - 1)"> mdi-heart </v-icon>
                      <v-list-item-subtitle> Likes: {{ comments[n - 1].zanNum }}</v-list-item-subtitle>
                    </v-list-item-action>
                  </v-list-item>

                  <v-divider v-if="n !== 10" :key="`divider-${n}`" inset></v-divider>
                </template>
              </v-list>

              <v-textarea
                class="ma-4"
                v-model="comment"
                required
                hide-details
                dense
                outlined
                label="comment"
              ></v-textarea>
              <v-btn class="mb-4 ml-4" color="blue darken-1" text @click="sendComment(comment)"> Send </v-btn>
            </v-card>
          </div></v-col
        >
      </v-row>
    </v-main>
  </div>
</template>

<script>
import axios from 'axios';
import HeaderNav from '../components/HeaderNav.vue';

export default {
  data() {
    return {
      token: '',
      likes: 0,
      currentLikes: 0,
      blog: [],
      sn: '',
      comments: [],
      comment: '',
    };
  },
  components: {
    HeaderNav,
  },
  async created() {
    if (localStorage.token) {
      this.token = localStorage.token;
    }
    if (this.$route.query.sn) {
      this.sn = this.$route.query.sn;
      await axios
        .post(
          'http://localhost:8080/admin/article/info',
          {
            sn: parseInt(this.sn, 10),
          },
          {
            headers: {
              token: this.token,
            },
          }
        )
        .then((response) => {
          this.blog = {
            title: response.data.data.Title,
            tags: response.data.data.Tags,
            content: response.data.data.Content,
            author: response.data.data.Author,
            cover: response.data.data.Cover,
            state: response.data.data.State,
            updatedAt: response.data.data.UpdatedAt,
            createdAt: response.data.data.CreatedAt,
          };
        });
      this.getComments();
      this.getArticleLikes();
    }
  },
  methods: {
    async sendComment(comment) {
      await axios
        .post(
          'http://localhost:8080/comment/add',
          {
            sn: parseInt(this.sn, 10),
            content: comment,
          },
          {
            headers: {
              token: this.token,
            },
          }
        )
        .then((response) => console.log(response));
      this.comments = [];
      await this.getComments();
      this.comment = '';
    },
    getComments() {
      axios
        .post(
          'http://localhost:8080/comment/list',
          {
            sn: parseInt(this.sn, 10),
          },
          {
            headers: {
              token: this.token,
            },
          }
        )
        .then((response) => {
          for (let i = 1; i <= Object.keys(response.data.data).length; i += 1) {
            const date = new Date(response.data.data[i].CreatedAt);
            const formatOptions = {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            };
            const dateString = date.toLocaleDateString('zh-Hans-CN', formatOptions);
            this.comments.push({
              cid: response.data.data[i].Cid,
              content: response.data.data[i].Content,
              createdAt: dateString.replace(',', '').replace('PM', 'p.m.').replace('AM', 'a.m.'),
              uid: response.data.data[i].UID,
              zanNum: response.data.data[i].ZanNum,
              likeIsClicked: false,
            });
          }
        });
    },
    likeComment(n) {
      this.comments[n].likeIsClicked = !this.comments[n].likeIsClicked;
      axios
        .post(
          'http://localhost:8080/like',
          {
            comment_id: this.comments[n].cid,
          },
          {
            headers: {
              token: this.token,
            },
          }
        )
        .then(() => {
          this.comments[n].zanNum += 1;
        });
    },
    unlikeComment(n) {
      this.comments[n].likeIsClicked = !this.comments[n].likeIsClicked;
      axios
        .post(
          'http://localhost:8080/like/cancel',
          {
            comment_id: this.comments[n].cid,
          },
          {
            headers: {
              token: this.token,
            },
          }
        )
        .then(() => {
          this.comments[n].zanNum -= 1;
        });
    },
    likeArticle() {
      axios
        .post(
          'http://localhost:8080/like',
          {
            sn: parseInt(this.sn, 10),
          },
          {
            headers: {
              token: this.token,
            },
          }
        )
        .then(async () => {
          this.currentLikes = this.likes;
          await this.getArticleLikes();
          if (this.currentLikes === this.likes) {
            axios
              .post(
                'http://localhost:8080/like/cancel',
                {
                  sn: parseInt(this.sn, 10),
                },
                {
                  headers: {
                    token: this.token,
                  },
                }
              )
              .then(() => {
                this.getArticleLikes();
              });
          }
        });
    },
    async getArticleLikes() {
      await axios
        .post(
          'http://localhost:8080/admin/article/list',
          {
            isAllMyselfArticles: true,
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
          response.data.data.ArticleDetailList.forEach((blog) => {
            if (blog.Sn.toString() === this.sn) {
              this.likes = blog.ZanNum;
            }
          });
        });
    },
  },
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

.blog-container {
  margin-top: 3%;
  margin-left: 20%;
  margin-right: 20%;
  text-align: left;
  word-wrap: break-word;
}

.blog-content {
  font-size: 15px;
  white-space: pre-line;
  line-height: 28px;
  margin-bottom: 80px;
}

.blog-comment {
  display: flex;
  justify-content: center;
  margin-top: 3%;
}
</style>
