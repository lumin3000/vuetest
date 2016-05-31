<script>
import tableObject from './Table'

export default {
  extends: tableObject,
  name:"Account",
  route: {
    data (transition) {
      let params = {
        scode:localStorage.getItem('id_token'),
        uid:localStorage.getItem('id_user')
      }
      this.$http[this.urlFortune?'post':'get']( this.urlFortune || this.fakeUrl, params)
      .then( (res) => {
        let balance = res.data.items.balance || 0
        this.extraInfo = this.extraInfo.replace('0,',balance)
      }, (err) =>{
        this.alertError = !!(this.error = err)
      })

      this.$http[this.urlIncome?'post':'get']( this.urlIncome || this.fakeUrl, params)
      .then( (res) => {
        console.log("urlIncome")
        console.log(res)
        if(!res.data.items){
          return transition.next()
        }
        this.pagination(res.data.items)
        transition.next()
      }, (err) => {
        this.alertError = !!(this.error = '网站服务出现错误')
        transition.next()
      })
      console.log('what????')
    }
  },
  data () {
    return {
      arrowPosition:'arrow-pos2',
      pageTitle:{name: '流水详情：', className: 'account-title' },
      extraInfo:'帐户余额 <span class=high-light>0,</span>（充值请联系客服，电话 010-888 8888）',
      thead:['收入','支出','来自','时间'],
      tbody:['income','expenses','from','time'],
      urlIncome:urlConf.account.income,
      urlFortune:urlConf.account.fortune,
      fakeUrl:'/static/fakeaccount.json'
    }
  }
}
</script>
