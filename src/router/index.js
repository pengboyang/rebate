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

];
