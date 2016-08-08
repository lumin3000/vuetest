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
        <li class="active">媒体筛选</li>
      </ol>
      <div class="vip_selector">
        <div class="col-xs-2 labeler">推广方式：</div>
        <div class="col-xs-10">
          <checkbox-group :value.sync="typeValue">
            <checkbox v-for="type in types" v-bind:value=type >{{type}}</checkbox>
          </checkbox-group>
          <button class="btn btn-default" disabled>美拍</button>
          <button class="btn btn-default" disabled>秒拍</button>
        </div>
        <div class="col-xs-2 labeler">兴趣爱好：</div>
        <div class="col-xs-10 checkbox-group">
          <checkbox-group :value.sync="interestsValue">
            <checkbox v-for="i in interests" v-bind:value=i>{{i}}</checkbox>
          </checkbox-group>
        </div>
        <div class="col-xs-2 select-title">城市：</div>
        <div class="col-xs-2 select">
          <v-select :value.sync="defaultCity" :options="cityOptions" :close-on-select="true"></v-select>
        </div>
        <div class="col-xs-2 select-title">年龄：</div>
        <div class="col-xs-2 select">
          <v-select :value.sync="defaultAge" :options="ageOptions" :close-on-select="true"></v-select>
        </div>
        <div class="col-xs-2 select-title">价格：</div>
        <div class="col-xs-2 select">
          <v-select :value.sync="defaultPrice" :options="priceOptions" :close-on-select="true"></v-select>
        </div>

      </div>

      <center class="search-xs-12">
        <button class="btn btn-lg btn-primary" @click="find(true)">查找媒体</button>
      </center>

      <table class="table table-hover" v-if="(items && items.push && items.length>0)">
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
          <tr v-for="item in items">
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
              <button
                :class="['btn', (vipSelected.indexOf(item.seq)>=0)?'btn-default':'btn-primary']"
                @click="shoot(item.seq, $event)"
              >
                加入任务
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <center v-if="(items && items.push && items.length===0 && this.found)">
        <h4>没有检索到匹配的媒体信息。<br><br><br><br></h4>
      </center>
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

      <center class="next-step" v-if="vipSelected.length>=1">
        <button class="btn btn-lg btn-primary" @click="routerGo({name:'missions2-new2'})">下一步</button>
      </center>
    </div>
  </div>
</template>

<script>
import alert from './vuetrap/Alert'
import vSelect from './vuetrap/Select'
import vOption from './vuetrap/Option'
import {router} from '../main'
import pageObject from './Pagination'
import missions2Helper from './Missions2Helper'
import checkboxGroup from './vuetrap/checkboxGroup.vue'
import checkbox from './vuetrap/checkboxBtn.vue'

