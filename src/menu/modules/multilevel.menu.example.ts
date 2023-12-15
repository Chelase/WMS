import type { Menu } from '#/global'

const menus: Menu.recordRaw = {
  meta: {
    title: '多级导航',
    icon: 'heroicons-solid:menu-alt-3',
  },
  children: [
    {
      path: '/information/page',
      meta: {
        title: '导航1',
      },
    },
    {
      meta: {
        title: '导航2',
      },
      children: [
        {
          path: '/information/level2/page',
          meta: {
            title: '导航2-1',
          },
        },
        {
          meta: {
            title: '导航2-2',
          },
          children: [
            {
              path: '/information/level2/level3/page1',
              meta: {
                title: '导航2-2-1',
              },
            },
            {
              path: '/information/level2/level3/page2',
              meta: {
                title: '导航2-2-2',
              },
            },
          ],
        },
      ],
    },
  ],
}

export default menus
