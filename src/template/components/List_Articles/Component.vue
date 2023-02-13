<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  name: string;
  componentName: string;
  articles: Array<ArticleRecord>;
  showAds: boolean;
}>();
 
</script>

<template>
<ul>
  <li v-for="article in articles" :id="`list-${name}-${article.uri}`">
    <component :is="componentName" :article="article"/>
  </li>
</ul>
</template>