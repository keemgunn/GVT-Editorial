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
    console.log('articlePageContext - pushToFirstPage()');
    if (currentPage.value > 1) {
      const currentUri = route.path;
      let pathArr = [];
      let queries = "";
      let newUri = "";

      if (currentUri.includes('?')) {
      // When the URI contains query paremeters:
        const querySplit = currentUri.split('?');
        queries = querySplit[1];
        pathArr = querySplit[0].split('/');
      }
      else {
        pathArr = currentUri.split('/');
      }

      const pageNumIndex = pathArr.indexOf(String(currentPage.value));
      pathArr.splice(pageNumIndex, 1);

      if (pathArr.length < 2)
      // When URI is basepath Or something else error
        newUri = '/'
      else
        newUri = pathArr.join('/');
      
      if (queries.length > 0) newUri = newUri + queries;
      
      router.push(newUri);
    }
  }

  /** Mutation evoked when articles.query called. */
  const totalPage = ref(1);

  /** Set `totalPage`'s value. `totalPage` is `Ref<number>` type.
   * - This function will be called by article.query methods. See: #/contents_local/index.ts
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
