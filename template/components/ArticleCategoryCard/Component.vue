<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { useFrameStore } from '#/styles/frame/_store';

const frameStore = useFrameStore();
const props = defineProps<{
  name: string
  info: CategoryRecord
}>();

const accentColorStyle = computed(() => {
  return {
    "background-color": props.info.accentColor
  }
})

</script>


<template>
  <!-- ArticleCategoryCard -->
<RouterLink class="article-category-card"
:to="info.uri">


  <div class="accent-cover" :style="accentColorStyle"></div>

  <div class="solid-cover"></div>

  <div class="image-wrapper">
    <img :src="info.coverImage">
  </div>

  <h1 class="title">
    {{ name }}
  </h1>


</RouterLink>
</template>



