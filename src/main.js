window.uri = 'http://open.chudianyun.com'
window.urlConf = {
  missions: {
    list: `${window.uri}/task/info/listpub`,
    show: `${window.uri}/task/info`,
    new: `${window.uri}/task/publish`,
    edit: `${window.uri}/task/publish/update`,
    remove: false
  },
  missions2: {
    show: `${window.uri}/task/info/diytask`,
    new: `${window.uri}/task/publish/diytask`,
    edit: `${window.uri}/task/publish/update_diytask`
  },
  password: {
    change: `${window.uri}/user/password/change`
  },
  profileUser: {
    show: `${window.uri}/user/info`,
    edit: `${window.uri}/user/info/set`
  },
  profileEnterprise: {
    show: `${window.uri}/user/info/companyinfo`,
    edit: `${window.uri}/user/info/set`
  },
  report: false,
  account: {
    fortune: `${window.uri}/task/info/fortune`,
    income: `${window.uri}/task/info/income`
  },
  vip: `${window.uri}/task/Publish/getmedia`,
  upload: `${window.uri}/openapi/upload/upimg`,
  uploadAvatar: `${window.uri}/file/upload/userhead`,
  uploadLicence: `${window.uri}/file/upload/companylicence`,
  uploadPictures: `${window.uri}/file/upload/diytask`,
  uploadFile: `${window.uri}/file/upload/diytaskfile`
}
window.store = {
  wemedia: false
}

window.onerror = function (message, source, lineno, colno, error) {
  if (message.indexOf('__v_trans') >= 0) {
    window.location.reload()
  }
  return false
}
// /task/info/fortune   这个临时放这里了，余额
// task/info/income   流水

window._uDecode = function (s) { return unescape(s.replace(/\\(u[0-9a-fA-F]{4})/gm, '%$1')) }
window.utoa = function (str) { return window.btoa(unescape(encodeURIComponent(str))) }
window.atou = function (str) {
  try {
    return decodeURIComponent(escape(window.atob(str)))
  } catch (e) {
    return 'error encode...'
  }
}

window.between = function (num, a, b, inclusive) {
  let min = Math.min(a, b)
  let max = Math.max(a, b)
  return inclusive ? num >= min && num <= max : num > min && num < max
}

window.localStoreArray = {}

window.localStoreArray.get = function (title) {
  let str = localStorage.getItem(title) || ''
  if (str.length > 0) {
    return str.split(',')
  }
  return false
}

window.localStoreArray.save = function (title, s) {
  let store = window.localStoreArray.get(title)
  if (!store) {
    store = []
  } else {
    if (store.indexOf(s) >= 0) {
      return false
    }
  }
  return localStorage.setItem(title, store.concat(s).join(','))
}

window.localStoreArray.remove = function (title, s) {
  let store = window.localStoreArray.get(title)
  if (!store) {
    return false
  }
  let index = store.indexOf(s)
  if (index > -1) {
    store.splice(index, 1)
  }
  return localStorage.setItem(title, store.join(','))
}

window.localStoreArray.destory = function (title) {
  return localStorage.removeItem(title)
}

import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import App from './App'
/* importing all views for router */
import LoginView from './components/Login'
import SignupView from './components/Signup'
import SignupByPhoneView from './components/SignupByPhone'
import MissionsView from './components/Missions'
import MissionsNewView from './components/MissionsNew'
import MissionsEditView from './components/MissionsEdit'
import Missions2New1View from './components/Missions2New1'
import Missions2New2View from './components/Missions2New2'
import Missions2New3View from './components/Missions2New3'
import Missions2EditView from './components/Missions2Edit'
import AccountView from './components/Account'
import ProfileUserView from './components/ProfileUser'
import ProfileEnterpriseView from './components/ProfileEnterprise'
import ChangePasswordView from './components/ChangePassword'
import ReportView from './components/Report'
import PanelView from './components/Panel'
import WemediaView from './components/WemediaView'
import IndexView from './components/Index'
import BlankView from './components/Blank'

Vue.use(Router)
Vue.use(Resource)
const localStorage = window.localStorage
import auth from './auth'
// Vue.http.headers.common['Authorization'] = 'Bearer ' + window.localStorage.getItem('id_token')
Vue.http.options.headers = {
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
}
Vue.http.options.emulateJSON = true
// Vue.http.options.emulateHTTP = true

/* upload config */
localStorage.setItem('uploadUrl', 'abcd.com')

auth.checkAuth()

export var router = new Router()

const RouterMap = {
  '/login': {component: LoginView},
  '/signup': {component: SignupView},
  '/signupbyphone': {component: SignupByPhoneView},
  '/missions': {component: MissionsView},
  '/missions-new': {component: MissionsNewView},
  '/missions2-new1': {component: Missions2New1View},
  '/missions2-new2': {component: Missions2New2View},
  '/missions2-new3': {component: Missions2New3View},
  '/missions-edit/:missionId': {component: MissionsEditView},
  '/missions2-edit/:missionId': {component: Missions2EditView},
  '/account': {component: AccountView},
  '/profileuser': {component: ProfileUserView},
  '/profileenterprise': {component: ProfileEnterpriseView},
  '/report': {component: ReportView},
  '/wemedia': {component: WemediaView},
  '/changepassword': {component: ChangePasswordView},
  '/panel': {component: PanelView},
  '/index': {component: IndexView},
  '/blank': {component: BlankView}
}
Object.keys(RouterMap).forEach(function (key) {
  RouterMap[key].name = key.replace('/', '').split('/:')[0]
})

router.map(RouterMap)

router.beforeEach(function () {
  window.scrollTo(0, 0)
})

router.redirect({
  '*': '/panel'
})
window.app = App
window.MissionsNew = MissionsNewView
router.start(App, '#app')
