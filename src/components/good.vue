<template>
  <div class="manContent">
    <div class="col2 lazyload-list">
      <div class="page-infinite-wrapper" ref="wrapper" :style="{width:'100%', height: wrapperHeight + 'px',paddingTop:'50px' }">
        <wv-group
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="50"
        >
          <div class="col2Wra lazyload-list-item" @click="goDetail(item.num_iid,item.coupon_click_url,item.coupon_start_time,item.coupon_end_time,item.coupon_info,item.couponPrice,item.reserve_price,item.zk_final_price,item.coupon_all_time)"
               v-for="item in listdata.list">
            <div class="col2Pic "><img v-lazy="item.pictUrl" :key="item.pictUrl" class="lazyload-image" alt=""></div>
            <div class="col2Name">{{item.title}}</div>
            <div class="col2PrePrice"><span>原价</span>¥{{item.reserve_price}}<span class="num">月销{{item.volume}}笔</span>
            </div>
            <div class="price"><span>券后</span><em>¥</em>{{item.zk_final_price}}<!--<span
              class="coupon">{{item.coupon_info}}</span>--></div>
          </div>
        </wv-group>
        <p v-show="loading" class="loading-tips">
          <wv-spinner type="dot-circle" color="#444" :size="24"/>
        </p>
      </div>
    </div>
    <div class="gotop" @click="gotop" v-show="backTopShow"><img src="../assets/img/gotop.png"/></div>
  </div>
</template>
<script>
  export default {
    name: 'good',
    data() {
      return {
        listData: [],
        title: '',
        betterMoreList: [],
        loading: false,
        allLoaded: false,
        backTopShow: false,
        wrapperHeight: 0,
        page: {
          offset: 0,
          limit: 20
        }
      }
    },
    props: ['listdata'],
    created() {
    },
    methods: {
      moreList() {
        this.$http({
          method: 'get',
          url: this.apiUrl.getlist,
          params: {
            name: this.listdata.select,
            page_no: this.page.offset,
            page_size: this.page.limit,
          }
        }).then(res => {
          if (res.status == 200) {
            console.log(res);
            res.data.list.forEach(item => {
              let price = item.coupon_info.replace(/满/g, '').replace(/减/g, '$').split('$');
              let stime = item.coupon_start_time.replace(/-/g,'.');
              let etime = item.coupon_end_time.replace(/-/g,'.');
              item.coupon_all_time = stime+'-'+etime;
              item.reserve_price = item.zk_final_price;
              item.zk_final_price = item.zk_final_price >= parseInt(price[0]) ? (item.zk_final_price - parseInt(price[1])).toFixed(2) : item.zk_final_price;
              item.title = item.title.slice(0,18)+'...';
              item.couponPrice = parseInt(price[1]);
              item.pictUrl = item.pictUrl+'_200x200.jpg';
            });
            this.listdata.list = this.listdata.list.concat(res.data.list);
            this.$nextTick(() => {
              this.loading = false;
            })
          }
        }).catch()
      },
      goDetail(id, url,sTime,eTime,couponInfo,couponPrice,reservePrice,zkfinalPrice,allTime) {
        this.$router.push({path: '/detail', query: {id: id,url:url,sTime:sTime,eTime:eTime,couponInfo:couponInfo,couponPrice:couponPrice,reservePrice:reservePrice,zkfinalPrice:zkfinalPrice,allTime:allTime}});
      },
      loadMore() {
        this.loading = true;
        this.page.offset++;
        this.moreList();
      },
      gotop() {
        // console.log(this.$refs.wrapper.scrollTop);
        // this.$refs.wrapper.scrollTop = 0;
        let back = setInterval(() => {
          if (this.$refs.wrapper.scrollTop) {
            this.$refs.wrapper.scrollTop -= 100;
          } else {
            clearInterval(back)
          }
        });
      },
      handleScroll() {
        if (this.$refs.wrapper.scrollTop > 100) {
          this.backTopShow = true;
        } else {
          this.backTopShow = false;
        }
      }
    },
    mounted() {
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
      this.$refs.wrapper.addEventListener('scroll', this.handleScroll)
    }
  }
</script>
<style>

</style>

