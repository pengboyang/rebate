<template>
  <div class="collect">
    <div class="collectTopbar">
      <div class="center">我的收藏</div>
      <div v-if="!choosePic" class="right" @click="manageGoods">管理</div>
      <div v-if="choosePic" class="right" @click="cancelGoods">完成</div>
    </div>
    <div class="content">
      <div class="wra" v-for="item in goodsLists">
        <div v-if="choosePic" class="sircle" @click="choseEditBook(item.id)"><img v-if="choosegoodList.indexOf(item.id)>=0" src="../assets/img/xuanzhong.png" alt=""><div v-else class="box"></div></div>
        <div class="left"><img :src="item.src" alt=""></div>
        <div class="right">
          <div class="top">
            <img :style="{width:logoWidth}" src="../assets/img/taobaologo.png" alt="">
            <span :style="{fontSize:textFont}">百搭迷你背包时尚小包双肩包</span>
          </div>
          <div class="Allprice">
            <span class="currentPrice" :style="{fontSize:curFont}">券后价￥80</span>
            <div  class="taobaoPrice" :class="{'scale':choosePic}">
              <span>淘宝价</span>
              <span>￥100</span>
            </div>
          </div>
          <div v-if="!choosePic" class="bottom">20元券</div>
          <div v-if="choosePic" class="bottoms">20元券</div>
        </div>
      </div>
    </div>
    <tab-bar v-if="!choosePic"></tab-bar>
    <div v-if="choosePic" class="collectBottom">
        <div @click="checkedAll">全选</div>
        <div>删除{{numbers}}</div>
    </div>
  </div>
</template>
<script>
  import tabBar from '../components/tabBar'
  export default{
    name:'collect',
    data(){
      return{
        choosePic:false,
        textFont:'14px',
        logoWidth:'16px',
        curFont:'15px',
        choosegoodList:[],
        goodsLists:[
          {
            id:1,
            src:require('../assets/img/goods.png'),
          },
          {
            id:2,
            src:require('../assets/img/goods.png'),
          },
          {
            id:3,
            src:require('../assets/img/goods.png'),
          },
          {
            id:4,
            src:require('../assets/img/goods.png'),
          },
          {
            id:5,
            src:require('../assets/img/goods.png'),
          }
        ],
        numbers:0,
        isCheckedAll: false,
      }
    },
    components:{
      tabBar,
    },
    methods:{
      manageGoods(){
        this.choosePic = true;
        this.textFont='13px';
        this.logoWidth='14px';
        this.curFont = '14px';
      },
      cancelGoods(){
        this.choosePic = false;
        this.textFont='14px';
        this.logoWidth='16px';
        this.curFont='15px';
        this.choosegoodList=[];
      },
      /*单选*/
      choseEditBook(id){
        let idIndex = this.choosegoodList.indexOf(id)
        if (idIndex >= 0) {
          // 如果已经包含了该id, 则去除(单选按钮由选中变为非选中状态)
          this.choosegoodList.splice(idIndex, 1)
        } else {
          // 选中该checkbox
          this.choosegoodList.push(id)
        }
        this.numbers = '('+this.choosegoodList.length+')'
        if(this.choosegoodList.length==this.goodsLists.length){
          this.isCheckedAll = true;
        }else{
          this.isCheckedAll = false;
        }
        console.log(this.choosegoodList)
      },
      /*全选*/
      checkedAll () {
          this.isCheckedAll = !this.isCheckedAll
          if (this.isCheckedAll) {
            this.choosegoodList = []
            this.goodsLists.forEach(function (fruit) {
              this.choosegoodList.push(fruit.id)
            }, this)
          } else {
            this.choosegoodList = []
          }
          this.numbers = '('+this.choosegoodList.length+')';
          console.log(this.choosegoodList)
      },
    }
  }
  
</script>
<style>
.collect .collectTopbar{
  width: 100%;
  height: 50px;
  background: url('../assets/img/topBg.jpg') repeat-y;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
}
.collect .collectTopbar .center{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  text-align: center;
  line-height: 50px;
  font-size: 18px;
  color: #fff;
}
.collect .collectTopbar .right{
  height: 100%;
  line-height: 50px;
  font-size: 18px;
  color: #fff;
  position: absolute;
  right: 30px;
  top: 0;
}
.collect .content{
  padding: 73px 20px 0 20px;
}
.collect .content .wra{
  display: -webkit-flex;
  display: flex;
  margin-bottom: 20px;
}
.collect .content .sircle{
  display: -webkit-flex;
  display: flex;
  align-items: center;
  padding-right: 23px;
}
.collect .content .sircle .box{
  width: 18px;
  height: 18px;
  border: 1px solid #999;
  border-radius: 50%;
}
.collect .content .sircle  img{
  width: 18px;
  height: auto;
  vertical-align: middle;
}
.collect .content .wra .left{
  width: 38%;
}
.collect .content .wra .left img{
  width: 100%;
  height: auto;
  vertical-align: middle;
}
.collect .content .wra .right{
  width: 60%;
  padding-left: 17px;
}
.collect .content .wra .right .top{
  line-height: 15px;
}
.collect .content .wra .right .top img{
  height: auto;
  vertical-align: middle;
}
.collect .content .wra .right .top span{
  font-weight: 700;
  vertical-align: middle;
}
.collect .content .wra .right .Allprice{
  padding-top: 5px;
  display: -webkit-flex;
  display: flex;
  align-items: center;
}
.collect .content .wra .right .Allprice .currentPrice{
  color: #fe5500;
  font-weight: 700;
}
.collect .content .wra .right .Allprice .taobaoPrice{
  font-size: 12px;
  color: #999;
  flex: 1;
  text-align: right;
}
.scale{
  transform: scale(.8,.8);
}
.collect .content .wra .right .bottom{
  width: 60px;
  height: 18px;
  font-size: 12px;
  text-align: center;
  background: url('../assets/img/vouchersBg.png') no-repeat;
  background-size: 100% 100%;
  color: #fff;
  line-height: 17px;
  margin-top: 10px;
}
.collect .content .wra .right .bottoms{
  width: 52px;
  height: 15px;
  font-size: 12px;
  text-align: center;
  background: url('../assets/img/vouchersBg.png') no-repeat;
  background-size: 100% 100%;
  color: #fff;
  line-height: 15px;
  margin-top: 10px;
}
.collectBottom{
  width: 100%;
  height: 53px;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #fff;
}
.collectBottom div{
    border: 1px solid red;
    padding: 2px 14px;
    border-radius: 14px;
}
</style>

