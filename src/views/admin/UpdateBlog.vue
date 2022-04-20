<template>
  <div class="layout">
    <AdminNav />
    <v-main>
      <v-container fluid>
        <v-card>
          <v-card-title> {{ localeMsg.pageTitle }} </v-card-title>
          <v-card-text>
            <v-row class="ma-8">
              <v-text-field
                v-model="blog.title"
                required
                hide-details
                dense
                outlined
                :label="localeMsg.title"
              ></v-text-field>
            </v-row>
            <v-row class="ma-8">
              <v-text-field
                v-model="blog.cover"
                required
                hide-details
                dense
                outlined
                :label="localeMsg.cover"
              ></v-text-field>
            </v-row>
            <v-row class="ma-8">
              <v-select :items="tagList" v-model="blog.tags" clearable outlined :label="localeMsg.tags"></v-select>
            </v-row>
            <v-row class="ma-8">
              <Editor :content="blog.content" v-model="content" :editorBool="true" :inCreate="false" />
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close"> {{ localeMsg.cancelBtn }} </v-btn>
            <v-btn color="blue darken-1" text @click="updateArticle"> {{ localeMsg.confirmBtn }} </v-btn>
          </v-card-actions>
        </v-card>
        <v-dialog max-width="600" v-model="successDialog">
          <template>
            <v-card>
              <v-card-text>
                <div class="text-h6 pa-6">{{ localeMsg.successMsg }}</div>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn
                  text
                  @click="
                    successDialog = false;
                    close();
                  "
                >
                  {{ localeMsg.confirmBtn }}</v-btn
                >
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
        <v-dialog max-width="600" v-model="failureDialog">
          <template>
            <v-card>
              <v-card-text>
                <div class="text-h6 pa-6">{{ localeMsg.failureMsg }}</div>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn text @click="failureDialog = false"> {{ localeMsg.confirmBtn }}</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import Editor from '../../components/Editor.vue';
import util from '../../util';
import AdminNav from '../../components/AdminNav.vue';

export default {
  data() {
    return {
      blog: '',
      tagList: ['All', 'Technology', 'Agriculture'],
      successDialog: false,
      failureDialog: false,
      content: '',
      message: '',
    };
  },
  components: {
    AdminNav,
    Editor,
  },
  computed: {
    localeMsg() {
      return {
        pageTitle: this.$t('admin.updateBlog.pageTitle'),
        title: this.$t('admin.updateBlog.title'),
        cover: this.$t('admin.updateBlog.cover'),
        tags: this.$t('admin.updateBlog.tags'),
        confirmBtn: this.$t('admin.updateBlog.confirmBtn'),
        cancelBtn: this.$t('admin.updateBlog.cancelBtn'),
        successMsg: this.$t('admin.updateBlog.successMsg'),
        failureMsg: this.$t('admin.updateBlog.failureMsg'),
      };
    },
  },
  async created() {
    util.checkAccess('blogs', this.$router);
    if (this.$route.query) {
      this.sn = this.$route.query.sn;
      await util
        .post(
          `${util.getEnvUrl()}/admin/article/info`,
          {
            sn: this.sn,
          },
          this.$router
        )
        .then((response) => {
          if (response.data.code === 10000) {
            this.blog = {
              title: response.data.data.Title,
              tags: response.data.data.Tags,
              content: response.data.data.Content,
              author: response.data.data.Author,
              cover: response.data.data.Cover,
            };
          }
        });
    }
  },
  methods: {
    close() {
      this.$router.push({
        path: '/admin/blogs',
      });
    },
    async updateArticle() {
      /**
       * state for article:
       * 0-未审核; 1-已上线; 2-下线; 3-用户删除
       */
      await util
        .post(
          `${util.getEnvUrl()}/admin/article/update`,
          {
            sn: this.sn,
            title: this.blog.title,
            cover: this.blog.cover,
            content: this.content,
            tags: this.blog.tags,
            state: '0',
          },
          this.$router
        )
        .then((response) => {
          if (response.data.code === 10000) {
            this.successDialog = true;
          } else {
            this.failureDialog = true;
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
}

.label {
  min-width: 75px;
  max-width: 75px;
  line-height: 40px;
}
</style>
