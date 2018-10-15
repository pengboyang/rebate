<template>
  <div class="detail" @scroll="showOrhide">
    <div class="topBar">
      <div class="returnPic" @click="back">
          <img src="../assets/img/returnback.png" alt="">
      </div>
      <div class="dtabs">
        <div v-for="(item,index) in tabList" :class="{'active':activeIndex==index}" @click="goIndex(index)">{{item.name}}</div>
      </div>
    </div>
    <div class="detailWrapper">
      <div class="loopWra">
        <div class="loopBack" @click="back"><img src="../assets/img/loopBack.png" alt=""></div>
        <swiper :options="swiperOption" class="sswipers">
          <swiper-slide><img v-lazy="bigPic" :key="bigPic" @load="imageLoaded"></swiper-slide>
          <!-- <div class="swiper-pagination" slot="pagination"></div> -->
        </swiper>
      </div>
      <div class="commodity">
        <div class="commodityInfo">
          <div class="pic">
            <img src="../assets/img/taobaologo.png" alt="">
            <span>{{title}}</span>
          </div>
        </div>
        <div class="commodityPrice">
          <div class="nums">
            <span class="taobao">淘宝价</span>
            <span class="tbPrice">￥{{reservePrice}}</span>
            <span class="baoyou">包邮</span>
            <span class="xiaoliang">月销量</span>
            <span class="tbNums">{{volume}}</span>
          </div>
          <div class="Allprice">
            <span class="currentPrice">券后价</span>
            <span class="currentPrice1">￥{{zkfinalPrice}}</span>
          </div>
        </div>
      </div>
      <div class="vouchers">
        <div class="picBox">
          <img src="../assets/img/vouchersBg.png" alt="">
          <div class="contetBox" @click="goTaobao(url)">
            <div class="left">
              <div class="money">{{couponPrice}}元优惠券</div>
              <div class="expiryDat">使用期限：<span>{{allTime}}</span></div>
            </div>
            <div class="right">立即领券</div>
          </div>
        </div>
        <div class="info">
          <p>宝贝详情</p>
          <div class="picWra" v-for="item in picInfoList"><img :src="item+'_400x400.jpg'" alt=""></div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div @click="collection"><img class="img1" src="../assets/img/shoucang.png" alt=""><div class="text">收藏</div></div>
      <div @click="showPop"><img class="img2" src="../assets/img/fenxiang.png" alt=""><div class="text">分享宝贝</div></div>
      <div @click="goTaobao(url)">领券购买<span class="price">￥{{zkfinalPrice}}</span></div>
    </div>
    <wv-popup :visible.sync="popupVisible2" :height="180">
      <div class="popTitle">分享到</div>
      <div class="popInfo">
        <div class="one">
          <img src="../assets/img/haoyou.png" alt="">
          <div>微信好友</div>
        </div>
        <div class="two">
          <img src="../assets/img/pengyouquan.png" alt="">
          <div>微信朋友圈</div>
        </div>
      </div>
    </wv-popup>
  </div>
