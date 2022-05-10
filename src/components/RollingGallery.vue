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
              <div v-if="item.type === 'gif' || item.type === 'image'">
                <v-img :src="item.url" width="100%">
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
                <v-btn v-if="item.type === 'gif'" class="gallery-item-marker" x-small>
                  <v-icon x-small>mdi-alpha-g-box</v-icon></v-btn
                >
              </div>
              <div
                v-if="item.type === 'video'"
                @mouseover="autoplayVideo(item.text)"
                @mouseleave="autopauseVideo(item.text)"
              >
                <v-row>
                  <video
                    :ref="item.text"
                    :id="item.text"
                    :src="item.url"
                    width="100%"
                    loop
                    preload="auto"
                    muted
                  ></video>
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
              <GalleryLabel :label="item.label" />
            </div>
          </v-hover>
          <v-row class="pt-2 pb-2 pl-4 pr-4" align="center" no-gutters>
            <v-col cols="2"><v-avatar class="gallery-avatar" color="yellow" size="20"></v-avatar></v-col>
            <v-col cols="8">
              <div class="gallery-text">{{ item.text }}</div>
            </v-col>
            <v-col cols="2" class="text-right">
              <span :class="countryTable[item.country]"></span>
            </v-col>
          </v-row>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import GalleryLabel from './GalleryLabel.vue';

