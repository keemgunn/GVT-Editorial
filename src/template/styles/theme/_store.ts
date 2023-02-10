import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Ref } from 'vue';
import templateConfigs from '@/configs/template/templateConfigs';

export const useThemeStore = defineStore('theme', () => {

  // User Theme Settings
  const themeSettings: Ref<ColorSchemeSettings> = ref(templateConfigs.colorScheme);

  // Current Color Scheme
  const isDark: Ref<boolean> = ref(false);

  // Current Theme Class
  const currentThemeClass: Ref<string> = ref("theme--something");

  // Browser Container Colors
  const containerColor = computed(() => {
    const containerColors = templateConfigs.browserContainerColors as any;
    return containerColors[currentThemeClass.value] || ''
  })

  return { 
    themeSettings, 
    isDark, 
    currentThemeClass,
    containerColor
  }
})
