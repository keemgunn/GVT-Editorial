<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue';
import { useLocalContents } from '@/template/contents_local';
import FeaturedArticles from './Sections/01-FeaturedArticles.vue';
import TrendingArticles from './Sections/02-TrendingArticles.vue';
import ArticleList_AdTower from '@/template/compositions/ArticleList_AdTower.vue/ArticleList_AdTower.vue';


const ARTICLE_PER_PAGE = 10; // DO NOT CHANGE YET


const route = useRoute()
const pageNum = computed(() => {
  return Number(route.params.pagenum);
});


const { articles } = useLocalContents();
const latestArticles = ref(articles.query(undefined, undefined, undefined, ARTICLE_PER_PAGE));
articles.pageContext.onPageChange(() => {
  latestArticles.value = articles.query(undefined, undefined, undefined, ARTICLE_PER_PAGE);
})

const articleListAdSizes = {
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
<div id="router-page" class="home">

  <main>
    <section id="highlighted-articles">
      <FeaturedArticles/>
      <TrendingArticles/>
    </section>

    <ArticleList_AdTower
    title="Latest Articles" 
    :titleSize="20" 
    :titleDivider="'bottom'"
    :titleDividerWidth="3"
    articleCardName="ArticleCard_A"
    :articleCardRoundness="0"
    :articlesArray="latestArticles.array"
    :showAdsInList="2"
    :adSizes="articleListAdSizes"
    rootUri=""
    />
  </main>

  <footer id="footer-info"></footer>

</div>
</template>
