<script setup lang="ts">
import { useFrameStore } from '@/template/styles/frame/_store';
import { makeElementDraggable } from '@/template/composables/makeElementDraggable';

const frameStore = useFrameStore();
makeElementDraggable('dev-status-bar', 'dev-status-bar-draghandle');
</script>

<template>
  <!-- DevStatusBar -->
  <aside id="dev-status-bar">
    <div id="dev-status-bar-draghandle">
      <Icon name="drag_indicator" :size="24"/>
    </div>
    <p class="typo-caption-16 --bold">DEV-STATUS-BAR</p>
    <p class="typo-caption-12">VW : {{ frameStore.viewWidth }}</p>
    <p class="typo-caption-12">{{ frameStore.appScale }}</p>
    <p class="typo-caption-12">Device: {{ frameStore.userDevice }} {{ frameStore.userBrowser }} {{ frameStore.appRotation.split("--")[1] }}</p>
  </aside>
</template>