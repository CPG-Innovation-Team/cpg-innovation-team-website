<template>
  <div>
    <div class="search-results-title">{{ this.searchText }} -- 搜索结果</div>
    <div class="search-results-filter">
      <div class="search-results-num">共找到{{ this.searchResults.length }}条结果</div>
      <v-row>
        <div v-for="category in categories" :key="category.id">
          <v-col>
            <v-btn class="search-results-button" depressed color="primary"> {{ category }} </v-btn>
          </v-col>
        </div>
      </v-row>
    </div>

    <div v-for="item in this.searchResults.slice(pageNumber * 10 - 10, pageNumber * 10)" :key="item.id">
      <v-card class="search-results-card mx-auto pa-md-4" max-width="1000">
        <v-card-text>
          <p class="text-h4 text--primary">{{ item.title }}</p>
          <p>{{ item.department }} | {{ item.city }} | {{ item.type }} | {{ item.time }}</p>
          <v-row no-gutters>
            <div class="text--primary" style="width: 700px">
              {{ item.abstract }}
            </div>
          </v-row>
        </v-card-text>
      </v-card>
    </div>

    <div class="search-results-none" v-show="this.searchResults.length === 0">暂无相关信息</div>
    <div class="page-pagination" v-show="this.searchResults.length !== 0">
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
const jobs = require('../career');

export default {
  data() {
    return {
      searchText: this.$route.query.search,
      searchResults: [],
      jobs,
      pageNumber: 1,
      categories: ['所有', '职位', '项目'],
    };
  },
  created() {
    // matching results
    for (let i = 0; i < jobs.length; i += 1) {
      if (jobs[i].title.indexOf(this.searchText) !== -1) {
        this.searchResults.push(jobs[i]);
      }
    }
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
      return Math.ceil(this.searchResults.length / 10);
    },
  },
};
</script>

<style lang="scss" scoped>
.search-results-title {
  margin-left: 230px;
  margin-top: 80px;
  margin-bottom: 30px;
  font-size: 30px;
  font-style: italic;
  font-weight: bold;
  color: black;
}

.search-results-filter {
  margin-left: 220px;

  .search-results-num {
    font-size: 14px;
  }

  .search-results-button {
    margin-top: 10px;
  }
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
