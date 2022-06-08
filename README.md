# 正大创新团队官方网站前端项目

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=CPG-Innovation-Team_cpg-innovation-team-website&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=CPG-Innovation-Team_cpg-innovation-team-website) 
[![CircleCI](https://circleci.com/gh/CPG-Innovation-Team/cpg-innovation-team-website/tree/master.svg?style=svg)](https://circleci.com/gh/CPG-Innovation-Team/cpg-innovation-team-website/tree/master)
[![codecov](https://codecov.io/gh/CPG-Innovation-Team/cpg-innovation-team-website/branch/master/graph/badge.svg?token=CA7DJRBY7X)](https://codecov.io/gh/CPG-Innovation-Team/cpg-innovation-team-website)

## 安装

需要安装 [Node.js](https://nodejs.org) 14.17版本
    
## 本地运行

克隆项目

```bash
  git clone https://github.com/CPG-Innovation-Team/cpg-innovation-team-website.git
```

进入项目目录

```bash
  cd cpg-innovation-team-website
```

首次运行或有依赖变更时执行安装

```bash
  npm install
```

启动本地服务

```bash
  npm run serve
```

编译生产环境代码包

```bash
  npm run build
```

## 测试

执行单元测试

```bash
  npm run test:unit
```

执行代码校验

```bash
  npm run lint
```

## 发布

1. 通过创建pull request提交代码
2. PR合并进master后，CircleCI自动部署至AWS服务器

**CircleCI配置文件目录：** .circleci/config.yml

**CircleCI项目地址：** [cpg-innovation-team-website](https://app.circleci.com/pipelines/github/CPG-Innovation-Team/cpg-innovation-team-website)

## 环境变量

在.env文件中添加以下环境变量

`VUE_APP_ROLLBAR_ACCESS_TOKEN` : [rollbar](https://rollbar.com/casualbill/all/items/?sort=%5Bobject%20Object%5D&status=active&date_from=&date_to=&environments=unknown&activated_to=&framework=&levels=40&levels=50&activated_from=&offset=0&timezone=America%2FToronto&assigned_user=&date_filtering=seen&projects=520818&query=&enc_query=)密钥

`VUE_APP_HTTP_URL` : API地址

## 文件目录结构

```
.
├── README.md   项目说明文档
├── babel.config.js     Babel配置文件
├── jest.config.js      Jest单元测试配置文件
├── package-lock.json   项目依赖版本配置文件
├── package.json    项目配置文件
├── public
│   ├── favicon.ico     网站图标
│   └── index.html      网站HTML模板
├── src
│   ├── App.vue     全局页面
│   ├── Event.js    事件总线文件
│   ├── assets      静态资源文件目录，含图片、视频等
│   ├── components      公用组件目录
│   │   ├── AdminNav.vue    后管顶部导航栏
│   │   ├── Charts
│   │   │   └── Traffic.vue
│   │   ├── Editor.vue      富文本编辑器组件
│   │   ├── Footer.vue      主页底部导航栏
│   │   ├── GalleryLabel.vue    图片瀑布流标签组件
│   │   ├── HeaderNav.vue   主页顶部导航栏
│   │   └── RollingGallery.vue      主页图片瀑布流组件
│   ├── data    数据文件目录
│   ├── lang    语言文件目录
│   ├── main.js     项目入口文件
│   ├── plugins     插件目录
│   │   ├── vue-i18n.js     i18n国际化配置文件
│   │   └── vuetify.js      UI组件库Vuetify配置文件
│   ├── router.js       路由文件
│   ├── util.js     公用方法文件
│   └── views       页面目录
│       ├── AboutUs.vue     关于我们页面
│       ├── Blog.vue    博客页面
│       ├── BlogDetail.vue      博客详情页面
│       ├── Homepage.vue    主页
│       ├── ProjectInfo.vue     项目介绍页面
│       ├── RecruitmentDetail.vue   招聘详情页面
│       ├── RecruitmentInfo.vue     招聘信息页面
│       ├── SearchResults.vue       搜索结果页面
│       ├── TeamInfo.vue        团队介绍页面
│       └── admin   后台管理系统目录
│           ├── AccessDenied.vue    无权限访问页面
│           ├── Announcement.vue    公告页面
│           ├── Approval.vue    审核页面
│           ├── ApproveBlog.vue     审核博客页面
│           ├── Blogs.vue   博客管理页面
│           ├── ChangePassword.vue      修改密码页面
│           ├── CreateBlog.vue      创建博客页面
│           ├── Dashboard.vue   仪表盘页面
│           ├── Login.vue       登陆页面
│           ├── Permission.vue  权限管理页面
│           ├── Profile.vue     用户资料页面
│           ├── Signup.vue      注册页面
│           ├── UpdateBlog.vue  更新博客页面
│           └── Users.vue       用户管理页面
├── tests
│   ├── e2e     e2e测试目录
│   └── unit    单元测试目录
└── vue.config.js
```

## 技术栈

**UI组件库:** [Vuetify](https://vuetifyjs.com/zh-Hans/), [百度地图](https://dafrok.github.io/vue-baidu-map/#/zh/index)

**富文本编辑器:** [TinyMCE](https://www.tiny.cloud/)

**集成工具:** [CircleCI](https://app.circleci.com/pipelines/github/CPG-Innovation-Team/cpg-innovation-team-website), [SonarCloud](https://sonarcloud.io/project/overview?id=CPG-Innovation-Team_cpg-innovation-team-website), [Codecov](https://app.codecov.io/gh/CPG-Innovation-Team/cpg-innovation-team-website)
