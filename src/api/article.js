import request from '@/util/request'

export function getArticle () {
  return request({
    url: '/test/param',
    method: 'get'
  })
}
