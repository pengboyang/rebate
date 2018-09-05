<template>
  <div class="manContent">
    <div class="manTitle">
      <span class="kind">{{listdata.name}}</span>
      <span class="moreList" @click="moreList">更多></span>
    </div>
    <div class="col2 lazyload-list">
      <div class="col2Wra lazyload-list-item" @click="goDetail(item.coupon_click_url)" v-for="item in listdata.list">
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
      goDetail(url) {
        this.goTaobao(url);
      },
    },
  }
</script>
<style>
  .manContent {
    padding: 0 15px;
  }

  .manContent .manTitle {
    padding: 22px 0 20px 0;
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

  .manContent .col2 {
    width: 100%;
    background-color: white;
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    position: relative;
  }

  .manContent .col2 .col2Wra {
    width: 49%;
    vertical-align: middle;
    color: black;
    text-align: center;
    display: inline-block;
  }

  .manContent .col2 .col2Wra .col2Pic {
    width: 100%;
  }

  .manContent .col2 .col2Wra .col2Pic img {
    width: 100%;
    height: auto;
    vertical-align: middle;
  }

  .col2Name, .novelPrice {
    font-size: 14px;
    margin-top: 8px;
    text-align: left;
  }

  .col2PrePrice {
    font-size: 14px;
    text-align: left;
    color: #a3a3a3;
  }

  .num {
    float: right;
    padding-right: 5px;
  }

  .price {
    color: #fe5500;
    font-size: 19px;
    text-align: left;
  }

  .price span {
    font-size: 12px;
  }

  .price em {
    font-size: 14px;
    font-style: normal;
    padding: 0 5px;
  }

  .coupon {
    display: inline-block;
    font-size: 9.6px;
    transform: scale(.8);
    -webkit-transform: scale(.8);
  }

  .col2Wra:nth-child(2n+1) {
    margin-right: 2%;
  }

  .weui-cells {
    margin-top: 0;
  }
</style>

