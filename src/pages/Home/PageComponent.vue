<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onBeforeMount, computed, ref } from 'vue';
import { useFrameStore } from '@/template/styles/frame/_store';
import { useLocalContents } from '@/template/contents_local';
import FeaturedArticles from './Sections/01-FeaturedArticles.vue';
import TrendingArticles from './Sections/02-TrendingArticles.vue';
import LatestArticles from './Sections/03-LatestArticles.vue';


const ARTICLE_PER_PAGE = 10; // DO NOT CHANGE YET

// For Page Nav ========
const PAGE_NUMBER_SLICE = 5; 
const MOBILE_PAGE_DISPLAY_NUM = 7; 



const route = useRoute()
const pageNum = computed(() => {
  return Number(route.params.pagenum);
});

</script>

<template>
<div id="router-page" class="home">

  <main>
    <section id="highlighted-articles">
      <FeaturedArticles/>
      <TrendingArticles/>
    </section>

    <section id="all-articles">
      <LatestArticles  id="latest-articles-wrapper" :pageNumberSlice="PAGE_NUMBER_SLICE" :mobilePageDisplayNumber="MOBILE_PAGE_DISPLAY_NUM" :articlePerPage="ARTICLE_PER_PAGE"/>
      <aside id="ad-tower"></aside>
    </section>


  </main>

  <footer id="footer-info"></footer>

</div>
</template>
