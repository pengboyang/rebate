var mixin = {
  data: () => {
    return {
      apiUrl: {
        getlist: '/tbk/api/goods/couponGoodsList',
        userAuth: '/tbk/api/user/auth',
        userToken: '/tbk/api/user/token',
        goodsInfo: '/tbk/api/goods/goodsInfo',
        favorAddFavor: '/tbk/api/favor/addFavor'
      }
    };
  },
  methods: {
    /*格式化时间*/
    formatDateTime(date, format) {
      if (!date) {
        return '';
      }
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      var h = date.getHours();
      var minute = date.getMinutes();
      var second = date.getSeconds();
      minute = minute < 10 ? ('0' + minute) : minute;
      second = second < 10 ? ('0' + second) : second;
      if (format == 'y-m-d h-m-s') {
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
      } else if (format == 'h-m') {
        return ' ' + h + ':' + minute;
      } else if (format == 'y-m-d') {
        return y + '-' + m + '-' + d;
      } else if (format == 'y/m/d') {
        return y + '/' + m + '/' + d;
      } else if (format == 'ymd') {
        return y + '' + m + '' + d;
      }
    },
    goTaobao(url) {
      var w = plus.webview.open(url, 'taobao');
    },
    /*获取code*/
    getCode() {
      try {
        let url = window.location.href;
        let baseurl = url.split('#')[0];
        let hash = baseurl.split('?')[1];
        let hasharr = hash.split('&');
        let query = {};
        hasharr.forEach((item, index) => {
          query[item.split('=')[0]] = item.split('=')[1];
        });
        // if (query.state) {
        //   store.dispatch({
        //     type: 'userCodeChange',
        //     val: query.code,
        //   });
        // } else {
        //   store.dispatch({
        //     type: 'codeChange',
        //     val: query.code,
        //   });
        // }
        return query;
      } catch (e) {

      }
    },
    /*登录状态*/
    isLogin() {
      let userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
      if (userInfo.uuid) {
        return true;
      } else {
        return false;
      }
    }
  }

};
export default mixin;

