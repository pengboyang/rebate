export default [
  {
    path: '/',
    name: 'index',
    redirect: {path: '/index'}
  },
  {
    meta: {
      title: '省钱多多',
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

];
