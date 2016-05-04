<script>
import tableObject from './Table'

export default {
  extends: tableObject,
  name:"Report",
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
