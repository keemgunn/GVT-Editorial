import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { router } from './template/router';
import App from './template/App.vue';

// ====== MAIN APP CONTAINER
const app = createApp(App)

// ====== STORE
app.use(createPinia())

// ====== ROUTER
app.use(router)
  

// ====== GLOBAL DECLARATION FOR
//    TEMPLATE COMPONENTS
import templateAtoms from '@/template/ui/atoms';
for (const key of Object.keys(templateAtoms)) {
  app.component(key, templateAtoms[key])
}
import templateBlocks from '@/template/ui/blocks';
for (const key of Object.keys(templateBlocks)) {
  app.component(key, templateBlocks[key])
}
import templateComponents from '@/template/ui/components';
for (const key of Object.keys(templateComponents)) {
  app.component(key, templateComponents[key])
}

app.mount('#app')