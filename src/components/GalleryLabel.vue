<template>
  <div>
    <v-hover v-slot:default="{ hover }" open-delay="200">
      <div>
        <div v-if="label !== ''">
          <v-btn class="gallery-item-label" x-small :style="hover ? expandStyle : closeStyle">
            <v-icon x-small> {{ iconTable[label] }} </v-icon>
            <v-scroll-x-transition>
              <span v-if="hover" class="ml-2">{{ label }}</span>
            </v-scroll-x-transition>
          </v-btn>
        </div>
      </div>
    </v-hover>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
    },
  },
  data() {
    return {
      expandStyle: 'padding: 3px;',
      closeStyle: 'min-width: 0px; padding: 3px;',
      iconTable: {
        精选: 'mdi-star',
        限定: 'mdi-shimmer',
        销量最佳: 'mdi-license',
        搜索第一: 'mdi-fire',
        新品: 'mdi-new-box',
      },
    };
  },
};
</script>

<style scoped>
.gallery-item-label {
  position: absolute;
  background-color: whitesmoke;
  top: 8px;
  left: 8px;
  z-index: 99;
  height: 15px !important;
}
</style>
