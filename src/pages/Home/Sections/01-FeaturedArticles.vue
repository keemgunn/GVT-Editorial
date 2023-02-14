<script setup lang="ts">
import { useLocalContents } from '@/template/contents_local';
const { articles } = useLocalContents();

// DON'T CHANGE THIS... 
// ONlY CAN HANDLE UP TO 3 FOR NOW
const SHOW_FEATURED_ARTICLE = 3;
const featuredLoop = Array.from({length: SHOW_FEATURED_ARTICLE}, (_, i) => i)

const featuredArticles = articles.getHighlighted('featured');
featuredArticles.sortAsc('filename');
featuredArticles.slice(0, SHOW_FEATURED_ARTICLE);
</script>


<template>
<section id="featured-articles">
  <ol>
    <li v-for="i in featuredLoop" :id="`featured-${i}`">
        {{ featuredArticles.array[i].title }}
    </li>

    <Adbox id="featured-ad-0" :width="300" :height="600"/>
    <Adbox id="featured-ad-1" :width="300" :height="100"/>
    <Adbox id="featured-ad-2" :width="300" :height="100"/>
  </ol>
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
  #featured-ad-2 { grid-area: 👨‍👦‍👦; }
  li {width: 100%; height: 100%;}
}

:is(.scale--XXL, .scale--XL, .scale--L, .scale--M) #featured-articles ol {
  #featured-ad-1, #featured-ad-2 { display: none; }
  grid-template-areas: 
  "🍑 🍑 🙇‍♂️"
  "🍑 🍑 🙇‍♂️"
  "🧅 🍠 🙇‍♂️"
  "🧅 🍠 🙇‍♂️"
  "🧅 🍠 🙇‍♂️";
  grid-template-columns: 
    1fr 1fr 0fr;
  grid-template-rows: 
    1fr 1fr 1fr 1fr 0fr;
  gap: 30rem;
  padding: 58rem 0 58rem 0;
}
.scale--S #featured-articles ol {
  #featured-ad-1, #featured-ad-2 { display: none; }
  grid-template-areas: 
  "🍑 🍑 🙇‍♂️"
  "🧅 🧅 🙇‍♂️"
  "🧅 🧅 🙇‍♂️"
  "🍠 🍠 🙇‍♂️"
  "🍠 🍠 🙇‍♂️";
  grid-template-columns: 
    1fr 1fr 0fr;
  grid-template-rows: 
    3.8fr 1fr 1fr 1fr 1fr;
  gap: 26rem;
  padding: 44rem 0 44rem 0;
}
:is(.scale--XS, .scale--XXS) #featured-articles ol {
  #featured-ad-0 { display: none; }
  grid-template-areas: 
  "🍑 🍑 🍑"
  "👫 👫 👫"
  "🧅 🧅 🧅"
  "🍠 🍠 🍠"
  "👨‍👦‍👦 👨‍👦‍👦 👨‍👦‍👦";
  grid-template-columns: 
    1fr 1fr 1fr;
  grid-template-rows: 
    1.34fr 0fr 1fr 1fr 0fr;
  gap: 24rem;
  height: 1080rem;
  padding: 40rem 0 40rem 0;
}
</style>