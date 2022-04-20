<template>
  <div class="layout">
    <AdminNav />
    <v-main>
      <v-container>
        <v-data-table :headers="headers" :items="userItems" sort-by="level" style="height: 100vh">
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>{{ localeMsg.title }}</v-toolbar-title>
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
          <template v-slot:[`item.action`]="{ item }">
            <v-icon small class="mr-2" @click="editUserItem(item)"> mdi-pencil </v-icon>
          </template>
          <template v-for="role in roles" v-slot:[`item.${role}`]="{ item }">
            <v-simple-checkbox class="checkbox-color" disabled v-model="item[role]" :key="role" />
          </template>
        </v-data-table>

        <v-dialog v-model="editDialog" max-width="800px">
          <v-card class="pa-4">
            <v-card-title> {{ localeMsg.editRole }} </v-card-title>
            <v-card-text> {{ localeMsg.user }}: {{ editedUser.username }}</v-card-text>
            <v-card-text>
              <v-row dense>
                <v-col cols="3" v-for="role in roles" :key="role">
                  <v-checkbox v-model="editedUser[role]" :label="role" color="blue" hide-details></v-checkbox>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> {{ localeMsg.cancelBtn }} </v-btn>
              <v-btn depressed color="primary" @click="editRoleToUser()"> {{ localeMsg.saveBtn }} </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="successDialog" max-width="500px">
          <v-card>
            <v-card-title> {{ localeMsg.successMsg }} </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> {{ localeMsg.confirmBtn }} </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="failureDialog" max-width="500px">
          <v-card>
            <v-card-title> {{ localeMsg.failureMsg }} </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> {{ localeMsg.confirmBtn }} </v-btn>
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
  data() {
    return {
      editDialog: false,
      successDialog: false,
      failureDialog: false,
      search: '',
      headers: [
        {
          text: 'ID',
          sortable: true,
          value: 'id',
        },
        {
          text: this.$t('admin.users.userAndRole'),
          align: 'start',
          sortable: true,
          value: 'username',
        },
        { text: this.$t('admin.users.action'), value: 'action', sortable: false, align: 'end' },
      ],
      users: [],
      roles: [],
      userRoleNames: [],
      userItems: [],
      editedUser: {},
      originalUser: {},
    };
  },
  computed: {
    localeMsg() {
      return {
        title: this.$t('admin.users.title'),
        search: this.$t('admin.users.search'),
        editRole: this.$t('admin.users.dialog.editRole'),
        user: this.$t('admin.users.dialog.user'),
        cancelBtn: this.$t('admin.users.dialog.cancelBtn'),
        saveBtn: this.$t('admin.users.dialog.saveBtn'),
        confirmBtn: this.$t('admin.users.dialog.confirmBtn'),
        successMsg: this.$t('admin.users.dialog.successMsg'),
        failureMsg: this.$t('admin.users.dialog.failureMsg'),
      };
    },
  },
  async created() {
    util.checkAccess('users', this.$router);
    await this.getUserList();
    await this.getUserRoles();
    await this.getAllRoles();
    this.initializeHeaders();
    this.initializeUsers();
  },
  methods: {
    editUserItem(item) {
      this.editDialog = true;
      this.originalUser = item;
      this.editedUser = { ...item };
    },
    close() {
      this.editDialog = false;
      this.successDialog = false;
      this.failureDialog = false;
    },
    async getUserList() {
      // get the list of all users
      await util
        .post(
          `${util.getEnvUrl()}/admin/user/query/list`,
          {
            state: 1,
          },
          this.$router
        )
        .then((response) => {
          if (response.data.code === 10000) {
            response.data.data.forEach((user) => this.users.push(user));
          }
        });
    },
    async getAllRoles() {
      await util.post(`${util.getEnvUrl()}/admin/auth/query/roles`, {}, this.$router).then((response) => {
        if (response.data.data) {
          this.roles = [];
          Object.keys(response.data.data).forEach((role) => {
            this.roles.push(role);
          });
        }
      });
    },
    async getUserRoles() {
      // get the role names of each user
      const ids = this.users.map((user) => user.uid);
      await util
        .post(
          `${util.getEnvUrl()}/admin/auth/query/user/roles`,
          {
            uid: ids,
          },
          this.$router
        )
        .then((response) => {
          if (response.data.code === 10000) {
            this.userRoleNames = response.data.data;
          }
        });
    },
    initializeHeaders() {
      // initialize header with role names
      this.roles.forEach((role) => {
        this.headers.push({ text: role, value: role, align: 'center' });
      });
    },
    initializeUsers() {
      // initialize user items with id, username, and corresponding role booleans
      this.userRoleNames.forEach((user, userIndex) => {
        this.userItems.push({ id: user.userId, username: user.userName });
        this.roles.forEach((role) => {
          this.userItems[userIndex][role] = user.roleNames === null ? false : user.roleNames.includes(role);
        });
      });
    },
    async editRoleToUser() {
      const addition = [];
      const deletion = [];

      Object.keys(this.originalUser).forEach((role) => {
        if (this.originalUser[role] !== this.editedUser[role]) {
          if (this.editedUser[role] === false) {
            deletion.push(role);
          } else {
            addition.push(role);
          }
        }
      });

      if (addition.length !== 0) {
        await util
          .post(
            `${util.getEnvUrl()}/admin/auth/user/add/roles`,
            {
              uid: this.originalUser.id,
              rName: addition,
            },
            this.$router
          )
          .then((response) => {
            this.setDialogStatus(response);
          });
      }
      if (deletion.length !== 0) {
        await util
          .post(
            `${util.getEnvUrl()}/admin/auth/user/delete/roles`,
            {
              uid: this.originalUser.id,
              rName: deletion,
            },
            this.$router
          )
          .then((response) => {
            this.setDialogStatus(response);
          });
      }
      await this.getUserRoles();
      this.userItems = [];
      this.initializeUsers();
    },
    setDialogStatus(response) {
      if (response.data.code === 10000) this.successDialog = true;
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
