import adminCenter from '@/pages/admin-center'
var router_Arr={
    path: '/adminCenter',
    name: 'adminCenter',
    component: adminCenter,
    children: [
      {
          path: '/adminUser',
          name: 'adminUser',
          component: () => import ('@/pages/user/index'),
          meta: { 'notKeepAlive': true,'name':'用户信息' },
          redirect: 'noredirect',
          children:[
           {
            path: '/adminUser/children_one',
            name: 'adminUser/children_one',
            component: () => import ('@/pages/user/children_one'),
            meta: { 'notKeepAlive': true , name: '用户信息的的子集',},
           },
           {
            path: '/adminUser/children_second',
            name: 'adminUser/children_second',
            component: () => import ('@/pages/user/children_second'),
            meta: { 'notKeepAlive': true, name: '用户信息的的子集', },
           }
          ]
      },
      {
        path: '/adminMaterial',
        name: 'adminMaterial',
        component: () => import ('@/pages/admin-material'),
        meta: { 'notKeepAlive': true,'name':'素材管理' }
      },
      {
        path: '/adminVideo',
        name: 'adminVideo',
        component: () => import ('@/pages/admin-video'),
        meta: { 'notKeepAlive': true,'name':'视频管理' }
      },
      {
        path: '/adminExtension',
        name: 'adminExtension',
        component: () => import ('@/pages/admin-extension'),
        meta: { 'notKeepAlive': true ,'name':'推广管理'}
      },
      {
        path: '/adminLabel',
        name: 'adminLabel',
        component: () => import ('@/pages/admin-label'),
        meta: { 'notKeepAlive': true,'name':'标签管理' }
      },
    ]
  }
  export default router_Arr