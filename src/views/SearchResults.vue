<template>
  <div>
    <v-row>
      <v-col cols="2"> </v-col>
      <v-col cols="8">
        <div class="search-results-title">{{ this.searchText }} -- 搜索结果</div>
        <div class="search-results-filter">
          <div class="search-results-num">共找到{{ this.searchResults.length }}条结果</div>
          <v-row>
            <v-chip-group class="filter-button" mandatory active-class="primary--text">
              <v-chip v-for="category in categories" :key="category" @click="filter(category)">
                {{ category }}
              </v-chip>
            </v-chip-group>
          </v-row>
        </div></v-col
      >
      <v-col cols="2"> </v-col>
    </v-row>

    <div v-for="item in this.filteredResults.slice(pageNumber * 10 - 10, pageNumber * 10)" :key="item.id">
      <v-card
        class="search-results-card mx-auto pa-md-4"
        max-width="1000"
        :hover="true"
        @click="link(item.tag, item.id)"
      >
        <v-card-text>
          <p class="text-h4 text--primary">{{ item.title }}</p>
          <p>{{ item.department }} | {{ item.time }}</p>
          <v-row no-gutters>
            <div class="text--primary" style="width: 700px">
              {{ item.responsibility || item.content }}
            </div>
          </v-row>
        </v-card-text>
      </v-card>
    </div>

    <div class="search-results-none" v-show="this.filteredResults.length === 0">暂无相关信息</div>
    <div class="page-pagination" v-show="this.filteredResults.length !== 0">
      <v-pagination
        v-model="pageNumber"
        total-visible="10"
        :length="getPageLength()"
        @input="handlePageChange"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
const jobs = require('../data/career');
const projects = require('../data/project');

export default {
  data() {
    return {
      searchText: this.$route.query.search,
      searchResults: [],
      filteredResults: [],
      jobs,
      pageNumber: 1,
      categories: ['所有', '职位', '项目'],
    };
  },
  created() {
    // matching job results
    for (let i = 0; i < jobs.length; i += 1) {
      if (jobs[i].title.indexOf(this.searchText) !== -1) {
        this.searchResults.push(jobs[i]);
      }
    }
    // matching project results
    for (let i = 0; i < projects.length; i += 1) {
      if (projects[i].title.indexOf(this.searchText) !== -1) {
        this.searchResults.push(projects[i]);
      }
    }
    if (this.searchText === null) {
      this.searchResults = jobs;
      this.searchResults.push(projects);
    }
    this.filteredResults = this.searchResults;
    // save results to session storage
    sessionStorage.searchText = this.searchText;
    sessionStorage.searchResults = JSON.stringify(this.searchResults);
    this.pageNumber = parseInt(this.$route.query.page, 10) || 1;
  },
  mounted() {
    // retrive data from session storage
    if (sessionStorage.searchText) {
      this.searchText = sessionStorage.searchText;
    }
    if (sessionStorage.searchResults) {
      this.searchResults = JSON.parse(sessionStorage.searchResults);
    }
  },
  // force refresh the page when at the same route
  beforeRouteUpdate(to, from, next) {
    next();
    this.$router.go();
  },
  methods: {
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
    getPageLength() {
      return Math.ceil(this.filteredResults.length / 10);
    },
    // filters the search results
    filter(input) {
      if (input !== '所有') {
        this.filteredResults = this.searchResults.filter((item) => {
          return item.tag === input;
        });
      } else {
        this.filteredResults = this.searchResults;
      }
      // navigates to the first page when filter button is clicked
      this.pageNumber = 1;
      this.$router.push({
        path: this.$router.currentRoute,
        query: {
          page: this.pageNumber,
        },
      });
    },
    // redirect to the corresponding page when user clicks on card item
    link(tag, id) {
      if (tag === '职位') {
        this.$router.push({
          path: '/recruitmentDetail',
          query: { id: id.substring(1) },
        });
      }
      if (tag === '项目') {
        this.$router.push({
          path: '/projectInfo',
          query: { id: id.substring(1) },
        });
      }
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
  margin-left: 10px;
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
