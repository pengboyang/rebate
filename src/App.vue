<template>
  <div id="app">
    <router-view class="wrapper"/>
  </div>
</template>

<script>
  import '@/js/vconsole.min.js';
  export default {
    name: 'App'
  }
</script>

<style>
  html, body {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    moz-user-select: -moz-none;
    -moz-user-select: none;
    -o-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  #app {
    font-family: 'STHeiti SC', '\5fae\8f6f\96c5\9ed1', Arial, 'Helvetica Neue', Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
    box-sizing: border-box;
  }

  .wrapper {
    width: 100%;
    height: 100%;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 53px;
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 0;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .bookDetail {
    -webkit-overflow-scrolling: touch;
  }

  .transparentBg {
    background: rgba(255, 255, 255, 0);
  }

  .comSwiepr, .manContent, .newBook, .manContent, .freeWeek, .weui-loadmore, .assortment, .assortmentCont, .mineList, .detaiContent, .comBooks, .manList, .assortmentList, .moreList, .bookDetail {
    background: #fff;
  }

  .kind, .bookname {
    color: #000;
  }

  .novelPic img {
    box-shadow: 0px 0px 5px #999;
  }

  .novelName, .col2Name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .manContent .col2 .col2Wra .col2Pic img[lazy=loading] {
    height: 162px;
    margin: auto;
    width: 40px;
  }

  .weui-dialog__btn_primary {
    color: #fe5500;
  }
  .weui-toast{
    top:60%!important;
  }
</style>
