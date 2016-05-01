<template>
  <div class="appblanker-container">
    <div class="appblanker">
      <h3>登录</h3>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          placeholder="邮箱 / 手机"
          v-model="credentials.username"
        >
      </div>
      <div class="form-group">
        <input
          type="password"
          class="form-control"
          placeholder="密码"
          v-model="credentials.password"
        >
      </div>
      <button class="btn btn-primary" @click="submit()">登录</button>
      <div class="form-group">
        <a v-link="{name:'signup'}">注册新用户</a> ｜ <a>忘记密码</a>？
      </div>
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
  </div>
</template>

<script>
import auth from '../auth'
import alert from './vuetrap/Alert'

export default {
  components:{
    alert
  },
  data () {
    return {
      alertError: false,
      credentials: {
        username: '',
        password: ''
      },
      error: ''
    }
  },

  methods: {

    submit () {
      this.error = false
      var credentials = {
        name: this.credentials.username,
        pwd: this.credentials.password,
        type:'email'
      }
      console.log(credentials)
      if ( credentials.name == ''){
        return this.alertError = !!(this.error = "请输入邮箱或手机")
      }
      else if (credentials.pwd == ''){
        return this.alertError = !!(this.error = "请输入密码")
      }
      auth.login(this, credentials, 'secretquote')
    }
  }
}
</script>
