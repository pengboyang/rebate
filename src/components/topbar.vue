<template>
  <div class="comTop" @click="goSearch">
    <div class="serch">
      <wv-search-bar
        :autofocus="false"
        v-model="value"
        @search="onSearch"
        @cancel="onCancel"
        :placeholder="placeholder"
      />
    </div>
    <div class="msg">
      <!-- <img src="../assets/img/msg.png"/> -->
      <span class="msgtxt">搜索</span>
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
    computed: {},
    methods: {
      onSearch(val) {
        // 自定义搜索处理
        console.log(val);
      },
      onCancel() {
        // 自定义取消事件处理
      },
      goSearch(){
        this.$router.push({path:'/searchs'});
      }
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
    height: 28px;
    border-radius: 14px;
    overflow: hidden;
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
    /* display: block;
    font-size: 12px;
    transform: scale(0.8);
    -webkit-transform: scale(0.8);
    color: #fff;
    line-height: 0;
    margin-right: -5px; */
    font-size: 16px;
    color: #fff;
  }
</style>
