import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './views/Homepage.vue';
import AboutUs from './views/AboutUs.vue';
import ProjectInfo from './views/ProjectInfo.vue';
import TeamInfo from './views/TeamInfo.vue';
import RecruitmentInfo from './views/RecruitmentInfo.vue';
import RecruitmentDetail from './views/RecruitmentDetail.vue';
import SearchResults from './views/SearchResults.vue';
import Blog from './views/Blog.vue';
import BlogDetail from './views/BlogDetail.vue';
import Login from './views/admin/Login.vue';
import Signup from './views/admin/Signup.vue';
import Dashboard from './views/admin/Dashboard.vue';
import Blogs from './views/admin/Blogs.vue';
import Users from './views/admin/Users.vue';
import CreateBlog from './views/admin/CreateBlog.vue';
import Approval from './views/admin/Approval.vue';
import ApproveBlog from './views/admin/ApproveBlog.vue';
import Profile from './views/admin/Profile.vue';
import Announcement from './views/admin/Announcement.vue';
import UpdateBlog from './views/admin/UpdateBlog.vue';
import Permission from './views/admin/Permission.vue';
import ChangePassword from './views/admin/ChangePassword.vue';
import AccessDenied from './views/admin/AccessDenied.vue';

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
  {
    path: '/searchResults',
    name: 'SearchResults',
    component: SearchResults,
  },
  {
    path: '/blog',
    name: 'Blog',
    component: Blog,
  },
  {
    path: '/blogDetail',
    name: 'BlogDetail',
    component: BlogDetail,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/admin/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/admin/blogs',
    name: 'Blogs',
    component: Blogs,
  },
  {
    path: '/admin/blogs/create',
    name: 'CreateBlog',
    component: CreateBlog,
  },
  {
    path: '/admin/approve',
    name: 'Approval',
    component: Approval,
  },
  {
    path: '/admin/approveBlog',
    name: 'ApproveBlog',
    component: ApproveBlog,
  },
  {
    path: '/admin/users',
    name: 'Users',
    component: Users,
  },
  {
    path: '/admin/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/admin/announcement',
    name: 'Announcement',
    component: Announcement,
  },
  {
    path: '/admin/blogs/update',
    name: 'UpdateBlog',
    component: UpdateBlog,
  },
  {
    path: '/admin/permission',
    name: 'Permission',
    component: Permission,
  },
  {
    path: '/admin/changePwd',
    name: 'ChangePassword',
    component: ChangePassword,
  },
  {
    path: '/admin/accessDenied',
    name: 'AccessDenied',
    component: AccessDenied,
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

// handle navigation duplication for router push
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

export default router;
