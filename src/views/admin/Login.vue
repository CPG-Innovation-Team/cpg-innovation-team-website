<template>
  <div class="background">
    <div class="form-container" data-test-id="login-form">
      <router-link to="/">
        <img class="mb-5" width="150" src="../../assets/logo-black.svg" alt="logo image" />
      </router-link>

      <v-form ref="form" v-model="valid" @submit.prevent="validate">
        <label>Username</label>
        <v-text-field
          v-model="username"
          type="username"
          :rules="[rules.required]"
          required
          dense
          outlined
        ></v-text-field>

        <label>Password</label>
        <v-text-field
          v-model="password"
          type="password"
          :rules="[rules.required]"
          required
          dense
          outlined
        ></v-text-field>

        <p style="text-align: right; font-size: 0.9rem; margin-top: 8px">
          <a>Forgot password?</a>
        </p>
        <p style="text-align: right; font-size: 0.9rem">
          Don't have an account? <router-link to="/signup">Sign up</router-link>
        </p>

        <v-btn color="primary" style="float: right; margin-left: 100%" @click="login(username, password)">Login</v-btn>
        <v-dialog transition="dialog-bottom-transition" max-width="600" v-model="dialog">
          <template>
            <v-card>
              <v-card-text>
                <div class="text-h6 pa-6">输入信息有误，请重试</div>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn text @click="dialog = false">Confirm</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      valid: false,
      username: '',
      password: '',
      dialog: false,
      userExisted: false,
      rules: {
        required: (v) => !!v || 'Required.',
        emailMatch: () => `The email and password you entered don't match`,
      },
    };
  },
  methods: {
    validate() {
      if (this.$refs.form.validate() && this.userExisted === true) {
        this.$router.push('/');
      }
    },
    async login(username, password) {
      if (this.username === '' || this.password === '') {
        this.dialog = true;
      } else {
        await axios
          .post('http://localhost:8080/login', {
            username,
            passwd: password,
          })
          .then((response) => {
            if (response.data.message === 'OK') {
              localStorage.token = response.data.data.Token;
              localStorage.username = this.username;
              this.userExisted = true;
              this.$router.push('/');
            } else {
              this.dialog = true;
            }
          });
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
