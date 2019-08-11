/** When your routing user is too long, you can split it into small modules **/

import Layout from '@/layout'

const userRouter = {
  path: '/goods',
  component: Layout,
  redirect: '/goods/list',
  name: 'Goods',
  meta: {
    title: 'Goods',
    icon: 'goods'
  },
  children: [
    // 商品列表
    {
      path: 'goods/list',
      component: () => import('@/views/goods/list'),
      name: 'GoodsList',
      meta: {
        title: 'GoodsList',
        permits: ['ui_goods_list']
      }
    },
    // 品牌
    {
      path: 'goods/brand',
      component: () => import('@/views/goods/brand'),
      name: 'GoodsBrand',
      meta: {
        title: 'GoodsBrand',
        permits: ['ui_goods_brand']
      }
    },
    // 分类
    {
      path: 'goods/category',
      component: () => import('@/views/goods/category'),
      name: 'GoodsCategory',
      meta: {
        title: 'GoodsCategory',
        permits: ['ui_goods_category']
      }
    },
    // 部门
    {
      path: 'goods/department',
      component: () => import('@/views/goods/department'),
      name: 'GoodsDepartment',
      meta: {
        title: 'GoodsDepartment',
        permits: ['ui_goods_department']
      }
    },
    // 商品公司
    {
      path: 'goods/firm',
      component: () => import('@/views/goods/firm'),
      name: 'GoodsFirm',
      meta: {
        title: 'GoodsFirm',
        permits: ['ui_goods_firm']
      }
    },
    // 国家税收分类编码
    {
      path: 'goods/taxcode',
      component: () => import('@/views/goods/taxcode'),
      name: 'GoodsTaxcode',
      meta: {
        title: 'GoodsTaxcode',
        permits: ['ui_goods_taxcode']
      }
    },
    // 国际商品及服务编码
    {
      path: 'goods/unspsc',
      component: () => import('@/views/goods/unspsc'),
      name: 'GoodsUnspsc',
      meta: {
        title: 'GoodsUnspsc',
        permits: ['ui_goods_unspsc']
      }
    }

  ]
}
export default userRouter
