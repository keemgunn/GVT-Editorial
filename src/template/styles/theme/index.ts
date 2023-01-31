/**
 * THIS COMPOSABLE DOES THOSE THINGS:
 * 
 * 1. Change store.currentThemeClass by using changeTheme() mehtod when store.themeSettings or colorSchemeQuery changes
 * 
 * 2. When store.themeSettings mutates, changeTheme
 * 
 * 3. When OS Color Scheme Changes, changeTheme (If `store.themeSettings.appearance` is `"auto"`)
 */

import { watch, onMounted } from 'vue';
import { useThemeStore } from './_store';
import { useFrameStore } from '../frame/_store';
import addMetaTags from '@/template/helpers/dom/addMetaTags';

export function useTheme() {

  // MediaQueryList Object 
  // that detects OS's color scheme
  const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');

  // Stores user's current theme settings
  const store = useThemeStore();

  // Stores user's current device and screen sets
  const frameStore = useFrameStore();
  

  function appleThemeColor(themeClass: string) {

    if (frameStore.userBrowser === 'safari') {
      if (frameStore.userDevice === 'iphone') {
        addMetaTags("theme-color", "#000000");
      } else {
        addMetaTags("theme-color", store.containerColor);
      }
    }

    else return
  }


  /**
   * This method mutates `store.currentThemeClass` based on store.themeSettings properties.
   * 1. Decide Color Scheme (boolean)
   * 2. Get ThemeClass string value by color scheme
   */
  function changeTheme() {

    // 1. Decide Color Scheme (boolean)
    if (store.themeSettings.appearance === "auto") {
      store.isDark = colorSchemeQuery.matches;
    } else if (store.themeSettings.appearance === "dark") {
      store.isDark = true;
    } else if (store.themeSettings.appearance === "light") {
      store.isDark = false;
    }

    // 2. Get ThemeClass string value by color scheme
    if (store.isDark) {
      store.currentThemeClass = store.themeSettings.darkThemeClass;
    } else {
      store.currentThemeClass = store.themeSettings.lightThemeClass;
    }
  }

  // When store.currentThemeClass mutates, 
  // change class of<body> tag.
  watch(() => store.currentThemeClass, (newThemeClass, oldThemeClass) => {

    // 1. Append Classes
    document.body.classList.remove(oldThemeClass);
    document.body.classList.add(newThemeClass);

    // 2. Other Color Settings
    appleThemeColor(newThemeClass);
  })

  // When store.themeSettings mutates, changeTheme
  watch(store.themeSettings, () => {
    changeTheme();
  })

  // When OS Color Scheme Changes, changeTheme
  colorSchemeQuery.onchange = () => {
    changeTheme();
  };











  onMounted(() => changeTheme());
}