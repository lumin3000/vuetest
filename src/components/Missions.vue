<template>
  <div class="panel-wraper">
    <div class="arrow arrow-pos1">&nbsp;</div>
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
      <center>
        <a class="btn btn-primary btn-publish" v-link="{name:'missions-new'}">发布新任务</a>
      </center>
      <p>我的任务：</p>

      <table class="table table-hover">
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
          <tr v-for="mission in missions">
            <td>{{mission.title}}</td>
            <td>{{mission.status}}</td>
            <td>{{mission.beginTime}}</td>
            <td>{{mission.finishTime}}</td>
            <td>{{mission.strategy}}</td>
            <td class="text-right">{{mission.unitPrice}}</td>
            <td class="text-right">{{mission.amount}}</td>
            <td class="text-right">{{mission.remain}}</td>
            <td class="text-right">{{mission.totalPrice}}</td>
            <td class="text-right">
              <button class="btn btn-primary" @click="routerGo({name:'missions-edit',params:{missionId:mission.id}})" >编辑</button>
              <button class="btn btn-danger" @click="removeMissionConfirm(mission.id)">删除</button>
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
        <li v-for="thePage in pageTotal" :class="((pageCurrent==thePage+1)?'active':'')">
          <a @click="page($index+1)">{{thePage+1}}</a>
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
/*
top.fakeMissions = []
for(let i=1;i<=100;i++)
{
  fakeMissions.push({
    id:parseInt(1000*Math.random())+10000,
    title:'任务'+i,
    status:(!!(i%3))?'进行中':"已完成",
    beginTime:"2016-04-12 12:20",
    finishTime:"2016-05-12 12:20",
    strategy:(!!(i%3))?'微博':"微信",
    unitPrice:parseInt(10*Math.random())+2,
    amount:parseInt(20*Math.random())+20,
    remain:parseInt(18*Math.random())+10,
    totalPrice:parseInt(200*Math.random())+50
  })
}
*/

import alert from './vuetrap/Alert'
import {router} from '../main'
export default {
  name:"missions",
  components:{
    alert
  },
  route: {
    data (transition) {
      this.$http.get('/static/fakemissions.json')
      .then( (res) => {
        this.missionsStore = res.data.missions
        this.pageTotal = this.pageBuilder(this.missionsStore.length,this.pageDefault)
        this.page(1)
        transition.next()
      }, (err) => {
        this.alertError = !!(this.error = '网站服务出现错误')
        transition.next()
      })
    }
  },
  data () {
    return {
      inputPageNumber:1,
      pageCurrent:0,
      pageDefault:10,
      pageTotal:1,
      missionsStore:'',
      missions: '',
      alertError: false,
      alertSuccess: false,
      error: '',
      success:''
    }
  },

  methods: {
    pageBuilder (storeLength,pageDefault){
      let pageTotal = 1
      if (storeLength > pageDefault)
      {
        pageTotal = parseInt(storeLength / pageDefault,10)
        if ( (storeLength % pageDefault) > 0)
        {
          pageTotal++
        }
      }
      return pageTotal
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
      this.missions = this.missionsStore.slice((pageNumber-1)*this.pageDefault,pageNumber*this.pageDefault)
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
