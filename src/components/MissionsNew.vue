<template>
  <div class="panel-wraper">
    <alert
      :show.sync="alertError"
      :duration="3000"
      type="danger"
      width="350px"
      dismissable>
        <span class="icon-info-circled alert-icon-float-left"></span>
        <p>{{error}}</p>
    </alert>
    <div class="nav-userinfo">您好，tom，<a v-link="{name:'login'}">退出</a></div>
    <div class="panelr">
      <h1>编辑界面</h1>
      <div id="wysiwyg-container">
        <iframe src="/static/trumbowyg/index.html"></iframe>
      </div>
    </div>
  </div>
</template>
<script>
import auth from '../auth'
import alert from './vuetrap/Alert'

export default {
  components:{
    alert
  },
  route:{
    deactivate (transition) {
      this.error = false
      if ( iframe.$('#trumbowyg').trumbowyg('html') != ""){
        this.alertError = !!(this.error = "内容还没发布，无法离开")
        transition.abort()
      } else {
        iframe.$('#trumbowyg').trumbowyg('destroy')
        transition.next()
      }
    }
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
    }
  }
}

</script>

<style scoped>
</style>
