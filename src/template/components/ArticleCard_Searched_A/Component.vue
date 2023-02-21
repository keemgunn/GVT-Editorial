<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { useFrameStore } from '@/template/styles/frame/_store';
import { getRoundStyle } from '@/template/styles/shapes'
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
  rawArticle: ArticleRawRecord;
}>();
</script>

<template>
<!-- ArticleCard_Searched_A -->
<RouterLink class="article-card-searched-a" :to="rawArticle.articleRecord.uri">

  <div class="imagebox">
    <img :src="rawArticle.articleRecord.coverImage" alt="">
  </div>
  <div class="textbox">
    <Article_InfoPack id="info-head" v-show="showHeadCategoryInfo" :article="rawArticle.articleRecord" :size="12" :showReadingTime="false" :showDate="false" :showCategory="true"/>

    <h1 class="title">{{ rawArticle.articleRecord.title }}</h1>
    <p class="description">{{ rawArticle.articleRecord.description }}</p>

    <Article_InfoPack id="info-tail" :article="rawArticle.articleRecord" :size="12" :showReadingTime="true" :showDate="true" :showCategory="!showHeadCategoryInfo"/>
  </div>


  <Plate/>
</RouterLink>

</template>