
<script>
import missionsNewtObject from './Missions2New3'
import {router} from '../main'

export default {
  extends: missionsNewtObject,
  name:"missions2Edit",
  route: {
    data (transition) {

      let params = {
        scode:localStorage.getItem('id_token'),
        uid:localStorage.getItem('id_user'),
        tid:transition.to.params.missionId
      }
      this.$http.post(urlConf.missions2.show,params)
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
            link:(o.task_link || ''),
            video:(o.task_video || ''),
            fileUrl:(o.task_file || '')
          }
        }))[0]
        this.pictures = (res.data.items.task_img === '')?[]:res.data.items.task_img.split(',')
        let url = this.items.fileUrl
        url = url.split('/')
        this.fileName = url[url.length-1]
        transition.next()
      }, (err) => {
        this.alertError = !!(this.error = '网站服务出现错误')
        transition.next()
      })
    }
  },
  data () {
    return {
      url:urlConf.missions2.edit,
      vipUrl:window.urlConf.vip,
      fakeUrl:'/static/fakewemedia.json',
      vip:false,
      vipSelected:false,
      editing:true,
      submitType:"保存并发布",
      format: ['yyyy-MM-dd'],
      alertError: false,
      alertSuccess:false,
      items: {
        id:false,
        finishTime: '2016-01-01',
        title: '',
        description: '',
        link:'',
        doc:''
      },
      error: '',
      success: ''
    }
  }
}
</script>
