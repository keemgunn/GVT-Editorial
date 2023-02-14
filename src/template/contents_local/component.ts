import { articleRecords } from ".";
import { defineAsyncComponent } from 'vue'

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
})
export { markdownComponents }