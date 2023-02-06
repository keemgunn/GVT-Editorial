import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Ref } from 'vue';
import templateConfigs from '@/configs/template/preferences.yml'



export const useFrameStore = defineStore('frame', () => {

  // Frame Layout Type
  const templateSettings: Ref<TemplateSettings> = ref(templateConfigs as TemplateSettings);

  // Browser Width
  const browserWidth: Ref<number> = ref(0);

  // Is device Vertical
  const isVertical: Ref<boolean> = ref(false);

  // Is device Mobile
  const isMobile: Ref<boolean> = ref(false);

  // User Agent
  const userAgent: Ref<string> = ref("");
  const userDevice: Ref<string> = ref("");
  const userBrowser: Ref<string> = ref("");



  const appLayout = computed(() => {
    return `layout--${templateSettings.value.appType}`
  })

  const appScale = computed(() => {
    if (browserWidth.value < 320) {
      return 'scale--XXS'
    } 
    else if (browserWidth.value < 700) {
      return 'scale--XS'
    }
    else if (browserWidth.value < 1030) {
      return 'scale--S'
    }
    else if (browserWidth.value < 1360) {
      return 'scale--M'
    }
    else if (browserWidth.value < 1920) {
      return 'scale--L'
    }
    else if (browserWidth.value < 2400) {
      return 'scale--XL'
    }
    else {
      return 'scale--XXL'
    }
  })

  const appRotation = computed(() => {
    if (isVertical.value) {
      return 'rotation--vertical'
    } else {
      return 'rotation--horizontal'
    }
  })

  const appDevice = computed(() => {
    if (isMobile.value) {
      return 'device--mobile'
    } else {
      return 'device--desktop'
    }
  })



  return { 
    templateSettings,
    browserWidth,
    isVertical,
    isMobile,
    
    userAgent,
    userDevice,
    userBrowser,

    appLayout,
    appScale,
    appRotation,
    appDevice,
  }
})
