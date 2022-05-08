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
const galleryData = require('../data/galleryData');

export default {
  name: 'RollingGallery',
  data: () => ({
    expandStyle: 'padding: 3px;',
    closeStyle: 'min-width: 0px; padding: 3px;',
    galleryData,
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
