<template>
  <div class="layout">
    <AdminNav />
    <v-main style="background: whitesmoke">
      <v-card class="ma-4">
        <v-card-title> 通知 </v-card-title>
        <v-card-text
          ><v-radio-group v-model="value" row>
            <v-radio label="开启通知" value="notificationOn" @click="turn(true)"></v-radio>
            <v-radio label="关闭通知" value="notificationOff" @click="turn(false)"></v-radio>
          </v-radio-group>
          <v-text-field label="通知内容" :disabled="disabled" v-model="content"></v-text-field>
          <v-text-field label="通知跳转链接" :disabled="disabled" v-model="link"></v-text-field>
          <v-btn :disabled="disabled" text color="blue">保存</v-btn>
        </v-card-text>
      </v-card>
    </v-main>
  </div>
</template>

<script>
import AdminNav from '../../components/AdminNav.vue';

export default {
  data() {
    return { value: 'notificationOn', disabled: false, content: '', link: '' };
  },
  components: {
    AdminNav,
  },
  methods: {
    turn(bool) {
      if (bool === false) {
        this.disabled = true;
        this.link = '';
        this.content = '';
      } else {
        this.disabled = false;
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
