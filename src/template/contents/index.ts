/**
 * Using vite-plugin-vue-markdown. See("https://www.npmjs.com/package/vite-plugin-vue-markdown")
*/
import { defineAsyncComponent } from 'vue'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import cc from '@/contents/_configs.yml'
import { formatRawMarkdowns } from './_handleMarkdown';


const markdownModules = import.meta.glob('../../contents/*-post.md', { eager: true, import: 'default', as: 'raw' });

// Make a list of articles
export const {articleList, rawDocList} = formatRawMarkdowns(markdownModules);
console.warn('articleList:', articleList);
// console.log(rawDocList);

// For Dynamic Components
let markdownComponents: any = {};
// For Filtering Articles with Tags
export const tagSet: Set<string> = new Set([]);
// For Filtering Articles with Categories
export const categorySet: Set<string> = new Set(Object.keys(cc.categories));

for (const [uri, props] of Object.entries(articleList)) {
  
  // Add Dynamic Component module
  const importName = props.filename.split('-post.md')[0]; // filename example: 20230208-Example_Document-post.md
  const container = {
    [uri]: defineAsyncComponent(() => import(`../../contents/${importName}-post.md`))
  }
  markdownComponents = { ...markdownComponents, ...container };

  // Collect Tags
  props.tags.forEach((tag) => {
    tagSet.add(tag);
  })
}


export { markdownComponents }