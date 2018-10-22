<template>
  <div class="freeWeek">
    <div class="bgComFFF">
        <div class="manTitle">
          <span class="kind">热门分类</span>
        </div>
        <div class="freeNovel">
          <div class="left">
            <img src="../assets/img/yundonghuwai.png" alt="" @click="toolbar('运动户外','运动鞋')">
          </div>
          <div class="right">
            <img src="../assets/img/shoujishuma.png" alt="" @click="toolbar('数码家电','手机')">
            <img src="../assets/img/shipinbaihuo.png" alt="" @click="toolbar('食品百货','食品')">
          </div>
        </div>
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
            select: '运动鞋'
          },
          {
            title: '数码家电',
            slogan: '第一数码发现地',
            url: require('../assets/img/shuma.png'),
            name: '数码家电',
            select: '手机'
          },
          {
            title: '食品百货',
            slogan: '天下美食大汇聚',
            url: require('../assets/img/shipin.png'),
            name: '食品百货',
            select: '食品'
          },
        ],
      }
    },
    created() {
    },
    methods: {
      toolbar(name, select) {
        this.$router.push({path: '/more', query: {id: select, name: name}});
      }
    }
  }
</script>
<style>
  .freeWeek {
    padding: 25px 15px 0px 15px;
    background: #f2f2f2;
  }

  .bgComFFF{
    padding: 0 8px 15px 8px;
    border-radius: 12px;
    background: #fff;
  }

  .freeWeek .manTitle {
    padding: 15px 0 0 0;
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
    padding-top: 10px;
  }
  .freeWeek .freeNovel .left{
    flex: 1;
    padding-right: 3px;
  }
  .freeWeek .freeNovel .left img{
    width: 100%;
    height: auto;
    vertical-align: middle;
    -webkit-box-shadow: 0px 0px 5px #f2f2f2;
    box-shadow: 0px 0px 5px #999;
    border-radius: 6px;
  }
  .freeWeek .freeNovel .right{
    padding-left: 3px;
    flex: 1;
    display: -webkit-flex;
    display: flex;
    flex-direction:column;
    justify-content: space-between;
  }
  .freeWeek .freeNovel .right img{
    width: 100%;
    height: auto;
    vertical-align: middle;
    -webkit-box-shadow: 0px 0px 5px #f2f2f2;
    box-shadow: 0px 0px 5px #999;
    border-radius: 6px;
  }
</style>

