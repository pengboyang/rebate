webpackJsonp([0],{"4B0c":function(t,e,n){"use strict";var i={name:"tabBar",data:function(){return{value:"",urlList:[{url:"/index",name:"推荐",icon:"icon-foo"},{url:"/collect",name:"收藏",icon:"icon-bar"},{url:"/mine",name:"我的",icon:"icon-fb"}],activeIndex:0}},computed:{},created:function(){console.log(this.$store.state.activeIndex)},methods:{goUrl:function(t,e){if("/collect"!=t)this.$router.push({path:t}),this.$store.state.activeIndex=e;else{if(this.isLogin())return this.$router.push({path:t}),this.$store.state.activeIndex=e,!1;this.getUserUuid()}}}},a={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"tabBar"},t._l(t.urlList,function(e,i){return n("div",{key:i,staticClass:"navBox"},[n("div",{on:{click:function(n){t.goUrl(e.url,i)}}},[n("span",{staticClass:"icon",class:e.icon}),t._v(" "),n("p",{class:{active:t.$store.state.activeIndex===i}},[t._v(t._s(e.name))])])])}))},staticRenderFns:[]};var s=n("VU/8")(i,a,!1,function(t){n("WcRV")},"data-v-6799aa3c",null);e.a=s.exports},WcRV:function(t,e){}});
//# sourceMappingURL=0.dfe52368a3b8b5d12425.js.map