<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onBeforeUpdate, computed, ref, defineProps } from 'vue';
import type { Ref } from 'vue';
import type { ArticleRecordsPack } from '@/template/contents_local/_classes'
import { useFrameStore } from '@/template/styles/frame/_store';
import { useLocalContents } from '@/template/contents_local';
const { articles } = useLocalContents();
const frameStore = useFrameStore();


const props = defineProps<{
  title: string;
  titleSize: number;
  titleDivider: 'none' | 'bottom' | 'side';
  titleDividerWidth: number;

  articleListName: string;
  articleCardName: string;
  articleCardRoundness: number;
  articlesArray: Array<ArticleRecord>;

  showAdsInList: number;
  adSizes: AdSizeByScale
}>();



</script>



<template>
<section class="article-list-and-ad-tower">

  <section class="articles-wrapper">

    <Title-PageSection 
    class="title-pagesection"
    :text="title" 
    :size="titleSize" 
    :divider="titleDivider" 
    :dividerWidth="titleDividerWidth"/>

    <List_ArticleCards 
    class="list-articlecards"
    :name="articleListName" 
    :cardName="articleCardName" 
    :cardRoundness="articleCardRoundness" 
    :articles="articlesArray"
    :showAds="showAdsInList" 
    :adSizes="adSizes"/>
  </section>

  <aside class="ad-tower-wrapper"></aside>

</section>
</template>


<style lang="scss">




</style>