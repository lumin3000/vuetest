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

      <ol class="breadcrumb">
        <li><a v-link="{name:'missions'}">任务管理</a></li>
        <li><a v-link="{name:'missions2-new1'}">媒体筛选</a></li>
        <li class="active">我的订单</li>
      </ol>
      <center class="prev-step" v-if="vip===false">
        <h4>尚未选择任何媒体，请先返回筛选媒体</h4><br><br><br><br>
        <button class="btn btn-lg btn-primary" v-link="{name:'missions2-new1'}">上一步</button>
      </center>
      <table class="table table-hover" v-if="vip">
        <thead>
          <tr>
            <th>个人信息</th>
            <th>推广方式</th>
            <th>单价（金币）</th>
            <th>热度</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in vip">
            <td>
              <div class="avatar-frame">
                <img v-if="item.avatar!=''" :src="item.avatar" >
                <span v-else class="glyphicon glyphicon-user" aria-hidden="true"></span>
              </div>
              <p>{{item.name}}</p>
              <p>粉丝{{item.fans}}</p>
            </td>
            <td>{{item.type}}</td>
            <td>{{item.price}}</td>
            <td>{{item.temp}}</td>
            <td>
              <button class="btn btn-primary" @click="remove(item.seq)">删除</button>
            </td>
          </tr>
          <tfoot>
            <tr>
              <td colspan="5" class="" >
                已选择<span class="important">{{vip.length}}</span>位自媒体用户
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                总价：<span class="important">{{totalPrice}}</span>&nbsp;&nbsp;&nbsp;
              </td>
            </tr>
          </tfoot>
        </tbody>
      </table>
      <center class="next-step" v-if="vipSelected.length>=1">
        <button class="btn btn-lg btn-primary" v-link="{name:'missions2-new3'}">下一步</button>
      </center>
    </div>
  </div>
</template>

<script>
import alert from './vuetrap/Alert'
import {router} from '../main'
import missions2Helper from './Missions2Helper'

export default {
  name:"missions2new2",
  mixins: [missions2Helper],
  components:{
    alert
  },
  data () {
    return {
      vipUrl:window.urlConf.vip,
      fakeUrl:'/static/fakewemedia.json',
      vip:false,
      vipSelected:[],
      alertError: false,
      alertSuccess: false,
      totalPrice:0,
      error: '',
      success:''
    }
  },
  methods:{
    beforeTransition (transition) {
      this.table()
      return transition.next()
    },
    remove (vipId){
      window.localStoreArray.remove('vip_list',vipId)
      return this.table()
    }
  }
}

</script>
