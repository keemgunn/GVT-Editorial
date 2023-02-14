import configs from './configs.yml';
const { AVERAGE_READING_SPEED_IN_WORDS } = configs;



/**
 * Extract only FrontHead part from given markdown raw text.
 */
export function extractFrontHeadPart(markdownRaw: string): Array<string> {
    return markdownRaw.split('---')[1]
      .split('\n')
      .map((line) =>
        line.replace(/\"|\'/g,'')
      )
}



/**
 * String formatted array into Javascript Array
 */
export function toRealArray(str: string): string[] {
  return str.trim()
    .slice(1, -1)
    .split(",").map((value) => 
      value.trim().replace(/\"|\'/g,'')
    )
}


/**
 * Check duplicated uri and show error
 */
export function checkDuplicatedUri(props: ArticleRecord, articlesList: any) {
    if (props.uri in articlesList) {
      console.error(" - DUPLICATED URI");
      console.error("   file:", props.filename);
      console.error("   uri:", props.uri);
      props.uri = props.uri + "-02"
    }
}



/**
 * Check category
 */
export function checkCategory(props: ArticleRecord, categories: any) {
  if (!(props.category in categories)) {
    console.error(" - UNKNOWN CATEGORY");
    console.error("   file:", props.filename);
    console.error("   category:", props.category);
  }
}



/**
 * Remove unnecesarry strings from raw markdown formats.
 */
export function tidyUpRaw(markdownRaw: string): string {
  return markdownRaw.split("---")[2].replace(/\n/g,' ').replace(/#|^|\`|\[|\]|\{|\}|=|<component.*?\/>|\^longnote/g,'')
}



/**
 * Calculate read time based on the length of given markdown text.
 */
export function calcReadingTime(tidiedMarkdownRaw: string): string {
  const wordCount = tidiedMarkdownRaw.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / AVERAGE_READING_SPEED_IN_WORDS);
  return `${readingTime} minute read`;
}