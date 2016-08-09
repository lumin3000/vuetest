<script>
export default {
  methods: {
    pagination (data){
      this.itemsStore = data
      let storeLength = this.itemsStore.length
      this.pageTotal = (storeLength > this.pageDefault) ? Math.ceil(storeLength / this.pageDefault) : 1
      this.pageCurrent = 0
      this.page(1)
    },
    navigation (){
      let p = this.pageTotal
      let i,limit = 10
      let c = this.pageCurrent
      if(c < limit){
        return (p<limit)?p:limit
      } else {
        i = (c < p-limit)?(c - parseInt(limit/2,10)):(p-limit)
        return Array.apply(null, {length: limit}).map(function(v, idx){return idx + i})
      }
    },
    nextPage (){
      this.page(this.pageCurrent+1)
    },
    prevPage (){
      this.page(this.pageCurrent-1)
    },
    page (pageNumber) {
      pageNumber = parseInt(pageNumber,10)
      if(isNaN(pageNumber) || pageNumber<1 || pageNumber>this.pageTotal || pageNumber==this.pageCurrent){
        return false
      }
      this.pageCurrent = pageNumber;
      this.items = this.itemsStore.slice((pageNumber-1)*this.pageDefault,pageNumber*this.pageDefault)

    }
  }
}
</script>
