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
      <div class="form-horizontal">
        <div class="form-group">
          <label for="inputTitle" class="col-xs-2 control-label">任务名称：</label>
          <div class="col-xs-10">
            <input
            type="text"
            class="form-control"
            id="inputTitle"
            placeholder="请输入任务名称"
            v-model="items.title"
            >
          </div>
        </div>

        <div class="form-group">
          <label for="inputDescription" class="col-xs-2 control-label">任务描述：</label>
          <div class="col-xs-10">
            <textarea
            class="form-control"
            id="inputDescription"
            rows="3"
            placeholder="请输入任务描述"
            v-model="items.description"
            ></textarea>
          </div>
        </div>

        <div class="form-group">
          <label for="inputTitle" class="col-xs-2 control-label">开始时间：</label>
          <div class="col-xs-4">
            <datepicker
            :value.sync="items.beginTime"
            :disabled-days-of-Week="disabled"
            :format="format.toString()"
            :show-reset-button="reset"
            width="100%">
            </datepicker>
          </div>
        </div>
        <div class="form-group">
          <label for="inputTitle" class="col-xs-2 control-label">结束时间：</label>
          <div class="col-xs-4">
            <datepicker
            :value.sync="items.finishTime"
            :disabled-days-of-Week="disabled"
            :format="format.toString()"
            :show-reset-button="reset"
            width="100%">
            </datepicker>
          </div>
        </div>
        <div class="space30 col-xs-12">&nbsp;</div>
        <div class="form-group">
          <label for="inputTitle" class="col-xs-2 control-label">任务单价：</label>
          <div class="col-xs-4">
            <input
            type="text"
            class="form-control"
            id="inputPrice"
            placeholder="请输入任务单价"
            v-model="items.price"
            >
          </div>
        </div>
        <div class="form-group">
          <label for="inputTitle" class="col-xs-2 control-label">推广数量：</label>
          <div class="col-xs-4">
            <input
            type="text"
            class="form-control"
            id="inputAmount"
            placeholder="请输入推广数量"
            v-model="items.amount"
            >
          </div>
        </div>
        <div class="form-group">
          <label for="inputTitle" class="col-xs-2 control-label">任务总价：</label>
          <div class="col-xs-4">
            <input type="text" class="form-control" id="inputTitle" v-model="items.totalPrice">
          </div>
        </div>
        <div class="form-group">
          <label class="col-xs-2 control-label">推广方式：</label>
          <div class="col-xs-4">
            <v-select
              :value.sync="items.plan"
              :options="planOptions"
              :close-on-select="true"
            >
            </v-select>
          </div>
        </div>
        <div class="space0 col-xs-12">&nbsp;</div>
        <div class="form-group">
          <label class="col-xs-2 control-label">任务素材：</label>
          <div id="wysiwyg-container" class="col-xs-10">
            <pre id="docHtml" class="hide">{{{items.doc}}}</pre>
            <iframe id="editorFrame" src="/static/trumbowyg/index.html"></iframe>
          </div>
        </div>
        <center class="col-xs-10 col-xs-offset-2 publish-group">
          <button class="btn btn-lg" @click="preview()">预览素材</button>
          <button class="btn btn-lg" @click="submit()">{{submitType}}</button>
        </center>
      </div>
    </div>
  </div>
</template>

<script>
top.editorDocker = {}
editorDocker.initHtml = function(){
  let el = document.getElementById('docHtml')
  return (el.innerHTML+"")
}
editorDocker.fullscreen  = function (){
  let el = document.getElementById('editorFrame')
  el.style.position = 'fixed'
  el.style.height = "100%"
  el.style.zIndex = 9998
}

editorDocker.closeFullscreen  = function (){
  let el = document.getElementById('editorFrame')
  el.style.position = 'inherit'
  el.style.height = "270px"
  el.style.zIndex = 10
}

import auth from '../auth'
import alert from './vuetrap/Alert'
import datepicker from './vuetrap/Datepicker'
import vSelect from './vuetrap/Select'
import vOption from './vuetrap/Option'
import {router} from '../main'

