<template>
  <div class="layout">
    <AdminNav />
    <v-main style="background: whitesmoke">
      <v-container fluid>
        <v-row>
          <v-col>
            <v-card>
              <v-card-title>Traffic</v-card-title>
              <Traffic />
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-card>
              <v-card-title>Recent</v-card-title>
              <v-simple-table dense>
                <template>
                  <thead>
                    <tr>
                      <th scope="row">User</th>
                      <th scope="row">Action</th>
                      <th scope="row">Title</th>
                      <th scope="row">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in desserts" :key="item.name">
                      <td>{{ item.user }}</td>
                      <td>{{ item.action }}</td>
                      <td>{{ item.title }}</td>
                      <td>{{ item.time }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-card>
              <v-card-title>Hello</v-card-title>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-card>
              <v-card-title>World</v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import AdminNav from '../../components/AdminNav.vue';
import Traffic from '../../components/Charts/Traffic.vue';
import util from '../../util';

export default {
  data() {
    return {
      desserts: [
        {
          user: 'Bob',
          action: 'delete',
          title: 'Monkey King',
          time: '5 hours ago',
        },
        {
          user: 'Bob',
          action: 'edit',
          title: 'Monkey King',
          time: '2 days ago',
        },
        {
          user: 'Bob',
          action: 'create',
          title: 'Monkey King',
          time: '5 days ago',
        },
      ],
    };
  },
  components: {
    AdminNav,
    Traffic,
  },
  created() {
    util.checkAccess('dashboard', this.$router);
  },
};
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
}
</style>
