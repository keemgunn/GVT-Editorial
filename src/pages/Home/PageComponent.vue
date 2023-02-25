<script setup lang="ts">
import { ref } from 'vue';
import { useLocalContents } from '@/template/contents_local';
import FeaturedArticles from '@/template/compositions/BlogHomeSections/01-FeaturedArticles.vue';
import TrendingArticles from '@/template/compositions/BlogHomeSections/02-TrendingArticles.vue';
import TagsList from '@/template/compositions/BlogHomeSections/03-Tags.vue';
import ArticleList_AdTower from '@/template/compositions/ArticleList_AdTower.vue/ArticleList_AdTower.vue';


// -- 02 Trending Articles
const BREAK_FLEXGRID_WHEN = 1030;
// -- ArticleList AdTower
const ARTICLE_PER_PAGE = 10;
const AD_TOWER_AD_COUNT = 2;


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
      <TrendingArticles
        :BREAK_FLEXGRID_WHEN="BREAK_FLEXGRID_WHEN"/>
      <TagsList/>
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
    :adTowerAdCount="AD_TOWER_AD_COUNT"
    pageURI="/_PAGENUM_"
    />
  </main>

  <footer id="footer-info"></footer>

</div>
</template>
