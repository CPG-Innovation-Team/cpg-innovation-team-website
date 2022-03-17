<template>
  <div>
    <div class="header-container">
      <img class="nav-img" src="https://picsum.photos/2000/" alt="header image" />

      <div class="header-text">
        <p class="title-cn">{{ blog.title }}</p>
        <p class="subtitle">Author: {{ blog.author }}</p>
        <div>
          Likes: {{ likes }}
          <v-btn icon color="pink" @click="likeArticle(articleLikeIsClicked)">
            <v-icon v-if="articleLikeIsClicked">mdi-heart</v-icon>
            <v-icon v-else color="grey lighten-1">mdi-heart</v-icon>
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
              <div v-dompurify-html="blog.content"></div>
            </div>
          </div>
          <v-divider></v-divider>
          <div class="blog-comment">
            <v-card class="ma-4" min-width="800">
              <v-subheader> Comments </v-subheader>

              <v-list v-if="comments" two-line>
                <template v-for="n in comments.length">
                  <v-list-item v-if="comments[n - 1].state === 1" :key="n">
                    <v-col>
                      <v-row>
                        <v-list-item-avatar>
                          <v-img src="https://randomuser.me/api/portraits/men/81.jpg"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title>{{ comments[n - 1].nickname }}</v-list-item-title>

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
                          <v-btn color="primary" @click="clickReply(n)">Reply {{ getReplyBtnIcon(n) }}</v-btn>
                        </v-list-item-action>
                      </v-row>
                      <v-subheader v-if="comments[n - 1].replies.length > 0"> Replies </v-subheader>
                      <div v-show="comment_index === n && comments[n - 1].replyIsClicked === true" :key="n">
                        <v-textarea
                          class="ma-4"
                          v-model="reply"
                          required
                          hide-details
                          dense
                          outlined
                          :disabled="notLoggedIn"
                          :label="commentLabel"
                        ></v-textarea>
                        <v-btn
                          v-if="!notLoggedIn"
                          class="mb-4 ml-4"
                          color="blue darken-1"
                          text
                          @click="sendReply(comments[n - 1].cid, reply)"
                        >
                          Send
                        </v-btn>
                      </div>
                      <v-row class="ml-4">
                        <v-list>
                          <template v-for="i in comments[n - 1].replies.length">
                            <v-list-item :key="i">
                              <v-list-item-avatar>
                                <v-img src="https://randomuser.me/api/portraits/men/81.jpg"></v-img
                              ></v-list-item-avatar>
                              <v-list-item-content>
                                <v-list-item-title>{{ comments[n - 1].replies[i - 1].NickName }}</v-list-item-title>
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
                  <v-divider v-if="n !== 10 && comments[n - 1].state === 1" :key="`divider-${n}`" inset></v-divider>
                </template>
              </v-list>

              <v-textarea
                class="ma-4"
                v-model="comment"
                required
                hide-details
                dense
                outlined
                :disabled="notLoggedIn"
                :label="commentLabel"
              ></v-textarea>
              <v-btn v-if="!notLoggedIn" class="mb-4 ml-4" color="blue darken-1" text @click="sendComment(comment)">
                Send
              </v-btn>
            </v-card>
          </div>

          <v-dialog v-model="successDialog" max-width="500px">
            <v-card>
              <v-card-title> {{ successMessage }} </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close"> Close </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="failureDialog" max-width="500px">
            <v-card>
              <v-card-title> {{ failureMessage }} </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close"> Close </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
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
      notLoggedIn: false,
      commentLabel: '',
      successDialog: false,
      failureDialog: false,
      successMessage: '',
      failureMessage: '',
      replyBtnIcon: '▼',
      articleLikeIsClicked: false,
    };
  },
  components: {
    HeaderNav,
  },
  async created() {
    if (this.$route.query.sn) {
      this.sn = this.$route.query.sn;
      await this.getArticleInfo();
      this.checkLoginStatus();
      await this.getComments();
      await this.getArticleLikes();
    }
  },
  methods: {
    async getArticleInfo() {
      await util
        .post(`${util.getEnvUrl()}/article/info`, {
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
          this.articleLikeIsClicked = response.data.data.ZanState;
        });
    },
    async sendComment(comment) {
      if (comment.trim() !== '') {
        await util
          .post(`${util.getEnvUrl()}/comment/add`, {
            sn: this.sn,
            content: comment,
          })
          .then((response) => {
            if (response.data.code === 10000) {
              this.successDialog = true;
              this.successMessage = '评论发表成功！进入审核状态';
            } else {
              this.failureDialog = true;
              this.failureMessage = '评论发表失败';
            }
          });
        this.comments = [];
        await this.getComments();
        this.comment = '';
      }
    },
    async sendReply(cid, reply) {
      if (reply.trim() !== '') {
        await util
          .post(`${util.getEnvUrl()}/comment/reply`, {
            commentId: cid,
            content: reply,
          })
          .then((response) => {
            if (response.data.code === 10000) {
              this.successDialog = true;
              this.successMessage = '回复发表成功！进入审核状态';
              this.comments = [];
              this.getComments();
              this.reply = '';
              this.comment_index = -1;
            } else {
              this.failureDialog = true;
              this.failureMessage = '回复发表失败';
            }
          });
      }
    },
    async getComments() {
      await util
        .post(`${util.getEnvUrl()}/comment/list`, {
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
              nickname: response.data.data[i].NickName,
              createdAt: dateString.replace(',', '').replace('PM', 'p.m.').replace('AM', 'a.m.'),
              uid: response.data.data[i].UID,
              zanNum: response.data.data[i].ZanNum,
              likeIsClicked: false,
              replyIsClicked: false,
              replies: response.data.data[i].ReplyList || [],
              state: response.data.data[i].State,
            });
          }
        });
    },
    likeComment(n) {
      this.comments[n].likeIsClicked = !this.comments[n].likeIsClicked;
      util
        .post(`${util.getEnvUrl()}/like`, {
          comment_id: this.comments[n].cid,
        })
        .then((response) => {
          if (response.data.code === 10000) {
            this.comments[n].zanNum += 1;
          }
        });
    },
    unlikeComment(n) {
      this.comments[n].likeIsClicked = !this.comments[n].likeIsClicked;
      util
        .post(`${util.getEnvUrl()}/like/cancel`, {
          comment_id: this.comments[n].cid,
        })
        .then((response) => {
          if (response.data.code === 10000) {
            this.comments[n].zanNum -= 1;
          }
        });
    },
    likeArticle(articleLikeIsClicked) {
      // check if the user has liked the article
      if (articleLikeIsClicked === true) {
        util
          .post(`${util.getEnvUrl()}/like/cancel`, {
            sn: this.sn,
          })
          .then(async () => {
            await this.getArticleLikes();
            this.articleLikeIsClicked = false;
          });
      } else {
        util
          .post(`${util.getEnvUrl()}/like`, {
            sn: this.sn,
          })
          .then(async () => {
            await this.getArticleLikes();
            this.articleLikeIsClicked = true;
          });
      }
    },
    async getArticleLikes() {
      await util
        .post(`${util.getEnvUrl()}/article/list`, {
          article: {
            state: 1,
          },
        })
        .then((response) => {
          if (response.data.data) {
            response.data.data.ArticleDetailList.forEach((blog) => {
              if (blog.Sn.toString() === this.sn) {
                this.likes = blog.ZanNum;
              }
            });
          }
        });
    },
    clickReply(n) {
      this.comment_index = n;
      // once a reply button is clicked, close all other reply boxes
      for (let i = 0; i < this.comments.length; i += 1) {
        if (i !== n - 1) {
          this.comments[i].replyIsClicked = false;
        }
      }
      // toggle the status of a reply box given the index
      this.comments[n - 1].replyIsClicked = !this.comments[n - 1].replyIsClicked;
    },
    getReplyBtnIcon(n) {
      if (this.comments[n - 1].replyIsClicked === true) {
        return '▲';
      }
      return '▼';
    },
    checkLoginStatus() {
      if (!localStorage.token) {
        this.notLoggedIn = true;
        this.commentLabel = '发表评论请先注册';
      } else {
        this.commentLabel = '编辑评论';
      }
    },
    close() {
      this.successDialog = false;
      this.failureDialog = false;
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
  line-height: 28px;
  margin-bottom: 80px;
}

.blog-comment {
  display: flex;
  justify-content: center;
  margin-top: 3%;
}
</style>
