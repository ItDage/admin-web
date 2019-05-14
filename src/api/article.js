import request from '@/util/request'

// 获取文章列表
export function getArticle (data) {
  return request({
    url: '/article/web/getArticle',
    method: 'post',
    data
  })
}

// 获取文章列表
export function getRecentArticle (data) {
  return request({
    url: '/article/web/getRecentArticle',
    method: 'post',
    data
  })
}

// 获取文章详情
export function getArticleInfo (data) {
  return request({
    url: '/article/web/getArticleInfo',
    method: 'post',
    data
  })
}

// 获取文件
export function getFile (data) {
  return request({
    url: '/article/web/getFile',
    method: 'post',
    data
  })
}

export function download (data) {
  return request({
    url: '/article/web/download',
    method: 'post',
    data
  })
}
