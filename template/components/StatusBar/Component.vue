<script setup lang="ts">
import { useFrameStore } from '#/styles/frame/_store';
const frameStore = useFrameStore();
</script>

<template>
  <!-- StatusBar -->
  <aside id="status-bar">
    <p class="typo-caption-12">{{ frameStore.appScale }}</p>
    <p class="typo-caption-12">Device: {{ frameStore.userDevice }} {{ frameStore.userBrowser }} {{ frameStore.appRotation.split("--")[1] }}</p>
    <Plate/>
  </aside>
</template>
