/**
 * Using vite-plugin-vue-markdown. See("https://www.npmjs.com/package/vite-plugin-vue-markdown")
*/
import { defineAsyncComponent } from 'vue'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import categories from '@/contents/articles/categories.yml'
import { formatRawMarkdowns } from './_markdownHandler';
import { ArticleRecordsPack } from './_classes';



// Get all articles in raw string
const markdownModules = import.meta.glob('../../contents/articles/**/*.md', { eager: true, import: 'default', as: 'raw' });

// Make a list of articles records from raw strings
const { articleRecords, articleRawRecords }
= formatRawMarkdowns(markdownModules);
console.warn('articleRecords:', articleRecords);

// Sort Raw Records for search result
const articlePack = new ArticleRecordsPack((articleRecords))
articlePack.sortDesc('date');

// Sort Raw Records for search result
articleRawRecords.sort((a, b) => {
  if (a.date < b.date) return -1;
  if (a.date > b.date) return 1;
  return 0;
})


// For Dynamic Components
let markdownComponents: any = {};
// For Filtering Articles with Tags
const tagSet: Set<string> = new Set([]);
// For Filtering Articles with Categories
const categorySet: Set<string> = new Set(Object.keys(categories));


articleRecords.forEach((props) => {

  // Add Dynamic Component module
  // const importName = getImportName(props);
  let importName = props.filename.split('.md')[0];

  let moduleImport: () => Promise<any>;
  switch (props.highlighted) {
    // Dynamic Import only allows inserting variable in a single level. 
    case 'featured':
      moduleImport = () => import(`../../contents/articles/featured/${importName}.md`)
      break;
    case 'trending':
      moduleImport = () => import(`../../contents/articles/trending/${importName}.md`)
      break;
    default:
      moduleImport = () => import(`../../contents/articles/normal/${importName}.md`)
  }

  const container = {
    [props.uri]: defineAsyncComponent( moduleImport )
  }
  markdownComponents = { ...markdownComponents, ...container };

  // Collect Tags
  props.tags.forEach((tag) => {
    tagSet.add(tag);
  })
})
export { markdownComponents }



export const article = {
  package: articlePack,
  rawRecords: articleRawRecords,
  categoryRecords: categories,
  tagSet: tagSet,
  categorySet: categorySet,
}




