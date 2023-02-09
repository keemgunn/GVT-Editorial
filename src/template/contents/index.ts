/**
 * Using vite-plugin-vue-markdown. See("https://www.npmjs.com/package/vite-plugin-vue-markdown")
*/
import { defineAsyncComponent } from 'vue'
import { defineStore } from 'pinia'
import { ref, markRaw } from 'vue'
import cc from '@/contents/_configs.yml'
import searchModules from '@/template/helpers/modules/searchModules';

const moduleArray = searchModules(import.meta.glob('@/contents/*-post.md'))
let markdownComponents: any = {};
const articleListRaw: Array<string> = [];

for (let i = 0; i < moduleArray.length; i++) {

  const name = moduleArray[i].split('.').slice(-2)[0].split('/').slice(-1)[0].split('-post')[0];
  const uri = "article_" + name.replace('-', '_').toLowerCase();
  /** Example :
  * URL: /src/contents/20230208-Example_Document-post.md
  * name: 20230208-Example_Document
  * uri: 20230208_example_document
      * This uri goes into webpage url endpoint to the article & identified name for Vue component that declared globally in `@/main.ts`
  */

  const container = {
    [uri]: defineAsyncComponent(() => import(`../../contents/${name}-post.md`))
  }

  markdownComponents = { ...markdownComponents, ...container };
  articleListRaw.push(uri);
}
console.warn('articleList:', articleListRaw);


export const useContentsStore = defineStore('contents', () => {

  const configs = ref(cc);
  const articleList = markRaw(articleListRaw);

  return { 
    configs, 
    articleList
  }
})

export { markdownComponents }