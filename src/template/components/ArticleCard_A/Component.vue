<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { useFrameStore } from '@/template/styles/frame/_store';
const frameStore = useFrameStore();

const showHeadCategoryInfo = computed(() => /--L|--XL|--XXL/.test(frameStore.appScale))

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
  article: ArticleRecord
}>();

</script>

<template>
<RouterLink class="article-card-a" :to="article.uri">

      
  <div class="imagebox">
    <img :src="article.coverImage" alt="">
  </div>
  <div class="textbox">
      <Article_InfoPack id="info-head" v-show="showHeadCategoryInfo" :article="article" :size="12" :showReadingTime="false" :showDate="false" :showCategory="true"/>

      <h1 class="title">{{ article.title }}</h1>
      <p class="description">{{ article.description }}</p>

      <Article_InfoPack id="info-tail" :article="article" :size="infoPackSize" :showReadingTime="true" :showDate="true" :showCategory="!showHeadCategoryInfo"/>
    </div>


  <Plate/>
</RouterLink>

</template>