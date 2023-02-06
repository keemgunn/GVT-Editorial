import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Ref } from 'vue';

import { useConfigs } from '@/template/configs';

export const useFrameStore = defineStore('frame', () => {
  const { preferences } = useConfigs();

  // Frame Layout Type
  const templateSettings: Ref<TemplateSettings> = ref(preferences);

  // Browser Width
  const viewWidth: Ref<number> = ref(0);

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


  function breakpoint(scale: 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'): number {
    return preferences.breakpoints[scale]
  }

  const appScale = computed(() => {
    if (viewWidth.value < preferences.breakpoints.XXS) {
      return 'scale--XXS'
    } 
    else if (viewWidth.value < preferences.breakpoints.XS) {
      return 'scale--XS'
    }
    else if (viewWidth.value < preferences.breakpoints.S) {
      return 'scale--S'
    }
    else if (viewWidth.value < preferences.breakpoints.M) {
      return 'scale--M'
    }
    else if (viewWidth.value < preferences.breakpoints.L) {
      return 'scale--L'
    }
    else if (viewWidth.value < preferences.breakpoints.XL) {
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
    viewWidth,
    isVertical,
    isMobile,
    
    userAgent,
    userDevice,
    userBrowser,

    appLayout,

    breakpoint,
    appScale,
    appRotation,
    appDevice,
  }
})
