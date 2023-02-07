import { createRouter, createWebHistory } from 'vue-router'
import { pageRouterRecords } from '@/template/router/_pageRecords';
import { errorRecords, devRecords } from './_otherRecords';


const routes = [
  ...devRecords,
  ...pageRouterRecords, 
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