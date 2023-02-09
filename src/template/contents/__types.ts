export { };
declare global {


  type ArticleHighlightState = 
    'normal' | 'trending' | 'featured';

  interface ArticleRecord {

    // --------- FROM FrontHead Props
    title: string;
    uri: string;
    date: string; // YYYY-MM-DD
    description: string;
    tags: Array<string>;
    category: string;
    coverImage: string;

    // --------- Added in later logic
    filename: string;
    highlighted: ArticleHighlightState;
    readTime: string;
  }

  type ArticleRecords = Record<string, ArticleRecord>

  type ArticleRawRecords = Record<string, string>
}