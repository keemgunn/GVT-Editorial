<script setup lang="ts">
import { onBeforeMount, computed } from 'vue';
import { useFrameStore } from '@/template/styles/frame/_store';
import { article } from '@/template/contents';


const BREAK_FLEXGRID_WHEN = 1030;



const frame = useFrameStore();


// DON'T CHANGE THIS... 
// ONlY CAN HANDLE UP TO 3 FOR NOW
const SHOW_FEATURED_ARTICLE = 3;
const SHOW_TRENDING_ARTICLE = 3;
const featuredLoop = Array.from({length: SHOW_FEATURED_ARTICLE}, (_, i) => i)
const trendingLoop = Array.from({length: SHOW_FEATURED_ARTICLE}, (_, i) => i)

const featuredArticles = article.package.getOnlyHighlighted('featured');
featuredArticles.sortAsc('filename');
featuredArticles.slice(0, SHOW_FEATURED_ARTICLE);

const trendingArticles = article.package.getOnlyHighlighted('trending');
trendingArticles.sortAsc('filename');
trendingArticles.slice(0, SHOW_TRENDING_ARTICLE);




const flexGridColumn = computed(() => {
  const categoryCount = article.categorySet.size
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
<div id="router-page" class="home">


  <main>
    <section id="highlighted-articles">
      <ol id="featured-articles">
        <li v-for="i in featuredLoop" :id="`featured-${i}`">
            {{ featuredArticles.array[i].title }}
        </li>

        <Adbox id="featured-ad-0" :width="300" :height="600"/>
        <Adbox id="featured-ad-1" :width="300" :height="100"/>
        <Adbox id="featured-ad-2" :width="300" :height="100"/>
      </ol>

      <section id="categegories-and-trending">
        <div class="wrapper">
          <div class="categories-wrapper">
            <Title-PageSection text="Categories" :size="20" divider="none" :dividerWidth="3"/>
            <ol id="article-categories" :class="flexGridClass">
              <li v-for="cat in article.categorySet" :id="`cat-${cat}`">
                <div class="category-item-wrapper">
                  {{ article.categoryRecords[cat].uri }}
                </div>
              </li>
            </ol>
          </div>

          <Adbox id="trending-ad-0" :width="300" :height="100"/>
          
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

    </section>

    <section id="all-articles">


    </section>
  </main>

  <footer id="footer-info"></footer>

</div>
</template>
