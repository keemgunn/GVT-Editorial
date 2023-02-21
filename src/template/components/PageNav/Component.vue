<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { useFrameStore } from '@/template/styles/frame/_store';
import { useArticlePageContext } from '@/template/stores/articlePageContext';
import { usePaging } from './usePaging';
import { useOverflowDetector } from '@/template/composables/useOverflowDetector'

// How many page nav buttons will show?
const PAGE_NUMBER_SLICE = 5;
const MOBILE_PAGE_DISPLAY_NUM = 7; 

const pageContext = useArticlePageContext();

const props = defineProps<{
  pageURI: string;
  prevButtonName: string;
  nextButtonName: string;
}>();

const resolveURI = computed(() => {
  return (pagenum: number) => {
    return props.pageURI.replace("_PAGENUM_", String(pagenum));
  }
})

const {
  backwards,
  forwards,
  mobileList,
  backwardsLimit,
  forwardsLimit,
} = usePaging(PAGE_NUMBER_SLICE, MOBILE_PAGE_DISPLAY_NUM);

const backwardOverflowX = useOverflowDetector('X', 'pagelist-backward');
const backwardOverflowY = useOverflowDetector('Y', 'pagelist-backward');
const forwardOverflowX = useOverflowDetector('X', 'pagelist-forward');
const forwardOverflowY = useOverflowDetector('Y', 'pagelist-forward');
const backwardClass = computed(() => {
  return [
    `--overflow-X-${String(backwardOverflowX.value)}`,
    `--overflow-Y-${String(backwardOverflowY.value)}`
  ]
})
const forwardClass = computed(() => {
  return [
    `--overflow-X-${String(forwardOverflowX.value)}`,
    `--overflow-Y-${String(forwardOverflowY.value)}`
  ]
})

const prevButtonClass = computed(() => {
  if (pageContext.currentPage === 1)
    return "--disabled"
  else
    return ""
})
const nextButtonClass = computed(() => {
  if (pageContext.currentPage === pageContext.totalPage)
    return "--disabled"
  else
    return ""
})

const frameStore = useFrameStore();
const mobile = computed(() => {
  return /--XXS|--XS|--S/.test(frameStore.appScale);
});
const showFirstPage = computed(() => {
  if (backwardsLimit.value > 0) return true;
  if (backwardOverflowY.value) return true;
  return false;
})
const showLastPage = computed(() => {
  if (pageContext.currentPage + PAGE_NUMBER_SLICE + 1 < pageContext.totalPage) return true;
  if (forwardOverflowY.value) return true;
  return false;
})
</script>


<template>
<!-- PageNav -->
<nav class="page-nav" 
v-show="pageContext.totalPage > 1">

  <RouterLink class="movebutton prev" v-show="!mobile" :to="resolveURI(pageContext.currentPage - 1)" :class="prevButtonClass">
    {{ prevButtonName }}
    <Plate/>
  </RouterLink>

  <div class="pagebutton-wrapper" v-show="!mobile">
      <RouterLink class="pagebutton firstpage" :to="resolveURI(1)" v-show="showFirstPage">
        1
        <Plate/>
      </RouterLink>
      
      <p class="dots first" v-show="showFirstPage">...</p>
    
      <ol id="pagelist-backward" class="pagelist backward" :class="backwardClass" v-show="backwards.length !== 0">
      <template v-for="page in backwards">
        <li>
          <RouterLink class="pagebutton" :to="resolveURI(page)">
            {{ page }}
            <Plate/>
          </RouterLink>
        </li>
      </template>
      </ol>
      
      <RouterLink class="pagebutton currentpage" :to="resolveURI(pageContext.currentPage)">
        <p>{{ pageContext.currentPage }}</p>
        <Plate/>
      </RouterLink>
    
      <ol id="pagelist-forward" class="pagelist forward" :class="forwardClass" v-show="forwards.length !== 0">
      <template v-for="page in forwards">
        <li>
          <RouterLink class="pagebutton" :to="resolveURI(page)">
            {{ page }}
            <Plate/>
          </RouterLink>
        </li>
      </template>
      </ol>
      
      <p class="dots last" v-show="showLastPage">...</p>

      <RouterLink class="pagebutton lastpage" :to="resolveURI(pageContext.totalPage)" v-show="showLastPage">
        {{ pageContext.totalPage }}
        <Plate/>
      </RouterLink>
  </div>

  <ol class="pagelist mobile" v-show="mobile">
    <template v-for="page in mobileList">
      <li>
        <RouterLink class="pagebutton" :class="`${(pageContext.currentPage === page)?`currentpage`:''}`" :to="resolveURI(page)">
          {{ page }}
          <Plate/>
        </RouterLink>
      </li>
    </template>
  </ol>

  <RouterLink class="movebutton next" v-show="!mobile" :to="resolveURI(pageContext.currentPage + 1)" :class="nextButtonClass">
    {{ nextButtonName }}
    <Plate/>
  </RouterLink>
</nav>
</template>

