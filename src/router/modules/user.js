/** When your routing user is too long, you can split it into small modules **/

import Layout from '@/layout'

const userRouter = {
  path: '/user',
  component: Layout,
  redirect: '/user/user-list',
  name: 'User',
  meta: {
    title: 'User',
    icon: 'user'
  },
  children: [
    {
      path: 'user/list',
      component: () => import('@/views/user/list'),
      name: 'UserList',
      meta: {
        title: 'UserList',
        permits: ['ui_user_list']
      }
    },
    {
      path: 'user/role',
      component: () => import('@/views/user/role'),
      name: 'UserRole',
      meta: {
        title: 'UserRole',
        permits: ['ui_role_list']
      }
    },
    {
      path: 'user/permission/front',
      component: () => import('@/views/user/permission/front'),
      name: 'FrontPermission',
      meta: {
        title: 'FrontPermission',
        permits: ['ui_front_permit_list']
      }
    },
    {
      path: 'user/permission/micro',
      component: () => import('@/views/user/permission/micro'),
      name: 'MicroPermission',
      meta: {
        title: 'MicroPermission',
        permits: ['ui_micro_permit_list']
      }
    }
  ]
}
export default userRouter
