export { };
declare global {

  type PageAccessType = 'public' | 'user' | 'admin' | 'none';

  type NavType = 'link' | 'dropdown' | 'none';

  /**
   * @property allowAccess: 'public' | 'admin' | 'none'
   * @property navType: 'link' | 'dropdown' | 'none'
   * @property uri: string
   * @property dirName: string
   * @property beforeEnter: () => any
   * @property navTitle: string
   * @property navIcon: string
   * @property navLink: string
   */
  interface PageSetting {
    dirName: string;
    uri: string;
    alias: Array<string>;
    allowAccess: PageAccessType;
    
    navType: NavType;
    navTitle: string;
    navIcon: string;
    navLink: string;

    beforeEnter: () => any;
  }



  /**
   * @property allowAccess: 'public' | 'admin' | 'none'
   * @property navType: boolean
   * @property uri: string
   * @property dirName: string
   * @property beforeEnter: () => any
   * @property navTitle: string
   * @property navIcon: string
   * @property navLink: string
   */
  type PageSettings = Array<PageSetting>;
  // interface PageSettings extends Record<string, PageSetting> { }
  


  /**
   * @property navTitle: `string`
   * @property url: `string`
   * @property navIcon: `string`
   * @property navLink: string
   */
  interface NavRecord {
    navTitle: string,
    navType: NavType
    uri: string
    navIcon: string
    navLink: string
  }
  
}
