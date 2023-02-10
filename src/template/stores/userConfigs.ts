/**
  Import all YAML Configurations here
  And distribute to all instances.
*/
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Ref } from 'vue';
import ws from '@/configs/website/properties.yml';
import nav from '@/configs/website/navigation.yml';

export const useConfigs = defineStore('configs', () => {


  // -------- Website
  const websiteSettings: Ref<any> = ref(ws);
  const navigationSetting: Ref<any> = ref(nav);

  return {
    websiteSettings,
    navigationSetting,
  }
})
