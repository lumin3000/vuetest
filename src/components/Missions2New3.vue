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

    <div class="panelr missions-new missions2-new3">
      <ol class="breadcrumb" v-if="editing===false">
        <li><a v-link="{name:'missions'}">任务管理</a></li>
        <li><a v-link="{name:'missions2-new1'}">媒体筛选</a></li>
        <li><a v-link="{name:'missions2-new2'}">我的订单</a></li>
        <li class="active">任务编辑</li>
      </ol>
      <center class="prev-step" v-if="vip===false && editing===false">
        <h4>尚未选择任何媒体，请先返回筛选媒体</h4><br><br><br><br>
        <button class="btn btn-lg btn-primary" v-link="{name:'missions2-new1'}">上一步</button>
      </center>
      <div v-else class="form-horizontal">

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
          <label class="col-xs-2 control-label hidden">任务总价：</label>
          <div class="col-xs-4 hidden">
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
          <label for="inputTitle" class="col-xs-2 control-label">任务链接：</label>
          <div class="col-xs-10">
            <input
            type="text"
            class="form-control"
            id="inputlink"
            placeholder="请输入链接地址"
            v-model="items.link"
            >
          </div>
        </div>
        <div class="form-group">
          <label for="inputTitle" class="col-xs-2 control-label">视频地址：</label>
          <div class="col-xs-10">
            <input
            type="text"
            class="form-control"
            id="inputVideo"
            placeholder="请输入视频地址"
            v-model="items.video"
            >
          </div>
        <div class="form-group">
          <label for="inputTitle" class="col-xs-2 control-label">添加文件：</label>
          <div class="col-xs-10">
            <vue-file-upload
            v-bind:multiple='false'
            v-bind:auto-upload='true'
            label="上传文件"
            v-bind:url="uploadFileUrl()"
            v-bind:events = 'docCbEvents'
            v-bind:request-options = "reqopts"
            >
          </vue-file-upload>
          <span class="fileurl" v-if="fileName">{{fileName}}</span>
          <span class="fileurl" v-else>支持 ＊.txt *.doc *.xls 格式文件</span>
          </div>
        </div>
        <div class="space30 col-xs-12">&nbsp;</div>
        <div class="form-group">
          <label for="inputTitle" class="col-xs-2 control-label">添加图片：</label>
          <div class="col-xs-10">
            <vue-file-upload
            v-bind:multiple='true'
            v-bind:auto-upload='true'
            label="上传图片"
            v-bind:url="uploadPicturesUrl()"
            v-bind:filters = "filters"
            v-bind:events = 'cbEvents'
            v-bind:request-options = "reqopts"
            >
            </vue-file-upload>
            <span class="fileurl">最多可传9张图片</span>
            <div class="images-uploaded" v-for="picture in pictures">
              <div>
                <button type="button" class="close" @click="removePicture(picture)">
                    <span>×</span>
                  </button>
                <img :src="picture">
              </div>
            </div>
          </div>
        </div>
        <div class="space30 col-xs-12">&nbsp;</div>

        </div>

        <center class="col-xs-10 col-xs-offset-2 publish-group">
          <button class="btn btn-lg" @click="submit()">{{submitType}}</button>
        </center>
      </div>

  </div>
</template>

<script>
import auth from '../auth'
import alert from './vuetrap/Alert'
import datepicker from './vuetrap/Datepicker'
import {router} from '../main'
import Validator from 'validator'
import VueFileUpload from 'vue-file-upload'
import missions2Helper from './Missions2Helper'

let zeroize = function(str){
  return ((str+'').length === 1)?('0' + str):(''+str)
}


