<script setup lang="ts">
import { onBeforeMount, ref, computed } from 'vue';
import { useFrameStore } from '@/template/styles/frame/_store';
import { useRoute, useRouter } from 'vue-router';
import brandLogo from '@/assets/svg/logo-brand-main.svg';
import { searchByFormInput } from '@/template/composables/searchByFormInput';
import ArticleList_AdTower from '@/template/compositions/ArticleList_AdTower.vue/ArticleList_AdTower.vue';


const ARTICLES_PER_PAGE = 5;

const frameStore = useFrameStore();
const route = useRoute();
const router = useRouter();

// const {
//   searchedArticles,
//   requestedKeyword,
//   searchState,
//   searchedNumber, 
//   searchArticles
// } = searchByFormInput('search-billboard-form', 'searchKeyword', ARTICLES_PER_PAGE);


const searchPackage = searchByFormInput('search-billboard-form', 'searchKeyword', ARTICLES_PER_PAGE);





const pageURI = computed(() => {
  if (searchPackage.requestedKeyword.value.length > 0)
    return "/search/" + "_PAGENUM_" + "?keyword=" + searchPackage.requestedKeyword.value;
  else
    return "/search/" + "_PAGENUM_";
})

// Automatically call for search function when user enters with search query parameter in url. 
// (ex: /search?keyword=apple)
const { keyword } = route.query;
const inputTextBind = ref("");
onBeforeMount(() => {
  if (keyword) {
    inputTextBind.value = keyword as string;
    searchPackage.searchArticles(keyword as string);
    searchPackage.requestedKeyword.value = keyword as string;
  }
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
<div id="router-page" class="search">
    
  <main>
    <section id="fronthead">

      <div class="searchbox-wrapper">
        <form id="search-billboard-form">
          <input type="text" v-model="inputTextBind" name="searchKeyword" placeholder="Search...">
        </form>
      </div>
      
      <Vector class="brand-logo" :src="brandLogo"/>
    </section>

    <p v-show="searchPackage.requestedKeyword.value.length === 0">
      {{ searchPackage.searchState.value }}
    </p>

    <ArticleList_AdTower
    v-show="searchPackage.requestedKeyword.value.length > 0"
    :title="searchPackage.searchState.value" 
    :titleSize="20" 
    :titleDivider="'bottom'"
    :titleDividerWidth="3"
    articleCardName="ArticleCard_A"
    :articleCardRoundness="0"
    :articlesArray="searchPackage.searchedArticles.value.array"
    :showAdsInList="0"
    :adSizes="articleListAdSizes"
    :pageURI="pageURI"
    />
  </main>

  <footer id="other-actions"></footer>

</div>
</template>


<style lang="scss">
/** @/pages/Search/PageComponent.vue */

// ============ LOGO
#router-page.search #fronthead {
  position: relative;
  overflow: hidden;
  .brand-logo {
    position: absolute;
    right: 0;
    bottom: -180rem;
    svg {
      width: 600rem;
      height: 600rem;
    }
    opacity: 0.12;

  }
}
</style>