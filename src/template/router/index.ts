import { createRouter, createWebHistory } from 'vue-router'
import { pageRecords } from '@/template/router/_pageRecords';
import { errorRecords, devRecords } from './_otherRecords';



const routes = [
  ...devRecords,
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