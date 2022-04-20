<template>
  <div class="layout">
    <AdminNav />
    <v-main data-test-id="create-blog-page">
      <v-container fluid>
        <v-row class="mt-12">
          <v-col cols="12" sm="2"> </v-col>
          <v-col cols="12" sm="8">
            <v-form ref="form" v-model="valid">
              <v-row>
                <v-col class="label" cols="1">
                  <label>{{ localeMsg.title }}</label>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="title"
                    required
                    hide-details
                    dense
                    outlined
                    data-test-id="blog-title-input"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="1" class="label">
                  <span>{{ localeMsg.cover }}</span>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="cover"
                    required
                    hide-details
                    dense
                    outlined
                    data-test-id="blog-cover-input"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col class="label" cols="1">
                  <label>{{ localeMsg.tags }}</label>
                </v-col>
                <v-col>
                  <v-select :items="tags" v-model="tag" clearable outlined data-test-id="blog-tag-input"></v-select>
                </v-col>
              </v-row>

              <v-row>
                <v-col class="label" cols="1">
                  <label>{{ localeMsg.content }}</label>
                </v-col>
                <v-col>
                  <Editor :content="editingContent" v-model="content" :editorBool="true" :inCreate="true" />
                </v-col>
              </v-row>

              <v-row>
                <v-col class="text-right">
                  <v-btn color="normal" depressed class="mr-4" @click="$router.go(-1)">{{ localeMsg.cancelBtn }}</v-btn>
                  <v-btn color="primary" depressed @click="submit" data-test-id="create-blog-submit">{{
                    localeMsg.submitBtn
                  }}</v-btn>
                </v-col>
              </v-row>
            </v-form>
            <v-row justify="space-around">
              <v-col cols="auto">
                <v-dialog transition="dialog-bottom-transition" max-width="600" v-model="successDialog">
                  <template>
                    <v-card>
                      <v-card-text>
                        <div class="text-h6 pa-6">{{ localeMsg.successMsg }}</div>
                      </v-card-text>
                      <v-card-actions class="justify-end">
                        <v-btn text @click="closeSuccessDialog()" data-test-id="confirm-button">{{
                          localeMsg.confirmBtn
                        }}</v-btn>
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
                <v-dialog transition="dialog-bottom-transition" max-width="600" v-model="failureDialog">
                  <template>
                    <v-card>
                      <v-card-text>
                        <div class="text-h6 pa-6">{{ localeMsg.failureMsg }}</div>
                      </v-card-text>
                      <v-card-actions class="justify-end">
                        <v-btn text @click="closeFailureDialog()" data-test-id="confirm-button">{{
                          localeMsg.confirmBtn
                        }}</v-btn>
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
                <v-dialog transition="dialog-bottom-transition" max-width="600" v-model="warningDialog">
                  <template>
                    <v-card>
                      <v-card-text>
                        <div class="text-h6 pa-6">{{ localeMsg.warningMsg }}</div>
                      </v-card-text>
                      <v-card-actions class="justify-end">
                        <v-btn text @click="closeFailureDialog()" data-test-id="confirm-button">{{
                          localeMsg.confirmBtn
                        }}</v-btn>
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" sm="2"> </v-col>
        </v-row>
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
      valid: '',
      title: '',
      cover: '',
      content: '',
      tag: `${this.$t('categories.all')}`,
      tags: [
        `${this.$t('categories.all')}`,
        `${this.$t('categories.technology')}`,
        `${this.$t('categories.agriculture')}`,
      ],
      successDialog: false,
      failureDialog: false,
      warningDialog: false,
      editingContent: '',
      timer: null,
    };
  },
  components: {
    AdminNav,
    Editor,
  },
  computed: {
    localeMsg() {
      return {
        title: this.$t('admin.newBlog.title'),
        cover: this.$t('admin.newBlog.cover'),
        tags: this.$t('admin.newBlog.tags'),
        content: this.$t('admin.newBlog.content'),
        confirmBtn: this.$t('admin.newBlog.confirmBtn'),
        cancelBtn: this.$t('admin.newBlog.cancelBtn'),
        submitBtn: this.$t('admin.newBlog.submitBtn'),
        successMsg: this.$t('admin.newBlog.successMsg'),
        failureMsg: this.$t('admin.newBlog.failureMsg'),
        warningMsg: this.$t('admin.newBlog.warningMsg'),
      };
    },
  },
  created() {
    util.checkAccess('blogs', this.$router);
    if (localStorage.content) {
      this.editingContent = localStorage.content;
    }
    if (localStorage.title) {
      this.title = localStorage.title;
    }
    if (localStorage.cover) {
      this.cover = localStorage.cover;
    }
    if (localStorage.tag) {
      this.tag = localStorage.tag;
    }
  },
  methods: {
    submit() {
      if (this.title.trim() === '' || this.content.trim() === '') {
        this.warningDialog = true;
      } else {
        util
          .post(
            `${util.getEnvUrl()}/admin/article/add`,
            {
              title: this.title,
              cover: this.cover,
              content: this.content,
              tags: this.tag,
            },
            this.$router
          )
          .then((response) => {
            if (response.data.code === 10000) {
              this.successDialog = true;
              localStorage.removeItem('title');
              localStorage.removeItem('content');
              localStorage.removeItem('tag');
              localStorage.removeItem('cover');
            } else {
              this.failureDialog = true;
            }
          });
      }
    },
    closeSuccessDialog() {
      this.successDialog = false;
      this.$router.push({
        path: '/admin/blogs',
      });
    },
    closeFailureDialog() {
      this.failureDialog = false;
      this.warningDialog = false;
    },
    saveArticleTitleToLocal() {
      localStorage.title = this.title;
    },
    saveArticleCoverToLocal() {
      localStorage.cover = this.cover;
    },
    saveArticleTagToLocal() {
      localStorage.tag = this.tag;
    },
  },
  watch: {
    title() {
      clearTimeout(this.timer);
      this.timer = setTimeout(this.saveArticleTitleToLocal, 2000);
    },
    cover() {
      clearTimeout(this.timer);
      this.timer = setTimeout(this.saveArticleCoverToLocal, 2000);
    },
    tag() {
      clearTimeout(this.timer);
      this.timer = setTimeout(this.saveArticleTagToLocal, 2000);
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
