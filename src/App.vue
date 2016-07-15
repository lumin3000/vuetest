<template>
  <center id="wraper" v-bind:style="wraperStyle">
    <nav class="navbar navbar-default" v-bind:class="ShowNavbar" id="navbar">
      <div class="navbar-header">
        <a v-link="{name:'panel'}">触享</a>
      </div>
      <div class="nav-userinfo">
        <span  v-if="true" @click="logout()" title="退出系统" class="glyphicon glyphicon-log-out"></span>
        <a v-else v-link="{name:'login'}">请先登录</a>
      </div>
    </nav>

    <div class="app-wraper" id="app-wraper">
      <div class="panelbar" id="panelbar">
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
    <div class="footer" id="app-footer" style="clear:both">
      <footerhtml></footerhtml>
    </div>
</center>
</template>

<script>
import auth from './auth'
import { router } from './main'
import footerhtml from './components/footer'

export default {
  components:{
    footerhtml
  },
  route: {
    data (transition) {
      transition.next()
  }},
  ready (){
    this.wraperStyle = {display:'block'}
  },
  data() {
    return {
      wraperStyle:{display:'none'},
      user: auth.user
    }
  },

  methods: {
    authed(){
      return localStorage.getItem('id_token') || false
    },
    logout() {
      auth.logout()
      router.go({name:"index"})
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

.visibility-hidden {
  visibility:hidden
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
.table-hover p {
  margin:2px 0px
}
.table-hover > tbody > tr:hover {
  background-color: #d9d9d9;
}

.table-hover > tfoot > tr > td {
  text-align: right
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
.nav-userinfo a,.nav-userinfo a:hover, .nav-userinfo span{
  color:white;
  cursor: pointer
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
  margin:auto 20px
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

.form-control[disabled],
.form-control[readonly],
fieldset[disabled] .form-control {
  background-color: #f3f4f6;
  opacity: 1;
}
.iframePreview iframe{
  width:100%;
  height:500px;
  border:0px;
}

.modal-content, .modal-header, .modal-footer{
  background-color:white;
}

div.iframePreview + div .btn-primary{
  display: none
}

.footer{
  font-size: 18px;
  font-weight: 100;
  background: #ff934e;
  line-height: 22px;
  color:white;
  text-align: center;
  clear:both;

}

.footer .qrcode{
  width:140px;
  float:right;
  margin-top:10.5px;
  line-height: 30px;
  height:70px;
}
.footer .qrcode img{
  width:50%
}


.footer h5 {
  font-size:20px
}

.footer .container-fluid{
  text-align: center;
  padding:5px 40px;
  padding-left:170px;
}

.index .navbar .container-fluid, .footer .container-fluid{
  max-width: 1000px;
  min-width: 900px
}

.index .navbar{
  margin-bottom: 0px!important;
  background:white;
  border-bottom: 1px solid #ff6600;
  overflow: hidden
}

.index .navbar-right button{
  -webkit-border-radius: 5px; /* Saf3+, Chrome */
  border-radius: 5px; /* Opera 10.5, IE 9 */
  min-width:82px;
  height: 32px;
  padding:0px;
  font-size:18px;
  font-weight: 200;
  border:1px solid #f9682e;
  margin-left:15px
}
.index .navbar-right .btn-default{
  color:#f9682e;
  background-color: white;

}
.index .navbar-right .btn-primary:hover,
.index .navbar-right .btn-primary:focus,
.index .navbar-right .btn-default:hover,
.index .navbar-right .btn-default:focus{
  color: white;
  background-color: #b15315;
  border-color: rgba(0, 0, 0, 0);
}

.index-container{
  margin: auto;
}

.index-container center{
  position:absolute;
  top:66%;
  width:100%;
  height:0px;
}
.index-container center button{
  width:220px;
  height:66px;
  -webkit-border-radius: 15px; /* Saf3+, Chrome */
  border-radius: 15px; /* Opera 10.5, IE 9 */
  border:2px solid #f9682e;
  font-size: 26px;
  font-weight: 100;
  margin:0px 13px;
  background: linear-gradient(#ffa35d, #ff6203);
}

.index-table{
  width:100%;
}
.index-table td{
  width:50%;
  text-align: center;
  height:180px;
  background-color: #ebebeb;
  border:4px solid white;
  background-repeat: no-repeat;
  background-position: right;
}

.index-table td:nth-of-type(1){
  background-image: url('/static/pic/indexbanner1.gif')
}

.index-table td:nth-of-type(2){
  background-image: url('/static/pic/indexbanner2.gif')
}


.vip_selector{
  width:900px;
  font-size:18px;
  height:340px;
}

.vip_selector .checkbox-group{
    width:650px
}

.vip_selector .col-xs-10 .btn{
  width:78px;
  margin-right:23px;
  margin-bottom: 20px;
  font-size: 18px;
  border:2px solid #FA692F;
  background-color: white;
  color:black;
}

.vip_selector .col-xs-2 .btn{
  border:2px solid #FA692F;
  background-color: white;
  color:black;
  font-size: 18px;
}

.vip_selector .labeler, .vip_selector .select-title{
  margin-top: 10px;
  text-align: right;
}

.vip_selector .btn-default[disabled]{
  border:2px solid gray;
  color:gray;
}
.vip_selector .btn-default:hover{
  color:black
}

.vip_selector .btn-default.active{
  background-color:#FA692F;
  color:white
}

.vip_selector .col-xs-12 {
  margin: 30px
}
.search-xs-12 .btn-lg, .next-step .btn-lg{
  width:180px;
  margin-bottom: 30px
}
.breadcrumb {
  background: transparent
}
.next-step{
  clear:both
}

.prev-step{
  margin:100px auto
}

.important{
  color:#fe7d3c;
  font-weight: 400
}

.missions-new
{
  padding:35px 80px 35px 0px;
}
.missions-new .form-horizontal
{
  text-align: left
}
.missions-new .form-group{
  height:20px;
  margin:0px;
}
.missions-new input, .missions-new select {
  margin-bottom: 30px
}
.missions-new textarea{
  margin-bottom:30px
}
.missions-new .hr{
  clear:both;
  height:0px;
  line-height: 0px;
  font-size:0px;
}
.missions-new .publish-group{
  padding-top:30px
}

.missions-new .publish-group button{
  width:190px;
  font-weight: 200;
  color:white;
}

.missions-new .publish-group button:nth-of-type(1){
  background-color: #37bd9c;
  margin-right:112px;
}
.missions-new .publish-group button:nth-of-type(2) {
  background-color: #219cea;
}
.missions-new .space30 {
  line-height: 30px
}
.missions-new .space0{
  line-height: 0px;
  font-size: 0px;
}
.missions-new .datepicker{
  width:100%;
}
.missions-new .times {
  padding:0px
}
.missions-new .times input {
  padding-right:0px
}
.missions-new .time2 {
  line-height: 40px;
  padding:0px;
  text-align: center
}

.missions-new .breadcrumb {
  padding-left:80px
}

table .avatar-frame{
  float:left;
  margin-right:18px;
}
.avatar-frame, .avatar-frame img, .avatar-frame span{
	width: 50px;
	height: 50px;
	-webkit-border-radius: 30px; /* Saf3+, Chrome */
	border-radius: 30px; /* Opera 10.5, IE 9 */
	/*-moz-border-radius: 30px;  Disabled for FF1+ */
}
.avatar-frame img, .avatar-frame span{
  border: 2px solid gray;
}
.avatar-frame span{
  font-size:30px;
  padding:8px;
  background: #d9d9d9;
  color:gray
}

@media (min-height: 600px) {
  .appblanker{
    margin-top:5%;
  }
}

@media (min-height: 768px) {
  .appblanker{
    margin-top:10%;
  }
}

@media (min-height: 1024px) {
  .appblanker{
    margin-top:15%;
  }
}

@media (min-height: 1200px) {
  .appblanker{
    margin-top:20%;
  }
}

.carousel-indicators li, .carousel-indicators .active {
  margin: 4px!important;
}


</style>
