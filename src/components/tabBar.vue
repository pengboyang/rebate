<template>
  <div class="tabBar">
    <wv-tabbar>
      <wv-tabbar-item to="" is-on>
      <span slot="icon" style="display: inline-block; position: relative;">
        <img class="weui-tabbar__icon" src="../assets/img/tuijian.png" slot="icon">
        <!--<wv-badge style="position: absolute;top: -2px;right: -13px;">8</wv-badge>-->
      </span>
        推荐
      </wv-tabbar-item>
      <wv-tabbar-item to="">
        <img class="weui-tabbar__icon" src="../assets/img/shoucang.png" slot="icon"> 收藏
      </wv-tabbar-item>
      <wv-tabbar-item @click="my">
      <span slot="icon" style="display: inline-block; position: relative;">
        <img class="weui-tabbar__icon" src="../assets/img/my.png" slot="icon">
        <!--<wv-badge is-dot style="position: absolute;top: 0;right: -6px;">8</wv-badge>-->
      </span>
        我的
      </wv-tabbar-item>
    </wv-tabbar>
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
      my(){
        let isLogin=this.isLogin();
        if(isLogin){
          this.$toast.text({
            duration: 10000,
            message: '您已登录'
          });
          return false;
        }
        this.$http({
          method: 'get',
          url: this.apiUrl.userAuth,
        }).then(res => {
          if (res.status == 200) {
            let url=res.data.url;
            url=url+'&view=wap';
            this.goTaobao(url);
            // location.href=url;
          }
        }).catch()
      }
    }
  }
</script>

<style scoped>
  .tabBar {
    width: 100%;
    position: fixed;
    z-index: 999;
    bottom: 0;
    left: 0;
  }

  .weui-tabbar__label {
    color: #000;
  }
</style>
