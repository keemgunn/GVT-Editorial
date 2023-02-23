import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Ref } from 'vue';
import configs from '@/template/configs';

export const useFrameStore = defineStore('frame', () => {

  const { BREAKPOINTS } = configs.template;

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



  function breakpoint(scale: 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'): number {
    return BREAKPOINTS[scale]
  }

  const appScale = computed(() => {
    if (viewWidth.value < BREAKPOINTS.XXS) {
      return 'scale--XXS'
    } 
    else if (viewWidth.value < BREAKPOINTS.XS) {
      return 'scale--XS'
    }
    else if (viewWidth.value < BREAKPOINTS.S) {
      return 'scale--S'
    }
    else if (viewWidth.value < BREAKPOINTS.M) {
      return 'scale--M'
    }
    else if (viewWidth.value < BREAKPOINTS.L) {
      return 'scale--L'
    }
    else if (viewWidth.value < BREAKPOINTS.XL) {
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
    viewWidth,
    isVertical,
    isMobile,
    
    userAgent,
    userDevice,
    userBrowser,

    breakpoint,
    appScale,
    appRotation,
    appDevice,
  }
})
