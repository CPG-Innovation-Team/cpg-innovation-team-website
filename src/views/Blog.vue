<template>
  <div>
    <div class="header-container">
      <img class="nav-img" src="../assets/img-carousel1.jpg" alt="header image" />

      <div class="header-text">
        <p class="title-cn">博客</p>
        <p class="subtitle">正大创新项目中心博客</p>
      </div>
      <HeaderNav />
    </div>

    <v-main>
      <div class="blogs-container">
        <div class="popular-container">
          <h1 style="text-align: center">Most Popular</h1>
          <v-container>
            <v-row>
              <v-col>
                <div class="popular-item">
                  <img src="https://picsum.photos/seed/1/200/120" />
                  <div>Title</div>
                  <div>
                    Avatar
                    <div>Name</div>
                    <div>Date</div>
                  </div>
                  <div>Description</div>
                </div>
              </v-col>

              <v-col>
                <div class="popular-item">
                  <img src="https://picsum.photos/seed/2/200/120" />
                  <div>Title</div>
                  <div>
                    Avatar
                    <div>Name</div>
                    <div>Date</div>
                  </div>
                  <div>Description</div>
                </div>
              </v-col>

              <v-col>
                <div class="popular-item">
                  <img src="https://picsum.photos/seed/3/200/120" />
                  <div>Title</div>
                  <div>
                    Avatar
                    <div>Name</div>
                    <div>Date</div>
                  </div>
                  <div>Description</div>
                </div>
              </v-col>

              <v-col>
                <div class="popular-item">
                  <img src="https://picsum.photos/seed/4/200/120" />
                  <div>Title</div>
                  <div>
                    Avatar
                    <div>Name</div>
                    <div>Date</div>
                  </div>
                  <div>Description</div>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </div>

        <div class="recent-container pt-10">
          <v-container>
            <h1 class="mb-5">Recent Post</h1>
            <v-row>
              <v-col cols="3"> <img src="https://picsum.photos/seed/5/200/120" /> </v-col>
              <v-col>
                <div>Title</div>
                <div>
                  Avatar
                  <div>Name</div>
                  <div>Date</div>
                </div>
                <div>Description</div>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="3"> <img src="https://picsum.photos/seed/6/200/120" /> </v-col>
              <v-col>
                <div>Title</div>
                <div>
                  Avatar
                  <div>Name</div>
                  <div>Date</div>
                </div>
                <div>Description</div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3"> <img src="https://picsum.photos/seed/7/200/120" /> </v-col>
              <v-col>
                <div>Title</div>
                <div>
                  Avatar
                  <div>Name</div>
                  <div>Date</div>
                </div>
                <div>Description</div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3"> <img src="https://picsum.photos/seed/8/200/120" /> </v-col>
              <v-col>
                <div>Title</div>
                <div>
                  Avatar
                  <div>Name</div>
                  <div>Date</div>
                </div>
                <div>Description</div>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </div>
    </v-main>
  </div>
</template>

<script>
import HeaderNav from '../components/HeaderNav.vue';

export default {
  data() {
    return {};
  },
  components: {
    HeaderNav,
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.header-container {
  position: relative;
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
.blogs-container {
  .popular-container {
    min-height: 300px;
    width: 100%;
    background: rgb(226, 226, 226);
    .popular-item {
      img {
        border-radius: 5px;
      }
    }
  }

  .recent-container {
    background: silver;
    img {
      border-radius: 5px;
    }
  }
}
</style>
