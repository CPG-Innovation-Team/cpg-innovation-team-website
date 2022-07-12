<template>
  <div class="layout">
    <AdminNav />
    <v-main>
      <v-card class="ma-4 pa-8">
        <v-col>
          <v-row>
            <v-col>
              <v-btn color="blue darken-1" text @click="$router.push('/admin/approve')">
                {{ localeMsg.backBtn }}
              </v-btn>
            </v-col>
            <v-col class="text-right">
              <v-btn
                color="blue darken-1"
                text
                @click="
                  confirmDialog = true;
                  approveBool = true;
                "
              >
                {{ localeMsg.approveBtn }}
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="
                  confirmDialog = true;
                  approveBool = false;
                "
              >
                {{ localeMsg.disapproveBtn }}
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-card-title> {{ localeMsg.cover }} </v-card-title>
        <img v-if="blog.cover !== ''" class="nav-img" :src="blog.cover" alt="header image" />
        <v-card-text v-else>{{ localeMsg.emptyCover }}</v-card-text>
        <v-row>
          <v-col>
            <v-card-title> {{ localeMsg.title }} </v-card-title>
            <v-card-text>
              {{ blog.title }}
            </v-card-text>
          </v-col>
          <v-col>
            <v-card-title> {{ localeMsg.author }} </v-card-title>
            <v-card-text>
              {{ blog.author }}
            </v-card-text>
          </v-col>
        </v-row>
        <v-card-title> {{ localeMsg.content }} </v-card-title>
        <v-card-text>
          <Editor v-model="blog.content" :prevContent="blog.content" :toolbar="false" />
        </v-card-text>
      </v-card>

      <v-dialog v-model="confirmDialog" max-width="500px">
        <v-card>
          <v-card-title> {{ localeMsg.confirmMsg }} </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="confirmDialog = false"> {{ localeMsg.cancelBtn }} </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="
                confirmDialog = false;
                confirmAction();
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
            <v-btn
              color="blue darken-1"
              text
              @click="
                successDialog = false;
                $router.push('/admin/approve');
              "
            >
              {{ localeMsg.confirmBtn }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="failureDialog" max-width="500px">
        <v-card>
          <v-card-title> {{ localeMsg.failureMsg }} </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="failureDialog = false"> {{ localeMsg.confirmBtn }} </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-main>
  </div>
</template>

<script>
import util from '../../util';
import AdminNav from '../../components/AdminNav.vue';
import Editor from '../../components/Editor.vue';

export default {
  data() {
    return {
      blog: [],
      confirmDialog: false,
      approveBool: false,
      failureDialog: false,
      successDialog: false,
    };
  },
  components: {
    AdminNav,
    Editor,
  },
  computed: {
    localeMsg() {
      return {
        backBtn: this.$t('admin.approveBlog.backBtn'),
        approveBtn: this.$t('admin.approveBlog.approveBtn'),
        disapproveBtn: this.$t('admin.approveBlog.disapproveBtn'),
        cover: this.$t('admin.approveBlog.cover'),
        emptyCover: this.$t('admin.approveBlog.emptyCover'),
        title: this.$t('admin.approveBlog.title'),
        author: this.$t('admin.approveBlog.author'),
        content: this.$t('admin.approveBlog.content'),
        confirmMsg: this.$t('admin.approveBlog.confirmMsg'),
        successMsg: this.$t('admin.approveBlog.successMsg'),
        failureMsg: this.$t('admin.approveBlog.failureMsg'),
        cancelBtn: this.$t('admin.approveBlog.cancelBtn'),
        confirmBtn: this.$t('admin.approveBlog.confirmBtn'),
      };
    },
  },
  created() {
    util.checkAccess('approval', this.$router);
    if (this.$route.query.sn) {
      this.sn = this.$route.query.sn;
      this.getArticleInfo();
    }
  },
  methods: {
    async getArticleInfo() {
      await util
        .post(`${util.getEnvUrl()}/article/info`, {
          sn: this.sn,
        })
        .then((response) => {
          this.blog = {
            title: response.data.data.Title,
            tags: response.data.data.Tags,
            content: response.data.data.Content,
            author: response.data.data.Author,
            cover: response.data.data.Cover,
          };
        });
    },
    async confirmAction() {
      if (this.approveBool === true) {
        await util
          .post(`${util.getEnvUrl()}/admin/review/article`, { sn: this.sn, state: true }, this.$router)
          .then((response) => {
            this.checkSuccess(response);
          });
      } else {
        await util
          .post(
            `${util.getEnvUrl()}/admin/review/article`,
            {
              sn: this.sn,
              state: false,
            },
            this.$router
          )
          .then((response) => {
            this.checkSuccess(response);
          });
      }
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

.nav-img {
  width: 200px;
  margin-left: 1%;
}
</style>
