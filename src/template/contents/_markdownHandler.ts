import categories from '@/contents/articles/categories.yml';
import { calcReadingTime, checkCategory, checkDuplicatedUri, extractFrontHeadPart, tidyUpRaw, toRealArray } from './_helpers';




// GET Keys of interface: ArticleRecord as Array<string>

const frontHeadClassTypeModule = import.meta.glob('./__types.ts', { eager: true, as: 'raw ' }) as Record<string, string>;

const frontHeadClassTypeLines = (frontHeadClassTypeModule['./__types.ts'] as any).default.split('ArticleRecord')[1].split('\n').slice(1).slice(0, -2) as Array<string>

const articleFrontHeadKeys: Array<string> = [];
frontHeadClassTypeLines.forEach((line) => {
  articleFrontHeadKeys.push(line.split(":")[0].trim());
})





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

  // Set filename
  result['filename'] = filepath.split('/').slice(-1)[0];
    // Example: 20230208-Example_Document-post.md

  return result as ArticleRecord
}





export function formatRawMarkdowns(markdownModules: Record<string, string>): {articleRecords: Array<ArticleRecord>, articleRawRecords: Array<ArticleRawRecord>} {

  const articlesList: Array<ArticleRecord> = [];
  const articleRawRecords: Array<ArticleRawRecord> = [];

  // Get fronthead properties for each markdown files.
  for (const [ filepath, markdownRaw ] of Object.entries(markdownModules)) {
    const articleRecord = extractFrontHeadProps(filepath, markdownRaw)
    
    checkDuplicatedUri(articleRecord, articlesList);
    checkCategory(articleRecord, categories);
    
    const tidiedMarkdownRaw = tidyUpRaw(markdownRaw);
    articleRecord.readTime = calcReadingTime(tidiedMarkdownRaw);

    const articleRawRecord: ArticleRawRecord = {
      title: articleRecord.title,
      uri: articleRecord.uri,
      tags: articleRecord.tags,
      category: articleRecord.category,
      date: articleRecord.date,
      raw: tidiedMarkdownRaw
    }

    articlesList.push(articleRecord);
    articleRawRecords.push(articleRawRecord);
  }

  return {
    articleRecords: articlesList,
    articleRawRecords: articleRawRecords
  }
}