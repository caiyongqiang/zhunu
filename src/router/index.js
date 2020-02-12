import Vue from 'vue'
import Router from 'vue-router'
import adminUser from '@/pages/admin-user'
import Login from '@/pages/login'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Login',
    //   component: Login
    // },
    {
      path: '/',
      name: 'adminUser',
      component: adminUser
    }
  ]
})
