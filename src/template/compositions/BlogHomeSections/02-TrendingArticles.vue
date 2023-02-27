<script setup lang="ts">
import { computed, defineProps } from 'vue';
import { useFrameStore } from '@/template/styles/frame/_store';
import { useLocalContents } from '@/template/contents_local';
import ArticleCard_Trending_A from './ArticleCard_Trending_A/ArticleCard_Trending_A.vue';


const SHOW_TRENDING_ARTICLE = 3;


const frameStore = useFrameStore();
const { articles } = useLocalContents();
const props = defineProps<{
  BREAK_FLEXGRID_WHEN: number;
}>();

const trendingLoop = Array.from({length: SHOW_TRENDING_ARTICLE}, (_, i) => i)
const trendingArticles = articles.query('trending', undefined, undefined, undefined);
trendingArticles.sortAsc('filename');
trendingArticles.slice(0, SHOW_TRENDING_ARTICLE);

const categorySet = articles.getCategorySet();
const categoryRecords = articles.getCategoryRecords();
const flexGridColumn = computed(() => {
  const categoryCount = categorySet.size;
  return Math.round(categoryCount / 2);
})
const flexGridBreaker = computed(() =>
  frameStore.viewWidth < props.BREAK_FLEXGRID_WHEN
)
const flexGridClass = computed(() => {
  if (flexGridBreaker.value) {
    return [
      'flexgrid',
      '--break-to-column'
    ]
  } else {
    return [
      'flexgrid',
      `--col${flexGridColumn.value}`
    ]
  }
})
const titleDivider = computed(() => {
  if (/--XXS|--XS/.test(frameStore.appScale))
    return "bottom"
  else
    return "none"
})
</script>


<template>
<section id="categories-and-trending">
  <div class="wrapper">

    <div class="categories-wrapper">
      <Title_PageSection 
      text="Categories" 
      :size="20" 
      :divider="titleDivider" 
      :dividerWidth="3"/>

      <ol id="article-categories" :class="flexGridClass">
        <li v-for="cat in categorySet" :id="`cat-${cat}`">
          <ArticleCategoryCard
          :name="cat"
          :info="categoryRecords[cat]"
          />
        </li>
      </ol>
    </div>

    <GwangBox id="trending-gwang-0" :width="300" :height="100"/>
    
    <div class="trending-wrapper">
      <Title_PageSection 
      text="Trending" 
      :size="20" 
      :divider="titleDivider" 
      :dividerWidth="3"/>

      <ol id="trending-articles">
        <li v-for="i in trendingLoop" :id="`trending-${i}`">
          <ArticleCard_Trending_A
          :trendingIndex="i"
          :article="trendingArticles.array[i]"
          />
        </li>
      </ol>
    </div>

  </div>
</section>
</template>


<style lang="scss">
/** @/pages/Home/Sections/02-TrendingArticles.vue */
/** Defined in each NavBar Components :
  --contents-container-width: ...
  --contents-side-padding: ...
*/

:is(.scale--XXL, .scale--XL, .scale--L) 
#categories-and-trending {
  --wrapper-direction: row;
  --wrapper-padding-top: 40rem;
  --wrapper-padding-bottom: 0rem;
  --wrapper-gap: 30rem;
  --item-gap: 30rem;

  --title-padding-bottom: 22rem;
  --categories-height: unset;
  --trending-width: 300rem;
  #trending-gwang-0 { display: none; }
}
:is(.scale--M) 
#categories-and-trending {
  --wrapper-direction: row;
  --wrapper-padding-top: 36rem;
  --wrapper-padding-bottom: 0rem;
  --wrapper-gap: 30rem;
  --item-gap: 20rem;

  --title-padding-bottom: 22rem;
  --categories-height: unset;
  --trending-width: 300rem;
  #trending-gwang-0 { display: none; }
}
:is(.scale--S) 
#categories-and-trending {
  --wrapper-direction: row;
  --wrapper-padding-top: 30rem;
  --wrapper-padding-bottom: 0rem;
  --wrapper-gap: 24rem;
  --item-gap: 8rem;

  --title-padding-bottom: 20rem;
  --categories-height: unset;
  --trending-width: 300rem;
  #trending-gwang-0 { display: none; }
}
:is(.scale--XS, .scale--XXS) 
#categories-and-trending {
  --wrapper-direction: column;
  --wrapper-padding-top: 40rem;
  --wrapper-padding-bottom: var(--contents-side-padding);
  --wrapper-gap: 40rem;
  --item-gap: 16rem;

  --title-padding-bottom: 18rem;
  --categories-height: 808rem;
  --trending-width: 100%;
  #trending-gwang-0 { display: block; }
}



.home #categories-and-trending {
  width: 100%;
  background-color: var(--Surface);

  display: flex;
  justify-content: center;

  .wrapper {
    width: var(--contents-container-width);
    height: fit-content;

    display: flex;
    flex-direction: var(--wrapper-direction);
    justify-content: center;
    align-items: stretch;
    gap: var(--wrapper-gap);

    padding: 
      var(--wrapper-padding-top) 
      var(--contents-side-padding) 
      var(--wrapper-padding-bottom) 
      var(--contents-side-padding);

    .title-pagesection { 
      width: 100%;
      flex-shrink: 0; 
      padding-bottom: var(--title-padding-bottom);
    }

    .categories-wrapper {
      width: 100%;
      height: var(--categories-height);
      display: flex;
      flex-direction: column;
      #article-categories { 
        flex-grow: 1; 
        width: 100%;
        height: 100%;
        gap: var(--item-gap);
      }
    }

    #trending-gwang-0 { 
      align-self: center; 
    }
    
    .trending-wrapper {
      width: var(--trending-width);
      flex-shrink: 0;
      min-height: 0;
      display: flex;
      flex-direction: column;
      #trending-articles {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        gap: var(--item-gap);
      }
    }
  }
}
</style>