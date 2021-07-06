<template>
  <div>
    <v-row no-gutters>
      <v-col cols="2" class="text-right">
        <v-btn class="back-button" color="normal" @click="$router.go(-1)">返回</v-btn>
      </v-col>
      <v-col cols="7">
        <div class="career-detail-title">{{ jobs[index].title }}</div>
        <div class="career-detail-tag">
          {{ jobs[index].department }} | {{ jobs[index].position }} | {{ jobs[index].city }} |
          {{ jobs[index].time }}
        </div>
        <v-divider></v-divider>
        <div class="career-sub-title">工作职责</div>
        <div class="career-detail-content">
          {{ jobs[index].responsibility }}
        </div>
        <div class="career-sub-title">工作要求</div>
        <div class="career-detail-content">
          {{ jobs[index].requirements }}
        </div>
      </v-col>
      <v-col cols="2">
        <v-dialog transition="dialog-top-transition" max-width="600">
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="more-button" color="primary" v-bind="attrs" v-on="on">申请岗位</v-btn>
          </template>
          <template v-slot:default="dialog">
            <v-card>
              <v-card-text class="text-h5 pa-12"> 请发送简历至contact@example.com </v-card-text>
              <v-card-actions class="justify-end">
                <a href="mailto:contact@example.com"
                  ><v-btn class="send-button" depressed color="primary"> 发送简历 </v-btn></a
                >
                <v-btn class="close-button" text @click="dialog.value = false">关闭</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
    </v-row>
  </div>
</template>

<script>
const jobs = require('../data/career');

export default {
  data() {
    return {
      jobs,
      index: 0,
    };
  },
  created() {
    if (this.$route.query.id - 1 >= 0 && this.$route.query.id - 1 < jobs.length) {
      this.index = this.$route.query.id - 1;
    }
  },
};
</script>

<style lang="scss" scoped>
.back-link {
  text-decoration: none;
}

.back-button {
  margin-right: 40px;
  margin-left: 10px;
}

.career-header {
  margin-top: 80px;

  .career-detail-title {
    margin-left: auto;
    font-size: 32px;
    font-weight: bold;
    color: black;
  }
}

.more-button {
  margin-left: 10px;
}

.send-button {
  margin-right: 10px;
  margin-bottom: 20px;
}

.close-button {
  margin-bottom: 20px;
}

.career-detail-tag {
  margin-top: 50px;
  font-size: 15px;
}

.career-sub-title {
  font-size: 23px;
  font-weight: bold;
  color: black;
  margin-left: auto;
  margin-top: 50px;
  margin-bottom: 30px;
}

.career-detail-content {
  font-size: 15px;
  white-space: pre-line;
  line-height: 28px;
  margin-bottom: 80px;
}
</style>
