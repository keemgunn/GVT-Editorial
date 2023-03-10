import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { router } from '#/router';
import { createHead } from '@vueuse/head';
import App from './App.vue';

// ====== MAIN APP CONTAINER
const app = createApp(App);

// ====== STORE
app.use(createPinia());

// See(https://www.npmjs.com/package/@vueuse/head)
app.use(createHead());

// ====== GLOBAL DECLARATION FOR
//    TEMPLATE COMPONENTS
import templateAtoms from '#/atoms';
for (const key of Object.keys(templateAtoms)) {
  app.component(key, templateAtoms[key])
}
import templateBlocks from '#/blocks';
for (const key of Object.keys(templateBlocks)) {
  app.component(key, templateBlocks[key])
}
import { componentModules } from '#/components';
for (const key of Object.keys(componentModules)) {
  app.component(key, componentModules[key])
}

// ====== GLOBAL DECLARATION FOR
//    USER CUSTOM COMPONENTS
import customComps from '@/customComponents';
for (const key of Object.keys(customComps)) {
  app.component(key, customComps[key])
}

// ====== GLOBAL DECLARATION FOR
//    Markdown COMPONENTS
import { markdownComponents } from '#/contents_local/component';
for (const key of Object.keys(markdownComponents)) {
  app.component(key, markdownComponents[key])
}

// ====== DEV SETTINGS
const process_env = (process.env.NODE_ENV) as string;
app.provide('process_env', process_env);

// ====== ROUTER
app.use(router);


// ====== FINALLY, MOUNT
app.mount('#app');