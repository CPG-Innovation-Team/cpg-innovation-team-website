<template>
  <div class="rolling-gallery">
    <div class="vertical-block" v-for="(list, index) of galleryData" :key="index" :style="{ flex: list.flex }">
      <div
        class="vertical-inner-list"
        :class="{ reverse: index % 2 === 1 }"
        :style="{ animationDuration: `${list.data.length * list.flex}s` }"
      >
        <v-card
          class="gallery-item"
          v-for="item of list.data"
          :key="item.image"
          :style="{ backgroundColor: randomColor() }"
        >
          <v-hover v-slot="{ hover }">
            <div class="gallery-asset-container">
              <div v-if="item.image">
                <v-img :src="item.image" class="gallery-image"
                  ><v-fade-transition>
                    <v-overlay v-if="hover" absolute color="black">
                      <div class="d-flex gallery-item-description-text">
                        <v-avatar color="yellow" size="36"></v-avatar>
                      </div>
                      <div class="d-flex gallery-item-description-text">{{ item.text }}</div>
                      <div class="d-flex gallery-item-description-text">Some description</div>
                    </v-overlay>
                  </v-fade-transition></v-img
                >
              </div>
              <div v-if="item.gif">
                <v-img src="../assets/img-food.gif" width="100%">
                  <v-fade-transition>
                    <v-overlay v-if="hover" absolute color="black">
                      <div class="d-flex gallery-item-description-text">
                        <v-avatar color="yellow" size="36"></v-avatar>
                      </div>
                      <div class="d-flex gallery-item-description-text">{{ item.text }}</div>
                      <div class="d-flex gallery-item-description-text">Some description</div>
                    </v-overlay>
                  </v-fade-transition>
                </v-img>
                <v-btn class="gallery-item-marker" x-small> <v-icon x-small>mdi-alpha-g-box</v-icon></v-btn>
              </div>
              <div v-if="item.video" @mouseover="autoplayVideo(item.text)" @mouseleave="autopauseVideo(item.text)">
                <v-row>
                  <video :ref="item.text" :id="item.text" width="100%" loop preload="auto" muted>
                    <source :src="item.video" type="video/mp4" />
                  </video>
                </v-row>
                <v-fade-transition>
                  <v-overlay v-if="hover" absolute color="black">
                    <v-btn icon @click="fullscreenVideo(item.text)">
                      <v-icon x-large color="white"> mdi-play-circle-outline </v-icon></v-btn
                    >
                  </v-overlay>
                </v-fade-transition>
                <v-btn class="gallery-item-marker" x-small><v-icon x-small> mdi-video </v-icon></v-btn>
              </div>
              <v-hover v-slot:default="{ hover }" open-delay="200">
                <div>
                  <div v-if="item.label === `精选`">
                    <v-btn class="gallery-item-label" x-small :style="hover ? expandStyle : closeStyle">
                      <v-icon x-small> mdi-star </v-icon>
                      <v-scroll-x-transition>
                        <span v-if="hover" class="ml-2">精选</span>
                      </v-scroll-x-transition>
                    </v-btn>
                  </div>
                  <div v-if="item.label === `限定`">
                    <v-btn class="gallery-item-label" x-small :style="hover ? expandStyle : closeStyle">
                      <v-icon x-small> mdi-shimmer </v-icon>
                      <v-scroll-x-transition>
                        <span v-if="hover" class="ml-2">限定</span>
                      </v-scroll-x-transition>
                    </v-btn>
                  </div>
                  <div v-if="item.label === `销量最佳`">
                    <v-btn class="gallery-item-label" x-small :style="hover ? expandStyle : closeStyle">
                      <v-icon x-small> mdi-license </v-icon>
                      <v-scroll-x-transition>
                        <span v-if="hover" class="ml-2">销量最佳</span>
                      </v-scroll-x-transition>
                    </v-btn>
                  </div>
                  <div v-if="item.label === `搜索第一`">
                    <v-btn class="gallery-item-label" x-small :style="hover ? expandStyle : closeStyle">
                      <v-icon x-small> mdi-fire </v-icon>
                      <v-scroll-x-transition>
                        <span v-if="hover" class="ml-2">搜索第一</span>
                      </v-scroll-x-transition>
                    </v-btn>
                  </div>
                  <div v-if="item.label === `新品`">
                    <v-btn class="gallery-item-label" x-small :style="hover ? expandStyle : closeStyle">
                      <v-icon x-small> mdi-new-box </v-icon>
                      <v-scroll-x-transition>
                        <span v-if="hover" class="ml-2">新品</span>
                      </v-scroll-x-transition>
                    </v-btn>
                  </div>
                </div>
              </v-hover>
            </div>
          </v-hover>
          <v-row class="pt-2 pb-2 pl-4 pr-4" align="center" no-gutters>
            <v-col cols="2"><v-avatar class="gallery-avatar" color="yellow" size="20"> </v-avatar></v-col>
            <v-col cols="8">
              <div class="gallery-text">{{ item.text }}</div>
            </v-col>
            <v-col cols="2" class="text-right">
              <div v-if="item.country === `China`">
                <span class="fi fi-cn"></span>
              </div>
              <div v-if="item.country === `Thailand`">
                <span class="fi fi-th"></span>
              </div>
              <div v-if="item.country === `England`">
                <span class="fi fi-gb"></span>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
