window.uri = 'http://lexiang.7maker.cn'
window.urlConf = {
  missions: {
    list: `${window.uri}/task/info/listpub`,
    show: `${window.uri}/task/info`,
    new: `${window.uri}/task/publish`,
    edit: `${window.uri}/task/publish/update`,
    remove: false
  },
  profileUser: {
    show: false,
    edit: false
  },
  profileEnterprise: {
    show: false,
    edit: false
  },
  report: false,
  account: false,
  upload: `${window.uri}/openapi/upload/upimg`
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
import AccountView from './components/Account'
import ProfileUserView from './components/ProfileUser'
import ProfileEnterpriseView from './components/ProfileEnterprise'
import ReportView from './components/Report'
import PanelView from './components/Panel'
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
  '/missions-edit/:missionId': {component: MissionsEditView},
  '/account': {component: AccountView},
  '/profileuser': {component: ProfileUserView},
  '/profileenterprise': {component: ProfileEnterpriseView},
  '/report': {component: ReportView},
  '/panel': {component: PanelView},
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
