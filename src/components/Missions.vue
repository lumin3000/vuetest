<template>
  <div class="panel-wraper">
    <div class="nav-userinfo">您好，tom，<a v-link="{name:'login'}">退出</a></div>
    <div class="panelr">
      <center>
        <a class="btn btn-primary btn-publish" v-link="{name:'missionsnew'}">发布新任务</a>
      </center>
    </div>
  </div>
</template>
<script>
export default {
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

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
