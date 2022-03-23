<template>
  <div class="layout">
    <AdminNav />
    <v-main>
      <v-data-table :headers="headers" :items="blogs" sort-by="modified" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>All Pending Blogs</v-toolbar-title>
          </v-toolbar>
          <v-dialog v-model="approveDialog" fullscreen>
            <v-card>
              <v-card-text>
                <v-col class="pt-8">
                  <v-row>
                    <v-col>
                      <v-btn color="blue darken-1" text @click="approveDialog = false"> 返回 </v-btn>
                    </v-col>
                    <v-col class="text-right">
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="
                          confirmDialog = true;
                          approveAction = true;
                        "
                      >
                        审核通过
                      </v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="
                          confirmDialog = true;
                          approveAction = false;
                        "
                      >
                        审核不通过
                      </v-btn></v-col
                    >
                  </v-row>
                </v-col>
              </v-card-text>
              <v-card-text class="mt-8 ml-16">
                <v-col>
                  <v-row> <v-card-title> 文章标题 </v-card-title></v-row
                  ><v-row>
                    {{ currentArticle.title }}
                  </v-row>
                </v-col>
              </v-card-text>
              <v-card-text class="mt-8 ml-16">
                <v-col>
                  <v-row> <v-card-title> 文章内容 </v-card-title></v-row>
                  <v-row>
                    <div class="blog-content">
                      <div v-dompurify-html="currentArticle.content"></div>
                    </div>
                  </v-row>
                </v-col>
              </v-card-text>
              <v-card-actions>
                <v-dialog v-model="confirmDialog" max-width="500px">
                  <v-card>
                    <v-card-title> 确认以下操作吗？ </v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="
                          confirmDialog = false;
                          approveAction = false;
                        "
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="
                          confirmDialog = false;
                          confirmAction();
                        "
                      >
                        Confirm
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
        <template v-slot:[`item.content`]="{ item }">
          <div class="text-truncate" style="max-width: 130px">
            <div v-dompurify-html="item.content"></div>
          </div>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn text @click="getApproveArticle(item)"> 详情 </v-btn>
        </template>
      </v-data-table>

      <v-data-table :headers="cheaders" :items="comments" sort-by="modified" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>All Pending Comments</v-toolbar-title>
          </v-toolbar>
        </template>
        <template v-slot:[`item.content`]="{ item }">
          <div class="text-truncate" style="max-width: 130px">
            {{ item.content }}
          </div>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn
            text
            @click="
              commentAndReplyDialog = true;
              commentApproveBool = true;
              currentComment = item;
            "
          >
            通过
          </v-btn>
          <v-btn
            text
            @click="
              commentAndReplyDialog = true;
              commentApproveBool = false;
            "
          >
            不通过
          </v-btn>
        </template>
      </v-data-table>

      <v-data-table :headers="rheaders" :items="replies" sort-by="modified" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>All Pending Replies</v-toolbar-title>
          </v-toolbar>
        </template>
        <template v-slot:[`item.content`]="{ item }">
          <div class="text-truncate" style="max-width: 130px">
            {{ item.content }}
          </div>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn
            text
            @click="
              commentAndReplyDialog = true;
              replyApproveBool = true;
              currentReply = item;
            "
          >
            通过
          </v-btn>
          <v-btn
            text
            @click="
              commentAndReplyDialog = true;
              replyApproveBool = false;
            "
          >
            不通过
          </v-btn>
        </template>
      </v-data-table>

      <v-dialog v-model="commentAndReplyDialog" max-width="500px">
        <v-card>
          <v-card-title v-if="commentApproveBool === true || replyApproveBool === true">
            确认审核通过吗？
          </v-card-title>
          <v-card-title v-else> 确认审核不通过吗？ </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="commentDialog = false"> Cancel </v-btn>
            <v-btn
              v-if="commentApproveBool === true || replyApproveBool === true"
              color="blue darken-1"
              text
              @click="
                if (commentApproveBool === true) {
                  approveComment(currentComment, true);
                }
                if (replyApproveBool === true) {
                  approveReply(currentReply, true);
                }
                commentAndReplyDialog = false;
              "
            >
              Confirm
            </v-btn>
            <v-btn
              v-else
              color="blue darken-1"
              text
              @click="
                if (commentApproveBool === false) {
                  approveComment(currentComment, false);
                }
                if (replyApproveBool === false) {
                  approveReply(currentReply, false);
                }
                commentAndReplyDialog = false;
              "
            >
              Confirm
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="successDialog" max-width="500px">
        <v-card>
          <v-card-title> Success! </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close"> Close </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="failureDialog" max-width="500px">
        <v-card>
          <v-card-title> Something went wrong... </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close"> Close </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-main>
  </div>