export default {
  name:"missions2New3",
  mixins: [missions2Helper],
  components:{
    alert,
    datepicker,
    VueFileUpload,
  },
  route:{
    deactivate (transition) {
      this.error = false
      this.success = false
      transition.next()
    }
  },
  data () {
    return {
      url:urlConf.missions2.new,
      vipUrl:window.urlConf.vip,
      fakeUrl:'/static/fakewemedia.json',
      vip:false,
      vipSelected:false,
      editing:false,
      submitType:"发布",
      submitSuccess:false,
      format: ['yyyy-MM-dd'],
      alertSuccess: false,
      alertError: false,
      totalPrice:0,
      pictures:[],
      picturesLimite:9,
      items: {
        id:false,
        link:'',
        video:'',
        beginTime:false,
        finishTime: '2016-01-02',
        title: '',
        description: '',
        price:0,
        fileUrl:''
      },
      fileName:false,
      error: '',
      success: '',
      //回调函数绑定
      docCbEvents:{
        onCompleteUpload:(file,res,status,header)=>{

          if(res.msg==="success"){
            this.items.fileUrl = res.items.fileUrl
            let url = res.items.fileUrl
            url = url.split('/')
            this.fileName = url[url.length-1]
          } else{
            this.alertError = !!(this.error = res.msg)
          }
        }
      },
      //文件过滤器，只能上传图片
      filters:[
        {
          name:"imageFilter",
          fn(file){
              var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
              return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
          }
        }
      ],
      //回调函数绑定
      cbEvents:{
        onCompleteUpload:(file,res,status,header)=>{
          if(res.msg==="success"){
            if(this.pictures.length>=this.picturesLimite){
              this.pictures = this.pictures.slice(0,this.picturesLimite)
              return this.alertError = !!(this.error = `最多上传${this.picturesLimite}张图片`)
            } else {
              this.pictures.push(res.items.imgUrl)
            }
          }
          else {
            this.alertError = !!(this.error = res.msg)
          }
        }
      },
      reqopts:{
        formData:{
          scode:localStorage.getItem('id_token'),
          uid:localStorage.getItem('id_user')
        },
        responseType:'json',
        withCredentials:false
      }

    }
  },
  methods: {
    beforeTransition (transition) {
      this.table()
      this.initForm()
      return transition.next()
    },
    initForm (){
      let today = new Date()
      this.items = {
          id:false,
          beginTime: false,
          finishTime: `${today.getFullYear()}-${zeroize(today.getMonth()+2)}-${zeroize(today.getDate())}`,
          title: '',
          description: '',
          link:'',
          doc:'',
          fileUrl:''
      }
    },
    uploadFileUrl (){
      return urlConf.uploadFile
    },
    uploadPicturesUrl (){
      return urlConf.uploadPictures
    },
    removePicture (picture){
      let store = [].concat(this.pictures)
      let index = store.indexOf(picture)
      if (index > -1) {
        store.splice(index, 1)
      }
      this.pictures = [].concat(store)
    },
    restoreUi (){
      this.pictures = []
      this.fileName = false
      this.items.fileUrl = ''
    },
    submit () {
      if(this.xhrLock === true)
      {
        return false;
      }
      this.error = false
      this.success = false
      let task_meida_id = () => {
        let ids = []
        for(let item of this.vip){
          ids.push(`${item.seq}:${item._id}:${item.type}`)
        }
        return ids
      }
      let items = {
        'task_name': this.items.title,
  			'task_desc': this.items.description,
  			'task_endtime': this.items.finishTime,
        'task_link':(this.items.link || ''),
        'task_video':(this.items.video || ''),
        'task_file':(this.items.fileUrl || ''),
        'task_img':(this.pictures.join(',')),
        'uid': localStorage.getItem('id_user'),
        'scode':localStorage.getItem('id_token')
      }
      if(this.items.id){ /*new or editing*/
        items.tid = this.items.id
      }
      else {
        items.task_meida_id = task_meida_id().join(',')
      }

      this.$http.post(this.url,items)
      .then( (res) => {
        if(res.data.code === 0 ) {
          this.alertSuccess = !!(this.success = '发布成功')
          this.xhrLock = false
          this.submitSuccess = true
          window.localStoreArray.destory('vip_list')
          this.restoreUi()
          setTimeout( function(){router.go({name:"missions"})}, 3100)
        } else {
          this.alertError = !!(this.error = res.data.msg)
          this.xhrLock = false_id
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
span.fileupload-button{
  width: 160px!important;
  height:34px;
  line-height:30px!important;
  padding:2px!important;
  font-size:18px!important;
  margin:0px!important;
}
.fileurl{
  line-height:30px;
  padding-left:30px;
}
.images-uploaded{
  margin-top:40px
}
.images-uploaded img,.images-uploaded div{
  width:70px;
  height:70px;
  float:left;
  margin-top:-23px;

}
.images-uploaded div{
  background-color: gray;
  margin-right:10px
}

.images-uploaded .close,.images-uploaded .close:hover{
  background: #f9682e;
  z-index:200;
  opacity:1;
  position: relative;
  width:20px;
}
</style>
