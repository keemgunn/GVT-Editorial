import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Ref } from 'vue';
import uiSettings from '@/configs/uiSettings.yml';

export const useThemeStore = defineStore('theme', () => {

  // User Theme Settings
  const themeSettings: Ref<ColorSchemeSettings> = ref(uiSettings.theme.colorScheme as ColorSchemeSettings);

  // Current Color Scheme
  const isDark: Ref<boolean> = ref(false);

  // Current Theme Class
  const currentThemeClass: Ref<string> = ref("theme--something");

  // Browser Container Colors
  const containerColor = computed(() => uiSettings.theme.browserContainerColors[currentThemeClass.value])

  return { 
    themeSettings, 
    isDark, 
    currentThemeClass,
    containerColor
  }
})
