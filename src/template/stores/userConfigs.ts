/**
  Import all YAML Configurations here
  And distribute to all instances.
*/
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Ref } from 'vue';
import ss from '@/configs/template/styleSettings.yml';
import cs from '@/configs/template/componentSettings.yml';
import ts from '@/configs/template/templateSettings.yml';
import ws from '@/configs/website/properties.yml';
import nav from '@/configs/website/navigation.yml';

export const useConfigs = defineStore('configs', () => {

  // -------- Template
  const componentSettings: Ref<any> = ref(cs);
  const styleSettings: Ref<any> = ref(ss);
  const templateSettings: Ref<any> = ref(ts);

  // -------- Website
  const websiteSettings: Ref<any> = ref(ws);
  const navigationSetting: Ref<any> = ref(nav);

  return {
    componentSettings,
    styleSettings,
    templateSettings,
    websiteSettings,
    navigationSetting,
  }
})
