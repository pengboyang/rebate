<template>
  <div class="comSwiepr">
     <div class="bg_mh"></div>
     <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in loopLsit" :key="index"><img @click="toolbar(item.name,item.select)" :src="item.url" alt=""></div>
        </div>
        <div class="swiper-pagination"></div>
     </div>
  </div>
</template>
<script>
  import Swiper from 'swiper/dist/js/swiper.min.js';
  import 'swiper/dist/css/swiper.min.css';
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
            title: '手机配件',
            url: require('../assets/img/swiper2.jpg'),
            name: '手机配件',
            select: '手机配件'
          },
          {
            url: require('../assets/img/swiper4.jpg'),
            name: 'link',
            select: 'koudai'
          },
          {
            url: require('../assets/img/swiper5.jpg'),
            name: 'link',
            select: 'wx'
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
    mounted(){
        var _this = this;
        var mySwipers = new Swiper('.swiper-container', {
            autoplay: {
              delay: 3000,//1秒切换一次
              disableOnInteraction: false,
            },
            loop:true,
            observer:true,
            observeParents:true,
            pagination: {
              el: '.swiper-pagination',
            },
            on: {
                slideChangeTransitionStart: function () {
                },
                slideChangeTransitionEnd: function () {
                  $('.bg_mh').css("background-image","url(" + _this.loopLsit[this.realIndex].url+ ")")
                },
            },
        })
    },
    created() {
    },
    methods:{
      toolbar(name, select) {
        if(name=='link'){
          if(select=='wx'){
            this.gowx();
          }else if(select=='koudai'){
            this.gokoudai();
          }
        }else{
          this.$router.push({path: '/more', query: {id: select, name: name}});
        }
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
    padding-top: 65px;
    padding-bottom: 10px;
    box-sizing: border-box;
  }

  .comSwiepr .bg_mh{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-repeat:no-repeat;
    background-size:cover;
    -webkit-filter:blur(20px);
    -moz-filter:blur(20px);
    -o-filter:blur(20px);
    -ms-filter:blur(20px);
    filter:blur(20px);
  }

  .comSwiepr .swiper-container {
    width: 100%;
  }

  .comSwiepr .swiper-container .swiper-slide{
    padding: 0 20px;
    z-index: 9999;
  }

  .comSwiepr .swiper-container .swiper-slide img {
    width: 100%;
    height: auto;
    vertical-align: middle;
    border-radius: 12px;
  }
  .comSwiepr .swiper-pagination-bullet-active{
    background: red !important;
  }

  .comSwiepr .weui-grid {
    padding: 5px 10px 5px!important;
  }
</style>

