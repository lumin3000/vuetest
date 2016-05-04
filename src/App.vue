<template>
  <center id="wraper">
    <nav class="navbar navbar-default" v-bind:class="ShowNavbar">
      <div class="navbar-header">
        <a v-link="{name:'panel'}">管理系统</a>
      </div>
      <div class="nav-userinfo">您好，tom，<a v-link="{name:'login'}">退出</a></div>
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

    <div class="footer">
      <p>版权信息 和 备案号</p>
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
::-ms-clear { width : 0; height: 0; }
::-ms-reveal { width : 0; height: 0; }
body {
  background-color: white;
}

.footer{
  line-height:120px;
  color:#c0c0c0;
  font-size: 18px;
  font-weight: 100;
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

.nav-tabs > li.disabled > a:hover {
  border-color: transparent;
  cursor:auto
}
.nav-tabs > li > a:hover {
  border-color: #d9d9d9 #d9d9d9 transparent;
  cursor:pointer;
}
.nav-tabs > li.active > a,
.nav-tabs > li.active > a:hover,
.nav-tabs > li.active > a:focus {
  color: white;
  border: 1px solid #e9573e;
  background-color: #e9573e;
}
.nav-tabs.nav-justified > .active > a,
.nav-tabs.nav-justified > .active > a:hover,
.nav-tabs.nav-justified > .active > a:focus {
  border: 1px solid #e9573e;
  cursor:auto;
}

.nav-tabs.nav-justified > li > a {
  border-bottom: 1px solid #e9573e!important;
  font-size: 26px;
  line-height: 60px;
  font-weight: 300;
}

.nav > li > a:hover,
.nav > li > a:focus {
  background-color: #d9d9d9;
}

.nav-justified {
  height:110px;
}


table, .table{
  font-size:18px;
  background-color:white;
  border: 2px solid white;
}
table, .table *{
  font-weight:200;
}
.table thead{
  background-color:#d9d9d9;
}

.pagination > li > a, .pagination > li > span{
  background-color:white;
  cursor:pointer;
}

.pagination > li > a:hover,
.pagination > li > span:hover,
.pagination > li > a:focus,
.pagination > li > span:focus {
  z-index: 2;
  background-color: #d9d9d9;
  border-color: transparent;
}

.pagination > .disabled > span,
.pagination > .disabled > span:hover,
.pagination > .disabled > span:focus,
.pagination > .disabled > a,
.pagination > .disabled > a:hover,
.pagination > .disabled > a:focus{
  background-color:white;
  color:#d9d9d9;
}

.pagination-bar * {
 cursor: auto!important;
}
.pagination-bar>li>span:hover{
 background-color: white
}
.pagination-bar input{
 width:32px;
}

.table-hover > tbody > tr:hover {
  background-color: #d9d9d9;
}

.avatar{
  width: 220px;
  height:220px;
  padding:0;
  margin:0;
  background-color: #d9d9d9;
  text-align: center;
}
.avatar img{
  width:220px;
  height: 220px;
}
span.fileupload-button{
  width: 220px!important;
  line-height: 48px!important;
  background-color: #f9682e!important;
  border-color:#f9682e!important;
  font-size: 20px!important;
  font-weight: 200!important;
  margin-top:12px!important;
  z-index:1!important
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
  max-width:1440px;
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
  right:0px;
  font-size:18px
}
.nav-userinfo a,.nav-userinfo a:hover{
  color:white;
}

#wysiwyg-container iframe {
  width: 100%;
  float:left;
  border:1px solid #d4d5d6;
  left:0px;
  top:0px;
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

.form-group label {
  font-size: 16px;
  font-weight: 200;
}

ul.dropdown-menu{
  background-color: #f3f4f6;
  color:#818384;

}
ul.dropdown-menu > li > a{
  font-size:16px;
}

ul.dropdown-menu > li > a:hover,
ul.dropdown-menu > li > a:focus {
  text-decoration: none;
  color: #f3f4f6;
  background-color: #818384;
}

.isFullscreen {
  position:fixed;
  height:100%;
  z-index:9998;
}

.btn-lg-group{
  margin-top:10px
}
.btn-lg-group .btn-lg
{
  width:190px
}

.profile-wraper{
  width:750px;
  margin:auto
}

div.inputGender button
{
  height: 50px;
  width:  100px;
}
div.inputGender *{
  font-size: 20px;
  font-weight: 200;
}

.high-light {
  color:#fe7d3c!important
}

.account-title {
  font-size: 18px;
  line-height:60px;
  font-weight: 200;
}

.report-title {
  font-size: 18px;
  line-height:60px;
  font-weight: 200;
  text-align: center;
  margin-bottom:60px;
}

</style>
