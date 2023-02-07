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


export const devRecords: Array<RouteRecordRaw> = []
if (Number(process.env.NODE_ENV || "0") > 1) {

  devRecords.push({
    name: 'DEVGROUND',
    path: '/devground/:component?',
    component: () => import('../devComps/pages/DEVGROUND-comp.vue')
  })

  devRecords.push({
    path: '/:pathMatch(.*)*',
    redirect: '/devground'
  })

  

}