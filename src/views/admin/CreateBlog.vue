<template>
  <div class="layout">
    <AdminNav />
    <v-main>
      <v-container fluid>
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
              <v-file-input label="Upload image" hide-details dense outlined></v-file-input>
            </v-col>
          </v-row>

          <v-row>
            <v-col class="label" cols="1">
              <label>Subtitle</label>
            </v-col>
            <v-col>
              <v-text-field v-model="subtitle" required hide-details dense outlined></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col class="label" cols="1">
              <label>Article</label>
            </v-col>
            <v-col>
              <v-textarea outlined hide-details></v-textarea>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-btn color="primary" style="float: right">Submit</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import AdminNav from '../../components/AdminNav.vue';

export default {
  data() {
    return {
      valid: '',
      title: '',
      coverImg: '',
      subtitle: '',
      article: '',
    };
  },
  components: {
    AdminNav,
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
