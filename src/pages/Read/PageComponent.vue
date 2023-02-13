<script setup lang="ts">
import { defineProps, computed, ref } from 'vue';
import { useRoute } from 'vue-router'
import { article } from '@/template/contents';

const route = useRoute()

// const isValidDocId = (route.params.docuri as string) in article.package.

</script>

<template>
<div id="router-page" class="read">
    
  <h1> {{ $route.params.docuri }}</h1>

  <main>

    <component 
    :is='$route.params.docuri'/>

  </main>

</div>
</template>
