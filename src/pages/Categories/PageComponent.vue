<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { useFrameStore } from '@/template/styles/frame/_store';

const frameStore = useFrameStore();





</script>

<template>
<div id="router-page" class="home">

  
  <main>
    <p class="typo-body-16">userAgent : {{ frameStore.userAgent }}</p>

    <h1>This is an HOME</h1>

    <div class="some-example">
      <Plate :roundness="0"/>
      <p class="typo-header-28">Something!</p>
    </div>
  </main>

  <footer id="other-actions"></footer>

</div>
</template>
