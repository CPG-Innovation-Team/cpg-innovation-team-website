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
              <v-col cols="12">
                新增角色
                <v-text-field v-model="role" label="role"></v-text-field>
                <v-btn color="blue darken-1" text @click="saveRole(role)"> Save </v-btn>
              </v-col>
              <v-col cols="12">
                新增权限
                <v-text-field v-model="permission" label="permission name"></v-text-field>
                <v-select :items="uris" v-model="uri" label="uri" clearable></v-select>
                <v-btn color="blue darken-1" text @click="savePermission(permission, uri)"> Save </v-btn>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                删除角色
                <v-select :items="roles" label="delete role" v-model="deleteRoleName" clearable></v-select>
                <v-btn color="blue darken-1" text @click="deleteRole(deleteRoleName)"> Delete </v-btn>
              </v-col>
              <v-col cols="12">
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
              <v-col cols="12">
                角色添加权限
                <v-select :items="roles" label="add role" v-model="rname" clearable></v-select>
                <v-select :items="permissions" label="add permission" v-model="pname" clearable></v-select>
                <v-btn color="blue darken-1" text @click="savePermissionToRole(rname, pname)"> Save </v-btn>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-card-title>所有角色</v-card-title>
                <div v-for="(roles, i) in allRoles" :key="roles.id">
                  <v-card-subtitle> * 角色名称： {{ i }}</v-card-subtitle>
                  <div v-for="role in roles" :key="role.id">{{ role }}</div>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-card-title>所有权限</v-card-title>
                <div v-for="(permission, i) in allPermissions" :key="permission.id">{{ i }} ：{{ permission }}</div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-container>
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
    uid: '',
    roles: [],
    permissions: [],
    permission: '',
    uri: '',
    uris: [],
    role: '',
    rname: '',
    pname: '',
    selectedRole: '',
    selectedRemoveRole: '',
    deleteRoleName: '',
    deletePermissionName: '',
    allRoles: '',
    allPermissions: '',
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
      });
    this.uris = ['/admin/article/add', '/admin/article/delete', '/admin/article/info', '/admin/article/list'];
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
    async saveRole(role) {
      await util
        .post('http://localhost:8080/admin/auth/add/role', {
          rName: role,
        })
        .then((response) => {
          this.setDialogStatus(response);
        });

      this.getAllRoles();
    },
    async savePermission(permission, uri) {
      await util
        .post('http://localhost:8080/admin/auth/add/permission', {
          pName: permission,
          uri,
        })
        .then((response) => {
          if (response.data.data === '接口权限添加成功！') this.successDialog = true;
          else {
            this.failureDialog = true;
          }
        });

      this.getAllPermissions();
    },
    savePermissionToRole(rname, pname) {
      util
        .post('http://localhost:8080/admin/auth/role/add/permission', {
          rname,
          pname,
        })
        .then((response) => {
          if (response.data.data === '添加成功') this.successDialog = true;
          else {
            this.failureDialog = true;
          }
        });
    },
    async deleteRole(deleteRoleName) {
      await util
        .post('http://localhost:8080/admin/auth/delete/role', {
          rName: deleteRoleName,
        })
        .then((response) => {
          this.setDialogStatus(response);
        });
      this.getAllRoles();
    },
    async deletePermission(deletePermissionName) {
      await util
        .post('http://localhost:8080/admin/auth/delete/permission', {
          pName: deletePermissionName,
        })
        .then((response) => {
          this.setDialogStatus(response);
        });
      this.getAllPermissions();
    },
    async getAllRoles() {
      await util.post('http://localhost:8080/admin/auth/query/roles', {}).then((response) => {
        this.allRoles = response.data.data;
        console.log(this.allRoles);
        this.roles = [];
        Object.keys(response.data.data).forEach((role) => {
          this.roles.push(role);
        });
      });
    },
    async getAllPermissions() {
      await util.post('http://localhost:8080/admin/auth/query/permissions', {}).then((response) => {
        this.allPermissions = response.data.data;
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
