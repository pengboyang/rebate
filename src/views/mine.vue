<template>
  <div class="mine" @scroll="handleScroll">
    <div class="minewra clearfix">
      <div class="mine-top">
        <img src="../assets/img/mintop.png" alt="">
        <div class="wraBox">
          <div class="left"><img src="../assets/img/touxiang.png" alt=""></div>
          <div class="right">
            <div class="name">{{nickName}}</div>
            <img v-if="tbLogins" @click="getUserUuid" src="../assets/img/taobaoshouqun.png" alt="">
          </div>
        </div>
      </div>
      <div class="mine-bottom">
        <div class="wra" @click="goCoolect">
          <img src="../assets/img/shoucang.png" alt="">
          <div class="flexWid">我的收藏</div>
          <div class="chakan">查看></div>
        </div>
        <div class="wra" @click="goSetUp">
          <img src="../assets/img/shezhi.png" alt="">
          <div class="flexWid">设置</div>
          <div class="chakan">查看></div>
        </div>
      </div>
      <wv-loadmore type="line" text="精品推荐"></wv-loadmore>
      <div class="page-infinite-wrapper" ref="wrapper" :style="{width:'100%', height: wrapperHeight + 'px' }">
        <wv-group
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="50"
        >
          <div class="listCon"  @click="goDetail(item.num_iid,item.coupon_click_url,item.coupon_start_time,item.coupon_end_time,item.coupon_info,item.couponPrice,item.reserve_price,item.zk_final_price,item.coupon_all_time)"
               v-for="item in listdata">
              <div class="toppic"><img v-lazy="item.pictUrl" :key="item.pictUrl" alt=""></div>
              <div class="goodTitle">
                <img src="../assets/img/taobaologo.png" alt="">
                <span>{{item.title}}</span>
              </div>
              <div class="goodsInfo">
                <span class="tbprice">淘宝价￥{{item.reserve_price}}</span>
                <span class="month">月销量{{item.volume}}</span>
              </div>
              <div class="youhui">
                <div class="quanhou">券后<span class="number">￥{{item.zk_final_price}}</span></div>
                <div class="youhuiPrice"><img src="../assets/img/vouchersBg.png" alt=""><span>{{item.reserve_price-item.zk_final_price}}元券</span></div>
              </div>
            </div>
        </wv-group>
        <p v-show="loading" class="loading-tips">
          <wv-spinner type="dot-circle" color="#444" :size="24"/>
        </p>
      </div>
    </div>
    <tab-bar></tab-bar>
    <div class="gotop" @click="gotop" v-show="backTopShow"><img src="../assets/img/gotop.png"/></div>
  </div>
</template>
<script>
    import tabBar from '../components/tabBar'
    import { Toast } from 'we-vue'
    import { Loadmore } from 'we-vue'
    export default{
      name:'mine',
      data(){
        return{
          nickName:'我是淘宝用户名',
          tbLogins:true, 
          wrapperHeight:0,
          loading: false,
          page: {
            offset: 0,
            limit: 20
          },
          total:true,
          listdata:[],
          backTopShow: false,
        }
      },
      components:{
        tabBar,
      },
      mounted(){
          this.wrapperHeight = document.documentElement.clientHeight - 50;
      },
      created(){
        let isLogin = this.isLogin();
        let tbLogin = this.tbLogin();
        if (isLogin) {
          this.nickName = JSON.parse(localStorage.getItem('userInfo')).nickName;
        }
        if(tbLogin){
          this.tbLogins = false;
        }
      },
      methods:{
        goSetUp(){
          this.$router.push({path:'/setup'});
        },
        goCoolect(){
          this.$router.push({path:'collect'});
        },
        loadMore() {
          this.page.offset++;
          this.moreList('精品推荐',this.page.offset,this.page.limit);
        },
        moreList(name,page_no,page_size) {
          if(!this.total){
            return false;
          }
          this.loading = true;
          this.$http({
            method: 'get',
            url: this.apiUrl.getlist,
            params: {
              name: name,
              page_no: page_no,
              page_size: page_size,
            }
          }).then(res => {
            if (res.status == 200) {
              console.log(res);
              if(res.data.list.length==0){
                  this.total=false;
              }
              res.data.list.forEach(item => {
                let price = item.coupon_info.replace(/满/g, '').replace(/减/g, '$').split('$');
                let stime = item.coupon_start_time.replace(/-/g,'.');
                let etime = item.coupon_end_time.replace(/-/g,'.');
                item.coupon_all_time = stime+'-'+etime;
                item.reserve_price = item.zk_final_price;
                item.zk_final_price = item.zk_final_price >= parseInt(price[0]) ? (item.zk_final_price - parseInt(price[1])).toFixed(2) : item.zk_final_price;
                item.pictUrl = item.pictUrl +'_200x200.jpg';
                item.title = item.title.slice(0,18)+'...';
                item.couponPrice = parseInt(price[1]);
              });
              this.listdata = this.listdata.concat(res.data.list);
              this.$nextTick(() => {
                this.loading = false;
              })
            }
          }).catch()
        },
        goDetail(id, url,sTime,eTime,couponInfo,couponPrice,reservePrice,zkfinalPrice,allTime) {
          this.$router.push({path: '/detail', query: {id: id,url:url,sTime:sTime,eTime:eTime,couponInfo:couponInfo,couponPrice:couponPrice,reservePrice:reservePrice,zkfinalPrice:zkfinalPrice,allTime:allTime}});
        },
        gotop() {
          $('.mine').animate({scrollTop:0}, 500);
        },
        handleScroll() {
          if ($('.mine').scrollTop() > 100) {
            this.backTopShow = true;
          } else {
            this.backTopShow = false;
          }
        }
      }
    }
