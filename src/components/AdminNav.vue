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
        {
          name: 'profile',
          title: this.$t('admin.navbar.profile'),
          icon: 'mdi-account-circle',
          link: '/admin/profile',
        },
        {
          name: 'changePwd',
          title: this.$t('admin.navbar.changePwd'),
          icon: 'mdi-onepassword',
          link: '/admin/changePwd',
        },
      ],
      username: '',
      token: '',
      allRoles: [],
      roleNames: [],
      permissions: [],
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
    if (localStorage.routes === undefined && localStorage.uid) {
      await this.saveRoutesIndex();
    }
    if (localStorage.routes) {
      this.initializeRoutes();
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
    // if the user is logged in
    if (this.token !== '') {
      // when user opens the page, check timeout immediately
      this.checkTimeOut();
      // then check timeout every 30 mins
      this.timer = setInterval(this.checkTimeOut, 1000 * 60 * 30);
    }
  },
  beforeDestroy() {
    window.removeEventListener('mouseover', this.mouseoverCallback, true);
    clearTimeout(this.timer);
  },
  methods: {
    initializeRoutes() {
      if (localStorage.routes.length !== 0) {
        const routeNames = localStorage.routes;
        this.addRoutes(
          routeNames,
          'dashboard',
          this.$t('admin.navbar.dashboard'),
          'mdi-view-dashboard',
          '/admin/dashboard'
        );
        this.addRoutes(routeNames, 'blogs', this.$t('admin.navbar.blogs'), 'mdi-post', '/admin/blogs');
        this.addRoutes(routeNames, 'users', this.$t('admin.navbar.users'), 'mdi-account-multiple', '/admin/users');
        this.addRoutes(
          routeNames,
          'permission',
          this.$t('admin.navbar.permission'),
          'mdi-account-multiple-plus',
          '/admin/permission'
        );
        this.addRoutes(routeNames, 'approval', this.$t('admin.navbar.approval'), 'mdi-post', '/admin/approve');
        this.addRoutes(
          routeNames,
          'announcement',
          this.$t('admin.navbar.announcement'),
          'mdi-bell',
          '/admin/announcement'
        );
      }
    },
    addRoutes(routeNames, routeName, title, icon, link) {
      if (routeNames.includes(routeName)) {
        this.routes.push({
          name: routeName,
          title,
          icon,
          link,
        });
      }
    },
    async saveRoutesIndex() {
      let routes = [];
      if (localStorage.isRoot) {
        routes = ['dashboard', 'blogs', 'users', 'permission', 'approval', 'announcement'];
      } else {
        await this.getPermissions();
        this.addRouteNames('/admin/article/list', 'blogs', routes);
        this.addRouteNames('/admin/user/query/list', 'users', routes);
        this.addRouteNames('/admin/auth/query/permissions', 'permission', routes);
        this.addRouteNames('/admin/review/query/article/list', 'approval', routes);
        this.addRouteNames('/admin/notify/add', 'announcement', routes);
      }
      localStorage.routes = routes;
    },
    // add route names to routes
    addRouteNames(permission, routeName, routes) {
      if (this.permissions.includes(permission)) routes.push(routeName);
    },
    async getPermissions() {
      await util
        .post(
          `${util.getEnvUrl()}/admin/auth/query/user/roles`,
          { uid: [parseInt(localStorage.uid, 10)] },
          this.$router
        )
        .then(async (response) => {
          await this.getAllRoles();
          if (response.data.code === 10000) {
            // save the role names the user owns
            this.roleNames = response.data.data[0].roleNames;
            Object.keys(this.allRoles).forEach((role) => {
              // save corresponding permissions for existing roles
              if (this.roleNames.includes(role)) {
                this.permissions.push(this.allRoles[role]);
              }
            });
            // flatten the permission array
            this.permissions = this.permissions.flat();
          }
        });
    },
    async getAllRoles() {
      await util.post(`${util.getEnvUrl()}/admin/auth/query/roles`, {}, this.$router).then((response) => {
        if (response.data.code === 10000) {
          // save role names with their corresponding permission uris in allRoles
          this.allRoles = response.data.data;
        }
      });
    },
    checkTimeOut() {
      const timeOut = 1000 * 60 * 60;
      const currentTime = new Date().getTime();
      const lastTime = localStorage.lastClickTime;
      // if the last click time is longer than 1 hour, then log out
      if (currentTime - lastTime > timeOut) {
        this.clearUserInfo();
        this.$router.push('/login');
        clearInterval(this.timer);
      }
    },
    logout() {
      util.post(`${util.getEnvUrl()}/admin/logout`, {}, this.$router).then(() => {
        this.clearUserInfo();
        this.$router.push('/');
      });
    },
    clearUserInfo() {
      this.token = '';
      this.username = '';
      this.avatar = null;
      util.clearLocalStorage();
      window.removeEventListener('mouseover', this.mouseoverCallback, true);
    },
  },
};
</script>
