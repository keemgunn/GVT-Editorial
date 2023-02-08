<script setup lang="ts">
import { defineProps, computed, ref } from 'vue';
import { useRoute } from 'vue-router'
import { useContentsStore } from '@/template/stores/contents';

const route = useRoute()
const contents = useContentsStore();

const isValidDocId = contents.articleList.includes(route.params.docid as string)

</script>

<template>
<div id="router-page" class="read">
    
  <h1> {{ $route.params.docid }}</h1>

  <main>

    <component 
    v-if="isValidDocId" 
    :is='$route.params.docid'/>

  </main>

</div>
</template>
