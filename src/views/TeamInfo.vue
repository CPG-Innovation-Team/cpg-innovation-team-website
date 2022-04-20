<template>
  <div>
    <HeaderNav :color="'black'" />
    <div class="video-container">
      <video class="video" src="../assets/video-example.mp4" width="100%" autoplay loop preload="auto" muted></video>
      <div class="video-overlay">
        <div class="video-content">
          正大集团成立于1921年<br />
          是泰籍华人谢易初先生创办的知名跨国企业<br />
          正大集团秉承“利国、利民、利企业”的经营宗旨
        </div>
        <v-row align="center" justify="space-around">
          <a href="http://www.cpgroup.cn/column/%E6%AD%A3%E5%A4%A7%E9%9B%86%E5%9B%A2-83">
            <v-btn class="video-button" depressed color="primary"> 查看更多 </v-btn>
          </a>
        </v-row>
      </div>
    </div>

    <v-main>
      <div class="team-title">团队介绍</div>
      <div class="team-profile-container">
        <div class="team-profile">
          <img class="team-profile-image" src="../assets/img-chenxi.jpg" alt="Chenxi" />
          <div class="team-profile-name">陈曦</div>
          <div class="team-profile-position">
            <p>前端开发部</p>
            <p>开发工程师</p>
          </div>
        </div>
        <div class="team-profile">
          <img class="team-profile-image" src="../assets/img-tony.png" alt="Tony" />
          <div class="team-profile-name">Tony 蒋元博</div>
          <div class="team-profile-position">
            <p>前端开发部</p>
            <p>开发工程师</p>
          </div>
        </div>
        <div class="team-profile">
          <img class="team-profile-image" src="../assets/img-david.jpg" alt="David" />
          <div class="team-profile-name">David 刘明洋</div>
          <div class="team-profile-position">
            <p>前端开发部</p>
            <p>前端开发工程师</p>
          </div>
        </div>
        <div class="team-profile">
          <img class="team-profile-image" src="../assets/img-grace.jpg" alt="Grace" />
          <div class="team-profile-name">Grace 陈昕悦</div>
          <div class="team-profile-position">
            <p>前端开发部</p>
            <p>前端开发工程师</p>
          </div>
        </div>
        <div class="team-profile">
          <img class="team-profile-image" src="../assets/img-alice.png" alt="Alice" />
          <div class="team-profile-name">Alice 刘涵</div>
          <div class="team-profile-position">
            <p>产品研发部</p>
            <p>产品经理</p>
          </div>
        </div>
        <div class="team-profile">
          <img class="team-profile-image" src="../assets/img-jack.png" alt="Jack" />
          <div class="team-profile-name">Jack 林子轩</div>
          <div class="team-profile-position">
            <p>产品研发部</p>
            <p>产品经理</p>
          </div>
        </div>
      </div>
    </v-main>
  </div>
</template>

<script>
import HeaderNav from '../components/HeaderNav.vue';

export default {
  components: {
    HeaderNav,
  },
};
</script>

<style lang="scss" scoped>
.video-container {
  position: relative;
  margin-top: 10vh;

  .video {
    position: relative;
    z-index: 0;
  }

  .video-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }

  .video-content {
    margin-top: 15%;
    margin-bottom: 5%;
    color: white;
    font-size: 4vw;
    font-weight: bold;
    text-align: center;
  }

  .video-button {
    text-align: center;
  }
}

.team-title {
  text-align: center;
  margin-bottom: 50px;
  margin-top: 10%;
  font-size: 30px;
  font-weight: bold;
  color: black;
}

.team-profile-container {
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  margin-left: 15%;
  margin-right: 15%;

  .team-profile {
    text-align: center;
    margin-bottom: 50px;
    margin-left: 50px;
    margin-right: 50px;
    margin-top: 5%;

    .team-profile-image {
      width: 160px;
      margin-bottom: 20px;
    }

    .team-profile-name {
      font-size: 20px;
      font-weight: bold;
      color: black;
    }

    .team-profile-position {
      margin-top: 20px;
      font-size: 14px;
      line-height: 10px;
      color: rgb(29, 62, 95);
    }
  }
}
</style>
