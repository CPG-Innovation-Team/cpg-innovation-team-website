<template>
  <div>
    <div class="header-container">
      <img class="nav-img" src="https://picsum.photos/2000/" alt="header image" />

      <div class="header-text">
        <p class="title-cn">博客</p>
        <p class="subtitle">正大创新项目中心博客</p>
      </div>
      <HeaderNav />
    </div>

    <v-main class="pt-0">
      <div class="blogs-container">
        <div class="popular-container">
          <h1 style="text-align: center">Most Popular</h1>
          <v-container>
            <v-row>
              <v-col>
                <div class="popular-item">
                  <img src="https://picsum.photos/seed/1/200/120" alt="sample img" />
                  <div class="popular-title">What Make A Don't Want You To Know</div>
                  <div class="user-info">
                    <v-avatar class="avatar">
                      <img src="https://picsum.photos/seed/q/200/" alt="sample img" />
                    </v-avatar>
                    <div>
                      <div class="name">Beverly Doyle</div>

                      <div class="date">21 Jan 2021</div>
                    </div>
                  </div>
                  <div class="description">
                    The changing of down comforters to cotton bedspreads always meant the squirrels had returned.
                  </div>
                </div>
              </v-col>

              <v-col>
                <div class="popular-item">
                  <img src="https://picsum.photos/seed/2/200/120" alt="sample img" />
                  <div class="popular-title">What Make A Don't Want You To Know</div>
                  <div class="user-info">
                    <v-avatar class="avatar">
                      <img src="https://picsum.photos/seed/w/200/" alt="sample img" />
                    </v-avatar>
                    <div>
                      <div class="name">Beverly Doyle</div>

                      <div class="date">21 Jan 2021</div>
                    </div>
                  </div>
                  <div class="description">
                    The changing of down comforters to cotton bedspreads always meant the squirrels had returned.
                  </div>
                </div>
              </v-col>

              <v-col>
                <div class="popular-item">
                  <img src="https://picsum.photos/seed/3/200/120" alt="sample img" />
                  <div class="popular-title">What Make A Don't Want You To Know</div>
                  <div class="user-info">
                    <v-avatar class="avatar">
                      <img src="https://picsum.photos/seed/e/200/" alt="sample img" />
                    </v-avatar>
                    <div>
                      <div class="name">Beverly Doyle</div>

                      <div class="date">21 Jan 2021</div>
                    </div>
                  </div>
                  <div class="description">
                    The changing of down comforters to cotton bedspreads always meant the squirrels had returned.
                  </div>
                </div>
              </v-col>

              <v-col>
                <div class="popular-item">
                  <img src="https://picsum.photos/seed/4/200/120" alt="sample img" />
                  <div class="popular-title">What Make A Don't Want You To Know</div>
                  <div class="user-info">
                    <v-avatar class="avatar">
                      <img src="https://picsum.photos/seed/r/200/" alt="sample img" />
                    </v-avatar>
                    <div>
                      <div class="name">Beverly Doyle</div>

                      <div class="date">21 Jan 2021</div>
                    </div>
                  </div>
                  <div class="description">
                    The changing of down comforters to cotton bedspreads always meant the squirrels had returned.
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </div>

        <div class="recent-container">
          <v-container>
            <h1>Recent Post</h1>

            <v-tabs class="mb-5" v-model="category" background-color="transparent" color="black">
              <v-tabs-slider></v-tabs-slider>
              <v-tab>All</v-tab>
              <v-tab>Technology</v-tab>
              <v-tab>Agriculture</v-tab>
            </v-tabs>

            <v-tabs-items v-model="category">
              <v-tab-item style="background: rgb(248, 247, 247)">
                <v-row>
                  <v-col cols="3"> <img src="https://picsum.photos/seed/5/200/120" alt="sample img" /> </v-col>
                  <v-col>
                    <div class="recent-title">What Make A Don't Want You To Know</div>
                    <div class="user-info">
                      <v-avatar class="avatar">
                        <img src="https://picsum.photos/seed/a/200/" alt="sample img" />
                      </v-avatar>
                      <div>
                        <div class="name">Beverly Doyle</div>

                        <div class="date">21 Jan 2021</div>
                      </div>
                    </div>
                    <div class="description">
                      The changing of down comforters to cotton bedspreads always meant the squirrels had returned.
                    </div>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="3"> <img src="https://picsum.photos/seed/6/200/120" alt="sample img" /> </v-col>
                  <v-col>
                    <div class="recent-title">What Make A Don't Want You To Know</div>
                    <div class="user-info">
                      <v-avatar class="avatar">
                        <img src="https://picsum.photos/seed/s/200/" alt="sample img" />
                      </v-avatar>
                      <div>
                        <div class="name">Beverly Doyle</div>

                        <div class="date">21 Jan 2021</div>
                      </div>
                    </div>
                    <div class="description">
                      The changing of down comforters to cotton bedspreads always meant the squirrels had returned.
                    </div>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="3"> <img src="https://picsum.photos/seed/7/200/120" alt="sample img" /> </v-col>
                  <v-col>
                    <div class="recent-title">What Make A Don't Want You To Know</div>
                    <div class="user-info">
                      <v-avatar class="avatar">
                        <img src="https://picsum.photos/seed/d/200/" alt="sample img" />
                      </v-avatar>
                      <div>
                        <div class="name">Beverly Doyle</div>

                        <div class="date">21 Jan 2021</div>
                      </div>
                    </div>
                    <div class="description">
                      The changing of down comforters to cotton bedspreads always meant the squirrels had returned.
                    </div>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="3"> <img src="https://picsum.photos/seed/f/200/120" alt="sample img" /> </v-col>
                  <v-col>
                    <div class="recent-title">What Make A Don't Want You To Know</div>
                    <div class="user-info">
                      <v-avatar class="avatar">
                        <img src="https://picsum.photos/seed/r/200/" alt="sample img" />
                      </v-avatar>
                      <div>
                        <div class="name">Beverly Doyle</div>

                        <div class="date">21 Jan 2021</div>
                      </div>
                    </div>
                    <div class="description">
                      The changing of down comforters to cotton bedspreads always meant the squirrels had returned.
                    </div>
                  </v-col>
                </v-row>
              </v-tab-item>
            </v-tabs-items>
            <!-- eslint-disable-next-line -->
            <v-pagination class="mt-10" v-model="page" length=6 color="black"></v-pagination>
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
    return {
      category: '',
      page: 1,
    };
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

