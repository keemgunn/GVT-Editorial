import articleConfigs from '@/contents/articles/configs.yml';
import { calcReadingTime, checkCategory, checkDuplicatedUri, extractFrontHeadPart, tidyUpRaw, toRealArray } from './_helpers';
const { categories, uriParent } = articleConfigs;


/**
// GET Keys of interface: ArticleRecord as Array<string>
const frontHeadClassTypeModule = import.meta.glob('./__types.ts', { eager: true, import:'default', as: 'raw ' }) as Record<string, string>;
// console.log(frontHeadClassTypeModule);

const frontHeadClassTypeLines = (frontHeadClassTypeModule['./__types.ts'] as any).split('ArticleRecord')[1].split('\n').slice(1).slice(0, -2) as Array<string>

const articleFrontHeadKeys: Array<string> = [];
frontHeadClassTypeLines.forEach((line) => {
  articleFrontHeadKeys.push(line.split(":")[0].trim());
})
*/

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
if ((typeof uriParent) !== 'string') {
  console.warn(' - WRONG uriParent ... in @/contents/articles/configs.yml');
}
if ((uriParent as string)[0] !== '/') {
  console.warn(" - uriParent must start with '/' ... in @/contents/articles/configs.yml");
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
      result['uri'] = (uriParent as string) + "/" + value;
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
    checkCategory(articleRecord, categories);
    
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