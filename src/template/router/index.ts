import { createRouter, createWebHistory } from 'vue-router'
import { pageRecords } from '@/template/router/_pageRoutes';
import { errorRecords } from './_otherRecords';



const routes = [

  // DEFAULT
  { path: '/', redirect: '/home' },

  
  ...pageRecords, 
  ...errorRecords,
]

console.warn(routes);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export {
  router
}