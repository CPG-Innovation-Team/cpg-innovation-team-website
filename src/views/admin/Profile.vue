<template>
  <div class="layout">
    <AdminNav />
    <v-main style="background: whitesmoke">
      <v-container>
        <div class="user-info-container">
          <v-avatar class="avatar" size="64">
            <img v-if="userAvatar" :src="userAvatar" alt="user icon" />
            <img v-else src="../../assets/icon-default-avatar.jpg" alt="user icon" />
          </v-avatar>
          <div>
            <div class="user-info-name">{{ displayUsername }}</div>
            <div class="level d-flex">{{ showRole() }}</div>
          </div>
        </div>

        <v-card class="mt-8 pa-2" elevation="0">
          <v-card-title> {{ localeMsg.title }} </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" align="center">
                <v-hover v-slot="{ hover }">
                  <v-avatar class="user-info-avatar" size="80">
                    <img v-if="userAvatar" :src="userAvatar" alt="user icon" />
                    <img v-else src="../../assets/icon-default-avatar.jpg" alt="user icon" />
                    <v-fade-transition>
                      <v-overlay v-if="hover" absolute color="black"
                        ><v-btn icon large @click="updateAvatarDialog = true"> <v-icon>mdi-camera </v-icon></v-btn>
                      </v-overlay>
                    </v-fade-transition>
                  </v-avatar>
                </v-hover>
                <v-dialog max-width="600" v-model="updateAvatarDialog">
                  <v-card>
                    <v-card-title>{{ localeMsg.editAvatar }}</v-card-title>
                    <v-card-text>
                      <v-row align="center">
                        <v-col>
                          <cropper
                            class="cropper"
                            ref="cropper"
                            :src="previewAvatar"
                            :debounce="false"
                            stencil-component="circle-stencil"
                            backgroundClass="white"
                            @change="avatarOnChange"
                        /></v-col>
                        <v-col align="center">
                          <v-card-text>{{ localeMsg.previewAvatar }}</v-card-text>
                          <preview
                            class="cropper-preview"
                            :width="120"
                            :height="120"
                            :image="croppedImg.image"
                            :coordinates="croppedImg.coordinates"
                          />
                          <v-card-text> 120x120px</v-card-text>
                        </v-col>
                      </v-row>
                      <input
                        ref="uploadAvatar"
                        type="file"
                        accept="image/x-png,image/gif,image/jpeg"
                        hidden
                        @change="uploadAvatar($event)"
                      />
                      <v-btn class="mt-4" text @click="$refs.uploadAvatar.click()">{{ localeMsg.replaceAvatar }}</v-btn>
                    </v-card-text>
                    <v-card-actions class="justify-center">
                      <v-btn text @click="closeUpdateAvatarDialog"> {{ localeMsg.cancelBtn }}</v-btn>
                      <v-btn depressed color="primary" @click="uploadAvatarToServer"> {{ localeMsg.saveBtn }}</v-btn>
                    </v-card-actions>
                    <v-overlay v-if="isUploading" absolute color="black">
                      <v-progress-circular indeterminate color="amber"></v-progress-circular>
                    </v-overlay>
                  </v-card>
                </v-dialog>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="username" :label="localeMsg.username" outlined dense></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="email" :label="localeMsg.email" outlined dense></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="nickname" :label="localeMsg.nickname" outlined dense></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-select :items="genders" :label="localeMsg.gender" v-model="genderName" outlined dense></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-textarea v-model="introduction" :label="localeMsg.introduction" outlined dense></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="6"
                ><p class="password-title">{{ localeMsg.pwdTitle }}:</p>
                <v-form ref="pwdForm" v-model="valid">
                  <v-text-field
                    v-model="password"
                    :label="localeMsg.password"
                    outlined
                    dense
                    :type="showPwd ? 'text' : 'password'"
                    :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required]"
                    @click:append="showPwd = !showPwd"
                  ></v-text-field>
                </v-form> </v-col
            ></v-row>
            <v-card-actions>
              <v-btn color="blue darken-1" text @click="saveProfile"> {{ localeMsg.saveBtn }} </v-btn>
            </v-card-actions>
          </v-card-text>
        </v-card>
        <v-dialog v-model="confirmDialog" max-width="500px">
          <v-card>
            <v-card-title> {{ responseMessage }} </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="confirmDialog = false"> {{ localeMsg.confirmBtn }} </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import { Cropper, Preview } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import bcrypt from 'bcryptjs';
import AdminNav from '../../components/AdminNav.vue';
import util from '../../util';

