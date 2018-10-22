<template>
  <div class="tabBar">
    <div class="navBox">
      <router-link to="/index">
        <span class="sHeight"><span class="icon icon-foo"></span></span>
        <div>推荐</div>
      </router-link>
    </div>
    <div class="navBox">
      <router-link to="/recommendation">
        <span class="sHeight"><span class="icon icon-bar"></span></span>
        <div>分类</div>
      </router-link>
    </div>
    <div class="navBox">
        <router-link :to="isLogins?'/mine':'/login'">
            <span class="sHeight"><span class="icon icon-fb"></span></span>
            <div>我的</div>
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
        activeIndex:0,
        isLogins:false,
      }
    },
    computed: {},
    created(){
      this.isLogins = this.isLogin();
      console.log(this.$store.state.activeIndex);
    },
    methods: {
      goUrl(url,index) {
        if(url!='/mine'){
          this.$router.push({path:url});
          this.$store.state.activeIndex = index;
        }else{
          let isLogin = this.isLogin();
          if (isLogin) {
            this.$router.push({path:url});
            this.$store.state.activeIndex = index;
            return false;
          }
          this.$router.push({path:'/login'})
        }  
      }
    }
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
    width: 100%;
    height: 100%;
  }

  .tabBar {
    box-sizing: border-box;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    width: 100%;
    height: 52px;
    position: fixed;
    z-index: 1;
    bottom: 0;
    left: 0;
    background: #fff;
    font-size: 12px;
  }

  .tabBar .navBox {
    text-align: center;
    vertical-align: middle;
    flex: 1;
    height: 100%;
    padding-top: 8px;
  }

  .tabBar .navBox .sHeight{
    width: 100%;
    height: 20px;
    display: block;
  }

  .tabBar .navBox div{
    height: 24px;
    line-height: 20px;
  }

  .icon {
    display: inline-block;
    width: 22px;
    height: 20px;
  }

  /*推荐*/
  .icon-foo {
    background: url('../assets/img/tuijian.png');
    background-size: 100% 100%;
  }

  /*分类*/
  .icon-bar {
    background: url('../assets/img/fenlei.png');
    background-size: 100% 100%;
  }

  /*我的*/
  .icon-fb {
    background: url('../assets/img/my.png');
    background-size: 100% 100%;
  }
  .router-link-active .icon-foo {
    background: url('../assets/img/tuijian-1.png');
    background-size: 100% 100%;
  }

  .router-link-active .icon-bar {
    background: url('../assets/img/fenlei-1.png');
    background-size: 100% 100%;
  }

  .router-link-active .icon-fb {
      background: url('../assets/img/my-1.png');
      background-size: 100% 100%;
  }
  .router-link-active div{
    color: red;
    line-height: 20px;
  }
 .active { 
    color: red;
 }
</style>
