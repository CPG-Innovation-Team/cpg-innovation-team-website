<template>
  <div class="layout">
    <AdminNav />
    <v-main>
      <v-data-table :headers="headers" :items="blogs" class="elevation-1" style="height: 100vh">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Users</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-text-field
              v-model="search"
              placeholder="Search"
              append-icon="mdi-magnify"
              required
              dense
              hide-details
              outlined
            ></v-text-field>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
      </v-data-table>
    </v-main>
  </div>
</template>

<script>
import AdminNav from '../../components/AdminNav.vue';

export default {
  components: {
    AdminNav,
  },
  data: () => ({
    dialog: false,
    search: '',
    headers: [
      {
        text: 'Name',
        value: 'name',
      },
      { text: 'Email', value: 'email' },
      { text: 'Level', value: 'level' },
    ],
    blogs: [
      {
        id: '1',
        name: 'Mike. D',
        email: 'asd@z.cn',
        level: '1',
      },
      {
        id: '2',
        name: 'Canp',
        email: 'dbr@z.cn',
        level: '2',
      },
      {
        id: '3',
        name: 'Bob',
        email: 'wdq@z.cn',
        level: '2',
      },
      {
        id: '4',
        name: 'Goe',
        email: 'cge@z.cn',
        level: '2',
      },
    ],
    editedIndex: -1,
    editedItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
  }),
};
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
}
</style>
