<template>
  <div class="panel-wraper">
    <div class="arrow" :class="arrowPosition">&nbsp;</div>
    <alert
      :show.sync="alertSuccess"
      :duration="3000"
      type="info"
      placement="top"
      width="350px"
      dismissable>
        <span class="icon-info-circled alert-icon-float-left"></span>
        <p>{{success}}</p>
    </alert>
    <alert
      :show.sync="alertError"
      :duration="3000"
      type="danger"
      placement="top"
      width="350px"
      dismissable>
        <span class="icon-info-circled alert-icon-float-left"></span>
        <p>{{error}}</p>
    </alert>

    <div class="panelr">
      <div class="title" :class="pageTitle.className">
        <div v-if="extraInfo">
          {{{extraInfo}}}
        </div>
        <div :class="(items && items.length>0)?'show':'hide'">{{{pageTitle.name}}}</div>
      </div>

      <table class="table table-hover" v-if="items && items.length && items.length>0">
        <thead>
          <tr>
            <th v-for="item in thead">{{item}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items">
            <td v-for="key in tbody">{{{item[key]}}}</td>
          </tr>
        </tbody>
      </table>

      <ul class="pagination" v-if="pageTotal>1" >
        <li :class="(pageCurrent == 1)?'disabled':''">
          <a @click="page(1)" aria-label="Previous">
            <span aria-hidden="true">首页</span>
          </a>
        </li>
        <li :class="(pageCurrent == 1)?'disabled':''">
          <a @click="prevPage()" aria-label="Previous">
            <span aria-hidden="true">上一页</span>
          </a>
        </li>
        <li v-for="thePage in navigation()" :class="((pageCurrent==thePage+1)?'active':'')">
          <a @click="page(thePage+1)">{{thePage+1}}</a>
        </li>
        <li :class="(pageCurrent == pageTotal)?'disabled':''">
          <a @click="nextPage()" aria-label="Next" >
            <span aria-hidden="true">下一页</span>
          </a>
        </li>
        <li :class="(pageCurrent == pageTotal)?'disabled':''">
          <a @click="page(pageTotal)" aria-label="Next" >
            <span aria-hidden="true">尾页</span>
          </a>
        </li>
      </ul>
      <ul class="pagination pagination-bar pull-right" v-if="pageTotal>1">
        <li>
          <span>
            当前第{{pageCurrent}}页/共{{pageTotal}}页&nbsp;转到
            <input v-model="inputPageNumber" type="text" @keyup.enter="page(inputPageNumber)">页
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import alert from './vuetrap/Alert'
import {router} from '../main'
import pageObject from './Pagination'

export default {
  mixins: [pageObject],
  components:{
    alert
  },
  data () {
    return {
      arrowPosition:'',
      pageTitle:false,
      extraInfo:false,
      thead:[''],
      tbody:[''],
      url:false,
      fakeUrl:'',
      inputPageNumber:1,
      pageCurrent:0,
      pageDefault:10,
      pageTotal:1,
      itemsStore:'',
      items: false,
      alertError: false,
      alertSuccess: false,
      error: '',
      success:''
    }
  },
  methods: {

  }
}
</script>
