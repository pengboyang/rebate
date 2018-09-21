<template>
  <div class="recommendation">
    <backbar :title="title"></backbar>
    <div class="wra">
      <wv-grid v-for="item in titleDataLists">
        <wv-loadmore type="line" :text="item.id"></wv-loadmore>
        <wv-grid-item v-for="(items,index) in item.toolbarList" @click="toolbar(items.name,items.select)">
          <img :src="items.url" slot="icon">
          <span slot="label" class="icontxt">{{items.title}}</span>
        </wv-grid-item>
      </wv-grid>
    </div>
    <tab-bar></tab-bar>
  </div>
</template>
<script>
  import backbar from '../components/backBar'
  import tabBar from '../components/tabBar'
  import { Loadmore } from 'we-vue'
  export default{
    name:'recommendation',
    data(){
      return{
        title:'更多分类',
        titleDataLists:[
          {
            id:'热门分类',
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
                url: require('../assets/img/icon_8.png'),
                name: '母婴',
                select: '母婴'
              },
              {
                title: '鞋包配饰',
                url: require('../assets/img/icon_6.png'),
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
                url: require('../assets/img/icon_3.png'),
                name: '童装',
                select: '童装'
              },
            ],
          },
          {
            id:'女装女鞋',
            toolbarList: [
              {
                title: '女款外套',
                url: require('../assets/img/xinkuanwaitaonv.png'),
                name: '女款外套',
                select: '女款外套'
              },
              {
                title: '裙装',
                url: require('../assets/img/lianyiqun.png'),
                name: '裙装',
                select: '裙装'
              },
              {
                title: '打底毛衣',
                url: require('../assets/img/maoyi.png'),
                name: '打底毛衣',
                select: '打底毛衣'
              },
              {
                title: '女款卫衣',
                url: require('../assets/img/nvshiweiyi.png'),
                name: '女款卫衣',
                select: '女款卫衣'
              },
              {
                title: '女款女裤',
                url: require('../assets/img/nvku.png'),
                name: '女款女裤',
                select: '女款女裤'
              },
              {
                title: '大牌女装',
                url: require('../assets/img/dapai.png'),
                name: '大牌女装',
                select: '大牌女装'
              },
              {
                title: '婚纱礼服',
                url: require('../assets/img/hunsha.png'),
                name: '婚纱礼服',
                select: '婚纱礼服'
              },
              {
                title: '时尚女鞋',
                url: require('../assets/img/nvxie.png'),
                name: '时尚女鞋',
                select: '时尚女鞋'
              },
            ],
          },
          {
            id:'男装男鞋',
            toolbarList: [
              {
                title: '男装T恤',
                url: require('../assets/img/t-shirt.png'),
                name: '男装T恤',
                select: '男装T恤'
              },
              {
                title: '潮牌男装',
                url: require('../assets/img/chaopainanzhuang.png'),
                name: '潮牌男装',
                select: '潮牌男装'
              },
              {
                title: '大牌男装',
                url: require('../assets/img/dapainanzhuang.png'),
                name: '大牌男装',
                select: '大牌男装'
              },
              {
                title: '男裤',
                url: require('../assets/img/nanku.png'),
                name: '男裤',
                select: '男裤'
              },
              {
                title: '男外套',
                url: require('../assets/img/nanwaitao.png'),
                name: '男外套',
                select: '男外套'
              },
              {
                title: '男鞋',
                url: require('../assets/img/nanxie.png'),
                name: '男鞋',
                select: '男鞋'
              },
              {
                title: '中老年',
                url: require('../assets/img/zhonglaonian.png'),
                name: '中老年',
                select: '中老年'
              },
            ],
          },
          {
            id:'母婴童装',
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
                url: require('../assets/img/icon_8.png'),
                name: '母婴',
                select: '母婴'
              },
              {
                title: '鞋包配饰',
                url: require('../assets/img/icon_6.png'),
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
                url: require('../assets/img/icon_3.png'),
                name: '童装',
                select: '童装'
              },
            ],
          },
          {
            id:'美妆洗护',
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
                url: require('../assets/img/icon_8.png'),
                name: '母婴',
                select: '母婴'
              },
              {
                title: '鞋包配饰',
                url: require('../assets/img/icon_6.png'),
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
                url: require('../assets/img/icon_3.png'),
                name: '童装',
                select: '童装'
              },
            ],
          },
          {
            id:'内衣配饰',
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
                url: require('../assets/img/icon_8.png'),
                name: '母婴',
                select: '母婴'
              },
              {
                title: '鞋包配饰',
                url: require('../assets/img/icon_6.png'),
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
                url: require('../assets/img/icon_3.png'),
                name: '童装',
                select: '童装'
              },
            ],
          },
          {
            id:'运动户外',
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
                url: require('../assets/img/icon_8.png'),
                name: '母婴',
                select: '母婴'
              },
              {
                title: '鞋包配饰',
                url: require('../assets/img/icon_6.png'),
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
                url: require('../assets/img/icon_3.png'),
                name: '童装',
                select: '童装'
              },
            ],
          },
          {
            id:'数码家电',
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
                url: require('../assets/img/icon_8.png'),
                name: '母婴',
                select: '母婴'
              },
              {
                title: '鞋包配饰',
                url: require('../assets/img/icon_6.png'),
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
                url: require('../assets/img/icon_3.png'),
                name: '童装',
                select: '童装'
              },
            ],
          },
          {
            id:'食品百货',
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
                url: require('../assets/img/icon_8.png'),
                name: '母婴',
                select: '母婴'
              },
              {
                title: '鞋包配饰',
                url: require('../assets/img/icon_6.png'),
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
                url: require('../assets/img/icon_3.png'),
                name: '童装',
                select: '童装'
              },
            ],
          },
        ],
      }
    },
    components: {
      backbar,
      tabBar,
    },
    created(){
      // this.title = this.$route.query.id
      // console.log(this.title)
    },
    methods:{
      toolbar(name, select) {
          this.$router.push({path: '/more', query: {id: select, name: name}});
      },
    }
  }
</script>
<style>
.recommendation .wra{
  padding-top: 50px;
}
.recommendation .wra .weui-grid {
  width: 25% !important;
}

.recommendation .wra .weui-grids:before, .weui-grid:before, .weui-grid:after {
  border: 0 !important;
}

.recommendation .wra .weui-grid__icon {
  width: 50px !important;
  height: auto !important;
}

.recommendation .wra .icontxt {
  font-size: 14px;
  color: #000;
}
.recommendation .wra .weui-loadmore{
  margin: 1.5em auto 0 auto;
}
</style>

