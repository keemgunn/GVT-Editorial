<script setup lang="ts">
import { onBeforeMount, onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useInteractionStore } from '@/template/stores/interaction';
import { searchByFormInput } from '@/template/composables/searchByFormInput';
import ArticleList_GwangTower from '@/template/compositions/ArticleList_GwangTower/ArticleList_GwangTower.vue';


const ARTICLES_PER_PAGE = 15;
const AD_TOWER_AD_COUNT = 1;


const searchPackage = searchByFormInput('search-billboard-form', 'searchKeyword', ARTICLES_PER_PAGE);

const pageURI = computed(() => {
  if (searchPackage.requestedKeyword.value.length > 0)
  return "/search/" + "_PAGENUM_" + "?keyword=" + searchPackage.requestedKeyword.value;
  else
  return "/search/" + "_PAGENUM_";
})

// Automatically call for search function when user enters with search query parameter in url. 
// (ex: /search?keyword=apple)
const route = useRoute();
const { keyword } = route.query;
const inputTextBind = ref("");
onBeforeMount(() => {
  if (keyword) {
    inputTextBind.value = keyword as string;
    searchPackage.searchArticles(keyword as string);
    searchPackage.requestedKeyword.value = keyword as string;
  }
})

const interactionStore = useInteractionStore();
const CL_scrolled = computed(() => {
  if (interactionStore.windowScroll)
    return "--scrolled"
  else
    return ""
});

const articleListGwangSizes = {
  XXS: { width: 300, height: 250 },
  XS: { width: 300, height: 250 },
  S: { width: 468, height: 60 },
  M: { width: 728, height: 90 },
  L: { width: 970, height: 90 },
  XL: { width: 970, height: 90 },
  XXL: { width: 970, height: 90 },
} satisfies GwangSizeByScale
</script>

<template>
<div id="router-page" class="search">
    
  <main>
    <section id="fronthead" :class="CL_scrolled">
      <form id="search-billboard-form">
        <p class="head-text">Search for:</p>
        <input type="text" v-model="inputTextBind" name="searchKeyword" placeholder="Search...">
      </form>
      <Plate/>
    </section>

    <div 
    v-show="searchPackage.searchedNumber.value === 0" 
    class="zero-results">
      <p>
        {{ searchPackage.searchState.value }}
      </p>
    </div>

    <section id="results">
      <ArticleList_GwangTower
      v-show="searchPackage.searchedNumber.value > 0"
      :title="searchPackage.searchState.value" 
      :titleSize="20" 
      :titleDivider="'bottom'"
      :titleDividerWidth="3"
      articleCardName="ArticleCard_Searched_A"
      :articlesArray="searchPackage.searchedArticles.value.array"
      :showGwangsInList="0"
      :gwangSizes="articleListGwangSizes"
      :gwangTowerAdCount="AD_TOWER_AD_COUNT"
      :pageURI="pageURI"
      />
    </section>

  </main>

  <footer id="other-actions"></footer>

</div>
</template>