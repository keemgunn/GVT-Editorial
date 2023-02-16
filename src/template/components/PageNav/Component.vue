<script setup lang="ts">
import { defineProps, computed, ref, watch, onBeforeMount, onBeforeUpdate, onMounted } from 'vue';
import type { Ref } from 'vue';
import { useFrameStore } from '@/template/styles/frame/_store';
import { useArticlePageContext } from '@/template/stores/articlePageContext';

// How many page nav buttons will show?
const PAGE_NUMBER_SLICE = 5;
const MOBILE_PAGE_DISPLAY_NUM = 7; 

const pageContext = useArticlePageContext();

const props = defineProps<{
  rootUri: string;
  prevButtonName: string;
  nextButtonName: string;
  roundness: number;
}>();

const backwardsLimit = ref(0);
const forwardsLimit = ref(0);
const backwards:Ref<Array<number>> = ref([]);
const forwards: Ref<Array<number>> = ref([]);
const mobileList: Ref<Array<number>> = ref([]);
const backwardsListElement: Ref<Element | null> = ref(null);
const forwardsListElement: Ref<Element | null> = ref(null);

function renderPages() {
  const pageLoop = Array.from({ length: pageContext.totalPage }, (_, i) => i + 1)
  console.log('PageNav - Rendering Pages:', pageLoop);
  
  backwardsLimit.value =
    pageContext.currentPage <= PAGE_NUMBER_SLICE + 1 ?
      0 : pageContext.currentPage - PAGE_NUMBER_SLICE;
  backwards.value = pageLoop.slice(backwardsLimit.value, pageContext.currentPage - 1);

  forwardsLimit.value =
    pageContext.totalPage <= pageContext.currentPage + PAGE_NUMBER_SLICE + 1 ?
      pageContext.totalPage : pageContext.currentPage + PAGE_NUMBER_SLICE;
  forwards.value = pageLoop.slice(pageContext.currentPage, forwardsLimit.value);

  let backwardsExtra = pageLoop.slice(0, backwardsLimit.value);
  backwardsExtra = backwardsExtra.filter((num) => (num % 10) === 0);
  backwards.value = [...backwardsExtra, ...backwards.value];
  backwards.value.reverse();

  let forwardsExtra = pageLoop.slice(forwardsLimit.value, pageContext.totalPage);
  forwardsExtra = forwardsExtra.filter((num) => (num % 10) === 0);
  forwards.value = [...forwards.value, ...forwardsExtra];

  mobileList.value = [];
  const firstHalf = Math.floor((MOBILE_PAGE_DISPLAY_NUM - 1) / 2);
  mobileList.value.push(pageContext.currentPage);
  for (let i = 0; i < firstHalf; i++) {
    const newNum = pageContext.currentPage - (i + 1);
    if (newNum > 0)
      mobileList.value.push(newNum);
  }
  const addMore = MOBILE_PAGE_DISPLAY_NUM - mobileList.value.length;
  for (let i = 0; i < addMore; i++) {
    const newNum = pageContext.currentPage + (i + 1);
    if (newNum < pageContext.totalPage + 1)
      mobileList.value.push(newNum);
  }

  mobileList.value.sort((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  })
}


const backwardOverflowX: Ref<boolean> = ref(false);
const backwardOverflowY: Ref<boolean> = ref(false);
const backwardClass = computed(() => {
  return [
    `--overflow-X-${String(backwardOverflowX.value)}`,
    `--overflow-Y-${String(backwardOverflowY.value)}`
  ]
})
const forwardOverflowX: Ref<boolean> = ref(false);
const forwardOverflowY: Ref<boolean> = ref(false);
const forwardClass = computed(() => {
  return [
    `--overflow-X-${String(forwardOverflowX.value)}`,
    `--overflow-Y-${String(forwardOverflowY.value)}`
  ]
})
function detectOverflow() {
  const backEl = backwardsListElement.value;
  const forEl = forwardsListElement.value;
  if (backEl) {
    backwardOverflowX.value = backEl.scrollWidth > backEl.clientWidth;
    backwardOverflowY.value = backEl.scrollHeight > backEl.clientHeight;
  }
  if (forEl) {
    forwardOverflowX.value = forEl.scrollWidth > forEl.clientWidth;
    forwardOverflowY.value = forEl.scrollHeight > forEl.clientHeight;
  }
}

onBeforeMount(() => {
  renderPages();
})
onBeforeUpdate(() => {
  renderPages();
})


onMounted(() => {
  backwardsListElement.value = document.querySelector('.backward');
  forwardsListElement.value = document.querySelector('.forward');
  detectOverflow();
  window.addEventListener("resize", () => {
    detectOverflow();
  });
})

const prevButtonClass = computed(() => {
  if (pageContext.currentPage === 1) {
    return [
      "--disabled"
    ]
  } else {
    return []
  }
})
const nextButtonClass = computed(() => {
  if (pageContext.currentPage === pageContext.totalPage) {
    return [
      "--disabled"
    ]
  } else {
    return []
  }
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
<nav class="page-nav">

  <RouterLink class="movebutton prev" v-show="!mobile" :to="props.rootUri + '/' + String(pageContext.currentPage - 1)" :class="prevButtonClass">
    {{ prevButtonName }}
    <Plate :roundness="roundness"/>
  </RouterLink>

  <div class="pagebutton-wrapper" v-show="!mobile">
      <RouterLink class="pagebutton firstpage" :to="props.rootUri + '/1'" v-show="showFirstPage">
        1
        <Plate :roundness="roundness"/>
      </RouterLink>
      
      <p class="dots first" v-show="showFirstPage">...</p>
    
      <ol class="pagelist backward" :class="backwardClass" v-show="backwards.length !== 0">
      <template v-for="page in backwards">
        <li>
          <RouterLink class="pagebutton" :to="props.rootUri + '/' + String(page)">
            {{ page }}
            <Plate :roundness="roundness"/>
          </RouterLink>
        </li>
      </template>
      </ol>
      
      <RouterLink class="pagebutton currentpage" :to="props.rootUri + '/' + String(pageContext.currentPage)">
        <p>{{ pageContext.currentPage }}</p>
        <Plate :roundness="roundness"/>
      </RouterLink>
    
      <ol class="pagelist forward" :class="forwardClass" v-show="forwards.length !== 0">
      <template v-for="page in forwards">
        <li>
          <RouterLink class="pagebutton" :to="props.rootUri + '/' + String(page)">
            {{ page }}
            <Plate :roundness="roundness"/>
          </RouterLink>
        </li>
      </template>
      </ol>
      
      <p class="dots last" v-show="showLastPage">...</p>

      <RouterLink class="pagebutton lastpage" :to="props.rootUri + '/'+ String(pageContext.totalPage)" v-show="showLastPage">
        {{ pageContext.totalPage }}
        <Plate :roundness="roundness"/>
      </RouterLink>
  </div>

  <ol class="pagelist mobile" v-show="mobile">
    <template v-for="page in mobileList">
      <li>
        <RouterLink class="pagebutton" :class="`${(pageContext.currentPage === page)?`currentpage`:''}`" :to="props.rootUri + '/' + String(page)">
          {{ page }}
          <Plate :roundness="roundness"/>
        </RouterLink>
      </li>
    </template>
  </ol>

  <RouterLink class="movebutton next" v-show="!mobile" :to="props.rootUri + '/' + String(pageContext.currentPage + 1)" :class="nextButtonClass">
    {{ nextButtonName }}
    <Plate :roundness="roundness"/>
  </RouterLink>
</nav>
</template>

