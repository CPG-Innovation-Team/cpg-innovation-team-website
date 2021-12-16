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
                    <v-col>
                      <v-row>
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
                          <v-col class="text-right">
                            <v-icon
                              v-if="!comments[n - 1].likeIsClicked"
                              color="grey lighten-1"
                              @click="likeComment(n - 1)"
                            >
                              mdi-heart-outline
                            </v-icon>
                            <v-icon v-else color="yellow darken-3" @click="unlikeComment(n - 1)"> mdi-heart </v-icon>
                            <v-list-item-subtitle> Likes: {{ comments[n - 1].zanNum }}</v-list-item-subtitle>
                          </v-col>
                          <v-btn color="primary" @click="replyIsClicked(n)">Reply</v-btn>
                        </v-list-item-action>
                      </v-row>
                      <v-subheader v-if="comments[n - 1].replies.length > 0"> Replies </v-subheader>
                      <div v-show="comment_index === n" :key="n">
                        <v-textarea
                          class="ma-4"
                          v-model="reply"
                          required
                          hide-details
                          dense
                          outlined
                          label="reply"
                        ></v-textarea>
                        <v-btn
                          class="mb-4 ml-4"
                          color="blue darken-1"
                          text
                          @click="sendReply(comments[n - 1].cid, reply)"
                        >
                          Send
                        </v-btn>
                      </div>
                      <v-row>
                        <v-list>
                          <template v-for="i in comments[n - 1].replies.length">
                            <v-list-item :key="i">
                              <v-list-item-avatar color="grey darken-1"> </v-list-item-avatar>
                              <v-list-item-content>
                                <v-list-item-title>{{ comments[n - 1].replies[i - 1].UID }}</v-list-item-title>
                                <v-list-item-subtitle>
                                  {{ comments[n - 1].replies[i - 1].Content }}
                                </v-list-item-subtitle>
                              </v-list-item-content>
                            </v-list-item>
                          </template>
                        </v-list>
                      </v-row>
                    </v-col>
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
import util from '../util';
import HeaderNav from '../components/HeaderNav.vue';

export default {
  data() {
    return {
      likes: 0,
      currentLikes: 0,
      blog: [],
      sn: '',
      comment_index: -1,
      comments: [],
      comment: '',
      reply: '',
    };
  },
  components: {
    HeaderNav,
  },
  async created() {
    if (this.$route.query.sn) {
      this.sn = this.$route.query.sn;
      await util
        .post('http://localhost:8080/admin/article/info', {
          sn: this.sn,
        })
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
      await util.post('http://localhost:8080/comment/add', {
        sn: this.sn,
        content: comment,
      });
      this.comments = [];
      await this.getComments();
      this.comment = '';
    },
    async sendReply(cid, reply) {
      await util
        .post('http://localhost:8080/comment/reply', {
          commentId: cid,
          content: reply,
        })
        .then(() => {
          this.comments = [];
          this.getComments();
          this.reply = '';
          this.comment_index = -1;
        });
    },
    getComments() {
      util
        .post('http://localhost:8080/comment/list', {
          sn: this.sn,
        })
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
              replies: response.data.data[i].ReplyList,
            });
          }
        });
    },
    likeComment(n) {
      this.comments[n].likeIsClicked = !this.comments[n].likeIsClicked;
      util
        .post('http://localhost:8080/like', {
          comment_id: this.comments[n].cid,
        })
        .then(() => {
          this.comments[n].zanNum += 1;
        });
    },
    unlikeComment(n) {
      this.comments[n].likeIsClicked = !this.comments[n].likeIsClicked;
      util
        .post('http://localhost:8080/like/cancel', {
          comment_id: this.comments[n].cid,
        })
        .then(() => {
          this.comments[n].zanNum -= 1;
        });
    },
    likeArticle() {
      util
        .post('http://localhost:8080/like', {
          sn: this.sn,
        })
        .then(async () => {
          this.currentLikes = this.likes;
          await this.getArticleLikes();
          if (this.currentLikes === this.likes) {
            util
              .post('http://localhost:8080/like/cancel', {
                sn: parseInt(this.sn, 10),
              })
              .then(() => {
                this.getArticleLikes();
              });
          }
        });
    },
    async getArticleLikes() {
      await util
        .post('http://localhost:8080/admin/article/list', {
          article: {
            state: 1,
          },
        })
        .then((response) => {
          console.log(response);
          response.data.data.ArticleDetailList.forEach((blog) => {
            if (blog.Sn.toString() === this.sn) {
              this.likes = blog.ZanNum;
            }
          });
        });
    },
    replyIsClicked(n) {
      this.comment_index = n;
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
