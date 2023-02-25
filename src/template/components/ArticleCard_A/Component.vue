<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { useFrameStore } from '@/template/styles/frame/_store';
const frameStore = useFrameStore();

const showHeadCategoryInfo = computed(() => /--L|--XL|--XXL/.test(frameStore.appScale))
const props = defineProps<{
  article: ArticleRecord;
}>();
</script>

<template>
<!-- ArticleCard_A -->
<RouterLink class="article-card-a" :to="props.article.uri">

  <div class="imagebox">
    <img :src="props.article.coverImage" alt="">
  </div>
  <div class="textbox">
    <Article_InfoPack id="info-head" v-show="showHeadCategoryInfo" :article="props.article" :size="12" :showReadingTime="false" :showDate="false" :showCategory="true"/>

    <h1 class="title">{{ props.article.title }}</h1>
    <p class="description">{{ props.article.description }}</p>

    <Article_InfoPack id="info-tail" :article="props.article" :size="12" :showReadingTime="true" :showDate="true" :showCategory="!showHeadCategoryInfo"/>
  </div>

  <Plate/>
</RouterLink>

</template>