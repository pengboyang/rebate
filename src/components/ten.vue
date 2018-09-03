<template>
  <div class="manContent">
    <div class="manTitle">
      <span class="kind">{{listdata.name}}</span>
      <span class="moreList" @click="moreList">更多></span>
    </div>
    <div class="manNovel">
      <div class="novelWra" @click="goDetail()" v-for="item in listdata.list">
        <div class="novelPic"><img :src="item.pictUrl" alt=""></div>
        <div class="novelName">{{item.title}}</div>
        <div class="price"><!--<span>券后</span><em>¥</em>-->{{item.zk_final_price}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'ten',
    data() {
      return {
        betterMoreList: []
      }
    },
    props: ['listdata'],
    created() {
    },
    methods: {
      moreList() {
        this.$router.push({path: '/more', query: {id: this.listdata.select, name: this.listdata.name}});
      },
      goDetail(id, type) {
        this.$router.push({path: '/bookDetail', query: {id: id, type: type}});
      }
    }
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
    width: 30%;
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
    font-size: 14px;
    margin-top: 8px;
    text-align: left;
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
</style>

