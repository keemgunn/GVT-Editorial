import searchModules from "@/template/helpers/modules/searchModules";
import { defineAsyncComponent } from 'vue'


// IMPORT ALL COMPONENT SETTING CONSTRUCTORS
import NavBar_HorizonLinks from "./NavBar_HorizonLinks";
import NavBar_App from "./NavBar_App";

/**
 * FOR TEMPLATE CONFIGS
 * SEE: @/configs/template/templateConfigs.ts
 */
const componentList = {
  NavBar: {
    NavBar_HorizonLinks,
    NavBar_App,

  }
}



/**
 * Import all components in `@/template/components` and exports.
*/
const moduleArray = searchModules(import.meta.glob('./**/Component.vue'))

let componentModules: any = {}

for (let i = 0; i < moduleArray.length; i++) {

  const name = moduleArray[i].split('.').slice(-2)[0].split('/').slice(-2)[0]

  const container = {
    [name]: defineAsyncComponent(() => import(`./${name}/Component.vue`))
  }
  componentModules = { ...componentModules, ...container };
}



export {
  componentModules,
  componentList
}