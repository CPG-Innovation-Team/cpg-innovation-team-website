<template>
  <div class="layout">
    <AdminNav />
    <v-main style="background: whitesmoke">
      <v-card class="ma-4">
        <v-card-title> 通知 </v-card-title>
        <v-card-text
          ><v-radio-group v-model="value" row>
            <v-radio label="开启通知" value="notificationOn" @click="turn(true)"></v-radio>
            <v-radio label="关闭通知" value="notificationOff" @click="turn(false)"></v-radio>
          </v-radio-group>
          <v-text-field label="通知内容" :disabled="disabled" v-model="content"></v-text-field>
          <v-text-field label="通知跳转链接" :disabled="disabled" v-model="link"></v-text-field>
          <v-row align="center" justify="center">
            <v-col>
              <v-date-picker
                v-model="startTime"
                :min="new Date().toISOString().substr(0, 10)"
                max="2023-12-31"
                :disabled="disabled"
                class="mt-4"
              ></v-date-picker>
            </v-col>
            <v-col>
              <v-text-field label="通知开始时间" disabled v-model="startTime"></v-text-field>
            </v-col>
          </v-row>
          <v-row align="center" justify="center">
            <v-col>
              <v-col>
                <v-date-picker
                  v-model="endTime"
                  :min="startTime"
                  max="2023-12-31"
                  :disabled="disabled"
                  class="mt-4"
                ></v-date-picker>
              </v-col>
            </v-col>
            <v-col>
              <v-text-field label="通知结束时间" disabled v-model="endTime"></v-text-field>
            </v-col>
          </v-row>
          <v-btn class="mt-4" :disabled="disabled" text color="blue" @click="addNotification()">保存</v-btn>
        </v-card-text>
      </v-card>
    </v-main>
  </div>
</template>

<script>
import util from '../../util';
import AdminNav from '../../components/AdminNav.vue';

export default {
  data() {
    return {
      value: 'notificationOn',
      disabled: false,
      content: '',
      link: '',
      startTime: '',
      endTime: '',
    };
  },
  components: {
    AdminNav,
  },
  methods: {
    turn(bool) {
      if (bool === false) {
        this.disabled = true;
        this.link = '';
        this.content = '';
      } else {
        this.disabled = false;
      }
    },
    async addNotification() {
      await util
        .post('http://localhost:8080/admin/notify/add', {
          type: 4,
          content: `${this.content} @ ${this.link}!`,
          uid: [],
          state: 1,
          beginTime: (Date.parse(`${this.startTime} 00:00:00`) / 1000).toString(),
          endTime: (Date.parse(`${this.endTime} 23:59:59`) / 1000).toString(),
        })
        .then((response) => {
          if (util.checkValidToken(response) === false) {
            this.$router.push('/login');
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
</style>
