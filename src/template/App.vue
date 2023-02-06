<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useFrame } from './styles/frame';
import { useTheme } from './styles/theme';
import { useFrameStore } from './styles/frame/_store';
const appType = useFrameStore().templateSettings.appType;

// =================== CSS FILES
import('./main.scss')

// =================== COMPOSABLES
useFrame();
useTheme();
</script>

<template>

  <template v-if="appType == 'editorial'">
    <NavBar_Editorial/>
    <RouterView/>
  </template>

  <template v-if="appType == 'app'">
    <NavBar_App/>
    <RouterView/>
    <StatusBar/>
  </template>

</template>

<style lang="scss">
  // ==== IMPORT Material Symbols
  @import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200");
</style>