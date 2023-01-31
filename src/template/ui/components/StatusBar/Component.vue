<script setup lang="ts">
import { useFrameStore } from '@/template/styles/frame/store';
import { templateAtoms } from '@/template';
const Plate = templateAtoms.Plate;
const frameStore = useFrameStore();
</script>

<template>
  <aside id="status-bar">
    <p class="typo-caption-12">{{ frameStore.appScale }}</p>
    <p class="typo-caption-12">Device: {{ frameStore.userDevice }} {{ frameStore.userBrowser }} {{ frameStore.appRotation.split("--")[1] }}</p>
    <Plate/>
  </aside>
</template>
