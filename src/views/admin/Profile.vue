<template>
  <div class="layout">
    <AdminNav />
    <v-main style="background: whitesmoke">
      <v-container>
        <div class="user-info-container">
          <v-avatar class="avatar" size="64">
            <img v-if="userAvatar" :src="userAvatar" alt="user icon" />
            <img v-else src="../../assets/icon-default-avatar.jpeg" alt="user icon" />
          </v-avatar>
          <div>
            <div class="name">{{ username }}</div>
            <div class="level d-flex">{{ showRole() }}</div>
          </div>
        </div>

        <v-card class="mt-8 pa-2" elevation="0">
          <v-card-title> {{ localeMsg.title }} </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="username" :label="localeMsg.username" outlined dense></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="avatar" :label="localeMsg.avatar" outlined dense></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="email" :label="localeMsg.email" outlined dense></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="nickname" :label="localeMsg.nickname" outlined dense></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-select :items="genders" :label="localeMsg.gender" v-model="genderName" outlined dense></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-textarea v-model="introduction" :label="localeMsg.introduction" outlined dense></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="6"
                ><p class="password-title">{{ localeMsg.pwdTitle }}:</p>
                <v-form ref="pwdForm" v-model="valid">
                  <v-text-field
                    v-model="password"
                    :label="localeMsg.password"
                    outlined
                    dense
                    :type="showPwd ? 'text' : 'password'"
                    :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required]"
                    @click:append="showPwd = !showPwd"
                  ></v-text-field>
                </v-form> </v-col
            ></v-row>
            <v-card-actions>
              <v-btn color="blue darken-1" text @click="saveProfile"> {{ localeMsg.saveBtn }} </v-btn>
            </v-card-actions>
          </v-card-text>
        </v-card>
        <v-dialog v-model="confirmDialog" max-width="500px">
          <v-card>
            <v-card-title> {{ responseMessage }} </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="confirmDialog = false"> {{ localeMsg.confirmBtn }} </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import bcrypt from 'bcryptjs';
import AdminNav from '../../components/AdminNav.vue';
import util from '../../util';

