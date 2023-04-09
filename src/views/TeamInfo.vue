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
        <div class="team-profile" v-for="member in members" :key="member.name">
          <img class="team-profile-image" :src="member.image" :alt="member.name" />
          <div class="team-profile-name">{{ member.name }}</div>
          <div class="team-profile-position">
            <p>{{ member.department }}</p>
            <p>{{ member.position }}</p>
          </div>
        </div>
      </div>
    </v-main>
  </div>
</template>

<script>
import HeaderNav from '../components/HeaderNav.vue';

const avatar1 = require('../assets/img-chenxi.jpg');
const avatar2 = require('../assets/img-tony.png');
const avatar3 = require('../assets/img-david.jpg');
const avatar4 = require('../assets/img-grace.jpg');
const avatar5 = require('../assets/img-alice.png');
const avatar6 = require('../assets/img-jack.png');

export default {
  components: {
    HeaderNav,
  },
  data() {
    return {
      members: [
        {
          name: '陈曦',
          image: avatar1,
          department: '前端开发部',
          position: '开发工程师',
        },
        {
          name: 'Tony 蒋元博',
          image: avatar2,
          department: '前端开发部',
          position: '开发工程师',
        },
        {
          name: 'David 刘明洋',
          image: avatar3,
          department: '前端开发部',
          position: '前端开发工程师',
        },
        {
          name: 'Grace 陈昕悦',
          image: avatar4,
          department: '前端开发部',
          position: '前端开发工程师',
        },
        {
          name: 'Alice 刘涵',
          image: avatar5,
          department: '产品研发部',
          position: '产品经理',
        },
        {
          name: 'Jack 林子轩',
          image: avatar6,
          department: '产品研发部',
          position: '产品经理',
        },
      ],
    };
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
  justify-content: space-between;
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
