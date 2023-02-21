import { defineStore } from 'pinia'
import { onMounted, onBeforeUnmount, ref, computed } from 'vue'
import type { Ref } from 'vue';


export const useInteractionStore = defineStore('interaction', () => {

  const windowScroll = ref(0);

  const updateScrollPosition = () => {
    windowScroll.value = window.scrollY
    // console.warn(windowScroll.value);
  }

  onMounted(() => {
    window.addEventListener('scroll', updateScrollPosition)
  })
  
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', updateScrollPosition)
  })

  return {
    windowScroll
  }
})