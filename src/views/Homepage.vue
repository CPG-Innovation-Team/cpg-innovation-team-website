<template>
  <div>
    <v-carousel v-model="model" cycle :interval="4000" delimiter-icon="mdi-minus" height="400" show-arrows-on-hover>
      <v-carousel-item
        v-for="(img, i) in carouselsImg"
        :key="i"
        v-bind:src="img"
        reverse-transition="fade-transition"
        transition="fade-transition"
      >
        <v-img contain v-bind:src="img.src" />
      </v-carousel-item>
    </v-carousel>

    <v-container>
      <h1 class="news-header">News</h1>
      <v-row>
        <v-col md="4" sm="6" xs="12">
          <v-container>
            <v-card>
              <v-img src="https://picsum.photos/500/300?image=1" />
              <v-card-title>AAA</v-card-title>
              <v-card-text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vestibulum ac nibh a malesuada. Etiam a
                arcu ullamcorper, luctus dui tristique, varius magna.
              </v-card-text>
              <v-card-text>
                <v-chip><a>More</a></v-chip>
              </v-card-text>
            </v-card>
          </v-container>
        </v-col>
        <v-col md="4" sm="6" xs="12">
          <v-container>
            <v-card>
              <v-img src="https://picsum.photos/500/300?image=20" />
              <v-card-title>BBB</v-card-title>
              <v-card-text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vestibulum ac nibh a malesuada. Etiam a
                arcu ullamcorper, luctus dui tristique, varius magna.
              </v-card-text>
              <v-card-text>
                <v-chip><a>More</a></v-chip>
              </v-card-text>
            </v-card>
          </v-container>
        </v-col>
        <v-col md="4" sm="6" xs="12">
          <v-container fluid>
            <v-img src="https://picsum.photos/500/300?image=30" />
            <h2>CCC</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vestibulum ac nibh a malesuada. Etiam a arcu
              ullamcorper, luctus dui tristique, varius magna.
              <v-chip><a>More</a></v-chip>
            </p>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
const img1 = require('../assets/carousel-img1.jpeg');
const img2 = require('../assets/carousel-img2.jpeg');
const img3 = require('../assets/carousel-img3.jpeg');
const img4 = require('../assets/carousel-img4.jpeg');
const img5 = require('../assets/carousel-img5.jpeg');
const img6 = require('../assets/carousel-img6.jpeg');

export default {
  name: 'Home',
  data: () => ({
    model: 0,
    carouselsImg: [img1, img2, img3, img4, img5, img6],
  }),
};
</script>

<style scoped>
.news-header {
  text-align: center;
}
</style>
