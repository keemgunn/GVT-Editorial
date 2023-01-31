export { };
declare global {

  /**
   * @property allowAccess: 'public' | 'admin' | 'none'
   * @property displayOnNav: boolean
   * @property path: string
   * @property beforeEnter: () => void
   * @property displayName: string
   * @property icon: string
   */
  interface PageSetting {
    allowAccess: 'public' | 'admin' | 'none';
    displayOnNav: boolean;
    path: string;
    displayName: string;
    icon: string;
    beforeEnter: () => void;
  }

  /**
   * @property allowAccess: 'public' | 'admin' | 'none'
   * @property displayOnNav: boolean
   * @property path: string
   * @property beforeEnter: () => void
   * @property displayName: string
   * @property icon: string
   */
  interface PageRouteSettings extends Record<string, PageSetting> { }
  
  /**
   * @property displayName: `string`
   * @property url: `string`
   * @property icon: `string`
   */
  interface NavRecord {
    displayName: string
    url: string
    icon: string
  }
  
}
