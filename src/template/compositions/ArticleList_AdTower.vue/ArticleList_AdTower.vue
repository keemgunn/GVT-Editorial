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

  articleCardName: string;
  articleCardRoundness: number;
  articlesArray: Array<ArticleRecord>;

  showAdsInList: number;
  adSizes: AdSizeByScale;

  adTowerAdCount: number;

  pageURI: string;
}>();

const articleListName = computed(() => {
  return props.title.replace(/ /gi, "")
})

const showAdTower = computed(() => /--S|--M|--L|--XL|--XXL/.test(frameStore.appScale))

const AdSizes = {
  XXS: { width: 300, height: 250 },
  XS: { width: 300, height: 250 },
  S: { width: 160, height: 600 },
  M: { width: 160, height: 600 },
  L: { width: 300, height: 600 },
  XL: { width: 300, height: 600 },
  XXL: { width: 300, height: 600 },
} satisfies AdSizeByScale
</script>



<template>
<section class="article-list-and-ad-tower">

  <section class="articles-wrapper">
    <Title_PageSection 
    class="title"
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

    <Title_PageSection 
    class="bottom-divider"
    text="" 
    :size="20" 
    divider="bottom" 
    :dividerWidth="titleDividerWidth"/>

    <PageNav :pageURI="pageURI" 
    prevButtonName="◀︎ PREV" 
    nextButtonName="NEXT ▶︎"/>
  </section>

  <AdTower
  v-show="showAdTower" 
  class="ad-tower" 
  :AdSizes="AdSizes" 
  :AdCount="adTowerAdCount" 
  />

</section>
</template>


<style lang="scss">
/** @/template/compositions/ArticleList_AdTower.vue */

:is(.scale--XXL, .scale--XL, .scale--L) #app 
.article-list-and-ad-tower {
  --container-direction: row;
  --container-vertical-padding: 74rem;
  --container-gap: 30rem;
  --items-gap: 36rem;
  --ad-tower-width: 300rem;
  
}
:is(.scale--M) #app 
.article-list-and-ad-tower {
  --container-direction: row;
  --container-vertical-padding: 68rem;
  --container-gap: 30rem;
  --items-gap: 32rem;
  --ad-tower-width: 160rem;
  
}
:is(.scale--S) #app 
.article-list-and-ad-tower {
  --container-direction: row;
  --container-vertical-padding: 50rem;
  --container-gap: 30rem;
  --items-gap: 30rem;
  --ad-tower-width: 160rem;
  
}
:is(.scale--XS, .scale--XXS) #app 
.article-list-and-ad-tower {
  --container-direction: column;
  --container-vertical-padding: 50rem;
  --container-gap: 38rem;
  --items-gap: 24rem;
  --ad-tower-width: 100%;
}


#app .article-list-and-ad-tower {
  align-self: center;
  display: flex;
  flex-direction: var(--container-direction);
  justify-content: center;
  gap: var(--container-gap);
  width: var(--contents-container-width);
  height: fit-content;
  padding: 
    var(--container-vertical-padding)
    var(--contents-side-padding);
}


#app .article-list-and-ad-tower 
.articles-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--items-gap);
  width: 100%;
  flex-shrink: 1;
  min-width: 0;

  .list-articlecards {
    display: flex;
    flex-direction: column;
    gap: var(--items-gap);
    li.ad { 
      align-self: center; 
    }
  }
}
#app .article-list-and-ad-tower 
.ad-tower {
  width: var(--ad-tower-width);
  flex-shrink: 0;
}



</style>