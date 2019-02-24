import request from '@/util/request'

export function loginByUsername (data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function logout () {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo (token) {
  const data = {
    token
  }
  return request({
    url: '/user/info',
    method: 'post',
    data
  })
}

export function getAllUser (token) {
  const data = {
    token
  }
  return request({
    url: '/user/getAllUser',
    method: 'GET',
    data
  })
}
