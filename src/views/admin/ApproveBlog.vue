<template>
  <div class="layout">
    <AdminNav />
    <v-main>
      <v-data-table :headers="headers" :items="blogs" sort-by="modified" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>All Pending Blogs</v-toolbar-title>
            <v-dialog v-model="approveDialog" fullscreen>
              <v-card>
                <v-col class="text-right pr-16 pt-8">
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
                  </v-btn>
                </v-col>
                <v-card-text class="ml-16">
                  <v-col>
                    <v-row> <v-card-title> 文章标题 </v-card-title></v-row
                    ><v-row>
                      {{ currentArticle.title }}
                    </v-row>
                  </v-col>
                </v-card-text>
                <v-card-text class="ml-16">
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
                  <v-spacer></v-spacer>
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
                            approveDialog = false;
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
                            approveDialog = false;
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
            <v-spacer></v-spacer>
          </v-toolbar>
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
              commentDialog = true;
              commentApproveBool = true;
            "
          >
            审核通过
          </v-btn>
          <v-btn
            text
            @click="
              commentDialog = true;
              commentApproveBool = false;
            "
          >
            审核不通过
          </v-btn>
          <v-dialog v-model="commentDialog" max-width="500px">
            <v-card>
              <v-card-title v-if="commentApproveBool === true"> 确认审核通过吗？ </v-card-title>
              <v-card-title v-else> 确认审核不通过吗？ </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="commentDialog = false"> Cancel </v-btn>
                <v-btn
                  v-if="commentApproveBool === true"
                  color="blue darken-1"
                  text
                  @click="
                    commentDialog = false;
                    approveComment(item, true);
                  "
                >
                  Confirm
                </v-btn>
                <v-btn
                  v-else
                  color="blue darken-1"
                  text
                  @click="
                    commentDialog = false;
                    approveComment(item, false);
                  "
                >
                  Confirm
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
      </v-data-table>
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
      headers: [
        { text: 'Title', value: 'title' },
        { text: 'Tags', value: 'tags' },
        { text: 'Content', value: 'content' },
        { text: 'Actions', value: 'actions', sortable: false, align: 'center' },
      ],
      cheaders: [
        { text: 'uid', value: 'uid' },
        { text: 'Content', value: 'content' },
        { text: 'Actions', value: 'actions', sortable: false, align: 'center' },
      ],
      approveDialog: false,
      confirmDialog: false,
      currentArticle: '',
      approveAction: false,
      successDialog: false,
      failureDialog: false,
      commentApproveBool: false,
      commentDialog: false,
    };
  },
  components: {
    AdminNav,
  },
  created() {
    this.getBlogList();
    this.getCommentList();
  },
  methods: {
    async getBlogList() {
      await util.post(`${util.getEnvUrl()}/admin/review/query/article/list`, {}).then((response) => {
        if (util.checkValidToken(response) === false) {
          this.$router.push('/login');
        }
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
      });
    },
    async getCommentList() {
      await util.post(`${util.getEnvUrl()}/admin/review/query/comment/list`, {}).then((response) => {
        Object.values(response.data.data.CommentMap).forEach((comment) => {
          this.comments.push({
            content: comment.Content,
            uid: comment.UID,
            cid: comment.Cid,
          });
        });
      });
    },
    getApproveArticle(item) {
      this.approveDialog = true;
      this.currentArticle = item;
    },
    async confirmAction() {
      if (this.approveAction === true) {
        await util
          .post(`${util.getEnvUrl()}/admin/review/article`, { sn: this.currentArticle.sn, state: true })
          .then((response) => {
            this.checkSuccess(response);
          });
        this.blogs = [];
        this.getBlogList();
      } else {
        await util
          .post(`${util.getEnvUrl()}/admin/review/article`, {
            sn: this.currentArticle.sn,
            state: false,
          })
          .then((response) => {
            this.checkSuccess(response);
          });
        this.blogs = [];
        this.getBlogList();
      }
    },
    async approveComment(item, bool) {
      await util
        .post(`${util.getEnvUrl()}/admin/review/comment`, { commentId: item.cid, state: bool })
        .then((response) => {
          this.checkSuccess(response);
        });
      this.comments = [];
      this.getCommentList();
    },
    close() {
      this.successDialog = false;
      this.failureDialog = false;
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

.blog-content {
  font-size: 15px;
  line-height: 28px;
  margin-bottom: 80px;
}

.article-dialog {
  margin-left: 20%;
}
</style>
