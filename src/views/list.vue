<template>
  <div class="manList">
    <top-bar></top-bar>
    <my-swiper :lists="sweiperList"></my-swiper>
    <wv-grid>
      <wv-grid-item v-for="(item,index) in toolbarList" :key="index" @click="toolbar(item.name,item.select)">
        <img :src="item.url" slot="icon">
        <span slot="label" class="icontxt">{{item.title}}</span>
      </wv-grid-item>
    </wv-grid>
    <div>
      <ten :listdata="listdata.girl"></ten>
      <twenty :listdata="listdata.man"></twenty>
      <hot></hot>
      <index-good :listdata="listdata.good"></index-good>
    </div>
    <wv-loadmore type="line" text="这就是我的底线"></wv-loadmore>
    <tab-bar></tab-bar>
  </div>
</template>
<script>
  import 'swiper/dist/css/swiper.css'////这里注意具体看使用的版本是否需要引入样式，以及具体位置。
  import {Dialog} from 'we-vue'
  import mySwiper from '../components/mySwiper.vue'
  import ten from '../components/ten'
  import twenty from '../components/twenty'
  import good from '../components/good'
  import indexGood from '../components/indexGood'
  import hot from '../components/hot'
  import topBar from '../components/topbar'
  import tabBar from '../components/tabBar'

  export default {
    name: 'manList',
    data() {
      return {
        listdata: {
          girl: {
            name: '女装尖货',
            select: '女装',
            list: []
          },
          man: {
            name: '精品男装',
            select: '男装',
            list: []
          },
          good: {
            name: '特价好货',
            select: '女装',
            list: []
          },
        },
        toolbarList: [
          {
            title: '女装',
            url: require('../assets/img/icon_1.png'),
            name: '女装尖货',
            select: '女装'
          },
          {
            title: '美妆洗护',
            url: require('../assets/img/icon_2.png'),
            name: '美妆洗护',
            select: '美妆'
          },
          {
            title: '男装',
            url: require('../assets/img/icon_4.png'),
            name: '精品男装',
            select: '男装'
          },
          {
            title: '母婴',
            url: require('../assets/img/icon_3.png'),
            name: '母婴',
            select: '母婴'
          },
          {
            title: '鞋包配饰',
            url: require('../assets/img/icon_8.png'),
            name: '鞋包配饰',
            select: '女鞋'
          },
          {
            title: '内衣',
            url: require('../assets/img/icon_7.png'),
            name: '内衣',
            select: '女士内衣'
          },
          {
            title: '童装',
            url: require('../assets/img/icon_6.png'),
            name: '童装',
            select: '童装'
          },
          {
            title: '更多分类',
            url: require('../assets/img/icon_5.png'),
            name: '精品推荐',
            select: '女装'
          },
        ],
        sweiperList: [],
      }
    },
    components: {
      topBar,
      tabBar,
      mySwiper,
      ten,
      twenty,
      good,
      indexGood,
      hot
    },
    created() {
      for (let key in this.listdata) {
        this.getlist(key);
      }
    },
    methods: {
      manPageList() {
        this.$http({
          method: 'get',
          url: this.apiUrl.novelApiLibrary,
          params: {gender: this.gender}
        }).then(res => {
          if (res.status == 200) {
            console.log(res);
            var data = res.data.novelLists;
            this.sweiperList = res.data.novelItemList;
            this.dataList = res.data.novelLists;
          }
        }).catch()
      },
      getlist(key) {
        this.$http({
          method: 'get',
          url: this.apiUrl.getlist,
          params: {
            name: this.listdata[key].select,
            page_no: Math.floor(Math.random() * (10 - 1) + 1),
            page_size: this.listdata[key].name == '特价好货' ? 4 : 3,
          }
        }).then(res => {
          if (res.status == 200) {
            this.listdata[key].list = res.data.list;
          }
        }).catch()
      },
      toolbar(name, select) {
        this.$router.push({path: '/more', query: {id: select, name: name}});
      }
    },
    mounted() {
    }
  }
</script>
<style>
  .weui-grid {
    width: 25%!important;
  }

  .weui-grids:before, .weui-grid:before, .weui-grid:after {
    border: 0!important;
  }

  .weui-grid__icon {
    width: 32px!important;
    height: auto!important;
  }

  .icontxt {
    font-size: 14px;
    color: #000;
  }
</style>

