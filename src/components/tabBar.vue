<template>
  <div class="tabBar">
    <div class="navBox" v-for="(item,index) in urlList" :key="index">
      <div @click="goUrl(item.url,index)">
        <span class="icon" :class="item.icon"></span>
        <p :class="{active: $store.state.activeIndex === index}">{{item.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'tabBar',
    data() {
      return {
        value: '',
        urlList:[
          {
            url:'/index',
            name:'推荐',
            icon:'icon-foo'
          },
          {
            url:'/collect',
            name:'收藏',
            icon:'icon-bar'
          },
          {
            url:'/mine',
            name:'我的',
            icon:'icon-fb'
          }
        ],
        activeIndex:0
      }
    },
    computed: {},
    created(){
      console.log(this.$store.state.activeIndex);
    },
    methods: {
      goUrl(url,index) {
        if(url!='/collect'&&url!='/mine'){
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
    flex: 1;
    height: 100%;
    padding-top: 8px;
  }

  .tabBar .navBox:first-child {
    border-right: 1px solid #e0e0e0;
  }

  .tabBar .navBox:nth-child(2) {
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

  p {
    line-height: 12px;
  }

 .active { 
    color: red;
 }
</style>
