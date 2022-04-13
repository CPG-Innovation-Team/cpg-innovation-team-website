<template>
  <div class="layout">
    <AdminNav />
    <v-main style="background: whitesmoke">
      <v-container fill-height fluid>
        <v-row align="center" justify="center">
          <v-card class="mt-4" width="400px" elevation="0">
            <v-card-title> {{ localeMsg.title }}</v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="6" md="12">
                  <v-form ref="oldPwdForm">
                    <v-text-field
                      v-model="oldPwd"
                      :label="localeMsg.oldPwd"
                      outlined
                      dense
                      :type="showOldPwd ? 'text' : 'password'"
                      :append-icon="showOldPwd ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required]"
                      @click:append="showOldPwd = !showOldPwd"
                    ></v-text-field>
                  </v-form>
                </v-col>

                <v-col cols="12" sm="6" md="12">
                  <v-form ref="newPwdForm" v-model="newPwdValid">
                    <v-text-field
                      v-model="newPwd"
                      :label="localeMsg.newPwd"
                      outlined
                      dense
                      :type="showNewPwd ? 'text' : 'password'"
                      :append-icon="showNewPwd ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, rules.min, rules.digitAlphabet]"
                      @click:append="showNewPwd = !showNewPwd"
                    ></v-text-field>
                  </v-form>
                </v-col>
                <v-col cols="12" sm="6" md="12">
                  <v-form ref="repeatPwdForm" v-model="repeatPwdValid">
                    <v-text-field
                      v-model="newPwdRepeat"
                      :label="localeMsg.repeatedPwd"
                      outlined
                      dense
                      :type="showRepeatPwd ? 'text' : 'password'"
                      :append-icon="showRepeatPwd ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, rules.match]"
                      @click:append="showRepeatPwd = !showRepeatPwd"
                    ></v-text-field>
                  </v-form>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="savePwd"> {{ localeMsg.confirmBtn }} </v-btn>
            </v-card-actions>
          </v-card>
          <v-dialog v-model="alertDialog" max-width="500px">
            <v-card>
              <v-card-title> {{ alertMessage }} </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="alertDialog = false"> {{ localeMsg.confirmBtn }} </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="responseDialog" max-width="500px">
            <v-card>
              <v-card-title> {{ responseMessage }} </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="responseDialog = false"> {{ localeMsg.confirmBtn }} </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
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
      username: '',
      email: '',
      uid: '',
      nickname: '',
      password: '',
      originalPwd: '',
      oldPwd: '',
      newPwd: '',
      newPwdRepeat: '',
      alertDialog: false,
      responseDialog: false,
      alertMessage: '',
      responseMessage: '',
      newPwdValid: false,
      repeatPwdValid: false,
      showOldPwd: false,
      showNewPwd: false,
      showRepeatPwd: false,
      rules: {
        required: (v) => !!v || this.localeMsg.required,
        digitAlphabet: (v) => (v && /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/.test(v)) || this.localeMsg.digitAlphabet,
        min: (v) => (v.length >= 8 && v.length <= 32) || this.localeMsg.min,
        match: (v) => v === this.newPwd || this.localeMsg.match,
      },
    };
  },
  components: {
    AdminNav,
  },
  computed: {
    localeMsg() {
      return {
        title: this.$t('admin.changePwd.title'),
        oldPwd: this.$t('admin.changePwd.oldPwd'),
        newPwd: this.$t('admin.changePwd.newPwd'),
        repeatedPwd: this.$t('admin.changePwd.repeatedPwd'),
        confirmBtn: this.$t('admin.changePwd.confirmBtn'),
        required: this.$t('admin.changePwd.required'),
        digitAlphabet: this.$t('admin.changePwd.digitAlphabet'),
        min: this.$t('admin.changePwd.min'),
        match: this.$t('admin.changePwd.match'),
        emptyPwdNotAllowed: this.$t('admin.changePwd.emptyPwdNotAllowed'),
        wrongPwd: this.$t('admin.changePwd.wrongPwd'),
        dismatchPwd: this.$t('admin.changePwd.dismatchPwd'),
        newPwdNotValid: this.$t('admin.changePwd.newPwdNotValid'),
        successMsg: this.$t('admin.changePwd.successMsg'),
        failureMsg: this.$t('admin.changePwd.failureMsg'),
      };
    },
  },
  created() {
    util.checkAccess('', this.$router);
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      if (localStorage.username) {
        this.username = localStorage.username;
      }
      util
        .post(`${util.getEnvUrl()}/admin/user/query/info`, { username: this.username }, this.$router)
        .then((response) => {
          if (response.data.code === 10000) {
            this.username = response.data.data.UserName;
            this.email = response.data.data.Email;
            this.uid = response.data.data.UID;
            this.nickname = response.data.data.Nickname;
            this.originalPwd = response.data.data.Passwd;
          }
        });
    },
    savePwd() {
      const pwdCheck = bcrypt.compareSync(this.oldPwd, this.originalPwd);
      const emptyPwdCheck = this.oldPwd.trim() !== '' && this.newPwd.trim() !== '' && this.newPwdRepeat.trim() !== '';
      this.$refs.oldPwdForm.validate();
      this.$refs.newPwdForm.validate();
      this.$refs.repeatPwdForm.validate();
      this.confirmDialog = true;
      if (emptyPwdCheck === false) {
        this.alertDialog = true;
        this.alertMessage = this.localeMsg.emptyPwdNotAllowed;
      } else if (this.newPwdValid === false) {
        this.alertDialog = true;
        this.alertMessage = this.localeMsg.newPwdNotValid;
      } else if (this.repeatPwdValid === false) {
        this.alertDialog = true;
        this.alertMessage = this.localeMsg.dismatchPwd;
      } else if (pwdCheck === false) {
        this.alertDialog = true;
        this.alertMessage = this.localeMsg.wrongPwd;
      } else {
        util
          .post(
            `${util.getEnvUrl()}/admin/user/update/info`,
            {
              uid: this.uid,
              email: this.email,
              username: this.username,
              passCode: '123456',
              passwd: this.newPwd,
              nickname: this.nickname,
            },
            this.$router
          )
          .then((response) => {
            this.responseDialog = true;
            if (response.data.code === 10000) {
              this.responseMessage = this.localeMsg.successMsg;
            } else {
              this.responseMessage = this.localeMsg.failureMsg;
            }
            this.oldPwd = '';
            this.newPwd = '';
            this.newPwdRepeat = '';
            this.$refs.oldPwdForm.resetValidation();
            this.$refs.newPwdForm.resetValidation();
            this.$refs.repeatPwdForm.resetValidation();
          });
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
