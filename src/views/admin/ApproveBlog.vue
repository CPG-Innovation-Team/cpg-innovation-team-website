<template>
  <div class="layout">
    <AdminNav />
    <v-main>
      <v-card class="ma-4 pa-8">
        <v-col>
          <v-row>
            <v-col>
              <v-btn color="blue darken-1" text @click="$router.push('/admin/approve')"> 返回 </v-btn>
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
                审核通过
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="
                  confirmDialog = true;
                  approveBool = false;
                "
              >
                审核不通过
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-card-title> 文章封面 </v-card-title>
        <img v-if="blog.cover !== ''" class="nav-img" :src="blog.cover" alt="header image" />
        <v-card-text v-else>暂无封面</v-card-text>
        <v-row>
          <v-col>
            <v-card-title> 文章标题 </v-card-title>
            <v-card-text>
              {{ blog.title }}
            </v-card-text>
          </v-col>
          <v-col>
            <v-card-title> 作者 </v-card-title>
            <v-card-text>
              {{ blog.author }}
            </v-card-text>
          </v-col>
        </v-row>
        <v-card-title> 文章内容 </v-card-title>
        <v-card-text>
          <Editor v-model="blog.content" :content="blog.content" :editorBool="false" />
        </v-card-text>
      </v-card>

      <v-dialog v-model="confirmDialog" max-width="500px">
        <v-card>
          <v-card-title> 确认以下操作吗？ </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="confirmDialog = false"> Cancel </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="
                confirmDialog = false;
                confirmAction();
              "
            >
              Confirm
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="successDialog" max-width="500px">
        <v-card>
          <v-card-title> Success! </v-card-title>
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
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="failureDialog" max-width="500px">
        <v-card>
          <v-card-title> Something went wrong... </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="failureDialog = false"> Close </v-btn>
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
  created() {
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
            console.log(response);
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
</style>
