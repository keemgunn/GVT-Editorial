<script setup lang="ts">
import { ref, defineProps, watch } from 'vue';
import { useLocalContents } from '@/template/contents_local';
const { articles } = useLocalContents();

const props = defineProps<{
  articlesPerPage: number;
}>();

const latestArticles = ref(articles.query(undefined, undefined, undefined, props.articlesPerPage));

articles.pageContext.onPageChange(() => {
  latestArticles.value = articles.query(undefined, undefined, undefined, props.articlesPerPage);
})

const adSizes = {
  XXS: { width: 300, height: 250 },
  XS: { width: 300, height: 250 },
  S: { width: 468, height: 60 },
  M: { width: 728, height: 90 },
  L: { width: 970, height: 90 },
  XL: { width: 970, height: 90 },
  XXL: { width: 970, height: 90 },
} satisfies AdSizeByScale
</script>


<template>
<section id="latest-articles-wrapper">

  <Title-PageSection text="Latest Articles" :size="20" divider="bottom" :dividerWidth="3"/>

  <List_ArticleCards id="latest-articles-list" 
  name="latest" cardName="ArticleCard_A" :cardRoundness="0" 
  :articles="latestArticles.array"
  :showAds="2" :adSizes="adSizes"/>

  <Title-PageSection text="" :size="20" divider="bottom" :dividerWidth="3"/>
  
  <PageNav rootUri="" 
  prevButtonName="◀︎ PREV" 
  nextButtonName="NEXT ▶︎" 
  :roundness="0"/>

</section>
</template>


<style lang="scss">
/** @/pages/Home/Sections/03-LatestArticles */
:is(.scale--XXL, .scale--XL, .scale--L) .home #latest-articles-wrapper {
  --items-gap: 36rem;
}
:is(.scale--M) .home #latest-articles-wrapper {
  --items-gap: 32rem;
}
:is(.scale--S) .home #latest-articles-wrapper {
  --items-gap: 30rem;
}
:is(.scale--XS, .scale--XXS) .home #latest-articles-wrapper {
  --items-gap: 24rem;
  --side-gap: 24rem;
}

.home #latest-articles-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--items-gap);
  padding: 0 var(--side-gap);
  #latest-articles-list {
    display: flex;
    flex-direction: column;
    gap: var(--items-gap);
    li.ad { align-self: center; }
  }
}
</style>