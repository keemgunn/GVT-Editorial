<script setup lang="ts">
import { inject } from 'vue';
import { RouterView } from 'vue-router'
import { useFrame } from './styles/frame';
import { useTheme } from './styles/theme';
import { useConfigs } from './stores/userConfigs';
import templateConfigs from '@/configs/template/templateConfigs';
import BlogFloatingActions from './compositions/BlogFloatingActions/BlogFloatingActions.vue';

// const aaaa: navBarName = 'NavBar_HorizonLinks';

// =================== PROCESS ENV
const process_env = inject('process_env');



// =================== Template User Configurations
const { navBar } = templateConfigs;



// =================== CSS FILES
// For some reason, vite-plugin-sass-glob-import doesn't work in Vite Build process. 
// So I made an python script that collects all .scss files using glob, and write 'main.scss'file in following directory.
// And run this script everytime before Build process.
import('./main.scss')




// =================== COMPOSABLES
useFrame();
useTheme();
</script>


<!-- Layout of the #app depends on what kind of NavBar you're implementing. Change Settings on '@/configs/template/templateConfigs' -->
<template>

  <template v-if="navBar.name == 'NavBar_HorizonLinks'">

    <component :is="navBar.name"/>
    <RouterView/>
    <BlogFloatingActions/>
    
    <DevStatusBar v-if=" process_env === 'DEV_1'"/>
  </template>
  
  
  <template v-if="navBar.name == 'NavBar_App'">
    <component :is="navBar.name"/>
    <RouterView/>
    <StatusBar/>
  </template>


  <div id="browser-head-cover"></div>

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
</style>