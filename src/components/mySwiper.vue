<template>
  <div class="comSwiepr">
    <wv-swipe :autoplay="3000">
      <!--<wv-swipe-item v-for="(item,index) in srcLists" :key="index"><img :src="item.cover" alt=""></wv-swipe-item>-->
      <wv-swipe-item v-for="(item,index) in loopLsit" :key="index"><img @click="toolbar(item.name,item.select)"  class="bannerImg" :src="item.url" alt=""></wv-swipe-item>
    </wv-swipe>
  </div>
</template>
<script>
  export default {
    name: 'mySwiper',
    data() {
      return {
        srcLists: [
        ],
        loopLsit:[
          {
            title: '女士内衣',
            url: require('../assets/img/swiper1.jpg'),
            name: '女士内衣',
            select: '女士内衣'
          },
          {
            title: '大闸蟹',
            url: require('../assets/img/swiper3.jpg'),
            name: '大闸蟹',
            select: '大闸蟹'
          },
          {
            title: '电器专卖',
            url: require('../assets/img/swiper2.jpg'),
            name: '电器专卖',
            select: '电器专卖'
          },
        ]
      }
    },
    props: {
      lists: {
        type: Array,
        default() {
          return []
        }
      },
    },
    watch: {
      lists: function (od, nw) {
        console.log(od);
        this.srcLists = od;
      }
    },
    created() {
    },
    methods:{
      toolbar(name, select) {
        console.log(1)
          this.$router.push({path: '/more', query: {id: select, name: name}});
      },
    }
  }
</script>
<style>
  .comSwiepr {
    width: 100%;
    position: relative;
    top: 0;
    left: 0;
    padding-top: 30px;
    box-sizing: border-box;
  }

  .bannerImg {
    width: 100%;
    height: auto;
  }

  .swiper-container {
    width: 100%;
  }

  .swiper-container img {
    width: 100%;
    height: auto;
    vertical-align: middle;
  }

  .swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets {
    bottom: 5px !important;
  }

  .swiper-pagination {
    text-align: right !important;
  }

  .weui-grid {
    padding: 5px 10px 5px!important;
  }
</style>

