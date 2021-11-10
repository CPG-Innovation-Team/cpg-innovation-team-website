<template>
  <div class="layout">
    <AdminNav />
    <v-main style="background: whitesmoke">
      <v-container>
        <div class="user-info-container">
          <v-avatar class="avatar" size="64">
            <img src="https://randomuser.me/api/portraits/men/81.jpg" alt="sample img" />
          </v-avatar>
          <div>
            <div class="name">{{ username }}</div>
            <div class="level d-flex">{{ showRole() }}<v-icon class="ml-2">mdi-information</v-icon></div>
          </div>
        </div>

        <div class="stat-container">
          <v-card-title>Statistics</v-card-title>
          <v-row>
            <v-col>
              <div class="card">
                <a>
                  <div class="tit">Follower<v-icon color="gray">mdi-chevron-right</v-icon></div>
                </a>
                <div class="stat">15</div>
                <div class="yesterday">Yesterday <span>--</span></div>
              </div>
            </v-col>

            <v-col>
              <div class="card">
                <div class="tit">View</div>
                <div class="stat">1,124</div>
                <div class="yesterday">Yesterday <span>28</span></div>
              </div>
            </v-col>

            <v-col>
              <div class="card">
                <div class="tit">Like</div>
                <div class="stat">4,124</div>
                <div class="yesterday">Yesterday <span>6</span></div>
              </div>
            </v-col>

            <v-col>
              <div class="card">
                <div class="tit">Share</div>
                <div class="stat">124</div>
                <div class="yesterday">Yesterday <span>2</span></div>
              </div>
            </v-col>
          </v-row>
        </div>

        <div class="sth-container">
          <v-card-title>Security</v-card-title>
          <div>...</div>
        </div>

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
            <v-row>
              <v-col cols="12" sm="6" md="6"
                >Enter your password:<v-text-field
                  v-model="password"
                  label="password"
                  required
                  :rules="[rules.required]"
                ></v-text-field></v-col
            ></v-row>
            <v-card-actions>
              <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
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
      rules: {
        required: (v) => !!v || 'Required.',
      },
    };
  },
  components: {
    AdminNav,
  },
  async created() {
    if (localStorage.token) {
      this.token = localStorage.token;
    }
    if (localStorage.username) {
      this.username = localStorage.username;
    }
    await axios
      .post(
        'http://localhost:8080/admin/user/query/info',
        {
          username: this.username,
        },
        {
          headers: {
            token: this.token,
          },
        }
      )
      .then((response) => {
        if (response.data.data) {
          console.log(response);
          this.username = response.data.data.UserName;
          this.email = response.data.data.Email;
          this.isRoot = response.data.data.IsRoot;
          this.uid = response.data.data.UID;
          this.nickname = response.data.data.Nickname;
          this.state = response.data.data.State;
          this.gender = response.data.data.Gender;
          this.introduction = response.data.data.Introduce;
          this.avatar = response.data.data.Avatar;
        }
      });
  },
  methods: {
    save() {
      axios
        .post(
          'http://localhost:8080/admin/user/update/info',
          {
            uid: this.uid,
            username: this.username,
            email: this.email,
            passCode: '123456',
            passwd: this.password,
            nickname: this.nickname,
            avatar: this.avatar,
            gender: this.gender,
            introduce: this.introduction,
            state: this.state,
          },
          {
            headers: {
              token: this.token,
            },
          }
        )
        .then((response) => console.log(response));
    },
    showRole() {
      if (this.isRoot === 1) {
        return 'Super Manager';
      }
      return 'User';
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
    /* border: 1px solid silver; */
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