.blogs-container {
  .popular-container {
    padding: 40px 0;
    background: rgb(226, 226, 226);
    .popular-item {
      max-width: 400px;
      img {
        border-radius: 5px;
        width: 100%;
      }
      .popular-title {
        font-size: 1rem;
        font-weight: 650;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .user-info {
        display: flex;
        padding: 8px 0;
        .avatar {
          height: 38px !important;
          width: 38px !important;
          min-width: 38px !important;
          margin-right: 8px;
          align-self: center;
        }
        .name {
          font-size: 0.96rem;
          font-weight: 500;
        }
        .date {
          font-size: 0.88rem;
          font-weight: 380;
        }
      }
      .description {
        font-size: 0.88rem;
        font-weight: 400;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  .recent-container {
    padding: 40px 0;
    background: rgb(248, 247, 247);
    img {
      border-radius: 5px;
    }
    .recent-title {
      font-size: 1rem;
      font-weight: 650;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .user-info {
      display: flex;
      padding: 8px 0;
      .avatar {
        height: 38px !important;
        width: 38px !important;
        min-width: 38px !important;
        margin-right: 8px;
        align-self: center;
      }
      .name {
        font-size: 0.96rem;
        font-weight: 500;
      }
      .date {
        font-size: 0.88rem;
        font-weight: 380;
      }
    }
    .description {
      font-size: 0.88rem;
      font-weight: 400;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
