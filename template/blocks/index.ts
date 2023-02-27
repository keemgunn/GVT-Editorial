/**
 * Import all components in `#/atoms` and exports.
 */
import { defineAsyncComponent } from 'vue'
import searchModules from "#/helpers/modules/searchModules";

const moduleArray = searchModules(import.meta.glob('./**/Block.vue'))

let modules: any = {}

for (let i = 0; i < moduleArray.length; i++) {

  const name = moduleArray[i].split('.').slice(-2)[0].split('/').slice(-2)[0]

  const container = {
    [name]: defineAsyncComponent(() => import(`./${name}/Block.vue`))
  }
  modules = { ...modules, ...container };
}

export default modules