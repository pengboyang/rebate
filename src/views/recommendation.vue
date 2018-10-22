<template>
  <div class="recommendation">
    <backbar :title="title"></backbar>
    <div class="wra">
      <wv-grid v-for="item in titleDataLists" :key="item.id">
        <wv-loadmore type="line" :text="item.id"></wv-loadmore>
        <wv-grid-item v-for="(items,index) in item.toolbarList" :key="index" @click="toolbar(items.name,items.select)">
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
                title: '大牌文胸',
                url: require('../assets/img/dapaiwenxiong.png'),
                name: '大牌文胸',
                select: '大牌文胸'
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
                title: '女裤',
                url: require('../assets/img/nvku.png'),
                name: '女裤',
                select: '女裤'
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
              {
                title: '衬衫',
                url: require('../assets/img/chenshan.png'),
                name: '衬衫',
                select: '衬衫'
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
                title: '纸尿裤',
                url: require('../assets/img/niaobusi.png'),
                name: '纸尿裤',
                select: '纸尿裤'
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
                title: '个护馆',
                url: require('../assets/img/gehu.png'),
                name: '个护馆',
                select: '个护馆'
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
                title: '男士护肤',
                url: require('../assets/img/nshufu.png'),
                name: '男士护肤',
                select: '男士护肤'
              },
              {
                title: '清洁馆',
                url: require('../assets/img/qingjie.png'),
                name: '清洁馆',
                select: '清洁馆'
              },
              {
                title: '口腔护理',
                url: require('../assets/img/kouqianghuli.png'),
                name: '口腔护理',
                select: '口腔护理'
              },
              {
                title: '洗发洁肤',
                url: require('../assets/img/xifaxihu.png'),
                name: '洗发洁肤',
                select: '洗发洁肤'
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
              {
                title: '男士内裤',
                url: require('../assets/img/nansineiku.png'),
                name: '男士内裤',
                select: '男士内裤'
              },
              {
                title: '女士内裤',
                url: require('../assets/img/nvsineiku.png'),
                name: '女士内裤',
                select: '女士内裤'
              },
              {
                title: '睡衣家居服',
                url: require('../assets/img/shuiyi.png'),
                name: '睡衣家居服',
                select: '睡衣家居服'
              },
              {
                title: '围巾帽子',
                url: require('../assets/img/weijinmaozi.png'),
                name: '围巾帽子',
                select: '围巾帽子'
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
                title: '户外鞋包',
                url: require('../assets/img/xiuxianqie.png'),
                name: '户外鞋包',
                select: '户外鞋包'
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
              {
                title: '户外装备',
                url: require('../assets/img/huwaizhuangbai.png'),
                name: '户外装备',
                select: '户外装备'
              },
              {
                title: '骑行设备',
                url: require('../assets/img/qixingshebei.png'),
                name: '骑行设备',
                select: '骑行设备'
              },
              {
                title: '体育用品',
                url: require('../assets/img/tiyuyongpin.png'),
                name: '体育用品',
                select: '体育用品'
              },
              {
                title: '游泳用品',
                url: require('../assets/img/youyongyongpin.png'),
                name: '游泳用品',
                select: '游泳用品'
              },
            ],
          },
          {
            id:'数码家电',
            toolbarList: [
              {
                title: '办公设备',
                url: require('../assets/img/bangongshebei.png'),
                name: '办公设备',
                select: '办公设备'
              },
              {
                title: '电脑配件',
                url: require('../assets/img/diannaopeijian.png'),
                name: '电脑配件',
                select: '电脑配件'
              },
              {
                title: '电脑整机',
                url: require('../assets/img/diannaozhengji.png'),
                name: '电脑整机',
                select: '电脑整机'
              },
              {
                title: '家用电器',
                url: require('../assets/img/jiayongdianqi.png'),
                name: '家用电器',
                select: '家用电器'
              },
              {
                title: '摄影摄像',
                url: require('../assets/img/sheyingshexiang.png'),
                name: '摄影摄像',
                select: '摄影摄像'
              },
              {
                title: '手机配件',
                url: require('../assets/img/shoujipeijian.png'),
                name: '手机配件',
                select: '手机配件'
              },
              {
                title: '手机通讯',
                url: require('../assets/img/shoujitongxun.png'),
                name: '手机通讯',
                select: '手机通讯'
              },
              {
                title: '网络产品',
                url: require('../assets/img/wangluochanpin.png'),
                name: '网络产品',
                select: '网络产品'
              },
            ],
          },
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
              {
                title: '礼品鲜花',
                url: require('../assets/img/lipinxianhua.png'),
                name: '礼品鲜花',
                select: '礼品鲜花'
              },
              {
                title: '图书文学',
                url: require('../assets/img/tushuwenxue.png'),
                name: '图书文学',
                select: '图书文学'
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
          this.$router.push({path: '/assortments', query: {id: select, name: name}});
      },
    }
  }
</script>
<style>
.recommendation{
  overflow-x: auto;
  overflow-y: auto;
  background: #fff;
}
.recommendation .wra{
  padding-top: 50px;
  padding-bottom:53px;
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
