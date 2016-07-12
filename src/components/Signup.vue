<template>
  <div class="appblanker-container">
    <div class="appblanker" novalidate>
      <h3>邮箱注册</h3>
      <div class="form-title">
        注册方式:
        <a class="without-underline" v-link="{ name: 'signupbyphone' }"><input type="checkbox" /> 手机</a>
        <input type="checkbox" checked /> 邮箱
      </div>
      <div id="erroralert"></div>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          placeholder="邮箱"
          v-model="credentials.email"
        >
      </div>
      <div class="form-group">
        <input
          type="password"
          maxlength="20"
          class="form-control"
          placeholder="请输入密码（6-20位字母、数字）"
          v-model="credentials.password"
        >
      </div>
      <div class="form-group">
        <input
          type="password"
          class="form-control"
          placeholder="确认密码"
          v-model="credentials.password2"
        >
      </div>
      <button class="btn btn-primary" @click="submit()">注册</button>
      <div class="btn-below">已经拥有帐号? <a v-link="{name:'login'}">直接登录</a> ｜ <a v-link="{name:'index'}">返回首页</a></div>
    </div>
    <alert
      :show.sync="alertError"
      :duration="3000"
      type="danger"
      width="350px"
      dismissable>
        <span class="icon-info-circled alert-icon-float-left"></span>
        <p>{{error}}</p>
    </alert>
    <alert
      :show.sync="alertSuccess"
      :duration="3000"
      type="info"
      width="350px"
      dismissable>
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
      alertSuccess: false,
      credentials: {
        email: '',
        password: ''
      },
      error: '',
      success:''
    }
  },

  methods: {

    submit () {
      this.error = false
      var credentials =
      {
        email:this.credentials.email,
        password:this.credentials.password,
        mtype:2
      }

      if (Validator.isEmail(credentials.email)!=true){
        return this.alertError = !!(this.error = "邮件格式不正确")
      }
      else if (Validator.isLength(credentials.password,{min: 6, max: 20})!=true){
        return this.alertError = !!(this.error = "密码长度为6-20位")
      }
      else if (Validator.isAlphanumeric(credentials.password)!=true){
        return this.alertError = !!(this.error = "密码只能包含数字和英文字母")
      }
      else if (credentials.password!=this.credentials.password2){
        return this.alertError = !!(this.error = "请确认输入两次相同的密码")
      }
      auth.signup(this, credentials, 'email', (err)=> {
        if(err){
          console.log(err)
          return this.alertError = !!(this.error = err)
        }
        this.alertSuccess = !!(this.success = "注册成功")
        router.go(router.redirect)
      })
    }
  }
}
</script>
