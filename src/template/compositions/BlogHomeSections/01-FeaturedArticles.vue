<script setup lang="ts">
import { defineProps } from 'vue';
import { useLocalContents } from '@/template/contents_local';
import ArticleCard_Featured_A from './ArticleCard_Featured_A/ArticleCard_Featured_A.vue';
const { articles } = useLocalContents();

const SHOW_FEATURED_ARTICLE = 3;

const featuredLoop = Array.from({length: SHOW_FEATURED_ARTICLE}, (_, i) => i)
const featuredArticles = articles.query('featured', undefined, undefined, undefined);

featuredArticles.sortAsc('filename');
featuredArticles.slice(0, SHOW_FEATURED_ARTICLE);

const additionalAdSizes = {
  XXS: { width: 300, height: 100 },
  XS: { width: 300, height: 100 },
  S: { width: 728, height: 90 },
  M: { width: 970, height: 90 },
  L: { width: 970, height: 90 },
  XL: { width: 970, height: 90 },
  XXL: { width: 970, height: 90 },
} satisfies AdSizeByScale
</script>



<template>
<section id="featured-articles">
  <ol class="article-list">
    <li v-for="i in featuredLoop" :id="`featured-${i}`">
      <ArticleCard_Featured_A 
        :featuredIndex="i"
        :article="featuredArticles.array[i]"
      />
    </li>

    <Adbox id="featured-ad-0" :width="300" :height="600"/>
    <Adbox id="featured-ad-1" :width="300" :height="100"/>
  </ol>

  <div class="additional-ads">
    <Adbox_ScaleShift :adSizes="additionalAdSizes"/>
  </div>
</section>
</template>


<style lang="scss">
/** @/pages/Home/Sections/01-FeaturedArticles.vue */
/** Defined in each NavBar Components :
  --contents-container-width: ...
  --contents-side-padding: ...
*/
.home #highlighted-articles #featured-articles {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.home #highlighted-articles #featured-articles ol {
  width: var(--contents-container-width);
  padding-left: var(--contents-side-padding);
  padding-right: var(--contents-side-padding);
  display: grid;
  justify-items: center;
  #featured-0 { grid-area: 🍑 ; }
  #featured-1 { grid-area: 🧅 ; }
  #featured-2 { grid-area: 🍠 ; }
  #featured-ad-0 { grid-area: 🙇‍♂️; }
  #featured-ad-1 { grid-area: 👫; }
  li {width: 100%; height: 100%;}
}

:is(.scale--XXL, .scale--XL, .scale--L, .scale--M) #featured-articles {
  .article-list {
    #featured-ad-1 { display: none; }
    grid-template-areas: 
    "🍑 🍑 🍑 🙇‍♂️"
    "🧅 🧅 🍠 🍠";
    grid-template-columns: 
      300rem 1fr 1fr 300rem;
    grid-template-rows: 
      600rem 220rem;
    gap: 30rem;
    padding: 58rem 0 30rem 0;
  }
  .additional-ads {
    margin-bottom: 30rem;
  }
}
.scale--S #featured-articles {
  .article-list {
    #featured-ad-1 { display: none; }
    grid-template-areas: 
    "🍑 🙇‍♂️"
    "🧅 🧅"
    "🍠 🍠";
    grid-template-columns: 
      1fr 300rem;
    grid-template-rows: 
      600rem 146rem 146rem;
    gap: 26rem;
    padding: 44rem 0 26rem 0;
  }
  .additional-ads {
    margin-bottom: 26rem;
  }
}
:is(.scale--XS, .scale--XXS) #featured-articles {
  .article-list {
    #featured-ad-0 { display: none; }
    grid-template-areas: 
    "🍑"
    "👫"
    "🧅"
    "🍠"
    "👨‍👦‍👦";
    grid-template-columns: 
      1fr;
    grid-template-rows: 
      0fr 0fr 230rem 230rem 0fr;
    gap: 24rem;
    padding: 40rem 0 0 0;
  }
  .additional-ads {
    margin-bottom: 24rem;
  }
}

</style>