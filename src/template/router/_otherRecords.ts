import type { RouteRecordRaw } from "vue-router";




export const errorRecords: Array<RouteRecordRaw> = [

  // {
  //   name: 'Error',
  //   path: '/error/(\\d+)',
  //   component: () => import('../../pages/Error/Page.vue')
  // },

  {
    name: 'NOT_FOUND',
    path: '/:pathMatch(.*)*',
    component: () => import('../../pages/Error/Page.vue'),
    props: { code: 404 },
  },
]

