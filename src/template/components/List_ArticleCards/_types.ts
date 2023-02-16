export { } 
declare global {

  // interface AdSizeByScale {
  //   XXS: { width: number, height: number },
  //   XS: { width: number, height: number },
  //   S: { width: number, height: number },
  //   M: { width: number, height: number },
  //   L: { width: number, height: number },
  //   XL: { width: number, height: number },
  //   XXL: { width: number, height: number },
  // }

  type AdSizeByScale = Record<ScaleCode, { width: number, height: number }>;

}