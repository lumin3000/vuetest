<template>
  <div class="appblanker-container">
    <div class="index-container">
      <carousel>
        <slider>
          <img src="/static/pic/index1.jpg">
        </slider>
        <slider>
          <img src="http://placehold.it/1920x780?text=two">
        </slider>
        <slider>
          <img src="http://placehold.it/1920x780?text=three">
        </slider>
      </carousel>
    </div>
    <table class="index-table">
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
    <div class="footer">
      <p>2016 copyright</p>
    </div>
  </div>
</template>

<script>
import {router} from '../main'
import carousel from './vuetrap/Carousel'
import slider from './vuetrap/Slider'


export default {
  name:"panel",
  components:{
    alert,
    slider,
    carousel
  },
  data () {
    return {

    }
  },
  methods: {
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

.footer{
  height:50%
}
</style>
