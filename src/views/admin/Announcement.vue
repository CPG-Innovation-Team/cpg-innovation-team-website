<template>
  <div class="layout">
    <AdminNav />
    <v-main style="background: whitesmoke">
      <v-card class="ma-4">
        <v-card-title> 公告 </v-card-title>
        <v-card-text
          ><v-radio-group v-model="value" row>
            <v-radio label="开启公告" value="announcementOn" @click="turn(true)"></v-radio>
            <v-radio label="关闭公告" value="announcementOff" @click="turn(false)"></v-radio>
          </v-radio-group>
          <v-text-field label="中文公告内容" :disabled="disabled" v-model="cnContent"></v-text-field>
          <v-text-field label="英文公告内容" :disabled="disabled" v-model="enContent"></v-text-field>
          <v-text-field label="公告跳转链接" :disabled="disabled" v-model="link"></v-text-field>

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
                  <v-text-field
                    label="开始日期"
                    readonly
                    :value="startDate"
                    v-on="on"
                    :disabled="disabled"
                  ></v-text-field>
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
                  <v-text-field
                    label="开始时间"
                    readonly
                    :value="startTime"
                    v-on="on"
                    :disabled="disabled"
                  ></v-text-field>
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
                  <v-text-field
                    label="结束日期"
                    readonly
                    :value="endDate"
                    v-on="on"
                    :disabled="disabled"
                  ></v-text-field>
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
                  <v-text-field
                    label="结束时间"
                    readonly
                    :value="endTime"
                    v-on="on"
                    :disabled="disabled"
                  ></v-text-field>
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
          <v-btn class="mt-4" text color="blue" @click="addAnnouncement()">保存</v-btn>
        </v-card-text>
      </v-card>

      <v-dialog v-model="successDialog" max-width="500px">
        <v-card>
          <v-card-title> The announcement is succesfully added! </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close"> Confirm </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="failureDialog" max-width="500px">
        <v-card>
          <v-card-title> Something went wrong... </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close"> Confirm </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="emptyDialog" max-width="500px">
        <v-card>
          <v-card-title> 公告内容不可为空 </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close"> Confirm </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-main>
  </div>
</template>

<script>
import moment from 'moment';
import util from '../../util';
import AdminNav from '../../components/AdminNav.vue';

export default {
  data() {
    return {
      value: 'announcementOn',
      disabled: false,
      cnContent: '',
      enContent: '',
      link: '',
      startTime: null,
      endTime: null,
      startDate: null,
      endDate: null,
      fromDateMenu: false,
      fromTimeMenu: false,
      toDateMenu: false,
      toTimeMenu: false,
      successDialog: false,
      failureDialog: false,
      emptyDialog: false,
    };
  },
  components: {
    AdminNav,
  },
  created() {
    this.getCurrentDate();
  },
  methods: {
    getCurrentDate() {
      const date = new Date().toISOString().split('T')[0];
      this.startDate = date;
      this.startTime = '00:00';
      this.endDate = date;
      this.endTime = '23:59';
    },
    turn(bool) {
      if (bool === false) {
        this.disabled = true;
        this.link = '';
        this.content = '';
        this.startTime = null;
        this.startDate = null;
        this.endTime = null;
        this.endDate = null;
      } else {
        this.disabled = false;
        this.getCurrentDate();
      }
    },
    async addAnnouncement() {
      if (this.cnContent.trim() === '' || this.enContent.trim() === '') {
        this.emptyDialog = true;
      } else {
        if (this.$t('locale') === 'zh-CN') {
          moment.locale('zh-cn');
        }
        if (this.$t('locale') === 'en-US') {
          moment.locale('en');
        }
        const start = moment(`${this.startDate} ${this.startTime}:00`).format();
        const end = moment(`${this.endDate} ${this.endTime}:00`).format();
        await util
          .post(
            `${util.getEnvUrl()}/admin/notify/add`,
            {
              type: 4,
              content: `${this.cnContent}@${this.link}`,
              uid: [],
              state: 1,
              beginTime: moment(start).format('X'),
              endTime: moment(end).format('X'),
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
      }
    },
    close() {
      this.successDialog = false;
      this.failureDialog = false;
      this.emptyDialog = false;
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
