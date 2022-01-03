<template>
  <div class="layout">
    <AdminNav />
    <v-main>
      <v-container fluid>
        <v-card>
          <v-card-title> Update Article </v-card-title>
          <v-card-text>
            <v-row class="ma-8">
              <v-text-field v-model="title" required hide-details dense outlined label="title"></v-text-field>
            </v-row>
            <v-row class="ma-8">
              <v-text-field v-model="cover" required hide-details dense outlined label="cover"></v-text-field>
            </v-row>
            <v-row class="ma-8">
              <v-select :items="tagList" v-model="tags" clearable outlined label="tags"></v-select>
            </v-row>
            <v-row class="ma-8">
              <editor
                apiKey="ze4be1i4t0rjy9pd5jmsfo4lhhmk39ok66qpxhs4cqhsg7b0"
                :init="{
                  height: 500,
                  menubar: false,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount',
                  ],
                  toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | help',
                }"
                v-model="content"
              />
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
            <v-btn color="blue darken-1" text @click="updateArticle"> Save </v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue';
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
