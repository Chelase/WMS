import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/system',
  component: Layout,
  redirect: '/system/DataDictionary',
  name: 'system',
  meta: {
    title: '系统管理',
    icon: 'ep:setting',
  },
  children: [
    {
      path: 'DataDictionary',
      name: 'DataDictionary',
      component: () => import('@/views/system/DataDictionary.vue'),
      meta: {
        title: '数据字典',
      },
    },
    {
      path: 'SystemParameter',
      name: 'SystemParameter',
      component: () => import('@/views/system/SystemParameter.vue'),
      meta: {
        title: '系统参数',
      },
    },
    {
      path: 'WarehousePermissions',
      name: 'WarehousePermissions',
      component: () => import('@/views/system/WarehousePermissions.vue'),
      meta: {
        title: '仓库权限',
      },
    },
    {
      path: 'CodingRules',
      name: 'CodingRules',
      component: () => import('@/views/system/CodingRules.vue'),
      meta: {
        title: '编码规则',
      },
    },
    {
      path: 'user',
      name: 'user',
      component: () => import('@/views/system/user.vue'),
      meta: {
        title: '用户管理',
      },
    },
    {
      path: 'roles',
      name: 'roles',
      component: () => import('@/views/system/roles.vue'),
      meta: {
        title: '角色管理',
      },
    },
    {
      path: 'department',
      name: 'department',
      component: () => import('@/views/system/department.vue'),
      meta: {
        title: '部门管理',
      },
    },
    {
      path: 'KeyManagement',
      name: 'KeyManagement',
      component: () => import('@/views/system/KeyManagement.vue'),
      meta: {
        title: '密钥管理',
      },
    },
    {
      path: 'RightsManagement',
      name: 'RightsManagement',
      component: () => import('@/views/system/RightsManagement.vue'),
      meta: {
        title: '权限管理',
      },
    },
    {
      path: 'OperationLog',
      name: 'OperationLog',
      component: () => import('@/views/system/OperationLog.vue'),
      meta: {
        title: '操作日志',
      },
    },
  ],
}

export default routes
