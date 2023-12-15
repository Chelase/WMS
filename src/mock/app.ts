export default [
  {
    url: '/mock/app/route/list',
    method: 'get',
    response: () => {
      return {
        error: '',
        status: 1,
        data: [
          {
            meta: {
              title: '演示',
              icon: 'uim:box',
            },
            children: [
              {
                path: '/information',
                component: 'Layout',
                redirect: '/information/page',
                name: 'multilevelMenuExample',
                meta: {
                  title: '多级导航',
                  icon: 'heroicons-solid:menu-alt-3',
                },
                children: [
                  {
                    path: 'page',
                    name: 'multilevelMenuExample1',
                    component: 'information/CargoArea.vue',
                    meta: {
                      title: '导航1',
                    },
                  },
                  {
                    path: 'level2',
                    name: 'multilevelMenuExample2',
                    redirect: '/information/level2/page',
                    meta: {
                      title: '导航2',
                    },
                    children: [
                      {
                        path: 'page',
                        name: 'multilevelMenuExample2-1',
                        component: 'information/level2/CargoArea.vue',
                        meta: {
                          title: '导航2-1',
                        },
                      },
                      {
                        path: 'level3',
                        name: 'multilevelMenuExample2-2',
                        redirect: '/information/level2/level3/page1',
                        meta: {
                          title: '导航2-2',
                        },
                        children: [
                          {
                            path: 'page1',
                            name: 'multilevelMenuExample2-2-1',
                            component: 'information/level2/level3/page1.vue',
                            meta: {
                              title: '导航2-2-1',
                            },
                          },
                          {
                            path: 'page2',
                            name: 'multilevelMenuExample2-2-2',
                            component: 'information/level2/level3/page2.vue',
                            meta: {
                              title: '导航2-2-2',
                            },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      }
    },
  },
  {
    url: '/mock/app/menu/list',
    method: 'get',
    response: () => {
      return {
        error: '',
        status: 1,
        data: [
          {
            meta: {
              title: '演示',
              icon: 'uim:box',
            },
            children: [
              {
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
              },
            ],
          },
        ],
      }
    },
  },
]
