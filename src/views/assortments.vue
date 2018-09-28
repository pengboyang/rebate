<template>
  <div class="assortments">
    <back-bar :title="titleName"></back-bar>
    <div class="assMore">
        <div class="nav-swiper">
            <div class="swiper-container" id="swiper-container2">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item,index) in topTabList"><span :class="{'activeve':index==0}">{{item.name}}</span>
                    </div>
                </div>
            </div>
            <!-- <div class="juxing" v-if="shang" @click="showBox"><img src="../assets/img/juxing.png" alt=""></div>
            <div class="juxing" v-else @click="hideBox"><img src="../assets/img/juxing.png" alt=""></div>
            <div class="fenBox">
              <p>全部宝贝</p>
              <div class="wra">
                <div v-for="(item,index) in topTabList" @click="abc(index)">{{item.name}}</div>
              </div>
            </div> -->
        </div>
        <div class="swiper-container" id="swiper-container3" @scroll="handleScroll">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="item in topTabList">   
                  <div class="page-infinite-wrapper" ref="wrapper" :style="{width:'100%', height: wrapperHeight + 'px' }">
                    <wv-group
                      v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
                      <div class="listCon"  @click="goDetail(item.num_iid,item.coupon_click_url,item.coupon_start_time,item.coupon_end_time,item.coupon_info,item.couponPrice,item.reserve_price,item.zk_final_price,item.coupon_all_time)" v-for="item in infoList">
                          <div class="toppic"><img v-lazy="item.pictUrl" :key="item.pictUrl" alt=""></div>
                          <div class="goodTitle">
                            <img src="../assets/img/taobaologo.png" alt="">
                            <span>{{item.title}}</span>
                          </div>
                          <div class="goodsInfo">
                            <span class="tbprice">淘宝价￥{{item.reserve_price}}</span>
                            <span class="month">月销量{{item.volume}}</span>
                          </div>
                          <div class="youhui">
                            <div class="quanhou">券后<span class="number">￥{{item.zk_final_price}}</span></div>
                            <div class="youhuiPrice"><img src="../assets/img/vouchersBg.png" alt=""><span>{{item.reserve_price-item.zk_final_price}}元券</span></div>
                          </div>
                        </div>
                    </wv-group>
                    <p v-show="loading" class="loading-tips">
                      <wv-spinner type="dot-circle" color="#444" :size="24"/>
                    </p>
                  </div>              
                </div>
            </div>
        </div>
    </div>
    <div class="gotop" @click="gotop" v-show="backTopShow"><img src="../assets/img/gotop.png"/></div>
  </div>
