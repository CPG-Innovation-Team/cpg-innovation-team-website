<template>
  <div class="layout">
    <AdminNav />
    <v-main>
      <v-container>
        <v-data-table
          v-model="selected"
          item-key="name"
          :headers="headers"
          :items="roleItems"
          show-select
          @toggle-select-all="selectAllToggle"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>角色权限表</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="newDialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" depressed class="mb-2" v-bind="attrs" v-on="on"> 新增角色 </v-btn>
                </template>
                <v-card class="pa-4">
                  <v-card-title>
                    <span class="text-h5"> 新增角色 </span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row align="baseline" class="mt-2">
                        <v-text-field v-model="role" label="输入角色名称" outlined></v-text-field>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="
                        addRole(role);
                        newDialog = false;
                      "
                    >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:[`item.data-table-select`]="{ item, isSelected, select }">
            <v-simple-checkbox
              :value="isSelected"
              :disabled="disableCheckbox(item)"
              @input="select($event)"
              :ripple="false"
            ></v-simple-checkbox>
          </template>
          <template class="table-col" v-slot:[`item.name`]="{ item }">
            <div class="text-truncate">
              {{ item.name }}
            </div>
          </template>
          <template v-slot:[`item.action`]="{ item }">
            <v-icon
              small
              class="ml-4"
              @click="
                editDialog = true;
                originalRoleItem = item;
                setEditRoleItem(item);
              "
            >
              mdi-pencil
            </v-icon>
          </template>
          <template v-for="permission in permissions" v-slot:[`item.${permission}`]="{ item }">
            <v-simple-checkbox class="checkbox-color" disabled v-model="item[permission]" :key="permission" />
          </template>
          <template v-slot:[`body.append`]>
            <v-btn class="ml-3" :disabled="checkDisabled()" icon @click="deleteDialog = true">
              <v-icon md> mdi-delete </v-icon>
            </v-btn>
          </template>
        </v-data-table>

        <v-dialog v-model="editDialog" max-width="800px">
          <v-card class="pa-4">
            <v-card-title> 角色编辑权限 </v-card-title>
            <v-card-text> 角色: {{ editRoleItem.name }} </v-card-text>
            <v-card-text>
              <v-row dense>
                <v-col cols="3" v-for="permission in permissions" :key="permission">
                  <v-checkbox
                    v-model="editRoleItem[permission]"
                    :label="permission"
                    color="blue"
                    hide-details
                  ></v-checkbox>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn depressed color="primary" @click="editPermissionToRole()"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="deleteDialog" max-width="500px">
          <v-card>
            <v-card-title> Are you sure to delete the following role(s)? </v-card-title>
            <v-card-text v-for="(item, index) in selected" :key="index"> {{ index + 1 }}. {{ item.name }} </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="
                  deleteRoles();
                  deleteDialog = false;
                "
              >
                Confirm
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="warningDialog" max-width="500px">
          <v-card>
            <v-card-title> 添加失败，角色已经存在 </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Close </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
    // dialogs
    successDialog: false,
    failureDialog: false,
    deleteDialog: false,
    editDialog: false,
    newDialog: false,
    warningDialog: false,
    roles: [],
    permissions: [],
    uris: [],
    role: '',
    allRoles: [],
    allPermissions: [],
    headers: [
      {
        text: '角色\\权限',
        align: 'start',
        sortable: true,
        value: 'name',
      },
      { text: '编辑权限', value: 'action', sortable: false, align: 'end' },
    ],
    roleItems: [],
    selected: [],
    originalRoleItem: {},
    editRoleItem: {},
  }),
  async created() {
    util.checkAccess('permission', this.$router);
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
      this.newDialog = false;
      this.editDialog = false;
      this.deleteDialog = false;
      this.warningDialog = false;
    },
    disableCheckbox(item) {
      // disable the delete-checkbox for 普通用户
      return item.name === '普通用户';
    },
    checkDisabled() {
      // disable the delete button if no role is selected
      return this.selected.length === 0;
    },
    selectAllToggle() {
      const disabledCount = 1;
      // filter the selected when select-all is toggled
      if (this.selected.length !== this.roleItems.length - disabledCount) {
        this.selected = this.roleItems.filter((item) => {
          return item.name !== '普通用户';
        });
      } else {
        this.selected = [];
      }
    },
    setEditRoleItem(item) {
      // make a copy of the role that is being edited
      this.editRoleItem = { ...item };
    },
    initializeHeaders() {
      // initialize data table headers for all permissions
      this.permissions.forEach((permission) => {
        this.headers.push({ text: permission, value: permission, width: '80px', align: 'center' });
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
    async deleteRoles() {
      const rArr = [];
      this.selected.forEach((role) => {
        rArr.push(role.name);
      });
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
      // clear selected after operation
      this.selected = [];
      await this.getAllRoles();
      this.roleItems = [];
      this.initializeRoleItems();
    },
    async addRole(role) {
      let isExisted = false;
      this.roles.forEach((r) => {
        if (r === role) {
          this.warningDialog = true;
          isExisted = true;
        }
      });
      if (isExisted === false) {
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
        await this.getAllRoles();
        this.roleItems = [];
        this.initializeRoleItems();
      }
      this.role = '';
    },
    async editPermissionToRole() {
      const addition = [];
      const deletion = [];

      Object.keys(this.originalRoleItem).forEach((permission) => {
        if (this.originalRoleItem[permission] !== this.editRoleItem[permission]) {
          if (this.editRoleItem[permission] === false) {
            deletion.push(permission);
          } else {
            addition.push(permission);
          }
        }
      });
      // calling api to add new permissions to a given role
      if (addition.length !== 0) {
        await util
          .post(
            `${util.getEnvUrl()}/admin/auth/role/add/permission`,
            {
              rname: this.originalRoleItem.name,
              pname: addition,
            },
            this.$router
          )
          .then((response) => {
            this.setDialogStatus(response);
          });
      }
      // calling api to delete selected permission of a given role
      if (deletion.length !== 0) {
        await util
          .post(
            `${util.getEnvUrl()}/admin/auth/role/remove/permission`,
            {
              rname: this.originalRoleItem.name,
              pname: deletion,
            },
            this.$router
          )
          .then((response) => {
            this.setDialogStatus(response);
          });
      }
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

.action-link {
  text-decoration: none;
}
</style>
