<template>
  <div class="manContent">
    <div class="bgComFFF">
        <div class="manTitle">
          <span class="kind">{{listdata.name}}</span>
          <span class="moreList" @click="moreList">更多></span>
        </div>
        <div class="manNovel">
          <div class="novelWra" @click="goDetail(item.num_iid,item.coupon_click_url,item.coupon_start_time,item.coupon_end_time,item.coupon_info,item.couponPrice,item.reserve_price,item.zk_final_price,item.coupon_all_time)" v-for="item in listdata.list">
            <div class="novelPic"><img :src="item.pictUrl" alt=""></div>
            <div class="novelName">{{item.title}}</div>
            <div class="price"><span>券后</span><em>¥</em>{{item.zk_final_price}}</div>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'twenty',
    data() {
      return {
        betterMoreList: []
      }
    },
    props: ['listdata'],
    created() {
      // console.log(this.listdata);
    },
    methods: {
      moreList() {
        this.$router.push({path: '/more', query: {id: this.listdata.select, name: this.listdata.name}});
      },
      goDetail(id, url,sTime,eTime,couponInfo,couponPrice,reservePrice,zkfinalPrice,allTime) {
        this.$router.push({path: '/detail', query: {id: id,url:url,sTime:sTime,eTime:eTime,couponInfo:couponInfo,couponPrice:couponPrice,reservePrice:reservePrice,zkfinalPrice:zkfinalPrice,allTime:allTime}});
      }
    }
  }
</script>
<style>
  .manContent {
    padding: 25px 15px 0 15px;
    background: #f2f2f2;
  }
  .bgComFFF{
    padding: 0 8px 15px 8px;
    border-radius: 12px;
    background: #fff;
  }
  .manContent .manTitle {
    padding: 15px 0 15px 0;
  }

  .manContent .manTitle .kind {
    font-size: 16px;
    font-weight: 700;
  }

  .manContent .manTitle .moreList {
    float: right;
    font-size: 14px;
    color: #999;
  }

  .manContent .manNovel {
    width: 100%;
    background-color: white;
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .manContent .manNovel .novelWra {
    width: 32%;
    vertical-align: middle;
    color: black;
    text-align: center;
  }

  .manContent .manNovel .novelWra .novelPic {
    width: 100%;
  }

  .manContent .manNovel .novelWra .novelPic img {
    width: 100%;
    height: auto;
    vertical-align: middle;
  }

  .novelName, .novelPrice {
    font-size: 12px;
    margin-top: 8px;
    text-align: center;
  }

  .price {
    color: #fe5500;
    font-size: 16px;
    text-align: center;
  }

  .price span {
    font-size: 12px;
  }

  .price em {
    font-size: 14px;
    font-style: normal;
    padding: 0 5px;
  }
</style>

