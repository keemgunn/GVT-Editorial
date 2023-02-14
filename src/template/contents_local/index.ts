/**
 * Using vite-plugin-vue-markdown. See("https://www.npmjs.com/package/vite-plugin-vue-markdown")
*/
import { defineAsyncComponent } from 'vue'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import articleConfigs from '@/contents/articles/configs.yml';
import { formatRawMarkdowns } from './_markdownHandler';
import { ArticleRecordsPack } from './_classes';
const { categories, uriParent } = articleConfigs;


// Get all articles in raw string
const markdownModules = import.meta.glob('../../contents/articles/**/*.md', { eager: true, import: 'default', as: 'raw' });

// Make a list of articles records from raw strings
const { articleRecords, articleRawRecords }
  = formatRawMarkdowns(markdownModules);

console.log('articleRecords FROM LOCAL:', articleRecords);
export { articleRecords } // For Component registration

export const useLocalContents = defineStore('localContents', () => {

  // Table Of Codes
  // 1. Articles
  // 2. Reader

  // ==========================================
  // 1. Articles
  // ==========================================

  const articleList = articleRecords;
  const articleRawList = articleRawRecords;
  const totalArticlesNumber = articleRecords.length;

  // Default Sort : date desc order
  articleList.sort((a, b) => {
    if (a.date < b.date) return 1;
    if (a.date > b.date) return -1;
    return 0;
  })
  articleRawRecords.sort((a, b) => {
    if (a.date < b.date) return -1;
    if (a.date > b.date) return 1;
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


  // DATA REQUESTS ------------------
  // THESE LOGICS ARE ONLY FOR USING LOCAL MARKDOWN CONTENTS.
  // WHEN USING EXTERNAL CONTENTS FROM ANOTHER SERVER, WRITE SOME NEW CODES WITH SAME NAMES.

  /** ((Local Markdown Files)) Get only paged ArticleRecordsPack. */
  const getPagedArticles = (showNum: number, pageNum: number) : ArticleRecordsPack => {
    const wholeCount = articleList.length;
    const extra = wholeCount % showNum;
    const pages = Math.round(wholeCount / showNum);
    
    if (pageNum > pages)
    return new ArticleRecordsPack([])

    const startNum = (pageNum - 1) * showNum;
    const endNum = startNum + showNum;
    const newArr = articleList.slice(startNum, endNum);
    return new ArticleRecordsPack(newArr)
  };

  /** ((Local Markdown Files)) Get only highlighted ArticleRecordsPack. @param state: "normal" | "trending" | "featured" */
  const getHighlightedArticles = (state: ArticleHighlightState) : ArticleRecordsPack => {
    const newArr = articleList.filter((article) => article.highlighted === state);
    return new ArticleRecordsPack(newArr)
  }

  /** ((Local Markdown Files)) Get only ArticleRecordsPack under certain category. */
  const getCategorizedArticles = (category: string): ArticleRecordsPack => {
    const newArr = articleList.filter((article) => article.category === category);
    return new ArticleRecordsPack(newArr)
  }

  /** ((Local Markdown Files)) Get only ArticleRecordsPack under certain tag. */
  const getTaggedArticles = (tag: string): ArticleRecordsPack => {
    const newArr = articleList.filter((article) => article.tags.includes(tag));
    return new ArticleRecordsPack(newArr)
  }

  /** ((Local Markdown Files)) Get a SET of categories. */
  const getArticleCategoryRecords = (): CategoryRecords => {
    return categories as CategoryRecords
  }

  // TODO : Search Call Function



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
      totalNumber: totalArticlesNumber, 
      getPaged: getPagedArticles, 
      getHighlighted: getHighlightedArticles, 
      getCategorized: getCategorizedArticles, 
      getTagged: getTaggedArticles, 
      getCategoryRecords: getArticleCategoryRecords,
      getCategorySet: () => categorySet,
      getTagSet: () => tagSet,
    }, 
    reader: {
      getComponentName: getArticleComponentName
    }
  }
})





