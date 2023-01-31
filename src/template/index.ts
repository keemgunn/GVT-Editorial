import { useFrame } from './styles/frame';
import { useTheme } from './styles/theme';

import atomModules from './ui/atoms';
import elementModules from './ui/elements';
import componentModules from './ui/components';


export const templateAtoms = atomModules;
export const templateElements = elementModules;
export const templateComponents = componentModules;


/**
 * Import this function and call in App.vue (Top Container)
 * 
 * @example
 * ```
 * import { useTemplate } from './template`;
 * useTemplate();
 * ```
 * 
 * @contains css files inside the template
 * 
 * @calls `useTheme()`
 * 
*/
export function useTemplate() {

  // =================== CSS FILES
  import('./main.scss')

  // =================== COMPOSABLES
  useFrame();
  useTheme();

}
