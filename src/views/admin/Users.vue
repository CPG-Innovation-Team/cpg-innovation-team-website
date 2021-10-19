<template>
  <div class="layout">
    <AdminNav />
    <v-main>
      <v-container>
        <v-card elevation="2">
          <v-card-text>
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
            <v-row>
              <v-col cols="12" sm="6" md="6">
                新增角色
                <v-text-field v-model="role" label="role"></v-text-field>
                <v-btn color="blue darken-1" text @click="saveRole(role)"> Save </v-btn>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                新增权限
                <v-text-field v-model="permission" label="permission name"></v-text-field>
                <v-text-field v-model="uri" label="uri"></v-text-field>
                <v-btn color="blue darken-1" text @click="savePermission(permission, uri)"> Save </v-btn>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="6" md="6">
                删除角色
                <v-select :items="roles" label="delete role" v-model="deleteRoleName" clearable></v-select>
                <v-btn color="blue darken-1" text @click="deleteRole(deleteRoleName)"> Delete </v-btn>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                删除权限
                <v-select
                  :items="permissions"
                  label="delete permission"
                  v-model="deletePermissionName"
                  clearable
                ></v-select>
                <v-btn color="blue darken-1" text @click="deletePermission(deletePermissionName)"> Delete </v-btn>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="6" md="6">
                角色添加权限
                <v-select :items="roles" label="add role" v-model="rname" clearable></v-select>
                <v-select :items="permissions" label="add permission" v-model="pname" clearable></v-select>
                <v-btn color="blue darken-1" text @click="savePermissionToRole(rname, pname)"> Save </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-container>

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
import axios from 'axios';
import AdminNav from '../../components/AdminNav.vue';

export default {
  components: {
    AdminNav,
  },
  data: () => ({
    dialog: false,
    successDialog: false,
    failureDialog: false,
    operationMessage: '',
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
    token: '',
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
        'http://localhost:8080/admin/user/query/list',
        {
          state: 1,
        },
        {
          headers: {
            token: this.token,
          },
        }
      )
      .then((response) => {
        for (let i = 0; i < response.data.data.length; i += 1) {
          this.users.push(response.data.data[i]);
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
          this.uid = response.data.data.UID;
        });

      if (this.selectedRole !== '' && this.selectedRole !== null) {
        await axios
          .post(
            'http://localhost:8080/admin/auth/role/add/user',
            {
              rName: this.selectedRole,
              uid: this.uid,
            },
            {
              headers: {
                token: this.token,
              },
            }
          )
          .then((response) => {
            console.log(response);
            if (response.data.message === 'OK') this.successDialog = true;
            else {
              this.failureDialog = true;
            }
          });
      }

      if (this.selectedRemoveRole !== '' && this.selectedRemoveRole !== null) {
        await axios
          .post(
            'http://localhost:8080/admin/auth/role/remove/user',
            {
              rName: this.selectedRemoveRole,
              uid: this.uid,
            },
            {
              headers: {
                token: this.token,
              },
            }
          )
          .then((response) => {
            console.log(response);
            if (response.data.message === 'OK') this.successDialog = true;
            else {
              this.failureDialog = true;
            }
          });
      }
    },
    async saveRole(role) {
      await axios
        .post(
          'http://localhost:8080/admin/auth/add/role',
          {
            rName: role,
          },
          {
            headers: {
              token: this.token,
            },
          }
        )
        .then((response) => {
          console.log(response);
          if (response.data.message === 'OK') this.successDialog = true;
          else {
            this.failureDialog = true;
          }
        });
      this.getAllRoles();
    },
    async savePermission(permission, uri) {
      await axios
        .post(
          'http://localhost:8080/admin/auth/add/permission',
          {
            pName: permission,
            uri,
          },
          {
            headers: {
              token: this.token,
            },
          }
        )
        .then((response) => {
          console.log(response);
          if (response.data.data === '接口权限添加成功！') this.successDialog = true;
          else {
            this.failureDialog = true;
          }
        });
      this.getAllPermissions();
    },
    savePermissionToRole(rname, pname) {
      axios
        .post(
          'http://localhost:8080/admin/auth/role/add/permission',
          {
            rname,
            pname,
          },
          {
            headers: {
              token: this.token,
            },
          }
        )
        .then((response) => {
          console.log(response);
          if (response.data.data === '添加成功') this.successDialog = true;
          else {
            this.failureDialog = true;
          }
        });
    },
    async deleteRole(deleteRoleName) {
      await axios
        .post(
          'http://localhost:8080/admin/auth/delete/role',
          {
            rName: deleteRoleName,
          },
          {
            headers: {
              token: this.token,
            },
          }
        )
        .then((response) => {
          console.log(response);
          if (response.data.message === 'OK') this.successDialog = true;
          else {
            this.failureDialog = true;
          }
        });
      this.getAllRoles();
    },
    async deletePermission(deletePermissionName) {
      await axios
        .post(
          'http://localhost:8080/admin/auth/delete/permission',
          {
            pName: deletePermissionName,
          },
          {
            headers: {
              token: this.token,
            },
          }
        )
        .then((response) => {
          console.log(response);
          if (response.data.message === 'OK') this.successDialog = true;
          else {
            this.failureDialog = true;
          }
        });
      this.getAllPermissions();
    },
    async getAllRoles() {
      await axios
        .post(
          'http://localhost:8080/admin/auth/query/roles',
          {},
          {
            headers: {
              token: this.token,
            },
          }
        )
        .then((response) => {
          this.roles = [];
          for (let i = 0; i < Object.keys(response.data.data).length; i += 1) {
            this.roles.push(Object.keys(response.data.data)[i]);
          }
        });
    },
    async getAllPermissions() {
      await axios
        .post(
          'http://localhost:8080/admin/auth/query/permissions',
          {},
          {
            headers: {
              token: this.token,
            },
          }
        )
        .then((response) => {
          this.permissions = [];
          for (let i = 0; i < Object.keys(response.data.data).length; i += 1) {
            this.permissions.push(Object.keys(response.data.data)[i]);
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
}
</style>
