import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Ref } from 'vue';
import ss from '@/configs/template/styleSettings.yml';
import cs from '@/configs/template/componentSettings.yml';
import ts from '@/configs/template/templateSettings.yml';
import ws from '@/configs/websiteSettings.yml';


// Import all YAML Configurations here
// And distribute to all instances.

export const useConfigs = defineStore('configs', () => {

  const styleSettings: Ref<any> = ref(ss);
  const templateSettings: Ref<any> = ref(ts);
  const websiteSettings: Ref<any> = ref(ws);
  const componentSettings: Ref<any> = ref(cs);

  return {
    styleSettings,
    templateSettings,
    websiteSettings,
    componentSettings
  }
  
})
