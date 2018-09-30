<template>
  <div class="manList">
    <back-bar :title="dataList.name"></back-bar>
    <good :listdata="dataList"></good>
    <!--<wv-loadmore type="line" text="省钱买"></wv-loadmore>-->
    <!--<tab-bar></tab-bar>-->
  </div>
</template>
<script>
  import good from '../components/good'
  import backBar from '../components/backBar'
  import tabBar from '../components/tabBar'

  export default {
    name: 'more',
    data() {
      return {
        dataList:
          {
            name: '',
            select: '',
            list: []
          },
        thumbSmall: require('../assets/img/icon_1.png'),
      }
    },
    components: {
      backBar,
      tabBar,
      good,
    },
    created() {
      this.dataList.name = this.$route.query.name;
      this.dataList.select = this.$route.query.id;
    },
    methods: {},
    mounted() {
    }
  }
</script>
<style>
  .weui-grid {
    width: 25%;
  }

  .weui-grids:before, .weui-grid:before, .weui-grid:after {
    border: 0;
  }

  .weui-grid__icon {
    width: 32px;
    height: auto;
  }

  .icontxt {
    font-size: 14px;
    color: #000;
  }
</style>

