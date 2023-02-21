<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { useFrameStore } from '@/template/styles/frame/_store';
import { getRoundStyle } from '@/template/styles/shapes'
const frameStore = useFrameStore();

const infoPackSize = computed(() => {
  const scale = frameStore.appScale.split('--')[1];
  switch (scale) {
    case 'S':
    return 10
    break;
  default:
    return 12
    break;
  }
})

const props = defineProps<{
  article: ArticleRecord;
}>();
</script>

<template>
<!-- ArticleCard_A -->
<RouterLink class="article-card-searched-a" :to="article.uri">

  <div class="imagebox">
    <img :src="article.coverImage" alt="">
  </div>
  <div class="textbox">
    <h1 class="title" v-html="article.title"></h1>

    <Article_InfoPack id="info-tail" :article="article" :size="15" :showReadingTime="true" :showDate="true" :showCategory="true"/>
    
    <p class="raw" v-html="article.raw" v-show="article.raw.length"></p>

  </div>

  <Plate/>
</RouterLink>

</template>