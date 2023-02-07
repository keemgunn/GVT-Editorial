import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Ref } from 'vue';
import { useConfigs } from '@/template/stores/userConfigs';

export const useFrameStore = defineStore('frame', () => {
  const { templateSettings } = useConfigs();

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
    return `layout--${templateSettings.appType}`
  })


  function breakpoint(scale: 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'): number {
    return templateSettings.breakpoints[scale]
  }

  const appScale = computed(() => {
    if (viewWidth.value < templateSettings.breakpoints.XXS) {
      return 'scale--XXS'
    } 
    else if (viewWidth.value < templateSettings.breakpoints.XS) {
      return 'scale--XS'
    }
    else if (viewWidth.value < templateSettings.breakpoints.S) {
      return 'scale--S'
    }
    else if (viewWidth.value < templateSettings.breakpoints.M) {
      return 'scale--M'
    }
    else if (viewWidth.value < templateSettings.breakpoints.L) {
      return 'scale--L'
    }
    else if (viewWidth.value < templateSettings.breakpoints.XL) {
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
