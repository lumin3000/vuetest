<template>
  <center id="wraper">
    <nav class="navbar navbar-default" v-bind:class="ShowNavbar">
      <div class="navbar-header">
        <a v-link="{name:'panel'}">管理系统</a>
      </div>
    </nav>
    <div class="app-wraper">
      <div class="panelbar">
        <div class="container">
          <a v-link="{name:'missions'}" class="menu">&nbsp;</a>
          <a v-link="{name:'account'}" class="menu">&nbsp;</a>
          <a v-link="{name:'profileuser'}" class="menu">&nbsp;</a>
          <a v-link="{name:'report'}" class="menu">&nbsp;</a>
        </div>
      </div>
      <div class="views">
        <router-view
          class="view"
          keep-alive
          transition
          transition-mode="out-in">
        </router-view>
      </div>
    </div>
</center>
</template>

<script>
import auth from './auth'

export default {
  data() {
    return {
      user: auth.user
    }
  },

  methods: {

    logout() {
      auth.logout()
    }
  }
}
</script>


<style>
body {
  background-color: white;
}

.navbar {
  background: #ff7b30;
  margin-bottom: -21px!important;
  height:80px;
  line-height:80px;
  font-size: 24px;
  color:white;
  padding-left:38px;
}

.navbar *, .navbar a:hover{
  color:white;
  text-decoration: none;
  font-weight:100;
}


a.without-underline:hover {
  text-decoration: none!important;
}

.arrow {
	position:absolute;
	background: #e8e8e8;
  left:180px;
  top:-100px;
}
.arrow:after {
	right: 100%;
	top: 50%;
	border: solid transparent;
	content: " ";
	height: 0;
	width: 0;
	position: absolute;
	pointer-events: none;
	border-color: rgba(136, 183, 213, 0);
	border-right-color: #e8e8e8;
	border-width: 15px;
	margin-top: -15px;
}

.arrow-pos1{
  top:100px;
}
.arrow-pos2{
  top:230px;
}
.arrow-pos3{
  top:360px;
}
.arrow-pos4{
  top:490px;
}
#wraper {
  display:block;
  min-width: 1180px;
}

.app-wraper{
  background-color: #e8e8e8;
  background-image: url('./assets/panelbar.gif');
  width:100%;
  min-height:800px;
  clear:both;
}
.views{
  padding:0!important;
  margin:0 0 0 180px!important;
}

.panel-wraper {
  text-align:left;
}
.panelbar {
  padding:0!important;
  margin:0!important;
  text-align: left;
  width:180px;
  float:left;
}
.panelbar .container{
  width:180px;
  background-color: #919293;
  padding:0!important;
  margin:0!important;
}
.panelbar .menu{
  text-decoration: none;
  display: block;
  width:180px;
  height:130px;
  padding:0!important;
  margin:0!important;
  cursor: pointer;
}

.panelbar .menu:nth-of-type(1){
  background-image: url('./assets/bar1.gif');
}

.panelbar .menu:nth-of-type(2){
  background-image: url('./assets/bar2.gif');
}

.panelbar .menu:nth-of-type(3){
  background-image: url('./assets/bar3.gif');
}

.panelbar .menu:nth-of-type(4){
  background-image: url('./assets/bar4.gif');
}

.appblanker-container{
  background-color:#fa4d27;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  overflow: hidden;
  position: fixed;
}

.appblanker-container div.alert, .panelr div.alert {
  position: relative;
  top:-510px;
}

.appblanker{
  margin-top:145px;
  background: white;
  padding:50px;
  width:756px;
  height:520px;
}

.appblanker h3{
  margin-bottom:25px
}
.appblanker .form-group input[type=text],
.appblanker .form-group input[type=password],
.appblanker button{
  width:350px;
  height:50px;
  font-size:20px;
  margin-bottom:25px;
}
.appblanker .form-title{
  text-align: left;
  width:350px;
  line-height:48px;
  font-size:20px;
  margin-bottom:30px;
}

.appblanker .form-title input {
  margin-left:25px
}

.appblanker .btn-below {
  margin-top:-15px;
}
.appblanker .btn-below, .appblanker .btn-below *{
  color: #cccccc
}

.appblanker .short-input {
  width:350px;
}
.appblanker div.short-input input{
  width:200px!important;
  margin-right:15px;
}

.appblanker div.short-input button{
  width:135px!important;
}

.nav-userinfo{
  text-align: right;
  font-weight:100;
  position: absolute;
  top:0px;
  line-height:80px;
  color:white;
  padding-right:38px;
  right:0px
}
.nav-userinfo a,.nav-userinfo a:hover{
  color:white;
}

#wysiwyg-container iframe {
  width: 680px;
  height:500px;
  float:left;
  border:1px solid red;
}
.panelr{
  padding:35px 55px;
}

.panelr .btn-publish {
  font-size:26px;
  font-weight: 200;
  line-height: 52px;
  padding:8px 45px!important;
}

</style>
