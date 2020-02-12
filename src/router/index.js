import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login'
import adminCenter from '@/pages/admin-center'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/adminCenter',
      name: 'adminCenter',
      component: adminCenter,
      children: [
        {
            path: '/adminUser',
            name: 'adminUser',
            component: function(resolve) {
                require(['../pages/admin-user.vue'], resolve)
            },
            meta: { 'notKeepAlive': true }
        },
        {
          path: '/adminMaterial',
          name: 'adminMaterial',
          component: function(resolve) {
              require(['../pages/admin-material.vue'], resolve)
          },
          meta: { 'notKeepAlive': true }
        },
        {
          path: '/adminVideo',
          name: 'adminVideo',
          component: function(resolve) {
              require(['../pages/admin-video.vue'], resolve)
          },
          meta: { 'notKeepAlive': true }
        },
        {
          path: '/adminExtension',
          name: 'adminExtension',
          component: function(resolve) {
              require(['../pages/admin-extension.vue'], resolve)
          },
          meta: { 'notKeepAlive': true }
        },
        {
          path: '/adminLabel',
          name: 'adminLabel',
          component: function(resolve) {
              require(['../pages/admin-label.vue'], resolve)
          },
          meta: { 'notKeepAlive': true }
        },
      ]
    }
  ]
})
