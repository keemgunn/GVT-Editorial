import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { router } from './template/router';
import { createHead } from '@vueuse/head';
import App from './template/App.vue';

// ====== MAIN APP CONTAINER
const app = createApp(App);

// ====== STORE
app.use(createPinia());

// See(https://www.npmjs.com/package/@vueuse/head)
app.use(createHead());


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

// ====== GLOBAL DECLARATION FOR
//    USER CUSTOM COMPONENTS
import customComps from '@/customComponents';
for (const key of Object.keys(customComps)) {
  app.component(key, customComps[key])
}


// ====== GLOBAL DECLARATION FOR
//    Markdown COMPONENTS
import { markdownComponents } from '@/template/stores/contents';
for (const key of Object.keys(markdownComponents)) {
  app.component(key, markdownComponents[key])
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

// ====== ROUTER
app.use(router);

app.mount('#app');