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

import auth from './auth'
// Vue.http.headers.common['Authorization'] = 'Bearer ' + window.localStorage.getItem('id_token')
Vue.http.options.headers = {
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
}
Vue.http.options.emulateJSON = true
// Vue.http.options.emulateHTTP = true

auth.checkAuth()

export var router = new Router()

const RouterMap = {
  '/login': {component: LoginView},
  '/signup': {component: SignupView},
  '/signupbyphone': {component: SignupByPhoneView},
  '/missions': {component: MissionsView},
  '/missionsnew': {component: MissionsNewView},
  '/missionsedit': {component: MissionsEditView},
  '/account': {component: AccountView},
  '/profileuser': {component: ProfileUserView},
  '/profileenterprise': {component: ProfileEnterpriseView},
  '/report': {component: ReportView},
  '/panel': {component: PanelView},
  '/blank': {component: BlankView}
}
Object.keys(RouterMap).forEach(function (key) {
  RouterMap[key].name = key.replace('/', '')
})

router.map(RouterMap)

router.beforeEach(function () {
  window.scrollTo(0, 0)
})

router.redirect({
  '*': '/panel'
})

router.start(App, '#app')
