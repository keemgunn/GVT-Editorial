export { };
declare global {

  type PageAccessType = 'public' | 'user' | 'admin' | 'none';

  /**
   * @property name: `string`
   * @property uri: `string`
   * @property alias: `Array<string>`
   * @property allowAccess: `PageAccessType` : 'public' | 'user' | 'admin' | 'none';
   */
  interface PageRouteSetting {
    uri: string;
    alias: Array<string>;
    allowAccess: PageAccessType;
  }

}
