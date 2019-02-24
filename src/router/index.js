import Vue from 'vue'
import Router from 'vue-router'
import test from '@/components/test/index'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/components/index')
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/list/:key',
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
