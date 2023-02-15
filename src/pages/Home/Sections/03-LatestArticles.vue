<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onBeforeMount, computed, ref, defineProps } from 'vue';
import { useFrameStore } from '@/template/styles/frame/_store';
import { useLocalContents } from '@/template/contents_local';

const props = defineProps<{
  displayArticleNumber: number;
  pageNumberSlice: number;
  mobilePageDisplayNumber: number;
}>();

const route = useRoute()
const pageNum = computed(() => {
  const num = Number(route.params.pagenum);
  if (num === 0) return 1;
  else return num;
});

const { articles } = useLocalContents();
const pagedArticles = ref(articles.getPaged(props.displayArticleNumber, pageNum.value));
if (pagedArticles.value.array.length === 0) {
  // TODO : NO CONTENTS. REDIRECT.
}

console.log(`Paged Articles:`, pagedArticles.value.array);



</script>




<template>
<section id="latest-articles-wrapper">

  <Title-PageSection text="Latest Articles" :size="20" divider="bottom" :dividerWidth="3"/>

  <List_ArticleCards id="latest-articles-list" 
  name="latest" cardName="ArticleCard_A" :cardRoundness="0" 
  :articles="pagedArticles.array"
  :showAds="2" :adWidth="300" :adHeight="300"/>

  <Title-PageSection text="" :size="20" divider="bottom" :dividerWidth="3"/>
  
  <PageNav rootUri="" :totalPage="42" :currentPage="pageNum" :pageNumberSlice="pageNumberSlice" :mobilePageDisplayNumber="mobilePageDisplayNumber" prevButtonName="◀︎ PREV" nextButtonName="NEXT ▶︎" :roundness="0"/>

</section>
</template>


<style lang="scss">
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
  width: 100%;
  padding: 0 var(--side-gap);
  #latest-articles-list {
    display: flex;
    flex-direction: column;
    gap: var(--items-gap);
  }
}
</style>