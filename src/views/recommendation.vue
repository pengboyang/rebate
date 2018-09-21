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
                title: '女士内衣',
                url: require('../assets/img/dapaiwenxiong.png'),
                name: '女士内衣',
                select: '女士内衣'
              },
              {
                title: '潮牌男装',
                url: require('../assets/img/chaopainanzhuang.png'),
                name: '潮牌男装',
                select: '潮牌男装'
              },
              {
                title: '彩妆',
                url: require('../assets/img/caizhuang.png'),
                name: '彩妆',
                select: '彩妆'
              },
              {
                title: '洗护',
                url: require('../assets/img/xihu.png'),
                name: '洗护',
                select: '洗护'
              },
              {
                title: '面部护肤',
                url: require('../assets/img/mianbuhufu.png'),
                name: '面部护肤',
                select: '面部护肤'
              },
              {
                title: '面膜',
                url: require('../assets/img/mianmo.png'),
                name: '面膜',
                select: '面膜'
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
                title: '妈妈专区',
                url: require('../assets/img/mamazhuanqu.png'),
                name: '妈妈专区',
                select: '妈妈专区'
              },
              {
                title: '尿不湿',
                url: require('../assets/img/niaobusi.png'),
                name: '尿不湿',
                select: '尿不湿'
              },
              {
                title: '童车童床',
                url: require('../assets/img/ertongcar.png'),
                name: '童车童床',
                select: '童车童床'
              },
              {
                title: '童鞋',
                url: require('../assets/img/tongxie.png'),
                name: '童鞋',
                select: '童鞋'
              },
              {
                title: '童装',
                url: require('../assets/img/tonghzuang.png'),
                name: '童装',
                select: '童装'
              },
              {
                title: '喂养',
                url: require('../assets/img/naiping.png'),
                name: '喂养',
                select: '喂养'
              },
              {
                title: '洗护',
                url: require('../assets/img/xihu.png'),
                name: '洗护',
                select: '洗护'
              },
              {
                title: '婴童寝居',
                url: require('../assets/img/yingerbaobei.png'),
                name: '婴童寝居',
                select: '婴童寝居'
              },
            ],
          },
          {
            id:'美妆洗护',
            toolbarList: [
              {
                title: '彩妆',
                url: require('../assets/img/caizhuang.png'),
                name: '彩妆',
                select: '彩妆'
              },
              {
                title: '个护',
                url: require('../assets/img/gehu.png'),
                name: '个护',
                select: '个护'
              },
              {
                title: '口红',
                url: require('../assets/img/kouhong.png'),
                name: '口红',
                select: '口红'
              },
              {
                title: '美妆工具',
                url: require('../assets/img/meizhuanggongju.png'),
                name: '美妆工具',
                select: '美妆工具'
              },
              {
                title: '面部护肤',
                url: require('../assets/img/mianbuhufu.png'),
                name: '面部护肤',
                select: '面部护肤'
              },
              {
                title: '面膜',
                url: require('../assets/img/mianmo.png'),
                name: '面膜',
                select: '面膜'
              },
              {
                title: '男士护肤',
                url: require('../assets/img/nshufu.png'),
                name: '男士护肤',
                select: '男士护肤'
              },
              {
                title: '清洁',
                url: require('../assets/img/qingjie.png'),
                name: '清洁',
                select: '清洁'
              },
            ],
          },
          {
            id:'内衣配饰',
            toolbarList: [
              {
                title: '保暖内衣',
                url: require('../assets/img/baonuanneiyi.png'),
                name: '保暖内衣',
                select: '保暖内衣'
              },
              {
                title: '大牌文胸',
                url: require('../assets/img/dapaiwenxiong.png'),
                name: '大牌文胸',
                select: '大牌文胸'
              },
              {
                title: '袜子',
                url: require('../assets/img/wazi.png'),
                name: '袜子',
                select: '袜子'
              },
              {
                title: '眼镜配件',
                url: require('../assets/img/yanjingpeisihj.png'),
                name: '眼镜配件',
                select: '眼镜配件'
              },
            ],
          },
          {
            id:'运动户外',
            toolbarList: [
              {
                title: '户外服饰',
                url: require('../assets/img/fuwai.png'),
                name: '户外服饰',
                select: '户外服饰'
              },
              {
                title: '休闲鞋',
                url: require('../assets/img/xiuxianqie.png'),
                name: '休闲鞋',
                select: '休闲鞋'
              },
              {
                title: '运动服饰',
                url: require('../assets/img/ydfushi.png'),
                name: '运动服饰',
                select: '运动服饰'
              },
              {
                title: '运动鞋包',
                url: require('../assets/img/yundongxiebao.png'),
                name: '运动鞋包',
                select: '运动鞋包'
              },
            ],
          },
          // {
          //   id:'数码家电',
          //   toolbarList: [
          //     {
          //       title: '女装',
          //       url: require('../assets/img/icon_1.png'),
          //       name: '女装尖货',
          //       select: '女装'
          //     },
          //     {
          //       title: '美妆洗护',
          //       url: require('../assets/img/icon_2.png'),
          //       name: '美妆洗护',
          //       select: '美妆'
          //     },
          //     {
          //       title: '男装',
          //       url: require('../assets/img/icon_4.png'),
          //       name: '精品男装',
          //       select: '男装'
          //     },
          //     {
          //       title: '母婴',
          //       url: require('../assets/img/icon_8.png'),
          //       name: '母婴',
          //       select: '母婴'
          //     },
          //     {
          //       title: '鞋包配饰',
          //       url: require('../assets/img/icon_6.png'),
          //       name: '鞋包配饰',
          //       select: '女鞋'
          //     },
          //     {
          //       title: '内衣',
          //       url: require('../assets/img/icon_7.png'),
          //       name: '内衣',
          //       select: '女士内衣'
          //     },
          //     {
          //       title: '童装',
          //       url: require('../assets/img/icon_3.png'),
          //       name: '童装',
          //       select: '童装'
          //     },
          //   ],
          // },
          {
            id:'食品百货',
            toolbarList: [
              {
                title: '宠物生活',
                url: require('../assets/img/gouliang.png'),
                name: '宠物生活',
                select: '宠物生活'
              },
              {
                title: '休闲零食',
                url: require('../assets/img/lingshi.png'),
                name: '休闲零食',
                select: '休闲零食'
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
.recommendation{
  overflow-x: auto;
  overflow-y: auto;
}
.recommendation .wra{
  padding-top: 50px;
  padding-bottom: 50px;
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
/* .recommendation .wra .weui-loadmore{
  margin: 1.5em auto 0 auto;
} */
</style>

