import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Ref } from 'vue';
import { uiSettings } from '@/template/settings';

const containerColors: any = {
  "theme--default-light": "#f0f0f0",
  "theme--default-dark": "#f0f0f0"
}

export const useThemeStore = defineStore('theme', () => {

  // User Theme Settings
  const themeSettings: Ref<ThemeSettings> = ref(uiSettings.theme as ThemeSettings);

  // Current Color Scheme
  const isDark: Ref<boolean> = ref(false);

  // Current Theme Class
  const currentThemeClass: Ref<string> = ref("theme--something");

  // Browser Container Colors
  const containerColor = computed(() => containerColors[currentThemeClass.value])

  return { 
    themeSettings, 
    isDark, 
    currentThemeClass,
    containerColor
  }
})
