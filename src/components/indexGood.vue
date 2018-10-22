<template>
  <div class="manContent">
    <div class="bgComF">
      <div class="manTitle">
        <span class="kind" style="padding-left:8px">{{listdata.name}}</span>
        <span class="moreList" style="padding-right:8px" @click="moreList">更多></span>
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
  .manContent .bgComF{
    border-radius: 12px;
    background: #f2f2f2;
  }
  .manContent .bgComF .manTitle{
    padding: 0 0 15px 0;
  }
  .manContent .bgComF .col2{
    background: #f2f2f2;
  }
  .manContent .bgComF .col2 .col2Wra{
    background: #fff;
    margin-bottom: 8px;
    border-radius: 10px;
  }
  .manContent .bgComF .col2 .col2Wra .col2Pic img{
    border-top-right-radius: 10px 10px;
    border-top-left-radius: 10px 10px;
  }
  .manContent .bgComF .moreList{
    background: #f2f2f2;
  }
  .manContent .bgComF .col2 .col2Wra .col2Name{
    padding-left: 5px;
    font-size: 13px;
    padding-bottom: 4px;
  }
  .manContent .bgComF .col2 .col2Wra .col2PrePrice{
    padding-left: 5px;
  }
  .manContent .bgComF .col2 .col2Wra .price{
    text-align: left;
    padding-left: 5px;
    padding-bottom: 5px;
  }
</style>

