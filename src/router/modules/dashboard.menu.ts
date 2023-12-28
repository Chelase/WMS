import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/dashboard',
  component: Layout,
  redirect: '/dashboard/index',
  name: 'dashboard',
  meta: {
    title: '首页',
    icon: 'uiw:home',
  },
  children: [
    {
      path: 'Introduce',
      name: 'Introduce',
      component: () => import('@/views/dashboard/index.vue'),
      meta: {
        title: '仓库统计',
        icon: 'gridicons:info-outline',
      },
    }, {
      path: 'DtDisply',
      name: 'DtDisply',
      component: () => import('@/views/dashboard/DataDisplay.vue'),
      meta: {
        title: '仓库统计2',
        icon: 'uiw:home',
      },
    }
  ],
}

export default routes
