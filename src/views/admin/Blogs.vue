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
            <v-dialog v-model="updateDialog" max-width="500px" fullscreen>
              <v-card>
                <v-card-title> Update Article </v-card-title>
                <v-card-text>
                  <v-row class="ma-8">
                    <v-text-field v-model="title" required hide-details dense outlined label="title"></v-text-field>
                  </v-row>
                  <v-row class="ma-8">
                    <v-text-field v-model="cover" required hide-details dense outlined label="cover"></v-text-field>
                  </v-row>
                  <v-row class="ma-8">
                    <v-select :items="tagList" v-model="tags" clearable outlined label="tags"></v-select>
                  </v-row>
                  <v-row class="ma-8">
                    <v-textarea
                      v-model="content"
                      required
                      hide-details
                      dense
                      outlined
                      auto-grow
                      label="content"
                    ></v-textarea>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
                  <v-btn color="blue darken-1" text @click="updateArticle"> Save </v-btn>
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
          <v-icon small class="ml-4" @click="editUpdateArticle(item)"> mdi-pencil </v-icon>
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
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="ml-4" @click="editDeleteArticle(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-main>
  </div>
</template>

<script>
import axios from 'axios';
import AdminNav from '../../components/AdminNav.vue';

export default {
  components: {
    AdminNav,
  },
  data: () => ({
    deleteDialog: false,
    updateDialog: false,
    editArticle: '',
    searchText: '',
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
    blogs: [],
    deletedBlogs: [],
    token: '',
    title: '',
    content: '',
    cover: '',
    tags: '',
    tagList: ['All', 'Technology', 'Agriculture'],
  }),
  async created() {
    if (localStorage.token) {
      this.token = localStorage.token;
    }
    this.getArticleList();
    this.getDeletedArticleList();
  },
  methods: {
    search(searchText) {
      if (searchText === '') {
        this.getArticleList();
        this.getDeletedArticleList();
      }
      this.blogs = this.blogs.filter((blog) => {
        return blog.title.includes(searchText);
      });
      this.deletedBlogs = this.deletedBlogs.filter((blog) => {
        return blog.title.includes(searchText);
      });
    },
    close() {
      this.deleteDialog = false;
      this.updateDialog = false;
    },
    editDeleteArticle(item) {
      this.deleteDialog = true;
      this.editArticle = item;
    },
    editUpdateArticle(item) {
      this.updateDialog = true;
      this.editArticle = item;
      this.title = this.editArticle.title;
      this.cover = this.editArticle.cover;
      this.tags = this.editArticle.tags;
      this.content = this.editArticle.content;
    },
    async updateArticle() {
      await axios
        .post(
          'http://localhost:8080/admin/article/update',
          {
            sn: this.editArticle.sn,
            title: this.title,
            cover: this.cover,
            content: this.content,
            tags: this.tags,
            state: this.editArticle.state.toString(),
          },
          {
            headers: {
              token: this.token,
            },
          }
        )
        .then((response) => {
          console.log(response);
        });
      this.updateDialog = false;
      this.blogs = [];
      this.getArticleList();
    },
    async deleteArticle() {
      await axios
        .post(
          'http://localhost:8080/admin/article/delete',
          {
            sn: this.editArticle.sn,
          },
          {
            headers: {
              token: this.token,
            },
          }
        )
        .then((response) => {
          console.log(response);
        });
      this.deleteDialog = false;
      this.blogs = [];
      this.getArticleList();
    },
    async getArticleList() {
      await axios
        .post(
          'http://localhost:8080/admin/article/list',
          {
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
    async getDeletedArticleList() {
      await axios
        .post(
          'http://localhost:8080/admin/article/list',
          {
            article: {
              state: 3,
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
            this.deletedBlogs.push({
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
  },
};
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
}
</style>
