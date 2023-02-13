<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onBeforeMount, computed } from 'vue';
import { useFrameStore } from '@/template/styles/frame/_store';
import { article } from '@/template/contents';
import FeaturedArticles from './Sections/01-FeaturedArticles.vue';
import TrendingArticles from './Sections/02-TrendingArticles.vue';
import { toNumber } from '@vue/shared';


const DISPLAY_ARTICLE_NUMBER = 10 ;


const route = useRoute()
const param = Number(route.params.pagenum);
const pageNum = param === 0 ? 1 : param;
const totalArticlesNumber = article.package.array.length;
const pagedArticles = article.package.getPagedArticles(DISPLAY_ARTICLE_NUMBER, pageNum);
if (pagedArticles.array.length === 0) {
  // NO CONTENTS. REDIRECT.
}

console.log(pagedArticles.array);

</script>

<template>
<div id="router-page" class="home">

  <main>
    <section id="highlighted-articles">
      <FeaturedArticles/>
      <TrendingArticles/>
    </section>
    <section id="all-articles">
      <section id="latest-articles">
        <List_Articles :pagedArticles="pagedArticles" :showAds="true"/>
        <!-- PAGING -->
      </section>
      <!-- ad -->
    </section>
  </main>

  <footer id="footer-info"></footer>

</div>
</template>
