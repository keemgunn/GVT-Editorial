export { };
declare global {

  type Appearence = 'light' | 'dark' | 'auto';
  /**
   * @property appearance : "light" | "dark" | "auto"
   * @property lightThemeClass: string
   * @property darkThemeClass: string
   */
  interface ColorSchemeSettings {
    appearance: Appearence,
    lightThemeClass: string,
    darkThemeClass: string
  }
  
}
