export { };
declare global {

  interface ArticleFrontHead {
    title: string;
    uri: string;
    date: string; // YYYY-MM-DD
    filename: string;
    description: string;
    tags: Array<string>;
    category: string;
    coverImage: string;
  }

  type ArticleList = Record<string, ArticleFrontHead>

  type RawDocList = Record<string, string>
}