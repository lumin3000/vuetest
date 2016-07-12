<template>
<div class="panel-wraper">
  <div class="arrow arrow-pos3">&nbsp;</div>
  <alert
    :show.sync="alertSuccess"
    :duration="3000"
    type="info"
    placement="top"
    width="350px"
    dismissable>
      <span class="icon-info-circled alert-icon-float-left"></span>
      <p>{{success}}</p>
  </alert>
  <alert
    :show.sync="alertError"
    :duration="3000"
    type="danger"
    placement="top"
    width="350px"
    dismissable>
      <span class="icon-info-circled alert-icon-float-left"></span>
      <p>{{error}}</p>
  </alert>
  <ul class="nav nav-tabs nav-justified">
    <li class="disabled"><a>&nbsp;</a></li>
    <li class="active"><a>个人信息</a></li>
    <li><a v-link="{name:'profileenterprise'}">企业信息</a></li>
    <li class="disabled"><a>&nbsp;</a></li>
  </ul>
  <div class="profile-wraper">
    <div class="col-xs-3 text-right">
      <div class="avatar">
        <img v-if="user.avatar" :src="user.avatar" >
        <span v-else class="glyphicon glyphicon-user" aria-hidden="true"></span>
      </div>
      <vue-file-upload
      v-bind:multiple='false'
      v-bind:auto-upload='true'
      label="编辑"
      v-bind:url="uploadUrl()"
      v-bind:filters = "filters"
      v-bind:events = 'cbEvents'
      v-bind:request-options = "reqopts"
      >
      </vue-file-upload>
    </div>
    <div class="col-xs-9 form-horizontal">
      <div class="form-group">
        <label for="inputNick" class="text-right col-xs-4 control-label">昵称：</label>
        <div class="col-xs-8">
          <input v-model="user.nick" type="text" class="form-control" id="inputNick">
        </div>
      </div>

      <div class="form-group">
        <label for="inputGender" class="text-right col-xs-4 control-label">性别：</label>
        <div class="col-xs-8 inputGender" id="inputGender">
          <v-select
            :value.sync="user.gender"
            :options="planOptions"
            :close-on-select="true"
          >
          </v-select>
        </div>
      </div>

      <div class="form-group">
        <label for="inputMail" class="text-right col-xs-4 control-label">邮箱：</label>
        <div class="col-xs-8">
          <input v-model="user.mail" type="text" class="form-control" id="inputMail">
        </div>
      </div>

      <div class="form-group">
        <label for="inputWeixin" class="text-right col-xs-4 control-label">微信号：</label>
        <div class="col-xs-8">
          <input disabled placeholder="请联系客服绑定微信帐号" v-model="user.weixin" type="text" class="form-control" id="inputWeixin">
        </div>
      </div>

      <div class="form-group visibility-hidden">
        <label for="inputPhone" class="text-right col-xs-4 control-label">手机：</label>
        <div class="col-xs-8">
          <input v-model="user.phone" type="text" class="form-control" id="inputPhone">
        </div>
      </div>

      <div class="form-group visibility-hidden">
        <label for="inputName" class="text-right col-xs-4 control-label">姓名：</label>
        <div class="col-xs-8">
          <input v-model="user.name" type="text" class="form-control" id="inputName">
        </div>
      </div>

    </div>

    <center class="col-xs-12 btn-lg-group">
      <button class="btn btn-lg btn-password" @click="changePassword()">修改密码</button>
      <button class="btn btn-lg btn-primary" @click="submit()">保存</button>
    </center>
  </div>
</div>
</template>

<script>
import alert from './vuetrap/Alert'
import vSelect from './vuetrap/Select'
import vOption from './vuetrap/Option'
import VueFileUpload from 'vue-file-upload'
import {router} from '../main'

export default {
  name:"ProfileUser",
  components:{
    VueFileUpload,
    vSelect,
    vOption,
    alert
  },
  route: {
    data (transition) {
      let params = {
        scode:localStorage.getItem('id_token'),
        uid:localStorage.getItem('id_user')
      }
      this.$http[this.url?'post':'get'](this.url || '/static/fakeuser.json', params)
      .then( (res) => {
        let u = res.data.items
        // res.data.user.gender = [res.data.user.sex || 'm']
        this.user = {
          nick: u.uname || '',
          gender: [u.sex || '男'],
          avatar: u.face || false,
          mail: u.mail || '',
          weixin: u.weixin || '',
          phone: u.phone || ''
        }
        transition.next()
      }, (err) => {
        this.alertError = !!(this.error = '网站服务出现错误')
        transition.next()
      })
    }
  },
  data(){
    return{
      url:urlConf.profileUser.show,
      urlEdit:urlConf.profileUser.edit,
      alertError: false,
      alertSuccess: false,
      error:false,
      success:false,
      planOptions: [
        {value:'男', label:'男'},
        {value:'女', label:'女'}
      ],
      user:{
        nick:'',
        gender:['男'],
        weixin:'',
        mail:'',
        phone:'',
        avatar:false
      },
      //文件过滤器，只能上传图片
      filters:[
        {
          name:"imageFilter",
          fn(file){
              var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
              return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
          }
        }
      ],
      //回调函数绑定
      cbEvents:{
        onCompleteUpload:(file,res,status,header)=>{
          if(res.items.imgUrl)
          {
            this.user.avatar = res.items.imgUrl
          }
          else {
            this.alertError = !!(this.error = res.msg)
          }
        }
      },
      reqopts:{
        formData:{
          scode:localStorage.getItem('id_token'),
          uid:localStorage.getItem('id_user')
        },
        responseType:'json',
        withCredentials:false
      }
    }
  },
  methods:{
    uploadUrl (){
      return urlConf.uploadAvatar
    },
    onStatus (file){
      if(file.isSuccess){
        return "上传成功";
      }else if(file.isError){
        return this.alertError = !!(this.error = '上传失败')
      }
    },
    changePassword (){
      router.go({name:'changepassword'})
    },
    submit (){
      this.error = false
      this.success = false

      let user = {
        'uname': this.user.nick,
  			'sex': this.user.gender[0],
  			'mail': this.user.mail,
  			'weixin': this.user.weixin,
        'phone': this.user.phone,
        'uid': localStorage.getItem('id_user'),
        'scode':localStorage.getItem('id_token')
      }

      this.$http.post(this.urlEdit,user)
      .then( (res) => {
        if(res.data.code === 0 )
        {
          this.alertSuccess = !!(this.success = '个人信息修改已经保存')

        } else {
          this.alertError = !!(this.error = res.data.msg)
        }

      }, (err) => {
        this.alertError = !!(this.error = '网站服务出现错误')
      });
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .panel-wraper{
    margin:0px 150px;
    min-height: 620px;
    padding-top:80px;
    max-width:1150px
  }

  button,input,a,p,div,label,span{
    font-size: 20px;
    font-weight: 200;
  }
  input {
    height: 50px
  }
  .form-horizontal .form-group{
    height: 70px
  }
  .form-group .col-xs-4{
    padding-right:0;
  }
  .form-group .col-xs-8{
    padding-left:0;
  }
  .glyphicon{
    font-size:100px;
    line-height: 220px;
    color:gray
  }

  .btn-password
  {
    color:white;
    background:#ffb71c;
    margin-right:120px;
  }
</style>
