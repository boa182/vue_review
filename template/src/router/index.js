import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('page/home.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('page/login.vue')
    }
  ]
})
