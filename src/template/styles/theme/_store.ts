import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Ref } from 'vue';
import { useConfigs } from '@/template/stores/userConfigs'

export const useThemeStore = defineStore('theme', () => {
  const { styleSettings } = useConfigs();

  // User Theme Settings
  const themeSettings: Ref<ColorSchemeSettings> = ref(styleSettings.theme.colorScheme as ColorSchemeSettings);

  // Current Color Scheme
  const isDark: Ref<boolean> = ref(false);

  // Current Theme Class
  const currentThemeClass: Ref<string> = ref("theme--something");

  // Browser Container Colors
  const containerColor = computed(() => styleSettings.theme.browserContainerColors[currentThemeClass.value])

  return { 
    themeSettings, 
    isDark, 
    currentThemeClass,
    containerColor
  }
})
