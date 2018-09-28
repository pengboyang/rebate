<template>
  <div class="setup">
    <div class="setTop">
      <img class="bg" src="../assets/img/topBg.jpg" alt="">
      <div class="back" @click="routeBack"><img src="../assets/img/loginzback.png" alt=""></div> 
      <div class="text">设置</div>
    </div>
    <div class="setCon">
      <div class="setwra">
        <div class="flexWid">淘宝授权</div>
        <div class="shouquan" v-if="authors" @click="getUserUuid"><img src="../assets/img/taobaoshouqun1.png" alt=""></div>
        <div class="shouquan" v-else @click="removeSq"><img src="../assets/img/jiechushouquan.png" alt=""></div>
        <div class="chakan"><img src="../assets/img/rightJT.png" alt=""></div>
      </div>
      <div class="setwra" @click="goaboutus">
        <div class="flexWid">关于我们</div>
        <div class="chakan"><img src="../assets/img/rightJT.png" alt=""></div>
      </div>
    </div>
    <div class="setBom" @click="loginOut"><img src="../assets/img/loginout.png" alt=""></div>
  </div>
</template>
<script>
  import { Toast } from 'we-vue'
  export default{
    name:'setup',
    data(){
      return{
        authors:true,
      }
    },
    created(){
      let tbLogin = this.tbLogin();
      if(tbLogin){
        this.authors = false;
      }
    },
    methods:{
      routeBack() {
        this.$router.go(-1)
      },
      goaboutus(){
        this.$router.push({path:'/aboutus'});
      },
      removeSq(){
        localStorage.removeItem('userInfoTb');
        this.authors = true;
        Toast.text({
            message: '解除绑定成功',
            duration: 2000,
        });
      },
      loginOut(){
        this.creatSiagn(this.apiUrl.userQuit);
        console.log(this.saign);
        this.$http({
          method:'delete',
          url:this.apiUrl.userQuit,
          params:{uuid:this.uuid,times:this.times,sign:this.saign}
        }).then(res=>{
          if(res.status==200){
            console.log(res);
            this.$router.push({path:'/index'});
            this.$store.state.activeIndex = 0;
            localStorage.removeItem('userInfo');
            Toast.text({
                message: '退出登陆成功',
                duration: 2000,
            });
          }
        }).catch();
      }
    }
  }
</script>
<style>
.setup{
  background: #e8e8e8;
}
.setup .setTop{
  width: 100%;
  height: 50px;
  position: relative;
}
.setup .setTop .bg{
  width: 100%;
  height: 50px;
  vertical-align: middle;
  position: absolute;
  left: 0;
  top: 0;
}
.setup .setTop .back{
  width: 50px;
  height: 50px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  text-align: center;
}
.setup .setTop .back img{
  width: 12px;
  height: auto;
  vertical-align: middle;
  padding-top: 12px;
}
.setup .setTop .text{
  width: 100%;
  height: 50px;
  text-align: center;
  position: absolute;
  left: 0;
  top: 0;
  line-height: 50px;
  color: #fff;
}
.setup .setCon{
  color: #666;
  font-size: 14px;
  background: #fff;
  margin-top: 10px;
}
.setup .setCon .setwra{
  display: -webkit-flex;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid #eee;
}
/* .setup .setCon .setwra:last-child{
  border: none;
} */
.setup .setCon .setwra .flexWid{
  flex: 1;
  font-weight: 700;
}
.setup .setCon .setwra .chakan img{
  width: 8px;
  height: auto;
  vertical-align: middle;
}
.setup .setCon .setwra .shouquan img{
  width: 76px;
  height: auto;
  vertical-align: middle;
  padding-right: 14px;
}
.setup .setBom{
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 20px;
  text-align: center;
  line-height: 50px;
  font-size: 18px;
}
.setup .setBom img{
  width: 100%;
  height: auto;
  vertical-align: middle;
}
</style>  