/**
  Import all YAML Configurations here
  And distribute to all instances.
*/
import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export const useArticlePageContext = defineStore('articlePageContext', () => {

  const route = useRoute();
  const router = useRouter();

  /** If this value is 0, there's no pagenum parameter available in router. */
  const currentPage = computed(() => {
    if (route.params.pagenum === undefined) {
      console.warn('articlePageContext - route.params.pagenum is undefined, returning undefined');
      return 0
    } else {
      const num = Number(route.params.pagenum);
      if (num < 1) return 1;
      else return num;
    }
  });

  function pushToFirstPage() {
    if (currentPage.value > 1) {
      const pathArr = route.path.split('/');
      const pageNumIndex = pathArr.indexOf(String(currentPage.value));
      pathArr.splice(pageNumIndex, 1);
      const newPath = pathArr.join('/');
      router.push(newPath);
    }
    else return;
  }

  /** Mutation evoked when articles.query called. */
  const totalPage = ref(1);

  /** Set `totalPage`'s value. `totalPage` is `Ref<number>` type.
   * - This function will be called by article.query methods. See: @/template/contents_local/index.ts
   */
  function setTotalPage(to: number) {
    totalPage.value = to;
    console.log('articlePageContext - setTotalPage to:', to);
  }

  function onPageChange(hook: () => void) {
    watch(() => currentPage.value, (newPage, oldPage) => {
      console.log('articlePageContext - onPageChange CALLED');
      hook();
    })
  }

  return {
    currentPage,
    totalPage,
    setTotalPage,
    pushToFirstPage,
    onPageChange,
  }
})
