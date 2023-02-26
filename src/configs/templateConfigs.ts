import { componentList } from '@/template/components';
// * UNCOMMENT THESE TO SEE THE LISTS
// console.log('NavBar List:', Object.keys(componentList.NavBar));

// Favicon and Logo SHOULD BE .SVG FORMAT.
import brandLogoSvg from '@/assets/svg/logo-brand-main.svg';
import faviconLight from '@/assets/favicon/favicon-light.svg';
import faviconDark from '@/assets/favicon/favicon-dark.svg';


export default {

  /** ASSETS ==================================== */
  BRAND_LOGO: brandLogoSvg,
  FAVICON_LIGHT: faviconLight,
  FAVICON_DARK: faviconDark,



  /** LAYOUTS =================================== */
  
  /**
   #### templateConfigs/
   * The Navigation Bar decides how #app layout forms.
   * Each NavBar's component settings are defined in each folder's `index.ts`
   * See each component files in @/template/components/
   */
  NAV_BAR: componentList.NavBar
    .NavBar_HorizonLinks(false, false, undefined),
  
  /** This decides thresholds in responsive design. */
  BREAKPOINTS: {
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
  COLOR_SCHEME: {
    appearance: 'auto',
    lightThemeClass: 'theme--default-light',
    darkThemeClass: 'theme--default-dark',
  } satisfies ColorSchemeSettings,

  /**
  * The color that will be applied to Safari container colors on Apple Devices. 
  * Corresponds to theme-class-names in `../styles/_colors.scss`
   */
  BROWSER_CONTAINER_COLORS: {
    "theme--default-light": '#ffffff',
    "theme--default-dark": '#f0f0f0',
  },

}