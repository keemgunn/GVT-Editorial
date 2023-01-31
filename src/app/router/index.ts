import { createRouter, createWebHistory } from 'vue-router'
import { viewRoutes } from '@/app/router/viewRoutes';



const routes = [

  // DEFAULT
  { path: '/', redirect: '/home' },

  ...viewRoutes, 
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export {
  router
}