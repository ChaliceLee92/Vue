import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '/',
      redirect:'/login'
    },
    {
      path: '/login',
      name: 'login',
      meta:{
        title:'登录'
      },
      component: () => import('@/views/login.vue')
    },
    {
      path: '/404',
      name: '404',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/404.vue')
    }
  ]
})
