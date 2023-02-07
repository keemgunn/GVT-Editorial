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
import templateAtoms from '@/template/atoms';
for (const key of Object.keys(templateAtoms)) {
  app.component(key, templateAtoms[key])
}
import templateComponents from '@/template/components';
for (const key of Object.keys(templateComponents)) {
  app.component(key, templateComponents[key])
}

// ====== DEV SETTINGS

const process_env = Number(process.env.NODE_ENV || "0") as number;
app.provide('process_env', process_env);

import devPages from '@/template/devComps/pages';
import devComps from '@/template/devComps/components';
if (process_env > 0) {
  for (const key of Object.keys(devPages)) {
    app.component(key, devPages[key])
  }
  for (const key of Object.keys(devComps)) {
    app.component(key, devComps[key])
  }
}

app.mount('#app')