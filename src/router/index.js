export default [
  {
    path: '/',
    name: 'index',
    redirect: {path: '/index'}
  },
  {
    meta: {
      title: '省钱买',
      keepAlive: false,
      isBack: false,
    },
    path: '/index',
    name: 'index',
    component: resolve => require(['views/list'], resolve),
  },
  {
    meta: {
      title: '更多推荐',
      keepAlive: false,
      isBack: false,
    },
    path: '/more',
    name: 'more',
    component: resolve => require(['views/more'], resolve),
  },
  {
    meta: {
      title: '商品详情',
      keepAlive: false,
      isBack: false,
    },
    path: '/detail',
    name: 'detail',
    component: resolve => require(['views/detail'], resolve),
  },
  {
    meta: {
      title: '我的收藏',
      keepAlive: false,
      isBack: false,
    },
    path: '/collect',
    name: 'collect',
    component: resolve => require(['views/collect'], resolve),
  },
  {
    meta: {
      title: '我的',
      keepAlive: false,
      isBack: false,
    },
    path: '/mine',
    name: 'mine',
    component: resolve => require(['views/mine'], resolve),
  },
  {
    meta: {
      title: '登陆',
      keepAlive: false,
      isBack: false,
    },
    path: '/login',
    name: 'login',
    component: resolve => require(['views/login'], resolve),
  },
  {
    meta: {
      title: '搜索',
      keepAlive: false,
      isBack: false,
    },
    path: '/searchs',
    name: 'searchs',
    component: resolve => require(['views/searchs'], resolve),
  },
  {
    meta: {
      title: '更多分类',
      keepAlive: false,
      isBack: false,
    },
    path: '/recommendation',
    name: 'recommendation',
    component: resolve => require(['views/recommendation'], resolve),
  },
  {
    meta: {
      title: '分类列表',
      keepAlive: false,
      isBack: false,
    },
    path: '/assortments',
    name: 'assortments',
    component: resolve => require(['views/assortments'], resolve),
  },
  {
    meta: {
      title: '设置',
      keepAlive: false,
      isBack: false,
    },
    path: '/setup',
    name: 'setup',
    component: resolve => require(['views/setup'], resolve),
  },
  {
    meta: {
      title: '关于我们',
      keepAlive: false,
      isBack: false,
    },
    path: '/aboutus',
    name: 'aboutus',
    component: resolve => require(['views/aboutus'], resolve),
  },
];
