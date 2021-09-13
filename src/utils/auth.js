import Cookies from 'js-cookie'

const TokenKey = 'token'
const allowPagekey = 'Admin-allowPage'
const userRNamekey='userRName'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function setRName(uname) {
  return Cookies.set(userRNamekey, uname)
}

export function getRName() {
  return Cookies.get(userRNamekey)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getAllowPage() {
  return Cookies.get(allowPagekey)
}

export function setAllowPage(allowPage) {
  return Cookies.set(allowPagekey, allowPage)
}

export function removeAllowPage() {
  return Cookies.remove(allowPagekey)
}

export function removeSessionId() {
  return Cookies.remove('JSESSIONID')
}
