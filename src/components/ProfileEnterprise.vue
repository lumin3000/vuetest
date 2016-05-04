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
    <li><a v-link="{name:'profileuser'}">个人信息</a></li>
    <li class="active"><a>企业信息</a></li>
    <li class="disabled"><a>&nbsp;</a></li>
  </ul>
  <div class="profile-wraper">
    <div class="col-xs-3 text-right">
      <div class="avatar">
        <img v-if="enterprise.avatar" :src="enterprise.avatar" >
        <span v-else class="glyphicon glyphicon-camera" aria-hidden="true"></span>
      </div>
      <vue-file-upload
      v-bind:multiple='false'
      v-bind:auto-upload='true'
      label="编辑执照照片"
      url="http://lexiang.7maker.cn/openapi/upload/upimg"
      v-bind:filters = "filters"
      v-bind:events = 'cbEvents'
      v-bind:request-options = "reqopts"
      >
      </vue-file-upload>
    </div>
    <div class="col-xs-9 form-horizontal">
      <div class="form-group">
        <label for="inputTitle" class="text-right col-xs-4 control-label">公司名称：</label>
        <div class="col-xs-8">
          <input v-model="enterprise.title" type="text" class="form-control" id="inputTitle">
        </div>
      </div>

      <div class="form-group">
        <label for="inputPhone" class="text-right col-xs-4 control-label">公司电话：</label>
        <div class="col-xs-8">
          <input v-model="enterprise.phone" type="text" class="form-control" id="inputPhone">
        </div>
      </div>

      <div class="form-group">
        <label for="inputAddress" class="text-right col-xs-4 control-label">公司地址：</label>
        <div class="col-xs-8 inputGender" >
          <input v-model="enterprise.address" type="text" class="form-control" id="inputAddress">
        </div>
      </div>

      <div class="form-group">
        <label for="inputDescription" class="text-right col-xs-4 control-label">公司简介：</label>
        <div class="col-xs-8">
          <input v-model="enterprise.description" type="text" class="form-control" id="inputDescription">
        </div>
      </div>

      <div class="form-group">
        <label for="inputLicense" class="text-right col-xs-4 control-label">营业执照号：</label>
        <div class="col-xs-8">
          <input v-model="enterprise.license" type="text" class="form-control" id="inputLicense">
        </div>
      </div>

      <div class="form-group">
        <label for="inputWebsite" class="text-right col-xs-4 control-label">官网链接：</label>
        <div class="col-xs-8">
          <input v-model="enterprise.website" type="text" class="form-control" id="inputWebsite">
        </div>
      </div>

    </div>

    <center class="col-xs-12 btn-lg-group">
      <button class="btn btn-lg btn-primary" @click="submit()">提交审核</button>
    </center>
  </div>
</div>
</template>

<script>
import alert from './vuetrap/Alert'
import VueFileUpload from 'vue-file-upload'

export default {
  name:"ProfileEnterprise",
  components:{
    VueFileUpload,
    alert
  },
  route: {
    data (transition) {
      let url = urlConf.profileEnterprise.show
      this.$http[url?'post':'get'](url || '/static/fakeEnterprise.json')
      .then( (res) => {
        this.enterprise = res.data.enterprise
        transition.next()
      }, (err) => {
        this.alertError = !!(this.error = '网站服务出现错误')
        transition.next()
      })
    }
  },
  data(){
    return{
      alertError: false,
      alertSuccess: false,
      enterprise:{
        title:'',
        phone:'',
        address:'',
        description:'',
        license:'',
        website:'',
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
          this.user.avatar = res.items
          console.log("finish upload;")
        }
      }
    }
  },
  methods:{
    onStatus (file){
      if(file.isSuccess){
        return "上传成功";
      }else if(file.isError){
        return "上传失败";
      }
    },
    changePassword (){

    },
    submit (){

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

</style>
