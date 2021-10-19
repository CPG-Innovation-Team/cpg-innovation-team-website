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
                  <!-- <v-file-input label="Upload image" hide-details dense outlined></v-file-input> -->
                  <v-text-field v-model="cover" required hide-details dense outlined></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col class="label" cols="1">
                  <label>Tag</label>
                </v-col>
                <v-col>
                  <v-text-field v-model="tag" required hide-details dense outlined></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col class="label" cols="1">
                  <label>Content</label>
                </v-col>
                <v-col>
                  <v-textarea v-model="content" required hide-details dense outlined></v-textarea>
                </v-col>
              </v-row>

              <v-row>
                <v-col class="text-right">
                  <v-btn color="normal" class="mr-4" @click="$router.go(-1)">Back</v-btn>
                  <v-btn color="primary" @click="submit">Submit</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
          <v-col cols="12" sm="2"> </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import axios from 'axios';
import AdminNav from '../../components/AdminNav.vue';

export default {
  data() {
    return {
      valid: '',
      title: '',
      cover: '',
      content: '',
      tag: '',
    };
  },
  components: {
    AdminNav,
  },
  async created() {
    await axios
      .post('http://localhost:8080/login', {
        username: 'chenxi666',
        passwd: '$2a$10$20xO1elb7k5Cb2hZ5M5rluKKnrYARDSdOni04U30EeROKjm4oj00a',
      })
      .then((response) => {
        this.token = response.data.data.Token;
      });
  },
  methods: {
    submit() {
      axios
        .post(
          'http://localhost:8080/admin/article/add',
          {
            title: this.title,
            cover: this.cover,
            content: this.content,
            tags: this.tag,
          },
          {
            headers: {
              token: this.token,
            },
          }
        )
        .then((response) => console.log(response));
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
