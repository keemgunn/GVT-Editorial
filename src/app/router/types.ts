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
  interface ViewSetting {
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
  interface ViewRouteSettings extends Record<string, ViewSetting> { }
  
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
