import { ref, computed } from 'vue'
import type { Ref } from 'vue';
import { defineStore } from 'pinia'
import useLocalStorage from '@/template/helpers/localStorage';

export const useMainStore = defineStore('main', () => {


  const currentView = useLocalStorage('currentView', 'home');

  // const currentView: Ref<Storage> = ref(localStorage)
  // const localStorageRef: Ref<Storage> = ref(localStorage);
  // const currentView = computed(() => localStorageRef.value.getItem('currentView'));
  

  return {
    currentView,

  }
})
