<template>
  <div>
    <HeaderNav />
    <div class="header-container">
      <img class="nav-img" src="../assets/img-carousel1.jpg" alt="header image" />

      <div class="header-text">
        <p class="title-en">创新团队项目</p>
        <p class="subtitle"></p>
        <v-btn color="#FFC60D" depressed>探索更多</v-btn>
      </div>
    </div>

    <v-main>
      <v-container class="d-flex justify-space-around">
        <v-container class="mb-10">
          <v-img :src="projectBanner" id="project-head-img" max-height="400" />

          <v-container>
            <v-row class="hidden-sm-and-down">
              <v-col class="project-col" v-for="(project, i) in projects" :key="i">
                <v-hover v-slot="{ hover }">
                  <v-card class="mx-auto" color="grey lighten-4" max-width="600">
                    <v-card-title class="text-h4">{{ project.title }}</v-card-title>
                    <v-img :aspect-ratio="1" :src="project.img">
                      <v-slide-x-transition>
                        <div v-if="hover" class="d-flex project-list" style="height: 100%; width: 100%">
                          <v-card>
                            <v-card-text class="product-intro">{{ project.intro }}</v-card-text>
                            <ul>
                              <li v-for="(item, j) in project.list" :key="j">
                                <a :href="item.link">{{ item.name }}</a>
                              </li>
                            </ul>
                          </v-card>
                        </div>
                      </v-slide-x-transition>
                    </v-img>
                  </v-card>
                </v-hover>
              </v-col>
            </v-row>
            <!-- For Mobile Version -->
            <v-row v-for="(project, i) in projects" :key="i" class="mobile hidden-md-and-up">
              <v-img :aspect-ratio="4 / 1" :src="project.img">
                <v-row>
                  <v-col cols="8">
                    <v-card-title class="header">{{ project.title }}</v-card-title>
                  </v-col>
                  <v-col cols="4">
                    <v-chip icon @click="project.show = !project.show" class="chip-show">
                      更多<v-icon>{{ project.show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                    </v-chip>
                  </v-col>
                </v-row>
              </v-img>

              <v-expand-transition>
                <v-card v-show="project.show">
                  <v-card-text>{{ project.intro }}</v-card-text>
                  <v-chip v-for="(item, j) in project.list" :key="j" color="blue" class="chip-link">
                    <a :href="item.link">{{ item.name }}</a>
                  </v-chip>
                </v-card>
              </v-expand-transition>
            </v-row>
          </v-container>
        </v-container>

        <v-container class="briefing-block">
          <v-list two-line>
            <template v-for="(item, index) in briefingData">
              <v-list-item :key="index">
                <v-list-item-content class="briefing-item">
                  <v-list-item-title>
                    <a v-html="item.content" :href="item.link" target="_blank" class="briefing-content" />
                  </v-list-item-title>
                  <v-list-item-subtitle class="d-flex align-center">
                    <v-icon> mdi-clock-outline </v-icon>
                    <span class="ml-1 text-xs" v-html="timeFromNow(item.time)" />
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-container>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import moment from 'moment';
import HeaderNav from '../components/HeaderNav.vue';

const projectBanner = require('../assets/img-project-banner.jpg');
const cpxBanner = require('../assets/img-cpx-banner.jpg');
const cpcoinBanner = require('../assets/img-cpcoin-banner.png');
const cppulseBanner = require('../assets/img-cppulse-banner.webp');

export default {
  name: 'Project',
  data: () => ({
    projectBanner,
    projects: [
      {
        title: 'CPX',
        img: cpxBanner,
        list: [{ name: '点击前往', link: 'https://cpx.cpgroup.top' }],
        intro:
          'CPX正大集团全球采购平台是核心产品，支持NFT数字资产及商店，与CP Pulse结合进行数据分析。可以视为正大集团对标亚马逊针对AWS的策略。',
        show: false,
      },
      {
        title: 'CP Coin',
        img: cpcoinBanner,
        list: [{ name: '点击前往', link: 'https://coin.cpgroup.top' }],
        intro: '延伸至区块链技术的忠诚度计划。CP Coin将结合NFT产品进一步探索金融科技和资产管理。',
        show: false,
      },
      {
        title: 'CP Pulse',
        img: cppulseBanner,
        list: [{ name: '点击前往', link: 'https://pulse.cpgroup.top' }],
        intro: '为食品商品打造的数据分析引擎，致力于为定价与商品资源分配做出合理决策',
        show: false,
      },
    ],
    briefingData: [
      { content: 'CPX正大集团全球采购平台即将上线', time: 1646816580000 },
      {
        content: '正大集团入局，天然矿泉水行业添新军',
        time: 1646610380000,
        link: 'http://www.cpfoods.cn/cmscontent/3947.html',
      },
      { content: '正大集团谢吉人董事长新年慰问信', time: 1646611380000 },
      {
        content: '正大集团北方区：学习“满意一天”精神 日日想创新 天天要拼搏',
        time: 1646572380000,
        link: 'http://www.cpfoods.cn/cmscontent/3951.html',
      },
      {
        content: '兰州正大卜蜂贸易有限公司（正大优鲜）喜获省级大奖',
        time: 1646482380000,
        link: 'http://www.cpfoods.cn/cmscontent/3949.html',
      },
      {
        content: '正大中心：赋能城市美好生活',
        time: 1646312380000,
        link: 'http://www.cpfoods.cn/cmscontent/3912.html',
      },
      {
        content: '海南省委书记沈晓明一行莅临正大兴隆咖啡城项目视察指导工作',
        time: 1644813380000,
        link: 'http://www.cpfoods.cn/cmscontent/3913.html',
      },
      {
        content: '7432，山东蛋业创大世界基尼斯新纪录！',
        time: 1641813380000,
        link: 'http://www.cpfoods.cn/cmscontent/3738.html',
      },
      {
        content: '正大集团新疆、陕西区开展春节慰问活动',
        time: 1641813380000,
        link: 'http://www.cpgroup.cn/cmscontent/%E3%80%90%E5%BD%B0%E6%98%BE%E4%BC%81%E4%B8%9A%E8%B4%A3%E4%BB%BB-%E7%94%A8%E7%88%B1%E7%82%B9%E4%BA%AE%E6%B8%A9%E6%9A%96%E3%80%91-%E6%AD%A3%E5%A4%A7%E9%9B%86%E5%9B%A2%E6%96%B0%E7%96%86%E3%80%81%E9%99%95%E8%A5%BF%E5%8C%BA%E5%BC%80%E5%B1%95%E6%98%A5%E8%8A%82%E6%85%B0%E9%97%AE%E6%B4%BB%E5%8A%A8-1911.html',
      },
      {
        content: '正大食品高铁冠名列车首发仪式在广州圆满举办',
        time: 1641813380000,
        link: 'http://www.cpgroup.cn/cmscontent/%E6%AD%A3%E5%A4%A7%E9%A3%9F%E5%93%81%E9%AB%98%E9%93%81%E5%86%A0%E5%90%8D%E5%88%97%E8%BD%A6%E9%A6%96%E5%8F%91%E4%BB%AA%E5%BC%8F%E5%9C%A8%E5%B9%BF%E5%B7%9E%E5%9C%86%E6%BB%A1%E4%B8%BE%E5%8A%9E-1884.html',
      },
      {
        content: '正大集团捐赠爱心鸡蛋 助力平谷区峪口镇一线人员战“疫”',
        time: 1641813380000,
        link: 'http://www.cpgroup.cn/cmscontent/%E6%AD%A3%E5%A4%A7%E9%9B%86%E5%9B%A2%E6%8D%90%E8%B5%A0%E7%88%B1%E5%BF%83%E9%B8%A1%E8%9B%8B-%E5%8A%A9%E5%8A%9B%E5%B9%B3%E8%B0%B7%E5%8C%BA%E5%B3%AA%E5%8F%A3%E9%95%87%E4%B8%80%E7%BA%BF%E4%BA%BA%E5%91%98%E6%88%98%E2%80%9C%E7%96%AB%E2%80%9D-1906.html',
      },
      {
        content: '以美食为媒，促文明互鉴——正大中心成功协办首届“上合-北京CBD民族美食节”',
        time: 1641813380000,
        link: 'http://www.cpgroup.cn/cmscontent/%E4%BB%A5%E7%BE%8E%E9%A3%9F%E4%B8%BA%E5%AA%92%EF%BC%8C%E4%BF%83%E6%96%87%E6%98%8E%E4%BA%92%E9%89%B4%E2%80%94%E2%80%94-%E6%AD%A3%E5%A4%A7%E4%B8%AD%E5%BF%83%E6%88%90%E5%8A%9F%E5%8D%8F%E5%8A%9E%E9%A6%96%E5%B1%8A%E2%80%9C%E4%B8%8A%E5%90%88-%E5%8C%97%E4%BA%ACCBD%E6%B0%91%E6%97%8F%E7%BE%8E%E9%A3%9F%E8%8A%82%E2%80%9D-1899.html',
      },
      {
        content: '内蒙古正大有限公司与内蒙古商贸职业学院开展合作育人项目洽谈会',
        time: 1641813380000,
        link: 'http://www.cpgroup.cn/cmscontent/%E5%86%85%E8%92%99%E5%8F%A4%E6%AD%A3%E5%A4%A7%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8%E4%B8%8E%E5%86%85%E8%92%99%E5%8F%A4%E5%95%86%E8%B4%B8%E8%81%8C%E4%B8%9A%E5%AD%A6%E9%99%A2%E5%BC%80%E5%B1%95%E5%90%88%E4%BD%9C%E8%82%B2%E4%BA%BA%E9%A1%B9%E7%9B%AE%E6%B4%BD%E8%B0%88%E4%BC%9A-1895.html',
      },
      {
        content: '感恩正大，一路有你 | 正大集团内蒙古区举办感恩节系列活动',
        time: 1641813380000,
        link: 'http://www.cpgroup.cn/cmscontent/%E6%84%9F%E6%81%A9%E6%AD%A3%E5%A4%A7%EF%BC%8C%E4%B8%80%E8%B7%AF%E6%9C%89%E4%BD%A0-%7C-%E6%AD%A3%E5%A4%A7%E9%9B%86%E5%9B%A2%E5%86%85%E8%92%99%E5%8F%A4%E5%8C%BA%E4%B8%BE%E5%8A%9E%E6%84%9F%E6%81%A9%E8%8A%82%E7%B3%BB%E5%88%97%E6%B4%BB%E5%8A%A8-1888.html',
      },
    ],
  }),
  components: {
    HeaderNav,
  },
  methods: {
    timeFromNow: (time) => {
      return `Updated ${moment(time).fromNow()}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.header-container {
  position: relative;
  height: 400px;
  width: 100%;
  .header-text {
    color: white;
    position: absolute;
    left: 0;
    right: 0;
    margin-left: 5%;
    margin-right: 5%;
    top: 40%;
    text-align: center;
    .title-en {
      font-size: 2rem;
      font-weight: 900;
      margin-bottom: 6px;
    }
    .subtitle {
      font-size: 1.2rem;
      font-weight: 400;
    }
  }
  .nav-img {
    width: 100%;
    height: 400px;
    opacity: 2;
  }
}

h1 {
  text-align: center;
}

.project-col {
  padding: 0px;
}

.project-list {
  opacity: 0.8;
  ul {
    align-self: center;
    list-style: none;
    li {
      margin: 20px;
      font-size: 1.2em;
    }
  }
}

.mobile {
  .header {
    color: white;
    margin-top: 5%;
    text-shadow: 1px 1px 2px black;
  }
  .chip-show {
    float: right;
    margin: 25% 10%;
  }

  .chip-link {
    color: white;
    margin: 10px;
    padding: 10px 20px;

    a {
      color: #fff;
      text-decoration: none;
    }
  }
}

.product-intro {
  width: 80%;
  line-height: 28px;
  margin: 20px auto;
  font-size: 16px;
  font-weight: 600;
}

.briefing-block {
  width: 300px;

  .briefing-item {
    border-bottom: 1px solid #ccc;
  }

  .briefing-content {
    color: #333;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
