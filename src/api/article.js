import request from '@/util/request'

export function getArticle (data) {
  return request({
    url: '/article/web/getArticle',
    method: 'post',
    data
  })
}