</template>
<script>
  import CryptoJS from 'crypto-js';
  import { Header } from 'we-vue';
  import { Popup } from 'we-vue'
  import { Lazyload } from 'we-vue'
  import { Toast } from 'we-vue'
  export default{
    name:'detail',
    data(){
      return{
        swiperOption: {//swiper3
          // autoplay: 3000,
          // speed: 1000,
          // pagination: {
          //   el: '.swiper-pagination',
          // },
        },
        popupVisible2:false,
        goodId:'',
        top:0,
        loopHeight:0,
        activeIndex:0,
        tabList:[
          {
            id:1,
            name:'宝贝'
          },
          {
            id:2,
            name:'详情'
          }
        ],
        bigPic:'',
        picInfoList:[],
        title:'',
        volume:'',
        url:'',
        sTime:'',
        eTime:'',
        couponInfo:'',
        couponPrice:'',
        reservePrice:'',
        zkfinalPrice:'',
        allTime:'',
      }
    },
    watch:{
      bigPic:function(){
        this.$nextTick(function(){
        })
      }
    },
    created(){
      this.goodId = this.$route.query.id;
      this.url = this.$route.query.url;
      this.sTime = this.$route.query.sTime;
      this.eTime = this.$route.query.eTime;
      this.couponInfo = this.$route.query.couponInfo;
      this.couponPrice = this.$route.query.couponPrice;
      this.reservePrice = this.$route.query.reservePrice;
      this.zkfinalPrice = this.$route.query.zkfinalPrice;
      this.allTime = this.$route.query.allTime;
      this.goodDetail(this.goodId);
      console.log(this.url)
    },
    methods:{
      back(){
        this.$router.go(-1);
      },
      showPop(){
        this.popupVisible2 = true;
      },
      goodDetail(id){
        this.$http({
          method:'get',
          url:this.apiUrl.goodsInfo,
          params:{goodsId:id}
        }).then(res=>{
          if(res.status==200){
            console.log(res);
            this.bigPic = res.data.pictUrl+'_400x400.jpg';
            this.picInfoList = res.data.small_images;
            this.title = res.data.title;
            this.volume = res.data.volume;
          }
        }).catch()
      },
      showOrhide(){
        $('.topBar').css({ 
          opacity: ((($('.detail').scrollTop() / this.loopHeight) >= 1) ? 1 : ($('.detail').scrollTop() / this.loopHeight)) 
        }) 
        if($('.detail').scrollTop()>=this.top){
          this.activeIndex = 1;
        }else{
          this.activeIndex = 0;
        }
      },
      goIndex(index){
        if(index==0){
          $('.detail').animate({scrollTop:0}, 500);
        }else{
          $('.detail').animate({scrollTop:this.top}, 500);
        }
      },
      imageLoaded(){
        this.top = Math.floor($('.info').offset().top-50+ $('.detail').scrollTop());
        this.loopHeight = Math.floor($('.loopWra').height());
      },
      collection() {
        let isLogin = this.isLogin();
        if (isLogin) {
          this.creatSiagn(this.apiUrl.favorAddFavor);
          console.log(this.saign)
          this.$http({
            method:'post',
            url:this.apiUrl.favorAddFavor,
            data:{
              couponClickUrl :this.url,
              couponEndTime  :this.eTime,
              couponInfo  :this.couponInfo,
              couponPrice  :this.couponPrice,
              couponStartTime  :this.sTime,
              numIid  :this.goodId,
              picUrl  :this.bigPic,
              reservePrice  :this.reservePrice,
              title  :this.title,
              zkFinalPrice  :this.zkfinalPrice ,
            },
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
              }else if(res.data.status==0){
                Toast.text({
                  duration: 1000,
                  message: res.data.message
                })
              }else{
                Toast.text({
                  duration: 1000,
                  message: res.data.message
                })
              }
            }
          }).catch();
          return false;
        }
        this.$router.push({path:'/login'});
      }
    }
  }
</script>
<style>
.detail{
  overflow-x: auto;
  overflow-y: auto;
}
.detail .topBar{
  position: fixed;
  width: 100%;
  height: 50px;
  line-height: 50px;
  opacity: 0;
  z-index: 2;
  background: #fff;
}
.active{
  color: #fe4304;
}

.detail .topBar .returnPic{
  width: 50px;
  height: 100%; 
  text-align: center;
  position: absolute;
  left: 0;
  top: 0;
}

