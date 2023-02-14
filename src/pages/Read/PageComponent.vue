<script setup lang="ts">
import { defineProps, computed, ref, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { useLocalContents } from '@/template/contents_local';

const { reader } = useLocalContents();
const router = useRouter();
const docURI = useRoute().params.docuri.toString();
const fullURI = reader.getComponentName(docURI);

onBeforeMount(() => {
  if (fullURI.length === 0) {
    console.warn("NO DOC");
    router.replace('/not-found')
  }
})
</script>

<template>
<div id="router-page" class="read">
    
  <h1> {{ docURI }}</h1>

  <main>
    <component 
    :is='fullURI'/>
  </main>

</div>
</template>
