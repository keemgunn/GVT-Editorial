export { };
declare global {

  /**
   * @property `type`: "app" | "page" | "zen"
      * @type `app` : appropriate for SPA.
      * @type `page` : appropriate for blogs, web pages ...
      * @type `zen` : appropriate for lending pages, no interfaces.
   * 
   */
  interface FrameSettings {
    layoutType: "app" | "page",
  }


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
