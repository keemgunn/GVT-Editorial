import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './app/App.vue';
import { router } from './app/router';

// ====== MAIN APP CONTAINER
const app = createApp(App)

// ====== STORE
app.use(createPinia())

// ====== ROUTER
app.use(router)
  

// ====== GLOBAL DECLARATION FOR
//    TEMPLATE COMPONENTS
import { templateAtoms } from '@/template';
for (const key of Object.keys(templateAtoms)) {
  app.component(key, templateAtoms[key])
}
import { templateElements } from '@/template';
for (const key of Object.keys(templateElements)) {
  app.component(key, templateElements[key])
}
import { templateComponents } from '@/template';
for (const key of Object.keys(templateComponents)) {
  app.component(key, templateComponents[key])
}

app.mount('#app')