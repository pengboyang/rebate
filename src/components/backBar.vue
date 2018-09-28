<template>
  <div class="comTop">
    <div class="serch">
      <div class="topBanner">
        <div style="width:50px;height:100%;" @click="routeBack" v-if="title!='更多分类'">
          <img class="returnBack" src="../assets/img/loginzback.png" alt="">
        </div>
        <div class="topTitle">{{title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'topBar',
    data() {
      return {
        value: '',
        placeholder: '搜索商品名称或粘贴宝贝链接',
      }
    },
    props: ['title'],
    created() {
      console.log(this.title)
    },
    computed: {},
    methods: {
      onSearch(val) {
        // 自定义搜索处理
        console.log(val);
      },
      onCancel() {
        // 自定义取消事件处理
      },
      routeBack() {
        this.$router.go(-1)
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .comTop {
    width: 100%;
    height: 50px;
    position: fixed;
    left: 0;
    top: 0;
    background: url('../assets/img/topBg.jpg') repeat-y;
    background-size: 100% 100%;
    z-index: 999;
    font-family: 'noto';
    display: flex;
    align-items: center;
    padding: 0 15px;
    background: #EA6E35;
  }

  .serch {
    width: 85%;
    height: 30px;
  }

  .msg {
    width: 15%;
    height: 30px;
    text-align: right;
  }

  .msg img {
    width: 40%;
  }

  .msgtxt {
    display: block;
    font-size: 12px;
    transform: scale(0.8);
    -webkit-transform: scale(0.8);
    color: #fff;
    line-height: 0;
    margin-right: -5px;
  }

  .topBanner {
    width: 100%;
    height: 50px;
    line-height: 50px;
    position: fixed;
    left: 0px;
    top: 0;
    padding-left: 15px;
  }

  .topBanner .returnBack {
    width: 12px;
    height: auto;
    vertical-align: top;
    padding-top: 14px;
  }

  .topBanner .topTitle {
    font-size: 17px;
    color:#fff;
    font-weight: 700;
    width: 80%;
    height: 50px;
    text-align: center;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    overflow: hidden;
  }
</style>
