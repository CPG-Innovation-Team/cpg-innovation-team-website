<template>
  <div>
    <div class="header-container">
      <img class="nav-img" src="https://picsum.photos/2000/" alt="header image" />

      <div class="header-text">
        <p class="title-cn">{{ blog.title }}</p>
        <p class="subtitle">Author: {{ blog.author }}</p>
        <div>
          Likes: 4
          <v-btn icon color="pink">
            <v-icon>mdi-heart</v-icon>
          </v-btn>
        </div>
      </div>
      <HeaderNav />
    </div>

    <v-main>
      <v-row>
        <v-col>
          <div class="blog-container">
            <div class="blog-content">
              {{ blog.content }}
            </div>
          </div>
          <v-card class="ma-4">
            <v-subheader> Comments </v-subheader>

            <v-list two-line>
              <template v-for="n in comments.length">
                <v-list-item :key="n">
                  <v-list-item-avatar color="grey darken-1"> </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>{{ comments[n - 1].createdAt }}</v-list-item-title>

                    <v-list-item-subtitle>
                      {{ comments[n - 1].content }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider v-if="n !== 6" :key="`divider-${n}`" inset></v-divider>
              </template>
            </v-list>

            <v-textarea
              class="ma-4"
              v-model="comment"
              required
              hide-details
              dense
              outlined
              label="comment"
            ></v-textarea>
            <v-btn class="mb-4 ml-4" color="blue darken-1" text> Send </v-btn>
          </v-card></v-col
        >
      </v-row>
    </v-main>
  </div>
</template>

<script>
import axios from 'axios';
import HeaderNav from '../components/HeaderNav.vue';

export default {
  data() {
    return {
      token: '',
      blog: [],
      sn: '',
      comments: [],
      comment: '',
    };
  },
  components: {
    HeaderNav,
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
    if (this.$route.query.sn) {
      this.sn = this.$route.query.sn;
      await axios
        .post(
          'http://localhost:8080/admin/article/info',
          {
            sn: parseInt(this.sn, 10),
          },
          {
            headers: {
              token: this.token,
            },
          }
        )
        .then((response) => {
          this.blog = {
            title: response.data.data.Title,
            tags: response.data.data.Tags,
            content: response.data.data.Content,
            author: response.data.data.Author,
            cover: response.data.data.Cover,
            state: response.data.data.State,
            updatedAt: response.data.data.UpdatedAt,
            createdAt: response.data.data.CreatedAt,
          };
        });
      await axios
        .post(
          'http://localhost:8080/comment/list',
          {
            sn: parseInt(this.sn, 10),
          },
          {
            headers: {
              token: this.token,
            },
          }
        )
        .then((response) => {
          for (let i = 1; i <= Object.keys(response.data.data).length; i += 1) {
            this.comments.push({
              cid: response.data.data[i].Cid,
              content: response.data.data[i].Content,
              createdAt: response.data.data[i].CreatedAt,
              uid: response.data.data[i].UID,
              zanNum: response.data.data[i].ZanNum,
            });
          }
        });
    }
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.header-container {
  position: relative;
  height: 400px;
  .header-text {
    color: white;
    position: absolute;
    width: 600px;
    left: 50%;
    margin-left: -300px;
    top: 50%;
    margin-top: -80px;
    text-align: center;
    .title-en {
      font-size: 1.2rem;
      font-weight: bold;
      margin-bottom: 6px;
    }
    .title-cn {
      font-size: 2.6rem;
      margin: 0;
    }
    .subtitle {
      font-size: 1.2rem;
      font-weight: 900;
    }
  }
  .nav-img {
    width: 100%;
    height: 400px;
    opacity: 2;
  }
}

.blog-container {
  width: 600px;
  margin-top: 3%;
  margin-left: 15%;
  margin-right: 15%;
  text-align: center;
  word-wrap: break-word;
}

.blog-content {
  font-size: 15px;
  white-space: pre-line;
  line-height: 28px;
  margin-bottom: 80px;
}
</style>
