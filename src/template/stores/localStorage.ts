import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Ref } from 'vue';
import { useConfigs } from '@/template/stores/userConfigs';
import EventEmitter from 'events';



export const useLocalStorage = defineStore('localStorage', () => {
  
  // The event emitter
  const localStorageEventEmitter = new EventEmitter();
  
  // For Identified LocalStorage Keys
  const { websiteSettings } = useConfigs();
  function identify(key: string): string {
    return websiteSettings.websiteName + '-' + key
  }
  
  // Setting a LocalStorage value.
  function set(key: string, value: string): void {
    // 1. Set Value
    localStorage.setItem(identify(key), value);
    // 2. Emit Event
    localStorageEventEmitter.emit(key)
  }
  
  // Auto update ref values in store object.
  function attachReactor(ref: Ref<string>, name: string, defaultValue: string) {
  
    // 1. Get initial value from Local Storage
    ref.value = localStorage.getItem(identify(name)) || defaultValue;
  
    // 2. Attach Event Listener for make it reactive.
    localStorageEventEmitter.on(name, () => {
      ref.value = localStorage.getItem(identify(name)) as string;
    })
  }



  // ========== VALUES ===================

  const currentPage = ref("");
  attachReactor(currentPage, 'currentPage', 'Home');



  return { 
    set,

    currentPage,
  }
})
