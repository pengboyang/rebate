<template>
  <div class="about">
    <div class="aboutTop">
      <img class="bg" src="../assets/img/topBg.jpg" alt="">
      <div class="back" @click="routeBack"><img src="../assets/img/loginzback.png" alt=""></div> 
      <div class="text">关于我们</div>
    </div>
    <div class="aboutCon">
      <div class="logoPic"><img src="../assets/img/quanlogo.png" alt=""></div>
      <div class="nameversion">APP名称:省钱买</div>
      <div class="cusQQ">
        <div><span>工作时间:</span>周一至周五10:00-19:00</div>
        <div><span>客服微信号:</span>koudaitoutiao</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    name:'about',
    data(){
      return{}
    },
    created(){},
    methods:{
      routeBack() {
        this.$router.go(-1)
      },
    }
  }
</script>
<style>
.about .aboutTop{
  width: 100%;
  height: 50px;
  position: relative;
}
.about .aboutTop .bg{
  width: 100%;
  height: 50px;
  vertical-align: middle;
  position: absolute;
  left: 0;
  top: 0;
}
.about .aboutTop .back{
  width: 50px;
  height: 50px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  text-align: center;
}
.about .aboutTop .back img{
  width: 12px;
  height: auto;
  vertical-align: middle;
  padding-top: 12px;
}
.about .aboutTop .text{
  width: 100%;
  height: 50px;
  text-align: center;
  position: absolute;
  left: 0;
  top: 0;
  line-height: 50px;
  color: #fff;
}
.about .aboutCon .logoPic{
  text-align: center;
  padding-top: 50px;
  margin-bottom: 15px;
}
.about .aboutCon .logoPic img{
  width: 35%;
  height: auto;
  vertical-align: middle;
}
.about .aboutCon .nameversion{
  width: 100%;
  text-align: center;
  line-height: 30px;
  color: #666;
}
.about .aboutCon .cusQQ{
  margin-top: 40px;
  text-align: center;
}
.about .aboutCon .cusQQ div{
  line-height: 32px;
}
.about .aboutCon .cusQQ div span{
  color: #999;
  padding-right: 6px;
}
</style>

