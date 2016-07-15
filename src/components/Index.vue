<template>
  <div class="appblanker-container index">
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">
            <img alt="Brand" src="/static/pic/indexlogo.gif">
          </a>
        </div>
        <span class="navbar-form navbar-right">
          <button type="button" class="btn btn-default navbar-btn" @click="btnLogin()">登录</button>
          <button type="button" class="btn btn-primary navbar-btn" @click="btnSignup()">注册</button>
        </span>
      </div>

    </nav>
    <div class="index-container">
      <carousel>
        <slider>
          <img src="/static/pic/indexbg1.jpg">
        </slider>
        <slider>
          <img src="/static/pic/indexbg2.jpg">
        </slider>
        <slider>
          <img src="/static/pic/indexbg3.jpg">
        </slider>
        <center>
          <button class="btn btn-lg btn-primary" @click="btnLeft()">广告主</button>
          <button class="btn btn-lg btn-primary" @click="btnRight()">自媒体</button>
        </center>
      </carousel>
    </div>
    <div class="footer">
      <footerhtml></footerhtml>
    </div>
    <table class="index-table hide">
      <tbody>
        <tr>
          <td>
            <button class="btn btn-lg btn-block" @click="btnLeft()">我是广告主</button>
          </td>
          <td>
            <button class="btn btn-lg btn-block" @click="btnRight()">我是自媒体</button>
          </td>
        </tr>
      </tbody>
    </table>


  </div>
</template>

<script>
import {router} from '../main'
import carousel from './vuetrap/Carousel'
import slider from './vuetrap/Slider'
import footerhtml from './footer'


export default {
  name:"panel",
  components:{
    alert,
    slider,
    carousel,
    footerhtml
  },
  route: {
    data (transition){
      document.getElementById('navbar').style.visibility = 'hidden'
      document.getElementById('panelbar').style.visibility = 'hidden'
      document.getElementById('app-footer').style.display = 'none'
      document.getElementById('app-wraper').style.minHeight = '0px'
      transition.next()
    },
    deactivate (transition){
      document.getElementById('navbar').style.visibility = 'visible'
      document.getElementById('panelbar').style.visibility = 'visible'
      document.getElementById('app-footer').style.display = 'block'
      document.getElementById('app-wraper').style.minHeight = '800px'
      transition.next()
    }
  },
  data () {
    return {

    }
  },
  methods: {
    btnLogin (){
      router.go({name:"login"})
    },
    btnSignup (){
      router.go({name:"signup"})
    },
    btnLeft (){
      router.go({name:"login"})
    },
    btnRight () {
      router.go({name:"wemedia"})
    }
  }
}
</script>

<style scoped>
div.appblanker-container{
  position: absolute;
  background-color: white;
  height:auto
}
.btn-block{
    background: transparent;
    height: 100%;
    font-size: 24px
}

.btn:hover,
.btn:focus,
.btn.focus {
  color: black;
  text-decoration: none;
}
</style>
