import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Ref } from 'vue';
import ui from '@/configs/template/uiSettings.yml';
import pref from '@/configs/template/preferences.yml';
import website from '@/configs/websiteSettings.yml';
import editorial from '@/configs/template-editorial.yml'

// Import all YAML Configurations here
// And distribute to all instances.

export const useConfigs = defineStore('configs', () => {

  const uiSettings: Ref<any> = ref(ui);
  const preferences: Ref<any> = ref(pref);
  const websiteSettings: Ref<any> = ref(website);
  const editorialSettings: Ref<any> = ref(editorial);

  return {
    uiSettings,
    preferences,
    websiteSettings,
    editorialSettings
  }
  
})
