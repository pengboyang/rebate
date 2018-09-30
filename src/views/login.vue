<template>
  <div>
    <div class="bg"><img src="../assets/img/LOGINbg.png" alt=""></div>
    <div class="login">
      <div class="loginBack" @click="goback"><img src="../assets/img/loginzback.png" alt=""></div>
      <div class="loginText"><img src="../assets/img/loginTetx.png" alt=""></div>
      <div class="content">
        <div class="wra">
          <div class="comen"><img class="imgone" src="../assets/img/phone.png" alt=""><input type="text" placeholder="请输入手机号" v-model="phoneNumber"></div>
          <div class="comen"><img class="imgtwo" src="../assets/img/lock.png" alt=""><input placeholder="请输入验证码" type="text" v-model="yzmNumer"><div @click="sendCode" ref="time" class="yzm">获取验证码</div></div>
        </div>
        <div class="loginbtn" @click="openIndicatorWithText"><img src="../assets/img/loginBtn.png" alt=""></div>
      </div>
    </div>
  </div>
</template>
<script>
  import { Toast } from 'we-vue'
  export default{
    name:'login',
    data(){
      return{
        phoneNumber:'',
        nowTime:'',
        sendPhoneYzm:true,
        timer:null,
        yzmNumer:''
      }
    },
    created(){
      this.serviceTime();
      // console.log(this.$route);
    },
    methods:{
      goback(){
        this.$router.go(-1);
      },
      //发送验证码
      sendCode() {
          if(!this.sendPhoneYzm){
            return false;
          }
          if (this.phoneNumber == '' || !(/^1(3|4|5|7|8|9)\d{9}$/.test(this.phoneNumber))) {
              Toast.text({
                duration: 1000,
                message: '手机号不符合规则，请重新输入！'
              })
              return false;
          }
          this.sendPhoneYzm = false;
          this.updateDiffer();
          this.nowTime = Date.parse(new Date()) / 1000 + this.differ;
          var countDown = 60;
          var _this = this;

          function setTime() {
              _this.$refs.time.innerText = countDown + 's';
              _this.$refs.time.style.color='#999'
              countDown--;
              if (countDown < 10) {
                  countDown = '0' + countDown;
              }
              if (countDown == '00') {
                  clearInterval(_this.timer);
                  countDown = 60;
                  _this.sendPhoneYzm = true;
                  _this.$refs.time.innerText = '获取验证码';
                  _this.$refs.time.style.color='red';
              }
          }
          setTime()
          this.timer = setInterval(() => {
              setTime();
          }, 1000);
          this.$http({
              method: 'get',
              url: this.apiUrl.userGetcode,
              params: {phone: this.encrypt(this.phoneNumber, this.nowTime + 'Th2F1h'), times: this.nowTime}
          }).then(res => {
              if (res.status == 200) {
                  console.log(res);
                  if (res.data.status == 1) {
                      Toast.text({
                          message: res.data.message,
                          duration: 2000,
                      });
                  }else{
                      clearInterval(this.timer);
                      Toast.text({
                          message: res.data.message,
                          duration: 2000,
                      });
                      this.$refs.time.innerText = '获取验证码';
                      this.sendPhoneYzm = true;
                      this.$refs.time.style.color='red';
                  }
              }
          }).catch();
      },
      //验证码登陆
      openIndicatorWithText() {
          if (this.yzmNumer == '') {
              Toast.text({
                  message: '验证码不能为空',
                  duration: 1000,
              });
              return false;
          }
          if (this.phoneNumber == '' || !(/^1(3|4|5|7|8|9)\d{9}$/.test(this.phoneNumber))) {
              Toast.text({
                  message: '手机号不符合规则，请重新输入！',
                  duration: 1000,
              });
              return false;
          }
          clearInterval(this.timer);
          Toast.loading('登陆中')
          this.$refs.time.innerText = '获取验证码';
          this.sendPhoneYzm = true;
          this.$refs.time.style.color='red';
          this.updateDiffer();
          this.nowTime = Date.parse(new Date()) / 1000 + this.differ;
          this.$http({
              method: 'post',
              url: this.apiUrl.userLogin,
              params: {
                  phone: this.encrypt(this.phoneNumber, this.nowTime + 'Th2F1h'),
                  code: this.encrypt(this.yzmNumer, this.nowTime + 'Th2F1h'),
                  deviceID: this.encrypt(this.$store.state.deviceuuid, this.nowTime + 'Th2F1h'),
                  channelCode: '渠道号',
                  mobileModel: this.encrypt(this.$store.state.devicemodel, this.nowTime + 'Th2F1h'),
                  times: this.nowTime
              }
          }).then(res => {
              if (res.status == 200) {
                console.log(res);
                Toast.close()
                if (res.data.status == 1) {
                    var uuid = res.data.uuid;
                    var nickName = res.data.nick;
                    var encrypted = res.data.sign;
                    var key = res.data.times + 'tb0Atd';
                    var token = this.decrypt(encrypted, key);
                    var userInfo = new Object();
                    userInfo.uuid = uuid;
                    userInfo.token = token;
                    userInfo.nickName = nickName;
                    localStorage.setItem('userInfo', JSON.stringify(userInfo));
                    this.$toast.success('登录成功');
                    this.$router.push({path:'/index'});
                } else {
                    Toast.text({
                        message: res.data.message,
                        duration: 2000,
                    });
                    this.yzmNumer = '';
                }
              }
          }).catch();
      },
    }
  }
</script>
<style>
  .bg{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgb(241,94,10);
  }
  .bg img{
    width: 100%;
    height: auto;
    vertical-align: middle;
  }
  .login{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    /* background: url('../assets/img/LOGINbg.png');
    background-size: 100% 100%; */
  }
  .login .loginBack{
    width: 45px;
    height: 45px;
    position: absolute;
    left: 0;
    top: 0;
    vertical-align: middle;
    text-align: center;
  }
  .login .loginBack img{
    width: 12px;
    padding-top: 15px;
  }
  .login .loginText{
    margin-top: 42%;
    text-align: center;
  }
  .login .loginText img{
    width: 50%;
    height: auto;
    vertical-align: middle;
  }
  .login .content{
    padding: 0 20px;
    margin-top: 16%;
  }
  .login .content .wra{
    background: #fff;
    border-radius: 6px;
  }
  .login .content .wra .comen{
    display: -webkit-flex;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e0e0e0;
    padding: 18px 14px;
  }
  .login .content .wra .comen:last-child{
    border: none;
  }
  .login .content .wra .comen img{
    height: auto;
    vertical-align: middle;
  }
  .login .content .wra .comen .imgone{
    width: 24px;
    margin-right: 20px;
  }
  .login .content .wra .comen .imgtwo{
    width: 20px;
    margin-right: 24px;
  }
  .login .content .wra .comen input{
    border: none;
    outline: none;
    width: 50%;
    flex: 1;
    font-size: 16px;
  }
  .login .content .wra .comen .yzm{
    color:red;
    text-align: center;
    width: 80px;
  }
  .login .content .loginbtn{
    width: 100%;
    margin-top: 40px;
  }
  .login .content .loginbtn img{
    width: 100%;
    height: auto;
    vertical-align: middle;
  }
</style>
