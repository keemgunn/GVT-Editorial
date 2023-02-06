import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Ref } from 'vue';


export const useInteractionStore = defineStore('interaction', () => {
  
  // DEPRECATED
  const currentPage = ref("");

  return { 
    currentPage
  }
})