.detail .topBar .returnPic img{
  width: 12px;
  height: auto;
  vertical-align: middle;
}
.detail .dtabs{
  display: -webkit-flex;
  display:flex;
  justify-content:center;
  font-size: 18px;
}
.detail .dtabs div{
  padding: 0 15px;
}
.detail .detailWrapper{
  padding-bottom: 34px;
}
.detail .detailWrapper .loopWra{
  position: relative;
  width: 100%;
  overflow: hidden;
  left: 0;
  top: 0;
}
.detail .detailWrapper .loopWra .loopBack{
  width: 50px;
  height: 50px;
  text-align: center;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
}
.detail .detailWrapper .loopWra .loopBack img{
  width: 28px;
  height: auto;
  vertical-align: middle;
  margin-top: 20px;
}
.detail .detailWrapper .loopWra .sswipers{
  width: 100%;
}
.detail .detailWrapper .loopWra .sswipers img{
  width: 100%;
  height: auto;
  vertical-align: middle;
}
.detail .detailWrapper .commodity{
  padding: 0 15px;
  margin-top: 12px;
}
.detail .detailWrapper .commodity .commodityInfo{
  margin-bottom: 5px;
  line-height: 20px;
}
.detail .detailWrapper .commodity .commodityInfo .pic img{
  width: 18px;
  height: auto;
  vertical-align: middle;
}
.detail .detailWrapper .commodity .commodityInfo span{
  vertical-align: middle;
  font-size: 15px;
}
.detail .detailWrapper .commodity .commodityPrice{
  margin-bottom: 26px;
}
.detail .detailWrapper .commodity .commodityPrice .Allprice .currentPrice{
  font-size: 16px;
  color: #fe4304;
  font-weight: 700;
}
.detail .detailWrapper .commodity .commodityPrice .Allprice .currentPrice1{
  font-size: 16px;
  color: #fe4304;
  padding-right: 15px;
  font-weight: 700;
}
.detail .detailWrapper .commodity .commodityPrice .nums{
 line-height: 14px;
 margin-bottom: 8px;
}
.detail .detailWrapper .commodity .commodityPrice .nums span{
  vertical-align: middle;
}
.detail .detailWrapper .commodity .commodityPrice .nums .taobao{
  font-size: 14px;
  color: #000;
}
.detail .detailWrapper .commodity .commodityPrice .nums .tbPrice{
  font-size: 13px;
  padding-right: 20%;
}
.detail .detailWrapper .commodity .commodityPrice .nums .baoyou{
  font-size: 14px;
  color: #999;
}
.detail .detailWrapper .commodity .commodityPrice .nums .xiaoliang{
  font-size: 14px;
  color: #999;
}
.detail .detailWrapper .commodity .commodityPrice .nums .tbNums{
  font-size: 13px;
  color: #999;
  padding-left: 5px;
}
.detail .detailWrapper .vouchers{
  padding: 0 15px;
}
.detail .detailWrapper .vouchers .picBox{
  width: 100%;
  position: relative;
  margin-bottom: 30px;
}
.detail .detailWrapper .vouchers .picBox img{
  width: 100%;
  height: auto;
  vertical-align: middle;
}
.detail .detailWrapper .vouchers .picBox .contetBox{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  text-align: center;
  color: #fff;
}
.detail .detailWrapper .vouchers .picBox .contetBox .left{
  flex: 2;
  border-right: 1px dotted #fff;
}
.detail .detailWrapper .vouchers .picBox .contetBox .left .money{
  font-size: 24px;
  line-height: 24px;
}
.detail .detailWrapper .vouchers .picBox .contetBox .left .expiryDat{
  font-size: 12px;
  transform: scale(.8,.75);
}
.detail .detailWrapper .vouchers .picBox .contetBox .right{
  flex: 1;
  font-size: 14px;
}
.detail .detailWrapper .vouchers .info p{
  margin-bottom: 10px;
  font-weight: 700;
}
.detail .detailWrapper .vouchers .info .picWra img{
  width: 100%;
  height: auto;
  vertical-align: middle;
}
.detail .bottom{
  width: 100%;
  height: 53px;
  position: fixed;
  left: 0;
  bottom: 0;
  display: -webkit-flex;
  display: flex;
  text-align: center;
  align-items: center;
  background: #fff;
  border-top: 1px solid #e0e0e0;
}
.detail .bottom div{
  height: 100%;
  flex: 1;
  border-right: 1px solid #e0e0e0;
}
.detail .bottom div:last-child{
  border-right: none;
}
.detail .bottom div .img1{
  width: 28px;
  height: auto;
  vertical-align: middle;
}
.detail .bottom div .img2{
  height: 24px;
  vertical-align: middle;
}
.detail .bottom div .text{
  font-size: 12px;
  color: #999;
}
.detail .bottom div .price{
  color: #fe4304;
}
.detail .popTitle{
  height: 70px;
  text-align: center;
  line-height: 70px;
  font-size: 19px;
  font-weight: 700;
}
.detail .popInfo {
  display: -webkit-flex;
  display: flex;
  justify-content: space-around;
  text-align: center;
}
.detail .popInfo .one img{
  width: 60px;
  height: auto;
  vertical-align: middle;
}
.detail .popInfo .two img{
  height: 50px;
  vertical-align: middle;
}
.detail .popInfo .one div{
  padding-top: 15px;
}
.detail .popInfo .two div{
  padding-top: 15px;
}
/* .detail .detailWrapper .loopWra .sswipers img[lazy=loading] {
  width: 40px;
  height: 360px;
} */

</style>

