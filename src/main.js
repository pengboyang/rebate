import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router';
import routes from '@/router';
import 'babel-polyfill';
import Mixin from './mixins';
import store from './store';
import axios from 'axios';
import 'swiper/dist/css/swiper.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import WeVue from 'we-vue'
import 'we-vue/lib/style.css'
import '@/js/plus.js';
import $ from 'jquery';
import VueLazyLoad from 'vue-lazyload'

Vue.use(WeVue)
Vue.use(VueAwesomeSwiper)
Vue.use(VueRouter);
Vue.mixin(Mixin);
Vue.use(VueLazyLoad,{
  // error:'./static/error.png',
  // loading:require('./assets/logo.png')
});
Vue.config.productionTip = false;
// Vue.config.debug = true;/*异常捕捉*/

const router = new VueRouter({
  routes
});

//系统错误捕获
// const errorHandler = (err, vm, info)=>{
// let obj={
//     message, // 异常信息
//     name, // 异常名称
//     script,  // 异常脚本url
//     line,  // 异常行号
//     column,  // 异常列号
//     stack  // 异常堆栈信息
// } = err;
// console.log(err.message);
// };
// Vue.config.errorHandler = errorHandler;

// ajax
Vue.$http = Vue.prototype.$http = axios.create({
  // baseURL: 'http://api.55duanzi.com',
  baseURL: 'http://api.i6bktq.cn:83',
  withCredentials: true,// `withCredentials` 表示跨域请求时是否需要使用凭证
  timeout: 5000
});
//拦截器（ajax请求前）
Vue.prototype.$http.interceptors.request.use((config) => {
  return config;
}, (error) => {
  return Promise.reject(error);
});
//拦截器（ajax响应前）
Vue.prototype.$http.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // console.log(response);
  return response;
}, function (error) {
  // if (error.response) {
  //   console.log(error.response);
  //   if (error.response.status == 403) {
  //   }
  // }
  return Promise.reject(error);
});

router.beforeEach((to, from, next) => {

  if (to.meta.keepAlive) {
    to.meta.isBack = true;
  }
  next();

});
router.afterEach((to, from) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
});

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
