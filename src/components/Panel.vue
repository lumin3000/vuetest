<template>
  <div class="panel-wraper">
    <div class="nav-userinfo">您好，tom，<a v-link="{name:'login'}">退出</a></div>
    <div class="hello">
      <h1>这里是登录后的首页{{ msg }}</h1>
    </div>
  </div>
</template>

<script lang="coffee">
Object.defineProperty exports, '__esModule', value: true
exports.default = data: ->
  { msg: 'Hello World!' }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .panel-arrow{
    top:100px;
    left:180px;
  }
</style>
