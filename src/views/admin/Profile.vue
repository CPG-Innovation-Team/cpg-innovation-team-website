<template>
  <div class="layout">
    <AdminNav />
    <v-main style="background: whitesmoke">
      <v-container>
        <div class="user-info-container">
          <v-avatar class="avatar" size="64">
            <img src="https://randomuser.me/api/portraits/men/81.jpg" alt="sample img" />
          </v-avatar>
          <div>
            <div class="name">Mike.D</div>
            <div class="level d-flex">Super Manager<v-icon class="ml-2">mdi-information</v-icon></div>
          </div>
        </div>

        <div class="stat-container">
          <v-card-title>Statistics</v-card-title>
          <v-row>
            <v-col>
              <div class="card">
                <a>
                  <div class="tit">Follower<v-icon color="gray">mdi-chevron-right</v-icon></div>
                </a>
                <div class="stat">15</div>
                <div class="yesterday">Yesterday <span>--</span></div>
              </div>
            </v-col>

            <v-col>
              <div class="card">
                <div class="tit">View</div>
                <div class="stat">1,124</div>
                <div class="yesterday">Yesterday <span>28</span></div>
              </div>
            </v-col>

            <v-col>
              <div class="card">
                <div class="tit">Like</div>
                <div class="stat">4,124</div>
                <div class="yesterday">Yesterday <span>6</span></div>
              </div>
            </v-col>

            <v-col>
              <div class="card">
                <div class="tit">Share</div>
                <div class="stat">124</div>
                <div class="yesterday">Yesterday <span>2</span></div>
              </div>
            </v-col>
          </v-row>
        </div>

        <div class="sth-container">
          <v-card-title>Security</v-card-title>
          <div>...</div>
        </div>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import AdminNav from '../../components/AdminNav.vue';

export default {
  data() {
    return {};
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

.user-info-container {
  display: flex;
  padding: 20px;
  background: white;
  border-radius: 2px;
  .avatar {
    align-self: center;
    margin-right: 10px;
  }
  .name {
    font-size: 1.28rem;
    font-weight: 420;
  }
}

.stat-container {
  margin: 15px 0;
  padding: 0 10px 20px 10px;
  border-radius: 2px;
  background: white;
  .card {
    margin: 0 12px;
    padding: 12px 0 12px 20px;
    /* border: 1px solid silver; */
    border-radius: 4px;
    background: #ddf1fc;
    .tit {
      display: flex;
      font-size: 1.1rem;
      font-weight: 400;
      color: rgb(97, 96, 96);
    }
    .stat {
      font-size: 1.3rem;
      font-weight: 480;
      color: #3188fa;
    }
    .yesterday {
      font-size: 0.9rem;
      font-weight: 400;
      color: rgb(97, 96, 96);
      span {
        font-size: 0.9rem;
        font-weight: 480;
        color: #3188fa;
        margin-left: 4px;
      }
    }
  }
}

.sth-container {
  margin: 15px 0;
  padding: 0 10px 20px 10px;
  border-radius: 2px;
  background: white;
}
</style>
