import { useThemeStore } from './_store';
import { useFrameStore } from '../frame/_store';
import { injectMetaName } from '#/hooks/headInjection';
import sessionStorageHelper from '#/helpers/sessionStorageHelper';
import configs from '#/configs';

// ====== DEV SETTINGS
const process_env = (process.env.NODE_ENV) as string;

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
  if (process_env === 'DEV_2') {
    return
  }

  const store = useThemeStore();

  // 1. Decide Color Scheme (boolean)
  if (store.themeSettings.appearance === "auto") {
    store.isDark = colorSchemeQuery.matches;
  } else if (store.themeSettings.appearance === "dark") {
    store.isDark = true;
  } else if (store.themeSettings.appearance === "light") {
    store.isDark = false;
  }

  // 1. Add Color Scheme Class
  if (store.isDark) {
    document.body.classList.remove('scheme--light');
    document.body.classList.add('scheme--dark');
  } else {
    document.body.classList.remove('scheme--dark');
    document.body.classList.add('scheme--light');
  }

  // 2. Get ThemeClass string value by color scheme
  if (store.isDark) {
    store.currentThemeClass = store.themeSettings.darkThemeClass;
  } else {
    store.currentThemeClass = store.themeSettings.lightThemeClass;
  }

  // 3. Favicon Change
  const { FAVICON_DARK, FAVICON_LIGHT } = configs.template;
  const faviconEl = document.querySelector('link[rel="icon"]');
  if (faviconEl) {
    if (store.isDark) {
      faviconEl.setAttribute('href', FAVICON_DARK);
    } else {
      faviconEl.setAttribute('href', FAVICON_LIGHT);
    }
  }
}



/** SAVE APPEARANCE SETTINGS TO LOCAL STORAGE */
export function appearanceLSsave() {
  const store = useThemeStore();
  localStorage.setItem('GVT-appearance', store.themeSettings.appearance);
}

/** SYNC APPEARANCE SETTINGS WITH LOCAL STORAGE */
export function appearanceLSsync() {
  const store = useThemeStore();
  const ls_appearance = localStorage.getItem('GVT-appearance');

  if (["light", "dark", "auto"].includes(ls_appearance || '')) {
    store.themeSettings.appearance = ls_appearance as Appearence;
  }
  else {
    localStorage.setItem('GVT-appearance', store.themeSettings.appearance);
  }
}


/** SAVE APPEARANCE SETTINGS TO SESSION STORAGE */
export function appearanceSessionSave() {
  const store = useThemeStore();
  sessionStorageHelper.setItem('appearance', store.themeSettings.appearance);
}

/** SYNC APPEARANCE SETTINGS WITH SESSION STORAGE */
export function appearanceSessionSync() {
  const store = useThemeStore();
  const ss_appearance = sessionStorageHelper.getItem('appearance');

  if (["light", "dark", "auto"].includes(ss_appearance || '')) {
    store.themeSettings.appearance = ss_appearance as Appearence;
  }
  else {
    appearanceSessionSave();
  }
}