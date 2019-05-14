import Vue from 'vue'
import Router from 'vue-router'
import test from '@/components/test/index'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    component: () => import('@/components/home/index'),
    hidden: true
  }
]

export const asyncRouterMap = [
  {

  }
]

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/components/home/index')
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('@/components/articleList/index')
    },
    {
      path: '/info',
      name: 'info',
      component: () => import('@/components/articleList/articleInfo')
    }
  ]
})
