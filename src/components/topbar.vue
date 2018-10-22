<template>
  <div class="comTop" @click="goSearch">
    <div class="searchBox">
      <img src="../assets/img/searchjingzi.png" alt="">
      <span>搜索商品名称或则粘贴宝贝链接</span>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'topBar',
    data() {
      return {
        value: '',
        placeholder: '搜索商品名称或粘贴宝贝链接',
      }
    },
    watch: {
      scrollNums: function (od, nw) {
        this.scrollTopS = od;
      }
    },
    props:{
      scrollNums:{
        type:Number,
        required:true
      }
    },
    created(){
    },
    computed: {},
    methods: {
      onSearch(val) {
        // 自定义搜索处理
        console.log(val);
      },
      onCancel() {
        // 自定义取消事件处理
      },
      goSearch(){
        this.$router.push({path:'/searchs'});
      },
      childFn(){
        $('.comTop').css({ 
          backgroundColor:((( this.scrollTopS / 150) >= 1) ? '#f2f2f2' : 'transparent'),
          // opacity: ((( this.scrollTopS / 300) >= 1) ? 1 : (this.scrollTopS / 300))
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .comTop {
    width: 100%;
    height: 65px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    font-family: 'noto';
    display: flex;
    align-items: center;
  }

  .comTop .searchBox{
    width: 80%;
    height: 30px;
    background: #fff;
    border-radius: 14px;
    padding-left: 20px;
    line-height: 27px;
    margin: 0 auto;
  }

  .comTop .searchBox span{
    font-size: 15px;
    color: #c2c2c2;
    vertical-align: middle;
  }

  .comTop .searchBox img{
    width: 15px;
    height: auto;
    vertical-align: middle;
    margin-right: 10px;
  }

</style>
