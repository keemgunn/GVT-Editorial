import { ref, computed, onBeforeMount } from "vue";
import type { Ref } from "vue";
import { useArticlePageContext } from "#/stores/articlePageContext";


export function usePaging(pageNumberSlice: number, mobilePageDisplayNumber: number) {

  const pageContext = useArticlePageContext();

  // Rendering page buttons follows these arrays.
  const backwards:Ref<Array<number>> = ref([]);
  const forwards: Ref<Array<number>> = ref([]);
  const mobileList: Ref<Array<number>> = ref([]);
  
  // Limit boundaries for rendering pages.
  const backwardsLimit = ref(0);
  const forwardsLimit = ref(0);


  /** The function that fetches array of numbers to `backwards`, `forwards`, `mobileList`, which provides sources for looping elements in template. */
  function render() {

    /** The `pageContext.totalPage` mutates whenever the contents queried by contents stores. */
    const pageLoop = Array.from({ length: pageContext.totalPage }, (_, i) => i + 1)
    console.log('PageNav - Rendering Pages:', pageLoop);
    

    // Set a boundary to backward direction from current page.
    backwardsLimit.value =
      pageContext.currentPage <= pageNumberSlice + 1 ?
        0 : pageContext.currentPage - pageNumberSlice;
    backwards.value = pageLoop.slice(backwardsLimit.value, pageContext.currentPage - 1);
  
    // Set a boundary to forward direction from current page.
    forwardsLimit.value =
      pageContext.totalPage <= pageContext.currentPage + pageNumberSlice + 1 ?
        pageContext.totalPage : pageContext.currentPage + pageNumberSlice;
    forwards.value = pageLoop.slice(pageContext.currentPage, forwardsLimit.value);
  

    // Add decimal pages beyond the limits.
    // example: [9, 10, 11, ... 20, 30, 40]

    let backwardsExtra = pageLoop.slice(0, backwardsLimit.value);
    backwardsExtra = backwardsExtra.filter((num) => (num % 10) === 0);
    backwards.value = [...backwardsExtra, ...backwards.value];
    backwards.value.reverse();
  
    let forwardsExtra = pageLoop.slice(forwardsLimit.value, pageContext.totalPage);
    forwardsExtra = forwardsExtra.filter((num) => (num % 10) === 0);
    forwards.value = [...forwards.value, ...forwardsExtra];
  
    // Also make an array for mobiles. much simpler.

    mobileList.value = [];
    const firstHalf = Math.floor((mobilePageDisplayNumber - 1) / 2);
    mobileList.value.push(pageContext.currentPage);
    for (let i = 0; i < firstHalf; i++) {
      const newNum = pageContext.currentPage - (i + 1);
      if (newNum > 0)
        mobileList.value.push(newNum);
    }
    const addMore = mobilePageDisplayNumber - mobileList.value.length;
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

  // Add Hooks for when current page numbers changed.
  onBeforeMount(() => {
    render();
  })
  pageContext.onPageChange(() => {
    render();
  })

  return {
    backwards,
    forwards,
    mobileList,
    backwardsLimit,
    forwardsLimit,
  }
}





