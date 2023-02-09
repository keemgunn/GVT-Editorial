<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useFrameStore } from '@/template/styles/frame/_store';
const frameStore = useFrameStore();



</script>

<template>
<div id="router-page" class="tags">
    
  <header id="main-actions"> this is header </header>
  
  <main>
    <p class="typo-body-16">userAgent : {{ frameStore.userAgent }}</p>

  </main>

  <footer id="other-actions"></footer>

</div>
</template>