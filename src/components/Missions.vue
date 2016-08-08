<template>
  <div class="panel-wraper">
    <div class="arrow arrow-pos1">&nbsp;</div>
    <alert :show.sync="alertSuccess" :duration="3000" type="info" placement="top" width="350px" dismissable>
        <span class="icon-info-circled alert-icon-float-left"></span>
        <p>{{success}}</p>
    </alert>
    <alert :show.sync="alertError" :duration="3000" type="danger" placement="top" width="350px" dismissable>
        <span class="icon-info-circled alert-icon-float-left"></span>
        <p>{{error}}</p>
    </alert>

    <div class="panelr">
      <center>
        <a class="btn btn-primary btn-publish" v-link="{name:'missions-new'}">发布新任务</a>
        <a class="btn btn-primary btn-publish" v-link="{name:'missions2-new1'}">自定义任务</a>
      </center>
      <p v-if="items">我的任务：</p>
      <table class="table table-hover" v-if="items">
        <thead>
          <tr>
            <th>任务名称</th>
            <th>状态</th>
            <th>开始时间</th>
            <th>结束时间</th>
            <th>推广方式</th>
            <th class="text-right">单价</th>
            <th class="text-right">总数量</th>
            <th class="text-right">剩余数量</th>
            <th class="text-right">总金额</th>
            <th class="text-center">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items">
            <td>{{item.title}}</td>
            <td>{{item.status}}</td>
            <td>{{item.beginTime}}</td>
            <td>{{item.finishTime}}</td>
            <td>{{item.strategy}}</td>
            <td class="text-right">{{item.unitPrice}}</td>
            <td class="text-right">{{item.amount}}</td>
            <td class="text-right">{{item.remain}}</td>
            <td class="text-right">{{item.totalPrice}}</td>
              <td class="text-right">
                <button class="btn btn-primary" @click="show(item.t_type,item.id)" >编辑</button>
                <!-- <button class="btn btn-danger" @click="removeMissionConfirm(item.id)">删除</button> -->
              </td>
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
  name:"missions",
  components:{
    alert
  },
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
        this.items = []
        this.itemsStore = []
        let strategy = {
          '1':'微博',
          '2':'微信'
        }
        let items = res.data.items.reverse().map(function(o){
          return {
            t_type:o.t_type,
            id:o.t_id,
            title:o.t_name,
            unitPrice:o.t_price,
            status:((parseInt(o.t_status) === 0)?'未完成':'已完成'),
            beginTime:o.t_start_time,
            finishTime:o.t_end_time,
            strategy:strategy[o.t_type+''],
            amount:o.t_limit,
            remain:o.t_join_user,
            totalPrice:(o.t_price * o.t_limit)
          }
        })
        this.pagination(items)
        transition.next()
      }, (err) => {
        this.alertError = !!(this.error = '网站服务出现错误')
        transition.next()
      })
    }
  },
  data () {
    return {
      url:urlConf.missions.list,
      fakeUrl:'/static/fakemissions.json',
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
    show (t_type,t_id){
      if(t_type==='3'){
        this.routerGo({name:'missions2-edit',params:{missionId:t_id}})
      }else {
        this.routerGo({name:'missions-edit',params:{missionId:t_id}})
      }
    },
    routerGo (r) {
      router.go(r)
    },
    removeMissionConfirm (){

    },
    removeMission (){

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
 -->
