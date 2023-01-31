export { };
declare global {

  /**
   * @property appearance : "light" | "dark" | "auto"
   * @property lightThemeClass: string
   * @property darkThemeClass: string
   */
  interface ColorSchemeSettings {
    appearance: "light" | "dark" | "auto",
    lightThemeClass: string,
    darkThemeClass: string
  }
  
}
