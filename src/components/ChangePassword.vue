<template>
  <div class="appblanker-container">
    <div class="appblanker">
      <h3>修改密码</h3>
      <div class="form-group">
        <input
          @keyup.enter="submit"
          type="text"
          class="form-control"
          placeholder="原密码"
          v-model="credentials.password"
        >
      </div>
      <div class="form-group">
        <input
          @keyup.enter="submit"
          type="password"
          class="form-control"
          placeholder="新密码（6-20位字母、数字）"
          v-model="credentials.newpass"
        >
      </div>
      <div class="form-group">
        <input
          @keyup.enter="submit"
          type="password"
          class="form-control"
          placeholder="确认密码"
          v-model="credentials.newpass2"
        >
      </div>
      <button class="btn btn-primary" @click="submit()">修改</button>
      <div class="form-group">
        <a v-link="{name:'profileuser'}">返回个人信息页</a>
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
import { router } from '../main'
import Validator from 'validator'
import alert from './vuetrap/Alert'

export default {
  components:{
    alert
  },
  route: {
    data (transition) {
      this.credentials = {
        newpass:'',
        password:'',
        newpass2:''
      }
      transition.next()
    }
  },
  data () {
    return {
      url:urlConf.password.change,
      alertError: false,
      alertSuccess: false,
      credentials: {
        newpass: '',
        password: '',
        newpass2:''
      },
      error: '',
      success:''
    }
  },

  methods: {

    submit () {
      this.error = false
      this.success = false
      let credentials = {
        password: this.credentials.password,
        newpass: this.credentials.newpass,
        scode:localStorage.getItem('id_token'),
        uid:localStorage.getItem('id_user')
      }
      if ( credentials.newpass == ''){
        return this.alertError = !!(this.error = "请输入新密码")
      }
      else if (credentials.password == ''){
        return this.alertError = !!(this.error = "请输入原密码")
      }
      else if (credentials.password === credentials.newpass){
        return this.alertError = !!(this.error = "新旧密码是相同的")
      }
      else if (Validator.isLength(credentials.newpass,{min: 6, max: 20})!=true){
        return this.alertError = !!(this.error = "密码长度为6-20位")
      }
      else if (Validator.isAlphanumeric(credentials.newpass)!=true){
        return this.alertError = !!(this.error = "密码只能包含数字和英文字母")
      }
      else if (credentials.newpass!=this.credentials.newpass2){
        return this.alertError = !!(this.error = "请确认输入两次相同的密码")
      }
      this.$http.post(this.url,credentials)
      .then( (res) => {
        if(res.data.code!=0)
        {
          return this.alertError = !!(this.error = res.data.msg)
        } else{
          this.alertSuccess = !!(this.success = '密码已修改成功')
          setTimeout( function(){
            router.go({name:"profileuser"})
          }, 3500)
        }

      },(err)=>{
        return this.alertError = !!(this.error = err)
      })

    }

  }
}
</script>
