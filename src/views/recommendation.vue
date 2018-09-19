<template>
  <div class="recommendation">
    <backbar :title="title"></backbar>
    <div class="wra">
      <wv-grid>
        <wv-grid-item v-for="(item,index) in toolbarList" :key="index" @click="toolbar(item.name,item.select)">
          <img :src="item.url" slot="icon">
          <span slot="label" class="icontxt">{{item.title}}</span>
        </wv-grid-item>
      </wv-grid>
    </div>
  </div>
</template>
<script>
  import backbar from '../components/backBar'
  export default{
    name:'recommendation',
    data(){
      return{
        title:'',
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
      }
    },
    components: {
      backbar,
    },
    created(){
      this.title = this.$route.query.id
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
</style>

