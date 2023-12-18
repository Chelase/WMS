import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/business',
  component: Layout,
  redirect: '/business/TakeOver',
  name: 'business',
  meta: {
    title: '业务操作',
    icon: 'ep:edit',
  },
  children: [
    {
      path: 'TakeOver',
      name: 'TakeOver',
      component: () => import('@/views/business/TakeOver/index.vue'),
      meta: {
        title: '收货管理',
      },
    },
    {
      path: 'SendGoods',
      name: 'SendGoods',
      component: () => import('@/views/business/SendGoods/index.vue'),
      meta: {
        title: '发货管理',
      },
    },
  ],
}

export default routes
