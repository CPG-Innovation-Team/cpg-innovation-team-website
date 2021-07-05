<template>
  <div>
    <div class="career-title">招聘信息</div>
    <v-app>
      <v-container>
        <v-row>
          <v-col :cols="8">
            <v-row>
              <v-spacer></v-spacer>
              <v-select
                class="career-dropdown"
                :items="positions"
                filled
                label="职位"
                v-model="positionVal"
                @change="filter"
                dense
              ></v-select>
              <v-spacer></v-spacer>
              <v-select
                class="career-dropdown"
                :items="cities"
                filled
                label="城市"
                v-model="cityVal"
                @change="filter"
                dense
              ></v-select>
              <v-spacer></v-spacer>
              <v-select
                class="career-dropdown"
                :items="types"
                filled
                label="类型"
                v-model="typeVal"
                @change="filter"
                dense
              ></v-select> </v-row
          ></v-col>
          <v-col :cols="4"> </v-col>
        </v-row>

        <div class="job-listing-title">最新发布</div>
        <div class="job-listing">
          <div v-for="job in this.sort(this.filteredJobs).slice(pageNumber * 10 - 10, pageNumber * 10)" :key="job.id">
            <v-card class="job-listing-card mx-auto pa-md-4" max-width="1000">
              <v-card-text>
                <p class="text-h4 text--primary">{{ job.title }}</p>
                <p>{{ job.department }} | {{ job.city }} | {{ job.type }} | {{ job.time }}</p>
                <v-row no-gutters>
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
            :length="getPageLength()"
            @input="handlePageChange"
          ></v-pagination>
        </div>
      </v-container>
    </v-app>
  </div>
</template>

<script>
const jobs = require('../data/career');

export default {
  data: () => ({
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
  created() {
    this.filteredJobs = this.sort(jobs);
    this.pageNumber = parseInt(this.$route.query.page, 10) || 1;
  },
  methods: {
    filter() {
      // when filtered, navigate to the first page
      this.pageNumber = 1;
      this.$router.push({
        path: '/recruitmentInfo',
        query: {
          page: this.pageNumber,
        },
      });
      this.filteredJobs = this.jobs.filter((job) => {
        if (this.positionVal !== '全部职位' && this.cityVal !== '全部城市' && this.typeVal !== '全部类型') {
          return job.position === this.positionVal && job.city === this.cityVal && job.type === this.typeVal;
        }
        if (this.positionVal !== '全部职位' && this.cityVal !== '全部城市') {
          return job.position === this.positionVal && job.city === this.cityVal;
        }
        if (this.positionVal !== '全部职位' && this.typeVal !== '全部类型') {
          return job.position === this.positionVal && job.type === this.typeVal;
        }
        if (this.cityVal !== '全部城市' && this.typeVal !== '全部类型') {
          return job.city === this.cityVal && job.type === this.typeVal;
        }
        if (this.typeVal !== '全部类型') {
          return job.type === this.typeVal;
        }
        if (this.positionVal !== '全部职位') {
          return job.position === this.positionVal;
        }
        if (this.cityVal !== '全部城市') {
          return job.city === this.cityVal;
        }
        return jobs;
      });
    },
    getPageLength() {
      return Math.ceil(this.filteredJobs.length / 10);
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
    sort(arr) {
      const temp = arr.concat([]);
      temp.sort((a, b) => {
        const t1 = new Date(Date.parse(a.time.replace(/-/g, '/')));
        const t2 = new Date(Date.parse(b.time.replace(/-/g, '/')));
        return t2.getTime() - t1.getTime();
      });
      return temp;
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

.career-dropdown {
  width: 80px;
}

.job-listing-title {
  font-size: 30px;
  color: black;
  margin-top: 50px;
  margin-left: 7%;
}

.job-listing-card {
  margin-top: 30px;
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
