<template>
  <div class="layout">
    <AdminNav />
    <v-main style="background: whitesmoke">
      <v-container>
        <v-card class="mt-4">
          <v-card-title> Modify password </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6" md="12">
                <v-form ref="oldPwdForm">
                  <v-text-field
                    v-model="oldPwd"
                    label="旧密码"
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
                    label="新密码"
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
                    label="再次输入新密码"
                    :type="showRepeatPwd ? 'text' : 'password'"
                    :append-icon="showRepeatPwd ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.match]"
                    @click:append="showRepeatPwd = !showRepeatPwd"
                  ></v-text-field>
                </v-form>
              </v-col>
            </v-row>
            <v-card-actions>
              <v-col class="text-left">
                <v-row>
                  <v-btn color="blue darken-1" text @click="savePwd"> Confirm </v-btn>
                </v-row>
              </v-col>
            </v-card-actions>
          </v-card-text>
        </v-card>
        <v-dialog v-model="pwdDialog" max-width="500px">
          <v-card>
            <v-card-title> {{ pwdMessage }} </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="pwdDialog = false"> Confirm </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="responseDialog" max-width="500px">
          <v-card>
            <v-card-title> {{ responseMessage }} </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="responseDialog = false"> Confirm </v-btn>
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
      username: '',
      email: '',
      uid: '',
      nickname: '',
      password: '',
      originalPwd: '',
      oldPwd: '',
      newPwd: '',
      newPwdRepeat: '',
      pwdDialog: false,
      responseDialog: false,
      pwdMessage: '',
      responseMessage: '',
      newPwdValid: false,
      repeatPwdValid: false,
      showOldPwd: false,
      showNewPwd: false,
      showRepeatPwd: false,
      rules: {
        required: (v) => !!v || 'Required.',
        digitAlphabet: (v) =>
          (v && /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/.test(v)) || 'The password must contain numbers and alphabets',
        min: (v) => (v.length >= 6 && v.length <= 32) || 'Min 6 characters, max 32 characters',
        match: (v) => v === this.newPwd || `The two passwords you entered don't match`,
      },
    };
  },
  components: {
    AdminNav,
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      if (localStorage.username) {
        this.username = localStorage.username;
      }
      util.post(`${util.getEnvUrl()}/admin/user/query/info`, { username: this.username }).then((response) => {
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
        this.pwdDialog = true;
        this.pwdMessage = '密码不可为空';
      } else if (this.newPwdValid === false) {
        this.pwdDialog = true;
        this.pwdMessage = '新密码不符合规则';
      } else if (this.repeatPwdValid === false) {
        this.pwdDialog = true;
        this.pwdMessage = '密码不匹配';
      } else if (pwdCheck === false) {
        this.pwdDialog = true;
        this.pwdMessage = '旧密码不正确';
      } else {
        util
          .post(`${util.getEnvUrl()}/admin/user/update/info`, {
            uid: this.uid,
            email: this.email,
            username: this.username,
            passCode: '123456',
            passwd: bcrypt.hashSync(this.newPwd, 10),
            nickname: this.nickname,
          })
          .then((response) => {
            this.responseDialog = true;
            if (response.data.code === 10002) {
              this.responseMessage = '密码保存失败';
            } else {
              this.responseMessage = '密码保存成功';
              this.oldPwd = '';
              this.newPwd = '';
              this.newPwdRepeat = '';
              this.$refs.oldPwdForm.resetValidation();
              this.$refs.newPwdForm.resetValidation();
              this.$refs.repeatPwdForm.resetValidation();
            }
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
