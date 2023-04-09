<template>
  <v-menu offset-y content-class="elevation-0" rounded="14">
    <template v-slot:activator="{ on, attrs }">
      <div class="language-setting" v-bind="attrs" v-on="on">
        <span :class="$t('flag')"></span>
        <v-icon>mdi-chevron-down</v-icon>
      </div>
    </template>
    <v-list dense>
      <v-list-item-group color="primary" data-test-id="language-menu">
        <v-list-item class="pr-2 pl-2" @click="changeLang('zh-CN', '中文', 'cn')">
          <v-list-item-content class="pa-0">
            <div class="language-selection">
              <span class="fi fi-cn"></span>
              <span class="language-text">简体中文</span>
            </div>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="pr-2 pl-2" @click="changeLang('en-US', 'Eng', 'en')">
          <v-list-item-content class="pa-0">
            <div class="language-selection">
              <span class="fi fi-us"></span>
              <span class="language-text">English</span>
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  data() {
    return {
      lang: '中文',
    };
  },
  methods: {
    changeLang(locale, lang, flag) {
      this.$i18n.locale = locale;
      this.$emit('change-lang', locale);
      this.flag = flag;
      this.$vuetify.lang.current = locale === 'zh-CN' ? 'zhHans' : 'en';
      document.title = this.$t('title');
    },
  },
};
</script>

<style lang="scss" scoped>
.language-selection {
  display: flex;
  justify-content: left;
  align-items: center;
  .language-text {
    display: inline-block;
    vertical-align: middle;
    line-height: normal;
    font-size: 14px;
    margin-left: 4px;
  }
}

.language-setting {
  display: flex;
  align-self: center;
  margin-right: 10px;
}
</style>
