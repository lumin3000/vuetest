const API_URL = 'http://open.chudianyun.com'
const LOGIN_URL = API_URL + '/user/login/email'
const LOGIN_PHONE_URL = API_URL + '/user/login/mobile'
const SIGNUP_URL = API_URL + '/user/register/email'
const SIGNUP_PHONE_URL = API_URL + '/user/register/mobile'
const SIGNUP_PHONE_AUTHCODE_URL = API_URL + '/user/register/authcode'
const localStorage = window.localStorage
export default {

  user: {
    authenticated: false
  },

  login (context, creds, cb) {
    let url = (creds.type === 'email') ? LOGIN_URL : LOGIN_PHONE_URL
    context.$http.post(url, creds)
    .then((res) => {
      if (res.data.code === 0) {
        this.user.authenticated = true
        localStorage.setItem('id_token', res.data.items.scode)
        localStorage.setItem('id_user', res.data.items.uid)
        cb()
      } else {
        cb(res.data.msg)
      }
    }, (err) => {
      cb(err.data)
    })
  },

  authMobile (context, data, cb) {
    context.$http.post(SIGNUP_PHONE_AUTHCODE_URL, data)
    .then((res) => {
      if (res.data.code === 0) {
        cb()
      } else {
        cb(res.data.msg)
      }
    }, (err) => {
      cb(err.data.msg)
    })
  },

  signup (context, creds, type, cb) {
    let url = SIGNUP_URL
    if (type === 'mobile') {
      url = SIGNUP_PHONE_URL
    }
    context.$http.post(url, creds)
    .then((res) => {
      if (res.data.code === 0) {
        this.user.authenticated = true
        localStorage.setItem('id_token', res.data.items.scode)
        localStorage.setItem('id_user', res.data.items.uid)
        cb()
      } else {
        cb(res.data.msg)
      }
    }, (err) => {
      cb(err.data)
    })
  },

  logout () {
    localStorage.removeItem('id_token')
    localStorage.removeItem('id_user')
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
