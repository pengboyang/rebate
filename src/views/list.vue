<template>
  <div class="manList page-infinite-wrapper" ref="wrapper"
       :style="{width:'100%', height: wrapperHeight + 'px'}" @scroll="abc">
    <wv-group
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="50"
    >
      <top-bar :scrollNums="scrollNums" ref="child"></top-bar>
      <my-swiper></my-swiper>
      <wv-grid>
        <wv-grid-item v-for="(item,index) in toolbarList" :key="index" @click="toolbar(item.name,item.select)">
          <img :src="item.url" slot="icon">
          <span slot="label" class="icontxt">{{item.title}}</span>
        </wv-grid-item>
      </wv-grid>
      <div class="bgcolors">
        <ten :listdata="listdata.girl"></ten>
        <twenty :listdata="listdata.man"></twenty>
        <hot></hot>
        <index-good :listdata="listdata.good"></index-good>
      </div>
      <tab-bar></tab-bar>
    </wv-group>
    <p v-show="loading" class="loading-tips">
      <wv-spinner type="dot-circle" color="#444" :size="24"/>
    </p>
    <wv-loadmore type="line" text="省钱买"></wv-loadmore>
    <pop-swiper v-if="$store.state.popup"></pop-swiper>
  </div>
</template>
<script>
  import 'swiper/dist/css/swiper.css'////这里注意具体看使用的版本是否需要引入样式，以及具体位置。
  import {Dialog} from 'we-vue'
  import mySwiper from '../components/mySwiper.vue'
  import popSwiper from '../components/popSwiper.vue'
  import ten from '../components/ten'
  import twenty from '../components/twenty'
  import good from '../components/good'
  import indexGood from '../components/indexGood'
  import hot from '../components/hot'
  import topBar from '../components/topbar'
  import tabBar from '../components/tabBar'
  import CryptoJS from 'crypto-js';

  export default {
    name: 'manList',
    data() {
      return {
        scrollNums:0,
        loading: false,
        wrapperHeight: 0,
        page: {
          offset: 0,
          limit: 10
        },
        listdata: {
          girl: {
            name: '女装尖货',
            select: '女装',
            list: []
          },
          man: {
            name: '精品男装',
            select: '男装',
            list: []
          },
          good: {
            name: '特价好货',
            select: '女装',
            list: []
          },
        },
        toolbarList: [
          {
            title: '女装',
            url: require('../assets/img/icon_1.png'),
            name: '女装尖货',
            select: '女装'
          },
          {
            title: '美妆洗护',
            url: require('../assets/img/icon_2.png'),
            name: '美妆洗护',
            select: '美妆'
          },
          {
            title: '男装',
            url: require('../assets/img/icon_4.png'),
            name: '精品男装',
            select: '男装'
          },
          {
            title: '母婴',
            url: require('../assets/img/icon_8.png'),
            name: '母婴',
            select: '母婴'
          },
          {
            title: '鞋包配饰',
            url: require('../assets/img/icon_6.png'),
            name: '鞋包配饰',
            select: '女鞋'
          },
          {
            title: '内衣',
            url: require('../assets/img/icon_7.png'),
            name: '内衣',
            select: '女士内衣'
          },
          {
            title: '童装',
            url: require('../assets/img/icon_3.png'),
            name: '童装',
            select: '童装'
          },
          {
            title: '休闲零食',
            url: require('../assets/img/bangbangtang.png'),
            name: '休闲零食',
            select: '休闲零食'
          },
        ],
        sweiperList: [],
      }
    },
    components: {
      topBar,
      tabBar,
      mySwiper,
      popSwiper,
      ten,
      twenty,
      good,
      indexGood,
      hot
    },
    created() {
      // var otherView = plus.webview.getWebviewById('taobao') || null;
      // if (otherView){
      //   plus.webview.close(otherView);
      // }
      let query = this.getCode();
      let isLogin = this.tbLogin();
      if (!isLogin && query && query.code) {
        console.log(1)
        this.login(query);
      }
      for (let key in this.listdata) {
        this.getlist(key);
      }
      this.serviceTime();
    },
    methods: {
      abc(){
        this.scrollNums = $('.manList').scrollTop();
        this.$refs.child.childFn();
      },
      loadMore() {
        this.loading = true;
        this.page.offset++;
        this.getlist('good');
      },
      manPageList() {
        this.$http({
          method: 'get',
          url: this.apiUrl.novelApiLibrary,
          params: {gender: this.gender}
        }).then(res => {
          if (res.status == 200) {
            var data = res.data.novelLists;
            this.sweiperList = res.data.novelItemList;
            this.dataList = res.data.novelLists;
          }
        }).catch()
      },
      getlist(key) {
        this.$http({
          method: 'get',
          url: this.apiUrl.getlist,
          params: {
            name: this.listdata[key].select,
            page_no: this.page.offset||Math.floor(Math.random() * (10 - 1) + 1),
            page_size: this.listdata[key].name == '特价好货' ? this.page.limit : 3,
          }
        }).then(res => {
          if (res.status == 200) {
            res.data.list.forEach(item => {
              let price = item.coupon_info.replace(/满/g, '').replace(/减/g, '$').split('$');
              let stime = item.coupon_start_time.replace(/-/g, '.');
              let etime = item.coupon_end_time.replace(/-/g, '.');
              item.coupon_all_time = stime + '-' + etime;
              item.reserve_price = item.zk_final_price;
              item.zk_final_price = item.zk_final_price >= parseInt(price[0]) ? (item.zk_final_price - parseInt(price[1])).toFixed(2) : item.zk_final_price;
              item.couponPrice = parseInt(price[1]);
              item.pictUrl = item.pictUrl+'_200x200.jpg';
            });
            if(key=='good')
              this.listdata[key].list = this.listdata[key].list.concat(res.data.list);
            else
              this.listdata[key].list = res.data.list;
            this.$nextTick(() => {
              this.loading = false;
            });

          }
        }).catch()
      },
      toolbar(name, select) {
          this.$router.push({path: '/more', query: {id: select, name: name}});
      },
      /*登录*/
      // login(obj) {
      //   this.$http({
      //     method: 'get',
      //     url: this.apiUrl.userToken,
      //     params: {code: obj.code}
      //   }).then(res => {
      //     if (res.status == 200) {
      //       console.log(res);
      //       if (res.data.status == 1) {
      //         var data = res.data;
      //         localStorage.setItem('userInfoTb', JSON.stringify(data));
      //         this.$toast.success('淘宝授权成功');
      //       }
      //     }
      //   }).catch()
      // },
      // /*绑定*/
      login(obj) {
        this.creatSiagn(this.apiUrl.bindTaobao);
        this.$http({
          method: 'post',
          url: this.apiUrl.bindTaobao,
          params: {code: obj.code},
          headers: {
              'uuid': this.uuid,
              'times': this.times,
              'sign': this.saign,
          },
        }).then(res => {
          if (res.status == 200) {
            console.log(res);
            if (res.data.status == 1) {
              var data = res.data;
              localStorage.setItem('userInfoTb', JSON.stringify(data));
              this.$toast.success('淘宝授权成功');
            }
          }
        }).catch()
      },
    },
    mounted() {
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top - 53;
      this.$refs.wrapper.addEventListener('scroll', this.handleScroll);
    }
  }
</script>
<style>
  .manList{
    overflow-x: auto;
    overflow-y: auto;
  }
  .manList .weui-grids{
    background: #f2f2f2!important;
    padding-top: 15px !important;
    padding-bottom: 15px !important;
  }
  .weui-grid {
    width: 25% !important;
  }

  .weui-grids:before, .weui-grid:before, .weui-grid:after {
    border: 0 !important;
  }

  .weui-grid__icon {
    width: 50px !important;
    height: auto !important;
  }

  .icontxt {
    font-size: 14px;
    color: #000;
  }
</style>

