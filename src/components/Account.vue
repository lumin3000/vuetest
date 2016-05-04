<script>
import tableObject from './Table'

export default {
  extends: tableObject,
  name:"Account",
  route: {
    data (transition) {
      let url = urlConf.missions.list
      let params = {
        scode:localStorage.getItem('id_token'),
        uid:localStorage.getItem('id_user')
      }
      this.$http[url?'post':'get']( url || this.fakeUrl, params)
      .then( (res) => {
        if(!res.data.items){
          return transition.next()
        }
        this.extraInfo = this.extraInfo.replace('0元',100)
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
      arrowPosition:'arrow-pos2',
      pageTitle:{name: '流水详情：', className: 'account-title' },
      extraInfo:'帐户余额 <span class=high-light>0元</span>（充值请联系客服，电话 010-888 8888）',
      thead:['账户变动','入账','出账','相关信息','时间'],
      tbody:['type','in','out','info','time'],
      url:urlConf.missions.list,
      fakeUrl:'/static/fakeaccount.json'
    }
  }
}
</script>
