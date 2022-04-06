<template>
  <div class="layout">
    <AdminNav />
    <v-main>
      <v-container>
        <v-data-table :headers="headers" :items="roleItems" class="mt-8">
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>角色权限表</v-toolbar-title>
            </v-toolbar>
          </template>
          <template v-slot:[`item.name`]="{ item }">
            <div class="text-truncate">
              {{ item.name }}
            </div>
          </template>
          <template v-for="permission in permissions" v-slot:[`item.${permission}`]="{ item }">
            <v-simple-checkbox disabled v-model="item[permission]" :key="permission" />
          </template>
        </v-data-table>

        <v-col class="mt-8">
          <div>新增角色</div>
          <v-row align="baseline" class="mt-2">
            <v-col cols="4">
              <v-text-field v-model="role" label="输入角色名称" outlined></v-text-field>
            </v-col>
            <v-col cols="2"> <v-btn color="blue darken-1" text @click="addRole(role)"> Save </v-btn></v-col>
          </v-row>
          <div>角色添加权限</div>
          <v-row align="baseline" class="mt-2">
            <v-col cols="4">
              <v-select :items="roles" label="选择角色" v-model="rname" clearable outlined></v-select>
            </v-col>
            <v-col cols="4"
              ><v-select :items="permissions" label="选择权限" v-model="pname" clearable outlined></v-select
            ></v-col>
            <v-col cols="1">
              <v-btn color="blue darken-1" text @click="addPermissionToRole(rname, pname)"> Save </v-btn></v-col
            >
          </v-row>
          <div>删除角色</div>
          <v-row align="baseline" class="mt-2">
            <v-col cols="4">
              <v-select :items="roles" label="选择角色" v-model="deleteRoleName" clearable outlined></v-select>
            </v-col>
            <v-col cols="2">
              <v-btn color="blue darken-1" text @click="deleteRole(deleteRoleName)"> Delete </v-btn></v-col
            >
          </v-row>
        </v-col>

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
    uris: [],
    role: '',
    rname: '',
    pname: '',
    selectedRole: '',
    selectedRemoveRole: '',
    deleteRoleName: '',
    allRoles: [],
    allPermissions: [],
    headers: [
      {
        text: '角色\\权限',
        align: 'start',
        sortable: true,
        value: 'name',
      },
    ],
    roleItems: [],
  }),
  async created() {
    await this.getAllRoles();
    await this.getAllPermissions();
    this.initializeHeaders();
    this.initializeRoleItems();
  },
  methods: {
    close() {
      // control the dialogs
      this.dialog = false;
      this.successDialog = false;
      this.failureDialog = false;
    },
    initializeHeaders() {
      // initialize data table headers for all permissions
      this.permissions.forEach((permission) => {
        this.headers.push({ text: permission, value: permission });
      });
    },
    initializeRoleItems() {
      // initialize data table items for each role
      this.roles.forEach((role, roleIndex) => {
        this.roleItems.push({ name: role });
        this.permissions.forEach((permission) => {
          this.roleItems[roleIndex][permission] = this.checkPermissionForRole(role, permission);
        });
      });
    },
    checkPermissionForRole(role, permission) {
      // check if a given role has the permission, if yes, return true
      let bool = false;
      this.allRoles[role].forEach((uri) => {
        if (this.getPermissionName(uri) === permission) {
          bool = true;
        }
      });
      return bool;
    },
    async addRole(role) {
      // calling api to add a new role
      await util
        .post(
          `${util.getEnvUrl()}/admin/auth/add/role`,
          {
            rName: role,
          },
          this.$router
        )
        .then((response) => {
          this.setDialogStatus(response);
        });
      this.role = '';
      await this.getAllRoles();
      this.roleItems = [];
      this.initializeRoleItems();
    },
    async addPermissionToRole(rname, pname) {
      const pArr = [pname];
      // calling api to add a new permission to a given role
      await util
        .post(
          `${util.getEnvUrl()}/admin/auth/role/add/permission`,
          {
            rname,
            pname: pArr,
          },
          this.$router
        )
        .then((response) => {
          this.setDialogStatus(response);
        });
      this.rname = '';
      this.pname = '';
      await this.getAllRoles();
      this.roleItems = [];
      this.initializeRoleItems();
    },
    async deleteRole(deleteRoleName) {
      const rArr = [deleteRoleName];
      // calling api to delete a given role
      await util
        .post(
          `${util.getEnvUrl()}/admin/auth/delete/role`,
          {
            rName: rArr,
          },
          this.$router
        )
        .then((response) => {
          this.setDialogStatus(response);
        });
      this.deleteRoleName = '';
      await this.getAllRoles();
      this.roleItems = [];
      this.initializeRoleItems();
    },
    async getAllRoles() {
      // get all roles
      await util.post(`${util.getEnvUrl()}/admin/auth/query/roles`, {}, this.$router).then((response) => {
        if (response.data.code === 10000) {
          // save role names with their corresponding permission uris in allRoles
          this.allRoles = response.data.data;
          this.roles = [];
          // save only role name in roles
          Object.keys(response.data.data).forEach((role) => {
            this.roles.push(role);
          });
        }
      });
    },
    async getAllPermissions() {
      // get all permissions
      await util.post(`${util.getEnvUrl()}/admin/auth/query/permissions`, {}, this.$router).then((response) => {
        if (response.data.code === 10000) {
          // save permission names with their corresponding uris in allPermissions
          this.allPermissions = response.data.data;
          this.permissions = [];
          // save only permission name in permissions
          Object.keys(response.data.data).forEach((permission) => {
            this.permissions.push(permission);
          });
          // save only permission urls in uris.
          this.uris = Object.values(this.allPermissions);
        }
      });
    },
    setDialogStatus(response) {
      if (response.data.code === 10000) this.successDialog = true;
      else {
        this.failureDialog = true;
      }
    },
    getPermissionName(uri) {
      // get the permission name from given uri
      return Object.keys(this.allPermissions).find((key) => this.allPermissions[key] === uri);
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
