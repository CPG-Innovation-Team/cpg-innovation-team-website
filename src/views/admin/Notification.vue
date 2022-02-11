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
          <v-row>
            <v-col>
              <v-menu
                v-model="fromDateMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field label="开始日期" readonly :value="startDate" v-on="on"></v-text-field>
                </template>
                <v-date-picker
                  v-model="startDate"
                  no-title
                  @input="fromDateMenu = false"
                  :min="new Date().toISOString().substr(0, 10)"
                  max="2023-12-31"
                ></v-date-picker>
              </v-menu> </v-col
            ><v-col>
              <v-menu
                v-model="fromTimeMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field label="开始时间" readonly :value="startTime" v-on="on"></v-text-field>
                </template>
                <v-time-picker v-model="startTime" format="24hr" @input="fromTimeMenu = false"></v-time-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-menu
                v-model="toDateMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field label="结束日期" readonly :value="endDate" v-on="on"></v-text-field>
                </template>
                <v-date-picker
                  v-model="endDate"
                  no-title
                  @input="toDateMenu = false"
                  :min="startDate"
                  max="2023-12-31"
                ></v-date-picker>
              </v-menu> </v-col
            ><v-col>
              <v-menu
                v-model="toTimeMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field label="结束时间" readonly :value="endTime" v-on="on"></v-text-field>
                </template>
                <v-time-picker
                  v-model="endTime"
                  format="24hr"
                  @input="toTimeMenu = false"
                  :min="minTime()"
                ></v-time-picker>
              </v-menu>
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
      startTime: null,
      endTime: null,
      startDate: null,
      endDate: null,
      fromDateMenu: false,
      fromTimeMenu: false,
      toDateMenu: false,
      toTimeMenu: false,
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
      if (this.content.trim() !== '') {
        await util
          .post('http://localhost:8080/admin/notify/add', {
            type: 4,
            content: `${this.content} @ ${this.link}!`,
            uid: [],
            state: 1,
            beginTime: (Date.parse(`${this.startDate} ${this.startTime}:00`) / 1000).toString(),
            endTime: (Date.parse(`${this.endDate} ${this.endTime}:00`) / 1000).toString(),
          })
          .then((response) => {
            if (util.checkValidToken(response) === false) {
              this.$router.push('/login');
            }
          });
      }
    },
    minTime() {
      if (this.startDate === this.endDate) {
        return this.startTime;
      }
      return null;
    },
  },
};
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
}
</style>
