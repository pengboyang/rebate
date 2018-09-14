<template>
  <div class="mine">
      <div class="mine-top">
        <img src="../assets/img/mintop.png" alt="">
        <div class="wraBox">
          <div class="left"><img src="../assets/img/touxiang.png" alt=""></div>
          <div class="right">
            <div class="name">{{nickName}}</div>
            <img v-if="!tbLogin" @click="getUserUuid" src="../assets/img/taobaoshouqun.png" alt="">
          </div>
        </div>
      </div>
      <div class="mine-center">
        <div class="money">100</div>
        <div class="textinfo">为您累计省(元)</div>
      </div>
      <div class="line"></div>
      <div class="mine-bottom">
        <div class="wra">
          <img src="../assets/img/dingdan.png" alt="">
          <div class="flexWid">我的订单</div>
          <div class="chakan">查看></div>
        </div>
        <div class="wra">
          <img src="../assets/img/shezhi.png" alt="">
          <div class="flexWid">设置</div>
          <div class="chakan">查看></div>
        </div>
      </div>
      <tab-bar></tab-bar>
  </div>
</template>
<script>
    import tabBar from '../components/tabBar'
    export default{
      name:'mine',
      data(){
        return{
          nickName:'我是淘宝用户名',
          tbLogin:false, 
        }
      },
      components:{
        tabBar,
      },
      created(){
        let isLogin = this.isLogin();
        if (isLogin) {
          this.nickName = JSON.parse(localStorage.getItem('userInfo')).nickName;
          this.tbLogin = true;
        }
      }
    }
</script>
<style>
.mine .mine-top{
  width: 100%;
  position: relative;
}
.mine .mine-top img{
  width: 100%;
  height: auto;
  vertical-align: middle;
}
.mine .mine-top .wraBox{
  display: -webkit-flex;
  display: flex;
  align-items: center;
  position: absolute;
  left: 17px;
  top: 50%;
  transform: translateY(-50%);
}
.mine .mine-top .wraBox .left{
  width: 30%;
  margin-right: 21px;
}
.mine .mine-top .wraBox .right .name{
  font-size: 17px;
  color: #fff;
  margin-bottom: 6px;
}
.mine .mine-top .wraBox .right img{
  width: 80px;
  height: auto;
  vertical-align: middle;
}
.mine .line{
  width: 100%;
  height: 2px;
  background: #e0e0e0;
}
.mine .mine-center{
  text-align: center;
  padding-top: 20px;
  padding-bottom: 26px;
}
.mine .mine-center .money{
  font-size: 28px;
  color: red;
}
.mine .mine-center .textinfo{
  font-size: 16px;
}
.mine .mine-bottom{
}
.mine .mine-bottom .wra{
  display: -webkit-flex;
  display: flex;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #e0e0e0;
}
.mine .mine-bottom .wra:last-child{
  border: none;
}
.mine .mine-bottom .wra img{
  width: 16px;
  height: auto;
  vertical-align: middle;
}
.mine .mine-bottom .wra .flexWid{
  flex: 1;
  padding-left: 14px;
  font-weight: 700;
  font-size: 14px;
}
.mine .mine-bottom .wra .chakan{
  font-size: 12px;
  color: #999;
}
</style>

