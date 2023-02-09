<script setup lang="ts">
import { defineProps, computed, ref } from 'vue';
import { useRoute } from 'vue-router'
import { useContents } from '@/template/contents'

const route = useRoute()
const { article } = useContents();

const isValidDocId = (route.params.docuri as string) in article.records

</script>

<template>
<div id="router-page" class="read">
    
  <h1> {{ $route.params.docuri }}</h1>

  <main>

    <component 
    v-if="isValidDocId" 
    :is='$route.params.docuri'/>

  </main>

</div>
</template>
