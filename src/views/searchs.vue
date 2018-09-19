<template>
  <div class="ser">
    <div class="top-box">
        <span @click="goback" class="iconfont backBtn">&#xe62d;</span>
        <div class="inp"><input v-focus v-model="search" type="text" placeholder="请输入您要查找的内容"></div>
        <span @click="iptShearch" class="iconfont searchBtn">&#xe684;</span>
    </div>
    <div class="line"></div>
    <div class="serRule" v-if="searchFlag">
      <div class="comSearch">
        <p>大家都在搜</p>
        <div class="con">
          <div>我是商品名称</div>
          <div>我是</div>
          <div @click="historysearch('我是商')">我是商</div>
          <div>我是商品</div>
          <div>我称</div>
          <div>我是商品</div>
          <div>我是商品称</div>
          <div>我是商品名称</div>
          <div>我是商</div>
          <div>我是商品称</div>
          <div>我是商品名称</div>
          <div>我是名称</div>
          <div>我是商品名称</div>
          <div>我是商品名称</div>
        </div>
      </div>
      <div class="searchHistory">
            <div class="history-panel">
              <h4 v-if="historyxs">搜索历史</h4>
              <ul class="his_ulcon" v-if="historyxs">  
                  <li v-for="(item,index) in searches_list" :key="index" @click="historysearch(item)">{{item}}</li>
              </ul> 
              <p v-if="historyxs" @click="clearhis()">清空历史记录</p>   
          </div>
      </div>
    </div>
    <div class="col2 lazyload-list" v-if="!searchFlag">
      <div class="page-infinite-wrapper" ref="wrapper" :style="{width:'100%', height: wrapperHeight + 'px' }">
        <wv-group
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="50"
        >
          <div class="col2Wra lazyload-list-item" @click="goDetail(item.num_iid,item.coupon_click_url,item.coupon_start_time,item.coupon_end_time,item.coupon_info,item.couponPrice,item.reserve_price,item.zk_final_price,item.coupon_all_time)"
               v-for="item in listdata">
            <div class="col2Pic "><img v-lazy="item.pictUrl" :key="item.pictUrl" class="lazyload-image" alt=""></div>
            <div class="col2Name">{{item.title}}</div>
            <div class="col2PrePrice"><span>原价</span>¥{{item.reserve_price}}<span class="num">月销{{item.volume}}笔</span>
            </div>
            <div class="price"><span>券后</span><em>¥</em>{{item.zk_final_price}}<!--<span
              class="coupon">{{item.coupon_info}}</span>--></div>
          </div>
        </wv-group>
        <p v-show="loading" class="loading-tips">
          <wv-spinner type="dot-circle" color="#444" :size="24"/>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
  import {saveSearch} from '../js/cache.js'  //引用本地存储js  
  import storage from 'good-storage'  //引入good-storage包  
  export default {
    data(){
        return{
            search:'',
            searches_list:[], //历史搜索记录列表
            historyxs:false,
            wrapperHeight:0,
            loading: false,
            page: {
              offset: 0,
              limit: 20
            },
            listdata:[],
            searchFlag:true
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
        this.wrapperHeight = document.documentElement.clientHeight - 49 - 53;
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
            this.listdata=[];
            if(this.search!=''){ //搜索框不为空  
                saveSearch(this.search); // 本地存储搜索的内容 
                this.$store.state.name=this.search;
                this.search='';  
                this.searchFlag = false;
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
          this.loading = true;
          this.page.offset++;
          this.moreList();
        },
        moreList() {
          this.$http({
            method: 'get',
            url: this.apiUrl.getlist,
            params: {
              name: this.$store.state.name,
              page_no: this.page.offset,
              page_size: this.page.limit,
            }
          }).then(res => {
            if (res.status == 200) {
              console.log(res);
              // res.data.list.forEach(item => {
              //   let price = item.coupon_info.replace(/满/g, '').replace(/减/g, '$').split('$');
              //   item.reserve_price = item.zk_final_price;
              //   item.zk_final_price = item.zk_final_price >= parseInt(price[0]) ? (item.zk_final_price - parseInt(price[1])).toFixed(2) : item.zk_final_price;
              // });
              this.listdata = this.listdata.concat(res.data.list);
              this.$nextTick(() => {
                this.loading = false;
              })
            }
          }).catch()
        },
    }
  } 
</script>
<style>
@font-face {
  font-family: 'iconfont';
  src: url('../assets/font/iconfont.eot');
  src: url('../assets/font/iconfont.eot?#iefix') format('embedded-opentype'),
  url('../assets/font/iconfont.woff') format('woff'),
  url('../assets/font/iconfont.ttf') format('truetype'),
  url('../assets/font/iconfont.svg#iconfont') format('svg');
}
.iconfont{
  font-family:"iconfont" !important;
  font-size:16px;font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
.top-box{
  width: 100%;
  height: 49px;
  display: -webkit-flex;
  text-align: center;
  align-items: center;
}
.top-box .backBtn{
  font-size: 22px;
  padding: 0 12px 0 8px;
}
.top-box .searchBtn{
  font-size: 24px;
  padding: 0 16px 0 16px;
}
.top-box .inp{
  height: 30px;
  background: #fff;
  border-radius: 12px;
  flex: 1;
  padding: 0 20px;
  border: 1px solid #999;
}
.top-box .inp input{
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
}
.line{
  margin: 0 20px;
  height: 2px;
  background: #999;
}
.comSearch{
  padding: 0 20px;
}
.searchHistory{
  padding: 0 20px;
}
.con{
  display: -webkit-flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
.con div{
 width: 30%;
 text-align: center;
 border-radius: 15px;
 background: #999;
}


 .col2 {
    width: 100%;
    background-color: white;
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    position: relative;
  }

 .col2 .col2Wra {
    width: 49%;
    vertical-align: middle;
    color: black;
    text-align: center;
    display: inline-block;
  }

 .col2 .col2Wra .col2Pic {
    width: 100%;
  }

 .col2 .col2Wra .col2Pic img {
    width: 100%;
    height: auto;
    vertical-align: middle;
  }

  .col2Name, .novelPrice {
    font-size: 14px;
    margin-top: 8px;
    text-align: left;
  }

  .col2PrePrice {
    font-size: 12px;
    text-align: left;
    color: #a3a3a3;
  }

  .num {
    float: right;
    padding-right: 5px;
  }

  .price {
    color: #fe5500;
    font-size: 19px;
    text-align: left;
  }

  .price span {
    font-size: 12px;
  }

  .price em {
    font-size: 14px;
    font-style: normal;
    padding: 0 5px;
  }

  .coupon {
  }

  .col2Wra:nth-child(2n+1) {
    margin-right: 2%;
  }

  .weui-cells {
    margin-top: 0;
  }

  .page-infinite-wrapper {
    position: absolute;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .loading-tips {
    text-align: center;
  }

  .weui-cells:before {
    border: 0 !important;
  }
</style>