</template>
<script>
  import Swiper from 'swiper/dist/js/swiper.min.js';
  import 'swiper/dist/css/swiper.min.css';
  import backBar from '../components/backBar.vue';
  export default{
    name:'assortments',
    data(){
      return{
        titleName:'',
        select:'',
        selects:'',
        topTabList:[],
        shang:true,
        listJson:{
          '女款外套':[
            {id:'羽绒服',name:'羽绒服'},
            {id:'呢大衣',name:'呢大衣'},
            {id:'韩版棉服',name:'韩版棉服'},
            {id:'羽绒马甲',name:'羽绒马甲'},
            {id:'牛仔外套',name:'牛仔外套'},
            {id:'毛衣外套',name:'毛衣外套'},
            {id:'风衣',name:'风衣'},
          ],
          '裙装':[
            {id:'套装裙',name:'套装裙'},
            {id:'连衣裙',name:'连衣裙'},
            {id:'背带裙',name:'背带裙'},
            {id:'半身裙',name:'半身裙'},
            {id:'针织裙',name:'针织裙'},
          ],
          '打底毛衣':[
            {id:'打底衫',name:'打底衫'},
            {id:'加绒打底衫',name:'加绒打底'},
            {id:'中长款打底衫',name:'中长打底'},
            {id:'针织开衫',name:'针织开衫'},
            {id:'羊毛衫',name:'羊毛衫'},
            {id:'套头针织衫',name:'套头针织'},
          ],
          '女款卫衣':[
            {id:'宽松卫衣',name:'宽松卫衣'},
            {id:'加绒卫衣',name:'加绒卫衣'},
            {id:'情侣卫衣',name:'情侣卫衣'},
            {id:'连帽卫衣',name:'连帽卫衣'},
            {id:'卫衣套装',name:'卫衣套装'},
            {id:'加厚卫衣',name:'加厚卫衣'},
            {id:'学生卫衣',name:'学生卫衣'},
            {id:'韩版卫衣',name:'韩版卫衣'},
            {id:'中长卫衣',name:'中长卫衣'},
          ],
          '女裤':[
            {id:'羽绒裤',name:'羽绒裤'},
            {id:'加绒裤',name:'加绒裤'},
            {id:'阔腿裤',name:'阔腿裤'},
            {id:'哈伦裤',name:'哈伦裤'},
            {id:'皮裤',name:'皮裤'},
            {id:'牛仔裤',name:'牛仔裤'},
            {id:'加绒牛仔裤',name:'加绒牛仔'},
            {id:'高腰牛仔裤',name:'高腰牛仔'},
            {id:'加绒打底裤',name:'加绒打底'},
            {id:'喇叭裤',name:'喇叭裤'},
            {id:'小脚裤',name:'小脚裤'},
            {id:'背带裤',name:'背带裤'},
            {id:'西装裤',name:'西装裤'},
          ],
          '大牌女装':[
            {id:'Moco',name:'Moco'},
            {id:'betu',name:'betu'},
            {id:'ur',name:'ur'},
            {id:'播',name:'播'},
            {id:'秋水伊人',name:'秋水伊人'},
            {id:'梦舒雅',name:'梦舒雅'},
            {id:'only',name:'only'},
            {id:'优衣库',name:'优衣库'},
            {id:'HM',name:'HM'},
            {id:'GAP',name:'GAP'},
            {id:'CA',name:'CA'},
            {id:'森马',name:'森马'},
            {id:'热风',name:'热风'},
            {id:'西域',name:'西域'},
            {id:'zara',name:'zara'},
            {id:'以纯',name:'以纯'},
          ],
          '婚纱礼服':[
            {id:'旗袍',name:'旗袍'},
            {id:'礼服',name:'礼服'},
            {id:'婚纱',name:'婚纱'},
            {id:'设计师',name:'设计师'},
          ],
          '时尚女鞋':[
            {id:'休闲鞋',name:'休闲鞋'},
            {id:'单鞋',name:'单鞋'},
            {id:'帆布鞋',name:'帆布鞋'},
            {id:'高跟单鞋',name:'高跟单鞋'},
            {id:'小白鞋',name:'小白鞋'},
            {id:'豆豆鞋',name:'豆豆鞋'},
            {id:'妈妈鞋',name:'妈妈鞋'},
            {id:'凉鞋',name:'凉鞋'},
            {id:'平底单鞋',name:'平底单鞋'},
            {id:'拖鞋',name:'拖鞋'},
            {id:'粗跟单鞋',name:'粗跟单鞋'},
            {id:'深口单鞋',name:'深口单鞋'},
            {id:'袜靴',name:'袜靴'},
            {id:'尖头单鞋',name:'尖头单鞋'},
            {id:'玛丽珍',name:'玛丽珍'},
            {id:'大码女鞋',name:'大码女鞋'},
            {id:'婚鞋',name:'婚鞋'},
            {id:'布鞋',name:'布鞋'},
            {id:'雨鞋',name:'雨鞋'},
          ],
          '男装T恤':[
            {id:'新品Ｔ恤',name:'新品Ｔ恤'},
            {id:'男长袖Ｔ恤',name:'长袖Ｔ恤'},
            {id:'男短袖Ｔ恤',name:'短袖Ｔ恤'},
            {id:'男纯棉Ｔ恤',name:'纯棉Ｔ恤'},
            {id:'男白色Ｔ恤',name:'白色Ｔ恤'},
            {id:'男条纹Ｔ恤',name:'条纹Ｔ恤'},
          ],
          '潮牌男装':[
            {id:'设计潮牌',name:'设计潮牌'},
            {id:'古由卡',name:'古由卡'},
            {id:'BDCT',name:'BDCT'},
            {id:'乱步',name:'乱步'},
            {id:'英爵伦',name:'英爵伦'},
            {id:'格男仕',name:'格男仕'},
            {id:'后序',name:'后序'},
            {id:'卡宾',name:'卡宾'},
            {id:'抹茶故事',name:'抹茶故事'},
          ],
          '大牌男装':[
            {id:'时尚男装',name:'时尚男装'},
            {id:'ak男装',name:'ak男装'},
            {id:'levis',name:'levis'},
            {id:'劲霸男装',name:'劲霸男装'},
            {id:'佐丹奴',name:'佐丹奴'},
            {id:'唐狮',name:'唐狮'},
            {id:'海澜之家',name:'海澜之家'},
            {id:'花花公子',name:'花花公子'},
            {id:'七匹狼',name:'七匹狼'},
          ],
          '男裤':[
            {id:'男破洞牛仔',name:'破洞牛仔'},
            {id:'男修身牛仔',name:'修身牛仔'},
            {id:'男直筒牛仔',name:'直筒牛仔'},
            {id:'男束脚牛仔',name:'束脚牛仔'},
            {id:'男弹力牛仔',name:'弹力牛仔'},
            {id:'男黑色牛仔',name:'黑色牛仔'},
            {id:'商务休闲',name:'商务休闲'},
            {id:'免烫版型',name:'免烫版型'},
            {id:'束脚裤',name:'束脚裤'},
            {id:'直筒版型',name:'直筒版型'},
            {id:'迷彩裤',name:'迷彩裤'},
          ],
          '男外套':[
            {id:'男羽绒服',name:'男羽绒服'},
            {id:'男款风衣',name:'男款风衣'},
            {id:'新品夹克',name:'新品夹克'},
            {id:'牛仔外套',name:'牛仔外套'},
            {id:'卫衣',name:'卫衣'},
            {id:'棒球服',name:'棒球服'},
            {id:'西服',name:'西服'},
            {id:'男款马甲',name:'男款马甲'},
          ],
          '男鞋':[
            {id:'休闲鞋',name:'休闲鞋'},
            {id:'商务休闲鞋',name:'商务休闲鞋'},
            {id:'正装男鞋',name:'正装男鞋'},
            {id:'男凉鞋',name:'男凉鞋'},
            {id:'男帆布鞋',name:'男帆布鞋'},
            {id:'男豆豆鞋',name:'男豆豆鞋'},
            {id:'男拖鞋',name:'男拖鞋'},
            {id:'布洛克',name:'布洛克'},
            {id:'男增高鞋',name:'男增高鞋'},
            {id:'男登山鞋',name:'男登山鞋'},
          ],
          '衬衫':[
            {id:'新品衬衫',name:'新品衬衫'},
            {id:'男长袖衬衫',name:'男长袖衬衫'},
            {id:'男格子衬衫',name:'男格子衬衫'},
            {id:'男条纹衬衫',name:'男条纹衬衫'},
            {id:'男牛仔衬衫',name:'男牛仔衬衫'},
            {id:'男保暖衬衫',name:'男保暖衬衫'},
          ],
          '中老年':[
            {id:'大码男装',name:'大码男装'},
            {id:'中老年男装',name:'中老男装'},
            {id:'中老年衬衫',name:'中老衬衫'},
            {id:'中老年运动套装',name:'运动套装'},
            {id:'中老年毛衣男',name:'中老毛衣'},
          ],
          '妈妈专区':[
            {id:'妈咪包',name:'妈咪包'},
            {id:'产后塑身',name:'产后塑身'},
            {id:'防辐射服',name:'防辐射服'},
            {id:'孕妈装',name:'孕妈装'},
            {id:'待产护理',name:'待产护理'},
            {id:'月子装',name:'月子装'},
          ],
          '纸尿裤':[
            {id:'好奇纸尿裤',name:'好奇'},
            {id:'花王纸尿裤',name:'花王'},
            {id:'大王纸尿裤',name:'大王'},
            {id:'帮宝适纸尿裤',name:'帮宝适'},
          ],
          '童车童床':[
            {id:'婴儿推车',name:'婴儿推车'},
            {id:'宝宝餐椅',name:'宝宝餐椅'},
            {id:'婴儿床',name:'婴儿床'},
            {id:'学步车',name:'学步车'},
            {id:'婴儿床垫',name:'婴儿床垫'},
          ],
          '童鞋':[
            {id:'童鞋运动鞋',name:'运动鞋'},
            {id:'童鞋皮鞋',name:'童鞋皮鞋'},
            {id:'学步鞋',name:'学步鞋'},
            {id:'童鞋帆布鞋',name:'帆布鞋'},
            {id:'童鞋凉鞋',name:'童鞋凉鞋'},
            {id:'童鞋靴子',name:'童鞋靴子'},
            {id:'童鞋雨鞋',name:'童鞋雨鞋'},
            {id:'童鞋休闲鞋',name:'休闲鞋'},
          ],
          '童装':[
            {id:'男童装',name:'男童装'},
            {id:'女童装',name:'女童装'},
            {id:'婴儿服装',name:'婴儿服装'},
            {id:'宝宝外套',name:'宝宝外套'},
            {id:'亲子装',name:'亲子装'},
            {id:'连体衣',name:'连体衣'},
            {id:'儿童演出服',name:'演出服'},
            {id:'童袜',name:'童袜'},
          ],
          '喂养':[
            {id:'米粉',name:'米粉'},
            {id:'果泥',name:'果泥'},
            {id:'DHA',name:'DHA'},
            {id:'宝宝零食',name:'宝宝零食'},
            {id:'儿童奶粉',name:'儿童奶粉'},
            {id:'奶瓶奶嘴',name:'奶瓶奶嘴'},
            {id:'吸奶器',name:'吸奶器'},
            {id:'暖奶消毒',name:'暖奶消毒'},
            {id:'辅食机',name:'辅食机'},
            {id:'食物存储',name:'食物存储'},
            {id:'儿童餐具',name:'儿童餐具'},
            {id:'牙胶安抚',name:'牙胶安抚'},
          ],
          '洗护':[
            {id:'婴儿湿巾',name:'婴儿湿巾'},
            {id:'宝宝护肤',name:'宝宝护肤'},
            {id:'宝宝理发器',name:'理发器'},
            {id:'宝宝口腔清洁',name:'口腔清洁'},
            {id:'宝宝洗澡用具',name:'洗澡用具'},
            {id:'宝宝沐浴',name:'宝宝沐浴'},
          ],
          '婴童寝居':[
            {id:'婴儿枕',name:'婴儿枕'},
            {id:'婴童用品',name:'婴童用品'},
            {id:'口水巾',name:'口水巾'},
            {id:'爬行垫',name:'爬行垫'},
            {id:'婴儿隔尿垫',name:'隔尿垫'},
          ],
          '彩妆':[
            {id:'口红',name:'口红'},
            {id:'气垫',name:'气垫'},
            {id:'美甲',name:'美甲'},
            {id:'隔离霜',name:'隔离霜'},
            {id:'粉底液',name:'粉底液'},
            {id:'粉饼',name:'粉饼'},
            {id:'BB霜',name:'BB霜'},
            {id:'cc霜',name:'cc霜'},
            {id:'散粉',name:'散粉'},
            {id:'眉笔',name:'眉笔'},
            {id:'睫毛膏',name:'睫毛膏'},
            {id:'眼线笔',name:'眼线笔'},
            {id:'眼影',name:'眼影'},
            {id:'腮红',name:'腮红'},
            {id:'遮瑕',name:'遮瑕'},
            {id:'唇蜜',name:'唇蜜'},
            {id:'唇笔',name:'唇笔'},
            {id:'彩妆套装',name:'彩妆套装'},
          ],
          '个护馆':[
            {id:'卫生巾',name:'卫生巾'},
            {id:'卫生护垫',name:'卫生护垫'},
            {id:'私处护理',name:'私处护理'},
            {id:'卫生棉条',name:'卫生棉条'},
          ],
          '美妆工具':[
            {id:'双眼皮贴',name:'双眼皮贴'},
            {id:'化妆棉',name:'化妆棉'},
            {id:'化妆刷',name:'化妆刷'},
            {id:'粉扑',name:'粉扑'},
            {id:'假睫毛',name:'假睫毛'},
            {id:'睫毛夹',name:'睫毛夹'},
            {id:'修眉刀',name:'修眉刀'},
            {id:'美妆工具套装',name:'美妆工具套装'},
            {id:'美甲工具',name:'美甲工具'},
          ],
          '面部护肤':[
            {id:'女护肤礼盒',name:'女护肤礼盒'},
            {id:'女深层清洁',name:'女深层清洁'},
            {id:'女敏感肌',name:'女敏感肌'},
            {id:'卸妆',name:'卸妆'},
            {id:'洁面',name:'洁面'},
            {id:'女爽肤水',name:'女爽肤水'},
            {id:'乳液',name:'乳液'},
            {id:'面霜',name:'面霜'},
            {id:'肌底液',name:'肌底液'},
            {id:'眼霜',name:'眼霜'},
            {id:'面膜',name:'面膜'},
            {id:'唇膜',name:'唇膜'},
            {id:'润唇膏',name:'润唇膏'},
            {id:'眼膜',name:'眼膜'},
            {id:'保湿喷雾',name:'保湿喷雾'},
            {id:'女T区护理',name:'女T区护理'},
          ],
          '男士护肤':[
            {id:'男抗痘',name:'男抗痘'},
            {id:'男去黑头',name:'男去黑头'},
            {id:'男护肤套装',name:'护肤套装'},
            {id:'男洁面',name:'男洁面'},
            {id:'剃须',name:'剃须'},
            {id:'男爽肤水',name:'男爽肤水'},
            {id:'男乳液',name:'男乳液'},
            {id:'男卸妆',name:'男卸妆'},
            {id:'男面膜',name:'男面膜'},
            {id:'男防晒',name:'男防晒'},
            {id:'男眼霜',name:'男眼霜'},
            {id:'男润唇膏',name:'男润唇膏'},
          ],
          '清洁馆':[
            {id:'洗衣液',name:'洗衣液'},
            {id:'洗衣粉',name:'洗衣粉'},
            {id:'洗衣皂',name:'洗衣皂'},
            {id:'柔顺剂',name:'柔顺剂'},
            {id:'凝珠',name:'凝珠'},
            {id:'除菌液',name:'除菌液'},
          ],
          '洗发洁肤':[
            {id:'洗发水',name:'洗发水'},
            {id:'护发素',name:'护发素'},
            {id:'发膜',name:'发膜'},
            {id:'沐浴露',name:'沐浴露'},
            {id:'香皂',name:'香皂'},
            {id:'浴盐',name:'浴盐'},
            {id:'护手霜',name:'护手霜'},
            {id:'脱毛膏',name:'脱毛膏'},
            {id:'男士洗液',name:'男士洗液'},
            {id:'润肤露',name:'润肤露'},
            {id:'洗手液',name:'洗手液'},
          ],
          '口腔护理':[
            {id:'牙膏',name:'牙膏'},
            {id:'牙刷',name:'牙刷'},
            {id:'牙线',name:'牙线'},
            {id:'牙贴',name:'牙贴'},
            {id:'牙粉',name:'牙粉'},
            {id:'漱口水',name:'漱口水'},
          ],
          '保暖内衣':[
            {id:'保暖上衣',name:'保暖上衣'},
            {id:'保暖裤',name:'保暖裤'},
            {id:'保暖套装',name:'保暖套装'},
            {id:'男士保暖',name:'男士保暖'},
            {id:'女士保暖',name:'女士保暖'},
            {id:'加绒保暖',name:'加绒保暖'},
            {id:'秋衣秋裤',name:'秋衣秋裤'},
            {id:'美体保暖',name:'美体保暖'},
            {id:'打底裤',name:'打底裤'},
          ],
          '大牌文胸':[
            {id:'文胸',name:'文胸'},
            {id:'文胸套装',name:'文胸套装'},
            {id:'光面文胸',name:'光面文胸'},
            {id:'无钢圈文胸',name:'无钢圈'},
            {id:'聚拢文胸',name:'聚拢文胸'},
            {id:'运动文胸',name:'运动文胸'},
            {id:'少女文胸',name:'少女文胸'},
            {id:'大码文胸',name:'大码文胸'},
            {id:'薄杯文胸',name:'薄杯文胸'},
          ],
          '袜子':[
            {id:'休闲棉袜',name:'休闲棉袜'},
            {id:'男船袜',name:'男船袜'},
            {id:'女船袜',name:'女船袜'},
            {id:'丝袜',name:'丝袜'},
            {id:'商务男袜',name:'商务男袜'},
            {id:'连裤袜',name:'连裤袜'},
          ],
          '眼镜配件':[
            {id:'眼镜框',name:'眼镜框'},
            {id:'太阳镜',name:'太阳镜'},
            {id:'防辐射眼镜',name:'防辐射眼镜'},
            {id:'老花镜',name:'老花镜'},
            {id:'袖扣',name:'袖扣'},
            {id:'领带',name:'领带'},
            {id:'领结',name:'领结'},
            {id:'领带夹',name:'领带夹'},
            {id:'男士腰带',name:'男士腰带'},
            {id:'女士腰带',name:'女士腰带'},
            {id:'口罩',name:'口罩'},
            {id:'耳罩',name:'耳罩'},
          ],
          '睡衣家居服':[
            {id:'女士睡衣',name:'女士睡衣'},
            {id:'男士睡衣',name:'男士睡衣'},
            {id:'情侣睡衣',name:'情侣睡衣'},
            {id:'全棉睡衣',name:'全棉睡衣'},
            {id:'夹棉睡衣',name:'夹棉睡衣'},
            {id:'加绒睡衣',name:'加绒睡衣'},
            {id:'卡通睡衣',name:'卡通睡衣'},
            {id:'亲子睡衣',name:'亲子睡衣'},
            {id:'棉袍',name:'棉袍'},
            {id:'睡裙',name:'睡裙'},
            {id:'真丝睡衣',name:'真丝睡衣'},
          ],
          '男士内裤':[
            {id:'男士内裤',name:'男士内裤'},
            {id:'平角内裤',name:'平角内裤'},
            {id:'情侣内裤',name:'情侣内裤'},
          ],
          '女士内裤':[
            {id:'女士内裤',name:'女士内裤'},
            {id:'蕾丝内裤',name:'蕾丝内裤'},
            {id:'安全裤',name:'安全裤'},
            {id:'无痕内裤',name:'无痕内裤'},
          ],
          '围巾帽子':[
            {id:'女士围巾',name:'女士围巾'},
            {id:'男士围巾',name:'男士围巾'},
            {id:'女士披肩',name:'女士披肩'},
            {id:'毛绒帽',name:'毛绒帽'},
            {id:'羊毛围巾',name:'羊毛围巾'},
            {id:'真皮手套',name:'真皮手套'},
            {id:'毛绒手套',name:'毛绒手套'},
            {id:'棒球帽',name:'棒球帽'},
            {id:'鸭舌帽',name:'鸭舌帽'},
            {id:'礼帽',name:'礼帽'},
            {id:'贝雷帽',name:'贝雷帽'},
          ],
          '户外服饰':[
            {id:'户外风衣',name:'户外风衣'},
            {id:'徒步鞋',name:'徒步鞋'},
            {id:'速干衣裤',name:'速干衣裤'},
            {id:'迷彩服',name:'迷彩服'},
            {id:'冲锋衣',name:'冲锋衣'},
            {id:'登山鞋',name:'登山鞋'},
            {id:'越野慢跑',name:'越野慢跑'},
            {id:'户外袜',name:'户外袜'},
            {id:'抓绒衣',name:'抓绒衣'},
            {id:'抓绒裤',name:'抓绒裤'},
            {id:'雪地靴',name:'雪地靴'},
            {id:'雪地服',name:'雪地服'},
            {id:'户外背包',name:'户外背包'},
          ],
          '户外鞋包':[
            {id:'登山鞋',name:'登山鞋'},
            {id:'越野跑鞋',name:'越野跑鞋'},
            {id:'溯溪鞋',name:'溯溪鞋'},
            {id:'沙滩鞋',name:'沙滩鞋'},
            {id:'户外袜',name:'户外袜'},
          ],
          '运动服饰':[
            {id:'运动套装',name:'运动套装'},
            {id:'运动裤',name:'运动裤'},
            {id:'运动卫衣',name:'运动卫衣'},
            {id:'运动配饰',name:'运动配饰'},
            {id:'健身服',name:'健身服'},
          ],
          '运动鞋包':[
            {id:'跑步鞋',name:'跑步鞋'},
            {id:'休闲鞋',name:'休闲鞋'},
            {id:'篮球鞋',name:'篮球鞋'},
            {id:'帆布鞋',name:'帆布鞋'},
            {id:'拖鞋',name:'拖鞋'},
            {id:'运动包',name:'运动包'},
            {id:'板鞋',name:'板鞋'},
            {id:'足球鞋',name:'足球鞋'},
            {id:'训练鞋',name:'训练鞋'},
            {id:'乒乓球鞋',name:'乒乓球鞋'},
            {id:'羽毛球鞋',name:'羽毛球鞋'},
            {id:'网球鞋',name:'网球鞋'},
          ],
          '户外装备':[
            {id:'望远镜',name:'望远镜'},
            {id:'帐篷',name:'帐篷'},
            {id:'户外照明',name:'户外照明'},
            {id:'冲浪潜水',name:'冲浪潜水'},
            {id:'睡袋',name:'睡袋'},
            {id:'户外仪表',name:'户外仪表'},
            {id:'登山杖',name:'登山杖'},
            {id:'滑雪镜',name:'滑雪镜'},
            {id:'钓竿',name:'钓竿'},
            {id:'鱼线',name:'鱼线'},
            {id:'浮漂',name:'浮漂'},
            {id:'鱼钩',name:'鱼钩'},
            {id:'鱼饵',name:'鱼饵'},
            {id:'钓鱼包',name:'钓鱼包'},
            {id:'钓箱',name:'钓箱'},
            {id:'钓椅',name:'钓椅'},
            {id:'鱼线轮',name:'鱼线轮'},
            {id:'钓鱼灯',name:'钓鱼灯'},
            {id:'遮阳伞',name:'遮阳伞'},
          ],
          '体育用品':[
            {id:'羽毛球拍',name:'羽毛球拍'},
            {id:'乒乓球拍',name:'乒乓球拍'},
            {id:'篮球',name:'篮球'},
            {id:'足球',name:'足球'},
            {id:'网球拍',name:'网球拍'},
            {id:'排球',name:'排球'},
            {id:'高尔夫',name:'高尔夫'},
            {id:'台球桌',name:'台球桌'},
            {id:'棋牌麻将',name:'棋牌麻将'},
            {id:'轮滑滑板',name:'轮滑滑板'},
            {id:'棒球',name:'棒球'},
          ],
          '骑行设备':[
            {id:'山地车',name:'山地车'},
            {id:'折叠车',name:'折叠车'},
            {id:'电动车',name:'电动车'},
            {id:'自行车',name:'自行车'},
            {id:'骑行服',name:'骑行服'},
            {id:'骑行装备',name:'骑行装备'},
            {id:'平衡车',name:'平衡车'},
          ],
          '游泳用品':[
            {id:'泳镜',name:'泳镜'},
            {id:'泳帽',name:'泳帽'},
            {id:'游泳包',name:'游泳包'},
            {id:'女士泳衣',name:'女士泳衣'},
            {id:'男士泳衣',name:'男士泳衣'},
            {id:'比基尼',name:'比基尼'},
            {id:'游泳配件',name:'游泳配件'},
            {id:'游泳圈',name:'游泳圈'},
          ],
          '休闲零食':[
            {id:'休闲零食',name:'休闲零食'},
            {id:'膨化食品',name:'膨化食品'},
            {id:'坚果炒货',name:'坚果炒货'},
            {id:'肉干',name:'肉干'},
            {id:'熟食',name:'熟食'},
            {id:'蜜饯果干',name:'蜜饯果干'},
            {id:'糖果',name:'糖果'},
            {id:'巧克力',name:'巧克力'},
            {id:'饼干',name:'饼干'},
            {id:'蛋糕',name:'蛋糕'},
          ],
          '图书文学':[
            {id:'童书',name:'童书'},
            {id:'小说',name:'小说'},
            {id:'教材图书',name:'教材图书'},
            {id:'经管图书',name:'经管图书'},
            {id:'科技书籍',name:'科技书籍'},
            {id:'文学小说',name:'文学小说'},
            {id:'学习考试',name:'学习考试'},
          ],
          '宠物生活':[
            {id:'狗粮',name:'狗粮'},
            {id:'狗零食',name:'狗零食'},
            {id:'狗罐头',name:'狗罐头'},
            {id:'狗玩具',name:'狗玩具'},
            {id:'狗窝',name:'狗窝'},
            {id:'宠物牵引',name:'宠物牵引'},
            {id:'猫粮',name:'猫粮'},
            {id:'猫罐头',name:'猫罐头'},
            {id:'猫零食',name:'猫零食'},
            {id:'猫爬架',name:'猫爬架'},
            {id:'猫砂',name:'猫砂'},
            {id:'猫窝',name:'猫窝'},
          ],
          '礼品鲜花':[
            {id:'创意礼品',name:'创意礼品'},
            {id:'工艺摆件',name:'工艺摆件'},
            {id:'礼品定制',name:'礼品定制'},
            {id:'文房',name:'文房'},
            {id:'婚庆节庆',name:'婚庆节庆'},
            {id:'鲜花',name:'鲜花'},
            {id:'永生花',name:'永生花'},
            {id:'香皂花',name:'香皂花'},
            {id:'干花',name:'干花'},
          ],
          '手机通讯':[
            {id:'苹果手机',name:'苹果手机'},
            {id:'三星手机',name:'三星手机'},
            {id:'锤子手机',name:'锤子手机'},
            {id:'华为手机',name:'华为手机'},
            {id:'OPPO手机',name:'OPPO'},
            {id:'vivo手机',name:'vivo'},
            {id:'游戏手机',name:'游戏手机'},
            {id:'拍照手机',name:'拍照手机'},
            {id:'女性手机',name:'女性手机'},
            {id:'户外手机',name:'户外手机'},
            {id:'老人机',name:'老人机'},
            {id:'手机',name:'手机'},
            {id:'对讲机',name:'对讲机'},
          ],
          '手机配件':[
            {id:'手机壳',name:'手机壳'},
            {id:'手机贴膜',name:'手机贴膜'},
            {id:'数据线',name:'数据线'},
            {id:'充电宝',name:'充电宝'},
            {id:'充电器',name:'充电器'},
            {id:'手机转接',name:'手机转接'},
            {id:'手机支架',name:'手机支架'},
            {id:'拍照配件',name:'拍照配件'},
            {id:'手机电池',name:'手机电池'},
            {id:'手机耳机',name:'手机耳机'},
            {id:'蓝牙耳机',name:'蓝牙耳机'},
            {id:'手机存储卡',name:'存储卡'},
            {id:'车载配件',name:'车载配件'},
          ],
          '摄影摄像':[
            {id:'单反相机',name:'单反相机'},
            {id:'单电',name:'单电'},
            {id:'微单相机',name:'微单相机'},
            {id:'拍立得',name:'拍立得'},
            {id:'数码相机',name:'数码相机'},
            {id:'摄像机',name:'摄像机'},
            {id:'运动相机',name:'运动相机'},
            {id:'镜头',name:'镜头'},
            {id:'影棚器材',name:'影棚器材'},
            {id:'冲印服务',name:'冲印服务'},
          ],
          '电脑整机':[
            {id:'笔记本',name:'笔记本'},
            {id:'游戏本',name:'游戏本'},
            {id:'台式机',name:'台式机'},
            {id:'一体机',name:'一体机'},
            {id:'轻薄本',name:'轻薄本'},
            {id:'平板电脑',name:'平板电脑'},
            {id:'服务器',name:'服务器'},
          ],
          '电脑配件':[
            {id:'显示器',name:'显示器'},
            {id:'组装电脑',name:'组装电脑'},
            {id:'CPU',name:'CPU'},
            {id:'主板',name:'主板'},
            {id:'显卡',name:'显卡'},
            {id:'硬盘',name:'硬盘'},
            {id:'固态硬盘',name:'固态硬盘'},
            {id:'内存',name:'内存'},
            {id:'机箱',name:'机箱'},
            {id:'电源',name:'电源'},
            {id:'刻录机',name:'刻录机'},
            {id:'光驱',name:'光驱'},
            {id:'散热器',name:'散热器'},
            {id:'声卡',name:'声卡'},
          ],
          '网络产品':[
            {id:'路由器',name:'路由器'},
            {id:'网卡',name:'网卡'},
            {id:'网络盒子',name:'网络盒子'},
            {id:'交换机',name:'交换机'},
            {id:'网线',name:'网线'},
          ],
          '办公设备':[
            {id:'多功能一体机',name:'一体机'},
            {id:'打印机',name:'打印机'},
            {id:'投影机',name:'投影机'},
            {id:'投影配件',name:'投影配件'},
            {id:'传真设备',name:'传真设备'},
            {id:'点钞机',name:'点钞机'},
            {id:'扫描仪',name:'扫描仪'},
            {id:'条码扫描',name:'条码扫描'},
            {id:'复合机',name:'复合机'},
            {id:'碎纸机',name:'碎纸机'},
            {id:'考勤门禁',name:'考勤门禁'},
            {id:'收银机',name:'收银机'},
            {id:'保险柜',name:'保险柜'},
            {id:'装订机',name:'装订机'},
            {id:'安防监控',name:'安防监控'},
            {id:'办公家具',name:'办公家具'},
          ],
          '家用电器':[
            {id:'电视',name:'电视'},
            {id:'空调',name:'空调'},
            {id:'洗衣机',name:'洗衣机'},
            {id:'冰箱',name:'冰箱'},
            {id:'抽烟机',name:'抽烟机'},
            {id:'燃气灶',name:'燃气灶'},
            {id:'热水器',name:'热水器'},
            {id:'电饭煲',name:'电饭煲'},
            {id:'榨汁机',name:'榨汁机'},
            {id:'微波炉',name:'微波炉'},
            {id:'电水壶',name:'电水壶'},
            {id:'电磁炉',name:'电磁炉'},
            {id:'烤箱',name:'烤箱'},
            {id:'豆浆机',name:'豆浆机'},
            {id:'咖啡机',name:'咖啡机'},
            {id:'面包机',name:'面包机'},
            {id:'空气炸锅',name:'空气炸锅'},
          ],
        },
        wrapperHeight:0,
        loading: false,
        page: {
          offset: 1,
          limit: 20
        },
        infoList:[],
        backTopShow:false,
        loadFlag:false,
      }
    },
    components: {
      backBar
    },
    mounted(){
      var _this = this;
      this.wrapperHeight = document.documentElement.clientHeight - 92;
      var mySwiper = new Swiper('#swiper-container2', {
          freeMode: true,
          freeModeMomentumRatio: 0.5,
          slidesPerView: 'auto',
          observer: true,//修改swiper自己或子元素时，自动初始化swiper
          observeParents: true,//修改swiper的父元素时，自动初始化swiper
      });
      mySwiper.on('tap', function () {
          _this.loadFlag = false;
          _this.selects = _this.topTabList[mySwiper.clickedIndex].id;
          var swiperWidth = mySwiper.el.clientWidth;
          var maxTranslate = mySwiper.maxTranslate();
          var maxWidth = -maxTranslate + swiperWidth / 2;
          mySwiper3.slideTo(mySwiper.clickedIndex, 300);
          var slide = mySwiper.slides[mySwiper.clickedIndex];
          var slideLeft = slide.offsetLeft;
          var slideWidth = slide.clientWidth;
          var slideCenter = slideLeft + slideWidth / 2;
          mySwiper.setTransition(300);
          if (slideCenter < swiperWidth / 2) {
            console.log(1)
              mySwiper.setTranslate(0);
          } else if (slideCenter > maxWidth) {
              mySwiper.setTranslate(maxTranslate);
          } else {
              var nowTlanslate = slideCenter - swiperWidth / 2;
              mySwiper.setTranslate(-nowTlanslate);
          }
          $('#swiper-container2  .activeve').removeClass('activeve');
          $('#swiper-container2 .swiper-slide span').eq(mySwiper.clickedIndex).addClass('activeve');
      });
      var mySwiper3 = new Swiper('#swiper-container3', {
          on: {
              slideChangeTransitionStart: function (e) {
                  _this.infoList=[];
                  _this.loadFlag = false;
                  updateNavPosition();
              },
              slideChangeTransitionEnd: function () {
                  _this.loadFlag=false;
                  _this.page.offset=1;
                  _this.page.limit=20;
                  _this.selects = _this.topTabList[mySwiper3.activeIndex].id;
                  _this.moreLists(_this.selects,_this.page.offset,_this.page.limit);
              },
          },
          resistanceRatio: 0,//边缘抵抗力
          direction: 'horizontal',//横向切换
          touchRatio: 1,
          speed: 100,
          preventLinksPropagation: false,//拖动Swiper时阻止click事件。
          observer: true,//修改swiper自己或子元素时，自动初始化swiper
          observeParents: true,//修改swiper的父元素时，自动初始化swiper
      });
      function updateNavPosition() {
          $('#swiper-container2 .activeve').removeClass('activeve');
          $('#swiper-container2 .swiper-slide span').eq(mySwiper3.activeIndex).addClass('activeve');
          var activeNav = $('#swiper-container2 .swiper-slide').eq(mySwiper3.activeIndex)
          if (!activeNav.hasClass('swiper-slide-visible')) {
              if (activeNav.index() >= mySwiper.activeIndex) {
                  var thumbsPerNav = 2;
                  mySwiper.slideTo((activeNav.index() - thumbsPerNav),600);
              }
              else {
                  mySwiper.slideTo(activeNav.index());
              }
          }
      }
    },
    created(){
      this.titleName = this.$route.query.name;
      this.select = this.$route.query.id;
      this.topTabList = this.listJson[this.select];
      this.selects = this.topTabList[0].id;
      this.moreLists(this.selects,this.page.offset,this.page.limit);
    },
    methods:{
      loadMore() {
        if(this.loadFlag){
          this.loading = true;
          this.page.offset++;
          this.moreList(this.selects,this.page.offset,this.page.limit);
        }
      },
      moreList(name,page_no,page_size) {
        console.log(name)
        this.$http({
          method: 'get',
          url: this.apiUrl.getlist,
          params: {
            name: name,
            page_no: page_no,
            page_size: page_size,
          }
        }).then(res => {
          if (res.status == 200) {
            console.log(res);
            res.data.list.forEach(item => {
              let price = item.coupon_info.replace(/满/g, '').replace(/减/g, '$').split('$');
              let stime = item.coupon_start_time.replace(/-/g,'.');
              let etime = item.coupon_end_time.replace(/-/g,'.');
              item.coupon_all_time = stime+'-'+etime;
              item.reserve_price = item.zk_final_price;
              item.zk_final_price = item.zk_final_price >= parseInt(price[0]) ? (item.zk_final_price - parseInt(price[1])).toFixed(2) : item.zk_final_price;
              item.pictUrl = item.pictUrl +'_200x200.jpg';
              item.title = item.title.slice(0,18)+'...';
              item.couponPrice = parseInt(price[1]);
            });
            this.infoList = this.infoList.concat(res.data.list);
            this.$nextTick(() => {
              this.loading = false;
            })
          }
        }).catch()
      },
      moreLists(name,page_no,page_size) {
        this.$http({
          method: 'get',
          url: this.apiUrl.getlist,
          params: {
            name: name,
            page_no: page_no,
            page_size: page_size,
          }
        }).then(res => {
          if (res.status == 200) {
            res.data.list.forEach(item => {
              let price = item.coupon_info.replace(/满/g, '').replace(/减/g, '$').split('$');
              let stime = item.coupon_start_time.replace(/-/g,'.');
              let etime = item.coupon_end_time.replace(/-/g,'.');
              item.coupon_all_time = stime+'-'+etime;
              item.reserve_price = item.zk_final_price;
              item.zk_final_price = item.zk_final_price >= parseInt(price[0]) ? (item.zk_final_price - parseInt(price[1])).toFixed(2) : item.zk_final_price;
              item.pictUrl = item.pictUrl +'_200x200.jpg';
              item.title = item.title.slice(0,18)+'...';
              item.couponPrice = parseInt(price[1]);
            });
            this.infoList = this.infoList.concat(res.data.list);
            this.$nextTick(() => {
              this.loading = false;
            })
            this.loadFlag = true;
          }
        }).catch()
      },
      gotop() {
        $('#swiper-container3').animate({scrollTop:0}, 500);
      },
      handleScroll() {
        if ($('#swiper-container3').scrollTop() > 100) {
          this.backTopShow = true;
        } else {
          this.backTopShow = false;
        }
      },
      showBox(){
        $('.fenBox').show();
        this.shang = false;
      },
      hideBox(){
        this.shang = true;
        $('.fenBox').hide()
      },
      goDetail(id, url,sTime,eTime,couponInfo,couponPrice,reservePrice,zkfinalPrice,allTime) {
        this.$router.push({path: '/detail', query: {id: id,url:url,sTime:sTime,eTime:eTime,couponInfo:couponInfo,couponPrice:couponPrice,reservePrice:reservePrice,zkfinalPrice:zkfinalPrice,allTime:allTime}});
      },
    }
  }
