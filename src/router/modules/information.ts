import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/information',
  component: Layout,
  redirect: '/information/warehouse',
  name: 'information',
  meta: {
    title: '基本资料',
    icon: 'ep:reading',
  },
  children: [
    {
      path: 'warehouse',
      name: 'warehouse',
      component: () => import('@/views/information/warehouse.vue'),
      meta: {
        title: '仓库管理',
        icon: 'carbon:bare-metal-server',
      },
    },
    {
      path: 'CargoArea',
      name: 'CargoArea',
      component: () => import('@/views/information/CargoArea.vue'),
      meta: {
        title: '货区管理',
      },
    },
    {
      path: 'location',
      name: 'location',
      component: () => import('@/views/information/location.vue'),
      meta: {
        title: '货位管理',
      },
    },
    {
      path: 'customer',
      name: 'customer',
      component: () => import('@/views/information/customer.vue'),
      meta: {
        title: '客户管理',
      },
    },
    {
      path: 'supplier',
      name: 'supplier',
      component: () => import('@/views/information/supplier.vue'),
      meta: {
        title: '供应商管理',
      },
    },
    {
      path: 'material',
      name: 'material',
      component: () => import('@/views/information/material.vue'),
      meta: {
        title: '物料类型',
      },
    },
    {
      path: 'MaterialPoint',
      name: 'MaterialPoint',
      component: () => import('@/views/information/MaterialPoint.vue'),
      meta: {
        title: '上下料点',
      },
    },
    {
      path: 'MaterialManagement',
      name: 'MaterialManagement',
      component: () => import('@/views/information/MaterialManagement.vue'),
      meta: {
        title: '物料管理',
      },
    },
    {
      path: 'metering',
      name: 'metering',
      component: () => import('@/views/information/metering.vue'),
      meta: {
        title: '计量单位',
      },
    },
    {
      path: 'TrayType',
      name: 'TrayType',
      component: () => import('@/views/information/TrayType.vue'),
      meta: {
        title: '托盘类型',
      },
    },
    {
      path: 'PalletManagement',
      name: 'PalletManagement',
      component: () => import('@/views/information/PalletManagement.vue'),
      meta: {
        title: '托盘管理',
      },
    },
    {
      path: 'planned',
      name: 'planned',
      component: () => import('@/views/information/planned.vue'),
      meta: {
        title: '计划管理',
      },
    },
  ],
}

export default routes