export default {
  data() {
    return {
      userAvatar: null,
      username: '',
      email: '',
      isRoot: '',
      uid: '',
      nickname: '',
      state: '',
      genders: [
        `${this.$t('admin.profile.male')}`,
        `${this.$t('admin.profile.female')}`,
        `${this.$t('admin.profile.unspecified')}`,
      ],
      genderName: '',
      gender: '',
      introduction: '',
      avatar: '',
      password: '',
      oldPwd: '',
      confirmDialog: false,
      valid: false,
      responseMessage: '',
      showPwd: false,
      rules: {
        required: (v) => !!v || this.localeMsg.required,
      },
    };
  },
  components: {
    AdminNav,
  },
  computed: {
    localeMsg() {
      return {
        admin: this.$t('admin.profile.admin'),
        user: this.$t('admin.profile.user'),
        title: this.$t('admin.profile.title'),
        username: this.$t('admin.profile.username'),
        email: this.$t('admin.profile.email'),
        gender: this.$t('admin.profile.gender'),
        female: this.$t('admin.profile.female'),
        male: this.$t('admin.profile.male'),
        unspecified: this.$t('admin.profile.unspecified'),
        pwdTitle: this.$t('admin.profile.pwdTitle'),
        password: this.$t('admin.profile.password'),
        avatar: this.$t('admin.profile.avatar'),
        nickname: this.$t('admin.profile.nickname'),
        introduction: this.$t('admin.profile.introduction'),
        saveBtn: this.$t('admin.profile.saveBtn'),
        confirmBtn: this.$t('admin.profile.response.confirmBtn'),
        required: this.$t('admin.profile.response.required'),
        emptyPwdNotAllowed: this.$t('admin.profile.response.emptyPwdNotAllowed'),
        wrongPwd: this.$t('admin.profile.response.wrongPwd'),
        successMsg: this.$t('admin.profile.response.successMsg'),
        failureMsg: this.$t('admin.profile.response.failureMsg'),
      };
    },
  },
  async created() {
    util.checkAccess('', this.$router);
    if (localStorage.username) {
      this.username = localStorage.username;
    }
    if (localStorage.avatar) {
      this.userAvatar = localStorage.avatar;
    }
    await util
      .post(`${util.getEnvUrl()}/admin/user/query/info`, { username: this.username }, this.$router)
      .then((response) => {
        if (response.data.code === 10000) {
          this.username = response.data.data.UserName;
          this.email = response.data.data.Email;
          this.isRoot = response.data.data.IsRoot;
          this.uid = response.data.data.UID;
          this.nickname = response.data.data.Nickname;
          this.state = response.data.data.State;
          this.gender = response.data.data.Gender;
          this.introduction = response.data.data.Introduce;
          this.avatar = response.data.data.Avatar;
          this.oldPwd = response.data.data.Passwd;
        }
      });
    this.getGenderName();
  },
  methods: {
    saveProfile() {
      const pwdCheck = bcrypt.compareSync(this.password, this.oldPwd);
      const validationCheck = this.password.trim() !== '' && this.valid;
      if (validationCheck === false) {
        this.confirmDialog = true;
        this.responseMessage = this.localeMsg.emptyPwdNotAllowed;
      } else if (pwdCheck === false) {
        this.confirmDialog = true;
        this.responseMessage = this.localeMsg.wrongPwd;
      } else {
        util
          .post(
            `${util.getEnvUrl()}/admin/user/update/info`,
            {
              uid: this.uid,
              username: this.username,
              email: this.email,
              passCode: '123456',
              passwd: this.password,
              nickname: this.nickname,
              avatar: this.avatar,
              gender: this.getGender(),
              introduce: this.introduction,
              state: this.state,
            },
            this.$router
          )
          .then((response) => {
            this.confirmDialog = true;
            if (response.data.code === 10000) {
              this.responseMessage = this.localeMsg.successMsg;
              localStorage.avatar = this.avatar;
              this.userAvatar = this.avatar;
              this.password = '';
              this.$refs.pwdForm.resetValidation();
            } else {
              this.responseMessage = this.localeMsg.failureMsg;
            }
          });
      }
    },
    showRole() {
      if (this.isRoot === 1) {
        return this.localeMsg.admin;
      }
      return this.localeMsg.user;
    },
    getGenderName() {
      if (this.gender === 0) {
        this.genderName = this.localeMsg.male;
      } else if (this.gender === 1) {
        this.genderName = this.localeMsg.female;
      } else {
        this.genderName = this.localeMsg.unspecified;
      }
    },
    getGender() {
      if (this.genderName === this.localeMsg.female) {
        return 1;
      }
      if (this.genderName === this.localeMsg.male) {
        return 0;
      }
      return 2;
    },
  },
};
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
}

.user-info-container {
  display: flex;
  padding: 20px;
  background: white;
  border-radius: 2px;
  .avatar {
    align-self: center;
    margin-right: 10px;
  }
  .name {
    font-size: 1.28rem;
    font-weight: 420;
  }
}

.stat-container {
  margin: 15px 0;
  padding: 0 10px 20px 10px;
  border-radius: 2px;
  background: white;
  .card {
    margin: 0 12px;
    padding: 12px 0 12px 20px;
    border-radius: 4px;
    background: #ddf1fc;
    .tit {
      display: flex;
      font-size: 1.1rem;
      font-weight: 400;
      color: rgb(97, 96, 96);
    }
    .stat {
      font-size: 1.3rem;
      font-weight: 480;
      color: #3188fa;
    }
    .yesterday {
      font-size: 0.9rem;
      font-weight: 400;
      color: rgb(97, 96, 96);
      span {
        font-size: 0.9rem;
        font-weight: 480;
        color: #3188fa;
        margin-left: 4px;
      }
    }
  }
}

.sth-container {
  margin: 15px 0;
  padding: 0 10px 20px 10px;
  border-radius: 2px;
  background: white;
}
</style>
