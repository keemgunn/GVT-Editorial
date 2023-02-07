export { };
declare global {

  type PageAccessType = 'public' | 'user' | 'admin' | 'none';


  /**
   * @property name: `string`
   * @property uri: `string`
   * @property alias: `Array<string>`
   * @property allowAccess: `PageAccessType` : 'public' | 'user' | 'admin' | 'none';
   */
  interface PageRecord {
    name: string;
    uri: string;
    alias: Array<string>;
    allowAccess: PageAccessType;
  }


  /**
   * @property name: `string`
   * @property uri: `string`
   * @property alias: `Array<string>`
   * @property allowAccess: `PageAccessType` : 'public' | 'user' | 'admin' | 'none';
   */
  type PageRecords = Array<PageRecord>;
  

  
}
