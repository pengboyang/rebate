<template>
  <div class="freeWeek">
    <div class="manTitle">
      <span class="kind">热门分类</span>
    </div>
    <div class="freeNovel">
      <wv-grid>
        <wv-grid-item v-for="(item,index) in toolbarList" :key="index" class="hotToolbar"
                      @click="toolbar(item.name,item.select)">
          <img :src="item.url" slot="icon">
          <span slot="label" class="icontxt">{{item.title}}</span>
          <span slot="label" class="iconAlt">{{item.slogan}}</span>
        </wv-grid-item>
      </wv-grid>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'hot',
    data() {
      return {
        toolbarList: [
          {
            title: '运动户外',
            slogan: '汇聚运动潮品',
            url: require('../assets/img/yundong.png'),
            name: '运动户外',
            select: '女装'
          },
          {
            title: '手机数码',
            slogan: '第一数码发现地',
            url: require('../assets/img/shuma.png'),
            name: '手机数码',
            select: '美妆'
          },
          {
            title: '食品百货',
            slogan: '天下美食大汇聚',
            url: require('../assets/img/shipin.png'),
            name: '食品百货',
            select: '男装'
          },
        ],
      }
    },
    created() {
    },
    methods: {
      freeMoreList() {
        this.$router.push({path: '/more'});
      },
      toolbar(name, select) {
        this.$router.push({path: '/more', query: {id: select, name: name}});
      }
    }
  }
</script>
<style>
  .freeWeek {
    padding: 0 15px;
    margin-bottom: 10px;
  }

  .freeWeek .manTitle {
    padding: 20px 0 20px 0;
  }

  .freeWeek .manTitle .timer {
    color: #999;
    font-size: 12px;
    margin-left: 10px;
    vertical-align: middle;
  }

  .freeWeek .manTitle .timer .hour {
    padding: 2px 3px;
    border-radius: 4px;
    background: #ff4646;
    color: #fff;
    margin-right: 3px;
  }

  .freeWeek .manTitle .timer .minute {
    padding: 2px 3px;
    border-radius: 4px;
    background: #000;
    color: #fff;
    margin-right: 3px;
    margin-left: 3px;
  }

  .freeWeek .manTitle .timer .second {
    padding: 2px 3px;
    border-radius: 4px;
    background: #000;
    color: #fff;
    margin-right: 3px;
    margin-left: 3px;
  }

  .freeWeek .manTitle .kind {
    font-size: 16px;
    font-weight: 700;
  }

  .freeWeek .manTitle .moreList {
    float: right;
    font-size: 14px;
    color: #999;
    vertical-align: middle;
  }

  .freeWeek .freeNovel {
    width: 100%;
    background-color: white;
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .freeNovel .weui-grids {
    width: 100%;
  }

  .freeNovel .weui-grid {
    width: 32%!important;
    padding: 0!important;
  }

  .freeNovel .weui-grid .weui-grid__icon {
    width: 100%!important;
    height:auto!important;
  }
  .weui-grids:after, .weui-grids:before {
    height: 0;
  }

  .freeNovel .weui-grid .icontxt {
    display: block;
    font-size: 16px;
    font-weight: bold;
    color: #000;
  }

  .iconAlt {
    display: block;
    font-size: 13px;
    color: #444;
  }

  .hotToolbar:nth-child(2n) {
    margin: 0 2%;
  }
</style>