export default {
  mixins: [pageObject,missions2Helper],
  name:"missions2new1",
  components:{
    alert,
    vSelect,
    vOption,
    checkboxGroup,
    checkbox
  },
  data () {
    return {
      vipSelected:[],
      vipUrl:window.urlConf.vip,
      fakeUrl:'/static/fakewemedia.json',
      inputPageNumber:1,
      pageCurrent:0,
      pageDefault:10,
      pageTotal:1,
      itemsStore:'',
      items: false,
      vip:false,
      alertError: false,
      alertSuccess: false,
      error: '',
      success:'',
      found:false,
      cityOptions: [
        {value:'0', label:'不限'},
        {value:'1', label:'北京'},
        {value:'2', label:'上海'},
        {value:'3', label:'广州'},
        {value:'4', label:'深圳'}
      ],
      ageOptions: [
        {value:'0', label:'不限',range:[0,1000]},
        {value:'1', label:'18周岁以下',range:[0,17]},
        {value:'2', label:'18-35周岁',range:[18,35]},
        {value:'3', label:'35周岁以上',range:[36,1000]}
      ],
      priceOptions: [
        {value:'0', label:'不限',range:[0,999999]},
        {value:'1', label:'50 以下',range:[0,49]},
        {value:'2', label:'50-199',range:[50,199]},
        {value:'3', label:'200-499',range:[200,499]},
        {value:'4', label:'500-999',range:[500,999]},
        {value:'5', label:'1000-3000',range:[1000,3000]},
        {value:'6', label:'3000以上',range:[3001,999999]}
      ],
      defaultCity:['0'],
      defaultPrice:['1'],
      defaultAge:['2'],
      interestsValue: [],
      typeValue: [],
      interests:['旅游','美食','电影','阅读','动漫','自拍',
      '运动','音乐','星座','时尚','汽车','竞技','占卜','军事','科技'],
      types:['微博','微信'],
      vipLimit:100
    }
  },
  watch:{
    interestsValue:'filter',
    typeValue:'filter',
    defaultCity:'filter',
    defaultPrice:'filter',
    defaultAge:'filter',
  },
  methods: {
    beforeTransition (transition) {
      this.filter()
      this.initLocalStore()

      return transition.next()
    },
    initLocalStore (){
      this.vipSelected = window.localStoreArray.get('vip_list') || [] //????
      if(this.vipSelected.length>0)
      {
        this.vip = window.store.wemedia.filter( (o) => {
          return this.vipSelected.indexOf(o.seq)>=0
        })
        this.defaultCity = this.defaultPrice = this.defaultAge =['0']
        this.find()
      }
    },
    routerGo (r) {
      router.go(r)
    },
    shoot (vipId){
      //let target = event.target ? event.target : event.srcElement
      let vipSelected = window.localStoreArray.get('vip_list')

      let checkItem_id = ()=>{
        /*check _id and types*/
        let vip = {}
        for(let w of window.store.wemedia){
          if(w.seq===vipId){
            vip = w
          }
        }
        for(let item of this.vipSelected){
          if(item._id===vip._id){
            return false
          }
        }
        return true
      }

      let saveItem = () => {
        if(checkItem_id()===false){
          return this.alertError = !!(this.error = '已选取了同一位自媒体的其他推广方式')
        }
        let vipSelected = [].concat(this.vipSelected).concat(vipId)
        this.vipSelected = []
        this.vipSelected = vipSelected
        window.localStoreArray.save('vip_list',vipId)
      }
      let removeItem = () => {
        let vipSelected = [].concat(this.vipSelected)
        let idx = vipSelected.indexOf(vipId)
        vipSelected.splice(idx,1)
        this.vipSelected = []
        this.vipSelected = vipSelected
        window.localStoreArray.remove('vip_list',vipId)
      }

      if(vipSelected === false){
        saveItem()
      } else{
        if(vipSelected.indexOf(vipId)<0)
        {
          saveItem()
        } else {
          removeItem()
        }
      }

    },
    find (clicked){
      if(clicked){
        this.found = true
      }
      this.pagination(this.vip)
      /*
      if(this.vip && this.vip.length && this.vip.length>0){
        this.pagination(this.vip)
      } else {
        this.items = this.vip = false
        this.pageTotal = 1
      }*/
    },
    filter (){
      let interests = (o) => {
        if(this.interestsValue.length === 0)
        {
          return true
        }
        for(let el of this.interestsValue)
        {
          if(o.interest.indexOf(el)>=0)
          {
            return true
          }
        }
        return false
      }

      let types = (o) => {
        if(this.typeValue.length === 0)
        {
          return true
        }
        if(this.typeValue.indexOf(o.type)>=0)
        {
          return true
        }
        return false
      }

      let city = (o) => {
        let cityId = this.defaultCity[0]
        let defaultCity = this.cityOptions.filter(function(el){
          return el.value === cityId
        })[0]
        if(defaultCity.label === '不限' || defaultCity.label === o.city)
        {
          return true
        }
        return false
      }
      let age = (o) => {
        let ageId = this.defaultAge[0]
        let defaultAge = this.ageOptions.filter(function(el){
          return el.value === ageId
        })[0]
        if(window.between(parseInt(o.age,10),defaultAge.range[0],defaultAge.range[1],true))
        {
          return true
        }
        return false
      }

      let price = (o) => {
        let priceId = this.defaultPrice[0]
        let defaultPrice = this.priceOptions.filter(function(el){
          return el.value === priceId
        })[0]
        if(window.between(parseInt(o.price,10),defaultPrice.range[0],defaultPrice.range[1],true))
        {
          return true
        }
        return false
      }

      this.vip = window.store.wemedia
      .filter(interests)
      .filter(types)
      .filter(city)
      .filter(age)
      .filter(price)
      .slice(0,this.vipLimit-1)
    }
  }
}
</script>
