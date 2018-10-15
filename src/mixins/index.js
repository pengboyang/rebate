import CryptoJS from 'crypto-js';
import crypto from 'crypto';
var mixin = {
  data: () => {
    return {
      apiUrl: {
        getlist: '/tbk/api/goods/couponGoodsList',
        userAuth: '/tbk/api/user/auth',
        userToken: '/tbk/api/user/token',
        goodsInfo: '/tbk/api/goods/goodsInfo',
        favorAddFavor: '/tbk/api/favor/addFavor',
        favorList:'/tbk/api/favor/list',
        favorDelFavor:'/tbk/api/favor/delFavor',
        userTime:'/tbk/api/user/time',
        userGetcode:'/tbk/api/user/getcode',
        userLogin:'/tbk/api/user/login',
        userQuit:'/tbk/api/user/quit',
        bindTaobao:'/tbk/api/user/bindTaobao'
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
    },
    tbLogin() {
      let userInfo = JSON.parse(localStorage.getItem('userInfoTb')) || {};
      if (userInfo.uuid) {
        return true;
      } else {
        return false;
      }
    },
    /*获取登陆信息*/
    getUserUuid(){
      this.$http({
        method: 'get',
        url: this.apiUrl.userAuth,
      }).then(res => {
        if (res.status == 200) {
          console.log(res);
          let url = res.data.url;
          url = url + '&view=wap';
          this.goTaobao(url);
          // location.href=url;
        }
      }).catch(
      )
    },
    //获取服务器时间戳
    serviceTime(){
        this.$http({
          method:'get',
          url:this.apiUrl.userTime,
        }).then(res=>{
          if(res.status==200){
              console.log(res);
              var time=Date.parse(new Date()).toString().slice(0,10);
              var differ=res.data.timestamp-time;
              localStorage.setItem('Rebatetimestamp', differ);
              console.log('login存储'+localStorage.getItem('Rebatetimestamp'));
          }else{
            localStorage.setItem('Rebatetimestamp', 0);
          }
        }).catch();
    },
    //更新本地与服务器的时间戳差
    updateDiffer(){
        this.differ = parseInt(localStorage.getItem('Rebatetimestamp')) || 0;
        console.log('本地'+parseInt(localStorage.getItem('Rebatetimestamp')));
    },
    /*解密*/
    decrypt(encrypted, key) {
        if(!encrypted)
            return '';
        var keys = CryptoJS.enc.Latin1.parse(key);
        var decrypted = CryptoJS.AES.decrypt(encrypted, keys, {
            iv: keys,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.ZeroPadding
        });
        return decrypted.toString(CryptoJS.enc.Utf8);
    },
    /*加密*/
    encrypt(encrypted, key) {
        if(!encrypted)
            return '';
        var keys = CryptoJS.enc.Latin1.parse(key);
        var decrypted = CryptoJS.AES.encrypt(encrypted, keys, {
            iv: keys,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.ZeroPadding
        }).toString();
        return decrypted;
    },
    /*MD5*/
    getmd5(str) {
        var md5 = crypto.createHash('md5');
        md5.update(str);
        return md5.digest('hex');
    },
    /*token,siagn*/
    creatSiagn(uri) {
        let timestamp=localStorage.getItem('Rebatetimestamp')!=null?localStorage.getItem('Rebatetimestamp'):0;
        this.times = Date.parse(new Date()) / 1000+parseInt(timestamp);
        this.uuid = JSON.parse(localStorage.getItem('userInfo')).uuid;
        this.token = JSON.parse(localStorage.getItem('userInfo')).token;
        var str1 = uri + '?';
        var str2 = `times=${this.times}&`;
        var str3 = `uuid=${this.uuid}&`;
        var str4 = 'token=' + this.token + '&';
        var arr = new Array(str2, str3, str4);
        var arr1 = arr.sort();
        for (var i = 0; i < arr1.length; i++) {
            str1 += arr1[i];
        }
        this.saign = this.getmd5(str1.substring(0, str1.length - 1)).toUpperCase();
        this.userKey = this.token.substring(0, 16);
    },
    /*跳转链接*/
    gowx() {
      var url='http://jump.ui879.com/WeChat/?k=db3bfa9d483412db64be64e01bd0a72&i=1087';
      var w = plus.webview.open(url, 'wx');
      setTimeout(function () {
        plus.webview.close(w);
      },2000)
    },
    /*跳转链接*/
    gokoudai() {
      console.log('跳转链接测试');
      let isSaveMoneyPay=plus.runtime.isApplicationExist({pname:'com.koudai.ky',action:'koudai://'});
      console.log(isSaveMoneyPay);
      if(isSaveMoneyPay){
        location.href='koudai://';
      }else{
        this.downInstall('http://s.55duanzi.com/newsapp/apk/savemoneypay.to.koudai.apk','下载中请耐心等候');
      }
    },
    /*下载安装文件*/
    downInstall(url,tip){
      plus.nativeUI.showWaiting(tip);
      var dtask = plus.downloader.createDownload(url, {filename: '_doc/download/'}, function (d, status) {
        // 下载完成
        plus.nativeUI.closeWaiting();
        if (status == 200) {
          plus.runtime.install(d.filename, {}, function () {
          }, function (DOMException) {
            console.log(JSON.stringify(DOMException));
          });
        } else {
          plus.nativeUI.toast('Download failed: ' + status);
        }
      });
      dtask.start();
    }
  }

};
export default mixin;

