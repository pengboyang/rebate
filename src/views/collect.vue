<template>
  <div class="collect">
    <div class="collectTopbar">
      <div class="backBtn" @click="back"><img src="../assets/img/loginzback.png" alt=""></div>
      <div class="center">我的收藏</div>
      <div v-if="!choosePic" class="right" @click="manageGoods">管理</div>
      <div v-if="choosePic" class="right" @click="cancelGoods">完成</div>
    </div>
    <div class="content">
      <div class="page-infinite-wrapper" ref="wrapper" :style="{width:'100%', height: wrapperHeight + 'px' }">
        <wv-group
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="50"
        >
          <div class="wra" v-for="item in goodsLists" @click="goTaobao(item.coupon_click_url)">
            <div v-if="choosePic" class="sircle" @click="choseEditBook(item.num_iid)"><img v-if="choosegoodList.indexOf(item.num_iid)>=0" src="../assets/img/xuanzhong.png" alt=""><div v-else class="box"></div></div>
            <div class="left"><img :src="item.pictUrl" alt=""></div>
            <div class="right" :style="{width:rightWidth}">
              <div class="top">
                <img :style="{width:logoWidth}" src="../assets/img/taobaologo.png" alt="">
                <span :style="{fontSize:textFont}">{{item.title}}</span>
              </div>
              <div class="Allprice">
                <span class="currentPrice" :style="{fontSize:curFont}">券后价￥{{item.zk_final_price}}</span>
                <div  class="taobaoPrice" :class="{'scale':choosePic}">
                  <span>淘宝价</span>
                  <span>￥{{item.reserve_price}}</span>
                </div>
              </div>
              <div v-if="!choosePic" class="bottom">{{item.reserve_price-item.zk_final_price}}元券</div>
              <div v-if="choosePic" class="bottoms"><span>{{item.reserve_price-item.zk_final_price}}元券</span></div>
            </div>
          </div>
        </wv-group>
        <p v-show="loading" class="loading-tips">
          <wv-spinner type="dot-circle" color="#444" :size="24"/>
        </p>
      </div>
    </div>
    <!-- <tab-bar v-if="!choosePic"></tab-bar> -->
    <div v-if="choosePic" class="collectBottom">
        <div @click="checkedAll">全选</div>
        <div @click="deleteGood">删除{{numbers}}</div>
    </div>
  </div>
</template>
<script>
  import tabBar from '../components/tabBar'
  import { Toast } from 'we-vue'
  import CryptoJS from 'crypto-js';
  export default{
    name:'collect',
    data(){
      return{
        choosePic:false,
        textFont:'14px',
        logoWidth:'16px',
        curFont:'14px',
        rightWidth:'80%',
        choosegoodList:[],
        goodsLists:[
        ],
        numbers:0,
        isCheckedAll: false,
        wrapperHeight:0,
        loading: false,
        page: {
          offset: 0,
          limit: 8
        },
        loadFlag:false,
      }
    },
    components:{
      tabBar,
    },
    created(){
    },
    mounted(){
        this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    },
    methods:{
      back(){
        // console.log(1)
        this.$router.go(-1);
      },
      manageGoods(){
        this.choosePic = true;
        this.textFont='12px';
        this.logoWidth='14px';
        this.curFont = '12px';
        this.rightWidth = '70%';
      },
      cancelGoods(){
        this.choosePic = false;
        this.textFont='14px';
        this.logoWidth='16px';
        this.curFont='14px';
        this.rightWidth = '80%';
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
            this.goodsLists.forEach(function (item) {
              this.choosegoodList.push(item.num_iid)
            }, this)
          } else {
            this.choosegoodList = []
          }
          this.numbers = '('+this.choosegoodList.length+')';
          console.log(this.choosegoodList)
      },
      /*删除*/
      deleteGood(){
        if(this.choosegoodList.length==0){
          Toast.text({
            duration: 1000,
            message: '请选择'
          })
          return false;
        }
        this.creatSiagn(this.apiUrl.favorDelFavor);
        this.$http({
          method:'post',
          url:this.apiUrl.favorDelFavor,
          data:{list:this.choosegoodList},
          headers: {
            'uuid': this.uuid,
            'times': this.times,
            'sign': this.saign,
          },
        }).then(res=>{
          if(res.status==200){
            console.log(res);
            if(res.data.status==1){
              Toast.text({
                duration: 1000,
                message: res.data.message
              })
              this.goodsLists=[];
              this.page.offset=0;
              this.page.limit=8;
            }
          }
        }).catch();
      },
      /*加载更多*/
      loadMore(){
        this.loading = true;
        this.page.offset++;
        this.collectList(this.page.offset,this.page.limit);
      },
      /*收藏列表*/
      collectList(page,limit){
        if(this.goodsLists.length==this.total){
          this.loading = false;
          return false;
        }
        this.creatSiagn(this.apiUrl.favorList);
        console.log(this.saign)
        this.$http({
          method:'get',
          url:this.apiUrl.favorList,
          params:{offset:page,limit:limit},
          headers: {
            'uuid': this.uuid,
            'times': this.times,
            'sign': this.saign,
          },
        }).then(res=>{
          if(res.status==200){
            console.log(res);
            this.goodsLists = this.goodsLists.concat(res.data.list);
            this.total = res.data.total;
            this.$nextTick(() => {
              this.loading = false;
            })
          }
        }).catch();
      },
    }
  }
</script>
<style>
.collect{
  overflow-x: auto;
  overflow-y: auto;
}
.collect .collectTopbar{
  width: 100%;
  height: 50px;
  background: url('../assets/img/topBg.jpg') repeat-y;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background: #EA6E35;
}
.collect .collectTopbar .backBtn{
  position: absolute;
  left: 0;
  top: 0;
  width: 50px;
  height: 100%;
  text-align: center;
  z-index: 1;
}
.collect .collectTopbar .backBtn img{
  padding-top: 14px;
  width: 12px;
  height: auto;
  vertical-align: middle;
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
  position: relative;
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
  /* width: 80%; */
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
  vertical-align: middle;
}
.collect .content .wra .right .Allprice{
  padding-top: 4%;
  display: -webkit-flex;
  display: flex;
  align-items: center;
}
.collect .content .wra .right .Allprice .currentPrice{
  color: #fe5500;
}
.collect .content .wra .right .Allprice .taobaoPrice{
  font-size: 12px;
  color: #999;
  flex: 1;
  text-align: right;
}
.scale{
  transform: scale(.9,.9);
}
.collect .content .wra .right .bottom{
  width: 50px;
  height: 15px;
  font-size: 12px;
  text-align: center;
  background: url('../assets/img/vouchersBg.png') no-repeat;
  background-size: 100% 100%;
  color: #fff;
  line-height: 15px;
  margin-top: 4%;
}
.collect .content .wra .right .bottoms{
  width: 40px;
  height: 13px;
  font-size: 12px;
  text-align: center;
  background: url('../assets/img/vouchersBg.png') no-repeat;
  background-size: 100% 100%;
  color: #fff;
  line-height: 13px;
  margin-top:4%;
}
.collect .content .wra .right .bottoms span{
  display: inline-block;
  transform: scale(.8,.8)
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
.content .page-infinite-wrapper{
    position: absolute;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 70px 20px  0 20px;
}
 .content .loading-tips {
    text-align: center;
  }
</style>

