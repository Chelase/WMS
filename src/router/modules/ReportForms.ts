import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/ReportForms',
  component: Layout,
  redirect: '/ReportForms/Warehousing',
  name: 'ReportForms',
  meta: {
    title: '报表管理',
    icon: 'heroicons-solid:menu-alt-3',
  },
  children: [
    {
      path: 'InventoryReport',
      name: 'InventoryReport',
      component: () => import('@/views/ReportForms/InventoryReport.vue'),
      meta: {
        title: '库存报表',
      },
    },
    {
      path: 'InventoryDetails',
      name: 'InventoryDetails',
      component: () => import('@/views/ReportForms/InventoryDetails.vue'),
      meta: {
        title: '库存明细',
      },
    },
    {
      path: 'InventoryLedger',
      name: 'InventoryLedger',
      component: () => import('@/views/ReportForms/InventoryLedger.vue'),
      meta: {
        title: '库存台账',
      },
    },
    {
      path: 'WarehousingDetail',
      name: 'WarehousingDetail',
      component: () => import('@/views/ReportForms/WarehousingDetail.vue'),
      meta: {
        title: '入库明细',
      },
    },
    {
      path: 'OutboundDetails',
      name: 'OutboundDetails',
      component: () => import('@/views/ReportForms/OutboundDetails.vue'),
      meta: {
        title: '出库明细',
      },
    },
    {
      path: 'MaterialStatistics',
      name: 'MaterialStatistics',
      component: () => import('@/views/ReportForms/MaterialStatistics.vue'),
      meta: {
        title: '物料统计',
      },
    },
  ],
}

export default routes