export default {
  name: 'RollingGallery',
  components: {
    GalleryLabel,
  },
  data: () => ({
    countryTable: {
      China: 'fi fi-cn',
      Thailand: 'fi fi-th',
      England: 'fi fi-gb',
    },
    galleryData: [
      {
        flex: 2,
        data: [
          {
            url: 'https://static.cpgroup.top/product/pocky/img-pocky1.png',
            type: 'image',
            text: 'POCKY 巧克力味',
            label: '精选',
            country: 'China',
          },
          {
            url: 'https://media3.giphy.com/media/bsfUpZfjw8pBr2QKUg/giphy.gif',
            type: 'gif',
            text: 'test gif',
            label: '',
            country: 'England',
          },
          {
            url: 'https://static.cpgroup.top/product/pocky/img-pocky2.png',
            type: 'image',
            text: 'POCKY 草莓味',
            label: '限定',
            country: 'China',
          },
          {
            url: 'https://static.cpgroup.top/product/pocky/img-pocky3.png',
            type: 'image',
            text: 'POCKY 杏仁味',
            label: '',
            country: 'China',
          },
          {
            url: 'https://static.cpgroup.top/product/pocky/img-pocky4.png',
            type: 'image',
            text: 'POCKY 巧克力香蕉味',
            label: '销量最佳',
            country: 'China',
          },
          {
            url: 'https://static.cpgroup.top/product/pocky/img-pocky5.png',
            type: 'image',
            text: 'POCKY 香草莓味',
            label: '搜索第一',
            country: 'Thailand',
          },
          {
            url: 'https://static.cpgroup.top/product/pocky/img-pocky6.png',
            type: 'image',
            text: 'POCKY 抹茶味',
            label: '新品',
            country: 'Thailand',
          },
          {
            url: 'https://static.cpgroup.top/product/pocky/img-pocky7.png',
            type: 'image',
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
            url: 'https://static.videezy.com/system/resources/previews/000/041/925/original/C0008_2016-11-16_12-48.mp4',
            type: 'video',
            text: 'test video',
            label: '限定',
            country: 'China',
          },
          {
            url: 'https://static.cpgroup.top/product/nft/img-nft1.png',
            type: 'image',
            text: 'NFT Series 1',
            label: '限定',
            country: 'China',
          },
          {
            url: 'https://static.cpgroup.top/product/nft/img-nft2.png',
            type: 'image',
            text: 'NFT Series 2',
            label: '',
            country: 'China',
          },
          {
            url: 'https://static.cpgroup.top/product/nft/img-nft3.png',
            type: 'image',
            text: 'NFT Series 3',
            label: '',
            country: 'China',
          },
          {
            url: 'https://static.cpgroup.top/product/nft/img-nft4.png',
            type: 'image',
            text: 'NFT Series 4',
            label: '精选',
            country: 'China',
          },
          {
            url: 'https://static.cpgroup.top/product/nft/img-nft5.png',
            type: 'image',
            text: 'NFT Series 5',
            label: '',
            country: 'China',
          },
          {
            url: 'https://static.cpgroup.top/product/nft/img-nft6.png',
            type: 'image',
            text: 'NFT Series 6',
            label: '',
            country: 'China',
          },
          {
            url: 'https://static.cpgroup.top/product/nft/img-nft7.png',
            type: 'image',
            text: 'NFT Series 7',
            label: '搜索第一',
            country: 'China',
          },
          {
            url: 'https://static.cpgroup.top/product/nft/img-nft8.png',
            type: 'image',
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
            url: 'https://static.videezy.com/system/resources/previews/000/040/953/original/5_04_10_19.mp4',
            type: 'video',
            text: 'test video 2',
            label: '限定',
            country: 'China',
          },
          {
            url: 'https://static.cpgroup.top/product/water/img-water1.png',
            type: 'image',
            text: '纯悦矿泉水',
            label: '销量最佳',
            country: 'China',
          },
          {
            url: 'https://static.cpgroup.top/product/water/img-water2.png',
            type: 'image',
            text: '华润怡宝饮用纯净水',
            label: '销量最佳',
            country: 'Thailand',
          },
          {
            url: 'https://static.cpgroup.top/product/water/img-water3.png',
            type: 'image',
            text: '今麦郎饮用天然水',
            label: '',
            country: 'China',
          },
          {
            url: 'https://static.cpgroup.top/product/water/img-water4.png',
            type: 'image',
            text: '景田百岁山天然矿泉水',
            label: '',
            country: 'Thailand',
          },
          {
            url: 'https://static.cpgroup.top/product/water/img-water5.png',
            type: 'image',
            text: '均瑶恩赐饮用天然矿泉水',
            label: '',
            country: 'Thailand',
          },
          {
            url: 'https://static.cpgroup.top/product/water/img-water6.png',
            type: 'image',
            text: '康师傅包装饮用水',
            label: '精选',
            country: 'England',
          },
          {
            url: 'https://static.cpgroup.top/product/water/img-water7.png',
            type: 'image',
            text: '农夫山泉饮用天然水',
            label: '限定',
            country: 'Thailand',
          },
          {
            url: 'https://static.cpgroup.top/product/water/img-water8.png',
            type: 'image',
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
            url: 'https://static.cpgroup.top/product/dumpling/img-dumpling1.png',
            type: 'image',
            text: '鸡肉时蔬饺',
            label: '搜索第一',
            country: 'China',
          },
          {
            url: 'https://static.cpgroup.top/product/dumpling/img-dumpling2.png',
            type: 'image',
            text: '椒麻鸡肉饺',
            label: '',
            country: 'China',
          },
          {
            url: 'https://static.cpgroup.top/product/dumpling/img-dumpling3.png',
            type: 'image',
            text: '青菜鲜肉饺',
            label: '限定',
            country: 'China',
          },
          {
            url: 'https://static.cpgroup.top/product/dumpling/img-dumpling4.png',
            type: 'image',
            text: '墨鱼芹香饺',
            label: '',
            country: 'China',
          },
          {
            url: 'https://static.cpgroup.top/product/dumpling/img-dumpling5.png',
            type: 'image',
            text: '日式饺子',
            label: '新品',
            country: 'China',
          },
          {
            url: 'https://static.cpgroup.top/product/dumpling/img-dumpling6.png',
            type: 'image',
            text: '香菜肉圆水饺',
            label: '精选',
            country: 'China',
          },
          {
            url: 'https://static.cpgroup.top/product/dumpling/img-dumpling7.png',
            type: 'image',
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
            url: 'https://static.cpgroup.top/product/honey/img-product1.png',
            type: 'image',
            text: '森蜂园-蜂王浆',
            label: '',
            country: 'Thailand',
          },
          {
            url: 'https://static.cpgroup.top/product/honey/img-product2.png',
            type: 'image',
            text: '蜂胶银杏软胶囊',
            label: '',
            country: 'Thailand',
          },
          {
            url: 'https://static.cpgroup.top/product/honey/img-product3.png',
            type: 'image',
            text: '茶花蜂花粉',
            label: '',
            country: 'Thailand',
          },
          {
            url: 'https://static.cpgroup.top/product/honey/img-product4.png',
            type: 'image',
            text: '长白山椴树原蜜',
            label: '限定',
            country: 'Thailand',
          },
          {
            url: 'https://static.cpgroup.top/product/honey/img-product5.png',
            type: 'image',
            text: '1000米长白山椴树原...',
            label: '搜索第一',
            country: 'England',
          },
          {
            url: 'https://static.cpgroup.top/product/honey/img-product6.png',
            type: 'image',
            text: '多花蜂蜜 （勺蜜）',
            label: '',
            country: 'England',
          },
          {
            url: 'https://static.cpgroup.top/product/honey/img-product7.png',
            type: 'image',
            text: '长白山紫椴蜂蜜（勺蜜）',
            label: '',
            country: 'England',
          },
          {
            url: 'https://static.cpgroup.top/product/honey/img-product8.png',
            type: 'image',
            text: '长白山椴树蜂蜜礼盒',
            label: '新品',
            country: 'England',
          },
          {
            url: 'https://static.cpgroup.top/product/honey/img-product9.png',
            type: 'image',
            text: '森蜂园上海蜂蜜礼盒',
            label: '限定',
            country: 'England',
          },
          {
            url: 'https://static.cpgroup.top/product/honey/img-product10.png',
            type: 'image',
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
