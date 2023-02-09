import cc from '@/contents/_configs.yml'
const { categories } = cc;


// GET Keys of interface: ArticleFrontHead as Array<string>

const frontHeadClassTypeModule = import.meta.glob('./__types.ts', { eager: true, import: 'default', as: 'raw ' }) as Record<string, string>;

const frontHeadClassTypeLines = frontHeadClassTypeModule['./__types.ts'].split('ArticleFrontHead')[1].split('\n').slice(1).slice(0, -2)

const articleFrontHeadKeys: Array<string> = [];
frontHeadClassTypeLines.forEach((line) => {
  articleFrontHeadKeys.push(line.split(":")[0].trim());
})


/**
 * String formatted array into Javascript Array
 */
function toRealArray(str: string): string[] {
  return str.trim()
    .slice(1, -1)
    .split(",").map((value) => 
      value.trim().replace(/\"|\'/g,'')
    )
}



function extractFrontHeadProps(filepath: string, markdownRaw: string): ArticleFrontHead {

  // Extract only FrontHead part.
  const frontheadPart =
    markdownRaw.split('---')[1]
      .split('\n').map((line) =>
        line.replace(/\"|\'/g,'')
      )

  // Final Object
  const result: any = {};

  frontheadPart.forEach((line) => {

    // If the line is not in "key:value" format, stop the process.
    if (!line.includes(":")) return

    // Extract the key for each FrontHead Props.
    const key = line.split(":")[0].trim();
    const value = line.split(":")[1].trim();
    
    // If the key doesn't exist in the interface declaration: ArticleFrontHead, stop the process.
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

  result['filename'] = filepath.split('/').slice(-1)[0];
    // Example: 20230208-Example_Document-post.md

  return result as ArticleFrontHead
}



export function formatRawMarkdowns(markdownModules: Record<string, string>): {articleList: ArticleList, rawDocList: RawDocList} {

  const articlesList: any = {};
  const rawDocList: any = {};

  // Get fronthead properties for each markdown files.
  for (const [ filepath, markdownRaw ] of Object.entries(markdownModules)) {
    const props = extractFrontHeadProps(filepath, markdownRaw)

    // Check duplicated uri and show error
    if (props.uri in articlesList) {
      console.error(" - DUPLICATED URI");
      console.error("   file:", props.filename);
      console.error("   uri:", props.uri);
      props.uri = props.uri + "-02"
    }

    // Check category
    if (!(props.category in categories)) {
      console.error(" - UNKNOWN CATEGORY");
      console.error("   file:", props.filename);
      console.error("   category:", props.category);
    }

    articlesList[props.uri] = props
    rawDocList[props.uri] = markdownRaw.split("---")[2].replace(/\n/g,' ').replace(/#|^|\`|\[|\]|\{|\}|=|<component.*?\/>|\^longnote/g,'');
  }

  return {
    articleList: articlesList as ArticleList,
    rawDocList: rawDocList as RawDocList
  }
}