export default {};
declare global {


  type ArticleHighlightState = 
    'normal' | 'trending' | 'featured';

  /**
   * @key title: string;
   * @key uri: string;
   * @key date: string; // YYYY-MM-DD
   * @key description: string;
   * @key tags: Array<string>;
   * @key category: string;
   * @key coverImage: string;
   * @key filename: string;
   * @key highlighted: ArticleHighlightState = 
    'normal' | 'trending' | 'featured';
   * @key readTime: string;
   */
  interface ArticleRecord {

    // --------- FROM FrontHead Props
    title: string;
    uri: string;
    date: string; // YYYY-MM-DD
    description: string;
    tags: Array<string>;
    category: string;
    coverImage: string;
    raw: string;


    // --------- Added in later logic
    filename: string;
    highlighted: ArticleHighlightState;
    readTime: string;
  }


  /**
   * @key title: string;
   * @key uri: string;
   * @key tags: Array<string>;
   * @key category: string;
   * @key date: string; // YYYY-MM-DD
   * @key raw: string;
   */
  interface ArticleRawRecord {
    // --------- FROM FrontHead Props
    articleRecord: ArticleRecord;
    raw: string;
  }


  interface CategoryRecord {
    description: string,
    uri: string
  }
  type CategoryRecords = Record<string, CategoryRecord>;


}