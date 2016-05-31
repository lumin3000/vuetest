<template>
  <div class="panel-wraper">
    <div class="hello">
      <h1>这里是登录后的首页{{ msg }}</h1>
    </div>
  </div>
</template>

<script>
import alert from './vuetrap/Alert'
import auth from '../auth'
import {router} from '../main'

export default {
  name:"panel",
  components:{
    alert
  },
  route: {
    data (transition) {
      if(auth.user.authenticated){
        router.go({name:"missions"})
        // transition.next()
      }else {
        router.go({name:"index"})
      }
    }
  },
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>
