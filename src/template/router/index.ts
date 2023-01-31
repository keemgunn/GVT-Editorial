import { createRouter, createWebHistory } from 'vue-router'
import { pageRoutes } from '@/template/router/pageRoutes';



const routes = [

  // DEFAULT
  { path: '/', redirect: '/home' },

  ...pageRoutes, 
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export {
  router
}