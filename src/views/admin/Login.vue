<template>
  <div class="background">
    <div class="form-container" data-test-id="login-form">
      <router-link to="/">
        <img class="mb-5" width="150" src="../../assets/logo-black.svg" alt="logo image" />
      </router-link>
      <v-form ref="form" v-model="valid" @submit.prevent="validate">
        <label>{{ localeMsg.username }}</label>
        <v-text-field
          v-model="username"
          type="username"
          :rules="[rules.required]"
          required
          dense
          outlined
        ></v-text-field>

        <label>{{ localeMsg.password }}</label>
        <v-text-field
          v-model="password"
          :type="showPwd ? 'text' : 'password'"
          :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required]"
          required
          dense
          outlined
          @click:append="showPwd = !showPwd"
        ></v-text-field>

        <p style="text-align: right; font-size: 0.9rem; margin-top: 8px">
          <a>{{ localeMsg.forgottenPwdMsg }}</a>
        </p>
        <p style="text-align: right; font-size: 0.9rem">
          {{ localeMsg.noAccountMsg }} <router-link to="/signup">{{ localeMsg.signup }}</router-link>
        </p>

        <v-btn
          type="submit"
          color="primary"
          style="float: right; margin-left: 100%"
          @click="login(username, password)"
          >{{ localeMsg.loginBtn }}</v-btn
        >
      </v-form>
      <v-dialog max-width="600" v-model="dialog">
        <template>
          <v-card>
            <v-card-text>
              <div class="text-h6 pa-6">{{ localeMsg.infoErrMsg }}</div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn text @click="dialog = false">{{ localeMsg.confirm }}</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import util from '../../util';

export default {
  data() {
    return {
      valid: false,
      username: '',
      password: '',
      dialog: false,
      showPwd: false,
      rules: {
        required: (v) => !!v || `${this.localeMsg.required}`,
      },
    };
  },
  computed: {
    localeMsg() {
      return {
        username: this.$t('login.username'),
        password: this.$t('login.password'),
        forgottenPwdMsg: this.$t('login.forgottenPwdMsg'),
        noAccountMsg: this.$t('login.noAccountMsg'),
        signup: this.$t('login.signup'),
        loginBtn: this.$t('login.loginBtn'),
        infoErrMsg: this.$t('login.infoErrMsg'),
        confirm: this.$t('dialogMsg.confirm'),
        required: this.$t('dialogMsg.required'),
      };
    },
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    async login(username, password) {
      if (this.valid === true) {
        await axios
          .post(`${util.getEnvUrl()}/login`, {
            username,
            passwd: password,
          })
          .then(async (response) => {
            if (response.data.code === 10000) {
              localStorage.token = response.data.data.Token;
              await this.saveUserInfo();
              this.$router.go(-1);
            } else {
              this.dialog = true;
            }
          });
      } else {
        this.dialog = true;
      }
    },
    async saveUserInfo() {
      await util
        .post(`${util.getEnvUrl()}/admin/user/query/info`, { username: this.username }, this.$router)
        .then((response) => {
          if (response.data.code === 10000) {
            localStorage.uid = response.data.data.UID;
            localStorage.username = response.data.data.UserName;
            localStorage.avatar = response.data.data.Avatar;
          }
        });
    },
  },
};
</script>

<style lang="scss" scpoed>
.background {
  display: flex;
  min-height: 550px;
  height: 100vh;
  background: rgb(235, 232, 232);
  .form-container {
    align-items: center;
    margin: auto;
    width: 396px;
    padding: 30px 20px;
    background-color: white;
    box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
    border-radius: 12px;
  }
}
</style>
