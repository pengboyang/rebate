<template>
  <div>
    <div class="popbg" @click="$store.state.popup=false"></div>
    <div class="popSwiper">
      <wv-swipe :autoplay="6000">
        <wv-swipe-item v-for="(item,index) in loopLsit" :key="index"><img @click="toolbar(item.select)"  class="bannerImg" :src="item.url" alt=""></wv-swipe-item>
      </wv-swipe>
      <div class="exit" @click="$store.state.popup=false"><img src="../assets/img/popexit.png"></div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'popSwiper',
    data() {
      return {
        loopLsit:[
          {
            url: require('../assets/img/popdami.png'),
            select: 'wx'
          },
          {
            url: require('../assets/img/popkoudai.png'),
            select: 'koudai'
          },
        ],
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
    created() {
    },
    methods:{
      toolbar(select) {
        if(select=='wx'){
          this.gowx();
        }else if(select=='koudai'){
          this.gokoudai();
        }
      },
    }
  }
</script>
<style>
  .popbg{
    width:100%;
    height:100%;
    position: fixed;
    top:0;
    left:0;
    z-index:1000;
    background: rgba(6,6,6,.6);
  }
  .popSwiper {
    width: 80%;
    position: fixed;
    top: 15%;
    left: 0;
    right:0;
    margin:auto;
    z-index: 1001;
  }

  .bannerImg {
    width: 100%;
    height: auto;
  }
  .exit{
    padding:10px 0;
    text-align: center;
  }
  .exit img{
    width:40px;
  }
</style>

