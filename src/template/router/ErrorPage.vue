<script setup lang="ts">
import { defineProps, computed, onBeforeMount } from 'vue';
import { useFrameStore } from '@/template/styles/frame/_store';
import { useInteractionStore } from '@/template/stores/interaction';
import { getReasonPhrase } from 'http-status-codes';

const frameStore = useFrameStore();

const props = defineProps<{
  code: number
}>();

const reasonPhrase = computed(() => getReasonPhrase(props.code))
</script>



<template>
<div id="router-page" class="home">
    
  <header id="main-actions"> this is header </header>
  
  <main>
    <p class="typo-body-16">userAgent : {{ frameStore.userAgent }}</p>

    <h1>Error: {{ reasonPhrase }}</h1>

  </main>

  <footer id="other-actions"></footer>

</div>
</template>
