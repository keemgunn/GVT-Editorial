import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Ref } from 'vue';
import { useConfigs } from '@/template/configs'

export const useThemeStore = defineStore('theme', () => {
  const { uiSettings } = useConfigs();

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
