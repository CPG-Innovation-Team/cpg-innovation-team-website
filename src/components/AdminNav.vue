<template>
  <v-navigation-drawer v-model="drawer" color="gray" width="200" permanent>
    <v-list dense nav class="py-0">
      <v-list-item two-line>
        <v-list-item-avatar to="/admin/profile">
          <img src="https://randomuser.me/api/portraits/men/81.jpg" alt="user icon" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ username }}</v-list-item-title>
          <v-list-item-subtitle>Admin 1</v-list-item-subtitle>
        </v-list-item-content>
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
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      drawer: true,
      routes: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', link: '/admin/dashboard' },
        { title: 'Blogs', icon: 'mdi-post', link: '/admin/blogs' },
        { title: 'Users', icon: 'mdi-account-multiple', link: '/admin/users' },
        { title: 'Activity', icon: 'mdi-chart-areaspline-variant', link: '/admin/activities' },
        { title: 'Profile', icon: 'mdi-account-circle', link: '/admin/profile' },
      ],
      username: '',
      token: '',
    };
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
      });
  },
};
</script>