// import VideoBackground from 'vue-responsive-video-background-player';

export default {
  name: 'RollingGallery',
  components: {
    // VideoBackground,
  },
  data: () => ({
    expandStyle: 'padding: 3px;',
    closeStyle: 'min-width: 0px; padding: 3px;',
    galleryData: [
      {
        flex: 2,
        data: [
          {
            image: 'https://static.cpgroup.top/product/pocky/img-pocky1.png',
            text: 'POCKY 巧克力味',
            label: '精选',
            country: 'China',
          },
          { gif: '../assets/img-food.gif', text: 'test gif', label: '' },
          {
            image: 'https://static.cpgroup.top/product/pocky/img-pocky2.png',
            text: 'POCKY 草莓味',
            label: '限定',
            country: 'China',
          },
          {
            image: 'https://static.cpgroup.top/product/pocky/img-pocky3.png',
            text: 'POCKY 杏仁味',
            label: '',
            country: 'China',
          },
          {
            image: 'https://static.cpgroup.top/product/pocky/img-pocky4.png',
            text: 'POCKY 巧克力香蕉味',
            label: '销量最佳',
            country: 'China',
          },
          {
            image: 'https://static.cpgroup.top/product/pocky/img-pocky5.png',
            text: 'POCKY 香草莓味',
            label: '搜索第一',
            country: 'Thailand',
          },
          {
            image: 'https://static.cpgroup.top/product/pocky/img-pocky6.png',
            text: 'POCKY 抹茶味',
            label: '新品',
            country: 'Thailand',
          },
          {
            image: 'https://static.cpgroup.top/product/pocky/img-pocky7.png',
            text: 'POCKY 奶油曲奇味',
            label: '',
            country: 'Thailand',
          },
        ],
      },
      {
        flex: 4,
        data: [
          {
            video:
              'https://static.videezy.com/system/resources/previews/000/041/925/original/C0008_2016-11-16_12-48.mp4',
            text: 'test video',
            label: '限定',
            country: 'China',
          },
          {
            video: 'https://static.videezy.com/system/resources/previews/000/040/953/original/5_04_10_19.mp4',
            text: 'test video 2',
            label: '限定',
            country: 'China',
          },
          {
            image: 'https://static.cpgroup.top/product/nft/img-nft1.png',
            text: 'NFT Series 1',
            label: '限定',
            country: 'China',
          },
          {
            image: 'https://static.cpgroup.top/product/nft/img-nft2.png',
            text: 'NFT Series 2',
            label: '',
            country: 'China',
          },
          {
            image: 'https://static.cpgroup.top/product/nft/img-nft3.png',
            text: 'NFT Series 3',
            label: '',
            country: 'China',
          },
          {
            image: 'https://static.cpgroup.top/product/nft/img-nft4.png',
            text: 'NFT Series 4',
            label: '精选',
            country: 'China',
          },
          {
            image: 'https://static.cpgroup.top/product/nft/img-nft5.png',
            text: 'NFT Series 5',
            label: '',
            country: 'China',
          },
          {
            image: 'https://static.cpgroup.top/product/nft/img-nft6.png',
            text: 'NFT Series 6',
            label: '',
            country: 'China',
          },
          {
            image: 'https://static.cpgroup.top/product/nft/img-nft7.png',
            text: 'NFT Series 7',
            label: '搜索第一',
            country: 'China',
          },
          {
            image: 'https://static.cpgroup.top/product/nft/img-nft8.png',
            text: 'NFT Series 8',
            label: '',
            country: 'China',
          },
        ],
      },
      {
        flex: 2,
        data: [
          {
            image: 'https://static.cpgroup.top/product/water/img-water1.png',
            text: '纯悦矿泉水',
            label: '销量最佳',
            country: 'China',
          },
          {
            image: 'https://static.cpgroup.top/product/water/img-water2.png',
            text: '华润怡宝饮用纯净水',
            label: '销量最佳',
            country: 'Thailand',
          },
          {
            image: 'https://static.cpgroup.top/product/water/img-water3.png',
            text: '今麦郎饮用天然水',
            label: '',
            country: 'China',
          },
          {
            image: 'https://static.cpgroup.top/product/water/img-water4.png',
            text: '景田百岁山天然矿泉水',
            label: '',
            country: 'Thailand',
          },
          {
            image: 'https://static.cpgroup.top/product/water/img-water5.png',
            text: '均瑶恩赐饮用天然矿泉水',
            label: '',
            country: 'Thailand',
          },
          {
            image: 'https://static.cpgroup.top/product/water/img-water6.png',
            text: '康师傅包装饮用水',
            label: '精选',
            country: 'England',
          },
          {
            image: 'https://static.cpgroup.top/product/water/img-water7.png',
            text: '农夫山泉饮用天然水',
            label: '限定',
            country: 'Thailand',
          },
          {
            image: 'https://static.cpgroup.top/product/water/img-water8.png',
            text: '依云 evian 天然矿泉水',
            label: '限定',
            country: 'England',
          },
        ],
      },
      {
        flex: 3,
        data: [
          {
            image: 'https://static.cpgroup.top/product/dumpling/img-dumpling1.png',
            text: '鸡肉时蔬饺',
            label: '搜索第一',
            country: 'China',
          },
          {
            image: 'https://static.cpgroup.top/product/dumpling/img-dumpling2.png',
            text: '椒麻鸡肉饺',
            label: '',
            country: 'China',
          },
          {
            image: 'https://static.cpgroup.top/product/dumpling/img-dumpling3.png',
            text: '青菜鲜肉饺',
            label: '限定',
            country: 'China',
          },
          {
            image: 'https://static.cpgroup.top/product/dumpling/img-dumpling4.png',
            text: '墨鱼芹香饺',
            label: '',
            country: 'China',
          },
          {
            image: 'https://static.cpgroup.top/product/dumpling/img-dumpling5.png',
            text: '日式饺子',
            label: '新品',
            country: 'China',
          },
          {
            image: 'https://static.cpgroup.top/product/dumpling/img-dumpling6.png',
            text: '香菜肉圆水饺',
            label: '精选',
            country: 'China',
          },
          {
            image: 'https://static.cpgroup.top/product/dumpling/img-dumpling7.png',
            text: '青瓜虾仁水饺',
            label: '精选',
            country: 'China',
          },
        ],
      },
      {
        flex: 2,
        data: [
          {
            image: 'https://static.cpgroup.top/product/honey/img-product1.png',
            text: '森蜂园-蜂王浆',
            label: '',
            country: 'Thailand',
          },
          {
            image: 'https://static.cpgroup.top/product/honey/img-product2.png',
            text: '蜂胶银杏软胶囊',
            label: '',
            country: 'Thailand',
          },
          {
            image: 'https://static.cpgroup.top/product/honey/img-product3.png',
            text: '茶花蜂花粉',
            label: '',
            country: 'Thailand',
          },
          {
            image: 'https://static.cpgroup.top/product/honey/img-product4.png',
            text: '长白山椴树原蜜',
            label: '限定',
            country: 'Thailand',
          },
          {
            image: 'https://static.cpgroup.top/product/honey/img-product5.png',
            text: '1000米长白山椴树原...',
            label: '搜索第一',
            country: 'England',
          },
          {
            image: 'https://static.cpgroup.top/product/honey/img-product6.png',
            text: '多花蜂蜜 （勺蜜）',
            label: '',
            country: 'England',
          },
          {
            image: 'https://static.cpgroup.top/product/honey/img-product7.png',
            text: '长白山紫椴蜂蜜（勺蜜）',
            label: '',
            country: 'England',
          },
          {
            image: 'https://static.cpgroup.top/product/honey/img-product8.png',
            text: '长白山椴树蜂蜜礼盒',
            label: '新品',
            country: 'England',
          },
          {
            image: 'https://static.cpgroup.top/product/honey/img-product9.png',
            text: '森蜂园上海蜂蜜礼盒',
            label: '限定',
            country: 'England',
          },
          {
            image: 'https://static.cpgroup.top/product/honey/img-product10.png',
            text: '麦卢卡 MANUKA 蜂蜜礼盒',
            label: '',
            country: 'England',
          },
        ],
      },
    ],
  }),
  methods: {
    randomColor() {
      const colorPool = ['#c8befa', '#fbe9bc', '#e1f9ea', '#c2adc0', '#f5bf9e'];
      return colorPool[Math.floor(Math.random() * 5)];
    },
    fullscreenVideo(id) {
      const div = document.getElementById(id);
      if (div.requestFullscreen) div.requestFullscreen();
      else if (div.webkitRequestFullscreen) div.webkitRequestFullscreen();
      else if (div.msRequestFullScreen) div.msRequestFullScreen();
    },
    autoplayVideo(ref) {
      this.$refs[ref][0].play();
    },
    autopauseVideo(ref) {
      this.$refs[ref][0].pause();
    },
  },
};
</script>