export default {
  name:"missionsNew",
  components:{
    vSelect,
    vOption,
    alert,
    datepicker
  },
  route:{
    canActivate() {
      return auth.user.authenticated
    },
    deactivate (transition) {
      this.error = false
      if (this.submitSuccess === true){
        return transition.next()
      }
      if ( iframe.$('#trumbowyg').trumbowyg('html') != this.items.doc){
        this.alertError = !!(this.error = "新内容或已修改的内容还没发布，无法离开")
        transition.abort()
      } else {
        top.editorDocker.closeFullscreen()
        iframe.$('#trumbowyg').trumbowyg('destroy')
        transition.next()
      }
    }
  },
  data () {
    return {
      url:urlConf.missions.new,
      submitType:"发布",
      submitSuccess:false,
      planOptions: [
        {value:'weixin', label:'微信'},
        {value:'weibo', label:'微博'}
      ],
      disabled: [],
      format: ['MMM/dd/yyyy'],
      reset: true,
      alertSuccess: false,
      alertError: false,
      items: {
        id:false,
        beginTime: 'Oct/06/2015',
        finishTime: 'Oct/06/2016',
        title: '',
        description: '',
        price:100,
        amount:100,
        plan:['weinxin'],
        doc:''
      },
      error: '',
      success: ''
    }
  },

  methods: {
    preview (){
      var doc=1234
    },
    submit () {
      if(this.xhrLock === true)
      {
        console.log('双击')
        return false;
      }
      this.error = false
      this.success = false
      let items = {
        'task_name': this.items.title,
  			'task_desc': this.items.description,
  			'task_starttime': this.items.beginTime,
  			'task_endtime': this.items.finishTime,
  			'task_price': this.items.price,
  			'task_sharecount': this.items.amount,
  			'task_sharechannel': this.items.plan[0],
  			'task_media': utoa(iframe.$('#trumbowyg').trumbowyg('html')),
        'uid': localStorage.getItem('id_user'),
        'scode':localStorage.getItem('id_token')
      }
      if(this.items.id){
        items.task_id = this.items.id
      }
      // items.doc = iframe.$('#trumbowyg').trumbowyg('html')
      this.$http.post(this.url,items)
      .then( (res) => {
        if(res.data.msg === 'success' )
        {
          this.alertSuccess = !!(this.success = '发布成功')
          this.xhrLock = false
          this.submitSuccess = true
          setTimeout( function(){
            router.go({name:"missions"})
          }, 3500)
        } else {
          this.alertError = !!(this.error = res.data.msg)
          this.xhrLock = false
        }

      }, (err) => {
        console.log("missionsNew.submit().$http.post.error:"+err)
        this.alertError = !!(this.error = '网站服务出现错误')
        this.xhrLock = false
      });
    }
  }
}

</script>

<style scoped>
  .alert.top-right {
    z-index: 9999
  }
  iframe {
    height:270px;
  }
  div.panelr
  {
    padding:35px 80px 35px 0px;
  }
  .panelr .form-horizontal
  {
    text-align: left
  }
  .form-group{
    height:20px;
    margin:0px;
  }
  .panelr input, .panelr select {
    margin-bottom: 30px
  }
  .panelr textarea{
    margin-bottom:30px
  }
  .hr{
    clear:both;
    height:0px;
    line-height: 0px;
    font-size:0px;
  }
  .publish-group{
    padding-top:30px
  }

  .publish-group button{
    width:190px;
    font-weight: 200;
    color:white;
  }

  .publish-group button:nth-of-type(1){
    background-color: #37bd9c;
    margin-right:112px;
  }
  .publish-group button:nth-of-type(2) {
    background-color: #219cea;
  }
  .space30 {
    line-height: 30px
  }
  .space0{
    line-height: 0px;
    font-size: 0px;
  }
  .datepicker{
    width:100%;
  }
</style>
