<script setup lang="ts">
import { inject } from 'vue';
import { RouterView } from 'vue-router'
import { useFrame } from './styles/frame';
import { useTheme } from './styles/theme';
import configs from './configs';

import BlogFloatingActions from './compositions/BlogFloatingActions/BlogFloatingActions.vue';
import DEV_Nav from './dev/components/DEV_Nav.vue';

// =================== PROCESS ENV
const process_env = inject('process_env');

// =================== Template User Configurations
const { NAV_BAR } = configs.template;

// =================== CSS FILES
// For some reason, vite-plugin-sass-glob-import doesn't work in Vite Build process. 
// So I made an python script that collects all .scss files using glob, and write 'main.scss'file in following directory.
// And run this script everytime before Build process.
import('./main.scss')

// =================== COMPOSABLES
useFrame();
useTheme();
</script>

<!-- Layout of the #app depends on what kind of NavBar you're implementing. Change Settings on '@/configs/templateConfigs' -->
<template>
  <template v-if=" process_env !== 'DEV_2'">
    <template v-if="NAV_BAR.name == 'NavBar_HorizonLinks'">
      <component :is="NAV_BAR.name"/>
  
      <RouterView/>
      <BlogFloatingActions/>
      <Toaster/>
    </template>
    
    
    <template v-if="NAV_BAR.name == 'NavBar_App'">
      <component :is="NAV_BAR.name"/>
      <RouterView/>
      <StatusBar/>
    </template>
    
    <DevStatusBar v-if=" process_env === 'DEV_1'"/>
    <!-- <div id="browser-head-cover"></div> -->
  </template>

  <template v-else>
  <!-- PROCESS_ENV === DEV_2 -->
    <div id="dev-container">
      <DEV_Nav/>
      <RouterView/>
      <!-- <DevStatusBar/> -->
      <Toaster/>
    </div>
  </template>
</template>

<style lang="scss">
  // ==== IMPORT Material Symbols
  @import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200");

  #browser-head-cover {
    position: fixed;
    width: 100vw;
    height: 400rem;
    top: -400rem;
    left: 0;
  }

  #dev-container {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: fit-content;
  }


</style>

<style src="@vueform/slider/themes/default.css"></style>