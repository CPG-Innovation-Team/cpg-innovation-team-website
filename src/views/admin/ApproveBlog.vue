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
            {{ item.content }}
          </div>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn @click="getApproveArticle(item)"> 详情 </v-btn>
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
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      approveDialog: false,
      confirmDialog: false,
      currentArticle: '',
      approveAction: false,
    };
  },
  components: {
    AdminNav,
  },
  created() {
    if (localStorage.token) {
      this.token = localStorage.token;
    }
    this.getBlogList();
  },
  methods: {
    async getBlogList() {
      await axios
        .post(
          'http://localhost:8080/admin/review/query/article/list',
          {},
          {
            headers: {
              token: this.token,
            },
          }
        )
        .then((response) => {
          const sn = Object.keys(response.data.data.ArticleMap);
          let index = 0;
          Object.values(response.data.data.ArticleMap).forEach((blog) => {
            this.blogs.push({
              sn: sn[index],
              title: blog.Title,
              tags: blog.Tags,
              content: blog.Content,
              author: blog.Author,
              uid: blog.Uid,
              cover: blog.Cover,
            });
            index += 1;
          });
        });
    },
    getApproveArticle(item) {
      this.approveDialog = true;
      this.currentArticle = item;
    },
    async confirmAction() {
      if (this.approveAction === true) {
        await axios
          .post(
            'http://localhost:8080/admin/review/article',
            { sn: this.currentArticle.sn, state: true },
            {
              headers: {
                token: this.token,
              },
            }
          )
          .then(() => {});
        this.blogs = [];
        this.getBlogList();
      } else {
        await axios
          .post(
            'http://localhost:8080/admin/review/article',
            { sn: parseInt(this.currentArticle.sn, 10), state: false },
            {
              headers: {
                token: this.token,
              },
            }
          )
          .then(() => {});
        this.blogs = [];
        this.getBlogList();
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
  white-space: pre-line;
  line-height: 28px;
  margin-bottom: 80px;
}

.article-dialog {
  margin-left: 20%;
}
</style>
