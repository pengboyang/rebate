<template>
  <div class="manContent">
    <div class="manTitle">
      <span class="kind">{{listdata.name}}</span>
      <span class="moreList" @click="moreList">更多></span>
    </div>
    <div class="col2 lazyload-list">
      <div class="col2Wra lazyload-list-item" @click="goDetail(item.num_iid,item.coupon_click_url,item.coupon_start_time,item.coupon_end_time,item.coupon_info,item.couponPrice,item.reserve_price,item.zk_final_price,item.coupon_all_time)"
           v-for="item in listdata.list">
        <div class="col2Pic "><img v-lazy="item.pictUrl" :key="item.pictUrl" class="lazyload-image" alt=""></div>
        <div class="col2Name">{{item.title}}</div>
        <div class="col2PrePrice"><span>原价</span>¥{{item.reserve_price}}<span class="num">月销{{item.volume}}笔</span>
        </div>
        <div class="price"><span>券后</span><em>¥</em>{{item.zk_final_price}}<!--<span
          class="coupon">{{item.coupon_info}}</span>--></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'indexGood',
    data() {
      return {
        listData: [],
        title: '',
        betterMoreList: [],
      }
    },
    props: ['listdata'],
    created() {
    },
    methods: {
      moreList() {
        this.$router.push({path: '/more', query: {id: this.listdata.select, name: this.listdata.name}});
      },
      goDetail(id, url,sTime,eTime,couponInfo,couponPrice,reservePrice,zkfinalPrice,allTime) {
        this.$router.push({path: '/detail', query: {id: id,url:url,sTime:sTime,eTime:eTime,couponInfo:couponInfo,couponPrice:couponPrice,reservePrice:reservePrice,zkfinalPrice:zkfinalPrice,allTime:allTime}});
      }
    },
  }
</script>
<style>

</style>

