
import { onMounted, onBeforeUnmount, ref } from "vue";
import type { Ref } from "vue";
import { useLocalContents } from '@/template/contents_local';
import { ArticleRecordsPack } from "../contents_local/_classes";

const SEARCH_RESULT_SLICE_CHAR = 60;



export function searchByFormInput(formElementId: string, inputName: string) {

  const { articles } = useLocalContents();
    // All Stores must be initiated inside of components.

  // The final array
  const searchedArticles: Ref<ArticleRecordsPack> = ref(new ArticleRecordsPack([]));

  const requestedKeyword = ref("");

  /** Search and fetches `ArticleRecord[]` to `searchedArticles` */
  function searchArticles(keyword: string) {
    const searchedRawRecords =
      articles.searchQuery(keyword)
        .sliceAroundKeyword(keyword, SEARCH_RESULT_SLICE_CHAR)
        .highlightKeyword(keyword);
    searchedRawRecords.sortDesc('date');
    searchedArticles.value = new ArticleRecordsPack(searchedRawRecords.array);
  }
  
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
    searchArticles
  }
}