</script>
<style>
.clearfix:after{
  content: "020"; 
  display: block; 
  height: 0; 
  clear: both; 
  visibility: hidden;  
}

.clearfix {
  /* 触发 hasLayout */ 
  zoom: 1; 
}
.mine{
  overflow-x: auto;
  overflow-y: auto;
}
.mine .minewra .mine-top{
  width: 100%;
  position: relative;
}
.mine .minewra .mine-top img{
  width: 100%;
  height: auto;
  vertical-align: middle;
}
.mine .minewra .mine-top .wraBox{
  display: -webkit-flex;
  display: flex;
  align-items: center;
  position: absolute;
  left: 17px;
  top: 50%;
  transform: translateY(-50%);
}
.mine .minewra .mine-top .wraBox .left{
  width: 30%;
  margin-right: 21px;
}
.mine .minewra .mine-top .wraBox .right .name{
  font-size: 17px;
  color: #fff;
  margin-bottom: 6px;
}
.mine .minewra .mine-top .wraBox .right img{
  width: 75px;
  height: auto;
  vertical-align: middle;
}
.mine .minewra .line{
  width: 100%;
  height: 2px;
  background: #e0e0e0;
}
.mine .minewra .mine-center{
  text-align: center;
  padding-top: 20px;
  padding-bottom: 26px;
}
.mine .minewra .mine-center .money{
  font-size: 28px;
  color: red;
}
.mine .minewra .mine-center .textinfo{
  font-size: 16px;
}
.mine .mine-bottom{
}
.mine .minewra .mine-bottom .wra{
  display: -webkit-flex;
  display: flex;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #e0e0e0;
}
.mine .minewra .mine-bottom .wra:last-child{
  /* border: none; */
}
.mine .minewra .mine-bottom .wra img{
  width: 16px;
  height: auto;
  vertical-align: middle;
}
.mine .minewra .mine-bottom .wra .flexWid{
  flex: 1;
  padding-left: 14px;
  font-weight: 700;
  font-size: 14px;
}
.mine .minewra .mine-bottom .wra .chakan{
  font-size: 12px;
  color: #999;
}
.mine .minewra .listCon{
  width: 48%;
  background: #fff;
  float: left;
  margin-right: 4%;
  margin-bottom: 2%;
}
.mine .minewra .listCon:nth-child(2n){
  margin-right: 0;
}
.mine .minewra .listCon .toppic img{
  width: 100%;
  height: auto;
  vertical-align: middle;
}
.mine .minewra .listCon .goodTitle{
  padding-top: 5px;
  line-height: 16px;
  padding-left: 5px;
}
.mine .minewra .listCon .goodTitle img{
  width: 15px;
  height: auto;
  vertical-align: middle;
}
.mine .minewra .listCon .goodTitle span{
  vertical-align: middle;
  font-size: 13px;
}
.mine .minewra .listCon .goodsInfo{
  font-size: 12px;
  color: #999;
  display: -webkit-flex;
  display: flex;
  padding-bottom: 2px;
  padding-top: 3px;
}
.mine .minewra .listCon .goodsInfo .tbprice{
  padding-left: 5px;
}
.mine .minewra .listCon .goodsInfo .month{
  flex: 1;
  text-align: right;
  padding-right: 5px;
}
.mine .minewra .listCon .youhui {
  padding-left: 5px;
  color: red;
  padding-bottom: 5px;
  display: flex;
  display: -webkit-flex;
  align-items: center;
}
.mine .minewra .listCon .youhui .quanhou{
  font-size: 12px;
  flex: 1;
}
.mine .minewra .listCon .youhui .quanhou .number{
  font-size: 14px;
  font-weight: 700;
  padding-left: 4px;
}
.mine .minewra .listCon .youhui .youhuiPrice{
  padding-right: 5px;
  position: relative;
}
.mine .minewra .listCon .youhui .youhuiPrice img{
  width: 44px;
  vertical-align: middle;
  height: auto;
}
.mine .minewra .listCon .youhui .youhuiPrice span{
  position: absolute;
  font-size: 12px;
  left: 3px;
  top: 5px;
  transform: scale(.7,.7);
  color: #fff;
}
.mine .minewra .weui-cells{
  margin-top: 0;
}
.mine .minewra .page-infinite-wrapper{
  position: static;
  overflow-y: visible;
  overflow-x: visible;
  padding: 0 20px;
}
.mine .minewra .wrapper{
  overflow-x: visible;
  overflow-y: visible;
}
.mine .minewra .loading-tips {
  text-align: center;
}
.mine .gotop {
    width: 30px;
    height: 30px;
    position: fixed;
    bottom: 80px;
    right: 15px;
  }

.mine .gotop img {
    width: 100%;
  }
</style>

