<script>
import tableObject from './Table'

export default {
  extends: tableObject,
  name:"Report",
  route: {
    data (transition) {
      let params = {
        scode:localStorage.getItem('id_token'),
        uid:localStorage.getItem('id_user')
      }
      this.$http[this.url?'post':'get']( this.url || this.fakeUrl, params)
      .then( (res) => {
        if(!res.data.items){
          return transition.next()
        }
        this.pagination(res.data.items)
        transition.next()
      }, (err) => {
        this.alertError = !!(this.error = '网站服务出现错误')
        transition.next()
      })
    }
  },
  data () {
    return {
      arrowPosition: 'arrow-pos4',
      pageTitle:{name: '数据报表', className: 'report-title' },
      thead: ['时间','投放任务数','任务转发量','投放金额','任务完成度'],
      tbody: ['time','missions','repost','account','finished'],
      url: urlConf.report,
      fakeUrl: '/static/fakereport.json'
    }
  }
}
</script>
