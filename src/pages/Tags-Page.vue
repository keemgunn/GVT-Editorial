<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useFrameStore } from '@/template/styles/frame/_store';
import { useInteractionStore } from '@/template/stores/interaction';

const frameStore = useFrameStore();
const interactionStore = useInteractionStore();

const pageName = "Tags";
onBeforeMount(() => {
  interactionStore.currentPage = pageName;
})
</script>

<template>
<div id="router-page" class="tags">
    
  <header id="main-actions"> this is header </header>
  
  <main>
    <p class="typo-body-16">userAgent : {{ frameStore.userAgent }}</p>

    <RouterLink_VstackNest 
    title="Test" 
    uri="/tags" 
    icon="home" 
    :majorLinkSize="15"
    :subLinkSize="13"
    :subLinks="[]"/>

  </main>

  <footer id="other-actions"></footer>

</div>
</template>

<style lang="scss">
  #app #router-page.tags main .router-link-vstack-nest {
    width: 80rem;
    height: 40rem;
  }
</style>