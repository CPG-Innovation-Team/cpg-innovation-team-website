<template>
  <div class="layout">
    <AdminNav />
    <v-main>
      <v-data-table :headers="headers" :items="blogs" sort-by="modified" class="elevation-1" style="height: 100vh">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Users</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
          </v-toolbar>
        </template>
        <template v-slot:[`item.title`]="{ item }">
          <a :href="`/admin/blogs/${item.id}`">
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

  // computed: {
  //   formTitle() {
  //     return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
  //   },
  // },

  // watch: {
  //   dialog(val) {
  //     val || this.close();
  //   },
  // },

  // methods: {
  //   editItem(item) {
  //     this.editedIndex = this.desserts.indexOf(item);
  //     this.editedItem = Object.assign({}, item);
  //     this.dialog = true;
  //   },

  //   deleteItem(item) {
  //     const index = this.desserts.indexOf(item);
  //     confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1);
  //   },

  //   close() {
  //     this.dialog = false;
  //     this.$nextTick(() => {
  //       this.editedItem = Object.assign({}, this.defaultItem);
  //       this.editedIndex = -1;
  //     });
  //   },

  //   save() {
  //     if (this.editedIndex > -1) {
  //       Object.assign(this.desserts[this.editedIndex], this.editedItem);
  //     } else {
  //       this.desserts.push(this.editedItem);
  //     }
  //     this.close();
  //   },
  // },
};
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
}
</style>
