<template>
  <div class="ser">
    <div class="top">
        <div class="topbg"><img src="../assets/img/topBg.jpg" alt=""></div>
        <div class="top-box">
            <div class="backBtn"><img @click="goback" src="../assets/img/loginzback.png"></img></div>
            <div class="inp"><input v-focus v-model="search" type="text" placeholder="请输入您要查找的内容"></div>
            <span @click="iptShearch" class="searchBtn">搜索</span>
        </div>
    </div>
    <div class="serRule" v-if="searchFlag">
      <div class="comSearch">
        <p>大家都在搜</p>
        <div class="searchTitle">
          <div class="sFlex" v-for="items in hotSearchList" @click="historysearch(items)">{{items}}</div>
        </div>
      </div>
      <div class="searchHistory">
        <div class="history-panel" v-if="historyxs">
            <div class="hisTop"><div class="historys">历史搜索</div><div class="del" @click="clearhis()"><img src="../assets/img/shanchu.png" alt=""></div></div>
            <div class="his_ulcon">
              <div class="his_li" v-for="(item,index) in searches_list" :key="index" @click="historysearch(item)">{{item}}</div>
            </div>
        </div>
      </div>
    </div>
    <!-- <div class="toastInfo">相关宝贝太少了，推荐以下宝贝~</div> -->
    <!-- <div class="sortsRule" v-if="!searchFlag">
      <div class="sortCon">
        <div>销量</div>
        <div class="jiantou">
          <div class="tops" @click="sortH"><img src="../assets/img/shang.png" alt=""></div>
          <div class="bottom" @click="sortL"><img src="../assets/img/xia.png" alt=""></div>
        </div>
      </div>
      <div class="sortCon">
        <div>价格</div>
        <div class="jiantou">
          <div class="tops"><img src="../assets/img/shang.png" alt=""></div>
          <div class="bottom"><img src="../assets/img/xia.png" alt=""></div>
        </div>
      </div>
      <div class="sortCon">优惠券</div>
    </div> -->
    <div class="searchCon clearfix" @scroll="handleScroll" v-if="!searchFlag">
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
    <div class="gotop" @click="gotop" v-show="backTopShow"><img src="../assets/img/gotop.png"/></div>
  </div>
