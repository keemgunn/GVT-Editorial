export { };
declare global {

  type AppType = 'app' | 'editorial' | 'landing'

  /**
   * 
   * @property XXL: number,
   * @property XL: number,
   * @property L: number,
   * @property M: number,
   * @property S: number,
   * @property XS: number,
   * @property XXS: number,
   */
  interface ResponsiveSizeEntry {
    XXL: number,
    XL: number,
    L: number,
    M: number,
    S: number,
    XS: number,
    XXS: number,
  }
}
