/**
 * Import all components in `#/components` and exports.
 */
import { defineAsyncComponent } from 'vue'
import searchModules from "#/helpers/modules/searchModules";

const moduleArray = searchModules(import.meta.glob('./CC_*.vue'))

let modules: any = {}

for (let i = 0; i < moduleArray.length; i++) {

  const fullName = moduleArray[i].split('.').slice(-2)[0].split('/')[1]
  const lastName = fullName.split('CC_')[1];

  const container = {
    [fullName]: defineAsyncComponent(() => import(`./CC_${lastName}.vue`))
  }
  modules = { ...modules, ...container };
}

export default modules