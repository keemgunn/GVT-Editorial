/**
 * Using vite-plugin-vue-markdown. See("https://www.npmjs.com/package/vite-plugin-vue-markdown")
*/
import { defineStore } from 'pinia'
import configs from '../configs';
import { formatRawMarkdowns } from './_markdownHandler';
import { ArticleRawRecordsPack, ArticleRecordsPack } from './_classes';
import { useArticlePageContext } from '@/template/stores/articlePageContext';
const { CATEGORIES, URI_PARENT } = configs.article;



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
  const tags: Record<string, number> = {};
  articleList.forEach((article) => {
    article.tags.forEach((tag) => {
      if (tags[tag]) {
        tags[tag] = tags[tag] + 1;
      } else {
        tags[tag] = 1;
      }
    })
  });

  // For Filtering Articles with Categories
  const categorySet: Set<string> = new Set(Object.keys(CATEGORIES));

  /** ((Local Markdown Files)) Get a SET of categories. */
  const getArticleCategoryRecords = (): Record<string, CategoryRecord> => {
    return CATEGORIES as Record<string, CategoryRecord>
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



  const searchQuery = (query: string, articlesPerPage?: number): { searchedRawRecords: ArticleRawRecordsPack, resultCount: number } => {
    
    const queryArr: Array<ArticleRecord> = [
      ...articleRawList.filter((article) => {
        return article.raw.includes(query.toLowerCase());
      }) || [],
      ...articleList.filter((article) => {
        return article.title.toLowerCase().includes(query.toLowerCase());
      }) || []
    ];

    const uniqueArticles = queryArr.reduce((accumulator: Array<ArticleRecord>, current: ArticleRecord) => {
      const duplicated = accumulator.find(record => record.uri === current.uri);
      if (!duplicated) accumulator.push(current);
      return accumulator;
    }, []);
    const searchedRawRecords = new ArticleRawRecordsPack(uniqueArticles);

    // Sort DESC
    searchedRawRecords.sortDesc('date');

    // For displaying search result counts
    const resultCount = searchedRawRecords.array.length;

    // SPLIT INTO PAGES
    if (articlesPerPage) {
      pageContext.setTotalPage(
        Math.ceil(searchedRawRecords.array.length / articlesPerPage)
      );

      if (pageContext.currentPage > pageContext.totalPage) {
        pageContext.pushToFirstPage();
      }

      const startNum = (pageContext.currentPage - 1) * articlesPerPage;
      const endNum = startNum + articlesPerPage;

      searchedRawRecords.array = searchedRawRecords.array.slice(startNum, endNum);
    }

    return {
      searchedRawRecords,
      resultCount,
    }
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
   * - For uriParam, see '@/configs/articleConfigs.ts'
   * ### If there's no document corresponds to current uri, @returns `""` (empty string)
  */
  const getArticleComponentName = (docURI: string) => {
    const fullUri = URI_PARENT + "/" + docURI;
    if (articleDocumentSet.has(fullUri))
      return fullUri
    else
      return null
  }



  return {
    articles: {
      getCategoryRecords: getArticleCategoryRecords,
      getCategorySet: () => categorySet,
      getTagsObject: () => tags,
      query,
      searchQuery,
      pageContext,
    }, 
    reader: {
      getComponentName: getArticleComponentName
    }
  }
})
