<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useFrame } from './styles/frame';
import { useTheme } from './styles/theme';

// =================== CSS FILES
import('./main.scss')

// =================== COMPOSABLES
useFrame();
useTheme();
</script>

<template>

  <!-- for Navigation between Views -->
  <!-- <NavBar_App/> -->
  <NavBar_Editorial/>



  

  <RouterView/> <!-- #view: div -->
    <!-- header: Main Actions -->
    <!-- main: Main Contents -->
        <!-- sections ... -->
    <!-- footer: Other Actions -->

  <StatusBar/> <!-- #status-bar: aside -->

  
</template>

<style lang="scss">
  // ==== IMPORT Material Symbols
  @import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200");
</style>