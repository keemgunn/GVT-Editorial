<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { useFrameStore } from '#/styles/frame/_store';
const frameStore = useFrameStore();

const props = defineProps<{
  article: ArticleRecord;
  trendingIndex: number;
}>();
</script>

<template>
<!-- ArticleCard_Trending_A -->
<RouterLink class="article-card-trending-a" :to="article.uri">

  <div class="imagebox">
    <img :src="article.coverImage" alt="">
    <p class="trending-index">{{ "0" + trendingIndex }}</p>
  </div>

  <div class="textbox">
    <h1 class="title">{{ article.title }}</h1>
    <Article_InfoPack id="info-tail" :article="article" :size="12" :showReadingTime="false" :showDate="false" :showCategory="true"/>
  </div>

  <Plate/>
</RouterLink>

</template>