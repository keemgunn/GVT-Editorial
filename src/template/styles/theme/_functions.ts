import { useThemeStore } from './_store';
import { useFrameStore } from '../frame/_store';
import { injectMetaName } from '@/template/hooks/headInjection';


export function appleThemeColor() {
  const store = useThemeStore();
  const frameStore = useFrameStore();

  if (frameStore.userBrowser === 'safari') {
    if (frameStore.userDevice === 'iphone') {
      injectMetaName("theme-color", "#000000");
    } else {
      injectMetaName("theme-color", store.containerColor);
    }
  }

  else return
}


/**
 * This method mutates `store.currentThemeClass` based on store.themeSettings properties.
 * 1. Decide Color Scheme (boolean)
 * 2. Get ThemeClass string value by color scheme
 */
export function changeTheme(colorSchemeQuery: MediaQueryList) {
  const store = useThemeStore();

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