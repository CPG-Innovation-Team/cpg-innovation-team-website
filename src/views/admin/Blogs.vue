<template>
  <div class="layout">
    <AdminNav />
    <v-main>
      <v-data-table :headers="headers" :items="blogs" sort-by="modified" class="elevation-1" style="height: 100vh">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>All Blogs</v-toolbar-title>
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
            <router-link to="/admin/blogs/create">
              <v-btn color="primary" dark class="mb-2"> New Blog </v-btn>
            </router-link>
          </v-toolbar>
        </template>
        <template v-slot:[`item.title`]="{ item }">
          <a href="/admin/blogs/1">
            {{ item.title }}
          </a>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="ml-4" @click="deleteItem(item)"> mdi-delete </v-icon>
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
        text: 'Title',
        value: 'title',
      },
      { text: 'Author', value: 'author' },
      { text: 'Created', value: 'created' },
      { text: 'Last Modified', value: 'modified' },
      { text: 'Views', value: 'views' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    blogs: [
      {
        id: '1',
        title: 'Monkey King',
        author: 'AA',
        created: '04.02',
        modified: '06.12',
        views: 13,
      },
      {
        id: '2',
        title: 'Amazing news',
        author: 'AA',
        created: '04.03',
        modified: '06.25',
        views: 5,
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
