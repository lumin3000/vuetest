import {router} from '../main'
const API_URL = 'http://lexiang.7maker.cn/openapi'
const LOGIN_URL = API_URL + '/user/login'
const SIGNUP_URL = API_URL + '/user/regist'
const localStorage = window.localStorage
export default {

  user: {
    authenticated: false
  },

  login (context, creds, redirect) {
    context.$http.post(LOGIN_URL, creds, (data) => {
      console.log('ok')
      // localStorage.setItem('id_token', data.id_token)

      this.user.authenticated = true

      if (redirect) {
        router.go(redirect)
      }
    }
    ).error((err) => {
      context.error = err
    })
  },

  signup (context, creds, redirect) {
    context.$http.post(SIGNUP_URL, creds, (data) => {
      console.log('ok')
      // localStorage.setItem('id_token', data.id_token)

      this.user.authenticated = true

      if (redirect) {
        router.go(redirect)
      }
    }
    ).error((err) => {
      context.error = err
    })
  },

  logout () {
    localStorage.removeItem('id_token')
    this.user.authenticated = false
  },

  checkAuth () {
    var jwt = localStorage.getItem('id_token')
    if (jwt) {
      this.user.authenticated = true
    } else {
      this.user.authenticated = false
    }
  },

  getAuthHeader () {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('id_token')
    }
  }
}
