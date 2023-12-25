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
      component: () => import('@/views/information/warehouse/index.vue'),
      meta: {
        title: '仓库管理',
        icon: 'carbon:bare-metal-server',
      },
    },
    {
      path: 'CargoArea',
      name: 'CargoArea',
      component: () => import('@/views/information/CargoArea/index.vue'),
      meta: {
        title: '货区管理',
        icon: 'carbon:area',
      },
    },
    {
      path: 'location',
      name: 'location',
      component: () => import('@/views/information/location/index.vue'),
      meta: {
        title: '货位管理',
        icon: 'ep:box',
      },
    },
    {
      path: 'customer',
      name: 'customer',
      component: () => import('@/views/information/customer/index.vue'),
      meta: {
        title: '客户管理',
        icon: 'teenyicons:address-book-outline',
      },
    },
    {
      path: 'supplier',
      name: 'supplier',
      component: () => import('@/views/information/supplier/index.vue'),
      meta: {
        title: '供应商管理',
        icon: 'charm:people',
      },
    },
    {
      path: 'material',
      name: 'material',
      component: () => import('@/views/information/material/index.vue'),
      meta: {
        title: '物料类型',
        icon: 'uiw:tags-o',
      },
    },
    {
      path: 'MaterialPoint',
      name: 'MaterialPoint',
      component: () => import('@/views/information/MaterialPoint.vue'),
      meta: {
        title: '上下料点',
        icon: 'memory:align-vertical-distribute',
      },
    },
    {
      path: 'MaterialManagement',
      name: 'MaterialManagement',
      component: () => import('@/views/information/MaterialManagement/index.vue'),
      meta: {
        title: '物料管理',
        icon: 'memory:box',
      },
    },
    {
      path: 'metering',
      name: 'metering',
      component: () => import('@/views/information/metering.vue'),
      meta: {
        title: '计量单位',
        icon: 'uiw:tag-o',
      },
    },
    {
      path: 'TrayType',
      name: 'TrayType',
      component: () => import('@/views/information/TrayType.vue'),
      meta: {
        title: '托盘类型',
        icon: 'uiw:tags-o',
      },
    },
    {
      path: 'PalletManagement',
      name: 'PalletManagement',
      component: () => import('@/views/information/PalletManagement.vue'),
      meta: {
        title: '托盘管理',
        icon: 'memory:box',
      },
    },
    {
      path: 'planned',
      name: 'planned',
      component: () => import('@/views/information/planned.vue'),
      meta: {
        title: '计划管理',
        icon: 'ant-design:carry-out-outlined',
      },
    },
  ],
}

export default routes
