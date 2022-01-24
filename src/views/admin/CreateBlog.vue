<template>
  <div class="layout">
    <AdminNav />
    <v-main>
      <v-container fluid>
        <v-row class="mt-12">
          <v-col cols="12" sm="2"> </v-col>
          <v-col cols="12" sm="8">
            <v-form ref="form" v-model="valid">
              <v-row>
                <v-col class="label" cols="1">
                  <label>Title</label>
                </v-col>
                <v-col>
                  <v-text-field v-model="title" required hide-details dense outlined></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="1" class="label">
                  <span>Cover</span>
                </v-col>
                <v-col>
                  <v-text-field v-model="cover" required hide-details dense outlined></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col class="label" cols="1">
                  <label>Tag</label>
                </v-col>
                <v-col>
                  <v-select :items="tags" v-model="tag" clearable outlined></v-select>
                </v-col>
              </v-row>

              <v-row>
                <v-col class="label" cols="1">
                  <label>Content</label>
                </v-col>
                <v-col>
                  <Editor v-model="content" />
                </v-col>
              </v-row>

              <v-row>
                <v-col class="text-right">
                  <v-btn color="normal" class="mr-4" @click="$router.go(-1)">Back</v-btn>
                  <v-btn color="primary" @click="submit">Submit</v-btn>
                </v-col>
              </v-row>
            </v-form>
            <v-row justify="space-around">
              <v-col cols="auto">
                <v-dialog transition="dialog-bottom-transition" max-width="600" v-model="dialog">
                  <template>
                    <v-card>
                      <v-card-text>
                        <div class="text-h6 pa-6">提交成功，进入审核状态</div>
                      </v-card-text>
                      <v-card-actions class="justify-end">
                        <v-btn text @click="closeDialog()">Confirm</v-btn>
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" sm="2"> </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import Editor from '../../components/Editor.vue';
import util from '../../util';
import AdminNav from '../../components/AdminNav.vue';

export default {
  data() {
    return {
      valid: '',
      title: '',
      cover: '',
      content: '',
      tag: '',
      tags: ['All', 'Technology', 'Agriculture'],
      dialog: false,
    };
  },
  components: {
    AdminNav,
    Editor,
  },
  methods: {
    submit() {
      util.post('http://localhost:8080/admin/article/add', {
        title: this.title,
        cover: this.cover,
        content: this.content,
        tags: this.tag,
      });
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
      this.$router.push({
        path: '/admin/blogs',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
}

.label {
  min-width: 75px;
  max-width: 75px;
  line-height: 40px;
}
</style>
