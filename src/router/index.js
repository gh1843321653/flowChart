import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: resolve => require(['../pages/index.vue'], resolve)
    },
    {
      path: '/test',
      name: 'test',
      component: resolve => require(['../pages/test/index.vue'], resolve)
    },

  ]
})
