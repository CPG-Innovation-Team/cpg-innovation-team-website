<template>
  <div>
    <div class="video-container">
      <video id="video" src="../assets/video-example.mp4" width="100%" autoplay loop preload="auto" muted></video>
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

    <div class="team-title">团队介绍</div>
    <div class="team-profile-container">
      <div class="team-profile">
        <img class="team-profile-image" src="../assets/img-avatar.jpeg" />
        <div class="team-profile-name">马化腾</div>
        <div class="team-profile-position">
          <p>主要创办人</p>
          <p>董事会主席兼首席执行官</p>
        </div>
      </div>
      <div class="team-profile">
        <img class="team-profile-image" src="../assets/img-avatar.jpeg" />
        <div class="team-profile-name">马化腾</div>
        <div class="team-profile-position">
          <p>主要创办人</p>
          <p>董事会主席兼首席执行官</p>
        </div>
      </div>
      <div class="team-profile">
        <img class="team-profile-image" src="../assets/img-avatar.jpeg" />
        <div class="team-profile-name">马化腾</div>
        <div class="team-profile-position">
          <p>主要创办人</p>
          <p>董事会主席兼首席执行官</p>
        </div>
      </div>
      <div class="team-profile">
        <img class="team-profile-image" src="../assets/img-avatar.jpeg" />
        <div class="team-profile-name">马化腾</div>
        <div class="team-profile-position">
          <p>主要创办人</p>
          <p>董事会主席兼首席执行官</p>
        </div>
      </div>
      <div class="team-profile">
        <img class="team-profile-image" src="../assets/img-avatar.jpeg" />
        <div class="team-profile-name">马化腾</div>
        <div class="team-profile-position">
          <p>主要创办人</p>
          <p>董事会主席兼首席执行官</p>
        </div>
      </div>
      <div class="team-profile">
        <img class="team-profile-image" src="../assets/img-avatar.jpeg" />
        <div class="team-profile-name">马化腾</div>
        <div class="team-profile-position">
          <p>主要创办人</p>
          <p>董事会主席兼首席执行官</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.video-container {
  position: relative;

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
    margin-top: 250px;
    color: white;
    font-size: 40px;
    text-align: center;
  }

  @media (max-width: 1200px) {
    .video-content {
      margin-top: 200px;
      font-size: 30px;
    }
  }

  @media (max-width: 900px) {
    .video-content {
      margin-top: 150px;
      font-size: 20px;
    }
  }

  @media (max-width: 700px) {
    .video-content {
      margin-top: 80px;
      font-size: 15px;
    }
  }

  .video-button {
    text-align: center;
    margin-top: 80px;
  }
}

.team-title {
  text-align: center;
  margin-bottom: 50px;
  margin-top: 80px;
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
    margin-top: 60px;

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
