<template>
  <div class="appblanker-container">
    <div class="appblanker">
      <h3>手机注册</h3>
      <div class="form-title">
        注册方式:
        <input type="checkbox" checked /></a> 手机
        <a class="without-underline" v-link="{ name: 'signup' }"><input type="checkbox" /> 邮箱</a>
      </div>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          placeholder="手机号"
          v-model="credentials.username"
        >
      </div>
      <div class="form-group">
        <input
          type="password"
          class="form-control"
          placeholder="登录密码（6-20位字母、数字）"
          v-model="credentials.password"
        >
      </div>
      <div class="form-group short-input">
        <input
          type="text"
          class="form-control col-xs-1"
          placeholder="手机验证码"
          v-model="credentials.password2"
        >
        <button class="btn btn-default col-xs-1" @click="submitPhone()">获取验证码</button>
      </div>
      <button class="btn btn-primary" @click="submit()">注册</button>
      <div class="btn-below">已经拥有帐号? <a v-link="{name:'login'}">直接登录</a> ｜ <a v-link="{name:'index'}">返回首页</a></div>
    </div>
    <alert :show.sync="alertError" :duration="3000" type="danger" width="350px" dismissable>
        <span class="icon-info-circled alert-icon-float-left"></span>
        <p>{{error}}</p>
    </alert>
    <alert :show.sync="alertSuccess" :duration="3000" type="info" width="350px" dismissable>
        <span class="icon-info-circled alert-icon-float-left"></span>
        <p>{{success}}</p>
    </alert>
  </div>
</template>

<script>
import auth from '../auth'
import Validator from 'validator'
import alert from './vuetrap/Alert'
import { router } from '../main'

export default {
  components:{
    alert
  },
  data () {
    return {
      alertError: false,
      alertSuccess:false,
      credentials: {
        username: '',
        password: '',
        password2: ''
      },
      error: '',
      success:''
    }
  },

  methods: {
    submitPhone (){
      if (Validator.isMobilePhone(this.credentials.username, 'zh-CN')!=true){
        return this.alertError = !!(this.error = "请输入正确的手机号码")
      }
      auth.authMobile(this,{mobile:this.credentials.username},( (err) => {
        if (err){
          return this.alertError = !!(this.error = err)
        }
        this.alertSuccess = !!(this.success = "验证码已发送，请查收")
      }))

    },
    submit () {
      this.error = false
      var credentials = {
        mobile: this.credentials.username,
        password: this.credentials.password,
        code:this.credentials.password2,
        mtype:2
      }
      if (Validator.isMobilePhone(this.credentials.username, 'zh-CN')!=true){
        return this.alertError = !!(this.error = "请输入正确的手机号码")
      }
      else if (Validator.isLength(credentials.password, {min: 6, max: 20})!=true){
        return this.alertError = !!(this.error = "密码长度为6-20位")
      }
      else if (Validator.isAlphanumeric(credentials.password)!=true){
        return this.alertError = !!(this.error = "密码只能包含数字和英文字母")
      }
      else if (Validator.isLength(this.credentials.password2, {min: 4,max: 6})!=true){
        return this.alertError = !!(this.error = "请输入手机验证码")
      }
      auth.signup(this, credentials, 'mobile', (err)=> {
        if(err){
          console.log(err)
          return this.alertError = !!(this.error = err)
        }
        this.alertSuccess = !!(this.success = "注册成功")
        setTimeout(function(){router.go(router.redirect)},1500)
      })
    }
  }
}
</script>