</template>

<script>
import util from '../../util';
import AdminNav from '../../components/AdminNav.vue';

export default {
  data() {
    return {
      blogs: [],
      comments: [],
      replies: [],
      headers: [
        { text: 'Title', value: 'title' },
        { text: 'Tags', value: 'tags' },
        { text: 'Content', value: 'content' },
        { text: 'Actions', value: 'actions', sortable: false, align: 'center' },
      ],
      cheaders: [
        { text: 'id', value: 'cid' },
        { text: 'Content', value: 'content' },
        { text: 'Actions', value: 'actions', sortable: false, align: 'center' },
      ],
      rheaders: [
        { text: 'id', value: 'rid' },
        { text: 'Content', value: 'content' },
        { text: 'Actions', value: 'actions', sortable: false, align: 'center' },
      ],
      // for blog approval
      approveDialog: false,
      confirmDialog: false,
      currentArticle: '',
      approveAction: false,
      // for general purpose dialog
      successDialog: false,
      failureDialog: false,
      // for comment and reply approval
      commentApproveBool: false,
      replyApproveBool: false,
      commentAndReplyDialog: false,
      currentComment: '',
      currentReply: '',
    };
  },
  components: {
    AdminNav,
  },
  created() {
    this.getBlogList();
    this.getCommentList();
    this.getReplyList();
  },
  methods: {
    async getBlogList() {
      await util.post(`${util.getEnvUrl()}/admin/review/query/article/list`, {}, this.$router).then((response) => {
        if (response.data.data.ArticleMap) {
          const sn = Object.keys(response.data.data.ArticleMap);
          let index = 0;
          Object.values(response.data.data.ArticleMap).forEach((blog) => {
            this.blogs.push({
              sn: sn[index],
              title: blog.Title,
              tags: blog.Tags,
              content: util.escapeHTML(blog.Content),
              author: blog.Author,
              uid: blog.Uid,
              cover: blog.Cover,
            });
            index += 1;
          });
        }
      });
    },
    async getCommentList() {
      await util.post(`${util.getEnvUrl()}/admin/review/query/comment/list`, {}, this.$router).then((response) => {
        if (response.data.data.CommentMap) {
          Object.values(response.data.data.CommentMap).forEach((comment) => {
            this.comments.push({
              content: comment.Content,
              uid: comment.UID,
              cid: comment.Cid,
            });
          });
        }
      });
    },
    async getReplyList() {
      await util.post(`${util.getEnvUrl()}/admin/review/query/reply/list`, {}, this.$router).then((response) => {
        if (response.data.data.ReplyMap) {
          Object.values(response.data.data.ReplyMap).forEach((reply) => {
            this.replies.push({
              content: reply.Content,
              uid: reply.UID,
              rid: reply.Id,
            });
          });
        }
      });
    },
    getApproveArticle(item) {
      this.approveDialog = true;
      this.currentArticle = item;
    },
    async confirmAction() {
      if (this.approveAction === true) {
        await util
          .post(`${util.getEnvUrl()}/admin/review/article`, { sn: this.currentArticle.sn, state: true }, this.$router)
          .then((response) => {
            this.checkSuccess(response);
          });
        this.blogs = [];
        this.getBlogList();
      } else {
        await util
          .post(
            `${util.getEnvUrl()}/admin/review/article`,
            {
              sn: this.currentArticle.sn,
              state: false,
            },
            this.$router
          )
          .then((response) => {
            this.checkSuccess(response);
          });
        this.blogs = [];
        this.getBlogList();
      }
    },
    async approveComment(item, bool) {
      await util
        .post(`${util.getEnvUrl()}/admin/review/comment`, { commentId: item.cid, state: bool }, this.$router)
        .then((response) => {
          this.checkSuccess(response);
        });
      this.comments = [];
      this.getCommentList();
    },
    async approveReply(item, bool) {
      await util
        .post(`${util.getEnvUrl()}/admin/review/reply`, { replyId: item.rid, state: bool }, this.$router)
        .then((response) => {
          console.log(response);
          this.checkSuccess(response);
        });
      this.replies = [];
      this.getReplyList();
    },
    close() {
      this.successDialog = false;
      this.failureDialog = false;
      this.approveDialog = false;
    },
    checkSuccess(response) {
      if (response.data.code === 10000) {
        this.successDialog = true;
      } else {
        this.failureDialog = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
}
</style>
