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
<!-- PAGE : READ -->
<div id="router-page" class="read">

  <main>
    <component 
    :is='fullURI'/>
  </main>

</div>
</template>
