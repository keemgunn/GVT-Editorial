import { articleRecords } from ".";
import { defineAsyncComponent } from 'vue'
import {
  importFeaturedArticleModulesAsync,
  importTrendingArticleModulesAsync,
  importNormalArticleModulesAsync
} from "./__import";

// For Dynamic Components
let markdownComponents: any = {};

articleRecords.forEach((props) => {

  // Add Dynamic Component module
  // const importName = getImportName(props);
  let importName = props.filename.split('.md')[0];

  let moduleImport: () => Promise<any>;
  switch (props.highlighted) {
    // Dynamic Import only allows inserting variable in a single level. 
    case 'featured':
      moduleImport = importFeaturedArticleModulesAsync(importName);
      break;
    case 'trending':
      moduleImport = importTrendingArticleModulesAsync(importName);
      break;
    default:
      moduleImport = importNormalArticleModulesAsync(importName);
  }

  const container = {
    [props.uri]: defineAsyncComponent( moduleImport )
  }
  markdownComponents = { ...markdownComponents, ...container };
})
export { markdownComponents }