<script setup lang="ts">
import { onBeforeMount, computed } from 'vue';
import { useFrameStore } from '#/styles/frame/_store';
import { useInteractionStore } from '#/stores/interaction';

const frameStore = useFrameStore();





</script>

<template>
<div id="router-page" class="home">
    
  <header id="main-actions"> this is header </header>
  
  <main>
    <p class="typo-body-16">userAgent : {{ frameStore.userAgent }}</p>

    <h1>This is an HOME</h1>

    <div class="some-example">
      <Plate/>
      <p class="typo-header-28">Something!</p>
    </div>
  </main>

  <footer id="other-actions"></footer>

</div>
</template>
