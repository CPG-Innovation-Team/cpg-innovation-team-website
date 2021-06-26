import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './views/Homepage.vue';
import AboutUs from './views/AboutUs.vue';
import ProjectInfo from './views/ProjectInfo.vue';
import TeamInfo from './views/TeamInfo.vue';
import RecruitmentInfo from './views/RecruitmentInfo.vue';
import RecruitmentDetail from './views/RecruitmentDetail.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/aboutUs',
    name: 'AboutUs',
    component: AboutUs,
  },
  {
    path: '/projectInfo',
    name: 'ProjectInfo',
    component: ProjectInfo,
  },
  {
    path: '/teamInfo',
    name: 'TeamInfo',
    component: TeamInfo,
  },
  {
    path: '/recruitmentInfo',
    name: 'RecruitmentInfo',
    component: RecruitmentInfo,
  },
  {
    path: '/recruitmentDetail',
    name: 'RecruitmentDetail',
    component: RecruitmentDetail,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  // add smooth scrollling to top when user navigating to a new route
  scrollBehavior() {
    return {
      x: 0,
      y: 0,
      behavior: 'smooth',
    };
  },
});

export default router;
