<template>
  <div>
    <div class="header-container">
      <img class="nav-img" :src="blog.cover" alt="header image" />

      <div class="header-text">
        <p class="title-cn">{{ blog.title }}</p>
        <p class="subtitle">{{ localeMsg.author }}: {{ blog.author }}</p>
        <div>
          {{ localeMsg.likes }}: {{ likes }}
          <v-btn icon color="pink" @click="likeArticle(articleLikeIsClicked)">
            <v-icon v-if="articleLikeIsClicked">mdi-heart</v-icon>
            <v-icon v-else color="pink lighten-3">mdi-heart-outline</v-icon>
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
              <v-subheader> {{ localeMsg.comments }} </v-subheader>

              <v-list v-if="comments" two-line>
                <template v-for="n in comments.length">
                  <v-list-item v-if="comments[n - 1].state === 1" :key="n">
                    <v-col>
                      <v-row>
                        <v-list-item-avatar>
                          <v-img v-if="comments[n - 1].avatar !== ''" :src="comments[n - 1].avatar"></v-img>
                          <v-img v-else src="../assets/icon-default-avatar.jpeg"></v-img>
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
                              v-if="!comments[n - 1].commentLikeIsClicked"
                              color="grey lighten-1"
                              @click="likeComment(n - 1)"
                            >
                              mdi-heart-outline
                            </v-icon>
                            <v-icon v-else color="yellow darken-3" @click="unlikeComment(n - 1)"> mdi-heart </v-icon>
                            <v-list-item-subtitle>
                              {{ localeMsg.likes }}: {{ comments[n - 1].zanNum }}</v-list-item-subtitle
                            >
                          </v-col>
                          <v-btn color="primary" @click="clickReply(n)"
                            >{{ localeMsg.replyBtn }} {{ getReplyBtnIcon(n) }}</v-btn
                          >
                        </v-list-item-action>
                      </v-row>
                      <v-subheader v-if="comments[n - 1].replies.length > 0"> {{ localeMsg.replies }} </v-subheader>
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
                          {{ localeMsg.sendBtn }}
                        </v-btn>
                      </div>
                      <v-row class="ml-4">
                        <v-list>
                          <template v-for="i in comments[n - 1].replies.length">
                            <v-list-item :key="i">
                              <v-list-item-avatar>
                                <v-img
                                  v-if="comments[n - 1].replies[i - 1].Avatar !== ''"
                                  :src="comments[n - 1].replies[i - 1].Avatar"
                                ></v-img>
                                <v-img v-else src="../assets/icon-default-avatar.jpeg"></v-img>
                              </v-list-item-avatar>
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
                {{ localeMsg.sendBtn }}
              </v-btn>
            </v-card>
          </div>

          <v-dialog v-model="successDialog" max-width="600px">
            <v-card>
              <v-card-title> {{ successMessage }} </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close"> {{ localeMsg.confirm }} </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="failureDialog" max-width="600px">
            <v-card>
              <v-card-title> {{ failureMessage }} </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close"> {{ localeMsg.confirm }} </v-btn>
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
  created() {
    if (this.$route.query.sn) {
      this.sn = this.$route.query.sn;
      this.getArticleInfo();
      this.checkLoginStatus();
      this.getComments();
      this.getArticleLikes();
    }
  },
  watch: {
    localeMsg() {
      this.comments = [];
      this.getComments();
      this.checkLoginStatus();
    },
  },
  computed: {
    localeMsg() {
      return {
        author: this.$t('blog.author'),
        likes: this.$t('blog.likes'),
        comments: this.$t('blogDetail.comments'),
        commentMsg: this.$t('blogDetail.commentMsg'),
        replies: this.$t('blogDetail.replies'),
        replyBtn: this.$t('blogDetail.replyBtn'),
        sendBtn: this.$t('blogDetail.sendBtn'),
        confirm: this.$t('dialogMsg.confirm'),
      };
    },
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
        });
      if (localStorage.token) {
        await util
          .post(`${util.getEnvUrl()}/admin/article/info`, {
            sn: this.sn,
          })
          .then((response) => {
            this.articleLikeIsClicked = response.data.data.ZanState;
          });
      }
    },
    async sendComment(comment) {
      if (comment.trim() !== '') {
        await util
          .post(
            `${util.getEnvUrl()}/comment/add`,
            {
              sn: this.sn,
              content: comment,
            },
            this.$router
          )
          .then((response) => {
            if (response.data.code === 10000) {
              this.successDialog = true;
              this.successMessage = `${this.$t('dialogMsg.commentSuccess')}`;
            } else {
              this.failureDialog = true;
              this.failureMessage = `${this.$t('dialogMsg.commentFailure')}`;
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
          .post(
            `${util.getEnvUrl()}/comment/reply`,
            {
              commentId: cid,
              content: reply,
            },
            this.$router
          )
          .then((response) => {
            if (response.data.code === 10000) {
              this.successDialog = true;
              this.successMessage = `${this.$t('dialogMsg.commentSuccess')}`;
              this.comments = [];
              this.getComments();
              this.reply = '';
              this.comment_index = -1;
            } else {
              this.failureDialog = true;
              this.failureMessage = `${this.$t('dialogMsg.commentFailure')}`;
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
            const dateString = date.toLocaleDateString(`${this.$t('locale')}`, formatOptions);
            this.comments.push({
              cid: response.data.data[i].Cid,
              content: response.data.data[i].Content,
              nickname: response.data.data[i].NickName,
              createdAt: dateString.replace(',', '').replace('PM', 'p.m.').replace('AM', 'a.m.'),
              uid: response.data.data[i].UID,
              zanNum: response.data.data[i].ZanNum,
              replyIsClicked: false,
              avatar: response.data.data[i].Avatar,
              replies: response.data.data[i].ReplyList || [],
              state: response.data.data[i].State,
              commentLikeIsClicked: response.data.data[i].ZanState,
            });
          }
        });
    },
    likeComment(n) {
      util
        .post(
          `${util.getEnvUrl()}/like`,
          {
            comment_id: this.comments[n].cid,
          },
          this.$router
        )
        .then((response) => {
          if (response.data.code === 10000) {
            this.comments[n].zanNum += 1;
            this.comments[n].commentLikeIsClicked = true;
          }
        });
    },
    unlikeComment(n) {
      util
        .post(
          `${util.getEnvUrl()}/like/cancel`,
          {
            comment_id: this.comments[n].cid,
          },
          this.$router
        )
        .then((response) => {
          if (response.data.code === 10000) {
            this.comments[n].zanNum -= 1;
            this.comments[n].commentLikeIsClicked = false;
          }
        });
    },
    likeArticle(articleLikeIsClicked) {
      // check if the user has liked the article
      if (articleLikeIsClicked === true) {
        util
          .post(
            `${util.getEnvUrl()}/like/cancel`,
            {
              sn: this.sn,
            },
            this.$router
          )
          .then(async () => {
            await this.getArticleLikes();
            this.articleLikeIsClicked = false;
          });
      } else {
        util
          .post(
            `${util.getEnvUrl()}/like`,
            {
              sn: this.sn,
            },
            this.$router
          )
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
        this.commentLabel = `${this.$t('blogDetail.commentMsg')}`;
      } else {
        this.commentLabel = `${this.$t('blogDetail.editComment')}`;
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
  background-color: lightgrey;
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
    opacity: 0.4;
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
