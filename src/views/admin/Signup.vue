<template>
  <div class="background">
    <div class="form-container">
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

        <label>{{ localeMsg.nickname }}</label>
        <v-text-field
          v-model="nickname"
          type="nickname"
          :rules="[rules.required]"
          required
          dense
          outlined
        ></v-text-field>

        <label>{{ localeMsg.email }}</label>
        <v-text-field v-model="email" type="email" :rules="[rules.required]" required dense outlined></v-text-field>

        <label>{{ localeMsg.password }}</label>
        <v-text-field
          v-model="password"
          :type="showPwd ? 'text' : 'password'"
          :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min, rules.digitAlphabet]"
          required
          dense
          outlined
          @click:append="showPwd = !showPwd"
        ></v-text-field>

        <label>{{ localeMsg.confirmPwd }}</label>
        <v-text-field
          v-model="confirmedPwd"
          :type="showConfirmPwd ? 'text' : 'password'"
          :append-icon="showConfirmPwd ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.match]"
          required
          dense
          outlined
          @click:append="showConfirmPwd = !showConfirmPwd"
        ></v-text-field>

        <p style="text-align: right; font-size: 0.9rem; margin-top: 8px">
          {{ localeMsg.alreadyHaveAccount }} <router-link to="/login">{{ localeMsg.login }}</router-link>
        </p>

        <v-btn type="submit" color="primary" style="float: right; margin-left: 100%" @click="register">{{
          localeMsg.signup
        }}</v-btn>
      </v-form>
      <v-dialog max-width="600" v-model="responseDialog">
        <template>
          <v-card>
            <v-card-text>
              <div class="text-h6 pa-6">{{ localeMsg.failureMsg }}</div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn text @click="responseDialog = false">{{ localeMsg.confirm }}</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
      <v-dialog max-width="600" v-model="alertDialog">
        <template>
          <v-card>
            <v-card-text>
              <div class="text-h6 pa-6">{{ localeMsg.invalidMsg }}</div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn text @click="alertDialog = false">{{ localeMsg.confirm }}</v-btn>
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
      nickname: '',
      passCode: '123456',
      email: '',
      password: '',
      confirmedPwd: '',
      responseDialog: false,
      alertDialog: false,
      showPwd: false,
      showConfirmPwd: false,
      rules: {
        required: (v) => !!v || `${this.localeMsg.required}`,
        digitAlphabet: (v) => (v && /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/.test(v)) || `${this.localeMsg.pwdFormat}`,
        min: (v) => (v.length >= 8 && v.length <= 32) || `${this.localeMsg.minPwd}`,
        match: (v) => v === this.password || `${this.localeMsg.notSamePwd}`,
      },
    };
  },
  computed: {
    localeMsg() {
      return {
        username: this.$t('signup.username'),
        nickname: this.$t('signup.nickname'),
        email: this.$t('signup.email'),
        password: this.$t('signup.password'),
        confirmPwd: this.$t('signup.confirmPwd'),
        alreadyHaveAccount: this.$t('signup.alreadyHaveAccount'),
        login: this.$t('signup.login'),
        signup: this.$t('signup.signup'),
        failureMsg: this.$t('signup.failureMsg'),
        invalidMsg: this.$t('signup.invalidMsg'),
        confirm: this.$t('dialogMsg.confirm'),
        required: this.$t('dialogMsg.required'),
        pwdFormat: this.$t('dialogMsg.pwdFormat'),
        minPwd: this.$t('dialogMsg.minPwd'),
        notSamePwd: this.$t('dialogMsg.notSamePwd'),
      };
    },
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    async register() {
      if (this.valid === true) {
        await axios
          .post(`${util.getEnvUrl()}/register`, {
            username: this.username,
            nickname: this.nickname,
            email: this.email,
            passCode: this.passCode,
            passwd: this.password,
            gender: 2,
          })
          .then((response) => {
            if (response.data.code === 10000) {
              localStorage.token = response.data.data.Token;
              localStorage.username = this.username;
              this.$router.push('/');
            } else {
              this.responseDialog = true;
            }
          });
      } else {
        this.alertDialog = true;
      }
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
