<template>
  <div>
    <v-app>
      <v-container>
        <v-row>
          <v-col cols="1"></v-col>
          <v-col cols="8">
            <div class="search-results-title">{{ this.searchText }} -- 搜索结果</div>
            <div class="search-results-filter">
              <div class="search-results-num">
                共找到{{ this.searchResults.length }}条结果, 该标签显示{{ this.filteredResults.length }}条结果
              </div>
              <v-row>
                <v-chip-group class="filter-button" mandatory active-class="primary--text">
                  <v-chip
                    v-for="category in categories"
                    :key="category"
                    @click="filteredResults = filter(searchResults, category)"
                  >
                    {{ category }}
                  </v-chip>
                </v-chip-group>
              </v-row>
            </div></v-col
          >
        </v-row>
        <div
          v-for="item in util.sort(this.filteredResults).slice(pageNumber * 10 - 10, pageNumber * 10)"
          :key="item.id"
        >
          <v-card
            class="search-results-card mx-auto pa-md-4"
            max-width="1000"
            :hover="true"
            @click="link(item.tag, item.id)"
          >
            <v-card-text>
              <p class="text-h4 text--primary">{{ item.title }}</p>
              <p>{{ item.department }} | {{ item.time }}</p>
              <v-row class="text--primary" no-gutters>
                {{ (item.responsibility || item.content).substring(0, 200) }}...
              </v-row>
            </v-card-text>
          </v-card>
        </div>

        <div class="search-results-none" v-show="this.filteredResults.length === 0">暂无相关信息</div>
        <div class="page-pagination" v-show="this.filteredResults.length !== 0">
          <v-pagination
            v-model="pageNumber"
            total-visible="10"
            :length="util.getPageLength(this.filteredResults)"
            @input="handlePageChange"
          ></v-pagination>
        </div>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import util from '../util';

const jobs = require('../data/career');
const projects = require('../data/project');

export default {
  data() {
    return {
      util,
      searchText: this.$route.query.search,
      searchResults: [],
      filteredResults: [],
      jobs,
      pageNumber: 1,
      categories: ['所有', '职位', '项目'],
    };
  },
  created() {
    // matching search results
    this.searchResults = [
      ...this.getSearchResults(jobs, this.searchText),
      ...this.getSearchResults(projects, this.searchText),
    ];
    this.filteredResults = this.searchResults;
    this.pageNumber = parseInt(this.$route.query.page, 10) || 1;
  },
  methods: {
    getSearchResults(arr, input) {
      return arr.filter((item) => {
        return item.title.indexOf(input) !== -1;
      });
    },
    handlePageChange(value) {
      this.pageNumber = value;
      this.$router.push({
        path: '/searchResults',
        query: {
          search: this.searchText,
          page: this.pageNumber,
        },
      });
    },
    // filters the search results
    filter(arr, input) {
      // navigates to the first page when filter() is clicked
      if (this.pageNumber !== 1) this.handlePageChange(1);
      if (input !== '所有') {
        return arr.filter((item) => {
          return item.tag === input;
        });
      }
      return arr;
    },
    // redirect to the corresponding page when user clicks on card item
    getRouterLink(tag) {
      if (tag === '职位') {
        return '/recruitmentDetail';
      }
      if (tag === '项目') {
        return '/projectInfo';
      }
      return '/error';
    },
    link(tag, id) {
      this.$router.push({
        path: this.getRouterLink(tag),
        query: { id: id.substring(1) },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.search-results-title {
  margin-top: 80px;
  margin-bottom: 30px;
  font-size: 30px;
  font-weight: bold;
  color: black;
}

.search-results-num {
  margin-left: 5px;
  font-size: 14px;
}

.filter-button {
  margin-top: 10px;
  margin-left: 10px;
}

.search-results-card {
  margin-top: 30px;
}

.search-results-none {
  text-align: center;
  font-size: 25px;
  color: gray;
  margin-top: 80px;
}

.page-pagination {
  margin-top: 50px;
  margin-bottom: 100px;
}
</style>