export default {
  components: {
    Cropper,
    Preview,
    AdminNav,
  },
  data() {
    return {
      userAvatar: null,
      displayUsername: '',
      username: '',
      email: '',
      isRoot: '',
      uid: '',
      nickname: '',
      state: '',
      genders: [
        `${this.$t('admin.profile.male')}`,
        `${this.$t('admin.profile.female')}`,
        `${this.$t('admin.profile.unspecified')}`,
      ],
      genderName: '',
      gender: '',
      introduction: '',
      password: '',
      oldPwd: '',
      confirmDialog: false,
      valid: false,
      responseMessage: '',
      showPwd: false,
      rules: {
        required: (v) => !!v || this.localeMsg.required,
      },
      updateAvatarDialog: false,
      croppedImg: {
        coordinates: null,
        image: null,
      },
      previewAvatar: null,
      isUploading: false,
    };
  },
  computed: {
    localeMsg() {
      return {
        admin: this.$t('admin.profile.admin'),
        user: this.$t('admin.profile.user'),
        title: this.$t('admin.profile.title'),
        username: this.$t('admin.profile.username'),
        email: this.$t('admin.profile.email'),
        gender: this.$t('admin.profile.gender'),
        female: this.$t('admin.profile.female'),
        male: this.$t('admin.profile.male'),
        unspecified: this.$t('admin.profile.unspecified'),
        pwdTitle: this.$t('admin.profile.pwdTitle'),
        password: this.$t('admin.profile.password'),
        avatar: this.$t('admin.profile.avatar'),
        nickname: this.$t('admin.profile.nickname'),
        introduction: this.$t('admin.profile.introduction'),
        saveBtn: this.$t('admin.profile.saveBtn'),
        confirmBtn: this.$t('admin.profile.response.confirmBtn'),
        required: this.$t('admin.profile.response.required'),
        emptyPwdNotAllowed: this.$t('admin.profile.response.emptyPwdNotAllowed'),
        wrongPwd: this.$t('admin.profile.response.wrongPwd'),
        successMsg: this.$t('admin.profile.response.successMsg'),
        failureMsg: this.$t('admin.profile.response.failureMsg'),
        editAvatar: this.$t('admin.profile.avatarDialog.editAvatar'),
        previewAvatar: this.$t('admin.profile.avatarDialog.previewAvatar'),
        replaceAvatar: this.$t('admin.profile.avatarDialog.replaceAvatar'),
        cancelBtn: this.$t('admin.profile.avatarDialog.cancelBtn'),
      };
    },
  },
  async created() {
    util.checkAccess('', this.$router);
    if (localStorage.username) {
      this.username = localStorage.username;
      this.displayUsername = this.username;
    }
    if (localStorage.avatar) {
      this.userAvatar = localStorage.avatar;
      this.previewAvatar = this.userAvatar;
    }
    await util
      .post(`${util.getEnvUrl()}/admin/user/query/info`, { username: this.username }, this.$router)
      .then((response) => {
        if (response.data.code === 10000) {
          this.username = response.data.data.UserName;
          this.email = response.data.data.Email;
          this.isRoot = response.data.data.IsRoot;
          this.uid = response.data.data.UID;
          this.nickname = response.data.data.Nickname;
          this.state = response.data.data.State;
          this.gender = response.data.data.Gender;
          this.introduction = response.data.data.Introduce;
          this.userAvatar = response.data.data.Avatar;
          this.oldPwd = response.data.data.Passwd;
        }
      });
    this.getGenderName();
  },
  methods: {
    saveProfile() {
      const pwdCheck = bcrypt.compareSync(this.password, this.oldPwd);
      const validationCheck = this.password.trim() !== '' && this.valid;
      if (validationCheck === false) {
        this.confirmDialog = true;
        this.responseMessage = this.localeMsg.emptyPwdNotAllowed;
      } else if (pwdCheck === false) {
        this.confirmDialog = true;
        this.responseMessage = this.localeMsg.wrongPwd;
      } else {
        util
          .post(
            `${util.getEnvUrl()}/admin/user/update/info`,
            {
              uid: this.uid,
              username: this.username,
              email: this.email,
              passCode: '123456',
              passwd: this.password,
              nickname: this.nickname,
              gender: this.getGender(),
              introduce: this.introduction,
              state: this.state,
            },
            this.$router
          )
          .then((response) => {
            this.confirmDialog = true;
            if (response.data.code === 10000) {
              this.responseMessage = this.localeMsg.successMsg;
              this.password = '';
              this.$refs.pwdForm.resetValidation();
              this.contentIsChanged = false;
            } else {
              this.responseMessage = this.localeMsg.failureMsg;
            }
          });
      }
    },
    showRole() {
      if (this.isRoot === 1) {
        return this.localeMsg.admin;
      }
      return this.localeMsg.user;
    },
    getGenderName() {
      if (this.gender === 0) {
        this.genderName = this.localeMsg.male;
      } else if (this.gender === 1) {
        this.genderName = this.localeMsg.female;
      } else {
        this.genderName = this.localeMsg.unspecified;
      }
    },
    getGender() {
      if (this.genderName === this.localeMsg.female) {
        return 1;
      }
      if (this.genderName === this.localeMsg.male) {
        return 0;
      }
      return 2;
    },
    // For real-time avatar preview, saving coordinates and image to croppedImg
    avatarOnChange({ coordinates, image }) {
      this.croppedImg = {
        coordinates,
        image,
      };
    },
    // Read image and create object URL
    uploadAvatar(event) {
      const { files } = event.target;
      if (files && files[0]) {
        this.previewAvatar = URL.createObjectURL(files[0]);
      }
    },
    // Clears all the inputs when clicking on 'Cancel'
    closeUpdateAvatarDialog() {
      this.updateAvatarDialog = false;
      this.previewAvatar = this.userAvatar;
      this.$refs.uploadAvatar.value = null;
    },
    uploadAvatarToServer() {
      this.isUploading = true;
      const { canvas } = this.$refs.cropper.getResult();
      if (canvas) {
        const formData = new FormData();
        canvas.toBlob((blob) => {
          formData.append('file', blob);
          util.post('https://api.cpgroup.top:8080/admin/object/upload/avatar', formData, this.$router).then((res) => {
            if (res.data.code === 10000) {
              this.userAvatar = res.data.data.url;
              localStorage.avatar = this.userAvatar;
            }
            this.updateAvatarDialog = false;
            this.isUploading = false;
          });
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
}

.user-info-container {
  display: flex;
  padding: 20px;
  background: white;
  border-radius: 2px;
  .user-info-avatar {
    align-self: center;
    margin-right: 10px;
  }
  .user-info-name {
    font-size: 1.28rem;
    font-weight: 420;
  }
}
.cropper {
  width: 250px;
  height: 250px;
}
.cropper-preview {
  border-radius: 50%;
}
</style>
