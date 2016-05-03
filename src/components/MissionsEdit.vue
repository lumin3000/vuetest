
<script>
import missionsNewtObject from './MissionsNew'
import {router} from '../main'
const API_URL = 'http://lexiang.7maker.cn/openapi/user/login'

export default {
  extends: missionsNewtObject,
  name:"missionsEdit",
  route: {
    data (transition) {

      this.$http.get(API_URL,transition.to.params.missionId)
      .then( (data) => {
        this.items = data
        console.log(this.items)
        transition.next()
      }, (err) => {
        console.log(err)
        this.alertError = !!(this.error = '网站服务出现错误')
        this.items = { /*fake data*/
          title: '123',
          description: '123',
          price:10,
          amount:10,
          plan:['Apple'],
          doc:'<a href="#">haha</a><a href="#">haha</a><br><a href="#">haha</a><a href="#">haha</a>'
        }
        transition.next()
      })
    }
  },
  data () {
    this.$http
    return {
      submitType:"保存并发布",
      planOptions: [
        {value:'Apple', label:'Apple'},
        {value:'Banana', label:'biubiubiu'},
        {value:'Cherry', label:'Cherry'},
        {value:'Orange', label:'Orange'},
        {value:'Grape', label:'Grape'},
      ],
      disabled: [],
      beginTime: 'Oct/06/2015',
      finishTime: 'Oct/06/2016',
      strategy:'',
      format: ['MMM/dd/yyyy'],
      reset: true,
      alertError: false,
      alertSuccess:false,
      items: {
        title: '',
        description: '',
        price:100,
        amount:100,
        plan:['Apple'],
        doc:''
      },
      error: '',
      success: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
