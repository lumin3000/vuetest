
<script>
import missionsNewtObject from './MissionsNew'
import {router} from '../main'
const API_URL = 'http://lexiang.7maker.cn/openapi/user/login'

export default {
  extends: missionsNewtObject,
  name:"missionsEdit",
  route: {
    data (transition) {
      let params = {
        scode:localStorage.getItem('id_token'),
        uid:localStorage.getItem('id_user'),
        tid:transition.to.params.missionId
      }
      this.$http.post(urlConf.missions.show,params)
      .then((res) => {
        console.log(res)
        this.items = ([res.data.items].map(function(o){
          return {
            id:o.t_id,
            title:o.t_name,
            price:o.t_price,
            status:o.t_status,
            beginTime:o.t_start_time,
            finishTime:o.t_end_time,
            strategy:o.t_type,
            amount:o.t_limit,
            remain:o.t_join_user,
            totalPrice:(o.t_price * o.t_limit),
            doc:atou(o.t_material),
            plan:['weinxin']
          }
        }))[0]

        transition.next()
      }, (err) => {
        console.log(err)
        this.alertError = !!(this.error = '网站服务出现错误')
        transition.next()
      })
    }
  },
  data () {
    return {
      url:urlConf.missions.edit,
      submitType:"保存并发布",
      planOptions: [
        {value:'weixin', label:'微信'},
        {value:'weibo', label:'微博'}
      ],
      disabled: [],
      format: ['MMM/dd/yyyy'],
      reset: true,
      alertError: false,
      alertSuccess:false,
      items: {
        id:false,
        beginTime: 'Oct/06/2015',
        finishTime: 'Oct/06/2016',
        title: '',
        description: '',
        price:100,
        amount:100,
        plan:['weinxin'],
        doc:''
      },
      error: '',
      success: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
