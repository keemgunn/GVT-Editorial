import { componentList } from '@/template/components';
// * UNCOMMENT THESE TO SEE THE LISTS
// console.log('NavBar List:', Object.keys(componentList.NavBar));
export default {



  /** LAYOUTS =================================== */

  /**
   * The Navigation Bar decides how #app layout forms.
   * Each NavBar's component settings are defined in each folder's `index.ts`
   * See each component files in @/template/components/
   */
  navBar: componentList.NavBar
    .NavBar_HorizonLinks(false, false, undefined),
  
  
  /** This decides thresholds in responsive design. */
  breakpoints: {
    XXS: 320,
    XS: 700,
    S: 1030,
    M: 1360,
    L: 1920,
    XL: 2400,
    XXL: 10000,
  } satisfies ResponsiveSizeEntry,


  /** COLORS / THEMES ========================== */

  /** Theme settings cae be configured in @/configs/styles/colors.scss */
  colorScheme: {
    appearance: 'auto',
    lightThemeClass: 'theme--default-light',
    darkThemeClass: 'theme--default-dark',
  } satisfies ColorSchemeSettings,

  /**
  * The color that will be applied to Safari container colors on Apple Devices. 
  * Corresponds to theme-class-names in `../styles/_colors.scss`
   */
  browserContainerColors: {
    "theme--default-light": '#ffffff',
    "theme--default-dark": '#f0f0f0',
  },



}