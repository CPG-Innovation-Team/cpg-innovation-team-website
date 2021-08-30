<template>
  <div class="form-container">
    <img class="mb-5" width="150" src="../../assets/logo-black.svg" alt="logo image" />
    <v-form ref="form" v-model="valid">
      <label>Email</label>
      <v-text-field v-model="email" type="email" required dense outlined></v-text-field>

      <label>Password</label>
      <v-text-field v-model="password" type="password" required dense outlined></v-text-field>

      <v-btn color="primary" style="float: right">Login</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      email: '',
      password: '',
    };
  },
};
</script>

<style lang="scss" scpoed>
.form-container {
  align-items: center;
  margin: auto;
  width: 396px;
  padding: 30px 20px;
  background-color: white;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
  border-radius: 12px;
}
</style>
