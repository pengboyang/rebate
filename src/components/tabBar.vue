<template>
  <div class="tabBar">
      <div class="navBox">
          <router-link to="/index">
              <span class="icon icon-foo"></span>
              <p>推荐</p>
          </router-link>
      </div>
      <div class="navBox">
        <router-link to="/collect">
          <span class="icon icon-bar"></span>
          <p>收藏</p>
        </router-link>
      </div>
      <div class="navBox">
          <router-link to="/detail">
              <span class="icon icon-fb"></span>
              <p>我的</p>
          </router-link>
      </div>
  </div>
</template>

<script>
  export default {
    name: 'tabBar',
    data() {
      return {
        value: '',
      }
    },
    computed: {},
    methods: {
      go(){
        console.log(1);
      }
    },
  }
</script>

<style scoped>
    * {
        padding: 0;
        margin: 0;
    }

    a:-webkit-any-link {
        text-decoration: none;
        color: #000;
        display: block;
    }

    .tabBar {
        box-sizing: border-box;
        display: -webkit-flex;
        display: flex;
        align-items: center;
        width: 100%;
        height: 53px;
        position: fixed;
        z-index: 1;
        bottom: 0;
        left: 0;
        background: #fff;
        font-size: 12px;
        border-top: 1px solid #e0e0e0;
    }

    .tabBar .navBox {
        text-align: center;
        vertical-align: middle;
        flex:1;
        height: 100%;
        padding-top: 8px;
    }

    .tabBar .navBox:first-child{
      border-right: 1px solid #e0e0e0;
    }

    .tabBar .navBox:nth-child(2){
      border-right: 1px solid #e0e0e0;
    }

    .icon {
        display: inline-block;
        width: 22px;
        height: 20px;
    }
    /*头条*/
    .icon-foo {
        background: url('../assets/img/tuijian.png');
        background-size: 100% 100%;
    }
    /*视频*/
    .icon-bar {
        background: url('../assets/img/shoucang.png');
        background-size: 100% 100%;
    }
    /*我的*/
    .icon-fb {
        background: url('../assets/img/my.png');
        background-size: 100% 100%;
    }

    p{
      line-height: 12px;
    }

    .router-link-active p {
        color: red;
    }

    .router-link-active p {
      color: red;
    }

    .router-link-active p {
      color: red;
    }
</style>
