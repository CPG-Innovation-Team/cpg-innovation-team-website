<template>
  <div class="background">
    <div class="form-container">
      <router-link to="/">
        <img class="mb-5" width="150" src="../../assets/logo-black.svg" alt="logo image" />
      </router-link>
      <v-form ref="form" v-model="valid">
        <label>Username</label>
        <v-text-field v-model="username" type="email" :rules="[rules.required]" required dense outlined></v-text-field>

        <label>Email</label>
        <v-text-field v-model="email" type="email" :rules="[rules.required]" required dense outlined></v-text-field>

        <label>Password</label>
        <v-text-field
          v-model="password"
          type="password"
          :rules="[rules.required, rules.min]"
          required
          dense
          outlined
        ></v-text-field>

        <label>Confirm Password</label>
        <v-text-field
          v-model="confirmedPwd"
          type="password"
          :rules="[rules.required, rules.min, rules.confirm]"
          required
          dense
          outlined
        ></v-text-field>

        <p style="text-align: right; font-size: 0.9rem; margin-top: 8px">
          Already have an account? <router-link to="/login">Login</router-link>
        </p>

        <v-btn color="primary" style="float: right; margin-left: 100%">Signup</v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      username: '',
      email: '',
      password: '',
      confirmedPwd: '',
      rules: {
        required: (v) => !!v || 'Required.',
        min: (v) => v.length >= 8 || 'Min 8 characters',
        confirm: (v) => v.value === this.confirmedPwd || 'Your password need to be the same as above',
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
