<template>
  <div class="layout">
    <AdminNav />
    <v-main>
      <v-data-table :headers="headers" :items="blogs" sort-by="modified" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>All Active Blogs</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-text-field
              v-model="searchText"
              placeholder="Search"
              append-icon="mdi-magnify"
              required
              dense
              hide-details
              outlined
              @keyup.enter="search(searchText)"
            ></v-text-field>
            <v-dialog v-model="deleteDialog" max-width="500px">
              <v-card>
                <v-card-title> Are you sure you want to delete this article? </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
                  <v-btn color="blue darken-1" text @click="deleteArticle"> Confirm </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-spacer></v-spacer>
            <router-link to="/admin/blogs/create">
              <v-btn color="primary" dark class="mb-2"> New Blog </v-btn>
            </router-link>
          </v-toolbar>
        </template>
        <template v-slot:[`item.content`]="{ item }">
          <div class="text-truncate" style="max-width: 130px">
            {{ item.content }}
          </div>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <router-link :to="{ path: '/admin/blogs/update', query: { sn: item.sn, state: item.state } }">
            <v-icon small class="ml-4"> mdi-pencil </v-icon>
          </router-link>
          <v-icon small class="ml-4" @click="editDeleteArticle(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>

      <v-data-table :headers="headers" :items="deletedBlogs" sort-by="modified" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>All Deleted Blogs</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
        <template v-slot:[`item.content`]="{ item }">
          <div class="text-truncate" style="max-width: 130px">
            {{ item.content }}
          </div>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="ml-4" @click="editDeleteArticle(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-main>
  </div>
</template>

<script>
import util from '../../util';
import AdminNav from '../../components/AdminNav.vue';

export default {
  components: {
    AdminNav,
  },
  data: () => ({
    deleteDialog: false,
    searchText: '',
    headers: [
      {
        text: '标题',
        value: 'title',
      },
      { text: '标签', value: 'tags' },
      { text: '内容', value: 'content' },
      { text: '查阅数', value: 'viewNum' },
      { text: '评论数', value: 'cmtNum' },
      { text: '点赞数', value: 'likes' },
      { text: '状态', value: 'state' },
      { text: '操作', value: 'actions', sortable: false },
    ],
    blogs: [],
    deletedBlogs: [],
  }),
  created() {
    this.getArticleList();
    this.getDeletedArticleList();
  },
  methods: {
    async search(searchText) {
      await util
        .post(`${util.getEnvUrl()}/admin/article/list`, {
          isAllMyselfArticles: false,
          article: {
            title: searchText,
            state: 1,
          },
        })
        .then((response) => {
          this.blogs = [];
          response.data.data.ArticleDetailList.forEach((blog) => {
            this.updateBlogs(this.blogs, blog);
          });
        });
    },
    close() {
      this.deleteDialog = false;
    },
    editDeleteArticle(item) {
      this.deleteDialog = true;
      this.editArticle = item;
    },
    async deleteArticle() {
      await util.post(`${util.getEnvUrl()}/admin/article/delete`, {
        sn: this.editArticle.sn,
      });

      this.deleteDialog = false;
      this.blogs = [];
      this.getArticleList();
    },
    async getArticleList() {
      await util
        .post(
          `${util.getEnvUrl()}/admin/article/list`,
          {
            article: {
              state: 1,
            },
          },
          this.$router
        )
        .then((response) => {
          if (response.data.data) {
            response.data.data.ArticleDetailList.forEach((blog) => {
              this.updateBlogs(this.blogs, blog);
            });
          }
        });
    },
    async getDeletedArticleList() {
      await util
        .post(`${util.getEnvUrl()}/admin/article/list`, {
          article: {
            state: 3,
          },
        })
        .then((response) => {
          if (response.data.data) {
            response.data.data.ArticleDetailList.forEach((blog) => {
              this.updateBlogs(this.deletedBlogs, blog);
            });
          }
        });
    },
    updateBlogs(blogs, blog) {
      blogs.push({
        title: blog.Title,
        tags: blog.Tags,
        content: util.escapeHTML(blog.Content),
        viewNum: blog.ViewNum,
        cmtNum: blog.ViewNum,
        author: blog.Author,
        sn: blog.Sn,
        uid: blog.Uid,
        state: blog.State,
        cover: blog.Cover,
        likes: blog.ZanNum,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
}
</style>
