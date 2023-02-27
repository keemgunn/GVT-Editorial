import configs from '../configs';
import { calcReadingTime, checkCategory, checkDuplicatedUri, extractFrontHeadPart, tidyUpRaw, toRealArray } from './_helpers';
const { CATEGORIES, ARTICLE_PARENT } = configs.article;

const articleFrontHeadKeys = [
  // --------- FROM FrontHead Props
  "title",
  "uri",
  "date", // YYYY-MM-DD
  "description",
  "tags",
  "category",
  "coverImage",

  // --------- Added in later logic
  "filename",
  "highlighted",
  "readTime",
]


// Safety
if ((typeof ARTICLE_PARENT) !== 'string') {
  console.warn(' - WRONG ARTICLE_PARENT ... in @/contents/articles/configs.ts');
} if ((ARTICLE_PARENT)[0] !== '/') {
  console.warn(" - ARTICLE_PARENT must start with '/' ... in @/contents/articles/configs.ts");
}


function extractFrontHeadProps(filepath: string, markdownRaw: string): ArticleRecord {

  // Extract only FrontHead part.
  const frontheadPart = extractFrontHeadPart(markdownRaw);

  // Final Object
  const result: any = {};

  frontheadPart.forEach((line) => {

    // If the line is not in "key:value" format, stop the process.
    if (!line.includes(":")) return

    // Extract the key for each FrontHead Props.
    const key = line.split(":")[0].trim();
    const value = line.split(":")[1].trim();
    
    // If the key doesn't exist in the interface declaration: ArticleRecord, stop the process.
    if(!articleFrontHeadKeys.includes(key)) return
    
    if (key === 'coverImage') {
      const value = line.replace("coverImage:", "").trim();
      result['coverImage'] = value;
      return
    }

    if (key === 'tags') {
      result['tags'] = toRealArray(value);
      return
    }

    if (key === 'uri') {
      result['uri'] = ARTICLE_PARENT + "/" + value;
      return
    }

    result[key] = value;
  })

  // Set Highlight State
  let highlightState: ArticleHighlightState;
  const folder = filepath.split('/').slice(-2)[0];
  if ((folder === 'trending') || (folder === 'featured')) {
    highlightState = folder;
  } else {
    highlightState = 'normal';
  }
  result['highlighted'] = highlightState;

  result['readTime'] = 'not-calculated-yet';
    // will do later below. just for type matching...
  
  result['raw'] = "";

  // Set filename
  result['filename'] = filepath.split('/').slice(-1)[0];
    // Example: 20230208-Example_Document-post.md

  return result as ArticleRecord
}





export function formatRawMarkdowns(markdownModules: Record<string, string>): {articleRecords: Array<ArticleRecord>, articleRecordsWithRaw: Array<ArticleRecord>} {

  const articlesList: Array<ArticleRecord> = [];
  const articleRecordsWithRaw: Array<ArticleRecord> = [];

  // Get fronthead properties for each markdown files.
  for (const [ filepath, markdownRaw ] of Object.entries(markdownModules)) {
    const articleRecord = extractFrontHeadProps(filepath, markdownRaw)
    
    checkDuplicatedUri(articleRecord, articlesList);
    checkCategory(articleRecord, CATEGORIES);
    
    const tidiedMarkdownRaw = tidyUpRaw(markdownRaw);
    articleRecord.readTime = calcReadingTime(tidiedMarkdownRaw);

    const articleRawRecord = { ...articleRecord }
    articleRawRecord.raw = tidiedMarkdownRaw;

    articlesList.push(articleRecord);
    articleRecordsWithRaw.push(articleRawRecord);
  }

  return {
    articleRecords: articlesList,
    articleRecordsWithRaw: articleRecordsWithRaw
  }
}