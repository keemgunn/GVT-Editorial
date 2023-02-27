/**
 * THIS COMPOSABLE DOES THOSE THINGS:
 * 
 * 1. Change store.currentThemeClass by using changeTheme() mehtod when store.themeSettings or colorSchemeQuery changes
 * 
 * 2. When store.themeSettings mutates, changeTheme
 * 
 * 3. When OS Color Scheme Changes, changeTheme (If `store.themeSettings.appearance` is `"auto"`)
 */
import { watch, onMounted, onBeforeMount } from 'vue';
import { useThemeStore } from './_store';
import { appleThemeColor, changeTheme, appearanceLSsync, appearanceLSsave, appearanceSessionSave, appearanceSessionSync } from './_functions';

export function useTheme() {

  // MediaQueryList Object 
  // that detects OS's color scheme
  const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');

  const store = useThemeStore();
  
  // When store.currentThemeClass mutates, 
  // change class of<body> tag.
  watch(() => store.currentThemeClass, (newThemeClass, oldThemeClass) => {

    // 1. Append Classes
    document.body.classList.remove(oldThemeClass);
    document.body.classList.add(newThemeClass);

    // 2. Other Color Settings
    appleThemeColor();
  })

  // When store.themeSettings mutates, changeTheme
  watch(store.themeSettings, () => {
    changeTheme(colorSchemeQuery);
  })

  // When OS Color Scheme Changes, changeTheme
  colorSchemeQuery.onchange = () => {
    changeTheme(colorSchemeQuery);
  };

  onMounted(() => changeTheme(colorSchemeQuery));

  onBeforeMount(() => {
    appearanceSessionSync();
  })
}

export function toggleDarkmode() {
  const store = useThemeStore();

  if (store.isDark) 
    store.themeSettings.appearance = 'light';
  else 
    store.themeSettings.appearance = 'dark';
  
  appearanceSessionSave();
}