<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onBeforeUpdate, computed, ref, defineProps } from 'vue';
import type { Ref } from 'vue';
import type { ArticleRecordsPack } from '@/template/contents_local/_classes'
import { useFrameStore } from '@/template/styles/frame/_store';
import { useLocalContents } from '@/template/contents_local';
const frameStore = useFrameStore();
const { articles } = useLocalContents();

const props = defineProps<{
  articlePerPage: number;
  pageNumberSlice: number;
  mobilePageDisplayNumber: number;
}>();

const totalPage = articles.getTotalPageNumber(props.articlePerPage);

const route = useRoute()
const pageNum = computed(() => {
  const num = Number(route.params.pagenum);
  if (num === 0) return 1;
  else return num;
});

const pagedArticles: Ref<ArticleRecordsPack> = ref(articles.getPaged(props.articlePerPage, pageNum.value));




const adSize = computed(() => {
  const scale = frameStore.appScale.split('--')[1];
  switch (scale) {
    case 'XXS' || 'XS':
      return {
        width: 300, height: 250
      }
      break;
    case 'S':
      return {
        width: 468, height: 60
      }
      break;
    case 'M':
      return {
        width: 728, height: 90
      }
      break;
  default:
    return {
      width: 970, height: 90
    }
    break;
  }
})


onBeforeUpdate(() => {
  pagedArticles.value = articles.getPaged(props.articlePerPage, pageNum.value)
})
</script>




<template>
<section id="latest-articles-wrapper">

  <Title-PageSection text="Latest Articles" :size="20" divider="bottom" :dividerWidth="3"/>

  <List_ArticleCards id="latest-articles-list" 
  name="latest" cardName="ArticleCard_A" :cardRoundness="0" 
  :articles="pagedArticles.array"
  :showAds="2" :adWidth="adSize.width" :adHeight="adSize.height"/>

  <Title-PageSection text="" :size="20" divider="bottom" :dividerWidth="3"/>
  
  <PageNav rootUri="" :totalPage="totalPage" :currentPage="pageNum" :pageNumberSlice="pageNumberSlice" :mobilePageDisplayNumber="mobilePageDisplayNumber" prevButtonName="◀︎ PREV" nextButtonName="NEXT ▶︎" :roundness="0"/>

</section>
</template>


<style lang="scss">
/** @/pages/Home/Sections/03-LatestArticles */
:is(.scale--XXL, .scale--XL, .scale--L) #latest-articles-wrapper {
  --items-gap: 36rem;
}
:is(.scale--M) #latest-articles-wrapper {
  --items-gap: 32rem;
}
:is(.scale--S) #latest-articles-wrapper {
  --items-gap: 30rem;
}
:is(.scale--XS, .scale--XXS) #latest-articles-wrapper {
  --items-gap: 24rem;
  --side-gap: 24rem;
}

#latest-articles-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--items-gap);
  padding: 0 var(--side-gap);
  #latest-articles-list {
    display: flex;
    flex-direction: column;
    gap: var(--items-gap);
    // align-items: center;
    // li.article { width: 100%; }
    li.ad { align-self: center; }
  }
}
</style>