import Vue from 'vue';
import vuex from 'vuex';

Vue.use(vuex);

// import dingStatus from './dingStatus.js';

export default new vuex.Store({
    /*全局状态*/
    state: {
        activeIndex:0,
        deviceuuid:'864035034842337',//设备uuid
        devicemodel:'设备型号',
        name:'',
        popup:true,//弹窗
    },
    /*局部状态*/
    modules:{
        // ding:dingStatus
    },
    getters:{

    },
    mutations:{
    },
    actions:{
    }
});
