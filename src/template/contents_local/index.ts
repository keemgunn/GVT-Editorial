/**
 * Using vite-plugin-vue-markdown. See("https://www.npmjs.com/package/vite-plugin-vue-markdown")
*/
import { defineStore } from 'pinia'
import articleConfigs from '@/contents/articles/configs.yml';
import { formatRawMarkdowns } from './_markdownHandler';
import { ArticleRawRecordsPack, ArticleRecordsPack } from './_classes';
import { useArticlePageContext } from '@/template/stores/articlePageContext';
const { categories, uriParent } = articleConfigs;



// Get all articles in raw string
const markdownModules = import.meta.glob('../../contents/articles/**/*.md', { eager: true, import: 'default', as: 'raw' });
// console.log(markdownModules);

// Make a list of articles records from raw strings
const { articleRecords, articleRecordsWithRaw }
  = formatRawMarkdowns(markdownModules);

console.log('articleRecords FROM LOCAL:', articleRecords);
export { articleRecords } // For Component registration



export const useLocalContents = defineStore('localContents', () => {

  const articleList = articleRecords;
  const articleRawList = articleRecordsWithRaw;
  // Default Sort : date desc order
  articleList.sort((a, b) => {
    if (a.date < b.date) return 1;
    if (a.date > b.date) return -1;
    return 0;
  })



  // For Filtering Articles with Tags
  const tagSet: Set<string> = new Set([]);
  articleList.forEach((article) => {
    article.tags.forEach((tag) => {
      tagSet.add(tag);
    })
  });

  // For Filtering Articles with Categories
  const categorySet: Set<string> = new Set(Object.keys(categories));

  /** ((Local Markdown Files)) Get a SET of categories. */
  const getArticleCategoryRecords = (): CategoryRecords => {
    return categories as CategoryRecords
  }

  // For Pagination 
  const pageContext = useArticlePageContext();


  /**
   * Query Article Contents.
   * @params `highlightState` `category` `tag` `articlesPerPage`
   * - When param `articlesPerPage` provided, the pagination using 'current page number' is automatically done by its logic, and returns only current page's articles.
   * - WARNING: DON'T USE MORE THAN ONE PAGED ARTICLE LIST IN ONE PAGE. THE PAGE CONTEXT IS ONLY ONE INSATNCE THAT THIS APP HAS
   */
  const query = (highlightState?: ArticleHighlightState, category?: string, tag?: string, articlesPerPage?: number): ArticleRecordsPack => {
    console.log("LocalContents - Query Called");
    
    let newArr: Array<ArticleRecord> = articleList.slice();

    if (highlightState) 
      newArr = newArr.filter((article) => article.highlighted === highlightState);
    
    if (category)
      newArr = newArr.filter((article) => article.category === category);
    
    if (tag)
      newArr = newArr.filter((article) => article.tags.includes(tag));
    
      
    if (articlesPerPage && pageContext.currentPage) { // Might be 0
      pageContext.setTotalPage(
        Math.ceil(newArr.length / articlesPerPage)
      );
    
      if (pageContext.currentPage > pageContext.totalPage) {
        pageContext.pushToFirstPage();
      }
  
      const startNum = (pageContext.currentPage - 1) * articlesPerPage;
      const endNum = startNum + articlesPerPage;

      newArr = articleList.slice(startNum, endNum);
    }
      
    return new ArticleRecordsPack(newArr)
  }



  const searchQuery = (query: string, articlesPerPage?: number): ArticleRawRecordsPack => {
    // const querysafe = regexQuerySafe(query);
    const searchedArticleRawPack = new ArticleRawRecordsPack(
      articleRawList.filter((article) => {
        return article.raw.includes(query);
      }) || []
    )
    searchedArticleRawPack.sortDesc('date');

    if (articlesPerPage) {
      pageContext.setTotalPage(
        Math.ceil(searchedArticleRawPack.array.length / articlesPerPage)
      );

      if (pageContext.currentPage > pageContext.totalPage) {
        pageContext.pushToFirstPage();
      }

      const startNum = (pageContext.currentPage - 1) * articlesPerPage;
      const endNum = startNum + articlesPerPage;

      searchedArticleRawPack.array = searchedArticleRawPack.array.slice(startNum, endNum);
    }

    return searchedArticleRawPack
  }



  // ==========================================
  // 2. Reader
  // ==========================================

  // For Filtering Articles with Tags
  const articleDocumentSet: Set<string> = new Set([]);
  articleList.forEach((article) => {
    articleDocumentSet.add(article.uri);
  });

  /** ### Get Full URI which is used for local document's component name. 
   * @param paramDocUri: a uri from router parameter
   * @returns `fullUri`: a uri for component loading
   * - example of paramDocUri: `some-uri`
   * - example of fullUri: `/{{uriParam}}/some-uri`
   * - To load the local document component, we want "fullUri", but router parameter gives "paramDocUri"
   * - For uriParam, see '@/contents/articles/configs.yml'
   * ### If there's no document corresponds to current uri, @returns `""` (empty string)
  */
  const getArticleComponentName = (docURI: string) => {
    const fullUri = uriParent + "/" + docURI;
    if (articleDocumentSet.has(fullUri))
      return fullUri
    else
      return ""
  }



  return {
    articles: {
      getCategoryRecords: getArticleCategoryRecords,
      getCategorySet: () => categorySet,
      getTagSet: () => tagSet,
      query,
      searchQuery,
      pageContext,
    }, 
    reader: {
      getComponentName: getArticleComponentName
    }
  }
})
