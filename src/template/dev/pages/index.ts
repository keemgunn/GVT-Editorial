/**
 * Import all components in `@/template/components` and exports.
 */
import { defineAsyncComponent } from 'vue'
import searchModules from "@/template/helpers/modules/searchModules";

const moduleArray = searchModules(import.meta.glob('./*.vue'))


let modules: any = {}

for (let i = 0; i < moduleArray.length; i++) {
  const name = moduleArray[i].split('.').slice(-2)[0].split('/')[1].split('-')[0]

  const container = {
    [name]: defineAsyncComponent(() => import(`./${name}.vue`))
  }
  modules = { ...modules, ...container };
}

export default modules