export { };
declare global {

  interface ArticleRecord {
    title: string;
    uri: string;
    date: string; // YYYY-MM-DD
    filename: string;
    description: string;
    tags: Array<string>;
    category: string;
    coverImage: string;
  }

  type ArticleRecords = Record<string, ArticleRecord>

  type ArticleRawRecords = Record<string, string>
}