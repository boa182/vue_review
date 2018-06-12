import Vue from 'vue'
import Router from 'vue-router'
import block from './module/block'
import common from './module/common'
import technology from './module/technology'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home/common'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('page/home.vue'),
      children: [...block, ...common, ...technology]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('page/login.vue')
    }
  ]
})
