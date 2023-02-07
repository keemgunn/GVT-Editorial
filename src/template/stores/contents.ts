import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Ref } from 'vue';
// import catFile from '@/contents/categories.yml'


export const useContentsStore = defineStore('contents', () => {

  // const categories: Ref<Array<any>> = ref([]);
  // for (const [key, value] of Object.entries(catFile)) {
  //   const obj = value;
  //   obj.name = key;
  //   categories.value.push(obj);
  // }

  // return { 
  //   categories
  // }
})