</script>
<style>
    .activeve {
        color: #fff;
        background: #eb6e36;
    }
    .assortments{
      padding-top: 50px;
    }
    .assortments .nav-swiper {
        width: 100%;
        height: 42px;
        border-bottom: 1px solid #f8f8f8;
        position: relative;
    }
    .assortments .nav-swiper #swiper-container2 {
        width: 100%;
        font-size: 14px;
        color: #353535;
        font-weight: 500;
        height: 42px;
        line-height: 42px;
    }
    .assortments .nav-swiper #swiper-container2 .swiper-slide:first-child {
        margin-left: 10px;
    }
    .assortments .nav-swiper #swiper-container2 .swiper-slide:last-child {
        margin-right: 10px;
    }
    .assortments .nav-swiper #swiper-container2 .swiper-slide {
        width: auto;
    }
    .assortments .nav-swiper #swiper-container2 .swiper-slide span{
      padding: 2px 10px;
      border-radius: 12px;
    }
    .assortments  #swiper-container3{
      overflow-y: auto;
      overflow-x: auto;
    }
    .assortments  #swiper-container3 .listCon{
      width: 48%;
      background: #fff;
      float: left;
      margin-right: 4%;
      margin-bottom: 2%;
    }
    .assortments  #swiper-container3 .listCon:nth-child(2n){
      margin-right: 0;
    }
    .assortments  #swiper-container3 .listCon .toppic img{
      width: 100%;
      height: auto;
      vertical-align: middle;
    }
    .assortments  #swiper-container3 .listCon .goodTitle{
      padding-top: 5px;
      line-height: 16px;
      padding-left: 5px;
    }
    .assortments  #swiper-container3 .listCon .goodTitle img{
      width: 15px;
      height: auto;
      vertical-align: middle;
    }
    .assortments  #swiper-container3 .listCon .goodTitle span{
      vertical-align: middle;
      font-size: 13px;
    }
    .assortments  #swiper-container3 .listCon .goodsInfo{
      font-size: 12px;
      color: #999;
      display: -webkit-flex;
      display: flex;
      padding-bottom: 2px;
      padding-top: 3px;
    }
    .assortments  #swiper-container3 .listCon .goodsInfo .tbprice{
      padding-left: 5px;
    }
    .assortments  #swiper-container3 .listCon .goodsInfo .month{
      flex: 1;
      text-align: right;
      padding-right: 5px;
    }
    .assortments  #swiper-container3 .listCon .youhui {
      padding-left: 5px;
      color: red;
      padding-bottom: 5px;
      display: flex;
      display: -webkit-flex;
      align-items: center;
    }
    .assortments  #swiper-container3 .listCon .youhui .quanhou{
      font-size: 12px;
      flex: 1;
    }
    .assortments  #swiper-container3 .listCon .youhui .quanhou .number{
      font-size: 14px;
      font-weight: 700;
      padding-left: 4px;
    }
    .assortments  #swiper-container3 .listCon .youhui .youhuiPrice{
      padding-right: 5px;
      position: relative;
    }
    .assortments  #swiper-container3 .listCon .youhui .youhuiPrice img{
      width: 44px;
      vertical-align: middle;
      height: auto;
    }
    .assortments  #swiper-container3 .listCon .youhui .youhuiPrice span{
      position: absolute;
      font-size: 12px;
      left: 3px;
      top: 5px;
      transform: scale(.7,.7);
      color: #fff;
    }
    .assortments  .weui-cells{
      margin-top: 0;
      padding: 0 15px;
      /* background-color: #e0e0e0; */
    }
    .assortments  .page-infinite-wrapper{
      position: static;
      overflow-x: visible;
      overflow-y: visible;
    }
    .assortments  .loading-tips {
      text-align: center;
    }
    .assortments  .gotop {
      width: 30px;
      height: 30px;
      position: fixed;
      bottom: 80px;
      right: 15px;
      z-index: 1;
    }
    .assortments  .gotop img {
        width: 100%;
    }
    .juxing{
      width: 50px;
      height: 42px;
      position: absolute;
      right: 0;
      top: 0;
      background: #fff;
      z-index: 3;
      text-align: center;
    }
    .juxing img{
      width: 20px;
      height: auto;
      vertical-align: baseline;
      padding-top: 12px;
    }
    .fenBox{
      width: 100%;
      background: #fff;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 2;
      display: none;
    }
    .fenBox p{
      line-height: 42px;
      border-bottom: 1px solid #e0e0e0;
      padding: 0 20px;
    }
    .fenBox .wra{
      padding: 0 20px;
      display: -webkit-flex;
      display: flex;
      flex-direction: row;
      flex-wrap:wrap;
      justify-content: space-between;
      padding-bottom: 10px;
      padding-top: 8px;
    }
    .fenBox .wra div{
      width: 23%;
      text-align: center;
      margin: 6px 0;
      border-radius: 12px;
      padding: 2px 0;
      font-size: 12px;
      overflow: hidden;
      border: 1px solid #e0e0ee;
    }
</style>

