<template>
  <div class="layout">
    <AdminNav />
    <v-main>
      <v-data-table :headers="headers" :items="blogs" sort-by="modified" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>All Pending Blogs</v-toolbar-title>
          </v-toolbar>
        </template>
        <template v-slot:[`item.content`]="{ item }">
          <div class="text-truncate" style="max-width: 130px">
            <div v-dompurify-html="item.content"></div>
          </div>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <router-link class="approve-btn" :to="{ name: 'ApproveBlog', query: { sn: item.sn } }">
            <v-btn text> 详情 </v-btn>
          </router-link>
        </template>
      </v-data-table>

      <v-data-table
        v-model="selectedComments"
        :headers="cheaders"
        :items="comments"
        item-key="cid"
        sort-by="modified"
        class="elevation-1"
        show-select
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>All Pending Comments</v-toolbar-title>
          </v-toolbar>
        </template>
        <template v-slot:[`item.data-table-select`]="{ isSelected, select }">
          <v-simple-checkbox :value="isSelected" @input="select($event)" :ripple="false"></v-simple-checkbox>
        </template>
        <template v-slot:[`item.content`]="{ item }">
          <div class="text-truncate" style="max-width: 130px">
            {{ item.content }}
          </div>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn text @click="setCommentItem(true, true, item)"> 通过 </v-btn>
          <v-btn text @click="setCommentItem(true, false, item)"> 不通过 </v-btn>
        </template>
        <template v-slot:[`body.append`]>
          <td></td>
          <td></td>
          <td></td>
          <div class="d-flex justify-center">
            <td>
              <v-btn
                class="ma-2"
                color="primary"
                depressed
                small
                :disabled="checkCommentBtnDisabled()"
                @click="setCommentItem(true, true, selectedComments)"
              >
                批量通过
              </v-btn>
              <v-btn
                class="ma-2"
                color="primary"
                depressed
                small
                :disabled="checkCommentBtnDisabled()"
                @click="setCommentItem(true, false, selectedComments)"
              >
                批量不通过
              </v-btn>
            </td>
          </div>
        </template>
      </v-data-table>

      <v-data-table
        v-model="selectedReplies"
        :headers="rheaders"
        :items="replies"
        item-key="rid"
        sort-by="modified"
        class="elevation-1"
        show-select
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>All Pending Replies</v-toolbar-title>
          </v-toolbar>
        </template>
        <template v-slot:[`item.data-table-select`]="{ isSelected, select }">
          <v-simple-checkbox :value="isSelected" @input="select($event)" :ripple="false"></v-simple-checkbox>
        </template>
        <template v-slot:[`item.content`]="{ item }">
          <div class="text-truncate" style="max-width: 130px">
            {{ item.content }}
          </div>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn text @click="setReplyItem(true, true, item)"> 通过 </v-btn>
          <v-btn text @click="setReplyItem(true, false, item)"> 不通过 </v-btn>
        </template>
        <template v-slot:[`body.append`]>
          <td></td>
          <td></td>
          <td></td>
          <div class="d-flex justify-center">
            <td>
              <v-btn
                class="ma-2"
                color="primary"
                depressed
                small
                :disabled="checkReplyBtnDisabled()"
                @click="setReplyItem(true, true, selectedReplies)"
              >
                批量通过
              </v-btn>
              <v-btn
                class="ma-2"
                color="primary"
                depressed
                small
                :disabled="checkReplyBtnDisabled()"
                @click="setReplyItem(true, false, selectedReplies)"
              >
                批量不通过
              </v-btn>
            </td>
          </div>
        </template>
      </v-data-table>

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
              @click="approveComment(currentComment, true)"
            >
              Confirm
            </v-btn>
            <v-btn v-else color="blue darken-1" text @click="approveComment(currentComment, false)"> Confirm </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="replyDialog" max-width="500px">
        <v-card>
          <v-card-title v-if="replyApproveBool === true"> 确认审核通过吗？ </v-card-title>
          <v-card-title v-else> 确认审核不通过吗？ </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="replyDialog = false"> Cancel </v-btn>
            <v-btn
              v-if="replyApproveBool === true"
              color="blue darken-1"
              text
              @click="approveReply(currentReply, true)"
            >
              Confirm
            </v-btn>
            <v-btn v-else color="blue darken-1" text @click="approveReply(currentReply, false)"> Confirm </v-btn>
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
      // for general purpose dialog
      successDialog: false,
      failureDialog: false,
      // for comment and reply approval
      commentApproveBool: false,
      replyApproveBool: false,
      commentDialog: false,
      replyDialog: false,
      currentComment: null,
      currentReply: null,
      selectedComments: [],
      selectedReplies: [],
    };
  },
  components: {
    AdminNav,
  },
  created() {
    util.checkAccess('approval', this.$router);
    this.getBlogList();
    this.getCommentList();
    this.getReplyList();
  },
  methods: {
    async getBlogList() {
      await util.post(`${util.getEnvUrl()}/admin/review/query/article/list`, {}, this.$router).then((response) => {
        if (response.data.code === 10000) {
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
        if (response.data.code === 10000) {
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
        if (response.data.code === 10000) {
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
    checkCommentBtnDisabled() {
      // disable the button if no comment is selected
      return this.selectedComments.length === 0;
    },
    checkReplyBtnDisabled() {
      // disable the button if no reply is selected
      return this.selectedReplies.length === 0;
    },
    setCommentItem(dialogBool, approveBool, item) {
      this.commentDialog = dialogBool;
      this.commentApproveBool = approveBool;
      this.currentComment = item;
    },
    setReplyItem(dialogBool, approveBool, item) {
      this.replyDialog = dialogBool;
      this.replyApproveBool = approveBool;
      this.currentReply = item;
    },
    async approveComment(item, bool) {
      this.commentDialog = false;
      // check if item is a single object or an array of objects
      const ids = item.length === undefined ? [item.cid] : item.map((comment) => comment.cid);
      await util
        .post(`${util.getEnvUrl()}/admin/review/comment`, { commentId: ids, state: bool }, this.$router)
        .then((response) => {
          this.checkSuccess(response);
          this.commentApproveBool = false;
          this.comments = [];
          this.getCommentList();
        });
    },
    async approveReply(item, bool) {
      this.replyDialog = false;
      const ids = item.length === undefined ? [item.rid] : item.map((comment) => comment.rid);
      await util
        .post(`${util.getEnvUrl()}/admin/review/reply`, { replyId: ids, state: bool }, this.$router)
        .then((response) => {
          this.checkSuccess(response);
          this.replyApproveBool = false;
          this.replies = [];
          this.getReplyList();
        });
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

.approve-btn {
  text-decoration: none;
}
</style>
