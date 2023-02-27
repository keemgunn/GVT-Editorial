import type { RouteRecordRaw } from "vue-router";
import DEV_ColorSchemeVue from "../dev/pages/DEV_ColorScheme.vue";



export const errorRecords: Array<RouteRecordRaw> = [

  // {
  //   name: 'Error',
  //   path: '/error/(\\d+)',
  //   component: () => import('../../pages/Error/Page.vue')
  // },

  {
    name: 'NOT_FOUND',
    path: '/:pathMatch(.*)*',
    component: () => import('./ErrorPage.vue'),
    props: { code: 404 },
  },
]


export const devRecords: Array<RouteRecordRaw> = []
if (process.env.NODE_ENV === 'DEV_2') {

  devRecords.push({
    name: 'DEV_COLORSCHEME',
    path: '/dev/colorscheme',
    component: DEV_ColorSchemeVue
  })

  devRecords.push({
    path: '/:pathMatch(.*)*',
    redirect: '/devground'
  })
}