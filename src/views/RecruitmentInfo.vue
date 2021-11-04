<template>
  <div>
    <HeaderNav :color="'black'" />

    <v-main>
      <div class="career-title">招聘信息</div>

      <v-container>
        <v-row class="dropdown-container">
          <v-col class="d-flex" cols="6" md="3">
            <v-select
              class="career-dropdown"
              :items="positions"
              filled
              label="职位"
              v-model="positionVal"
              @change="filteredJobs = filter(jobs, positionVal, cityVal, typeVal)"
              dense
            ></v-select>
          </v-col>
          <v-col class="d-flex" cols="6" md="3">
            <v-select
              class="career-dropdown"
              :items="cities"
              filled
              label="城市"
              v-model="cityVal"
              @change="filteredJobs = filter(jobs, positionVal, cityVal, typeVal)"
              dense
            ></v-select>
          </v-col>
          <v-col class="d-flex" cols="6" md="3">
            <v-select
              class="career-dropdown"
              :items="types"
              filled
              label="类型"
              v-model="typeVal"
              @change="filteredJobs = filter(jobs, positionVal, cityVal, typeVal)"
              dense
            ></v-select>
          </v-col>
        </v-row>

        <div class="job-listing-title">最新发布</div>
        <div class="job-listing">
          <div v-for="job in util.sort(this.filteredJobs).slice(pageNumber * 10 - 10, pageNumber * 10)" :key="job.id">
            <v-card class="job-listing-card mx-auto pa-md-4" max-width="1000">
              <v-card-text>
                <p class="text-h4 text--primary">{{ job.title }}</p>
                <p>{{ job.department }} | {{ job.city }} | {{ job.type }} | {{ job.time }}</p>
                <v-row class="job-content-container" no-gutters>
                  <v-col :cols="8">
                    <div class="text--primary">{{ job.responsibility.substring(0, 120) }}...</div>
                  </v-col>
                  <v-col class="text-right" :cols="4">
                    <router-link :to="{ path: '/recruitmentDetail', query: { id: job.id.substring(1) } }">
                      <v-btn depressed color="primary"> 查看详情 </v-btn>
                    </router-link>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </div>
          <div class="job-listing-none" v-show="this.filteredJobs.length === 0">暂无职位信息</div>
        </div>

        <div class="page-pagination" v-show="this.filteredJobs.length !== 0">
          <v-pagination
            v-model="pageNumber"
            total-visible="10"
            :length="util.getPageLength(this.filteredJobs)"
            @input="handlePageChange"
          ></v-pagination>
        </div>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import util from '../util';
import HeaderNav from '../components/HeaderNav.vue';

const jobs = require('../data/career');

export default {
  data: () => ({
    util,
    positionVal: '全部职位',
    cityVal: '全部城市',
    typeVal: '全部类型',
    positions: ['全部职位', '技术类', '人力资源类', '产品类', '设计类'],
    cities: ['全部城市', '上海', '深圳', '广州', '北京'],
    types: ['全部类型', '校园招聘', '社会招聘'],
    pageNumber: 1,
    jobs,
    filteredJobs: [],
  }),
  components: {
    HeaderNav,
  },
  created() {
    this.filteredJobs = util.sort(jobs);
    this.pageNumber = parseInt(this.$route.query.page, 10) || 1;
  },
  methods: {
    filter(arr, positionVal, cityVal, typeVal) {
      // navigates to the first page when user filters the results
      if (this.pageNumber !== 1) this.handlePageChange(1);
      return arr.filter((job) => {
        return (
          (positionVal === '全部职位' ? true : job.position === positionVal) &&
          (cityVal === '全部城市' ? true : job.city === cityVal) &&
          (typeVal === '全部类型' ? true : job.type === typeVal)
        );
      });
    },
    handlePageChange(value) {
      this.pageNumber = value;
      this.$router.push({
        path: '/recruitmentInfo',
        query: {
          page: this.pageNumber,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.career-title {
  font-size: 30px;
  font-weight: bold;
  color: black;
  margin-left: 15%;
  margin-bottom: 50px;
  margin-top: 80px;
}

.dropdown-container {
  margin-left: 4%;
  margin-right: 4%;

  .career-dropdown {
    width: 80px;
  }
}

.job-listing-title {
  font-size: 30px;
  color: black;
  margin-top: 50px;
  margin-left: 7%;
}

.job-listing-card {
  margin-top: 30px;

  .job-content-container {
    display: flex;
    align-items: center;
  }
}

.job-listing-none {
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
