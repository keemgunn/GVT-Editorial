import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Ref } from 'vue';
import configs from '#/configs';

export const useThemeStore = defineStore('theme', () => {
  const { COLOR_SCHEME, BROWSER_CONTAINER_COLORS }
    = configs.template;

  // User Theme Settings
  const themeSettings: Ref<ColorSchemeSettings> = ref(COLOR_SCHEME);

  // Current Color Scheme
  const isDark: Ref<boolean> = ref(false);

  // Current Theme Class
  const currentThemeClass: Ref<string> = ref("theme--something");

  // Browser Container Colors
  const containerColor = computed(() => {
    const containerColors = BROWSER_CONTAINER_COLORS as any;
    return containerColors[currentThemeClass.value] || ''
  })

  return { 
    themeSettings, 
    isDark, 
    currentThemeClass,
    containerColor
  }
})
