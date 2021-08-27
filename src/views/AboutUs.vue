<template>
  <div>
    <HeaderNav :color="'black'" />
    <v-main>
      <div class="header">
        <v-container>
          <v-row>
            <v-col>
              <div class="about-title">联系我们</div>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <span>Address</span>
              <div class="detail">上海市静安区新疆路518号</div>
            </v-col>
            <v-col>
              <span>Phone</span>
              <div class="detail">021-8888 8888</div>
            </v-col>
            <v-col>
              <span>E-mail</span>
              <div class="detail">contact@example.com</div>
            </v-col>
          </v-row>
        </v-container>
      </div>

      <div class="address-container">
        <baidu-map class="map" :center="windowCenter" :zoom="16">
          <bm-marker :position="markerCenter" @click="openInfoWindow(true)">
            <bm-info-window :show="showInfoWindow" @close="openInfoWindow(false)" @open="openInfoWindow(true)">
              <div class="address-window">
                <p>正大创新团队上海办公室</p>
                <a
                  href="https://map.baidu.com/poi/wework(%E6%96%B0%E7%96%86%E8%B7%AF518%E5%8F%B7)/@13522476.695830092,3642838.087485785,17.72z
                ?uid=09d840c7bf78285bb64f5498&ugc_type=3&ugc_ver=1&device_ratio=2&compat=1&querytype=detailConInfo&da_src=shareurl"
                >
                  到这里去
                </a>
              </div>
            </bm-info-window>
          </bm-marker>
        </baidu-map>
      </div>

      <div class="feedback-form">
        <div class="pl-3" style="font-size: 1.12rem; font-weight: 700">Write to us</div>
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="6" class="pb-0">
                <v-text-field dense hide-details label="Name" outlined></v-text-field>
              </v-col>
              <v-col cols="6" class="pb-0">
                <v-text-field dense hide-details label="E-mail" outlined></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-textarea dense hide-details outlined label="Website" hint="Hint text"></v-textarea>
              </v-col>
            </v-row>
          </v-container>
          <v-btn depressed class="ml-3" color="black"><span style="color: white">Send</span></v-btn>
        </v-form>
      </div>
    </v-main>
  </div>
</template>

<script>
import HeaderNav from '../components/HeaderNav.vue';

export default {
  data() {
    return {
      windowCenter: { lng: 121.473138, lat: 31.249951 },
      markerCenter: { lng: 121.473138, lat: 31.248893 },
      showInfoWindow: true,
    };
  },
  components: {
    HeaderNav,
  },
  methods: {
    openInfoWindow(input) {
      this.showInfoWindow = input;
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  margin: 40px 150px;
  .about-title {
    font-size: 1.35rem;
    font-weight: 800;
  }
  span {
    color: gray;
    font-size: 0.88rem;
    font-weight: 700;
  }
  .detail {
    padding-top: 8px;
  }
}

.feedback-form {
  margin: 80px auto;
  width: 550px;
}

.address-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row wrap;

  .map {
    width: 100%;
    height: 300px;
    margin: 10px;
  }

  .address-window {
    text-align: center;
    font-size: 15px;
  }

  .address-description {
    margin: 50px;
    line-height: 30px;

    .address-sub-title {
      font-size: 18px;
    }

    .address-body {
      font-size: 14px;
    }
  }
}
</style>
