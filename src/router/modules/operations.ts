import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/operation',
  component: Layout,
  redirect: '/operation/Warehousing',
  name: 'operation',
  meta: {
    title: '仓库作业',
    icon: 'icon-park-outline:all-application',
  },
  children: [
    {
      path: 'Warehousing',
      name: 'Warehousing',
      component: () => import('@/views/operations/Warehousing.vue'),
      meta: {
        title: '入库管理',
      },
    },
    {
      path: 'outbound',
      name: 'outbound',
      component: () => import('@/views/operations/outbound.vue'),
      meta: {
        title: '出库管理',
      },
    },
    {
      path: 'Relocation',
      name: 'Relocation',
      component: () => import('@/views/operations/Relocation.vue'),
      meta: {
        title: '移库管理',
      },
    },
    {
      path: 'ReportingLosses',
      name: 'ReportingLosses',
      component: () => import('@/views/operations/ReportingLosses.vue'),
      meta: {
        title: '报损管理',
      },
    },
    {
      path: 'allocate',
      name: 'allocate',
      component: () => import('@/views/operations/allocate.vue'),
      meta: {
        title: '调拨管理',
      },
    },
    {
      path: 'Inventory',
      name: 'Inventory',
      component: () => import('@/views/operations/Inventory.vue'),
      meta: {
        title: '盘点管理',
      },
    },
  ],
}

export default routes
