export { };
declare global {

  type pageAccessType = 'public' | 'user' | 'admin' | 'none';

  /**
   * @property allowAccess: 'public' | 'admin' | 'none'
   * @property displayOnNav: boolean
   * @property uri: string
   * @property dirName: string
   * @property beforeEnter: () => any
   * @property displayName: string
   * @property icon: string
   */
  interface PageSetting {
    dirName: string;
    displayName: string;

    uri: string;
    alias: Array<string>;

    allowAccess: pageAccessType;
    displayOnNav: boolean;
    icon: string;
    beforeEnter: () => any;
  }



  /**
   * @property allowAccess: 'public' | 'admin' | 'none'
   * @property displayOnNav: boolean
   * @property uri: string
   * @property dirName: string
   * @property beforeEnter: () => any
   * @property displayName: string
   * @property icon: string
   */
  type PageSettings = Array<PageSetting>;
  // interface PageSettings extends Record<string, PageSetting> { }
  


  /**
   * @property displayName: `string`
   * @property url: `string`
   * @property icon: `string`
   */
  interface NavRecord {
    displayName: string
    uri: string
    icon: string
  }
  
}
