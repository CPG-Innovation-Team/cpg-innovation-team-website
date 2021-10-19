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

      <v-list-group prepend-icon="mdi-post">
        <template v-slot:activator>
          <v-list-item-title>Blogs</v-list-item-title>
        </template>

        <v-list-item link>
          <v-list-item-icon>
            <v-icon></v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Published</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link>
          <v-list-item-icon>
            <v-icon></v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Pending</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      routes: [
        { title: 'Profile', icon: 'mdi-account-circle', link: '/admin/profile' },
        { title: 'Dashboard', icon: 'mdi-view-dashboard', link: '/admin/dashboard' },
        { title: 'Blogs', icon: 'mdi-post', link: '/admin/blogs' },
        { title: 'Users', icon: 'mdi-account-multiple', link: '/admin/users' },
        { title: 'Activity', icon: 'mdi-chart-areaspline-variant', link: '/admin/activities' },
      ],
    };
  },
};
</script>
