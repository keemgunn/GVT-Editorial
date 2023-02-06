export { };
declare global {

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
    allowAccess: 'public' | 'admin' | 'none';
    displayOnNav: boolean;
    dirName: string;
    displayName: string;
    uri: string;
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
  type PageRouteSettings = Array<PageSetting>;
  // interface PageRouteSettings extends Record<string, PageSetting> { }
  
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
