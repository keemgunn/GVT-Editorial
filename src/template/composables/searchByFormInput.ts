
import { onMounted, ref, computed } from "vue";
import type { Ref } from "vue";
import { useLocalContents } from '@/template/contents_local';
import { ArticleRecordsPack } from "../contents_local/_classes";

const SEARCH_RESULT_SLICE_CHAR = 60;

export function searchByFormInput(formElementId: string, inputName: string, articlesPerPage?: number) {

  const { articles } = useLocalContents();
    // All Stores must be initiated inside of components.

  // The final array
  const searchedArticles: Ref<ArticleRecordsPack> = ref(new ArticleRecordsPack([]));

  const requestedKeyword = ref("");
  const searchedNumber = ref(0);
  const searchState = computed(() => {
    if (searchedNumber.value === 0) {
      if (requestedKeyword.value.length === 0)
        return "Search by Keyword"
      else
        return `No results found for '${requestedKeyword.value}'`
    }
    else {
      return `${searchedNumber.value} Results for '${requestedKeyword.value}'`
    }
  })


  /** Search and fetches `ArticleRecord[]` to `searchedArticles` */
  function searchArticles(keyword: string) {
    const { searchedRawRecords, resultCount }
      = articles.searchQuery(keyword, articlesPerPage);
        
    searchedRawRecords.sliceAroundKeyword(keyword, SEARCH_RESULT_SLICE_CHAR);
    searchedRawRecords.highlightKeyword(keyword);
    searchedRawRecords.sortDesc('date');

    searchedArticles.value = new ArticleRecordsPack(searchedRawRecords.array);
    searchedNumber.value = resultCount;
  }

  articles.pageContext.onPageChange(() => {
    searchArticles(requestedKeyword.value);
  })
  
  function search(event: SubmitEvent) {
    event.preventDefault();
    const target = event.target as any;
    const keyword = target[inputName];

    if (keyword) {
      if (keyword.value.length > 0) {
        searchArticles(keyword.value);
        window.history.pushState(null, '', `?keyword=${keyword.value}`);
        requestedKeyword.value = keyword.value;
      } else {
        return
      }
    }
    else {
      console.error(`No input field found for <input name="${inputName}>`);
    }
  }

  onMounted(() => {
    const formEl = document.getElementById(formElementId) as HTMLFormElement;

    if (formEl) {
      formEl.addEventListener('submit', search, false)
    } else {
      console.error(`No Element found for <form id="${formElementId}">`);
      return
    }
  })

  return {
    searchedArticles,
    requestedKeyword, 
    searchedNumber, 
    searchState, 
    searchArticles
  }
}