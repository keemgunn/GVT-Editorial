<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { useFrameStore } from '@/template/styles/frame/_store';
import { getRoundStyle } from '@/template/styles/shapes'
const frameStore = useFrameStore();

const props = defineProps<{
  article: ArticleRecord;
  trendingIndex: number;
  roundness: number;
}>();

const containerRoundness = getRoundStyle(props.roundness);
</script>

<template>
<RouterLink class="article-card-trending-a" :to="article.uri" :style="containerRoundness">

  <div class="imagebox">
    <img :src="article.coverImage" alt="">
    <p class="trending-index">{{ "0" + trendingIndex }}</p>
  </div>

  <div class="textbox">
    <h1 class="title">{{ article.title }}</h1>
    <Article_InfoPack id="info-tail" :article="article" :size="12" :showReadingTime="false" :showDate="false" :showCategory="true"/>
  </div>

  <Plate :roundness="roundness"/>
</RouterLink>

</template>