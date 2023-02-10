<script setup lang="ts">
import { useFrameStore } from '@/template/styles/frame/_store';
const frameStore = useFrameStore();
</script>

<template>
  <aside id="dev-status-bar">
    <p class="typo-caption-16 --bold">DEV-STATUS-BAR</p>
    <p class="typo-caption-12">{{ frameStore.appScale }}</p>
    <p class="typo-caption-12">Device: {{ frameStore.userDevice }} {{ frameStore.userBrowser }} {{ frameStore.appRotation.split("--")[1] }}</p>
  </aside>
</template>