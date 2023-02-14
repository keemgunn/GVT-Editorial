<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onBeforeMount, computed, ref } from 'vue';
import { useFrameStore } from '@/template/styles/frame/_store';
import { useLocalContents } from '@/template/contents_local';
import FeaturedArticles from './Sections/01-FeaturedArticles.vue';
import TrendingArticles from './Sections/02-TrendingArticles.vue';
import LatestArticles from './Sections/03-LatestArticles.vue';


const DISPLAY_ARTICLE_NUMBER = 10 ;

const route = useRoute()
const param = Number(route.params.pagenum);
const pageNum = param === 0 ? 1 : param;

const { articles } = useLocalContents();
const pagedArticles = ref(articles.getPaged(DISPLAY_ARTICLE_NUMBER, pageNum));
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
<div id="router-page" class="home">

  <main>
    <section id="highlighted-articles">
      <FeaturedArticles/>
      <TrendingArticles/>
    </section>

    <section id="all-articles">
      <LatestArticles :display-article-number="DISPLAY_ARTICLE_NUMBER"/>
      <aside id="ad-tower"></aside>
    </section>
  </main>

  <footer id="footer-info"></footer>

</div>
</template>
