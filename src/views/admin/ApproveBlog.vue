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
                  <v-btn color="blue darken-1" text @click="confirmDialog = true"> 审核通过 </v-btn>
                  <v-btn color="blue darken-1" text @click="confirmDialog = true"> 审核不通过 </v-btn>
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
                        {{ currentArticle.content }}
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
            {{ item.content }}
          </div>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn @click="approveArticle(item)"> 详情 </v-btn>
        </template>
      </v-data-table>
    </v-main>
  </div>
</template>

<script>
import axios from 'axios';
import AdminNav from '../../components/AdminNav.vue';

export default {
  data() {
    return {
      token: '',
      blogs: [],
      headers: [
        {
          text: 'Title',
          value: 'title',
        },
        { text: 'Tags', value: 'tags' },
        { text: 'Content', value: 'content' },
        { text: 'View num', value: 'viewNum' },
        { text: 'Comment num', value: 'cmtNum' },
        { text: 'Likes num', value: 'likes' },
        { text: 'State', value: 'state' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      approveDialog: false,
      confirmDialog: false,
      currentArticle: '',
    };
  },
  components: {
    AdminNav,
  },
  created() {
    if (localStorage.token) {
      this.token = localStorage.token;
    }
    this.getArticleList();
  },
  methods: {
    async getArticleList() {
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
        });
    },
    approveArticle(item) {
      this.approveDialog = true;
      this.currentArticle = item;
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
  white-space: pre-line;
  line-height: 28px;
  margin-bottom: 80px;
}

.article-dialog {
  margin-left: 20%;
}
</style>
