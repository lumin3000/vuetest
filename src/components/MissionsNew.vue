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
    <div class="panelr missions-new">
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
          <label for="inputPrice" class="col-xs-2 control-label">任务单价：</label>
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
          <label for="inputAmount" class="col-xs-2 control-label">推广数量：</label>
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
          <label class="col-xs-2 control-label">任务总价：</label>
          <div class="col-xs-4">
            <input type="text" class="form-control" v-model="totalPrice" disabled >
          </div>
        </div>
        <div class="form-group">
          <label for="inputFinishTime" class="col-xs-2 control-label">{{items.beginTime?'任务周期':'结束时间'}}：</label>
          <div class="col-xs-4">
            <div class="col-xs-5 times" :class="(items.beginTime?'':'hide')">
              <input class="form-control" disabled v-model="items.beginTime">
            </div>
            <div class="col-xs-1 time2" :class="(items.beginTime?'':'hide')"><span>至</span></div>
            <div class="times" :class="(items.beginTime?'col-xs-6':'')">
              <datepicker
              :value.sync="items.finishTime"
              :disabled-days-of-Week="disabled"
              :format="format.toString()"
              width="100%">
              </datepicker>
            </div>
          </div>
        </div>
        <div class="space0 col-xs-12">&nbsp;</div>
        <div class="form-group">
          <label for="inputLink" class="col-xs-2 control-label">任务链接：</label>
          <div class="col-xs-4">
            <input
            id="inputLink"
            type="text"
            class="form-control"
            placeholder="发布任务链接时将自动忽略任务素材"
            v-model="items.link"
            >
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
    <modal title="预览任务素材" :show.sync="largeModal" large>
      <div slot="modal-body" class="modal-body iframePreview" id="iframePreview">
      </div>
    </modal>
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
import modal from './vuetrap/Modal'
import {router} from '../main'
import Validator from 'validator'

let zeroize = function(str){
  return ((str+'').length === 1)?('0' + str):(''+str)
}


export default {
  name:"missionsNew",
  components:{
    vSelect,
    vOption,
    alert,
    datepicker,
    modal
  },
  route:{
    canActivate () {
      return auth.user.authenticated
    },
    data (transition){
      let today = new Date()
      this.items = {
          id:false,
          beginTime: false,
          finishTime: `${today.getFullYear()}-${zeroize(today.getMonth()+2)}-${zeroize(today.getDate())}`,
          title: '',
          description: '',
          price:1,
          amount:1,
          plan:['2'],
          link:'',
          doc:''
      }
      transition.next()
    },
    deactivate (transition) {
      this.error = false
      this.success = false
      top.editorDocker.closeFullscreen()
      iframe.$('#trumbowyg').trumbowyg('destroy')
      transition.next()
    }
  },
  data () {
    return {
      url:urlConf.missions.new,
      submitType:"发布",
      submitSuccess:false,
      planOptions: [
        {value:'2', label:'微信'},
        {value:'1', label:'微博'}
      ],
      disabled: [],
      largeModal: false,
      format: ['yyyy-MM-dd'],
      reset: true,
      alertSuccess: false,
      alertError: false,
      items: {
        id:false,
        link:'',
        beginTime: false,
        finishTime: '2016-01-02',
        title: '',
        description: '',
        price:0,
        amount:0,
        plan:['2'],
        doc:''
      },
      error: '',
      success: ''
    }
  },
  computed: {
    totalPrice () {
      return this.items.price * this.items.amount
    }
  },
  methods: {
    getTaskMedia (){
      let dom = iframe.$('#trumbowyg')
      return dom.trumbowyg('html') || dom.html()
    },
    prev (){
      console.log('hi')
    },
    preview (){
      let logFrameEvent = function (frame, eventName){
          console.log(
              "eventName"      , eventName,
              "frame.resolved" , frame.resolved,
              "document.body"  , frame.document && frame.document.body
          )
      }

      let listeners = {
          'onBeforeAppend'    : logFrameEvent,
          'onAfterAppend'     : logFrameEvent,
          'onBeforePopulate'  : logFrameEvent,
          'onAfterPopulate'   : logFrameEvent
      }

      let container = document.getElementById('iframePreview')
      container.innerHTML = ''
      let html      = `<html><head><meta charset=utf-8></head><body>${this.getTaskMedia()}</body></html>`
      iframer(container, html, listeners)
      this.largeModal = true
    },
    submit () {
      if(this.xhrLock === true)
      {
        return false;
      }
      this.error = false
      this.success = false

      let items = {
        'task_name': this.items.title,
  			'task_desc': this.items.description,
  			'task_endtime': this.items.finishTime,
  			'task_price': this.items.price,
  			'task_sharecount': this.items.amount,
  			'task_sharechannel': this.items.plan[0],
  			'task_media': ((this.items.link)?'':this.getTaskMedia()),
        'task_share_link':(this.items.link || ''),
        'uid': localStorage.getItem('id_user'),
        'scode':localStorage.getItem('id_token')
      }
      if(this.items.id){
        items.tid = this.items.id
      }
      // items.doc = iframe.$('#trumbowyg').trumbowyg('html')
      this.$http.post(this.url,items)
      .then( (res) => {
        if(res.data.code === 0 )
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
</style>
