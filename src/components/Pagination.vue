<script>
export default {
  methods: {
    pagination (data){
      this.itemsStore = data
      let storeLength = this.itemsStore.length
      let pageDefault = this.pageDefault
      let pageTotal = 1
      if (storeLength > pageDefault)
      {
        pageTotal = parseInt(storeLength / pageDefault,10)
        if ( (storeLength % pageDefault) > 0)
        {
          pageTotal++
        }
      }
      this.pageTotal = pageTotal
      this.page(1)
    },
    nextPage (){
      this.page(this.pageCurrent+1)
    },
    prevPage (){
      this.page(this.pageCurrent-1)
    },
    page (pageNumber) {
      pageNumber = parseInt(pageNumber,10)
      if(isNaN(pageNumber) || pageNumber<1 || pageNumber>this.pageTotal || pageNumber==this.pageCurrent)
      {
        return false
      }
      this.pageCurrent = pageNumber;
      this.items = this.itemsStore.slice((pageNumber-1)*this.pageDefault,pageNumber*this.pageDefault)
    }
  }
}
</script>
