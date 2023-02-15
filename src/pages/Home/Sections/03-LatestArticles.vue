<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onBeforeMount, computed, ref, defineProps } from 'vue';
import { useFrameStore } from '@/template/styles/frame/_store';
import { useLocalContents } from '@/template/contents_local';

const props = defineProps<{
  displayArticleNumber: number;
}>();

const route = useRoute()
const param = Number(route.params.pagenum);
const pageNum = param === 0 ? 1 : param;

const { articles } = useLocalContents();
const pagedArticles = ref(articles.getPaged(props.displayArticleNumber, pageNum));
if (pagedArticles.value.array.length === 0) {
  // TODO : NO CONTENTS. REDIRECT.
}

console.log(`Paged Articles:`, pagedArticles.value.array);

// // REACTIVE TEST
// onBeforeMount(() => {
//   setTimeout(() => {
//     pagedArticles.value.sortAsc("title");
//   }, 3000)
// })

</script>




<template>
<section id="latest-articles-wrapper">

  <Title-PageSection text="Latest Articles" :size="20" divider="bottom" :dividerWidth="3"/>

  <List_ArticleCards id="latest-articles-list" 
  name="latest" cardName="ArticleCard_A" :cardRoundness="0" 
  :articles="pagedArticles.array"
  :showAds="2" :adWidth="300" :adHeight="300"/>

  <!-- PAGING -->

</section>
</template>


<style lang="scss">
:is(.scale--XXL, .scale--XL, .scale--L) #latest-articles-wrapper {
  --items-gap: 36rem
}
:is(.scale--M) #latest-articles-wrapper {
  --items-gap: 32rem
}
:is(.scale--S) #latest-articles-wrapper {
  --items-gap: 30rem
}
:is(.scale--XS, .scale--XXS) #latest-articles-wrapper {
  --items-gap: 24rem
}

#latest-articles-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--items-gap);
  width: 100%;
  #latest-articles-list {
    display: flex;
    flex-direction: column;
    gap: var(--items-gap);
  }
}
</style>