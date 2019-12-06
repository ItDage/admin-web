import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken () {
  var temp = Cookies.get(TokenKey)
  if (typeof(temp) === 'undefined') {
    return null
  }
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}
