/**
 * Using vite-plugin-vue-markdown. See("https://www.npmjs.com/package/vite-plugin-vue-markdown")
*/
import { defineAsyncComponent } from 'vue'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import cc from '@/contents/articles/_configs.yml'
import { formatRawMarkdowns } from './_markdownHandler';



// Get all articles in raw string
const markdownModules = import.meta.glob('../../contents/articles/**/*-post.md', { eager: true, import: 'default', as: 'raw' });

// Make a list of articles records from raw strings
const { articleRecords, articleRawRecords } = formatRawMarkdowns(markdownModules);
console.warn('articleRecords:', articleRecords);
// console.log(articleRawRecords);



// For Dynamic Components
let markdownComponents: any = {};
// For Filtering Articles with Tags
const tagSet: Set<string> = new Set([]);
// For Filtering Articles with Categories
const categorySet: Set<string> = new Set(Object.keys(cc.categories));

// For each articleRecords
for (const [uri, props] of Object.entries(articleRecords)) {
  
  // Add Dynamic Component module
  // const importName = getImportName(props);
  let importName = props.filename.split('-post.md')[0];

  let moduleImport: () => Promise<any>;
  switch (props.highlighted) {
    // Dynamic Import only allows inserting variable in a single level. 
    case 'featured':
      moduleImport = () => import(`../../contents/articles/featured/${importName}-post.md`)
      break;
    case 'trending':
      moduleImport = () => import(`../../contents/articles/trending/${importName}-post.md`)
      break;
    default:
      moduleImport = () => import(`../../contents/articles/${importName}-post.md`)
  }

  const container = {
    [uri]: defineAsyncComponent( moduleImport )
  }
  markdownComponents = { ...markdownComponents, ...container };

  // Collect Tags
  props.tags.forEach((tag) => {
    tagSet.add(tag);
  })
}
export { markdownComponents }



export function useContents() {

  const article = {
    records: articleRecords,
    rawRecords: articleRawRecords,
    categoryRecords: cc.categories,
    tagSet: tagSet,
    categorySet: categorySet,
  }

  return {
    article
  }
}