<style lang="scss" scoped>
.rolling-gallery {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 600px;
}
.vertical-block {
  height: 600px;
  padding: 10px;
  border-radius: 8px;
  overflow: hidden;
}
.vertical-inner-list {
  animation-name: rolling-forward;
  animation-duration: 10s;
  animation-timing-function: cubic-bezier(0.45, 0, 0.45, 1);
  animation-iteration-count: infinite;

  &.reverse {
    animation-name: rolling-reverse;
  }
  &:hover {
    animation-play-state: paused;
  }

  .gallery-item {
    margin-bottom: 10px;
    border-radius: 8px;
    box-shadow: 2px 2px 2px lightgray;
  }
  .gallery-asset-container {
    overflow: hidden;
    position: relative;
    .gallery-image {
      width: 100%;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }
    .gallery-item-description-text {
      align-items: center;
      justify-content: center;
      width: 100%;
      margin-top: 5px;
      font-size: 14px;
    }
    .gallery-item-marker {
      position: absolute;
      background-color: whitesmoke;
      top: 8px;
      right: 8px;
      z-index: 99;
      min-width: 0;
      max-width: 0;
      height: 15px;
    }
    .gallery-item-label {
      position: absolute;
      background-color: whitesmoke;
      top: 8px;
      left: 8px;
      z-index: 99;
      height: 15px;
    }
  }
  .gallery-avatar {
    margin-right: 5px;
  }
  .gallery-text {
    display: inline-block;
    color: #333;
    font-size: 13px;
    line-height: 15px;
  }
}

@keyframes rolling-forward {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(calc(-100% + 600px));
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes rolling-reverse {
  0% {
    transform: translateY(calc(-100% + 600px));
  }
  50% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(calc(-100% + 600px));
  }
}
</style>
