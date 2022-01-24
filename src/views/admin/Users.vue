<template>
  <div class="layout">
    <AdminNav />
    <v-main>
      <v-data-table :headers="headers" :items="users" sort-by="level" class="elevation-1" style="height: 100vh">
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
            <v-dialog v-model="successDialog" max-width="500px">
              <v-card>
                <v-card-title> Success! </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close"> Close </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="failureDialog" max-width="500px">
              <v-card>
                <v-card-title> Something went wrong... </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close"> Close </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="text-h5">User information</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-select :items="roles" label="add role" v-model="selectedRole" clearable></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-select :items="roles" label="remove role" v-model="selectedRemoveRole" clearable></v-select>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
                  <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.action`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        </template>
      </v-data-table>
    </v-main>
  </div>
</template>

<script>
import util from '../../util';
import AdminNav from '../../components/AdminNav.vue';

export default {
  components: {
    AdminNav,
  },
  data: () => ({
    dialog: false,
    successDialog: false,
    failureDialog: false,
    search: '',
    headers: [
      {
        text: 'Name',
        value: 'username',
      },
      { text: 'Email', value: 'email' },
      { text: 'Root', value: 'isRoot' },
      { text: 'Role', value: 'isRoot' },
      { text: 'Permisson', value: 'isRoot' },
      { text: '', value: 'action' },
    ],
    users: [],
    editedIndex: -1,
    editedItem: {
      UserName: '',
      Email: '',
      IsRoot: '',
    },
    username: '',
    uid: '',
    roles: [],
    permissions: [],
    permission: '',
    uri: '',
    role: '',
    rname: '',
    pname: '',
    selectedRole: '',
    selectedRemoveRole: '',
    deleteRoleName: '',
    deletePermissionName: '',
  }),
  async created() {
    util
      .post('http://localhost:8080/admin/user/query/list', {
        state: 1,
      })
      .then((response) => {
        if (util.checkValidToken(response) === false) {
          this.$router.push('/login');
        }
        if (response.data.data) {
          response.data.data.forEach((user) => this.users.push(user));
        }
      });
    this.getAllRoles();
    this.getAllPermissions();
  },
  methods: {
    editItem(item) {
      this.dialog = true;
      this.editedItem = item;
      this.username = item.username;
    },
    close() {
      this.dialog = false;
      this.successDialog = false;
      this.failureDialog = false;
    },
    async save() {
      this.close();
      await util
        .post('http://localhost:8080/admin/user/query/info', {
          username: this.username,
        })
        .then((response) => {
          this.uid = response.data.data.UID;
        });
      if (this.selectedRole !== '' && this.selectedRole !== null) {
        await util
          .post('http://localhost:8080/admin/auth/role/add/user', {
            rName: this.selectedRole,
            uid: this.uid,
          })
          .then((response) => {
            this.setDialogStatus(response);
          });
      }
      if (this.selectedRemoveRole !== '' && this.selectedRemoveRole !== null) {
        await util
          .post('http://localhost:8080/admin/auth/role/remove/user', {
            rName: this.selectedRemoveRole,
            uid: this.uid,
          })
          .then((response) => {
            this.setDialogStatus(response);
          });
      }
    },
    async getAllRoles() {
      await util.post('http://localhost:8080/admin/auth/query/roles', {}).then((response) => {
        this.roles = [];
        Object.keys(response.data.data).forEach((role) => {
          this.roles.push(role);
        });
      });
    },
    async getAllPermissions() {
      await util.post('http://localhost:8080/admin/auth/query/permissions', {}).then((response) => {
        this.permissions = [];
        Object.keys(response.data.data).forEach((permission) => {
          this.permissions.push(permission);
        });
      });
    },
    setDialogStatus(response) {
      if (response.data.message === 'OK') this.successDialog = true;
      else {
        this.failureDialog = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
}
</style>
