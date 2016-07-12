<script>
export default {
  route: {
    data (transition) {
      let params = {
        scode:localStorage.getItem('id_token'),
        uid:localStorage.getItem('id_user')
      }

      if(window.store && window.store.wemedia && window.store.wemedia.length>0)
      {
        //this.vip = window.store.wemedia.slice(0,this.vipLimit-1)
        return this.beforeTransition(transition)
      }
      this.$http[this.vipUrl?'post':'get']( this.vipUrl || this.fakeUrl, params)
      .then( (res) => {
        if(res.data.code!=0){
          this.alertError = !!(this.error = res.data.msg)
          return transition.next()
        }
        window.store.wemedia = [].concat(res.data.items)
        return this.beforeTransition(transition)
      }, (err) => {
        this.alertError = !!(this.error = '网站服务出现错误')
        transition.next()
      })
    }
  },
  methods: {
    table () {
      this.vipSelected = window.localStoreArray.get('vip_list') || []
      if(this.vipSelected.length>0)
      {
        this.vip = window.store.wemedia.filter( (o) => {
          return this.vipSelected.indexOf(o.seq)>=0
        })
        let totalPrice = 0
        for (let item of this.vip){
          totalPrice += parseInt(item.price,10)
        }
        this.totalPrice = totalPrice
      }
      else{
        this.vip = false
      }
    }
  }
}
</script>
