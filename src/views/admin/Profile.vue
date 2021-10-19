<template>
  <div class="layout">
    <AdminNav />
    <v-container>
      <v-card>
        <v-card-title> Profile </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field v-model="uid" disabled label="uid"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field v-model="username" label="username"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field v-model="email" label="email"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field v-model="isRoot" label="root level"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field v-model="nickname" label="nickname"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field v-model="state" label="state"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field v-model="gender" label="gender"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field v-model="introduction" label="introduction"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field v-model="avatar" label="avatar"></v-text-field>
            </v-col>
          </v-row>
          <v-row
            ><v-col cols="12" sm="6" md="6"><v-text-field v-model="password" label="password"></v-text-field></v-col
          ></v-row>
          <v-card-actions>
            <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';
import AdminNav from '../../components/AdminNav.vue';

export default {
  data() {
    return {
      username: '',
      email: '',
      isRoot: '',
      uid: '',
      nickname: '',
      state: '',
      gender: '',
      introduction: '',
      avatar: '',
      token: '',
      password: '',
    };
  },
  components: {
    AdminNav,
  },
  async created() {
    await axios
      .post('http://localhost:8080/login', {
        username: 'chenxi666',
        passwd: '$2a$10$20xO1elb7k5Cb2hZ5M5rluKKnrYARDSdOni04U30EeROKjm4oj00a',
      })
      .then((response) => {
        this.token = response.data.data.Token;
      });
    await axios
      .post(
        'http://localhost:8080/admin/user/query/info',
        {
          username: 'chenxi666',
        },
        {
          headers: {
            token: this.token,
          },
        }
      )
      .then((response) => {
        this.username = response.data.data.UserName;
        this.email = response.data.data.Email;
        this.isRoot = response.data.data.IsRoot;
        this.uid = response.data.data.UID;
        this.nickname = response.data.data.Nickname;
        this.state = response.data.data.State;
        this.gender = response.data.data.Gender;
        this.introduction = response.data.data.Introduce;
        this.avatar = response.data.data.Avatar;
      });
  },
  methods: {
    save() {
      axios
        .post(
          'http://localhost:8080/admin/user/update/info',
          {
            uid: 127,
            username: this.username,
            email: this.email,
            passCode: 'dddfdfdfsdd',
            passwd: this.password,
            nickname: 'cx',
            avatar: 'www.baidu.com',
            gender: 1,
            introduce: 'hello',
            state: 0,
          },
          {
            headers: {
              token: this.token,
            },
          }
        )
        .then((response) => console.log(response));
    },
  },
};
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
}
</style>
