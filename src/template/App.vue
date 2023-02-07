<script setup lang="ts">
import { inject } from 'vue';
import { RouterView } from 'vue-router'
import { useFrame } from './styles/frame';
import { useTheme } from './styles/theme';
import { useConfigs } from './stores/userConfigs';


// =================== Template User Configurations
const { appType, EditorialSettings } = useConfigs().templateSettings;

const { NavBar } = EditorialSettings;


// =================== CSS FILES
import('./main.scss')


// =================== PROCESS ENV
const process_env = inject('process_env') as number;


// =================== COMPOSABLES
useFrame();
useTheme();
</script>



<template>
  <template v-if="process_env < 2">

    <template v-if="appType == 'editorial'">

      <component :is="NavBar"/>
      <RouterView/>

  
    <DevStatusBar v-if=" process_env > 0 "/>
    </template>
  
    <template v-if="appType == 'app'">
      <NavBar_App/>
      <RouterView/>
      <StatusBar/>
    </template>


  </template>
  <template v-if="process_env > 1">
    <RouterView/>
  </template>
</template>

<style lang="scss">
  // ==== IMPORT Material Symbols
  @import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200");
</style>