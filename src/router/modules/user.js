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
      path: 'user-list',
      component: () => import('@/views/user/list'),
      name: 'UserList',
      meta: { title: 'UserList' }
    },
    {
      path: 'user-role',
      component: () => import('@/views/user/role'),
      name: 'UserRole',
      meta: { title: 'UserRole' }
    },
    {
      path: 'user-permission',
      component: () => import('@/views/user/permission'),
      name: 'UserPermission',
      meta: { title: 'UserPermission' }
    }
  ]
}
export default userRouter
