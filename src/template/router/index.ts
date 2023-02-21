import { createRouter, createWebHistory } from 'vue-router'
import { onMounted } from 'vue';
import { pageRouterRecords } from '@/template/router/_pageRecords';
import { errorRecords, devRecords } from './_otherRecords';


const routes = [
  ...devRecords,
  ...pageRouterRecords, 
  ...errorRecords,
]

console.log('ROUTER RECORDS:', routes);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash.includes('#')) {
      return {
        el: to.hash,
        // top: -200,
        // behavior: 'smooth',
      }
    }
    else {
      return { top: 0 }
    }
  },
})

router.afterEach((to, from) => {
  const fromPage = from.path.split('/')[1] || 'home';
  const toPage = to.path.split('/')[1] || 'home';
  document.body.classList.remove(`page--${fromPage}`);
  document.body.classList.add(`page--${toPage}`);
})

export {
  router
}