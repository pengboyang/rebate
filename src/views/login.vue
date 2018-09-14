<template>
  <div class="login">
    <div class="loginBack"><img src="../assets/img/loginzback.png" alt=""></div>
    <div class="loginText"><img src="../assets/img/loginTetx.png" alt=""></div>
    <div class="content">
      <div class="wra">
        <div class="comen"><img class="imgone" src="../assets/img/phone.png" alt=""><input type="text" placeholder="请输入手机号"></div>
        <div class="comen"><img class="imgtwo" src="../assets/img/lock.png" alt=""><input placeholder="请输入验证码" type="text"><div class="yzm">获取验证码</div></div>
      </div>
      <div class="loginbtn"><img src="../assets/img/loginBtn.png" alt=""></div>
    </div>
  </div>
</template>
<script>
  
</script>
<style>
  .login{
    background: url('../assets/img/LOGINbg.png');
    background-size: 100% 100%;
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
