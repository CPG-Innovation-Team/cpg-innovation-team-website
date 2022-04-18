<template>
  <div class="layout">
    <AdminNav />
    <v-main style="background: whitesmoke">
      <v-card class="ma-4" elevation="0">
        <v-card-title> {{ localeMsg.title }} </v-card-title>
        <v-card-text
          ><v-radio-group v-model="value" row>
            <v-radio :label="localeMsg.turnOn" value="announcementOn" @click="turn(true)"></v-radio>
            <v-radio :label="localeMsg.turnOff" value="announcementOff" @click="turn(false)"></v-radio>
            <v-col class="text-right">
              <v-btn text color="blue" @click="clearAll()">{{ localeMsg.clearAllLabel }}</v-btn>
            </v-col>
          </v-radio-group>
          <v-text-field :label="localeMsg.cnContentLabel" :disabled="disabled" v-model="cnContent"></v-text-field>
          <v-text-field :label="localeMsg.enContentLabel" :disabled="disabled" v-model="enContent"></v-text-field>
          <v-text-field :label="localeMsg.urlLabel" :disabled="disabled" v-model="link"></v-text-field>
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
                    :label="localeMsg.startDateLabel"
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
                    :label="localeMsg.startTimeLabel"
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
                    :label="localeMsg.endDateLabel"
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
                    :label="localeMsg.endTimeLabel"
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
          <v-btn class="mt-4" text color="blue" @click="addAnnouncement()">{{ localeMsg.saveBtnLabel }}</v-btn>
        </v-card-text>
      </v-card>

      <v-dialog v-model="successDialog" max-width="500px">
        <v-card>
          <v-card-title> {{ localeMsg.successMsg }} </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close"> {{ localeMsg.confirmBtnLabel }} </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="failureDialog" max-width="500px">
        <v-card>
          <v-card-title> {{ localeMsg.failureMsg }}</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close"> {{ localeMsg.confirmBtnLabel }} </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="emptyDialog" max-width="500px">
        <v-card>
          <v-card-title> {{ localeMsg.warningMsg }} </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close"> {{ localeMsg.confirmBtnLabel }} </v-btn>
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
      announcement: { content: '' },
      announcementContent: '',
      announcementURL: '',
    };
  },
  components: {
    AdminNav,
  },
  computed: {
    localeMsg() {
      return {
        title: this.$t('admin.announcement.title'),
        turnOn: this.$t('admin.announcement.radioBtn.turnOn'),
        turnOff: this.$t('admin.announcement.radioBtn.turnOff'),
        clearAllLabel: this.$t('admin.announcement.radioBtn.clearAll'),
        cnContentLabel: this.$t('admin.announcement.content.chineseContent'),
        enContentLabel: this.$t('admin.announcement.content.englishContent'),
        urlLabel: this.$t('admin.announcement.url'),
        startDateLabel: this.$t('admin.announcement.date.startDate'),
        endDateLabel: this.$t('admin.announcement.date.endDate'),
        startTimeLabel: this.$t('admin.announcement.time.startTime'),
        endTimeLabel: this.$t('admin.announcement.time.endTime'),
        saveBtnLabel: this.$t('admin.announcement.save'),
        successMsg: this.$t('admin.announcement.successMsg'),
        failureMsg: this.$t('admin.announcement.failureMsg'),
        warningMsg: this.$t('admin.announcement.warningMsg'),
        confirmBtnLabel: this.$t('admin.announcement.confirm'),
      };
    },
  },
  async created() {
    util.checkAccess('announcement', this.$router);
    this.getCurrentDate();
    await this.getAnnouncement();
  },
  methods: {
    async getAnnouncement() {
      await util.post(`${util.getEnvUrl()}/notify/query`, {}).then((response) => {
        if (response.data.code === 10000) {
          if (response.data.message === '当前时间段暂无通知') {
            this.announcement = { content: '' };
          }
          if (response.data.data.NotificationList) {
            const output = response.data.data.NotificationList.slice(-1)[0];
            this.announcement = { content: output.Content };
            this.startDate = output.BeginTime.substring(0, output.BeginTime.indexOf('T'));
            this.endDate = output.EndTime.substring(0, output.EndTime.indexOf('T'));
            this.startTime = output.BeginTime.substring(
              output.BeginTime.indexOf('T') + 1,
              output.BeginTime.indexOf('+') - 3
            );
            this.endTime = output.EndTime.substring(output.EndTime.indexOf('T') + 1, output.EndTime.indexOf('+') - 3);
            this.cnContent = util.getAnnouncementCNContent(this.announcement);
            this.enContent = util.getAnnouncementENContent(this.announcement);
            this.link = util.getAnnouncementURL(this.announcement);
          }
        }
      });
    },
    clearAll() {
      this.cnContent = '';
      this.enContent = '';
      this.link = '';
      this.startDate = null;
      this.endDate = null;
      this.startTime = null;
      this.endTime = null;
    },
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
        this.cnContent = '';
        this.enContent = '';
        this.startTime = null;
        this.startDate = null;
        this.endTime = null;
        this.endDate = null;
      } else {
        this.disabled = false;
        this.getCurrentDate();
        this.getAnnouncement();
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
              content: `${this.cnContent}#${this.enContent}@${this.link}`,
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
              this.cnContent = '';
              this.enContent = '';
              this.link = '';
              this.startDate = null;
              this.endDate = null;
              this.startTime = null;
              this.endTime = null;
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
