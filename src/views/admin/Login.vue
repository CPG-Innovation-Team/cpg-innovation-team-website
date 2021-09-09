<template>
  <div class="background">
    <div class="form-container">
      <router-link to="/">
        <img class="mb-5" width="150" src="../../assets/logo-black.svg" alt="logo image" />
      </router-link>

      <v-form ref="form" v-model="valid" @submit.prevent="validate">
        <label>Email</label>
        <v-text-field v-model="email" type="email" :rules="[rules.required]" required dense outlined></v-text-field>

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

        <v-btn type="submit" color="primary" style="float: right; margin-left: 100%">Login</v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      email: '',
      password: '',
      rules: {
        required: (v) => !!v || 'Required.',
        emailMatch: () => `The email and password you entered don't match`,
      },
    };
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.$router.push('/');
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