</template>
<script>
  import {saveSearch} from '../js/cache.js'  //引用本地存储js  
  import storage from 'good-storage'  //引入good-storage包  
  import { Toast } from 'we-vue'
  export default {
    data(){
        return{
            search:'',
            searches_list:[], //历史搜索记录列表
            historyxs:false,//是否显示搜索历史
            wrapperHeight:0,
            loading: false,
            page: {
              offset: 0,
              limit: 20
            },
            listdata:[],
            searchFlag:true,//显示搜索列表
            total:true,//列表是否为空
            hotSearchList:[
              '打底裤', '背心吊带',  '文胸',  '韩版棉服',  '风衣',  'Ｔ恤衫', '设计潮牌', '卫衣', '休闲零食', '大闸蟹' 
            ],
            backTopShow: false,
        }
    },
    created(){
      this.initPage();
    },
    directives: {
      focus: {
        // 指令的定义
        inserted: function (el) {
          el.focus()
        }
      }
    },
    mounted(){
        this.wrapperHeight = document.documentElement.clientHeight - 60;
    },
    methods:{
        goback(){
          this.$router.go(-1)
        },
        //输入框获取焦点
        initPage(){
            //为避免重复先清空再添加  
            this.searches_list = [];
            let searches=storage.get('_search_');  
            this.searches_list = searches?searches:[];
            if (this.searches_list.length > 0 ) {
                this.historyxs=true;  
            }else{
                this.historyxs=false;   
            }
        },
        //点击搜索
        iptShearch(){
            if(this.search!=''){ //搜索框不为空  
              this.listdata=[];
              saveSearch(this.search); // 本地存储搜索的内容 
              this.$store.state.name=this.search;
              this.page.offset=0;this.page.limit=20;
              this.search='';  
              this.searchFlag = false;
              $('.searchCon').scrollTop(0);
            }else{
              Toast.text({
                  message: '请输入要搜索的物品',
                  duration: 2000,
              });
            }  
        },
        //清空历史记录 
        clearhis(){   
            storage.remove('_search_');  
            this.searches_list = [];
            this.historyxs=false;     
        },
        //点击历史搜索把搜索的记录添加到good-storage中 
        historysearch(item){           
            saveSearch(item);  
            this.search = item; 
            this.iptShearch();
        } ,
        loadMore() {
          this.page.offset++;
          this.moreList(this.$store.state.name,this.page.offset,this.page.limit);
        },
        moreList(name,page_no,page_size) {
          if(!this.total&&page_no!=1){
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
                if(this.page.offset==1){
                  this.$store.state.name = '女装';
                  this.moreList(this.$store.state.name,page_no,page_size)
                }else{
                  this.total=false;
                }
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
        sortH(){
          console.log(1);
        },
        sortL(){
          console.log(2);
        },
        goDetail(id, url,sTime,eTime,couponInfo,couponPrice,reservePrice,zkfinalPrice,allTime) {
          this.$router.push({path: '/detail', query: {id: id,url:url,sTime:sTime,eTime:eTime,couponInfo:couponInfo,couponPrice:couponPrice,reservePrice:reservePrice,zkfinalPrice:zkfinalPrice,allTime:allTime}});
        },
        gotop() {
          $('.searchCon').animate({scrollTop:0}, 500);
        },
        handleScroll() {
          if ($('.searchCon').scrollTop() > 100) {
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
.ser{
  overflow-x: auto;
  overflow-y: auto;
}
.ser .top{
    position: fixed;
    width: 100%;
    height: 50px;
    left: 0;
    top: 0;
    z-index: 999;
}
.ser .topbg{
  width: 100%;
  height: 50px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 997;
}
.ser .topbg img{
  width: 100%;
  height: 50px;
  vertical-align: middle;
}
.ser .top-box{
  width: 100%;
  height: 50px;
  display: -webkit-flex;
  text-align: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 998;
}
.ser .top-box .backBtn{
  width: 50px;
  height: 100%;
  display: -webkit-flex;
  display: flex;
  align-items: center;
}
.ser .top-box .backBtn img{
  width: 10px;
  height: auto;
  vertical-align: middle;
  margin: 0 auto;
}
.ser .top-box .searchBtn{
  display: inline-block;
  width: 60px;
  height: 100%;
  font-size: 16px;
  line-height: 50px;
  text-align: center;
  color: #fff;
}
.ser .top-box .inp{
  height: 26px;
  background: #fff;
  border-radius: 12px;
  flex: 1;
  padding: 0 20px;
}
.ser .top-box .inp input{
  width: 100%;
  height: 100%;
  border-radius: 0;
  outline: none;
  border: none;
  vertical-align: top;
}
.ser .serRule{
}
.ser .serRule .comSearch{
  padding-left:20px;
}
.ser .serRule .comSearch p{
  font-weight: 700;
  padding: 18px 0 15px 0;
}
.ser .serRule .comSearch .searchTitle{
  display: -webkit-flex;
  display: flex;
  font-size: 14px;
  flex-direction:row;
  flex-wrap: wrap;
  padding-left: 10px;
}
.ser .serRule .comSearch .searchTitle .sFlex{
  padding: 2px 20px;
  background: #e0e0e0;
  border-radius: 14px;
  margin-bottom: 15px;
  margin-right: 15px;
}
.ser .serRule .searchHistory{
  padding: 20px 0 0 20px;
}
.ser .serRule .searchHistory .history-panel .hisTop{
  display: -webkit-flex;
  display: flex;
  align-items: center;
  padding: 0 20px 20px 0;
}
.ser .serRule .searchHistory .history-panel .hisTop .historys{
  flex: 1;
  font-weight: 700;
}
.ser .serRule .searchHistory .history-panel .hisTop .del{
  width: 35px;
  text-align: right;
}
.ser .serRule .searchHistory .history-panel .hisTop .del img{
  width: 15px;
}
.ser .serRule .searchHistory .history-panel .his_ulcon{
  padding-left: 10px;
  font-size: 14px;
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.ser .serRule .searchHistory .history-panel .his_ulcon .his_li{
  background: #e0e0e0;
  padding: 2px 20px;
  margin-right: 15px;
  margin-bottom: 15px;
  border-radius: 14px;
  color: #666;
}
.ser .sortsRule{
  display: -webkit-flex;
  display: flex;
  justify-content: space-around;
  text-align: center;
  width: 100%;
  line-height: 40px;
  height: 40px;
  margin-top: 50px;
}
.ser .sortsRule .sortCon{
  position: relative;
}
.ser .sortsRule .jiantou{
  width: 30px;
  height: 40px;
  position: absolute;
  right: -34px;
  top: 0;
}
.ser .sortsRule .jiantou .tops{
  width: 100%;
  height: 20px;
  text-align: left;
}
.ser .sortsRule .jiantou .tops img{
  height: 5px;
  vertical-align: middle;
  margin-top: -10px;
}
.ser .sortsRule .jiantou .bottom{
  width: 100%;
  height: 20px;
  text-align: left;
}
.ser .sortsRule .jiantou .bottom img{
  height: 5px;
  vertical-align: middle;
  margin-top: -34px;
}
.ser .searchCon{
  padding: 0 15px;
  padding-top: 60px;
}
.ser .searchCon .listCon{
  width: 48%;
  background: #fff;
  float: left;
  margin-right: 4%;
  margin-bottom: 2%;
}
.ser .searchCon .listCon:nth-child(2n){
  margin-right: 0;
}
.ser .searchCon .listCon .toppic img{
  width: 100%;
  height: auto;
  vertical-align: middle;
}
.ser .searchCon .listCon .goodTitle{
  padding-top: 5px;
  line-height: 16px;
  padding-left: 5px;
}
.ser .searchCon .listCon .goodTitle img{
  width: 15px;
  height: auto;
  vertical-align: middle;
}
.ser .searchCon .listCon .goodTitle span{
  vertical-align: middle;
  font-size: 13px;
}
.ser .searchCon .listCon .goodsInfo{
  font-size: 12px;
  color: #999;
  display: -webkit-flex;
  display: flex;
  padding-bottom: 2px;
  padding-top: 3px;
}
.ser .searchCon .listCon .goodsInfo .tbprice{
  padding-left: 5px;
}
.ser .searchCon .listCon .goodsInfo .month{
  flex: 1;
  text-align: right;
  padding-right: 5px;
}
.ser .searchCon .listCon .youhui {
  padding-left: 5px;
  color: red;
  padding-bottom: 5px;
  display: flex;
  display: -webkit-flex;
  align-items: center;
}
.ser .searchCon .listCon .youhui .quanhou{
  font-size: 12px;
  flex: 1;
}
.ser .searchCon .listCon .youhui .quanhou .number{
  font-size: 14px;
  font-weight: 700;
  padding-left: 4px;
}
.ser .searchCon .listCon .youhui .youhuiPrice{
  padding-right: 5px;
  position: relative;
}
.ser .searchCon .listCon .youhui .youhuiPrice img{
  width: 44px;
  vertical-align: middle;
  height: auto;
}
.ser .searchCon .listCon .youhui .youhuiPrice span{
  position: absolute;
  font-size: 12px;
  left: 3px;
  top: 5px;
  transform: scale(.7,.7);
  color: #fff;
}
.ser .weui-cells{
  margin-top: 0;
  /* background-color: #e0e0e0; */
}
.ser .page-infinite-wrapper{
  position: static;
  overflow-x: visible;
  overflow-y: visible;
}
.ser .loading-tips {
  text-align: center;
}
.ser .gotop {
    width: 30px;
    height: 30px;
    position: fixed;
    bottom: 80px;
    right: 15px;
  }

.ser .gotop img {
    width: 100%;
  }
</style>

