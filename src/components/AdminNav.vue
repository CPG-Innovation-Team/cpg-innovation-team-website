<template>
  <v-navigation-drawer v-model="drawer" color="gray" width="200" permanent>
    <v-list dense nav class="py-0">
      <v-list-item>
        <router-link to="/">
          <img class="mt-3 ml-5" width="136" height="34" src="../assets/logo-black.svg" alt="logo image" />
        </router-link>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item v-for="route in routes" :key="route.index" link :to="route.link">
        <v-list-item-icon>
          <v-icon>{{ route.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ route.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-btn class="ml-8 mt-8" text @click="logout"> {{ localeMsg.logout }} </v-btn>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import util from '../util';

export default {
  data() {
    return {
      drawer: true,
      routes: [
        { title: this.$t('admin.navbar.profile'), icon: 'mdi-account-circle', link: '/admin/profile' },
        { title: this.$t('admin.navbar.dashboard'), icon: 'mdi-view-dashboard', link: '/admin/dashboard' },
        { title: this.$t('admin.navbar.blogs'), icon: 'mdi-post', link: '/admin/blogs' },
        { title: this.$t('admin.navbar.users'), icon: 'mdi-account-multiple', link: '/admin/users' },
        { title: this.$t('admin.navbar.permission'), icon: 'mdi-account-multiple-plus', link: '/admin/permission' },
        { title: this.$t('admin.navbar.approval'), icon: 'mdi-post', link: '/admin/approve' },
        { title: this.$t('admin.navbar.announcement'), icon: 'mdi-bell', link: '/admin/announcement' },
        { title: this.$t('admin.navbar.changePwd'), icon: 'mdi-onepassword', link: '/admin/changePwd' },
      ],
      username: '',
      token: '',
      timer: null,
      mouseoverCallback: null,
    };
  },
  computed: {
    localeMsg() {
      return {
        logout: this.$t('admin.navbar.logout'),
      };
    },
  },
  async created() {
    if (localStorage.token) {
      this.token = localStorage.token;
    }
    if (localStorage.username) {
      this.username = localStorage.username;
    }
    this.mouseoverCallback = util.debounce(function func() {
      localStorage.lastClickTime = new Date().getTime();
    }, 3000);
    if (this.token !== '') {
      window.addEventListener('mouseover', this.mouseoverCallback, true);
    }
  },
  mounted() {
    // 0.5 hour = 1000 * 60 * 30 ms
    // if the user is logged in, create timer, check timeout every 30 minutes
    if (this.token !== '') {
      this.timer = setInterval(this.checkTimeOut, 1000 * 60 * 30);
    }
  },
  beforeDestroy() {
    window.removeEventListener('mouseover', this.mouseoverCallback, true);
    clearTimeout(this.timer);
  },
  methods: {
    checkTimeOut() {
      const timeOut = 1000 * 60 * 60;
      const currentTime = new Date().getTime();
      const lastTime = localStorage.lastClickTime;
      // if the last click time is longer than 1 hour, then log out
      if (currentTime - lastTime > timeOut) {
        this.logout();
        clearInterval(this.timer);
      }
    },
    logout() {
      util.post(`${util.getEnvUrl()}/admin/logout`, {}, this.$router).then(() => {
        this.token = '';
        this.username = '';
        this.avatar = null;
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('avatar');
        window.removeEventListener('mouseover', this.mouseoverCallback, true);
        this.$router.push('/login');
      });
    },
  },
};
</script>
