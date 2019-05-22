/** When your routing user is too long, you can split it into small modules **/

import Layout from '@/layout'

const userRouter = {
  path: '/user',
  component: Layout,
  redirect: '/user/list-user',
  name: 'User',
  meta: {
    title: 'User',
    icon: 'user'
  },
  children: [
    {
      path: 'dynamic-user',
      component: () => import('@/views/user/dynamic-user/index'),
      name: 'DynamicUser',
      meta: { title: 'dynamicUser' }
    },
    {
      path: 'drag-user',
      component: () => import('@/views/user/drag-user'),
      name: 'DragUser',
      meta: { title: 'dragUser' }
    },
    {
      path: 'inline-edit-user',
      component: () => import('@/views/user/inline-edit-user'),
      name: 'InlineEditUser',
      meta: { title: 'inlineEditUser' }
    },
    {
      path: 'list-user',
      component: () => import('@/views/user/list-user'),
      name: 'ListUser',
      meta: { title: 'listUser' }
    }
  ]
}
export default userRouter
