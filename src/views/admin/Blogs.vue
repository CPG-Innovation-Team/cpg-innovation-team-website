<template>
  <div class="layout">
    <AdminNav />
    <v-main>
      <v-data-table :headers="headers" :items="blogs" sort-by="modified" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>{{ localeMsg.allActiveBlogs }}</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-text-field
              v-model="searchText"
              :placeholder="localeMsg.search"
              append-icon="mdi-magnify"
              required
              dense
              hide-details
              outlined
              @keyup.enter="search(searchText)"
            ></v-text-field>
            <v-spacer></v-spacer>
            <router-link to="/admin/blogs/create">
              <v-btn color="primary" depressed class="mb-2"> {{ localeMsg.newBlog }} </v-btn>
            </router-link>
          </v-toolbar>
        </template>
        <template v-slot:[`item.content`]="{ item }">
          <div class="text-truncate" style="max-width: 130px">
            {{ item.content }}
          </div>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <router-link class="icon-link" :to="{ path: '/admin/blogs/update', query: { sn: item.sn } }">
            <v-icon small class="ml-4"> mdi-pencil </v-icon>
          </router-link>
          <v-icon small class="ml-4" @click="editDeleteArticle(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>

      <v-dialog v-model="deleteDialog" max-width="500px">
        <v-card>
          <v-card-title> {{ localeMsg.confirmToDelete }} </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close()"> {{ localeMsg.cancelBtn }} </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="
                deleteDialog = false;
                deleteArticle();
              "
            >
              {{ localeMsg.confirmBtn }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="successDialog" max-width="500px">
        <v-card>
          <v-card-title> {{ localeMsg.successMsg }} </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close()"> {{ localeMsg.confirmBtn }} </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="failureDialog" max-width="500px">
        <v-card>
          <v-card-title> {{ localeMsg.failureMsg }} </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close()"> {{ localeMsg.confirmBtn }} </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-data-table :headers="headers" :items="deletedBlogs" sort-by="modified" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>{{ localeMsg.allDeletedBlogs }}</v-toolbar-title>
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
          <router-link class="icon-link" :to="{ path: '/admin/blogs/update', query: { sn: item.sn } }">
            <v-icon small class="ml-4"> mdi-pencil </v-icon>
          </router-link>
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
  data() {
    return {
      deleteDialog: false,
      successDialog: false,
      failureDialog: false,
      searchText: '',
      headers: [
        {
          text: this.$t('admin.blogs.title'),
          value: 'title',
        },
        { text: this.$t('admin.blogs.tags'), value: 'tags' },
        { text: this.$t('admin.blogs.content'), value: 'content' },
        { text: this.$t('admin.blogs.viewNum'), value: 'viewNum' },
        { text: this.$t('admin.blogs.commentNum'), value: 'cmtNum' },
        { text: this.$t('admin.blogs.likeNum'), value: 'likes' },
        { text: this.$t('admin.blogs.action'), value: 'actions', sortable: false, align: 'center' },
      ],
      blogs: [],
      deletedBlogs: [],
    };
  },
  computed: {
    localeMsg() {
      return {
        allActiveBlogs: this.$t('admin.blogs.allActiveBlogs'),
        search: this.$t('admin.blogs.search'),
        newBlog: this.$t('admin.blogs.newBlog'),
        allDeletedBlogs: this.$t('admin.blogs.allDeletedBlogs'),
        confirmToDelete: this.$t('admin.blogs.dialog.confirmToDelete'),
        confirmBtn: this.$t('admin.blogs.dialog.confirmBtn'),
        cancelBtn: this.$t('admin.blogs.dialog.cancelBtn'),
        successMsg: this.$t('admin.blogs.dialog.successMsg'),
        failureMsg: this.$t('admin.blogs.dialog.failureMsg'),
      };
    },
  },
  created() {
    util.checkAccess('blogs', this.$router);
    this.getArticleList();
    this.getDeletedArticleList();
  },
  methods: {
    async search(searchText) {
      await util
        .post(
          `${util.getEnvUrl()}/admin/article/list`,
          {
            isAllMyselfArticles: false,
            article: {
              title: searchText,
              state: 1,
            },
          },
          this.$router
        )
        .then((response) => {
          if (response.data.code === 10000) {
            this.blogs = [];
            if (response.data.data.ArticleDetailList !== null) {
              response.data.data.ArticleDetailList.forEach((blog) => {
                this.updateBlogs(this.blogs, blog);
              });
            }
          }
        });
    },
    close() {
      this.deleteDialog = false;
      this.successDialog = false;
      this.failureDialog = false;
    },
    editDeleteArticle(item) {
      this.deleteDialog = true;
      this.editArticle = item;
    },
    async deleteArticle() {
      await util
        .post(
          `${util.getEnvUrl()}/admin/article/delete`,
          {
            sn: this.editArticle.sn,
          },
          this.$router
        )
        .then((response) => {
          if (response.data.code === 10000) {
            this.successDialog = true;
            this.blogs = [];
            this.getArticleList();
          } else {
            this.failureDialog = true;
          }
        });
    },
    async getArticleList() {
      await util
        .post(
          `${util.getEnvUrl()}/admin/article/list`,
          {
            isAllMyselfArticles: localStorage.isRoot === undefined,
            article: {
              state: 1,
            },
          },
          this.$router
        )
        .then((response) => {
          if (response.data.code === 10000) {
            if (response.data.data.ArticleDetailList !== null) {
              response.data.data.ArticleDetailList.forEach((blog) => {
                this.updateBlogs(this.blogs, blog);
              });
            }
          }
        });
    },
    async getDeletedArticleList() {
      await util
        .post(
          `${util.getEnvUrl()}/admin/article/list`,
          {
            isAllMyselfArticles: localStorage.isRoot === undefined,
            article: {
              state: 3,
            },
          },
          this.$router
        )
        .then((response) => {
          if (response.data.code === 10000) {
            if (response.data.data.ArticleDetailList !== null) {
              response.data.data.ArticleDetailList.forEach((blog) => {
                this.updateBlogs(this.deletedBlogs, blog);
              });
            }
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

.icon-link {
  text-decoration: none;
}
</style>
