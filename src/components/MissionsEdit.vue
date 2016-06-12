
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
        this.items = ([res.data.items].map(function(o){
          return {
            id:o.t_id,
            title:o.t_name,
            description:o.t_desc,
            price:o.t_price,
            status:o.t_status,
            beginTime:o.t_release_time.split(' ')[0],
            finishTime:o.t_end_time,
            amount:o.t_limit,
            link:o.t_share_link,
            remain:o.t_join_user,
            doc:o.t_material,
            plan:[(o.t_type+'')]
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
        {value:'2', label:'微信'},
        {value:'1', label:'微博'}
      ],
      disabled: [],
      format: ['yyyy-MM-dd'],
      reset: true,
      alertError: false,
      alertSuccess:false,
      items: {
        id:false,
        beginTime:'2016-01-01',
        finishTime: '2016-01-01',
        title: '',
        description: '',
        price:1,
        amount:1,
        plan:['2'],
        link:'',
        doc:''
      },
      error: '',
      success: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
