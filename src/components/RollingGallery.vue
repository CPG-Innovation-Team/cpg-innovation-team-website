<template>
  <div class="rolling-gallery">
    <div class="vertical-block" v-for="(list, index) of galleryData" :key="index" :style="{ flex: list.flex }">
      <div
        class="vertical-inner-list"
        :class="{ reverse: index % 2 === 1 }"
        :style="{ animationDuration: `${list.data.length * list.flex}s` }"
      >
        <div class="gallery-item" v-for="item of list.data" :key="item.image">
          <img :src="item.image" class="gallery-image" />
          <span class="gallery-text" v-text="item.text" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RollingGallery',
  data: () => ({
    galleryData: [
      {
        flex: 2,
        data: [
          { image: 'https://static.cpgroup.top/product/pocky/img-pocky1.png', text: 'POCKY 巧克力味' },
          { image: 'https://static.cpgroup.top/product/pocky/img-pocky2.png', text: 'POCKY 草莓味' },
          { image: 'https://static.cpgroup.top/product/pocky/img-pocky3.png', text: 'POCKY 杏仁味' },
          { image: 'https://static.cpgroup.top/product/pocky/img-pocky4.png', text: 'POCKY 巧克力香蕉味' },
          { image: 'https://static.cpgroup.top/product/pocky/img-pocky5.png', text: 'POCKY 香草莓味' },
          { image: 'https://static.cpgroup.top/product/pocky/img-pocky6.png', text: 'POCKY 抹茶味' },
          { image: 'https://static.cpgroup.top/product/pocky/img-pocky7.png', text: 'POCKY 奶油曲奇味' },
        ],
      },
      {
        flex: 4,
        data: [
          { image: 'https://static.cpgroup.top/product/nft/img-nft1.png', text: 'NFT Series 1' },
          { image: 'https://static.cpgroup.top/product/nft/img-nft2.png', text: 'NFT Series 2' },
          { image: 'https://static.cpgroup.top/product/nft/img-nft3.png', text: 'NFT Series 3' },
          { image: 'https://static.cpgroup.top/product/nft/img-nft4.png', text: 'NFT Series 4' },
          { image: 'https://static.cpgroup.top/product/nft/img-nft5.png', text: 'NFT Series 5' },
          { image: 'https://static.cpgroup.top/product/nft/img-nft6.png', text: 'NFT Series 6' },
          { image: 'https://static.cpgroup.top/product/nft/img-nft7.png', text: 'NFT Series 7' },
          { image: 'https://static.cpgroup.top/product/nft/img-nft8.png', text: 'NFT Series 8' },
        ],
      },
      {
        flex: 2,
        data: [
          { image: 'https://static.cpgroup.top/product/water/img-water1.png', text: '纯悦矿泉水' },
          { image: 'https://static.cpgroup.top/product/water/img-water2.png', text: '华润怡宝饮用纯净水' },
          { image: 'https://static.cpgroup.top/product/water/img-water3.png', text: '今麦郎饮用天然水' },
          { image: 'https://static.cpgroup.top/product/water/img-water4.png', text: '景田百岁山天然矿泉水' },
          { image: 'https://static.cpgroup.top/product/water/img-water5.png', text: '均瑶恩赐饮用天然矿泉水' },
          { image: 'https://static.cpgroup.top/product/water/img-water6.png', text: '康师傅包装饮用水' },
          { image: 'https://static.cpgroup.top/product/water/img-water7.png', text: '农夫山泉饮用天然水' },
          { image: 'https://static.cpgroup.top/product/water/img-water8.png', text: '依云 evian 天然矿泉水' },
        ],
      },
      {
        flex: 3,
        data: [
          { image: 'https://static.cpgroup.top/product/dumpling/img-dumpling1.png', text: '鸡肉时蔬饺' },
          { image: 'https://static.cpgroup.top/product/dumpling/img-dumpling2.png', text: '椒麻鸡肉饺' },
          { image: 'https://static.cpgroup.top/product/dumpling/img-dumpling3.png', text: '青菜鲜肉饺' },
          { image: 'https://static.cpgroup.top/product/dumpling/img-dumpling4.png', text: '墨鱼芹香饺' },
          { image: 'https://static.cpgroup.top/product/dumpling/img-dumpling5.png', text: '日式饺子' },
          { image: 'https://static.cpgroup.top/product/dumpling/img-dumpling6.png', text: '香菜肉圆水饺' },
          { image: 'https://static.cpgroup.top/product/dumpling/img-dumpling7.png', text: '青瓜虾仁水饺' },
        ],
      },
      {
        flex: 2,
        data: [
          { image: 'https://static.cpgroup.top/product/honey/img-product1.png', text: '森蜂园-蜂王浆' },
          { image: 'https://static.cpgroup.top/product/honey/img-product2.png', text: '蜂胶银杏软胶囊' },
          { image: 'https://static.cpgroup.top/product/honey/img-product3.png', text: '茶花蜂花粉' },
          { image: 'https://static.cpgroup.top/product/honey/img-product4.png', text: '长白山椴树原蜜' },
          { image: 'https://static.cpgroup.top/product/honey/img-product5.png', text: '1000米长白山椴树原...' },
          { image: 'https://static.cpgroup.top/product/honey/img-product6.png', text: '多花蜂蜜 （勺蜜）' },
          { image: 'https://static.cpgroup.top/product/honey/img-product7.png', text: '长白山紫椴蜂蜜（勺蜜）' },
          { image: 'https://static.cpgroup.top/product/honey/img-product8.png', text: '长白山椴树蜂蜜礼盒' },
          { image: 'https://static.cpgroup.top/product/honey/img-product9.png', text: '森蜂园上海蜂蜜礼盒' },
          { image: 'https://static.cpgroup.top/product/honey/img-product10.png', text: '麦卢卡 MANUKA 蜂蜜礼盒' },
        ],
      },
    ],
  }),
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
  margin: 10px;
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
    background-color: #6666ff;
  }
  .gallery-image {
    width: 100%;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  .gallery-text {
    display: inline-block;
    padding: 0 10px 5px 10px;
    color: #fff;
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
