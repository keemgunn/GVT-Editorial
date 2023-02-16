<script setup lang="ts">
import { computed } from 'vue';
import { useFrameStore } from '@/template/styles/frame/_store';
import { useLocalContents } from '@/template/contents_local';
const { articles } = useLocalContents();

const BREAK_FLEXGRID_WHEN = 1030;
const frame = useFrameStore();

// DON'T CHANGE THIS... 
// ONlY CAN HANDLE UP TO 3 FOR NOW
const SHOW_TRENDING_ARTICLE = 3;
const trendingLoop = Array.from({length: SHOW_TRENDING_ARTICLE}, (_, i) => i)
// const trendingArticles = articles.getHighlighted('trending');
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
  frame.viewWidth < BREAK_FLEXGRID_WHEN
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
</script>


<template>
<section id="categegories-and-trending">
  <div class="wrapper">
    <div class="categories-wrapper">
      <Title-PageSection text="Categories" :size="20" divider="none" :dividerWidth="3"/>
      <ol id="article-categories" :class="flexGridClass">
        <li v-for="cat in categorySet" :id="`cat-${cat}`">
          {{ categoryRecords[cat].uri }}
        </li>
      </ol>
    </div>

    <Adbox id="trending-ad-0" :width="300" :height="100" :roundness="0"/>
    
    <div class="trending-wrapper">
      <Title-PageSection text="Trending" :size="20" divider="none" :dividerWidth="3"/>
      <ol id="trending-articles">
        <li v-for="i in trendingLoop" :id="`featured-${i}`">
            {{ trendingArticles.array[i].title }}
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
.home #highlighted-articles #categegories-and-trending .wrapper {
    width: var(--contents-container-width);
    padding-left: var(--contents-side-padding);
    padding-right: var(--contents-side-padding);
  }

.home #highlighted-articles #categegories-and-trending {
  display: flex;
  justify-content: center;
  background-color: var(--Surface);
  width: 100%;

  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    .title-pagesection { 
      flex-shrink: unset; 
      width: 100%;
    }

    --item-gap: 10rem;

    .categories-wrapper {
      display: flex;
      flex-direction: column;
      #article-categories { 
        flex-grow: 1; 
        width: 100%;
        height: 100%;
        gap: var(--item-gap);
      }
    }
    
    .trending-wrapper {
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      #trending-articles {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        justify-content: center;
        gap: var(--item-gap);
        li { 
          flex-grow: 1;
        }
      }
    }
  }
}

:is(.scale--XXL, .scale--XL, .scale--L, .scale--M, .scale--S) #categegories-and-trending .wrapper {
  flex-direction: row;
  gap: 30rem;
  height: 800rem;
  padding: 40rem 0 80rem 0;

  .title-pagesection { margin-bottom: 22rem; }
  #trending-ad-0 { display: none; }
  .categories-wrapper {
    flex-grow: 1;
    height: 100%;
  }
  .trending-wrapper { 
    width: 300rem; 
    height: 100%;
  }
}

.scale--M #categegories-and-trending .wrapper {
  height: 730rem;
  padding: 36rem 0 74rem 0;
}

.scale--S #categegories-and-trending .wrapper {
  height: 880rem;
  padding: 30rem 0 60rem 0;
  gap: 26rem;
  .title-pagesection { padding-bottom: 20rem; }
}

:is(.scale--XS, .scale--XXS) #categegories-and-trending .wrapper {
  flex-direction: column;
  height: 1720rem;
  padding: 40rem 0 60rem 0;
  gap: 40rem;
  .categories-wrapper {
    width: 100%;
    padding: 0 26rem 0 26rem;
    flex-grow: 1.8;
  }
  .trending-wrapper { 
    width: 100%; 
    padding: 0 26rem 0 26rem;
    flex-grow: 1; 
  }
}
</style>