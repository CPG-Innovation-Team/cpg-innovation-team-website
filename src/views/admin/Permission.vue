<template>
  <div class="layout">
    <AdminNav />
    <v-main>
      <v-container>
        <v-card elevation="2">
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <v-card-title>所有角色及对应权限</v-card-title>
                <div v-for="(permissions, role) in allRoles" :key="role.id">
                  <v-card-subtitle> * 角色名称： {{ role }}</v-card-subtitle>
                  <div class="display-content" v-for="permission in permissions" :key="permission.id">
                    {{ getPermissionName(permission) }}
                  </div>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <v-card-title>所有权限</v-card-title>
                <div class="display-content" v-for="(permission, i) in permissions" :key="i">
                  {{ i + 1 }}. {{ permission }}
                </div>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="6">
                新增角色
                <v-text-field v-model="role" label="role"></v-text-field>
                <v-btn color="blue darken-1" text @click="saveRole(role)"> Save </v-btn>
                删除权限
                <v-select
                  :items="permissions"
                  label="delete permission"
                  v-model="deletePermissionName"
                  clearable
                ></v-select>
                <v-btn color="blue darken-1" text @click="deletePermission(deletePermissionName)"> Delete </v-btn>
              </v-col>
              <v-col cols="12" md="6">
                删除角色
                <v-select :items="roles" label="delete role" v-model="deleteRoleName" clearable></v-select>
                <v-btn color="blue darken-1" text @click="deleteRole(deleteRoleName)"> Delete </v-btn>
                角色添加权限
                <v-select :items="roles" label="select role" v-model="rname" clearable></v-select>
                <v-select :items="permissions" label="select permission" v-model="pname" clearable></v-select>
                <v-btn color="blue darken-1" text @click="savePermissionToRole(rname, pname)"> Save </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

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
    this.getAllRoles();
    this.getAllPermissions();
  },
  methods: {
    close() {
      this.dialog = false;
      this.successDialog = false;
      this.failureDialog = false;
    },
    async saveRole(role) {
      await util
        .post(`${util.getEnvUrl()}/admin/auth/add/role`, {
          rName: role,
        })
        .then((response) => {
          this.setDialogStatus(response);
        });

      this.getAllRoles();
    },
    async savePermission(permission, uri) {
      await util
        .post(`${util.getEnvUrl()}/admin/auth/add/permission`, {
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
        .post(`${util.getEnvUrl()}/admin/auth/role/add/permission`, {
          rname,
          pname,
        })
        .then((response) => {
          if (response.data.data === '添加成功') this.successDialog = true;
          else {
            this.failureDialog = true;
          }
        });
      this.getAllRoles();
    },
    async deleteRole(deleteRoleName) {
      await util
        .post(`${util.getEnvUrl()}/admin/auth/delete/role`, {
          rName: deleteRoleName,
        })
        .then((response) => {
          this.setDialogStatus(response);
        });
      this.getAllRoles();
    },
    async deletePermission(deletePermissionName) {
      await util
        .post(`${util.getEnvUrl()}/admin/auth/delete/permission`, {
          pName: deletePermissionName,
        })
        .then((response) => {
          this.setDialogStatus(response);
        });
      this.getAllPermissions();
    },
    async getAllRoles() {
      await util.post(`${util.getEnvUrl()}/admin/auth/query/roles`, {}).then((response) => {
        this.allRoles = response.data.data;
        this.roles = [];
        Object.keys(response.data.data).forEach((role) => {
          this.roles.push(role);
        });
      });
    },
    async getAllPermissions() {
      await util.post(`${util.getEnvUrl()}/admin/auth/query/permissions`, {}).then((response) => {
        this.allPermissions = response.data.data;
        this.permissions = [];
        Object.keys(response.data.data).forEach((permission) => {
          this.permissions.push(permission);
        });
        this.uris = Object.values(this.allPermissions);
      });
    },
    setDialogStatus(response) {
      if (response.data.message === 'OK') this.successDialog = true;
      else {
        this.failureDialog = true;
      }
    },
    getPermissionName(permission) {
      return Object.keys(this.allPermissions).find((key) => this.allPermissions[key] === permission);
    },
  },
};
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
}

.display-content {
  margin-left: 5%;
}
</style>
